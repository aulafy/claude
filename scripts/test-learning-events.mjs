import assert from "node:assert/strict";
import fs from "node:fs";
import { POST } from "../app/api/learning-events/route.ts";
import { learningEventNames, summarizeLearningMetrics } from "../lib/learning-metrics.ts";

const flag = process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function request(body, origin = "https://www.aulafy.net") {
  return new Request("https://www.aulafy.net/api/learning-events", {
    method: "POST",
    headers: { origin, "sec-fetch-site": origin.includes("aulafy.net") ? "same-origin" : "cross-site", "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

try {
  process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED = "false";
  assert.equal((await POST(request({ event: "mission_complete" }))).status, 204, "Disabled metrics must be a no-op");

  process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED = "true";
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  assert.equal((await POST(request({ event: "mission_complete" }, "https://example.com"))).status, 403, "Cross-site requests must fail");
  assert.equal((await POST(request({ event: "prompt_text" }))).status, 400, "Unknown events must fail");
  assert.equal((await POST(request({ event: "mission_complete" }))).status, 503, "Missing server configuration must fail closed");

  const summary = summarizeLearningMetrics([
    { event_day: "2026-08-15", event_name: "mission_start", event_count: 10 },
    { event_day: "2026-08-15", event_name: "mission_complete", event_count: 4 },
    { event_day: "2026-08-16", event_name: "mission_start", event_count: 5 },
    { event_day: "2026-08-16", event_name: "mission_complete", event_count: 5 },
    { event_day: "2026-08-16", event_name: "search_used", event_count: 8 },
    { event_day: "2026-08-16", event_name: "search_no_results", event_count: 2 },
    { event_day: "2026-08-16", event_name: "return_7d", event_count: 3 },
    { event_day: "2026-08-16", event_name: "return_30d", event_count: 1 },
  ]);
  assert.equal(summary.total("mission_start"), 15, "Daily rows must be added by event");
  assert.equal(summary.funnel.find((item) => item.numeratorEvent === "mission_complete")?.rate, 60, "Mission completion ratio must be calculated");
  assert.equal(summary.days[0]?.day, "2026-08-15", "Daily series must be chronological");
  assert.equal(summary.days[1]?.returns, 4, "Real daily returns must combine exclusive 7-day and 30-day events");
  assert.ok(summary.signals.some((signal) => signal.includes("búsquedas")), "A high no-results ratio must produce an editorial signal");

  const migration = fs.readFileSync("supabase/migrations/20260816180000_aggregate_learning_metrics.sql", "utf8");
  const incrementalMigration = fs.readFileSync("supabase/migrations/20260816193000_add_learning_signal_events.sql", "utf8");
  const returnMigration = fs.readFileSync("supabase/migrations/20260816200000_add_learning_return_events.sql", "utf8");
  const route = fs.readFileSync("app/api/learning-events/route.ts", "utf8");
  const client = fs.readFileSync("lib/learning-events.ts", "utf8");
  for (const event of learningEventNames) {
    assert.ok(route.includes(`"${event}"`), `API allowlist must contain ${event}`);
    assert.ok(client.includes(`| "${event}"`) || client.includes(`= "${event}"`), `Client event type must contain ${event}`);
    assert.ok(migration.includes(`'${event}'`), `Database allowlist must contain ${event}`);
    assert.ok(incrementalMigration.includes(`'${event}'`) || !["route_selected", "external_source_open"].includes(event), `Incremental database migration must add ${event}`);
    assert.ok(returnMigration.includes(`'${event}'`) || !["return_7d", "return_30d"].includes(event), `Return database migration must add ${event}`);
  }
  assert.match(migration, /grant execute on function public\.record_learning_event\(text\) to service_role;/i);
  assert.doesNotMatch(migration, /grant execute on function public\.record_learning_event\(text\) to (?:anon|authenticated)/i);
  assert.match(migration, /auth\.role\(\) <> 'service_role'/i);
  assert.match(incrementalMigration, /grant execute on function public\.record_learning_event\(text\) to service_role;/i);
  assert.doesNotMatch(incrementalMigration, /grant execute on function public\.record_learning_event\(text\) to (?:anon|authenticated)/i);
  assert.match(returnMigration, /grant execute on function public\.record_learning_event\(text\) to service_role;/i);
  assert.doesNotMatch(returnMigration, /grant execute on function public\.record_learning_event\(text\) to (?:anon|authenticated)/i);
} finally {
  if (flag === undefined) delete process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED;
  else process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED = flag;
  if (supabaseUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  else process.env.NEXT_PUBLIC_SUPABASE_URL = supabaseUrl;
  if (serviceKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  else process.env.SUPABASE_SERVICE_ROLE_KEY = serviceKey;
}

console.log("Aggregate learning metrics contract passed: opt-in, same-origin, closed events, fail-closed config, service-role-only SQL.");
