import assert from "node:assert/strict";
import { getSearchRescues, normalizeSearchQuery, rankSearchEntries } from "../lib/search-intents.ts";

const entries = [
  { route: "/ollama", title: "Ollama desde cero", description: "Instala un modelo local", language: "es", priority: 0.8 },
  { route: "/office", title: "IA para pymes", description: "Automatiza trabajo de oficina", language: "es", priority: 0.8 },
  { route: "/en/start", title: "Start with AI", description: "A beginner mission", language: "en", priority: 0.9 },
  { route: "/privacy", title: "Privacidad y datos", description: "Protege información sensible", language: "es", priority: 0.7 },
];

assert.equal(normalizeSearchQuery("OLLaMMA"), "ollama", "Known misspellings must be corrected locally");
assert.equal(rankSearchEntries(entries, "ollamma", "es")[0]?.route, "/ollama", "Corrected tool names must rank their guide first");
assert.equal(rankSearchEntries(entries, "negocio oficina", "es")[0]?.route, "/office", "Work intent must expand to business vocabulary");
assert.equal(rankSearchEntries(entries, "private sensitive information", "en").length, 0, "Language filtering must prevent Spanish entries leaking into English results");
assert.equal(rankSearchEntries(entries, "beginner", "en")[0]?.route, "/en/start", "English synonyms must retrieve English entries");
assert.equal(rankSearchEntries(entries, "zxqv unknown", "es").length, 0, "Unknown text must preserve the empty state");
assert.equal(getSearchRescues("excel y csv", "es")[0]?.id, "data", "Data queries must receive a data rescue");
assert.equal(getSearchRescues("ollamma no funciona", "es")[0]?.id, "local", "Local tool errors must receive the local AI rescue");
assert.equal(getSearchRescues("zxqv", "es")[0]?.id, "beginner", "Unknown queries must receive a beginner fallback");

console.log("Search intent contract passed: corrections, synonyms, language filtering, empty states, and contextual rescues.");
