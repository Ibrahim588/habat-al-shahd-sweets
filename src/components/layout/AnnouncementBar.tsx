"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Sparkles, X, ChevronLeft } from "lucide-react";

export default function AnnouncementBar() {
  const { settings } = useStore();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!settings.announcement?.enabled || isDismissed) {
    return null;
  }

  return (
    <div className="bg-brown-dark text-cream-light py-2 px-4 text-xs md:text-sm font-medium border-b border-gold/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
          <Sparkles className="w-4 h-4 text-gold shrink-0 animate-pulse hidden sm:inline" />
          <span className="truncate">{settings.announcement.text}</span>
          {settings.announcement.link && (
            <Link
              href={settings.announcement.link}
              className="inline-flex items-center gap-1 text-gold hover:text-gold-light underline font-semibold shrink-0 transition-colors"
            >
              <span>المزيد</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-cream-light/60 hover:text-cream-light p-1 rounded-md hover:bg-brown/50 transition-colors"
          aria-label="إغلاق الشريط الإعلاني"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
