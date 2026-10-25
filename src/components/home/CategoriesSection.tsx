"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { ChevronLeft } from "lucide-react";

export default function CategoriesSection() {
  const { categories, products } = useStore();

  return (
    <section id="categories" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-gold-dark uppercase tracking-wider block mb-1.5">
              تشكيلاتنا المتنوعة
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-brown-dark">
              تصنيفات حلويات حبات الشهد
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-gold-dark hover:text-brown transition-colors"
          >
            <span>استعراض الكتالوج كاملاً</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const itemCount = products.filter((p) => p.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="group relative rounded-3xl overflow-hidden bg-white border border-beige/80 luxury-card-shadow luxury-card-shadow-hover flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream-light">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gold/10">
                      <span className="text-gold font-bold text-lg">{cat.name}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-brown-dark font-mono text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {itemCount} أصناف متوفرة
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-brown group-hover:text-gold-dark transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-brown/70 mt-1 line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-cream group-hover:bg-gold group-hover:text-brown-dark text-brown flex items-center justify-center transition-all shrink-0">
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
