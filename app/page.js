import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* ========= BACKGROUND IMAGE ========= */}
      <div
        className="fixed inset-0 -z-30 bg-center bg-cover"
        style={{
          backgroundImage: "url('/bg-gold.png')",
        }}
      />

      {/* ========= DARK OVERLAY (READABILITY + PREMIUM) ========= */}
      <div className="fixed inset-0 -z-20 bg-black/70" />

      {/* ========= SOFT GOLD GLOW (BRAND DEPTH) ========= */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 50% 18%, rgba(255,180,60,0.22), transparent 45%),
            radial-gradient(circle at 80% 0%, rgba(255,140,0,0.12), transparent 50%),
            radial-gradient(circle at 20% 0%, rgba(255,200,120,0.10), transparent 55%)
          `,
        }}
      />

      {/* ========= SUBTLE FILM GRAIN ========= */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.12),
              rgba(255,255,255,0.12) 1px,
              transparent 1px,
              transparent 2px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.10),
              rgba(255,255,255,0.10) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
        }}
      />

      {/* ========= CONTENT ========= */}
      <div className="relative px-4 py-12">
        <div className="max-w-5xl mx-auto text-center">

          {/* ================= HERO ================= */}
          <section className="mt-20">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-5">
              PalmMitra
            </h1>

            <p className="text-xl md:text-2xl opacity-90 mb-3">
              Career & paisa clarity — based on your palm
            </p>

            <p className="text-sm md:text-base opacity-70 max-w-2xl mx-auto mb-4">
              Built for professionals confused about career direction, money
              decisions, or their next big move.
            </p>

            <p className="text-sm md:text-base opacity-60 mb-10">
              No predictions. No fear.
              <span className="text-amber-300"> Just practical direction.</span>
            </p>

            <Link href="/upload">
              <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 text-black font-bold text-lg shadow-xl shadow-amber-500/30 hover:scale-[1.05] transition-all">
                Start Palm Analysis – ₹99
              </button>
            </Link>

            <p className="mt-3 text-xs opacity-60 flex items-center justify-center gap-2">
              🔒 One-time payment • Instant PDF • No subscription
            </p>
          </section>

          {/* ================= HOW IT WORKS ================= */}
          <section className="mt-28">
            <h2 className="text-3xl font-bold mb-12">How PalmMitra Works</h2>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/10">
                <h3 className="text-lg font-semibold mb-2">
                  1. Upload Palm Image
                </h3>
                <p className="text-sm opacity-75 leading-relaxed">
                  Clear palm photo upload karein. AI sirf visible features analyse karta hai.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur border border-amber-400/40 shadow-lg shadow-amber-500/10">
                <h3 className="text-lg font-semibold mb-2 text-amber-300">
                  2. Rational AI Analysis
                </h3>
                <p className="text-sm opacity-85 leading-relaxed">
                  Palm lines aur structure ka logical analysis —
                  <strong> bina astrology ke.</strong>
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/10">
                <h3 className="text-lg font-semibold mb-2">
                  3. Get Clarity Report
                </h3>
                <p className="text-sm opacity-75 leading-relaxed">
                  Career direction, paisa mindset aur clear 90-day action plan.
                </p>
              </div>
            </div>
          </section>

          {/* ================= VALUE STATEMENT ================= */}
          <section className="mt-28">
            <div className="p-10 rounded-2xl bg-white/8 backdrop-blur border border-white/10">
              <h2 className="text-3xl font-bold mb-4">
                Honest AI. No Hype.
              </h2>

              <p className="opacity-80 text-base leading-relaxed max-w-3xl mx-auto">
                PalmMitra astrology app nahi hai.
                Yeh ek clarity tool hai jo sirf visible palm patterns ke basis par
                decision-making mein madad karta hai —
                bina false promises, bina overconfidence.
              </p>
            </div>
          </section>

          {/* ================= TESTIMONIALS ================= */}
          <section className="mt-28">
            <h2 className="text-3xl font-bold mb-4">
              Trusted by working professionals
            </h2>

            <div className="grid md:grid-cols-3 gap-6 text-left mt-10">
              {[
                {
                  text: "Honestly expected astrology, but report kaafi practical thi. Career clarity mili without gyaan.",
                  name: "Rohit S.",
                  role: "Product Manager"
                },
                {
                  text: "Paisa mindset section ne mujhe realise karwaya main unnecessary risk le raha tha. Worth it.",
                  name: "Neha K.",
                  role: "Startup Professional"
                },
                {
                  text: "Skeptical tha, par analysis logical laga. Predictions nahi, sirf direction.",
                  name: "Aman V.",
                  role: "Consultant"
                }
              ].map((t, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/8 backdrop-blur border border-white/10">
                  <p className="text-sm opacity-85 leading-relaxed mb-4">
                    “{t.text}”
                  </p>
                  <p className="text-xs font-semibold opacity-70">
                    — {t.name}, {t.role}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] opacity-45">
              Individual experiences may vary. PalmMitra does not guarantee outcomes.
            </p>
          </section>

          {/* ================= FINAL CTA ================= */}
          <section className="mt-28">
            <p className="text-lg opacity-85 mb-2">
              If this doesn’t help you think clearer, it’s not for you.
            </p>

            <p className="text-sm opacity-60 mb-6">
              Get clarity before your next big decision.
            </p>

            <Link href="/upload">
              <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 text-black font-bold text-lg hover:scale-[1.05] transition-all">
                Start Palm Analysis – ₹99
              </button>
            </Link>
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}
