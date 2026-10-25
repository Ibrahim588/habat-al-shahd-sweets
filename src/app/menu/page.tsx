"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import {
  FileText,
  Download,
  Maximize2,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function MenuPage() {
  const { settings } = useStore();
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="py-10 sm:py-16 bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-extrabold text-gold-dark uppercase tracking-wider block">
              المنيو الرسمي
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-brown-dark">
              منيو حلويات حبات الشهد الكامل
            </h1>
            <p className="text-sm text-brown/70 leading-relaxed">
              تصفحوا كافة الأصناف والتشكيلات المعتمدة كما تظهر في صورة المنيو الأصلية، وتفضلوا بطلب ما يناسب ضيافتكم عبر واتساب.
            </p>
          </div>

          {/* Menu Poster Card and Actions */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-beige shadow-sm space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-beige">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold-dark" />
                <span className="font-extrabold text-brown text-base">
                  صورة المنيو الرسمية عالية الدقة
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLightbox(true)}
                  className="inline-flex items-center gap-1.5 bg-cream hover:bg-beige/60 text-brown font-bold px-4 py-2 rounded-xl text-xs sm:text-sm border border-beige transition-all"
                >
                  <Maximize2 className="w-4 h-4 text-gold-dark" />
                  <span>تكبير الصورة</span>
                </button>
                <a
                  href="/images/menu-full.png"
                  download="منيو-حلويات-حبات-الشهد.png"
                  className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold-light text-brown-dark font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل المنيو PNG</span>
                </a>
              </div>
            </div>

            {/* Poster Preview */}
            <div className="flex justify-center">
              <div
                className="relative max-w-md w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/40 cursor-pointer group"
                onClick={() => setLightbox(true)}
              >
                <Image
                  src="/images/menu-full.png"
                  alt="منيو حلويات حبات الشهد"
                  fill
                  sizes="(max-width: 640px) 100vw, 450px"
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                  priority
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-sm">
                  <span className="bg-black/60 px-5 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4 text-gold" />
                    <span>انقر لتكبير المنيو</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Contact details printed on menu */}
            <div className="p-6 rounded-2xl bg-cream/60 border border-beige space-y-4">
              <h3 className="font-bold text-sm text-brown text-center">
                أرقام الطلب المعتمدة في المنيو:
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`tel:${settings.primaryPhone}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-beige hover:border-gold font-mono font-bold text-sm text-brown transition-all shadow-2xs"
                  dir="ltr"
                >
                  <Phone className="w-4 h-4 text-gold-dark" />
                  <span>{settings.primaryPhone}</span>
                </a>
                <a
                  href={`tel:${settings.secondaryPhone}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-beige hover:border-gold font-mono font-bold text-sm text-brown transition-all shadow-2xs"
                  dir="ltr"
                >
                  <Phone className="w-4 h-4 text-gold-dark" />
                  <span>{settings.secondaryPhone}</span>
                </a>
                <a
                  href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                    "مرحباً حلويات حبات الشهد 🌸 أود تسجيل طلب من المنيو."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>طلب مباشر عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-h-[92vh] max-w-2xl w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/images/menu-full.png"
              alt="منيو حبات الشهد كامل"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
