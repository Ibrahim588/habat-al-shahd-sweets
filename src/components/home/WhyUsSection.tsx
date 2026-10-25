"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle, ChefHat } from "lucide-react";

export default function WhyUsSection() {
  const points = [
    {
      title: "العناية الفائقة بالتفاصيل",
      desc: "من اختيار المكونات الدقيقة، إلى عيار القطر الهادئ، وصولاً إلى ترتيب القطع بأناقة تسر الناظرين.",
    },
    {
      title: "مكونات طبيعية وسمن بلدي",
      desc: "نرفض المساومة على الطعم، ونستخدم السمن البلدي الطبيعي الذي يمنح حلوياتنا رائحتها الزكية ومذاقها الغني.",
    },
    {
      title: "تنوع واسع يرضي جميع الأذواق",
      desc: "خيارات شاملة من البسبوسة بأنواعها، الكنافة المقرمشة، الجلاش، النواشف والحلويات الشرقية المحشوة.",
    },
    {
      title: "جاهزية دائمة لتلبية المناسبات",
      desc: "سرعة في الاستجابة وحرص تام على تسليم الطلبات طازجة في موعدها المحدد دون أي تأخير.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Grid of photos */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-beige">
              <Image
                src="/images/basbousa.jpg"
                alt="بسبوسة حبات الشهد"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-beige translate-y-4">
              <Image
                src="/images/kunafa.jpg"
                alt="كنافة حبات الشهد"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-beige">
              <Image
                src="/images/rosh-el-sett.jpg"
                alt="رموش الست حبات الشهد"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-beige translate-y-4">
              <Image
                src="/images/sabaat.jpg"
                alt="صباعات حبات الشهد"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold">
              <ChefHat className="w-3.5 h-3.5" />
              <span>سر التميز والمذاق</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-brown-dark leading-tight">
              لماذا يختار عملاؤنا «حلويات حبات الشهد»؟
            </h2>

            <p className="text-sm sm:text-base text-brown/75 leading-relaxed">
              نصنع حلوياتنا بشغف وحرفية، محافظين على أسرار الصنعة التراثية التي تجعل كل قطعة تجربة تذوق ممتعة تبقى في ذاكرة ضيوفكم.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {points.map((pt, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white border border-beige/90 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    <h4 className="font-extrabold text-sm text-brown">
                      {pt.title}
                    </h4>
                  </div>
                  <p className="text-xs text-brown/70 leading-relaxed pr-6">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
