#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const source =
  process.env.AULAFY_KNOWLEDGE_SOURCE ||
  path.resolve(root, "../conocimiento-source/generated/rag-corpus.jsonl");
const destination =
  process.env.AULAFY_KNOWLEDGE_CORPUS ||
  path.join(root, "data", "tutorial-factory", "knowledge", "rag-corpus.jsonl");

if (!fs.existsSync(source)) {
  console.error(`No existe el corpus de conocimiento: ${source}`);
  process.exit(1);
}

const content = fs.readFileSync(source, "utf8");
const records = content.split("\n").filter(Boolean);
for (const [index, line] of records.entries()) {
  try {
    JSON.parse(line);
  } catch (error) {
    console.error(`JSONL inválido en la línea ${index + 1}: ${error.message}`);
    process.exit(1);
  }
}

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(
  destination,
  content.endsWith("\n") ? content : `${content}\n`,
);
console.log(`Memoria canónica sincronizada: ${records.length} fragmentos.`);
console.log(destination);
