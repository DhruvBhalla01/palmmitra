"use client";
import { useState } from "react";

export default function PrivacyPage() {
  const [open, setOpen] = useState("collect");

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
          Privacy Policy
        </h1>

        <p style={{ marginTop: 10, fontSize: 14, opacity: 0.75 }}>
          At <strong>PalmMitra</strong>, your privacy is extremely important to us.
          This policy explains how we collect, use, and protect your information.
        </p>

        <p style={{ fontSize: 12, opacity: 0.55, marginTop: 6 }}>
          Last updated: 21 January 2026
        </p>

        {/* TRUST SUMMARY */}
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
          <strong>Your data is safe with us:</strong>
          <ul style={{ marginTop: 10, opacity: 0.9 }}>
            <li>We do <strong>not sell</strong> user data</li>
            <li>We do <strong>not store</strong> palm images permanently</li>
            <li>We do <strong>not use</strong> data for advertising</li>
            <li>Payments are handled securely by <strong>Razorpay</strong></li>
          </ul>
        </div>

        {/* ACCORDION SECTIONS */}
        <Section id="collect" title="1. Information We Collect">
          <ul>
            <li>Palm image uploaded by the user</li>
            <li>Age and gender (if provided)</li>
            <li>Email address (if provided)</li>
            <li>Payment-related metadata (processed by Razorpay)</li>
            <li>Basic usage and device analytics</li>
          </ul>
        </Section>

        <Section id="use" title="2. How We Use Your Data">
          <ul>
            <li>To generate your personalized AI-based report</li>
            <li>To process payments and provide premium access</li>
            <li>To improve platform accuracy and performance</li>
            <li>To respond to customer support requests</li>
            <li>To maintain security and prevent misuse</li>
          </ul>

          <p style={{ marginTop: 10 }}>
            We do <strong>not</strong> use your data for marketing, advertising,
            profiling, or unrelated purposes.
          </p>
        </Section>

        <Section id="payment" title="3. Payments & Security">
          <p>
            All payments on PalmMitra are processed securely via trusted
            third-party gateways such as <strong>Razorpay</strong>.
          </p>

          <p style={{ marginTop: 8 }}>
            PalmMitra does <strong>not</strong> store:
          </p>

          <ul>
            <li>Credit or debit card details</li>
            <li>UPI credentials</li>
            <li>Bank account information</li>
          </ul>
        </Section>

        <Section id="storage" title="4. Data Retention">
          <p>
            Palm images and generated reports are processed securely and retained
            only for the duration required to deliver the service.
          </p>

          <p style={{ marginTop: 8 }}>
            Users may request deletion of their data at any time.
          </p>
        </Section>

        <Section id="rights" title="5. Your Rights">
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of incorrect data</li>
            <li>Request deletion of stored data</li>
            <li>Ask questions about how your data is used</li>
          </ul>
        </Section>

        <Section id="children" title="6. Children’s Privacy">
          <p>
            PalmMitra is not intended for users under 13 years of age. We do not
            knowingly collect data from children.
          </p>
        </Section>

        <Section id="changes" title="7. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            reflected on this page with an updated date.
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
          For any privacy-related questions or data requests, contact us at:
          <br />
          <strong>readings@palmmitra.in</strong>

          <p style={{ marginTop: 10 }}>
            PalmMitra is an AI-powered guidance platform. Insights are based only
            on visible palm features and are not predictions.
          </p>
        </div>
      </div>
    </main>
  );
}
