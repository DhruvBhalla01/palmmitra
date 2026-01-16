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

        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
          Your Palm Snapshot
        </h1>

        <p className="text-sm opacity-70 mb-6">
          Yeh sirf surface-level observations hain.  
          Career direction, paisa flow aur risk timing ka real picture  
          full report mein clear hota hai.
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {previewData && (
          <>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 mb-6">
              <h3 className="font-semibold mb-1">
                What’s clearly visible in your palm
              </h3>

              <p className="text-xs opacity-60 mb-3">
                In observations se tendencies samajh aati hain,  
                lekin decisions aur timing deeper analysis se nikalti hai.
              </p>

              <ul className="text-sm opacity-80 space-y-1 list-disc ml-4">
                <li>Palm Shape: {previewData.palmShape}</li>
                <li>Major Lines Visibility: {previewData.majorLinesVisibility}</li>
              </ul>
            </div>

            <div className="text-sm opacity-80 leading-relaxed mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
              <strong className="block mb-2">
                🔓 Full Report mein kya milega:
              </strong>

              <ul className="list-disc ml-4 space-y-1">
                <li>Career direction jo aapki natural strengths ke saath align hoti hai</li>
                <li>Paisa flow ka pattern – stability vs growth phases</li>
                <li>Risk window – kab push karna chahiye, kab hold</li>
                <li>Clear 90-day action plan (practical, no gyaan)</li>
              </ul>

              <p className="mt-2 text-xs opacity-70">
                Yeh report guessing par nahi, observed patterns par based hoti hai.
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                loading
                  ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-300 to-amber-500 text-black hover:scale-[1.02]"
              }`}
            >
              {loading
                ? "Processing Payment..."
                : "Unlock Full Career & Paisa Report – ₹99"}
            </button>

            <p className="text-xs opacity-60 text-center mt-2">
              Instant access • Downloadable PDF • No subscription
            </p>

            <button
              onClick={() => router.push("/upload")}
              className="w-full mt-3 py-2 rounded-xl border border-white/20 text-sm opacity-80 hover:opacity-100 transition"
            >
              Re-upload Palm Image
            </button>

            <p className="text-[11px] opacity-40 mt-5 text-center">
              PalmMitra clarity ke bina guess nahi karta.  
              Jahan confidence kam hota hai, wahan clearly bataya jaata hai.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
