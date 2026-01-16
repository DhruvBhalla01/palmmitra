"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

export default function ReportPage() {
  const router = useRouter();
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isPaid = localStorage.getItem("isPaid");
    if (isPaid !== "true") {
      router.push("/preview");
      return;
    }

    const raw = localStorage.getItem("palmFeatures");
    if (!raw || raw === "[object Object]") {
      setReport("Palm data corrupted. Please upload again.");
      setLoading(false);
      return;
    }

    const features = JSON.parse(raw);

    fetch("/api/generate-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReport(data.report || "Unable to generate report.");
        setLoading(false);
      });
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    let y = 60;

    doc.setFont("Times", "Bold");
    doc.setFontSize(20);
    doc.text("PalmMitra – Career & Paisa Report", 40, y);

    y += 26;
    doc.setFont("Times", "Normal");
    doc.setFontSize(11);
    doc.text(
      "Based on your uploaded palm. This report focuses on clarity, not prediction.",
      40,
      y
    );

    y += 30;
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(report, 520);
    doc.text(lines, 40, y);

    doc.save("PalmMitra-Career-Paisa-Report.pdf");
  };

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
          maxWidth: 760,
          margin: "0 auto",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: 36,
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        }}
      >
        <h1>Your Career & Paisa Report</h1>
        <p style={{ fontSize: 13, opacity: 0.65, marginTop: 6 }}>
          Based on your uploaded palm
        </p>

        <p style={{ fontSize: 14, opacity: 0.55, marginTop: 18 }}>
          Generated using visible palm observations and AI-based interpretation.
        </p>

        {loading ? (
          <p style={{ opacity: 0.7, marginTop: 24 }}>
            Analyzing palm patterns...
          </p>
        ) : (
          <>
            <div
              style={{
                marginTop: 28,
                whiteSpace: "pre-wrap",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              {report}
            </div>

            <div
              style={{
                marginTop: 32,
                padding: 16,
                borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                fontSize: 14,
                opacity: 0.85,
              }}
            >
              <strong>💭 Think about this:</strong>
              <p style={{ marginTop: 6 }}>
                Agle 90 din mein kaunsa ek decision hai jahan aap consciously
                stability vs growth choose karoge?
              </p>
            </div>

            <button
              onClick={downloadPDF}
              style={{
                marginTop: 28,
                padding: "12px 18px",
                borderRadius: 10,
                border: "none",
                background: "#fff",
                color: "#000",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </>
        )}

        <div
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: 12,
            opacity: 0.45,
            lineHeight: 1.6,
          }}
        >
          This report is designed to give clarity, not certainty. PalmMitra does
          not make guarantees or predictions.
        </div>
      </div>
    </main>
  );
}
