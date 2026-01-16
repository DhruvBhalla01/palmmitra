import Link from "next/link";

export default function Home() {
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
      }}
    >
      <div
        style={{
          maxWidth: 440,
          padding: 36,
          textAlign: "center",
          background: "rgba(255,255,255,0.04)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h1>PalmMitra</h1>

        <p style={{ opacity: 0.75, marginTop: 10, fontSize: 15 }}>
          AI-based palm insights for career & paisa clarity
        </p>

        <p style={{ opacity: 0.5, marginTop: 6, fontSize: 13 }}>
          No guesswork. No fear. Just direction.
        </p>

        <Link href="/upload">
          <button
            style={{
              marginTop: 32,
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: "#fff",
              color: "#000",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Start Palm Analysis
          </button>
        </Link>

        <p style={{ fontSize: 12, opacity: 0.45, marginTop: 16 }}>
          Upload a clear palm image to begin your report.
        </p>
      </div>
    </main>
  );
}
