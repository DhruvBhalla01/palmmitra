export default function RefundPage() {
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
        <h1>Refund & Cancellation Policy</h1>

        <p style={{ marginTop: 16, opacity: 0.8 }}>
          PalmMitra provides instant digital services. Please read our refund
          policy carefully before purchasing.
        </p>

        <h3 style={{ marginTop: 24 }}>Instant Digital Delivery</h3>

        <p style={{ opacity: 0.8 }}>
          Once payment is completed and the AI-generated report is delivered,
          the service is considered fully consumed.
        </p>

        <h3 style={{ marginTop: 24 }}>No Refund Policy</h3>

        <p style={{ opacity: 0.8 }}>
          Due to the nature of digital and instantly delivered content,
          refunds are not provided after a report has been successfully
          generated and accessed.
        </p>

        <h3 style={{ marginTop: 24 }}>Exceptions</h3>

        <p style={{ opacity: 0.8 }}>
          Refunds may be considered only in the following cases:
        </p>

        <ul style={{ marginTop: 10, opacity: 0.8 }}>
          <li>Payment deducted but report not delivered</li>
          <li>Technical failure from our platform side</li>
        </ul>

        <h3 style={{ marginTop: 24 }}>Contact for Support</h3>

        <p style={{ opacity: 0.8 }}>
          For refund-related queries, contact us at:
          <br />
          readings@palmmitra.in
        </p>
      </div>
    </main>
  );
}
