"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  // SMART LANGUAGE DETECTION LOGIC
  const detectLanguage = () => {
    if (typeof window === "undefined") return "hinglish";

    const browserLang = navigator.language || navigator.userLanguage;

    if (browserLang.toLowerCase().includes("hi")) {
      return "hinglish";
    }

    return "english";
  };

  const [language, setLanguage] = useState("hinglish");

  useEffect(() => {
    const savedLang = localStorage.getItem("reportLanguage");

    if (savedLang) {
      setLanguage(savedLang);
    } else {
      const autoLang = detectLanguage();
      setLanguage(autoLang);
    }
  }, []);

  // FORM VALIDATION
  const validateForm = (file, age, gender) => {
    if (!file) return "Please select a palm image.";
    if (!file.type.startsWith("image/")) return "Invalid image format.";
    if (file.size < 100 * 1024) return "Image too small. Use clearer photo.";

    if (!age) return "Please enter your age.";
    if (isNaN(age)) return "Age must be a number.";
    if (age < 10 || age > 80)
      return "Please enter a valid age between 10 and 80.";

    if (!gender) return "Please select your gender.";

    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm(file, age, gender);
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

      localStorage.setItem("reportLanguage", language);
      localStorage.removeItem("palmFeatures");

      localStorage.setItem(
        "palmFeatures",
        JSON.stringify({
          ...extractData.features,
          age: age,
          gender: gender,
        })
      );

      localStorage.setItem("isPaid", "false");

      setLoading(false);
      router.push("/preview");
    };

    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-black flex items-center justify-center px-4 py-12 text-white">
      <div className="w-full max-w-md space-y-6">

        {/* BRAND HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            PalmMitra
          </h1>

          <p className="text-sm opacity-70 mt-2">
            AI-powered clarity for career & money decisions
          </p>
        </div>

        {/* PROCESS STEPS */}
        <div className="grid grid-cols-3 gap-2 text-xs text-center opacity-80">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10">
            1. Upload Palm
          </div>
          <div className="p-2 bg-white/5 rounded-lg border border-white/10">
            2. AI Analysis
          </div>
          <div className="p-2 bg-white/5 rounded-lg border border-white/10">
            3. Get Report
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl">

          <h2 className="text-xl font-semibold mb-1">
            Start Your Analysis
          </h2>

          <p className="text-xs opacity-70 mb-6">
            Provide a few details so PalmMitra can generate a more personalized report.
          </p>

          {/* AGE */}
          <div className="mb-4">
            <label className="block text-sm opacity-80 mb-2">
              Your Age
            </label>

            <input
              type="number"
              min="10"
              max="80"
              placeholder="Enter age (10-80)"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none"
            />
          </div>

          {/* GENDER */}
          <div className="mb-4">
            <label className="block text-sm opacity-80 mb-2">
              Gender
            </label>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* LANGUAGE TOGGLE */}
          <div className="mb-5">
            <label className="block text-sm opacity-80 mb-3">
              Preferred Report Language
            </label>

            <div className="relative inline-flex items-center bg-white/10 border border-white/10 rounded-xl p-1 select-none">

              <div
                className={`absolute top-1 bottom-1 w-[110px] rounded-lg bg-amber-400 transition-all duration-300 ${
                  language === "hinglish" ? "left-1" : "left-[111px]"
                }`}
              />

              <button
                onClick={() => setLanguage("hinglish")}
                className={`relative z-10 w-[110px] text-center py-2 text-sm font-semibold transition-colors ${
                  language === "hinglish"
                    ? "text-black"
                    : "text-white opacity-80 hover:opacity-100"
                }`}
              >
                Hinglish
              </button>

              <button
                onClick={() => setLanguage("english")}
                className={`relative z-10 w-[110px] text-center py-2 text-sm font-semibold transition-colors ${
                  language === "english"
                    ? "text-black"
                    : "text-white opacity-80 hover:opacity-100"
                }`}
              >
                English
              </button>
            </div>

            <p className="text-[11px] opacity-60 mt-2">
              Auto-selected based on your device language
            </p>
          </div>

          {/* FILE UPLOAD */}
          <div className="mb-5">
            <label className="block text-sm opacity-80 mb-2">
              Upload Palm Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-white
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-white file:text-black
                hover:file:bg-amber-300
                cursor-pointer"
            />

            <p className="text-[11px] opacity-60 mt-2">
              Use natural light, clear background, full palm visible
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold transition-all ${
              loading
                ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-300 to-amber-500 text-black hover:scale-[1.02]"
            }`}
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
