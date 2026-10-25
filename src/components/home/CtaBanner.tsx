"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { MessageCircle, Phone, MapPin, ExternalLink } from "lucide-react";

export default function CtaBanner() {
  const { settings } = useStore();

  return (
    <section className="py-16 bg-brown text-cream-light relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-cream-light leading-tight">
          جاهزون لإضافة لمسة حلاوة إلى مناسبتك؟
        </h2>
        <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
          يسعدنا تواصلكم المباشر لتسجيل طلباتكم أو الاستفسار عن تفاصيل الضيافة والتوصيل.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
              "مرحباً حلويات حبات الشهد 🌸 أود تقديم طلب جديد."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold px-8 py-4 rounded-2xl text-sm sm:text-base shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>تواصل عبر واتساب: {settings.primaryPhone}</span>
          </a>

          <a
            href={`tel:${settings.secondaryPhone}`}
            className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-cream-light font-bold px-7 py-4 rounded-2xl text-sm sm:text-base border border-gold/40 shadow-sm transition-all"
          >
            <Phone className="w-5 h-5 text-gold" />
            <span>اتصال مباشر: {settings.secondaryPhone}</span>
          </a>

          <a
            href={settings.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold-light font-bold px-6 py-4 rounded-2xl text-sm sm:text-base border border-gold/30 transition-all"
          >
            <MapPin className="w-4 h-4" />
            <span>موقع المحل على الخريطة</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
