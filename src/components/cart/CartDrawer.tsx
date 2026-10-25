"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();
  const { settings, addInquiry } = useStore();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Format WhatsApp message
    let message = `*طلب جديد من موقع حلويات حبات الشهد* 🌸\n`;
    message += `──────────────────────\n`;
    if (customerName.trim()) {
      message += `👤 *الاسم:* ${customerName.trim()}\n`;
    }
    if (customerPhone.trim()) {
      message += `📱 *رقم التواصل:* ${customerPhone.trim()}\n`;
    }
    if (customerNotes.trim()) {
      message += `📝 *ملاحظات / موعد:* ${customerNotes.trim()}\n`;
    }
    message += `──────────────────────\n`;
    message += `📦 *تفاصيل الأصناف:*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*`;
      if (item.selectedOption) {
        message += ` (${item.selectedOption})`;
      }
      message += ` × ${item.quantity}`;
      if (item.price) {
        message += ` = ${item.price * item.quantity} ر.س`;
      }
      message += `\n`;
    });

    message += `──────────────────────\n`;
    if (totalPrice > 0) {
      message += `💰 *المجموع التقديري:* ${totalPrice} ر.س\n`;
    }
    message += `──────────────────────\n`;
    message += `أرجو تأكيد الطلب وتحديد الوقت المناسب. شكراً لكم! ✨`;

    // Save inquiry to admin store
    addInquiry({
      name: customerName.trim() || "عميل واتساب",
      phone: customerPhone.trim() || "عبر واتساب",
      occasionType: "طلب سلة مشتريات",
      message: `طلب سلة بقيمة ${totalPrice} ر.س تشمل: ${items
        .map((i) => `${i.name} (×${i.quantity})`)
        .join(", ")} | ملاحظات: ${customerNotes}`,
    });

    const whatsappUrl = `https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-cream shadow-2xl flex flex-col justify-between border-r border-gold/30 animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-5 border-b border-beige flex items-center justify-between bg-cream-light">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gold/15 rounded-xl text-brown">
                <ShoppingBag className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg text-brown">
                  سلة المشتريات
                </h2>
                <span className="text-xs text-brown/70 font-medium">
                  {totalItems > 0
                    ? `${totalItems} أصناف مضافة`
                    : "السلة فارغة"}
                </span>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-brown/60 hover:text-brown hover:bg-beige/60 rounded-xl transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-brown/60">
                <div className="w-20 h-20 rounded-full bg-beige/40 flex items-center justify-center text-gold-dark mb-2">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg text-brown">
                  سلتك فارغة حالياً
                </h3>
                <p className="text-xs text-brown/70 max-w-xs leading-relaxed">
                  تصفح تشكيلة حلويات حبات الشهد الفاخرة وأضف أصنافك المفضلة لتجهيز طلبك.
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="mt-2 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-brown-dark font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
                >
                  <span>استعراض المنتجات</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-brown/70 pb-2">
                  <span>قائمة الأصناف</span>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:underline"
                  >
                    تفريغ السلة
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-white rounded-2xl border border-beige shadow-sm flex items-center gap-3.5"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-cream">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-brown truncate">
                          {item.name}
                        </h4>
                        {item.selectedOption && (
                          <span className="text-[11px] text-gold-dark font-medium block">
                            {item.selectedOption}
                          </span>
                        )}
                        <div className="text-xs font-bold text-brown-dark mt-1">
                          {item.price ? `${item.price} ر.س` : "حسب الوزن"}
                        </div>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-brown/40 hover:text-red-500 p-1 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-1.5 bg-beige-light px-2 py-1 rounded-lg border border-beige">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-0.5 text-brown hover:text-gold-dark"
                            aria-label="إنقاص"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-xs min-w-[18px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-0.5 text-brown hover:text-gold-dark"
                            aria-label="زيادة"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="pt-4 border-t border-beige space-y-3">
                  <span className="font-bold text-xs text-brown block">
                    بيانات الطلب (اختياري لتجهيز الرسالة):
                  </span>
                  <input
                    type="text"
                    placeholder="اسمك الكريم"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-beige focus:border-gold focus:outline-none bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="رقم الجوال"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-beige focus:border-gold focus:outline-none bg-white text-right"
                    dir="rtl"
                  />
                  <input
                    type="text"
                    placeholder="ملاحظات أو موعد التوصيل / الاستلام"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-beige focus:border-gold focus:outline-none bg-white"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-beige bg-cream-light space-y-3.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-brown/70 font-medium">المجموع التقديري:</span>
                <span className="font-extrabold text-xl text-brown-dark font-mono">
                  {totalPrice > 0 ? `${totalPrice} ر.س` : "حسب الوزن عند الاستلام"}
                </span>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm group"
              >
                <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>إرسال الطلب عبر واتساب الآن</span>
              </button>

              <p className="text-[11px] text-center text-brown/60 leading-tight">
                سيتم فتح محادثة واتساب بملخص طلبك للتأكيد مع خدمة العملاء مباشرة.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
