import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { contentFrontmatterSchema, type ContentFrontmatter } from "./schema.ts";
import type { CanonicalContentDocument } from "./types.ts";

function parseValue(value: string): string | number | string[] {
  const trimmed = value.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) return trimmed.slice(1, -1).split(",").map((item) => item.trim()).filter(Boolean).map((item) => item.replace(/^['"]|['"]$/g, ""));
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed.replace(/^['"]|['"]$/g, "");
}

export function parseFrontmatter(source: string, sourcePath = "fixture.mdx"): { frontmatter: ContentFrontmatter; body: string } {
  if (!source.startsWith("---\n")) throw new Error(`${sourcePath}: missing YAML frontmatter`);
  const end = source.indexOf("\n---", 4);
  if (end < 0) throw new Error(`${sourcePath}: unterminated YAML frontmatter`);
  const values: Record<string, unknown> = {};
  for (const line of source.slice(4, end).split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator <= 0) throw new Error(`${sourcePath}: invalid frontmatter line`);
    values[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1));
  }
  const result = contentFrontmatterSchema.safeParse(values);
  if (!result.success) throw new Error(`${sourcePath}: invalid frontmatter: ${result.error.issues.map((issue) => issue.path.join(".") + " " + issue.message).join("; ")}`);
  return { frontmatter: result.data, body: source.slice(end + 4).replace(/^\n/, "") };
}

export function hashCanonicalContent(frontmatter: ContentFrontmatter, body: string) {
  return crypto.createHash("sha256").update(`${JSON.stringify(frontmatter)}\n${body}`).digest("hex");
}

export function parseContentFile(filePath: string, root = process.cwd()): CanonicalContentDocument {
  const sourcePath = path.relative(root, filePath).split(path.sep).join("/");
  const source = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(source, sourcePath);
  return { ...frontmatter, body, sourcePath, contentHash: hashCanonicalContent(frontmatter, body) };
}
