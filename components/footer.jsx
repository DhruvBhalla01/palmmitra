export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 60,
        padding: "32px 20px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          textAlign: "center",
        }}
      >
        {/* LINKS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          <a href="/contact" style={linkStyle}>Contact Us</a>
          <a href="/privacy" style={linkStyle}>Privacy Policy</a>
          <a href="/terms" style={linkStyle}>Terms & Conditions</a>
          <a href="/refund-policy" style={linkStyle}>Refund & Cancellation</a>
        </div>

        {/* DISCLAIMER */}
        <p
          style={{
            fontSize: 12,
            opacity: 0.6,
            lineHeight: 1.6,
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          PalmMitra provides AI-based guidance for clarity and self-reflection only.
          Insights are not predictions or guarantees. Decisions should be taken using
          personal judgment and real-world context.
        </p>

        {/* BUSINESS INFO */}
        <div
          style={{
            fontSize: 12,
            opacity: 0.5,
            lineHeight: 1.6,
          }}
        >
          © {new Date().getFullYear()} PalmMitra Digital Services  
          <br />
          Support: readings@palmmitra.in
        </div>
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "#fcd34d",
  textDecoration: "none",
  opacity: 0.85,
};
