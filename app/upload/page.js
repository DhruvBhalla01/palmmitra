"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  // SMART LANGUAGE DETECTION
  const detectLanguage = () => {
    if (typeof window === "undefined") return "hinglish";
    const browserLang = navigator.language || "";
    return browserLang.toLowerCase().includes("hi") ? "hinglish" : "english";
  };

  const [language, setLanguage] = useState("hinglish");

  useEffect(() => {
    const savedLang = localStorage.getItem("reportLanguage");
    setLanguage(savedLang || detectLanguage());
  }, []);

  const validateForm = () => {
    if (!file) return "Please upload palm image.";
    if (!file.type.startsWith("image/")) return "Invalid image format.";
    if (file.size < 100 * 1024) return "Image too small.";
    if (!age || age < 10 || age > 80) return "Enter valid age (10–80).";
    if (!gender) return "Select gender.";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) return alert(error);

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
        return setLoading(false);
      }

      const extractRes = await fetch("/api/extract-palm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64 }),
      });

      const extractData = await extractRes.json();
      if (!extractData.features) {
        alert("Palm analysis failed.");
        return setLoading(false);
      }

      localStorage.setItem(
        "palmFeatures",
        JSON.stringify({ ...extractData.features, age, gender })
      );
      localStorage.setItem("reportLanguage", language);
      localStorage.setItem("isPaid", "false");

      router.push("/preview");
    };

    reader.readAsDataURL(file);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 text-white overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-gold.png')" }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-black/70" />

      {/* CONTENT */}
      <div className="w-full max-w-md space-y-6">

        {/* BRAND */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-amber-400">
            PalmMitra
          </h1>
          <p className="text-sm opacity-70 mt-2">
            AI-powered clarity for career & money decisions
          </p>
        </div>

        {/* STEPS */}
        <div className="flex justify-center gap-2 text-xs opacity-80">
          {["1. Upload Palm", "2. AI Analysis", "3. Get Report"].map((s, i) => (
            <div
              key={i}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10"
            >
              {s}
            </div>
          ))}
        </div>

        {/* CARD — MOCKUP MATCH */}
        <div
          className="p-8 rounded-[22px] backdrop-blur-xl border border-white/10 shadow-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(60,40,20,0.9), rgba(25,15,5,0.95))",
          }}
        >
          <h2 className="text-xl font-semibold mb-1">
            Start Your Analysis
          </h2>

          <p className="text-xs opacity-70 mb-6">
            Provide a few details to personalize your report.
          </p>

          {/* AGE */}
          <input
            type="number"
            placeholder="Your age (10–80)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-[#2a1a0e] border border-white/10 text-white placeholder:text-white/50 focus:outline-none"
          />

          {/* GENDER */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-xl bg-[#2a1a0e] border border-white/10 text-white focus:outline-none"
          >
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {/* LANGUAGE TOGGLE — MOCKUP STYLE */}
          <div className="mb-6">
            <div className="flex rounded-xl bg-[#2a1a0e] border border-white/10 overflow-hidden">
              {["hinglish", "english"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`flex-1 py-3 text-sm font-semibold transition ${
                    language === l
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {l === "hinglish" ? "Hinglish" : "English"}
                </button>
              ))}
            </div>

            <p className="text-[11px] opacity-60 mt-2">
              Auto-selected based on your device language
            </p>
          </div>

          {/* FILE UPLOAD — MOCKUP EXACT */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <label className="px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold cursor-pointer hover:bg-amber-300 transition">
                Choose file
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </label>

              <span className="text-sm opacity-60">
                {file ? file.name : "No file chosen"}
              </span>
            </div>

            <p className="text-[11px] opacity-60 mt-2">
              Use natural light, clear background, full palm visible
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-black
              bg-gradient-to-r from-amber-400 to-amber-500
              hover:scale-[1.03] transition-all"
          >
            {loading ? "Analyzing Palm..." : "Generate My Report"}
          </button>

          <p className="text-[11px] opacity-50 mt-4 text-center">
            Secure upload • AI-based analysis • No guesswork
          </p>
        </div>
      </div>
    </main>
  );
}
