import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const migration = read("supabase/migrations/20260714160000_social_learning_mvp.sql");

const tables = [
  "profiles",
  "user_roles",
  "social_learning_units",
  "learning_projects",
  "project_reviews",
  "content_reports",
  "moderation_actions",
];

for (const table of tables) {
  assert(
    migration.includes(`alter table public.${table} enable row level security;`),
    `Falta RLS en public.${table}`,
  );
}

assert(!/new\.email/i.test(migration), "El trigger de perfiles no debe copiar el email a datos públicos");
assert(!migration.includes("service_role"), "La migración no debe depender de service_role");
assert(
  migration.includes("grant update (username, display_name, bio, website, interests)"),
  "El perfil debe limitar las columnas editables",
);
assert(
  migration.includes("create or replace function public.moderate_report"),
  "La moderación debe resolverse de forma transaccional",
);
assert(
  migration.includes("security invoker"),
  "La función pública de moderación debe conservar RLS",
);

const expectedUnits = [
  "primera-web-local",
  "automatizar-con-vista-previa",
  "proyecto-final",
];
const config = read("lib/social/config.ts");
assert(
  config.includes('NEXT_PUBLIC_AULAFY_SOCIAL_ENABLED === "true"'),
  "La comunidad debe permanecer desactivada salvo activación explícita",
);
for (const lesson of expectedUnits) {
  assert(migration.includes(`'${lesson}'`), `La migración no incluye ${lesson}`);
  assert(config.includes(`lessonSlug: "${lesson}"`), `La configuración no incluye ${lesson}`);
}

const requiredFiles = [
  "app/comunidad/page.tsx",
  "app/comunidad/publicar/page.tsx",
  "app/comunidad/normas/page.tsx",
  "app/proyectos/[id]/page.tsx",
  "app/perfil/[username]/page.tsx",
  "app/admin/moderacion/page.tsx",
  "app/auth/callback/route.ts",
  "proxy.ts",
];
for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(root, file)), `Falta ${file}`);
}

const proxy = read("proxy.ts");
for (const route of [
  "/comunidad",
  "/acceso",
  "/cuenta",
  "/perfil",
  "/proyectos",
  "/admin/moderacion",
  "/auth/callback",
]) {
  assert(proxy.includes(`"${route}"`), `El interruptor no protege ${route}`);
}
assert(proxy.includes("!isSocialEnabled()"), "El proxy debe bloquear las rutas sociales por defecto");

for (const file of [
  "components/SiteHeader.tsx",
  "components/Footer.tsx",
  "components/social/LessonCommunityCta.tsx",
  "lib/search-data.ts",
  "lib/seo-index.ts",
]) {
  assert(
    read(file).includes("isSocialEnabled"),
    `${file} debe respetar el interruptor de publicación`,
  );
}

console.log(`Verified dormant social MVP: ${tables.length} RLS tables, ${expectedUnits.length} pilot lessons and publication gate.`);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
