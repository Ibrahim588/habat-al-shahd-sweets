"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Sparkles,
  ShoppingBag,
  MessageCircle,
  FileText,
  Star,
  Award,
} from "lucide-react";

export default function HeroSection() {
  const { settings } = useStore();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-cream via-cream-light to-cream">
      {/* Decorative luxury background elements */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-brown/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content (Right in RTL) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold-dark text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-gold-dark animate-spin" style={{ animationDuration: "6s" }} />
              <span>{settings.heroEyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brown-dark tracking-tight leading-[1.25]">
              {settings.heroTitle}
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold gold-gradient-text mt-2">
                {settings.heroSubtitle}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-brown/80 max-w-2xl leading-relaxed">
              {settings.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2.5 bg-brown hover:bg-brown-dark text-cream-light font-bold px-7 py-4 rounded-2xl text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5 text-gold" />
                <span>اكتشف منتجاتنا</span>
              </Link>

              <a
                href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                  "مرحباً حلويات حبات الشهد 🌸، أود الاستفسار والطلب مباشرة عبر واتساب."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-7 py-4 rounded-2xl text-sm sm:text-base shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>اطلب عبر واتساب</span>
              </a>

              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-beige-light text-brown font-bold px-5 py-4 rounded-2xl text-sm sm:text-base border border-gold/40 shadow-sm transition-all"
              >
                <FileText className="w-4 h-4 text-gold-dark" />
                <span>عرض صورة المنيو</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-beige/80 grid grid-cols-3 gap-4 max-w-lg">
              <div className="space-y-1">
                <span className="font-extrabold text-lg sm:text-xl text-brown font-mono block">
                  100%
                </span>
                <span className="text-xs text-brown/70 block">
                  سمن بلدي فاخر
                </span>
              </div>
              <div className="space-y-1 border-r border-beige/80 pr-4">
                <span className="font-extrabold text-lg sm:text-xl text-brown font-mono block">
                  طازج
                </span>
                <span className="text-xs text-brown/70 block">
                  مخبوز يومياً
                </span>
              </div>
              <div className="space-y-1 border-r border-beige/80 pr-4">
                <span className="font-extrabold text-lg sm:text-xl text-brown font-mono block">
                  مناسبات
                </span>
                <span className="text-xs text-brown/70 block">
                  تجهيز وضيافة
                </span>
              </div>
            </div>
          </div>

          {/* Visual Side (Left in RTL) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Main Visual Composition */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-beige via-white to-cream-light p-6 border-2 border-gold/30 shadow-2xl flex flex-col items-center justify-center group">
              {/* Authentic Brand Logo */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="حلويات حبات الشهد - عش البلبل بالفستق"
                  fill
                  sizes="(max-width: 640px) 256px, 288px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating Badge 1 - Top Left */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md border border-gold/30 rounded-2xl p-3 shadow-xl flex items-center gap-2.5 animate-bounce" style={{ animationDuration: "4s" }}>
                <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center text-gold-dark">
                  <Star className="w-5 h-5 fill-gold text-gold" />
                </div>
                <div className="text-right">
                  <span className="font-bold text-xs text-brown block">
                    مذاق شرقي أصيل
                  </span>
                  <span className="text-[10px] text-brown/60">
                    وصفات تراثية متقنة
                  </span>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Right */}
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md border border-gold/30 rounded-2xl p-3 shadow-xl flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brown/10 flex items-center justify-center text-brown">
                  <Award className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="text-right">
                  <span className="font-bold text-xs text-brown block">
                    ضيافة فاخرة
                  </span>
                  <span className="text-[10px] text-brown/60">
                    جاهزون لجميع المناسبات
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
