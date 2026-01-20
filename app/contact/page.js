export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #111 0%, #000 60%)",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        padding: "32px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        }}
      >
        <h1>Contact Us</h1>

        <p style={{ fontSize: 14, opacity: 0.7, marginTop: 10 }}>
          We are here to help you with any questions about PalmMitra reports,
          payments, or technical issues.
        </p>

        <div
          style={{
            marginTop: 24,
            padding: 20,
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <h3 style={{ marginBottom: 10 }}>Support Email</h3>

          <p style={{ opacity: 0.85 }}>
            📧 <strong>readings@palmmitra.in</strong>
          </p>

          <p style={{ fontSize: 13, opacity: 0.6, marginTop: 6 }}>
            Response time: within 24 hours
          </p>
        </div>

        <div
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <h3 style={{ marginBottom: 10 }}>Business Address</h3>

          <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
            PalmMitra Digital Services  
            Bengaluru, Karnataka  
            India
          </p>
        </div>

        <div
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <h3 style={{ marginBottom: 10 }}>Payment & Refund Queries</h3>

          <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
            For any issues related to payments, report access, or refund requests,
            please email us with:
          </p>

          <ul style={{ marginTop: 10, opacity: 0.8 }}>
            <li>Registered email</li>
            <li>Payment transaction ID</li>
            <li>Date of purchase</li>
          </ul>
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 12,
            opacity: 0.5,
            lineHeight: 1.6,
          }}
        >
          PalmMitra is an AI-powered guidance platform.  
          For privacy-related queries, you can also write to the same support email.
        </div>
      </div>
    </main>
  );
}
