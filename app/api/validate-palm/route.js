import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ status: "NO" });
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
You are a strict image validator.

Task:
Decide whether the image is a CLEAR human palm suitable for palm reading.

Rules:
- Reply with EXACTLY ONE WORD only
- Allowed answers: YES, NO, UNCLEAR
- No explanations
          `,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Is this a clear human palm?" },
            {
              type: "image_url",
              image_url: { url: imageBase64 },
            },
          ],
        },
      ],
    });

    const raw =
      response.choices[0].message.content.trim().toUpperCase();

    // 🔒 HARD MAP OUTPUT
    let status = "UNCLEAR";
    if (raw === "YES") status = "YES";
    if (raw === "NO") status = "NO";
    if (raw === "UNCLEAR") status = "UNCLEAR";

    return NextResponse.json({ status });
  } catch (err) {
    console.error("PALM VALIDATION ERROR:", err);
    return NextResponse.json({ status: "UNCLEAR" });
  }
}
