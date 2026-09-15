import { NextResponse } from "next/server";
import { z } from "zod";
import { localAssist, llmAssist } from "@/lib/assist";
import type { DayAvailability, MeetingType } from "@/lib/types";
import type { SlotOption } from "@/lib/slots";

export const runtime = "nodejs";

const Body = z.object({
  hostName: z.string().min(1).max(120),
  guestIntent: z.string().max(400).optional(),
  meeting: z.object({
    id: z.string(),
    title: z.string(),
    durationMin: z.number().int().positive(),
    description: z.string(),
    bufferMin: z.number().int().nonnegative(),
  }),
  availability: z.array(
    z.object({
      weekday: z.number().int().min(0).max(6),
      enabled: z.boolean(),
      windows: z.array(
        z.object({
          startMin: z.number().int(),
          endMin: z.number().int(),
        })
      ),
    })
  ),
  candidates: z.array(
    z.object({
      dateKey: z.string(),
      slots: z.array(
        z.object({
          startMin: z.number(),
          endMin: z.number(),
          startIso: z.string(),
          endIso: z.string(),
          label: z.string(),
        })
      ),
    })
  ),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const body = parsed.data;
  const local = localAssist({
    hostName: body.hostName,
    meeting: body.meeting as MeetingType,
    availability: body.availability as DayAvailability[],
    candidates: body.candidates as { dateKey: string; slots: SlotOption[] }[],
    guestIntent: body.guestIntent,
  });
  const result = await llmAssist({
    hostName: body.hostName,
    meeting: body.meeting as MeetingType,
    candidates: body.candidates as { dateKey: string; slots: SlotOption[] }[],
    guestIntent: body.guestIntent,
    local,
  });
  return NextResponse.json(result);
}

export async function GET() {
  const shared = Boolean(process.env.BUILD_GAMES_LLM_API_KEY);
  const hasXai = Boolean(process.env.XAI_API_KEY || process.env.GROK_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  return NextResponse.json({
    ok: true,
    feature: "meridian-assist",
    providers: { buildGames: shared, xai: hasXai, openai: hasOpenAI, local: true },
  });
}
