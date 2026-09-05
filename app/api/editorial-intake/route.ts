// Public content intake is disabled: never read or retain a visitor payload.
export function POST() {
  return new Response(null, { status: 410 });
}
