"use client";
import { useState } from "react";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus(data.message || "Something went wrong");
      }
    } catch (err) {
      setStatus("Failed to send message. Please try again.");
    }

    setLoading(false);
  };

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
          maxWidth: 760,
          margin: "0 auto",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 32,
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontSize: 32,
              background:
                "linear-gradient(to right, #fcd34d, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact PalmMitra Support
          </h1>

          <p style={{ fontSize: 14, opacity: 0.75, marginTop: 8 }}>
            We’re here to help with reports, payments, or any technical issues.
          </p>
        </div>

        <div
          style={{
            padding: 18,
            borderRadius: 14,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 20,
          }}
        >
          <h3 style={{ marginBottom: 6 }}>📧 Support Email</h3>

          <p>
            <strong>readings@palmmitra.in</strong>
          </p>

          <p style={{ fontSize: 12, opacity: 0.6 }}>
            Average response time: within 24 hours
          </p>
        </div>
        {/* PAYMENT SUPPORT */}
        <div
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 14,
            background: "rgba(255,255,255,0.05)",
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
        <div
          style={{
            marginTop: 24,
            padding: 20,
            borderRadius: 16,
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Send Us a Message</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 10,
                borderRadius: 10,
                background: "#111",
                border: "1px solid #222",
                color: "#fff",
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 10,
                borderRadius: 10,
                background: "#111",
                border: "1px solid #222",
                color: "#fff",
              }}
            />

            <textarea
              name="message"
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 10,
                borderRadius: 10,
                background: "#111",
                border: "1px solid #222",
                color: "#fff",
                minHeight: 90,
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
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
              <p style={{ marginTop: 10, fontSize: 13 }}>
                {status}
              </p>
            )}
          </form>
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 12,
            opacity: 0.6,
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          Your privacy is fully protected.  
          PalmMitra never shares user data with third parties.
        </div>
      </div>
    </main>
  );
}
