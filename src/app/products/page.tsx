"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/products/ProductCard";
import { Search, ArrowUpDown, ShoppingBag } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const { products, categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  const filteredAndSorted = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === "" ||
          product.name.includes(searchQuery.trim()) ||
          product.description.includes(searchQuery.trim()) ||
          product.tags?.some((t) => t.includes(searchQuery.trim()));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return (a.price || 0) - (b.price || 0);
        }
        if (sortBy === "price-desc") {
          return (b.price || 0) - (a.price || 0);
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name, "ar");
        }
        // default: featured first
        if (a.isFeatured === b.isFeatured) return 0;
        return a.isFeatured ? -1 : 1;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="py-10 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-extrabold text-gold-dark uppercase tracking-wider block">
            كتالوج الأصناف
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brown-dark">
            جميع منتجات حلويات حبات الشهد
          </h1>
          <p className="text-sm text-brown/70 leading-relaxed">
            استكشفوا تشكيلتنا الفاخرة من البسبوسة، الكنافة، الجلاش، والحلويات الشرقية المحضرة بأجود أنواع السمن البلدي.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-5 rounded-3xl border border-beige shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-5 h-5 text-gold-dark absolute right-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث بالاسم (مثال: بسبوسة، كنافة، رموش الست...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-11 pl-4 py-3 bg-cream/50 rounded-2xl border border-beige focus:border-gold focus:outline-none text-sm text-brown"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-brown/50 hover:text-brown bg-beige/50 px-2 py-0.5 rounded-lg"
                >
                  مسح
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4 relative">
              <ArrowUpDown className="w-4 h-4 text-gold-dark absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "name")}
                className="w-full pr-10 pl-4 py-3 bg-cream/50 rounded-2xl border border-beige focus:border-gold focus:outline-none text-sm text-brown appearance-none font-medium cursor-pointer"
              >
                <option value="featured">الترتيب: المميزة أولاً</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="name">الاسم أبجدياً</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                selectedCategory === "all"
                  ? "bg-brown text-cream-light shadow-sm"
                  : "bg-cream text-brown/80 hover:bg-beige/60 border border-beige"
              }`}
            >
              الكل ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-brown text-cream-light shadow-sm"
                      : "bg-cream text-brown/80 hover:bg-beige/60 border border-beige"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-brown/70 px-2">
          <span>
            عرض <strong className="text-brown">{filteredAndSorted.length}</strong> صنف
          </span>
          {(selectedCategory !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-gold-dark hover:underline font-bold"
            >
              إعادة ضبط الفلاتر
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredAndSorted.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-beige space-y-4">
            <div className="w-20 h-20 rounded-full bg-cream mx-auto flex items-center justify-center text-gold-dark">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="font-extrabold text-xl text-brown">
              لا توجد أصناف مطابقة لبحثك
            </h3>
            <p className="text-sm text-brown/70 max-w-md mx-auto">
              جرب تغيير كلمة البحث أو اختيار تصنيف آخر لاستعراض الأصناف المتوفرة.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="bg-gold hover:bg-gold-light text-brown-dark font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
            >
              عرض كل المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-brown">جاري التحميل...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
