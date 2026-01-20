export default function PrivacyPage() {
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
        <h1>Privacy Policy</h1>

        <p style={{ marginTop: 16, opacity: 0.8 }}>
          PalmMitra respects your privacy and is committed to protecting any
          personal information you share while using our platform.
        </p>

        <h3 style={{ marginTop: 24 }}>Information We Collect</h3>

        <ul style={{ marginTop: 10, opacity: 0.8 }}>
          <li>Palm image uploaded by the user</li>
          <li>Email or payment details (handled securely by Razorpay)</li>
          <li>Basic usage analytics</li>
        </ul>

        <h3 style={{ marginTop: 24 }}>How We Use Your Data</h3>

        <p style={{ opacity: 0.8 }}>
          The palm image you upload is used only to generate your personalized
          AI-based career and financial guidance report. We do not use your
          images for any other purpose.
        </p>

        <h3 style={{ marginTop: 24 }}>Data Storage</h3>

        <p style={{ opacity: 0.8 }}>
          Palm images and generated reports are processed securely. We do not
          store images permanently beyond the processing period required to
          deliver your report.
        </p>

        <h3 style={{ marginTop: 24 }}>Third-Party Services</h3>

        <p style={{ opacity: 0.8 }}>
          Payments are processed via Razorpay. PalmMitra does not store any
          card or payment information directly.
        </p>

        <h3 style={{ marginTop: 24 }}>Contact</h3>

        <p style={{ opacity: 0.8 }}>
          For any privacy-related concerns, contact us at:
          <br />
          readings@palmmitra.in
        </p>
      </div>
    </main>
  );
}
