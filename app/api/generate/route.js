import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY missing");
      return NextResponse.json({
        text: "Server configuration error (API key missing)",
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const systemPrompt = `
You are PalmMitra, an AI assistant.
Focus ONLY on career and paisa insights.
Tone: confident, practical, Hinglish.
No mysticism, no astrology claims.
`;

const userPrompt =
  type === "preview"
    ? `
Palm observations indicate:
- Career line is visible and steady
- Minimal breaks suggest consistency

Generate:
- 2–3 line personalized opening
- 1 career direction insight
- 1 paisa flow insight

Rules:
- Confident Hinglish
- Indian context
- Not generic advice
`
    : `
Palm observations indicate:
- Major career line is visible and steady
- Breaks are minimal, suggesting consistency
- Line direction shows growth after sustained effort

Now generate a FULL Career & Paisa report with these strict rules:

RULES:
1. Confident Hinglish (Indian tone)
2. No generic career blog advice
3. Indirect palm references (no mysticism)
4. Assume user is 25–35, salaried or transitioning to business
5. Focus on real-life career + paisa flow
6. No Western examples or app names
7. Make it feel personally observed

EXTRA RULES:
- Do NOT use words like Bhaisaab, Bahenji
- Start every section with a palm-based observation line
- Avoid naming investment products; focus on money behavior instead

STRUCTURE:
- Strong personalized opening (2–3 lines)
- Career Direction (what suits / what to avoid)
- Paisa Flow Pattern (earning + saving behavior)
- Risk Window (when to push, when to stay stable)
- Clear next 90-day action plan
`;


    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    return NextResponse.json({
      text: response.choices[0].message.content,
    });
  } catch (err) {
    console.error("PALMMITRA API CRASH:", err);

    return NextResponse.json({
      text: "PalmMitra abhi busy hai. Thodi der baad try karein.",
    });
  }
}
