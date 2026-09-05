import assert from "node:assert/strict";
import { POST } from "../app/api/learning-events/route.ts";
import { POST as intake } from "../app/api/editorial-intake/route.ts";
import { trackLearningEvent } from "../lib/learning-events.ts";

const oldFlag = process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED;
const oldFetch = globalThis.fetch;
const oldWindow = globalThis.window;
let networkCalls = 0;
let writes = 0;
try {
  process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED = "true";
  globalThis.fetch = async () => { networkCalls++; throw new Error("Unexpected network request"); };
  globalThis.window = { localStorage: { getItem: () => null, setItem: () => writes++ }, dispatchEvent: () => writes++ };
  trackLearningEvent("mission_complete");
  const request = { json() { throw new Error("Must not read visitor payload"); } };
  assert.equal((await POST(request)).status, 204);
  assert.equal((await intake(request)).status, 410);
  assert.equal(networkCalls, 0);
  assert.equal(writes, 0);
} finally {
  globalThis.fetch = oldFetch;
  if (oldWindow === undefined) delete globalThis.window;
  else globalThis.window = oldWindow;
  if (oldFlag === undefined) delete process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED;
  else process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED = oldFlag;
}
console.log("Privacy contract passed: no event storage, payload reads or network transmission, even with the legacy flag enabled.");
