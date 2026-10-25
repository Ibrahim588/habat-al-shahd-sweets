"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/products/ProductCard";
import {
  ChevronRight,
  ShoppingBag,
  MessageCircle,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Check,
  Utensils,
  Share2,
} from "lucide-react";

export default function ProductDetailView({ productId }: { productId: string }) {
  const { products, categories, settings } = useStore();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>(
    product?.options?.[0]?.choices?.[0] || ""
  );
  const [notes, setNotes] = useState("");
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center bg-cream min-h-screen">
        <div className="max-w-md mx-auto p-8 bg-white rounded-3xl border border-beige shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-brown">الصنف غير موجود</h2>
          <p className="text-xs text-brown/70">
            ربما تم تعديل أو إزالة هذا الصنف من القائمة.
          </p>
          <Link
            href="/products"
            className="inline-block bg-brown text-cream-light px-6 py-2.5 rounded-xl font-bold text-sm"
          >
            العودة لجميع المنتجات
          </Link>
        </div>
      </div>
    );
  }

  const categoryObj = categories.find((c) => c.id === product.category);

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption, notes);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const directWhatsappUrl = `https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
    `مرحباً حلويات حبات الشهد 🌸\nأود طلب صنف:\n*${product.name}*\n` +
      (selectedOption ? `الخيار / الحجم: ${selectedOption}\n` : "") +
      `الكمية: ${quantity}\n` +
      (notes ? `ملاحظات: ${notes}\n` : "") +
      (product.price ? `السعر التقديري: ${product.price * quantity} ر.س\n` : "") +
      `أرجو التكرم بالتأكيد وموعد الاستلام / التوصيل.`
  )}`;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ رابط المنتج بنجاح!");
    }
  };

  return (
    <div className="py-10 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-brown/60">
          <Link href="/" className="hover:text-gold transition-colors">
            الرئيسية
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rotate-180" />
          <Link href="/products" className="hover:text-gold transition-colors">
            منتجاتنا
          </Link>
          {categoryObj && (
            <>
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              <Link
                href={`/products?category=${categoryObj.id}`}
                className="hover:text-gold transition-colors"
              >
                {categoryObj.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 rotate-180" />
          <span className="font-bold text-brown truncate">{product.name}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-beige shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Image (Right in RTL) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-cream-light border border-beige shadow-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {product.isFeatured && (
                  <span className="absolute top-4 right-4 bg-gold text-brown-dark font-extrabold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>صنف مميز</span>
                  </span>
                )}
              </div>

              {/* Quality guarantees banner */}
              <div className="p-4 rounded-2xl bg-cream/60 border border-beige/80 flex items-center justify-between text-xs text-brown/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>سمن بلدي نقي 100%</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>طازج ومخبوز يومياً</span>
                </div>
              </div>
            </div>

            {/* Info and Actions (Left in RTL) */}
            <div className="lg:col-span-6 space-y-6 text-right">
              {/* Category tag & Share */}
              <div className="flex items-center justify-between">
                {categoryObj && (
                  <span className="bg-gold/15 text-gold-dark text-xs font-extrabold px-3 py-1 rounded-full border border-gold/30">
                    {categoryObj.name}
                  </span>
                )}
                <button
                  onClick={handleShare}
                  className="p-2 text-brown/60 hover:text-brown hover:bg-beige/40 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-brown-dark">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-brown-dark font-mono">
                  {product.price ? `${product.price}` : "حسب الوزن"}
                </span>
                {product.price && (
                  <span className="text-sm font-bold text-gold-dark">ر.س</span>
                )}
                <span className="text-xs text-brown/60 mr-2 bg-cream px-2 py-1 rounded-md border border-beige">
                  {product.unit}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-brown/80 leading-relaxed border-t border-b border-beige py-4">
                {product.description}
              </p>

              {/* Options selection if present */}
              {product.options && product.options.length > 0 && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-brown block">
                    {product.options[0].name}:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.options[0].choices.map((choice) => (
                      <button
                        key={choice}
                        onClick={() => setSelectedOption(choice)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                          selectedOption === choice
                            ? "bg-brown text-cream-light shadow-sm"
                            : "bg-cream text-brown hover:bg-beige/60 border border-beige"
                        }`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-brown block">
                  الكمية:
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-cream-light border border-beige rounded-2xl p-1.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-xl bg-white text-brown hover:bg-gold/20 flex items-center justify-center transition-colors"
                      aria-label="إنقاص"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-extrabold text-base min-w-[32px] text-center font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-xl bg-white text-brown hover:bg-gold/20 flex items-center justify-center transition-colors"
                      aria-label="زيادة"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {product.price && (
                    <span className="text-sm text-brown/70 font-medium">
                      الإجمالي:{" "}
                      <strong className="text-brown-dark font-mono text-base">
                        {product.price * quantity} ر.س
                      </strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Notes Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brown block">
                  ملاحظات إضافية على الطلب (اختياري):
                </label>
                <input
                  type="text"
                  placeholder="مثال: شيرة خفيفة، بدون فستق، للتسليم الساعة 6 مساءً..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-beige bg-cream/40 focus:border-gold focus:outline-none"
                />
              </div>

              {/* Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-sm font-extrabold shadow-md transition-all ${
                    addedToast
                      ? "bg-green-600 text-white"
                      : "bg-brown text-cream-light hover:bg-brown-dark"
                  }`}
                >
                  {addedToast ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>تمت الإضافة بنجاح</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-gold" />
                      <span>إضافة إلى السلة</span>
                    </>
                  )}
                </button>

                {/* Direct WhatsApp Order */}
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-sm font-extrabold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>طلب مباشر عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-xl sm:text-2xl font-black text-brown-dark">
              أصناف مشابهة قد تعجبك
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
