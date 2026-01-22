"use client";
import { useState } from "react";
import Footer from "@/components/footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.message || "Something went wrong");
      }
    } catch {
      setStatus("Failed to send message. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen px-4 py-16 text-white">
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 22,
          padding: 36,
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 34,
              background: "linear-gradient(to right, #fcd34d, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact PalmMitra Support
          </h1>

          <p style={{ fontSize: 15, opacity: 0.75, marginTop: 8 }}>
            We’re here to help with reports, payments, or any technical issues.
          </p>
        </div>

        {/* SUPPORT EMAIL */}
        <div
          style={{
            padding: 20,
            borderRadius: 16,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            marginBottom: 22,
          }}
        >
          <h3 style={{ marginBottom: 6 }}>📧 Support Email</h3>
          <strong>readings@palmmitra.in</strong>
          <p style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>
            Average response time: within 24 hours
          </p>
        </div>

        {/* PAYMENT SUPPORT */}
        <div
          style={{
            padding: 20,
            borderRadius: 16,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 26,
          }}
        >
          <h3 style={{ marginBottom: 8 }}>💳 Payment & Refund Queries</h3>
          <p style={{ fontSize: 13, opacity: 0.85 }}>
            For faster resolution, please share:
          </p>
          <ul style={{ marginTop: 10, opacity: 0.8 }}>
            <li>Registered email address</li>
            <li>Payment transaction ID</li>
            <li>Date of purchase</li>
          </ul>
        </div>

        {/* CONTACT FORM */}
        <div
          style={{
            padding: 22,
            borderRadius: 18,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 style={{ marginBottom: 14 }}>Send Us a Message</h3>

          <form onSubmit={handleSubmit}>
            {["name", "email"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field === "name" ? "Your Name" : "Your Email"}
                value={form[field]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: 12,
                  marginBottom: 12,
                  borderRadius: 12,
                  background: "#111",
                  border: "1px solid #222",
                  color: "#fff",
                }}
              />
            ))}

            <textarea
              name="message"
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 12,
                marginBottom: 14,
                borderRadius: 12,
                background: "#111",
                border: "1px solid #222",
                color: "#fff",
                minHeight: 110,
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 14,
                border: "none",
                background:
                  "linear-gradient(to right, #fcd34d, #f59e0b)",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Sending..." : "Submit Message"}
            </button>

            {status && (
              <p style={{ marginTop: 12, fontSize: 13 }}>{status}</p>
            )}
          </form>
        </div>

        <Footer />
      </div>
    </main>
  );
}
