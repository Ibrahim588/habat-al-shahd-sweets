"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import {
  ShoppingBag,
  MessageCircle,
  Eye,
  Check,
  Sparkles,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { settings } = useStore();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const directWhatsappUrl = `https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
    `مرحباً حلويات حبات الشهد 🌸 أود طلب: *${product.name}* (${product.price ? `${product.price} ر.س / ${product.unit}` : product.unit}). أرجو التكرم بالتأكيد.`
  )}`;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-beige/80 luxury-card-shadow luxury-card-shadow-hover flex flex-col justify-between">
      {/* Top Image & Badge */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-light">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-108 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isFeatured && (
            <span className="bg-gold text-brown-dark font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              <span>مميّز</span>
            </span>
          )}
          {product.tags && product.tags.length > 0 && (
            <span className="bg-brown/85 text-cream-light font-medium text-[10px] px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Quick View overlay button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <Link
            href={`/products/${product.id}`}
            className="pointer-events-auto bg-white/95 hover:bg-white text-brown font-bold text-xs py-2 px-4 rounded-xl shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye className="w-4 h-4 text-gold-dark" />
            <span>عرض التفاصيل</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link
              href={`/products/${product.id}`}
              className="font-extrabold text-base sm:text-lg text-brown hover:text-gold-dark transition-colors line-clamp-1"
            >
              {product.name}
            </Link>
          </div>
          <p className="text-xs text-brown/70 leading-relaxed line-clamp-2 min-h-[32px]">
            {product.description}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-beige/60 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-brown-dark font-mono">
                {product.price ? `${product.price}` : "حسب الطلب"}
              </span>
              {product.price && (
                <span className="text-xs font-bold text-gold-dark">ر.س</span>
              )}
            </div>
            <span className="text-[11px] text-brown/60 bg-cream px-2 py-0.5 rounded-md border border-beige">
              {product.unit}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                addedAnimation
                  ? "bg-green-600 text-white"
                  : "bg-brown text-cream-light hover:bg-brown-dark hover:shadow-md"
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>تمت الإضافة</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  <span>إضافة للسلة</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp button */}
            <a
              href={directWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 transition-all duration-200"
              title="طلب مباشر عبر واتساب"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>طلب واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
