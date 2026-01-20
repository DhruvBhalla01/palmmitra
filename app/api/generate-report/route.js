import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { features, language } = await req.json();

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

    // Extract age and gender if present
    const userAge = parsedFeatures.age || "Not Provided";
    const userGender = parsedFeatures.gender || "Not Provided";

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
const selectedLanguage = language === "english" ? "English" : "Hinglish";

const response = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: `
You are PalmMitra — an AI system that provides CAREER & PAISA clarity
based strictly on VISIBLE PALM FEATURES extracted earlier.

LANGUAGE RULE:
- The report MUST be generated strictly in: ${selectedLanguage}
- If language is English → write in clear professional Indian English
- If language is Hinglish → write in clean Hinglish (Hindi + English mix)

Do NOT mix languages.

══════════════════════════════════════
NON-NEGOTIABLE RULES (ABSOLUTE)
══════════════════════════════════════

1) IMAGE HANDLING
- Palm image has ALREADY passed validation
- NEVER judge image quality
- NEVER mention clarity, confidence, uncertainty, or visibility

2) HONESTY & SAFETY
- NO fortune-telling
- NO future predictions
- NO guarantees
- NO mystical / astrological language

3) PALM-FIRST PRINCIPLE
- Insights must feel rooted in palm temperament
- Avoid advice that could apply to anyone
- Convert palm features into:
  • decision style
  • work temperament
  • stress handling
  • risk behavior
  • money discipline

4) TONE
- Calm, confident, grounded
- Indian middle-class practical tone
- Professional, not motivational speaker

══════════════════════════════════════
MANDATORY OUTPUT STRUCTURE
══════════════════════════════════════

### PERSONAL MIRROR  
### WHAT YOUR PALM REFLECTS  
### CAREER DIRECTION  
### PAISA FLOW PATTERN  
### RISK WINDOW  
### 90-DAY ACTION PLAN  
### FINAL PUSH  
### SHARE HOOK  

══════════════════════════════════════
STRICTLY FORBIDDEN
══════════════════════════════════════

- Astrology terms  
- “Luck”, “fate”, “destiny”  
- Predictions or timelines  
- Emotional manipulation  

The user must feel:

“This report understands how I think and decide — based on my palm temperament.”
`,
    },
    {
      role: "user",
      content: `
User Selected Language: ${selectedLanguage}

Palm Features:
${JSON.stringify(parsedFeatures, null, 2)}
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
