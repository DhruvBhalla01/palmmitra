"use client";
import { useState } from "react";
import Footer from "@/components/footer";

export default function PrivacyPage() {
  const [open, setOpen] = useState("collect");

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
          Privacy Policy
        </h1>

        {/* CONTEXT SETTING */}
        <p style={{ marginTop: 12, fontSize: 15, opacity: 0.78 }}>
          This page explains how <strong>PalmMitra</strong> handles your data —
          clearly, responsibly, and without hidden intent.
        </p>

        <p style={{ fontSize: 12, opacity: 0.55, marginTop: 6 }}>
          Last updated: 21 January 2026
        </p>

        {/* TRUST SUMMARY */}
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
          <strong>How PalmMitra protects you:</strong>
          <ul style={{ marginTop: 12, opacity: 0.9 }}>
            <li>We <strong>never sell</strong> user data</li>
            <li>Palm images are <strong>not stored permanently</strong></li>
            <li>No advertising, profiling, or tracking</li>
            <li>Payments handled securely via <strong>Razorpay</strong></li>
          </ul>
        </div>

        {/* ACCORDION */}
        <Section id="collect" title="1. Information We Collect">
          <ul>
            <li>Palm image uploaded by the user</li>
            <li>Age and gender (if provided)</li>
            <li>Email address (if provided)</li>
            <li>Payment-related metadata (handled by Razorpay)</li>
            <li>Basic usage and device analytics</li>
          </ul>
        </Section>

        <Section id="use" title="2. How We Use Your Data">
          <ul>
            <li>To generate your personalized AI-based report</li>
            <li>To process payments and unlock premium access</li>
            <li>To improve platform accuracy and reliability</li>
            <li>To respond to customer support queries</li>
            <li>To prevent misuse or fraud</li>
          </ul>

          <p style={{ marginTop: 10 }}>
            We do <strong>not</strong> use your data for marketing, ads, or
            unrelated profiling.
          </p>
        </Section>

        <Section id="payment" title="3. Payments & Security">
          <p>
            All payments are processed through trusted third-party gateways such
            as <strong>Razorpay</strong>.
          </p>

          <p style={{ marginTop: 8 }}>
            PalmMitra does <strong>not</strong> store:
          </p>

          <ul>
            <li>Card numbers</li>
            <li>UPI credentials</li>
            <li>Bank account details</li>
          </ul>
        </Section>

        <Section id="storage" title="4. Data Retention">
          <p>
            Palm images and reports are retained only for the time required to
            deliver your report.
          </p>

          <p style={{ marginTop: 8 }}>
            You may request deletion of your data at any time.
          </p>
        </Section>

        <Section id="rights" title="5. Your Rights">
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of incorrect data</li>
            <li>Request deletion of stored data</li>
            <li>Ask how your data is being used</li>
          </ul>
        </Section>

        <Section id="children" title="6. Children’s Privacy">
          <p>
            PalmMitra is not intended for users under 13 years of age. We do not
            knowingly collect children’s data.
          </p>
        </Section>

        <Section id="changes" title="7. Changes to This Policy">
          <p>
            This policy may be updated occasionally. Any changes will be
            reflected on this page with a revised date.
          </p>
        </Section>

<Footer />

      </div>
    </main>
  );
}
