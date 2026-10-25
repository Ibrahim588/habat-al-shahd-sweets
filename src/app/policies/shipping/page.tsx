import React from "react";
import Link from "next/link";
import { Truck, ChevronRight } from "lucide-react";

export const metadata = {
  title: "سياسة الطلب والتوصيل | حلويات حبات الشهد",
  description: "معلومات الاستلام والتوصيل وتجهيز الطلبات في حلويات حبات الشهد.",
};

export default function ShippingPage() {
  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs text-brown/60">
          <Link href="/" className="hover:text-gold transition-colors">
            الرئيسية
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rotate-180" />
          <span className="font-bold text-brown">سياسة الطلب والتوصيل</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-beige shadow-sm space-y-6 text-right">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold">
            <Truck className="w-4 h-4" />
            <span>معلومات الاستلام والتسليم</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-brown-dark">
            سياسة الطلب والتوصيل والاستلام
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-brown/80 leading-relaxed">
            <h3 className="text-base font-extrabold text-brown pt-2">
              1. الاستلام المباشر من الفرع
            </h3>
            <p>
              يمكن لعملائنا الكرام التفضل بزيارة المحل واستلام طلباتهم طازجة ومجهزة فورياً. كما نوفر خيار التجهيز المسبق لتجد طلبك جاهزاً ومغلفاً عند وصولك لتوفير وقتك.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              2. خدمة التوصيل
            </h3>
            <p>
              نوفر خدمة توصيل الطلبات للمنازل وقاعات المناسبات بالتنسيق عبر واتساب. يتم تحديد رسوم ووقت التوصيل بناءً على موقع التسليم وحجم الطلب بالاتفاق المباشر.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              3. سلامة التغليف والنقل
            </h3>
            <p>
              يتم تغليف وتنسيق صواني وبوكسات الحلويات الشرقية بعناية فائقة تضمن وصولها بأفضل شكل ومذاق وحمايتها أثناء النقل لتصلكم وكأنها خرجت للتو من الفرن.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              4. الاستفسار ومتابعة الطلب
            </h3>
            <p>
              لمتابعة حالة طلبك أو التعديل على موعد الاستلام، يرجى التواصل المباشر مع أرقام خدمة العملاء على واتساب أو الاتصال الهاتفي.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
