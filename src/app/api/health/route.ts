import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    ok: true,
    product: "Sundial",
    storage: "IndexedDB (client)",
    degraded: "No Google Calendar — local store only",
  });
}
