"use client";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function PayPage() {
  const router = useRouter();

  const handlePay = async () => {
    if (!window.Razorpay) {
      alert("Payment system not loaded. Please refresh.");
      return;
    }

    try {
      // 1️⃣ CREATE ORDER (BACKEND)
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
      });
      const orderData = await orderRes.json();

      if (!orderData.orderId) {
        alert("Unable to initiate payment.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount, // ₹99 in paise
        currency: "INR",
        name: "PalmMitra",
        description: "Career & Paisa Palm Report",
        order_id: orderData.orderId,

        // 2️⃣ PAYMENT SUCCESS → VERIFY SIGNATURE
        handler: async function (response) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (!verifyData.verified) {
            alert("Payment verification failed.");
            return;
          }

          // 3️⃣ UNLOCK ONLY IF VERIFIED
          localStorage.setItem("isPaid", "true");
          localStorage.setItem(
            "razorpay_payment_id",
            response.razorpay_payment_id
          );

          router.push("/report");
        },

        theme: {
          color: "#111",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("PAYMENT ERROR:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* 🔒 Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <main
        style={{
          minHeight: "100vh",
          background: "radial-gradient(circle at top, #111 0%, #000 60%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          padding: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 460,
            padding: 32,
            borderRadius: 14,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          }}
        >
          <h1 style={{ marginBottom: 8 }}>Unlock Full Report</h1>
          <p style={{ fontSize: 14, opacity: 0.65, marginBottom: 24 }}>
            One-time access to your complete Career & Paisa analysis.
          </p>

          <div
            style={{
              padding: 16,
              borderRadius: 10,
              background: "rgba(255,255,255,0.03)",
              fontSize: 14,
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            <ul style={{ paddingLeft: 18, opacity: 0.85 }}>
              <li>Career direction & timing</li>
              <li>Paisa flow insights</li>
              <li>Risk windows</li>
              <li>90-Day action plan</li>
            </ul>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 28,
              fontSize: 14,
            }}
          >
            <span style={{ opacity: 0.6 }}>Amount</span>
            <strong style={{ fontSize: 18 }}>₹99</strong>
          </div>

          <button
            onClick={handlePay}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: "#fff",
              color: "#000",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: 14,
            }}
          >
            Pay ₹99 & View Report
          </button>

          <button
            onClick={() => router.push("/preview")}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "#fff",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Back to Preview
          </button>

          <p style={{ fontSize: 11, opacity: 0.4, marginTop: 18 }}>
            Secure Razorpay checkout. No subscriptions.
          </p>
        </div>
      </main>
    </>
  );
}
