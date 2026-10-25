"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { BookOpen, ChevronLeft } from "lucide-react";

export default function StorySection() {
  const { settings } = useStore();

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-cream via-cream-light to-beige/40 p-8 sm:p-12 lg:p-16 border-2 border-gold/30 shadow-xl relative overflow-hidden">
          {/* Subtle gold watermarks */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story Text */}
            <div className="lg:col-span-8 space-y-5 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>عن العلامة التجارية</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-brown-dark">
                {settings.storyTitle}
              </h2>

              <p className="text-sm sm:text-base text-brown/85 leading-loose">
                {settings.storyContent}
              </p>

              <div className="pt-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-gold-dark hover:text-brown font-extrabold text-sm transition-colors group"
                >
                  <span>اقرأ المزيد عن قيمنا ومسيرتنا</span>
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Brand Emblem */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 p-4 rounded-3xl bg-white shadow-lg border border-gold/40 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="شعار حبات الشهد"
                  fill
                  sizes="224px"
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
