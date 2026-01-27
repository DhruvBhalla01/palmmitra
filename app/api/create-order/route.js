import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST() {
  try {
    const order = await razorpay.orders.create({
      amount: 99 * 100, // ₹99
      currency: "INR",
      receipt: "palmmitra_receipt_" + Date.now(),
    });

    return NextResponse.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    return NextResponse.json(
      { error: true },
      { status: 500 }
    );
  }
}
