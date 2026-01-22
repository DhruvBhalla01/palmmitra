"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect (unchanged)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? "backdrop-blur-xl bg-black/60 shadow-lg shadow-black/40"
          : "bg-transparent"}
        border-b border-white/10
      `}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* BRAND */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight
                     bg-gradient-to-r from-amber-300 to-amber-500
                     bg-clip-text text-transparent
                     hover:opacity-90 transition"
        >
          PalmMitra
        </Link>

        {/* CTA */}
        <Link href="/upload">
          <button
            className="
              px-5 py-2.5 rounded-xl
              bg-gradient-to-r from-amber-300 to-amber-500
              text-black text-sm font-bold
              shadow-lg shadow-amber-500/25
              hover:scale-[1.05]
              active:scale-[0.98]
              transition-all
            "
          >
            Get Report ₹99
          </button>
        </Link>
      </div>
    </header>
  );
}
