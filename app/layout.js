import "./globals.css";
import ClientHeader from "@/components/ClientHeader";

export const metadata = {
  title: "PalmMitra – Career & Paisa Guidance",
  description:
    "AI-powered palm insights for confident career and money decisions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen text-white antialiased overflow-x-hidden">

        {/* BASE BLACK ONLY */}
        <div className="fixed inset-0 -z-30 bg-black" />

        {/* SUBTLE GRAIN – OK FOR ALL PAGES */}
        <div
          className="pointer-events-none fixed inset-0 -z-20 opacity-[0.025]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(255,255,255,0.08),
                rgba(255,255,255,0.08) 1px,
                transparent 1px,
                transparent 2px
              )
            `,
          }}
        />

        {/* HEADER */}
        <ClientHeader />

        {/* PAGE CONTENT */}
        {children}

      </body>
    </html>
  );
}
