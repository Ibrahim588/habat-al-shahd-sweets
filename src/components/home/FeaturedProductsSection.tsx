"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/products/ProductCard";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function FeaturedProductsSection() {
  const { products, categories } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const featuredList = products.filter((p) => p.isFeatured && p.isAvailable);

  const displayedProducts =
    activeCategory === "all"
      ? featuredList
      : featuredList.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الأكثر طلباً وإعجاباً</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-brown-dark">
            أصنافنا المختارة بعناية
          </h2>
          <p className="text-sm text-brown/70 leading-relaxed">
            تذوقوا باقة من ألذ إبداعات حبات الشهد التي تحظى بإقبال دائم من عملائنا في مختلف المناسبات.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeCategory === "all"
                ? "bg-brown text-cream-light shadow-md"
                : "bg-cream text-brown hover:bg-beige/60 border border-beige"
            }`}
          >
            جميع المميزات ({featuredList.length})
          </button>
          {categories.map((cat) => {
            const count = featuredList.filter((p) => p.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-brown text-cream-light shadow-md"
                    : "bg-cream text-brown hover:bg-beige/60 border border-beige"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-cream hover:bg-beige/60 text-brown font-extrabold px-8 py-4 rounded-2xl border-2 border-gold/40 hover:border-gold transition-all text-sm shadow-sm hover:shadow"
          >
            <span>استعراض كافة الأصناف والتشكيلات ({products.length} صنف)</span>
            <ArrowLeft className="w-4 h-4 text-gold-dark" />
          </Link>
        </div>
      </div>
    </section>
  );
}
