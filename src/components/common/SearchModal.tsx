"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { Search, X, ChevronLeft, ArrowRight } from "lucide-react";

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useCart();
  const { products, categories } = useStore();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filteredProducts = products.filter((p) => {
    const matchesQuery =
      query.trim() === "" ||
      p.name.includes(query.trim()) ||
      p.description.includes(query.trim()) ||
      p.tags?.some((t) => t.includes(query.trim()));

    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeSearch}
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-16 sm:pt-24 pb-8">
        <div className="inline-block w-full max-w-2xl bg-cream rounded-3xl text-right overflow-hidden shadow-2xl transform transition-all border border-gold/40 relative z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Search Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-beige flex items-center gap-3">
            <Search className="w-5 h-5 text-gold-dark shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن كنافة، بسبوسة، رموش الست، بسيمة..."
              className="w-full text-base sm:text-lg bg-transparent text-brown focus:outline-none placeholder:text-brown/40"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-full text-brown/40 hover:text-brown hover:bg-beige/40 text-xs"
              >
                مسح
              </button>
            )}
            <button
              onClick={closeSearch}
              className="p-1.5 rounded-xl text-brown/60 hover:text-brown hover:bg-beige/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="px-5 py-3 bg-cream-light border-b border-beige flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === "all"
                  ? "bg-brown text-cream-light"
                  : "bg-white text-brown/70 hover:bg-beige/50 border border-beige"
              }`}
            >
              الكل
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-brown text-cream-light"
                    : "bg-white text-brown/70 hover:bg-beige/50 border border-beige"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-2.5">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-brown/60 space-y-2">
                <p className="text-base font-bold text-brown">
                  لا توجد نتائج مطابقة لبحثك
                </p>
                <p className="text-xs">
                  جرب البحث باسم صنف آخر أو تصفح قائمة المنتجات كاملة.
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={closeSearch}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-gold/10 border border-beige/60 hover:border-gold/40 transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-brown group-hover:text-gold-dark transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-brown/60 truncate max-w-sm">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-bold text-gold-dark">
                          {product.price ? `${product.price} ر.س` : "حسب الوزن"}
                        </span>
                        <span className="text-[10px] text-brown/40">
                          {product.unit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-gold group-hover:-translate-x-1 transition-transform pl-2">
                    <ChevronLeft className="w-5 h-5" />
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-3.5 bg-cream-light border-t border-beige text-center text-xs text-brown/60 flex items-center justify-between px-5">
            <span>
              عرض {filteredProducts.length} من أصل {products.length} صنف
            </span>
            <Link
              href="/products"
              onClick={closeSearch}
              className="text-gold-dark font-bold hover:underline flex items-center gap-1"
            >
              <span>الكتالوج الكامل</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
