import "./globals.css";
import ClientHeader from "@/components/ClientHeader";

export const metadata = {
  title: "PalmMitra – Career & Paisa Guidance",
  description: "AI-powered palm insights for confident career and money decisions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen text-white antialiased overflow-x-hidden">

        {/* ========= GLOBAL BASE ========= */}
        <div className="fixed inset-0 -z-30 bg-black" />

        {/* ========= OPTION A : DEPTH + GLOW ========= */}
        <div
          className="fixed inset-0 -z-20"
          style={{
            background: `
              radial-gradient(circle at 50% 18%, rgba(255,180,60,0.16), transparent 40%),
              radial-gradient(circle at 80% 0%, rgba(255,140,0,0.12), transparent 45%),
              radial-gradient(circle at 20% 0%, rgba(255,200,120,0.10), transparent 50%),
              radial-gradient(circle at 50% 100%, rgba(0,0,0,0.95), #000 70%)
            `,
          }}
        />

        {/* ========= OPTION C : SUBTLE GRAIN (INLINE SAFE) ========= */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.035]"
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

        {/* ========= APP CONTENT ========= */}
         <ClientHeader />
        {children}

      </body>
    </html>
  );
}
