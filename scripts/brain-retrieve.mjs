import { loadContentRegistry } from "../lib/content/registry.ts";
import { ingestCanonicalContent } from "../lib/brain/ingestion.ts";
import { createRetriever } from "../lib/brain/retrieval.ts";

const query = process.argv.slice(2).join(" ").trim();
if (!query) {
  console.error("Usage: npm run brain:retrieve -- Ollama context window");
  process.exit(1);
}
const documents = loadContentRegistry();
const result = createRetriever(ingestCanonicalContent(documents), documents).retrieve(query);
console.log(JSON.stringify(result, null, 2));
