"use client";
import { useState } from "react";

export default function RefundPage() {
  const [open, setOpen] = useState("delivery");

  const Section = ({ id, title, children }) => (
    <div
      style={{
        marginTop: 16,
        borderRadius: 14,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(open === id ? null : id)}
        style={{
          width: "100%",
          padding: "16px 18px",
          textAlign: "left",
          background: "transparent",
          border: "none",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <span style={{ opacity: 0.6 }}>
          {open === id ? "−" : "+"}
        </span>
      </button>

      {open === id && (
        <div
          style={{
            padding: "0 18px 18px",
            fontSize: 14,
            lineHeight: 1.7,
            opacity: 0.85,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #111 0%, #000 60%)",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 32,
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* HEADER */}
        <h1
          style={{
            fontSize: 32,
            background: "linear-gradient(to right, #fcd34d, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Refund & Cancellation Policy
        </h1>

        <p style={{ marginTop: 10, fontSize: 14, opacity: 0.75 }}>
          PalmMitra provides instant digital services. Please read this policy
          carefully before making a purchase.
        </p>

        <p style={{ fontSize: 12, opacity: 0.55, marginTop: 6 }}>
          Last updated: 21 January 2026
        </p>

        {/* SUMMARY */}
        <div
          style={{
            marginTop: 24,
            padding: 18,
            borderRadius: 16,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          <strong>Quick summary:</strong>
          <ul style={{ marginTop: 10 }}>
            <li>Reports are delivered instantly after payment</li>
            <li>Digital services are considered consumed upon delivery</li>
            <li>Refunds are limited to technical failures only</li>
            <li>No refunds after successful report access</li>
          </ul>
        </div>

        {/* SECTIONS */}
        <Section id="delivery" title="1. Instant Digital Delivery">
          <p>
            PalmMitra delivers AI-generated reports instantly after successful
            payment confirmation.
          </p>

          <p style={{ marginTop: 8 }}>
            Once the report is generated and made accessible, the service is
            considered fully delivered and consumed.
          </p>
        </Section>

        <Section id="norefund" title="2. No Refund After Delivery">
          <p>
            Due to the nature of instant digital content, refunds are not
            provided once a report has been successfully generated and accessed.
          </p>

          <p style={{ marginTop: 8 }}>
            This policy aligns with standard practices for digital services and
            downloadable content.
          </p>
        </Section>

        <Section id="exceptions" title="3. Refund Exceptions">
          <p>
            Refunds may be considered only under the following circumstances:
          </p>

          <ul style={{ marginTop: 8 }}>
            <li>Payment deducted but report not delivered</li>
            <li>Technical failure from PalmMitra’s platform</li>
          </ul>

          <p style={{ marginTop: 8 }}>
            Refund requests are evaluated on a case-by-case basis.
          </p>
        </Section>

        <Section id="process" title="4. Refund Request Process">
          <p>
            To request a refund (where applicable), please email us with:
          </p>

          <ul style={{ marginTop: 8 }}>
            <li>Registered email address</li>
            <li>Payment transaction ID</li>
            <li>Date of purchase</li>
            <li>Brief description of the issue</li>
          </ul>
        </Section>

        <Section id="contact" title="5. Contact for Support">
          <p>
            For refund-related queries, contact us at:
            <br />
            <strong>readings@palmmitra.in</strong>
          </p>
        </Section>

        {/* FOOTER */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 18,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            fontSize: 13,
            opacity: 0.65,
            lineHeight: 1.6,
          }}
        >
          PalmMitra reserves the right to approve or deny refund requests based on
          policy compliance and verification.
        </div>
      </div>
    </main>
  );
}
