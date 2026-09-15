/**
 * Meridian — AI availability assist for Sundial's one job: book a slot.
 * Reads BUILD_GAMES_LLM_API_KEY first (gauntlet/LLM.md). Prefer xAI when key
 * starts with xai-; else OpenAI-compatible. Also XAI_API_KEY / GROK_API_KEY /
 * OPENAI_API_KEY. No fake LLM prose — local ranking is labeled when LLM fails.
 */
import type { DayAvailability, MeetingType } from "./types";
import type { SlotOption as Slot } from "./slots";

export type AssistMode = "grok" | "openai" | "local";

export type AssistSuggestion = {
  startIso: string;
  label: string;
  dateKey: string;
  rank: number;
  reason: string;
};

export type AssistResponse = {
  mode: AssistMode;
  model: string | null;
  copy: string;
  suggestions: AssistSuggestion[];
  note: string;
};

type Provider = {
  name: AssistMode;
  base: string;
  key: string;
  model: string;
};

function scoreSlot(slot: Slot, dateKey: string, preferMorning: boolean): number {
  let score = 50;
  const h = Math.floor(slot.startMin / 60);
  if (h >= 9 && h < 11) score += preferMorning ? 28 : 18;
  else if (h >= 13 && h < 15) score += preferMorning ? 14 : 24;
  else if (h >= 11 && h < 13) score += 10;
  else if (h >= 15 && h < 17) score += 6;
  else score -= 8;
  if (slot.startMin % 60 === 0) score += 4;
  if (slot.startMin % 60 === 30) score += 2;
  const today = new Date();
  const [y, m, d] = dateKey.split("-").map(Number);
  const daysOut = Math.round(
    (Date.UTC(y, m - 1, d) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) /
      86_400_000
  );
  score += Math.max(0, 12 - daysOut);
  return score;
}

export function localAssist(input: {
  hostName: string;
  meeting: MeetingType;
  availability: DayAvailability[];
  candidates: { dateKey: string; slots: Slot[] }[];
  guestIntent?: string;
}): AssistResponse {
  const preferMorning = /morn|early|am|coffee|focus/i.test(input.guestIntent ?? "");
  const ranked: AssistSuggestion[] = [];
  for (const day of input.candidates) {
    for (const slot of day.slots) {
      ranked.push({
        startIso: slot.startIso,
        label: slot.label,
        dateKey: day.dateKey,
        rank: scoreSlot(slot, day.dateKey, preferMorning),
        reason: "",
      });
    }
  }
  ranked.sort((a, b) => b.rank - a.rank);
  const top = ranked.slice(0, 5).map((s, i) => {
    const hourTok = s.label.split(":")[0];
    const h = Number(hourTok);
    const ampm = s.label.includes("PM") ? "PM" : "AM";
    let reason = "Open window with buffer clear";
    if (ampm === "AM" && h >= 9 && h < 11) reason = "Quiet morning focus window";
    else if (ampm === "PM" && (h === 1 || h === 2)) reason = "Post-lunch clarity slot";
    else if (s.label.includes(":00 ")) reason = "Clean hour mark";
    return { ...s, rank: i + 1, reason };
  });

  const windows = input.availability
    .filter((d) => d.enabled && d.windows.length)
    .map((d) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.weekday]);

  const copy = [
    `${input.hostName} keeps ${input.meeting.title.toLowerCase()} (${input.meeting.durationMin} min) on ${windows.join(", ") || "selected days"}.`,
    top[0]
      ? `Best next open: ${top[0].dateKey} at ${top[0].label} — ${top[0].reason.toLowerCase()}.`
      : "No open slots in the next two weeks on this desk.",
    input.guestIntent?.trim()
      ? `Matched against your note: “${input.guestIntent.trim().slice(0, 120)}”.`
      : "Pick a suggested time or browse the calendar.",
  ].join(" ");

  return {
    mode: "local",
    model: null,
    copy,
    suggestions: top,
    note: "Meridian local ranking — LLM key missing or unreachable.",
  };
}

function resolveProviders(): Provider[] {
  const shared = process.env.BUILD_GAMES_LLM_API_KEY?.trim();
  const out: Provider[] = [];
  const seen = new Set<string>();
  const push = (p: Provider) => {
    const id = `${p.name}:${p.base}:${p.model}`;
    if (seen.has(id)) return;
    seen.add(id);
    out.push(p);
  };

  const xaiKey =
    process.env.XAI_API_KEY?.trim() ||
    process.env.GROK_API_KEY?.trim() ||
    (shared?.startsWith("xai-") ? shared : undefined);
  const openaiKey =
    process.env.OPENAI_API_KEY?.trim() ||
    (shared && !shared.startsWith("xai-") ? shared : undefined);

  const xaiModels = [
    process.env.XAI_MODEL?.trim(),
    "grok-4.6",
    "grok-4.5",
    "grok-3-mini",
    "grok-2-latest",
  ].filter(Boolean) as string[];

  if (xaiKey) {
    const base = (process.env.XAI_BASE_URL || "https://api.x.ai/v1").replace(/\/$/, "");
    for (const model of xaiModels) push({ name: "grok", base, key: xaiKey, model });
  }
  if (openaiKey) {
    const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
    push({
      name: "openai",
      base,
      key: openaiKey,
      model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
    });
  }
  // Last resort per LLM.md — shared against xAI even if prefix unknown
  if (shared && !xaiKey) {
    const base = "https://api.x.ai/v1";
    for (const model of xaiModels) push({ name: "grok", base, key: shared, model });
  }
  return out;
}

async function chatOnce(
  provider: Provider,
  messages: { role: string; content: string }[]
): Promise<string | null> {
  const res = await fetch(`${provider.base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: provider.model,
      temperature: 0.4,
      messages,
    }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content?.trim() || null;
}

export async function llmAssist(input: {
  hostName: string;
  meeting: MeetingType;
  candidates: { dateKey: string; slots: Slot[] }[];
  guestIntent?: string;
  local: AssistResponse;
}): Promise<AssistResponse> {
  const providers = resolveProviders();
  if (!providers.length) return input.local;

  const slotLines = input.local.suggestions
    .map((s) => `- ${s.dateKey} ${s.label} (${s.startIso})`)
    .join("\n");

  const prompt = `You help guests book time with ${input.hostName}.
Meeting: ${input.meeting.title} (${input.meeting.durationMin} min). ${input.meeting.description}
Guest intent: ${input.guestIntent?.trim() || "(none)"}
Top candidate slots:
${slotLines || "(none)"}

Write 2 short sentences of warm, concrete availability guidance (no hype, no emojis, no purple-AI tone). Then list the same slots in preferred order as JSON.
Respond ONLY with JSON: {"copy":"...","order":["ISO","ISO",...]}`;

  const messages = [
    { role: "system", content: "You are Meridian, a quiet scheduling assistant for Sundial." },
    { role: "user", content: prompt },
  ];

  for (const provider of providers) {
    try {
      const raw = await chatOnce(provider, messages);
      if (!raw) continue;
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return {
          ...input.local,
          mode: provider.name,
          model: provider.model,
          copy: raw.slice(0, 400) || input.local.copy,
          note: `Meridian via ${provider.name} (${provider.model}) · local ranks`,
        };
      }
      const parsed = JSON.parse(jsonMatch[0]) as { copy?: string; order?: string[] };
      const byIso = new Map(input.local.suggestions.map((s) => [s.startIso, s]));
      const ordered: AssistSuggestion[] = [];
      for (const iso of parsed.order ?? []) {
        const s = byIso.get(iso);
        if (s) ordered.push(s);
      }
      for (const s of input.local.suggestions) {
        if (!ordered.find((o) => o.startIso === s.startIso)) ordered.push(s);
      }
      return {
        mode: provider.name,
        model: provider.model,
        copy: (parsed.copy || input.local.copy).slice(0, 500),
        suggestions: ordered.slice(0, 5).map((s, i) => ({ ...s, rank: i + 1 })),
        note: `Meridian via ${provider.name} (${provider.model})`,
      };
    } catch {
      // try next
    }
  }
  return { ...input.local, note: "LLM unreachable — Meridian local ranking." };
}

export function assistProvidersConfigured(): boolean {
  return resolveProviders().length > 0;
}
