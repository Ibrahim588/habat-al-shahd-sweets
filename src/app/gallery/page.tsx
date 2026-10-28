"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Maximize2, X, ChevronRight, ChevronLeft, ShoppingBag } from "lucide-react";

const fallbackImages = [
  {
    id: "kunafa",
    src: "/images/kunafa.jpg",
    title: "كنافة مبرومة رول مقرمشة",
    category: "kunafa",
    desc: "كنافة ذهبية محمرة بالسمن البلدي والمكسرات",
  },
  {
    id: "basbousa",
    src: "/images/basbousa.jpg",
    title: "بسبوسة كلاسيكية هشة",
    category: "basbousa",
    desc: "بسبوسة تقليدية متقنة بالشيرة الخفيفة",
  },
  {
    id: "rosh-el-sett",
    src: "/images/rosh-el-sett.jpg",
    title: "رموش الست الشرقية",
    category: "oriental",
    desc: "حلوى رموش الست اللذيذة تذوب في الفم",
  },
  {
    id: "basbousa-qeshta",
    src: "/images/basbousa-qeshta.jpg",
    title: "بسبوسة محشية قشطة",
    category: "basbousa",
    desc: "طبقة غنية من القشطة الطازجة بين البسبوسة الذهبية",
  },
  {
    id: "baseema",
    src: "/images/baseema.jpg",
    title: "بسيمة جوز الهند الأصيلة",
    category: "oriental",
    desc: "مذاق جوز الهند المحمص الغني بالنكهة الشرقية",
  },
  {
    id: "sabaat",
    src: "/images/sabaat.jpg",
    title: "صباعات جلاش مقرمشة",
    category: "pastry-rolls",
    desc: "أصابع جلاش ذهبية خفيفة مع القهوة العربية",
  },
  {
    id: "basbousa-biscuit",
    src: "/images/basbousa-biscuit.jpg",
    title: "بسبوسة بسكوت مبتكرة",
    category: "basbousa",
    desc: "مزيج فاخر بين قرمشة البسكوت وطراوة البسبوسة",
  },
  {
    id: "konka-basbousa",
    src: "/images/items/konka_basbousa.png",
    title: "كونكا بسبوسة ميني بايتس",
    category: "basbousa",
    desc: "قطع صغيرة بحجم لقمة واحدة للضيافة الراقية",
  },
  {
    id: "jawzia",
    src: "/images/items/jawzia.png",
    title: "جوزية فاخرة بالتوفي",
    category: "oriental",
    desc: "حبات الجوزية المحشوة بالتوفي الغني والمكسرات",
  },
  {
    id: "mahshiya-qeshta",
    src: "/images/items/mahshiya_qeshta.png",
    title: "محشية قشطة بلدي",
    category: "oriental",
    desc: "حلوى شرقية محشوة بالقشطة الطازجة وقطر الزهر",
  },
  {
    id: "folia",
    src: "/images/items/folia.png",
    title: "فولية ذهبية مقرمشة",
    category: "oriental",
    desc: "فول سوداني محمص مع عسل وشيرة خفيفة",
  },
  {
    id: "nojoom",
    src: "/images/items/nojoom.png",
    title: "نجوم ذهبية للضيافة",
    category: "assortments",
    desc: "تشكيلات نجوم شرقية مميزة بألوانها الذهبية",
  },
];

export default function GalleryPage() {
  const { products, categories } = useStore();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Dynamically derive gallery images from the current store products
  const images = useMemo(() => {
    if (products && products.length > 0) {
      return products
        .filter((prod) => Boolean(prod.image))
        .map((prod) => ({
          id: prod.id,
          src: prod.image,
          title: prod.name,
          category: prod.category,
          desc: prod.description,
        }));
    }
    return fallbackImages;
  }, [products]);

  const filteredImages = useMemo(() => {
    if (activeFilter === "all") return images;
    return images.filter(
      (img) => img.category === activeFilter
    );
  }, [activeFilter, images]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null || filteredImages.length === 0) return;
    setSelectedIdx((selectedIdx + 1) % filteredImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null || filteredImages.length === 0) return;
    setSelectedIdx(
      (selectedIdx - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <>
      <div className="py-10 sm:py-16 bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-extrabold text-gold-dark uppercase tracking-wider block">
              معرض الصور
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-brown-dark">
              جمال التقديم وحلاوة التفاصيل
            </h1>
            <p className="text-sm text-brown/70 leading-relaxed">
              لقطات حقيقية لأشهى أصناف حلويات حبات الشهد وتشكيلات الضيافة، مصورة بدقة لتنقل لكم روعة المذاق والشكل.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <button
              onClick={() => {
                setActiveFilter("all");
                setSelectedIdx(null);
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeFilter === "all"
                  ? "bg-brown text-cream-light shadow-md"
                  : "bg-white text-brown hover:bg-beige/60 border border-beige"
              }`}
            >
              جميع الصور ({images.length})
            </button>
            {categories.map((cat) => {
              const count = images.filter(
                (img) => img.category === cat.id || img.category === cat.slug
              ).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveFilter(cat.id);
                    setSelectedIdx(null);
                  }}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                    activeFilter === cat.id
                      ? "bg-brown text-cream-light shadow-md"
                      : "bg-white text-brown hover:bg-beige/60 border border-beige"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => setSelectedIdx(idx)}
                className="group relative aspect-square rounded-3xl overflow-hidden bg-white cursor-pointer border border-beige/90 luxury-card-shadow luxury-card-shadow-hover"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized={img.src?.startsWith("http")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                  <h4 className="font-extrabold text-sm sm:text-base leading-tight">
                    {img.title}
                  </h4>
                  <p className="text-xs text-white/80 mt-1 line-clamp-1">
                    {img.desc}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gold-light bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      انقر للتكبير
                    </span>
                    <Maximize2 className="w-4 h-4 text-gold" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox */}
      {selectedIdx !== null && filteredImages[selectedIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIdx(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Previous */}
          <button
            onClick={handlePrev}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={handleNext}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center Content */}
          <div
            className="relative max-w-4xl w-full aspect-square max-h-[85vh] rounded-3xl overflow-hidden flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={filteredImages[selectedIdx].src}
                alt={filteredImages[selectedIdx].title}
                fill
                className="object-contain"
                priority
                unoptimized={filteredImages[selectedIdx].src?.startsWith("http")}
              />
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 inset-x-4 bg-black/70 backdrop-blur-md text-white p-4 rounded-2xl text-center border border-white/10">
              <h3 className="font-extrabold text-base sm:text-lg">
                {filteredImages[selectedIdx].title}
              </h3>
              <p className="text-xs text-white/80 mt-1 max-w-lg mx-auto">
                {filteredImages[selectedIdx].desc}
              </p>
              {filteredImages[selectedIdx].id && (
                <div className="mt-2.5">
                  <Link
                    href={`/products/${filteredImages[selectedIdx].id}`}
                    className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold-light text-brown-dark font-extrabold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>عرض تفاصيل الصنف والطلب</span>
                  </Link>
                </div>
              )}
              <div className="text-[11px] text-gold mt-2 font-mono">
                {selectedIdx + 1} / {filteredImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
