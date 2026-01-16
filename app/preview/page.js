"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const router = useRouter();
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rawFeatures = localStorage.getItem("palmFeatures");

    if (!rawFeatures || rawFeatures === "[object Object]") {
      setError("Palm data unavailable. Please upload again.");
      return;
    }

    try {
      const features = JSON.parse(rawFeatures);
      setPreviewData(features);
    } catch {
      setError("Palm data corrupted. Please upload again.");
    }
  }, []);

  // 🔒 LOAD RAZORPAY SCRIPT
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    // ✅ CREATE ORDER
    const orderRes = await fetch("/api/create-order", { method: "POST" });
    const order = await orderRes.json();

    if (!order.id) {
      alert("Unable to create order");
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "PalmMitra",
      description: "Full Career & Paisa Report",
      order_id: order.id,
      handler: async function (response) {
        try {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.verified) {
            localStorage.setItem("isPaid", "true");
            router.push("/report");
          } else {
            alert("Payment verification failed");
          }
        } catch {
          alert("Payment verification error");
        } finally {
          setLoading(false);
        }
      },
      theme: { color: "#ffffff" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
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
          maxWidth: 480,
          padding: 32,
          borderRadius: 14,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* 🔥 UPDATED COPY STARTS */}

        <h1 style={{ marginBottom: 6 }}>Your Palm Snapshot</h1>
        <p style={{ fontSize: 14, opacity: 0.65, marginBottom: 24 }}>
          Yeh sirf surface-level observations hain.  
          Career direction, paisa flow aur risk timing ka real picture
          full report mein clear hota hai.
        </p>

        {error && (
          <p style={{ color: "#ff6b6b", fontSize: 14 }}>{error}</p>
        )}

        {previewData && (
          <>
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                marginBottom: 20,
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              <strong>What’s clearly visible in your palm</strong>
              <p style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>
                In observations se tendencies samajh aati hain,
                lekin decisions aur timing deeper analysis se nikalti hai.
              </p>

              <ul style={{ marginTop: 10, paddingLeft: 18, opacity: 0.85 }}>
                <li>Palm Shape: {previewData.palmShape}</li>
                <li>Major Lines Visibility: {previewData.majorLinesVisibility}</li>
              </ul>
            </div>

            {/* 🔑 VALUE BRIDGE */}
            <div
              style={{
                fontSize: 13,
                opacity: 0.75,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              🔓 <strong>Full Report mein kya milega:</strong>
              <ul style={{ marginTop: 10, paddingLeft: 18 }}>
                <li>Career direction jo aapki natural strengths ke saath align hoti hai</li>
                <li>Paisa flow ka pattern – stability vs growth phases</li>
                <li>Risk window – kab push karna chahiye, kab hold</li>
                <li>Clear 90-day action plan (practical, no gyaan)</li>
              </ul>
              <p style={{ marginTop: 8, opacity: 0.7 }}>
                Yeh report guessing par nahi, observed patterns par based hoti hai.
              </p>
            </div>

            {/* 💳 PAYMENT */}
            <button
              onClick={handlePayment}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "none",
                background: loading ? "#aaa" : "#fff",
                color: "#000",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading
                ? "Processing Payment..."
                : "Unlock Full Career & Paisa Report – ₹99 (One-time)"}
            </button>

            <p
              style={{
                fontSize: 11,
                opacity: 0.55,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              Instant access • Downloadable PDF • No subscription
            </p>

            <button
              onClick={() => router.push("/upload")}
              style={{
                width: "100%",
                marginTop: 12,
                padding: "10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "#fff",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Re-upload Palm Image
            </button>

            <p style={{ fontSize: 11, opacity: 0.45, marginTop: 20 }}>
              PalmMitra clarity ke bina guess nahi karta.  
              Jahan confidence kam hota hai, wahan clearly bataya jaata hai.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
