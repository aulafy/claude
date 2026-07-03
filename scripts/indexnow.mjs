#!/usr/bin/env node
// Notifica a los buscadores (Bing, Yandex... y por tanto ChatGPT Search)
// todas las URLs del sitio vía IndexNow. Lee las URLs del sitemap en producción.
//
// Uso:  node scripts/indexnow.mjs
// Requiere el archivo de clave servido en /public/<KEY>.txt (ya incluido).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const HOST = process.env.INDEXNOW_HOST || "www.aulafy.net";
const SITE = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

// Localiza la clave: primero .indexnow-key, si no el primer .txt corto de /public.
function findKey() {
  const keyFile = path.join(root, ".indexnow-key");
  if (fs.existsSync(keyFile)) return fs.readFileSync(keyFile, "utf8").trim();
  const pub = path.join(root, "public");
  const txt = fs.readdirSync(pub).find((f) => /^[a-f0-9]{16,64}\.txt$/.test(f));
  if (txt) return txt.replace(/\.txt$/, "");
  throw new Error("No encuentro la clave de IndexNow (.indexnow-key o public/<hex>.txt).");
}

async function getUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml -> ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const key = findKey();
  const urlList = await getUrls();
  console.log(`IndexNow: ${urlList.length} URLs · host ${HOST} · key ${key.slice(0, 8)}…`);

  const body = {
    host: HOST,
    key,
    keyLocation: `${SITE}/${key}.txt`,
    urlList,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  // IndexNow responde 200 (OK) o 202 (aceptado). 403 = clave no válida/servida.
  console.log(`Respuesta IndexNow: ${res.status} ${res.statusText}`);
  if (res.status === 200 || res.status === 202) {
    console.log("✅ Enviado. Bing/Yandex procesarán las URLs en breve.");
  } else {
    console.log("⚠️ Revisa que la clave esté servida en:", `${SITE}/${key}.txt`);
    console.log(await res.text());
  }
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
