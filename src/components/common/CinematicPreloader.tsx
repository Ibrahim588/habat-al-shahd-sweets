"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, ChevronLeft } from "lucide-react";

export default function CinematicPreloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has already seen the preloader on this device
    const hasSeen = localStorage.getItem("habat_alshahd_preloader_seen");
    
    // Allow URL query parameter (?preview_preloader=true or ?intro=1) to preview anytime
    const searchParams = new URLSearchParams(window.location.search);
    const forcePreview = searchParams.get("preview_preloader") === "true" || searchParams.get("intro") === "1";

    if (hasSeen && !forcePreview) {
      return; // Do not show on subsequent visits or refreshes
    }

    // First visit: activate preloader and lock body scroll
    setIsVisible(true);
    document.body.style.overflow = "hidden";

    // Smooth 5-second progress tracker (100ms intervals = 50 steps)
    const duration = 5000;
    const interval = 50;
    const step = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(100, prev + step);
      });
    }, interval);

    // At 4.4 seconds, initiate smooth cinematic exit dissolve
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4400);

    // At 5.0 seconds, unmount completely and restore scroll
    const cleanupTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
      localStorage.setItem("habat_alshahd_preloader_seen", "true");
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(exitTimer);
      clearTimeout(cleanupTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
      localStorage.setItem("habat_alshahd_preloader_seen", "true");
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="شاشة الترحيب"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-12 bg-[#1f130c] text-cream-light overflow-hidden transition-all duration-700 ease-out select-none ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Luxury Lighting & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Center Warm Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-gradient-to-tr from-gold/20 via-gold/10 to-transparent blur-3xl animate-pulse" style={{ animationDuration: "3s" }} />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,8,4,0.85)_100%)]" />
      </div>

      {/* Top Bar: Skip Button */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
          <span>مرحباً بكم في حبات الشهد</span>
        </div>

        <button
          onClick={handleSkip}
          className="group inline-flex items-center gap-1 text-xs text-cream/70 hover:text-gold px-3 py-1.5 rounded-xl border border-white/10 hover:border-gold/40 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-200"
        >
          <span>تخطي</span>
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Centerpiece: The Animated Logo & Royal Emblem */}
      <div className="relative flex flex-col items-center justify-center text-center z-10 my-auto space-y-6">
        {/* Rotating Oriental Geometric Outer Halo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-gold/30 border-dashed animate-spin" style={{ animationDuration: "25s" }} />
          <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-gold/15 animate-ping" style={{ animationDuration: "4s" }} />

          {/* Logo Container with Smooth Spring Entrance */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-4 bg-gradient-to-b from-[#2e1c12] to-[#1c110a] border border-gold/40 shadow-2xl shadow-gold/10 flex items-center justify-center transform transition-transform duration-1000 animate-in fade-in zoom-in-75">
            <div className="relative w-full h-full">
              <Image
                src="/images/logo.png"
                alt="شعار حلويات حبات الشهد"
                fill
                sizes="(max-width: 640px) 144px, 176px"
                className="object-contain drop-shadow-[0_8px_16px_rgba(212,175,55,0.3)]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Brand Typography with Gold Shimmer */}
        <div className="space-y-2 max-w-md mx-auto">
          <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ffe5a3] via-[#d4af37] to-[#ffe5a3] drop-shadow-sm">
            حلويات حبات الشهد
          </h1>
          <p className="text-xs sm:text-sm font-medium text-cream/80 tracking-widest">
            حـلاوة الـتـفـاصـيـل... فـي كـل حـبـة
          </p>
        </div>
      </div>

      {/* Bottom Bar: 5-Second Progress Line & Counter */}
      <div className="w-full max-w-md z-10 space-y-2 pb-4">
        <div className="flex items-center justify-between text-[11px] text-cream/60 font-mono">
          <span>جاري التجهيز...</span>
          <span className="text-gold font-bold">{Math.round(progress)}%</span>
        </div>

        {/* Progress Track & Animated Indicator */}
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-gold/60 via-gold to-gold-light rounded-full transition-all duration-100 ease-out relative shadow-[0_0_12px_rgba(212,175,55,0.8)]"
            style={{ width: `${progress}%` }}
          >
            {/* Glowing Leading Dot */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff]" />
          </div>
        </div>
      </div>
    </div>
  );
}
