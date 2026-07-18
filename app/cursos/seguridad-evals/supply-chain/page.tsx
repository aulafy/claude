import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Supply chain de modelos y datasets — Seguridad y evaluación",
  description:
    "Cómo reducir riesgos de supply chain en IA: modelos, datasets, checkpoints, paquetes, licencias, hashes, permisos y procedencia.",
  keywords: ["supply chain IA", "seguridad modelos open source", "modelos Hugging Face seguridad", "datasets poisoning"],
  alternates: { canonical: "/cursos/seguridad-evals/supply-chain" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Supply chain"
      title="Supply chain de modelos y datasets"
      icon="server"
      lead={<>Tu app de IA hereda la confianza de todo lo que descarga: modelo, tokenizer, dataset, LoRA, paquete npm, imagen Docker, workflow, script y extensión.</>}
      courseHref="/cursos/seguridad-evals"
      courseLabel="Seguridad y evaluación"
    >
      <Objetivos>
        <ul>
          <li>Crear una ficha de procedencia para modelos y datasets.</li>
          <li>Evitar pesos, scripts y dependencias sin control.</li>
          <li>Separar licencia, seguridad y calidad como decisiones distintas.</li>
        </ul>
      </Objetivos>

      <Cristiano term="supply chain">
        Es la cadena de piezas que usas para construir. Si una pieza viene comprometida o no sabes de dónde sale, tu sistema también queda comprometido.
      </Cristiano>

      <div className="prose">
        <h2>Ficha de procedencia</h2>
      </div>

      <Terminal>{`modelo:
  nombre: "qwen3:8b"
  fuente: "repositorio oficial"
  version_o_commit: "..."
  licencia: "revisada"
  formato: "gguf | safetensors | onnx"
  hash: "sha256:..."
  requiere_trust_remote_code: false
  datos_entrenamiento_conocidos: parcial
  uso_permitido: "educativo | comercial | revisar"
  fecha_revision: "2026-07-03"`}</Terminal>

      <Idea>
        OWASP incluye supply chain porque muchos ataques no pasan por el prompt: pasan por dependencias, paquetes, datos, plugins o permisos.
      </Idea>

      <div className="prose">
        <h2>Reglas sencillas</h2>
        <ul>
          <li>Prefiere formatos que no ejecuten código al cargar pesos.</li>
          <li>Evita <code>trust_remote_code</code> salvo que revises exactamente qué ejecuta.</li>
          <li>Guarda hashes de pesos usados en producción.</li>
          <li>No mezcles datasets privados con públicos sin registro.</li>
          <li>Revisa licencia de modelo, dataset y adaptadores por separado.</li>
        </ul>
      </div>

      <Terminal>{`sha256sum modelo.gguf > checksums.txt
pip freeze > requirements.lock.txt
npm ls --depth=0 > npm-deps.txt
docker image inspect qdrant/qdrant:latest > docker-qdrant.json`}</Terminal>

      <Cuidado>
        "Lo descargué de internet" no es una fuente. Para producción, necesitas procedencia, versión, hash y criterio de actualización.
      </Cuidado>

      <Comprueba>
        Elige un modelo local que uses. ¿Puedes decir fuente, licencia, hash y fecha de descarga? Si no, crea la ficha antes de seguir.
      </Comprueba>

      <Guardar>
        La seguridad de IA empieza antes de ejecutar el modelo: empieza cuando decides qué descargas y de dónde.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/seguridad-evals/privacidad-datos", label: "Privacidad y datos" }}
        next={{ href: "/cursos/seguridad-evals/proyecto-auditoria", label: "Proyecto de auditoría" }}
      />
    </Chapter>
  );
}
