"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Gift, MessageCircle, HeartHandshake } from "lucide-react";

export default function OccasionsSection() {
  const { settings, products } = useStore();

  const getProductImage = (idOrCategory: string, fallback: string) => {
    const prod = products.find(
      (p) => p.id === idOrCategory || p.category === idOrCategory
    );
    return prod?.image || fallback;
  };

  const occasions = [
    {
      title: "صواني الضيافة والأعراس",
      desc: "تنسيق مخصص لصواني الحلويات الشرقية المشكلة والفاخرة بأحجام تلائم كافة مناسباتكم الكبرى.",
      image: getProductImage("kunafa", "/images/kunafa.jpg"),
    },
    {
      title: "بوكسات الجمعات والعائلات",
      desc: "تشكيلات بسبوسة وكنافة وقشطة طازجة مرتبة بطريقة أنيقة ومريحة للمشاركة في الجمعات.",
      image: getProductImage("basbousa-qeshta", "/images/basbousa-qeshta.jpg"),
    },
    {
      title: "ضيافة القهوة والشاي",
      desc: "أصناف روش الست والصباعات والبسيمة المحضرة بحجم لقمة واحدة لترافق فنجان القهوة الأصيل.",
      image: getProductImage("rosh-el-sett", "/images/rosh-el-sett.jpg"),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold">
            <Gift className="w-3.5 h-3.5" />
            <span>تجهيزات خاصة راقية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-brown-dark">
            حلويات تليق بأفراحكم ومناسباتكم
          </h2>
          <p className="text-sm text-brown/70 leading-relaxed">
            نضع لمستنا الخاصة في كل صينية وبوكس ضيافة ليظهر كرمكم بأبهى صورة أمام ضيوفكم وأحبابكم.
          </p>
        </div>

        {/* 3 Occasions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {occasions.map((occ, idx) => (
            <div
              key={idx}
              className="bg-cream/60 rounded-3xl overflow-hidden border border-beige/90 luxury-card-shadow luxury-card-shadow-hover flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-light">
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={occ.image.startsWith("http")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-extrabold text-lg text-brown-dark">
                  {occ.title}
                </h3>
                <p className="text-xs text-brown/70 leading-relaxed">
                  {occ.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Order Callout */}
        <div className="rounded-3xl bg-brown-dark text-cream-light p-8 sm:p-10 border-2 border-gold/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-center md:text-right">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-gold font-bold text-xs">
              <HeartHandshake className="w-4 h-4" />
              <span>طلبات مخصصة وتجهيز مسبق</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-cream-light">
              هل لديكم مناسبة أو طلب خاص بكميات محددة؟
            </h3>
            <p className="text-xs sm:text-sm text-cream/70 max-w-xl">
              تواصلوا معنا عبر واتساب لمساعدتكم في اختيار الأصناف وتحديد الكميات المناسبة وتجهيزها في الوقت المحدد بدقة واحترافية.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                "مرحباً حلويات حبات الشهد 🌸 أود التنسيق والاستفسار عن تجهيز صواني / طلب خاص بمناسبة."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>طلب تجهيز مناسبة عبر واتساب</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-cream-light font-bold px-5 py-3.5 rounded-xl text-sm border border-gold/30 transition-all"
            >
              <span>نموذج التواصل</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
