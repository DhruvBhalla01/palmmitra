"use client";
import { useState } from "react";

export default function TermsPage() {
  const [open, setOpen] = useState("service");

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
          Terms & Conditions
        </h1>

        <p style={{ marginTop: 10, fontSize: 14, opacity: 0.75 }}>
          By accessing or using <strong>PalmMitra</strong>, you agree to be bound
          by the following terms and conditions.
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
          <strong>Important summary:</strong>
          <ul style={{ marginTop: 10 }}>
            <li>PalmMitra provides guidance, not advice</li>
            <li>No guarantees or predictions are made</li>
            <li>Decisions remain the user’s responsibility</li>
            <li>Payments are final and securely processed</li>
          </ul>
        </div>

        {/* SECTIONS */}
        <Section id="service" title="1. Nature of Service">
          <p>
            PalmMitra is an AI-powered guidance platform that analyzes visible
            palm features to provide career and financial direction.
          </p>

          <p style={{ marginTop: 8 }}>
            The service is intended for informational and self-reflection
            purposes only.
          </p>
        </Section>

        <Section id="noguarantee" title="2. No Guarantees or Predictions">
          <p>
            PalmMitra does <strong>not</strong> provide predictions, guarantees,
            or assurances regarding career success, financial outcomes, or
            personal life results.
          </p>

          <p style={{ marginTop: 8 }}>
            All insights are interpretive and based on visible palm patterns
            only.
          </p>
        </Section>

        <Section id="responsibility" title="3. User Responsibility">
          <p>
            Any decisions made using PalmMitra insights are solely the user’s
            responsibility.
          </p>

          <p style={{ marginTop: 8 }}>
            Users are encouraged to apply independent judgment and seek
            professional advice where appropriate.
          </p>
        </Section>

        <Section id="payments" title="4. Payments & Access">
          <p>
            All payments are processed securely through third-party gateways
            such as <strong>Razorpay</strong>.
          </p>

          <p style={{ marginTop: 8 }}>
            PalmMitra does not store card, UPI, or banking information.
          </p>

          <p style={{ marginTop: 8 }}>
            Once premium access is granted, payments are considered final,
            subject to our Refund Policy.
          </p>
        </Section>

        <Section id="changes" title="5. Changes to Service">
          <p>
            PalmMitra reserves the right to modify, suspend, or discontinue any
            part of the service at any time without prior notice.
          </p>
        </Section>

        <Section id="contact" title="6. Contact">
          <p>
            For any questions regarding these terms, please contact:
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
          PalmMitra is an AI-powered guidance platform. Use of the service implies
          acceptance of these terms.
        </div>
      </div>
    </main>
  );
}
