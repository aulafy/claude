import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { z } from "zod";
import {
  evaluateEditorialIntake,
  type EditorialIntake,
} from "@/lib/editorial-intake";

export const runtime = "nodejs";
const MAX_REQUEST_BYTES = 64_000;

const schema = z.object({
  title: z.string().trim().min(5).max(180),
  content: z.string().trim().min(30).max(40_000),
  links: z.array(z.string().trim().max(2_000)).max(20),
  audience: z.enum(["principiante", "estudiante", "pyme", "tecnico", "avanzado"]),
  intent: z.enum(["auto", "crear", "actualizar"]),
  existingPath: z.string().trim().max(500).optional(),
  desiredOutcome: z.string().trim().min(10).max(1_000),
  queue: z.boolean().default(false),
});

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70) || "senal-editorial";
}

function renderInbox(
  intake: EditorialIntake,
  evaluation: ReturnType<typeof evaluateEditorialIntake>,
) {
  return `# Señal editorial: ${intake.title}

Estado: no verificado; entrada manual
Audiencia: ${intake.audience}
Intención: ${intake.intent}
Contenido existente: ${intake.existingPath || "no indicado"}
Resultado de evaluación: ${evaluation.score}/${evaluation.maximum} — ${evaluation.verdict}
Recomendación: ${evaluation.recommendation}

## Resultado educativo deseado

${intake.desiredOutcome}

## Texto aportado

${intake.content}

## Enlaces aportados

${evaluation.validLinks.map((link) => `- ${link}`).join("\n") || "- Ninguno válido."}

## Qué falta comprobar

${evaluation.missing.map((item) => `- ${item}`).join("\n") || "- La evaluación básica no detectó carencias; todavía requiere verificación técnica y humana."}

## Límites

- Los enlaces no se descargaron ni se verificaron.
- Esta ficha no autoriza publicación.
- No tratar publicaciones sociales o resúmenes de modelos como fuente técnica.
`;
}

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("cache-control", "no-store");
  headers.set("x-content-type-options", "nosniff");
  return Response.json(data, { ...init, headers });
}

function isTrustedLocalRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);
    const loopback = new Set(["localhost", "127.0.0.1", "::1"]);
    return (
      originUrl.origin === requestUrl.origin &&
      loopback.has(requestUrl.hostname) &&
      loopback.has(originUrl.hostname)
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (declaredLength > MAX_REQUEST_BYTES) {
    return json({ error: "La petición supera el límite permitido." }, { status: 413 });
  }

  let raw: unknown;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body, "utf8") > MAX_REQUEST_BYTES) {
      return json({ error: "La petición supera el límite permitido." }, { status: 413 });
    }
    raw = JSON.parse(body);
  } catch {
    return json({ error: "El cuerpo debe ser JSON válido." }, { status: 400 });
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return json(
      { error: "Revisa los campos del formulario.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { queue, ...intake } = parsed.data;
  const evaluation = evaluateEditorialIntake(intake);
  if (!queue) return json({ evaluation, queued: false });

  if (process.env.NODE_ENV === "production") {
    return json({
      evaluation,
      queued: false,
      queueMessage:
        "La cola local está desactivada en producción. Descarga o copia la ficha para revisarla localmente.",
    });
  }

  if (!isTrustedLocalRequest(request)) {
    return json(
      {
        evaluation,
        queued: false,
        queueMessage: "La cola solo acepta peticiones originadas en la aplicación local.",
      },
      { status: 403 },
    );
  }

  if (evaluation.verdict === "insuficiente") {
    return json({
      evaluation,
      queued: false,
      queueMessage: "La señal necesita más contexto antes de entrar en la cola.",
    });
  }

  const inbox =
    process.env.AULAFY_EDITORIAL_INBOX ||
    path.join(
      os.homedir(),
      "AulafyAutomation",
      "aulafy-tutorial-runner",
      "data",
      "tutorial-factory",
      "inbox",
    );
  const markdown = renderInbox(intake, evaluation);
  const signature = crypto.createHash("sha256").update(markdown).digest("hex").slice(0, 16);
  const date = new Date().toISOString().slice(0, 10);
  const filename = `${date}-entrada-${slugify(intake.title)}-${signature}.md`;
  const destination = path.join(inbox, filename);

  await fs.mkdir(inbox, { recursive: true });
  try {
    await fs.writeFile(destination, markdown, { encoding: "utf8", flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  }

  return json({
    evaluation,
    queued: true,
    queueMessage: "Entrada guardada para investigación y generación local.",
    filename,
  });
}
