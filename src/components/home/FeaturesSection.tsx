"use client";

import React from "react";
import { Sparkles, Utensils, Gift, Zap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: "سمن بلدي نقي 100%",
      description:
        "نعتمد أجود أنواع السمن البلدي الطبيعي والمكسرات الطازجة لمنحكم النكهة الشرقية الأصيلة التي تميز حبات الشهد.",
    },
    {
      icon: <Utensils className="w-6 h-6 text-gold" />,
      title: "طازج يومياً من الفرن",
      description:
        "خبز وتحضير يومي مستمر لنضمن لكم أعلى درجات القرمشة والطراوة المتوازنة في كل قطعة.",
    },
    {
      icon: <Gift className="w-6 h-6 text-gold" />,
      title: "تجهيز صواني ومناسبات",
      description:
        "تنسيقات فاخرة وصواني ضيافة تليق بالأعياد، حفلات الزفاف، والاجتماعات العائلية الراقية.",
    },
    {
      icon: <Zap className="w-6 h-6 text-gold" />,
      title: "طلب مباشر وسريع",
      description:
        "تنسيق فوري عبر واتساب برقمين معتمدين وتلبية سريعة لكافة طلباتكم المخصصة.",
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-beige/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-cream/50 border border-beige hover:border-gold/40 hover:bg-cream transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-extrabold text-base text-brown mb-2 group-hover:text-gold-dark transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-brown/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
