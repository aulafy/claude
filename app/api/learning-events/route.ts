// Compatibility endpoint: never read, retain or forward an event payload.
export function POST() {
  return new Response(null, { status: 204 });
}
