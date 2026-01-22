import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* ========= BACKGROUND : OPTION A (DEPTH) ========= */}
      <div className="absolute inset-0 -z-20 bg-black" />

      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 50% 20%, rgba(255,180,60,0.18), transparent 40%),
            radial-gradient(circle at 80% 0%, rgba(255,140,0,0.12), transparent 45%),
            radial-gradient(circle at 20% 0%, rgba(255,200,120,0.10), transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(0,0,0,0.9), #000 70%)
          `,
        }}
      />

      {/* ========= OPTION C : SUBTLE GRAIN ========= */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.15),
              rgba(255,255,255,0.15) 1px,
              transparent 1px,
              transparent 2px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.12),
              rgba(255,255,255,0.12) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
        }}
      />

      {/* ========= CONTENT ========= */}
      <div className="relative px-4 py-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* ================= HERO ================= */}
          <section className="mt-16">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-4">
              PalmMitra
            </h1>

            <p className="text-xl md:text-2xl opacity-90 mb-2">
              Career & paisa clarity — based on your palm
            </p>

            <p className="text-sm md:text-base opacity-60 mb-10">
              No predictions. No fear.  
              <span className="text-amber-300"> Just practical direction.</span>
            </p>

            <Link href="/upload">
              <button className="px-9 py-4 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 text-black font-bold text-lg shadow-xl shadow-amber-500/25 hover:scale-[1.04] transition-all">
                Start Palm Analysis – ₹99
              </button>
            </Link>

            <p className="mt-3 text-xs opacity-60">
              Instant report • Downloadable PDF • One-time payment
            </p>
          </section>

          {/* ================= HOW IT WORKS ================= */}
          <section className="mt-24">
            <h2 className="text-3xl font-bold mb-10">How PalmMitra Works</h2>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: "1. Upload Palm Image",
                  desc: "Clear palm photo upload karein. AI sirf visible features analyse karta hai."
                },
                {
                  title: "2. Rational AI Analysis",
                  desc: "Palm lines aur structure ka logical analysis hota hai — bina astrology ke."
                },
                {
                  title: "3. Get Clarity Report",
                  desc: "Career direction, paisa mindset aur 90-day action clarity milti hai."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:border-amber-400/30 transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= VALUE STATEMENT ================= */}
          <section className="mt-24">
            <div className="p-10 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
              <h2 className="text-3xl font-bold mb-4">
                Honest AI. No Hype.
              </h2>

              <p className="opacity-75 text-base leading-relaxed max-w-3xl mx-auto">
                PalmMitra astrology app nahi hai.  
                Yeh ek clarity tool hai jo sirf visible palm patterns ke basis par  
                aapko decision-making mein madad karta hai —  
                bina false promises, bina overconfidence.
              </p>
            </div>
          </section>

          {/* ================= TESTIMONIALS ================= */}
          <section className="mt-24">
            <h2 className="text-3xl font-bold mb-10">
              What Users Say
            </h2>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  text:
                    "Honestly expected astrology, but report kaafi practical thi. Career clarity mili without gyaan.",
                  name: "Rohit S.",
                  role: "Product Manager"
                },
                {
                  text:
                    "Paisa mindset section ne mujhe realise karwaya main unnecessary risk le raha tha. Worth it.",
                  name: "Neha K.",
                  role: "Startup Professional"
                },
                {
                  text:
                    "Skeptical tha, par analysis logical laga. Predictions nahi, sirf direction — which I liked.",
                  name: "Aman V.",
                  role: "Consultant"
                }
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
                >
                  <p className="text-sm opacity-80 leading-relaxed mb-4">
                    “{t.text}”
                  </p>
                  <p className="text-xs opacity-60">
                    — {t.name}, {t.role}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] opacity-50">
              Individual experiences may vary. PalmMitra does not guarantee outcomes.
            </p>
          </section>

          {/* ================= TRUST STRIP ================= */}
          <section className="mt-20">
            <div className="flex flex-wrap justify-center gap-5 text-sm opacity-70">
              {[
                "🔒 Secure Razorpay Payments",
                "⚡ Instant Access",
                "📄 Downloadable PDF",
                "🇮🇳 Built for Indian Context"
              ].map((b, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                >
                  {b}
                </span>
              ))}
            </div>
          </section>

          {/* ================= FINAL CTA ================= */}
          <section className="mt-24">
            <p className="text-lg opacity-80 mb-4">
              Get clarity before your next big decision.
            </p>

            <Link href="/upload">
              <button className="px-9 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:scale-[1.04] transition-all">
                Generate My Report
              </button>
            </Link>
          </section>


<Footer />

        </div>
      </div>
    </main>
  );
}
