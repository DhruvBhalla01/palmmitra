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
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-black flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 shadow-2xl">

        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
          Upload Palm Image
        </h1>

        <p className="text-sm opacity-70 mb-6">
          Clear photo upload karein taaki AI sahi analysis kar sake.
        </p>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
          <p className="text-sm font-semibold mb-2">Photo Guidelines:</p>

          <ul className="text-xs opacity-70 space-y-1">
            <li>• Natural light use karein</li>
            <li>• Palm par shadows na ho</li>
            <li>• Hand poori frame me visible ho</li>
            <li>• Background simple ho (white best)</li>
          </ul>
        </div>

        <div className="mb-5">
          <label className="block text-sm opacity-80 mb-2">
            Select Palm Image
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
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold transition-all ${
            loading
              ? "bg-gray-700 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-300 to-amber-500 text-black hover:scale-[1.02]"
          }`}
        >
          {loading ? "Analyzing Palm..." : "Continue"}
        </button>

        <p className="text-[11px] opacity-40 mt-5 text-center">
          PalmMitra guesswork nahi karta.  
          Sirf visible features ke basis par analysis hota hai.
        </p>
      </div>
    </main>
  );
}
