"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const { settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover choices */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-gold/30 p-4 animate-in fade-in slide-in-from-bottom-3 duration-200 text-right text-brown">
          <div className="flex items-center justify-between pb-3 border-b border-beige">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="font-bold text-sm text-brown">
                خدمة العملاء والطلبات
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-brown/50 hover:text-brown p-1"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-brown/70 my-3 leading-relaxed">
            يسعدنا تواصلكم المباشر عبر واتساب لتسجيل الطلبات والاستفسار عن المناسبات:
          </p>

          <div className="space-y-2">
            <a
              href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                "مرحباً حلويات حبات الشهد 🌸 أود الاستفسار والطلب عبر واتساب."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-cream-light hover:bg-[#25D366]/10 border border-beige hover:border-[#25D366]/40 transition-all text-xs font-bold text-brown group"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                <span>الرقم الرئيسي</span>
              </div>
              <span className="font-mono text-brown/80 group-hover:text-[#25D366]" dir="ltr">
                {settings.primaryPhone}
              </span>
            </a>

            <a
              href={`https://wa.me/${settings.secondaryWhatsapp}?text=${encodeURIComponent(
                "مرحباً حلويات حبات الشهد 🌸 أود الاستفسار والطلب عبر واتساب."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-cream-light hover:bg-[#25D366]/10 border border-beige hover:border-[#25D366]/40 transition-all text-xs font-bold text-brown group"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                <span>الرقم الثاني</span>
              </div>
              <span className="font-mono text-brown/80 group-hover:text-[#25D366]" dir="ltr">
                {settings.secondaryPhone}
              </span>
            </a>
          </div>
        </div>
      )}

      {/* Main trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="تواصل عبر واتساب"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3.5 rounded-full shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 transform hover:scale-105"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gold border-2 border-white animate-ping" />
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="font-bold text-sm hidden sm:inline">
          {isOpen ? "إغلاق" : "تواصل معنا واتساب"}
        </span>
      </button>
    </div>
  );
}
