const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const days = Math.max(1, Math.min(Number(process.argv[2] ?? 30), 365));

if (!url || !serviceKey) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to read aggregate metrics.");
  process.exit(1);
}

const response = await fetch(`${url}/rest/v1/rpc/get_learning_event_summary`, {
  method: "POST",
  headers: {
    apikey: serviceKey,
    authorization: `Bearer ${serviceKey}`,
    "content-type": "application/json",
  },
  body: JSON.stringify({ p_days: days }),
});

if (!response.ok) {
  console.error(`Metrics request failed (${response.status}): ${await response.text()}`);
  process.exit(1);
}

const rows = await response.json();
const totals = new Map();
for (const row of rows) totals.set(row.event_name, (totals.get(row.event_name) ?? 0) + Number(row.event_count));

const ratio = (numerator, denominator) => {
  const top = totals.get(numerator) ?? 0;
  const bottom = totals.get(denominator) ?? 0;
  return bottom ? `${((top / bottom) * 100).toFixed(1)}%` : "sin base";
};

console.log(`Aulafy aggregate learning metrics · last ${days} days`);
console.log("No visitor identifiers, paths, prompts, searches, or response content are stored.\n");
console.table([...totals].map(([event, count]) => ({ event, count })));
console.log("\nApproximate learning funnel (browser/day event counts)");
console.table([
  { step: "Homepage -> mission start", rate: ratio("mission_start", "landing_view") },
  { step: "Mission start -> complete", rate: ratio("mission_complete", "mission_start") },
  { step: "Lesson 25% -> 90%", rate: ratio("lesson_90", "lesson_25") },
  { step: "Lesson 90% -> next lesson", rate: ratio("next_lesson_click", "lesson_90") },
  { step: "Searches without results", rate: ratio("search_no_results", "search_used") },
]);
console.log("\nDaily detail");
console.table(rows);
