"use client";
import { useState } from "react";
import Footer from "@/components/footer";

export default function TermsPage() {
  const [open, setOpen] = useState("service");

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
          Terms & Conditions
        </h1>

        <p style={{ marginTop: 12, fontSize: 15, opacity: 0.78 }}>
          These Terms govern your access to and use of <strong>PalmMitra</strong>.
          By using the platform, you agree to the conditions outlined below.
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
          <strong>Please read carefully:</strong>
          <ul style={{ marginTop: 12 }}>
            <li>PalmMitra provides guidance, not professional advice</li>
            <li>No guarantees, predictions, or assured outcomes</li>
            <li>All decisions remain the user’s responsibility</li>
            <li>Payments are processed securely and are final</li>
          </ul>
        </div>

        {/* SECTIONS */}
        <Section id="service" title="1. Nature of Service">
          <p>
            PalmMitra is an AI-powered guidance platform that analyzes visible
            palm features to provide directional insights related to career and
            financial decision-making.
          </p>

          <p style={{ marginTop: 8 }}>
            The service is intended strictly for informational and
            self-reflection purposes.
          </p>
        </Section>

        <Section id="noguarantee" title="2. No Guarantees or Predictions">
          <p>
            PalmMitra does <strong>not</strong> offer predictions, guarantees, or
            assurances of any kind regarding career success, income, financial
            outcomes, or life events.
          </p>

          <p style={{ marginTop: 8 }}>
            Insights are interpretive and based only on visible palm features.
          </p>
        </Section>

        <Section id="responsibility" title="3. User Responsibility">
          <p>
            Any decisions taken based on PalmMitra insights are made entirely at
            the user’s discretion and risk.
          </p>

          <p style={{ marginTop: 8 }}>
            Users are advised to apply independent judgment and consult qualified
            professionals where appropriate.
          </p>
        </Section>

        <Section id="payments" title="4. Payments & Access">
          <p>
            Payments are processed securely through third-party gateways such as
            <strong> Razorpay</strong>.
          </p>

          <p style={{ marginTop: 8 }}>
            PalmMitra does not store card details, UPI credentials, or banking
            information.
          </p>

          <p style={{ marginTop: 8 }}>
            Once premium access is granted, payments are considered final,
            subject to the Refund Policy.
          </p>
        </Section>

        <Section id="changes" title="5. Platform Changes">
          <p>
            PalmMitra reserves the right to modify, suspend, or discontinue any
            part of the platform or service at any time.
          </p>
        </Section>

        <Section id="contact" title="6. Contact">
          <p>
            For questions related to these Terms, contact:
            <br />
            <strong>readings@palmmitra.in</strong>
          </p>
        </Section>

<Footer />
      </div>
    </main>
  );
}
