import "./globals.css";

export const metadata = {
  title: "PalmMitra – Career & Paisa Guidance",
  description: "AI-powered palm insights for confident career and money decisions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
