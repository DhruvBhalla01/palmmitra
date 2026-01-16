import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { features } = await req.json();

    if (!features) {
      return NextResponse.json({
        blocked: true,
        message: "Palm data missing. Please upload again.",
      });
    }

    let parsedFeatures;
    try {
      parsedFeatures =
        typeof features === "string" ? JSON.parse(features) : features;
    } catch {
      return NextResponse.json({
        blocked: true,
        message: "Palm data unreadable. Please upload again.",
      });
    }

    // 🔒 FINAL CLARITY FIX:
    // After validation + extraction, NEVER judge image again
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are PalmMitra.

IMPORTANT:
- Palm image has ALREADY passed validation
- Do NOT judge image quality
- Do NOT mention clarity, confidence, or uncertainty
- If features are limited, give balanced, conservative guidance

Generate Career & Paisa guidance only.
Tone: confident Hinglish.
No mysticism. No guessing.
          `,
        },
        {
          role: "user",
          content: `
Palm Features:
${JSON.stringify(parsedFeatures, null, 2)}

Structure:
Opening
Career Direction
Paisa Flow
Risk Window
Next 90-Day Plan
          `,
        },
      ],
    });

    return NextResponse.json({
      blocked: false,
      report: response.choices[0].message.content,
    });
  } catch (err) {
    console.error("REPORT ERROR:", err);
    return NextResponse.json({
      blocked: true,
      message: "PalmMitra abhi busy hai. Thodi der baad try karein.",
    });
  }
}
