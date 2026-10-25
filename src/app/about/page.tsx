"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Sparkles,
  ChefHat,
  Award,
  Heart,
  CheckCircle2,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

export default function AboutPage() {
  const { settings } = useStore();

  const values = [
    {
      title: "أصالة المذاق التراثي",
      desc: "نعتمد على وصفات شرقية أصيلة تمنح كل قطعة نكهتها الغنية والمتوارثة التي يعشقها محبو الحلويات.",
      icon: <ChefHat className="w-6 h-6 text-gold" />,
    },
    {
      title: "أجود المكونات الطبيعية",
      desc: "ننتقي السمن البلدي الطبيعي وأفخر المكسرات بعناية فائقة دون أي مساومة على معايير الجودة.",
      icon: <Award className="w-6 h-6 text-gold" />,
    },
    {
      title: "إتقان التقديم والأناقة",
      desc: "نؤمن بأن العين تعشق قبل التذوق؛ لذا نحرص على تقديم حلوياتنا بتنسيقات وبوكسات تعكس الفخامة.",
      icon: <Sparkles className="w-6 h-6 text-gold" />,
    },
    {
      title: "كرم الضيافة والاهتمام",
      desc: "نستمع لاحتياجات عملائنا في مناسباتهم الخاصة ونبذل قصارى جهدنا لضمان رضاهم التام في كل طلب.",
      icon: <Heart className="w-6 h-6 text-gold" />,
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-extrabold text-gold-dark uppercase tracking-wider block">
            من نحن
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brown-dark">
            حكاية حبات الشهد
          </h1>
          <p className="text-base sm:text-lg text-brown/80 leading-relaxed">
            {settings.slogan} — رحلة شغف بالمذاق الشرقي الأصيل والضيافة الرفيعة.
          </p>
        </div>

        {/* Main Story Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-beige shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <h2 className="text-2xl sm:text-3xl font-black text-brown-dark">
                {settings.storyTitle}
              </h2>
              <p className="text-sm sm:text-base text-brown/85 leading-loose">
                {settings.storyContent}
              </p>
              <p className="text-sm sm:text-base text-brown/80 leading-loose">
                من الكنافة المبرومة المقرمشة والبسبوسة الطازجة بالقشطة، إلى رموش الست، والبسيمة، والجلاش الهش؛ نحرص على تقديم أصناف تجمع العائلة وتضفي بهجة استثنائية على كل مناسبة واحتفال.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-brown hover:bg-brown-dark text-cream-light font-bold px-6 py-3.5 rounded-xl text-sm transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  <span>تصفح تشكيلة منتجاتنا</span>
                </Link>
                <a
                  href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                    "مرحباً حبات الشهد 🌸 أود الاستفسار عن تجهيز ضيافة مناسبة."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>تواصل عبر واتساب</span>
                </a>
              </div>
            </div>

            {/* Emblem / Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-cream-light p-6 border-2 border-gold/40 shadow-xl flex items-center justify-center">
                <div className="relative w-60 h-60">
                  <Image
                    src="/images/logo.png"
                    alt="شعار حلويات حبات الشهد"
                    fill
                    sizes="240px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-brown-dark">
              ركائزنا وقيمنا في كل صنف
            </h3>
            <p className="text-xs sm:text-sm text-brown/70">
              المعايير الصارمة التي نلتزم بها يومياً لنضمن لكم أعلى مستويات الجودة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-beige shadow-sm space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center">
                  {val.icon}
                </div>
                <h4 className="font-extrabold text-base text-brown">
                  {val.title}
                </h4>
                <p className="text-xs text-brown/70 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
