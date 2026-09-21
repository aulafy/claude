import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { loadBook, bookReport, normalizeSignal, planUpdate } from "../lib/living-book/engine.ts";

const { values, positionals } = parseArgs({ allowPositionals: true, options: { file: { type: "string" }, markdown: { type: "string" }, target: { type: "string" }, source: { type: "string" } } });
const [command = "help"] = positionals;
try {
  if (command === "help") {
    console.log("book:validate | book:report | book:intake -- --file signal.json\nnode scripts/living-book.mjs intake --markdown article.md --target first-task\nIntake creates unverified local candidates. No models, push or deployment.");
  } else {
    const book = loadBook();
    if (command === "validate") console.log(JSON.stringify({ valid: true, chapters: book.chapters.length, localizedChapters: book.chapters.length * 2, publicRelease: false }));
    else if (command === "report") console.log(JSON.stringify(bookReport(book), null, 2));
    else if (command === "intake") {
      if (Boolean(values.file) === Boolean(values.markdown)) throw new Error("Provide exactly one of --file or --markdown");
      const filename = path.resolve(values.file || values.markdown);
      const stat = fs.lstatSync(filename);
      if (!stat.isFile() || stat.size > 256000) throw new Error("Input must be a regular file smaller than 256 KB");
      const text = fs.readFileSync(filename, "utf8");
      const input = values.file ? JSON.parse(text) : { schemaVersion: 1, channel: "markdown", title: path.basename(filename), summary: text, observedAt: new Date().toISOString(), targetIds: values.target ? [values.target] : [], sourceIds: values.source ? [values.source] : [] };
      const signal = normalizeSignal(input, book);
      const directory = path.resolve("book-runtime/inbox");
      fs.mkdirSync(directory, { recursive: true });
      let duplicate = false;
      try { fs.writeFileSync(path.join(directory, signal.id + ".json"), JSON.stringify(signal, null, 2) + "\n", { flag: "wx", mode: 0o600 }); }
      catch (error) { if (error.code !== "EEXIST") throw error; duplicate = true; }
      console.log(JSON.stringify({ id: signal.id, duplicate, plan: planUpdate(book, input) }, null, 2));
    } else throw new Error("Unknown command");
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
