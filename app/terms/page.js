export default function TermsPage() {
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
          maxWidth: 800,
          margin: "0 auto",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: 32,
        }}
      >
        <h1>Terms & Conditions</h1>

        <p style={{ marginTop: 16, opacity: 0.8 }}>
          By using PalmMitra, you agree to the following terms.
        </p>

        <h3 style={{ marginTop: 24 }}>Nature of Service</h3>

        <p style={{ opacity: 0.8 }}>
          PalmMitra provides AI-based guidance based on visible palm features.
          The service is for informational and self-reflection purposes only.
        </p>

        <h3 style={{ marginTop: 24 }}>No Guarantees</h3>

        <p style={{ opacity: 0.8 }}>
          PalmMitra does not provide predictions, guarantees, or promises of
          career success, financial gain, or personal outcomes.
        </p>

        <h3 style={{ marginTop: 24 }}>User Responsibility</h3>

        <p style={{ opacity: 0.8 }}>
          Decisions made using insights from PalmMitra are solely the user’s
          responsibility. We encourage practical judgment in all decisions.
        </p>

        <h3 style={{ marginTop: 24 }}>Payments</h3>

        <p style={{ opacity: 0.8 }}>
          All payments are processed securely through Razorpay. PalmMitra does
          not store payment details.
        </p>

        <h3 style={{ marginTop: 24 }}>Changes to Service</h3>

        <p style={{ opacity: 0.8 }}>
          We reserve the right to modify or discontinue the service at any time.
        </p>

        <h3 style={{ marginTop: 24 }}>Contact</h3>

        <p style={{ opacity: 0.8 }}>
          For any questions about these terms, contact:
          <br />
          readings@palmmitra.in
        </p>
      </div>
    </main>
  );
}
