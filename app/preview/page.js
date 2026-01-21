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

    if (!localStorage.getItem("reportLanguage")) {
      localStorage.setItem("reportLanguage", "hinglish");
    }

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
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-black flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-lg p-8 rounded-2xl bg-white/5 border border-white/10 shadow-2xl">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            Your Palm Snapshot
          </h1>

          <span className="inline-block px-3 py-1 text-xs rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
            AI ANALYSIS
          </span>
        </div>

        <p className="text-sm opacity-80 mb-6 leading-relaxed">
          Yeh sirf <span className="text-amber-300">initial observations</span> hain.  
          Real clarity – career direction, paisa flow aur risk behavior –  
          detailed premium report mein milti hai.
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {previewData && (
          <>
            {/* SNAPSHOT CARD */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🔍</span>
                <h3 className="font-semibold text-base">
                  Visible Observations
                </h3>
              </div>

              <p className="text-xs opacity-70 mb-4">
                Inse aapke temperament ka basic structure samajh aata hai.
              </p>

              <ul className="text-sm opacity-90 space-y-3">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">Palm Shape</span>
                  <span className="font-medium">{previewData.palmShape}</span>
                </li>

                <li className="flex justify-between">
                  <span className="opacity-70">Major Lines Visibility</span>
                  <span className="font-medium">{previewData.majorLinesVisibility}</span>
                </li>
              </ul>
            </div>

            {/* VALUE SECTION */}
            <div className="text-sm opacity-95 leading-relaxed mb-6 bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">✨</span>
                <strong>Premium Report Benefits</strong>
              </div>

              <ul className="space-y-2 text-sm">
                <li>• Career direction aligned with your natural temperament</li>
                <li>• Paisa behavior analysis – stability vs growth mindset</li>
                <li>• Risk behavior guidance – kab push, kab hold</li>
                <li>• Practical 90-day action plan – real steps, no generic talk</li>
              </ul>

              <p className="mt-3 text-xs opacity-70">
                No astrology. No guessing. Sirf observed patterns.
              </p>
            </div>

            {/* TRUST SECTION */}
            <div className="mb-6 p-5 rounded-xl bg-white/5 border border-white/10 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <span>✅</span>
                <strong>Trusted by thousands of users</strong>
              </div>

              <p className="text-xs opacity-70">
                Instant PDF • One-time payment • Lifetime access • No subscription
              </p>
            </div>

            {/* MAIN CTA */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold transition-all text-lg ${
                loading
                  ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-300 to-amber-500 text-black hover:scale-[1.02]"
              }`}
            >
              {loading
                ? "Processing Payment..."
                : "Unlock Full Personalized Report – ₹99"}
            </button>

            <p className="text-xs opacity-70 text-center mt-2">
              Instant access • Downloadable PDF • Secure payment
            </p>

            {/* SECONDARY ACTION */}
            <button
              onClick={() => router.push("/upload")}
              className="w-full mt-4 py-2 rounded-xl border border-white/20 text-sm opacity-80 hover:opacity-100 transition"
            >
              Re-upload Palm Image
            </button>

            {/* DISCLAIMER */}
            <p className="text-[11px] opacity-50 mt-6 text-center">
              PalmMitra clarity ke bina guess nahi karta.  
              Limited data hone par honest guidance di jaati hai.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
