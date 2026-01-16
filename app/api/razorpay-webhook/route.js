import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("INVALID WEBHOOK SIGNATURE");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // 🎯 WE ONLY CARE ABOUT PAYMENT CAPTURE
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      console.log("PAYMENT CAPTURED:", {
        paymentId: payment.id,
        amount: payment.amount,
        email: payment.email,
        contact: payment.contact,
      });

      // 🔒 FUTURE: save to DB (Phase-3)
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return NextResponse.json(
      { error: "Webhook failure" },
      { status: 500 }
    );
  }
}
