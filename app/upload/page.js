"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateImage = (file) => {
    if (!file) return "Please select a palm image.";
    if (!file.type.startsWith("image/")) return "Invalid image format.";
    if (file.size < 100 * 1024) return "Image too small. Use clearer photo.";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateImage(file);
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result;

      const validateRes = await fetch("/api/validate-palm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64 }),
      });
      const validateData = await validateRes.json();

      if (validateData.status !== "YES") {
        alert("Palm clearly visible nahi hai. Re-upload karein.");
        setLoading(false);
        return;
      }

      const extractRes = await fetch("/api/extract-palm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64 }),
      });
      const extractData = await extractRes.json();

      if (!extractData.features) {
        alert("Palm analysis failed.");
        setLoading(false);
        return;
      }

      localStorage.removeItem("palmFeatures");
      localStorage.setItem(
        "palmFeatures",
        JSON.stringify(extractData.features)
      );
      localStorage.setItem("isPaid", "false");

      setLoading(false);
      router.push("/preview");
    };

    reader.readAsDataURL(file);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #111 0%, #000 60%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 32,
          borderRadius: 14,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        }}
      >
        <h1 style={{ marginBottom: 8 }}>PalmMitra</h1>
        <p style={{ opacity: 0.7, fontSize: 14, marginBottom: 24 }}>
          Upload a clear photo of your open palm.
        </p>

        <ul style={{ fontSize: 13, opacity: 0.6, marginBottom: 20 }}>
          <li>• Natural light</li>
          <li>• No shadows</li>
          <li>• Palm fully visible</li>
        </ul>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            width: "100%",
            marginBottom: 20,
            color: "#fff",
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 10,
            border: "none",
            background: loading ? "#444" : "#fff",
            color: "#000",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Analyzing Palm..." : "Continue"}
        </button>

        <p style={{ fontSize: 11, opacity: 0.4, marginTop: 16 }}>
          AI-based analysis. For guidance purposes only.
        </p>
      </div>
    </main>
  );
}
