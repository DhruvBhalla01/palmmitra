import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: true });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an image analysis engine.

Task:
Extract ONLY visible palm features.
Do NOT judge image quality.
Do NOT score clarity.
Do NOT guess missing details.

If a feature is not clearly visible, use the string "unclear".

Return STRICT JSON only in this format:
{
  "palmShape": "",
  "majorLinesVisibility": "",
  "lineBreaks": "",
  "fingerProportion": ""
}
          `,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this palm image." },
            {
              type: "image_url",
              image_url: { url: imageBase64 },
            },
          ],
        },
      ],
    });

    let features;
    try {
      features = JSON.parse(response.choices[0].message.content);
    } catch {
      return NextResponse.json({ error: true });
    }

    // 🔒 ABSOLUTE SANITIZE (final clarity fix)
    const {
      clarityScore,
      clarity,
      confidence,
      imageQuality,
      ...safeFeatures
    } = features;

    return NextResponse.json({ features: safeFeatures });
  } catch (err) {
    console.error("FEATURE EXTRACTION ERROR:", err);
    return NextResponse.json({ error: true });
  }
}
