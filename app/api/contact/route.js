import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure API key exists
if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY is missing in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic email validation
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // ---------- VALIDATIONS ----------

    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (name.length > 60) {
      return NextResponse.json({
        success: false,
        message: "Name is too long",
      });
    }

    if (message.length > 2000) {
      return NextResponse.json({
        success: false,
        message: "Message too long (max 2000 characters)",
      });
    }

    // ---------- SEND EMAIL VIA RESEND ----------

    await resend.emails.send({
      from: "PalmMitra Support <support@palmmitra.in>",
      to: "readings@palmmitra.in",
      reply_to: email,   // VERY IMPORTANT: so you can reply directly
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; line-height:1.6">
          <h2>New Message from PalmMitra Website</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>
          <p style="white-space:pre-line">${message}</p>

          <hr/>

          <p style="font-size:12px; opacity:0.7">
            Sent from PalmMitra Contact Form
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (err) {
    console.error("Contact form error:", err);

    return NextResponse.json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
}
