"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const { settings } = useStore();

  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-extrabold text-gold-dark uppercase tracking-wider block">
            خدمة العملاء والطلبات
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brown-dark">
            تواصل مع حلويات حبات الشهد
          </h1>
          <p className="text-sm text-brown/70 leading-relaxed">
            يسعدنا استقبال استفساراتكم وطلباتكم المخصصة للمناسبات والضيافة عبر الهاتف أو واتساب مباشرة.
          </p>
        </div>

        {/* Contact Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Phone 1 */}
          <div className="bg-white rounded-3xl p-6 border border-beige shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center text-gold-dark">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-brown/60 block">الرقم المعتمد الأول:</span>
              <h3 className="font-extrabold text-xl text-brown font-mono mt-1" dir="ltr">
                {settings.primaryPhone}
              </h3>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <a
                href={`tel:${settings.primaryPhone}`}
                className="flex-1 bg-brown text-cream-light hover:bg-brown-dark font-bold text-center py-2.5 px-3 rounded-xl text-xs transition-colors"
              >
                اتصال الآن
              </a>
              <a
                href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                  "مرحباً حلويات حبات الشهد 🌸 أود الاستفسار والطلب."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-center py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>واتساب</span>
              </a>
            </div>
          </div>

          {/* Card 2: Phone 2 */}
          <div className="bg-white rounded-3xl p-6 border border-beige shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center text-gold-dark">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-brown/60 block">الرقم المعتمد الثاني:</span>
              <h3 className="font-extrabold text-xl text-brown font-mono mt-1" dir="ltr">
                {settings.secondaryPhone}
              </h3>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <a
                href={`tel:${settings.secondaryPhone}`}
                className="flex-1 bg-brown text-cream-light hover:bg-brown-dark font-bold text-center py-2.5 px-3 rounded-xl text-xs transition-colors"
              >
                اتصال الآن
              </a>
              <a
                href={`https://wa.me/${settings.secondaryWhatsapp}?text=${encodeURIComponent(
                  "مرحباً حلويات حبات الشهد 🌸 أود الاستفسار والطلب."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-center py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>واتساب</span>
              </a>
            </div>
          </div>

          {/* Card 3: Location & Hours */}
          <div className="bg-white rounded-3xl p-6 border border-beige shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center text-gold-dark">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-brown/60 block">أوقات العمل المعتمدة:</span>
              <h3 className="font-extrabold text-base text-brown mt-1">
                {settings.workingHours}
              </h3>
            </div>
            <div className="pt-2">
              <a
                href={settings.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-cream hover:bg-beige/60 text-brown font-bold py-2.5 px-3 rounded-xl text-xs border border-gold/40 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                <span>موقع المحل على الخريطة</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp Callout Info */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-brown-dark text-cream-light p-8 sm:p-12 border-2 border-gold/40 shadow-xl space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>استجابة فورية</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-cream-light">
            طلب سريع وتواصل مباشر عبر واتساب
          </h2>

          <p className="text-xs sm:text-sm text-cream/80 leading-relaxed max-w-xl mx-auto">
            فريقنا متواجد على مدار اليوم لتسجيل طلباتكم وتأكيد الحجوزات للمناسبات والضيافة عبر المحادثة المباشرة في تطبيق واتساب.
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <a
              href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                "مرحباً حلويات حبات الشهد 🌸 أود تقديم طلب مباشر عبر واتساب."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>محادثة واتساب: {settings.primaryPhone}</span>
            </a>

            <a
              href={`https://wa.me/${settings.secondaryWhatsapp}?text=${encodeURIComponent(
                "مرحباً حلويات حبات الشهد 🌸 أود تقديم طلب مباشر عبر واتساب."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-cream-light font-bold text-sm border border-gold/30 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
              <span>محادثة واتساب: {settings.secondaryPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
