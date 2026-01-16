import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-black text-white px-4 py-8">
      <div className="max-w-5xl mx-auto text-center">

        {/* HERO SECTION */}
        <section className="mt-10">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-4">
            PalmMitra
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-1">
            AI-based palm insights for career & paisa clarity
          </p>

          <p className="text-sm opacity-60 mb-8">
            No guesswork. No fear. Just direction.
          </p>

          <Link href="/upload">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 text-black font-bold text-lg shadow-lg shadow-amber-500/20 hover:scale-105 transition-all">
              Start Palm Analysis – ₹99
            </button>
          </Link>

          <p className="mt-3 text-xs opacity-60">
            Instant report • Downloadable PDF • No subscription
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8">How PalmMitra Works</h2>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all">
              <h3 className="text-lg font-semibold mb-2">1. Upload Palm Image</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Clear photo upload karein. AI sirf visible patterns par kaam karta hai.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all">
              <h3 className="text-lg font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Palm lines aur structure ka rational analysis hota hai – bina predictions ke.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all">
              <h3 className="text-lg font-semibold mb-2">3. Get Clarity Report</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Career direction, paisa flow aur 90-day action plan milta hai.
              </p>
            </div>
          </div>
        </section>

        {/* WHY PALMMITRA */}
        <section className="mt-20">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-3xl font-bold mb-3">Honest AI. No Hype.</h2>

            <p className="opacity-75 text-base leading-relaxed">
              PalmMitra astrology app nahi hai.  
              Yeh ek practical clarity tool hai jo visible patterns  
              ke basis par guidance deta hai – bina dar, bina false promises.
            </p>
          </div>
        </section>

        {/* TRUST BADGES */}
        <section className="mt-14">
          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-70">
            <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              🔒 Secure Payments
            </span>
            <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              ⚡ Instant Access
            </span>
            <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              📄 Downloadable PDF
            </span>
            <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              🇮🇳 Indian Context
            </span>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-20">
          <Link href="/upload">
            <button className="px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:scale-105 transition-all">
              Try PalmMitra Now
            </button>
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="mt-20 text-center">
          <Link href="/contact">
            <p className="text-sm opacity-70 hover:opacity-100 transition cursor-pointer">
              Contact Us
            </p>
          </Link>

          <div className="mt-3 text-xs opacity-60 flex flex-wrap justify-center gap-4">
            <a href="/privacy" className="hover:opacity-90">Privacy Policy</a>
            <a href="/terms" className="hover:opacity-90">Terms</a>
            <a href="/refund-policy" className="hover:opacity-90">Refund Policy</a>
          </div>

          <p className="mt-4 text-[11px] opacity-40">
            PalmMitra provides AI-based directional guidance only.
          </p>
        </footer>

      </div>
    </main>
  );
}
