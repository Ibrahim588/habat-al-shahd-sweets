"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Maximize2, X, ChevronLeft } from "lucide-react";

export default function GalleryPreviewSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    { src: "/images/kunafa.jpg", title: "كنافة مبرومة رول" },
    { src: "/images/basbousa.jpg", title: "بسبوسة كلاسيكية ذهبية" },
    { src: "/images/rosh-el-sett.jpg", title: "رموش الست الهشة" },
    { src: "/images/basbousa-qeshta.jpg", title: "بسبوسة محشية بالقشطة" },
    { src: "/images/baseema.jpg", title: "بسيمة جوز الهند الأصيلة" },
    { src: "/images/sabaat.jpg", title: "صباعات جلاش مقرمشة" },
  ];

  return (
    <>
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold mb-2">
                <Camera className="w-3.5 h-3.5" />
                <span>إبداع في التقديم والتصوير</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-brown-dark">
                معرض صور حبات الشهد
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-gold-dark hover:text-brown transition-colors"
            >
              <span>مشاهدة المعرض الكامل</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item.src)}
                className="group relative aspect-square rounded-3xl overflow-hidden bg-white cursor-pointer border border-beige/80 luxury-card-shadow luxury-card-shadow-hover"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold truncate">
                      {item.title}
                    </span>
                    <Maximize2 className="w-4 h-4 text-gold shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-4xl w-full aspect-square max-h-[85vh] rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="صورة مكبرة"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
