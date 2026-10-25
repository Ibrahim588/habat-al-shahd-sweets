"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  FileText,
  Maximize2,
  X,
  MessageCircle,
  Download,
  CheckCircle2,
} from "lucide-react";

export default function MenuShowcaseSection() {
  const { settings } = useStore();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const menuItemsSummary = [
    "بسبوسة كلاسيكية",
    "كونكا بسبوسة",
    "نجوم مقلوبة",
    "صباعات جلاش",
    "جوزية فاخرة",
    "كنافة رول مبرومة",
    "فولية ذهبية",
    "محشية قشطة",
    "تستيف مربعات",
    "رموش الست",
    "نجوم ذهبية",
    "بسبوسة قشطة",
    "بسبوسة بسكوت",
    "بسيمة جوز الهند",
  ];

  return (
    <>
      <section className="py-16 sm:py-24 bg-gradient-to-b from-cream via-cream-dark/30 to-cream border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Menu Poster Preview (Right in RTL) */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative group cursor-pointer max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/40 transition-transform duration-300 hover:scale-[1.02]">
                <div
                  className="relative aspect-[9/16] w-full bg-brown-dark"
                  onClick={() => setLightboxOpen(true)}
                >
                  <Image
                    src="/images/menu-full.png"
                    alt="صورة المنيو الكامل لحلويات حبات الشهد"
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-full">
                      <Maximize2 className="w-6 h-6 text-gold" />
                    </div>
                    <span className="text-sm font-bold bg-black/60 px-4 py-1.5 rounded-full">
                      انقر لتكبير صورة المنيو
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-brown-dark text-cream-light text-center flex items-center justify-between">
                  <span className="text-xs font-bold text-gold">
                    المنيو الرسمي المعتمد
                  </span>
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="text-xs text-cream hover:text-gold flex items-center gap-1 font-semibold"
                  >
                    <span>عرض بالحجم الكامل</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Information & Features (Left in RTL) */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>كل الأصناف في مكان واحد</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-brown-dark leading-tight">
                منيو حلويات حبات الشهد الكامل
              </h2>

              <p className="text-sm sm:text-base text-brown/80 leading-relaxed">
                تصفحوا صورة المنيو الأصلية الشاملة للتعرف على تشكيلة حلوياتنا الشرقية اللذيذة وتشكيلات الضيافة، واطلبوا مباشرة عبر أرقام التواصل الموضحة.
              </p>

              {/* Grid of included menu items */}
              <div className="pt-2">
                <span className="text-xs font-bold text-brown block mb-3">
                  أصناف المنيو المدرجة:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {menuItemsSummary.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-semibold text-brown/90 bg-white p-2.5 rounded-xl border border-beige shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact buttons from menu */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                    "مرحباً حبات الشهد 🌸 تصفحت المنيو وأود تقديم طلب."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>طلب مباشر من المنيو</span>
                </a>

                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 bg-brown text-cream-light hover:bg-brown-dark font-bold px-6 py-3.5 rounded-xl text-sm transition-all"
                >
                  <FileText className="w-4 h-4 text-gold" />
                  <span>صفحة المنيو التفاعلية</span>
                </Link>

                <a
                  href="/images/menu-full.png"
                  download="منيو-حلويات-حبات-الشهد.png"
                  className="inline-flex items-center gap-2 bg-white hover:bg-beige/60 text-brown font-bold px-4 py-3.5 rounded-xl text-sm border border-gold/40 transition-all"
                >
                  <Download className="w-4 h-4 text-gold-dark" />
                  <span>تحميل المنيو</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-h-[90vh] max-w-2xl w-full aspect-[9/16] overflow-y-auto rounded-2xl shadow-2xl">
            <Image
              src="/images/menu-full.png"
              alt="منيو حبات الشهد بالحجم الكامل"
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
