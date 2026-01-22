"use client";
import { useState } from "react";
import Footer from "@/components/footer";

export default function RefundPolicyPage() {
  const [open, setOpen] = useState("overview");

  const Section = ({ id, title, children }) => (
    <div
      style={{
        marginTop: 14,
        borderRadius: 16,
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(open === id ? null : id)}
        style={{
          width: "100%",
          padding: "18px 20px",
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
        <span style={{ opacity: 0.5, fontSize: 18 }}>
          {open === id ? "–" : "+"}
        </span>
      </button>

      {open === id && (
        <div
          style={{
            padding: "0 20px 20px",
            fontSize: 14,
            lineHeight: 1.75,
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
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        padding: "48px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 22,
          padding: 36,
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* HEADER */}
        <h1
          style={{
            fontSize: 34,
            background: "linear-gradient(to right, #fcd34d, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Refund Policy
        </h1>

        <p style={{ marginTop: 12, fontSize: 15, opacity: 0.78 }}>
          This Refund Policy explains how refunds are handled for purchases made
          on <strong>PalmMitra</strong>.
        </p>

        <p style={{ fontSize: 12, opacity: 0.55, marginTop: 6 }}>
          Last updated: 21 January 2026
        </p>

        {/* SUMMARY */}
        <div
          style={{
            marginTop: 26,
            padding: 20,
            borderRadius: 18,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          <strong>Quick summary:</strong>
          <ul style={{ marginTop: 12 }}>
            <li>PalmMitra offers a one-time digital service</li>
            <li>Reports are generated instantly after payment</li>
            <li>Refunds are evaluated only in specific situations</li>
            <li>Payment issues are handled transparently</li>
          </ul>
        </div>

        {/* SECTIONS */}
        <Section id="overview" title="1. Nature of Digital Service">
          <p>
            PalmMitra provides an instant-access, AI-generated digital report
            based on user-uploaded palm images and provided inputs.
          </p>

          <p style={{ marginTop: 8 }}>
            Once a report is generated and access is granted, the service is
            considered delivered.
          </p>
        </Section>

        <Section id="eligibility" title="2. Refund Eligibility">
          <p>
            Refunds may be considered only under the following conditions:
          </p>

          <ul style={{ marginTop: 10 }}>
            <li>Payment was successful but report access was not granted</li>
            <li>Technical failure prevented report generation</li>
            <li>Duplicate payment for the same report</li>
          </ul>

          <p style={{ marginTop: 10 }}>
            Each request is reviewed on a case-by-case basis.
          </p>
        </Section>

        <Section id="noteligible" title="3. Non-Refundable Cases">
          <p>
            Refunds will <strong>not</strong> be provided in the following cases:
          </p>

          <ul style={{ marginTop: 10 }}>
            <li>User dissatisfaction with insights or interpretation</li>
            <li>Change of mind after report access</li>
            <li>Misunderstanding of the service scope</li>
            <li>Partial usage or reading of the report</li>
          </ul>

          <p style={{ marginTop: 10 }}>
            PalmMitra provides guidance, not guaranteed outcomes.
          </p>
        </Section>

        <Section id="process" title="4. Refund Request Process">
          <p>
            To request a refund, please contact our support team with the
            following details:
          </p>

          <ul style={{ marginTop: 10 }}>
            <li>Registered email address</li>
            <li>Payment transaction ID</li>
            <li>Date of purchase</li>
            <li>Brief explanation of the issue</li>
          </ul>

          <p style={{ marginTop: 10 }}>
            Requests must be submitted within <strong>48 hours</strong> of
            purchase.
          </p>
        </Section>

        <Section id="timeline" title="5. Refund Timeline">
          <p>
            Approved refunds are processed within <strong>5–7 business days</strong>.
          </p>

          <p style={{ marginTop: 8 }}>
            The credited amount timeline may vary depending on your bank or
            payment provider.
          </p>
        </Section>

        <Section id="payments" title="6. Payment Gateway">
          <p>
            All payments are processed securely via trusted gateways such as
            <strong> Razorpay</strong>.
          </p>

          <p style={{ marginTop: 8 }}>
            PalmMitra does not control delays caused by banks or third-party
            payment providers.
          </p>
        </Section>

        <Section id="contact" title="7. Contact for Refunds">
          <p>
            For refund-related queries, contact:
            <br />
            <strong>readings@palmmitra.in</strong>
          </p>
        </Section>

<Footer />
      </div>
    </main>
  );
}
