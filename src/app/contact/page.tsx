"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const { settings, addInquiry } = useStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasionType, setOccasionType] = useState("طلب عام");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    addInquiry({
      name: name.trim(),
      phone: phone.trim(),
      occasionType,
      message: message.trim(),
    });

    setSubmitted(true);
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-extrabold text-gold-dark uppercase tracking-wider block">
            خدمة العملاء والطلبات
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brown-dark">
            تواصل مع حلويات حبات الشهد
          </h1>
          <p className="text-sm text-brown/70 leading-relaxed">
            يسعدنا استقبال استفساراتكم وطلباتكم المخصصة للمناسبات والضيافة عبر الهاتف أو واتساب مباشرة، أو من خلال النموذج أدناه.
          </p>
        </div>

        {/* Contact Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Phone 1 */}
          <div className="bg-white rounded-3xl p-6 border border-beige shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center text-gold-dark">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-brown/60 block">الرقم المعتمد الأول:</span>
              <h3 className="font-extrabold text-xl text-brown font-mono mt-1" dir="ltr">
                {settings.primaryPhone}
              </h3>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <a
                href={`tel:${settings.primaryPhone}`}
                className="flex-1 bg-brown text-cream-light hover:bg-brown-dark font-bold text-center py-2.5 px-3 rounded-xl text-xs transition-colors"
              >
                اتصال الآن
              </a>
              <a
                href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                  "مرحباً حلويات حبات الشهد 🌸 أود الاستفسار والطلب."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-center py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>واتساب</span>
              </a>
            </div>
          </div>

          {/* Card 2: Phone 2 */}
          <div className="bg-white rounded-3xl p-6 border border-beige shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center text-gold-dark">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-brown/60 block">الرقم المعتمد الثاني:</span>
              <h3 className="font-extrabold text-xl text-brown font-mono mt-1" dir="ltr">
                {settings.secondaryPhone}
              </h3>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <a
                href={`tel:${settings.secondaryPhone}`}
                className="flex-1 bg-brown text-cream-light hover:bg-brown-dark font-bold text-center py-2.5 px-3 rounded-xl text-xs transition-colors"
              >
                اتصال الآن
              </a>
              <a
                href={`https://wa.me/${settings.secondaryWhatsapp}?text=${encodeURIComponent(
                  "مرحباً حلويات حبات الشهد 🌸 أود الاستفسار والطلب."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-center py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>واتساب</span>
              </a>
            </div>
          </div>

          {/* Card 3: Location & Hours */}
          <div className="bg-white rounded-3xl p-6 border border-beige shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center text-gold-dark">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-brown/60 block">أوقات العمل المعتمدة:</span>
              <h3 className="font-extrabold text-base text-brown mt-1">
                {settings.workingHours}
              </h3>
            </div>
            <div className="pt-2">
              <a
                href={settings.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-cream hover:bg-beige/60 text-brown font-bold py-2.5 px-3 rounded-xl text-xs border border-gold/40 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                <span>موقع المحل على الخريطة</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form & Direct Order Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-beige shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-brown-dark mb-2">
              أرسل رسالة أو استفساراً
            </h2>
            <p className="text-xs sm:text-sm text-brown/70 mb-6">
              سيتم تسجيل رسالتك وسيتواصل معك فريق حلويات حبات الشهد في أقرب وقت.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                <h3 className="font-extrabold text-base text-green-900">
                  تم إرسال رسالتك بنجاح!
                </h3>
                <p className="text-xs text-green-700">
                  شكراً لتواصلك مع حبات الشهد. سنقوم بالرد عليك هاتفياً أو عبر واتساب قريباً.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-green-800 underline"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brown block">
                      الاسم الكريم *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="محمد الفندي"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-xl border border-beige bg-cream/30 focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brown block">
                      رقم الجوال *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-xl border border-beige bg-cream/30 focus:border-gold focus:outline-none text-right"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brown block">
                    نوع الطلب أو المناسبة
                  </label>
                  <select
                    value={occasionType}
                    onChange={(e) => setOccasionType(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-xl border border-beige bg-cream/30 focus:border-gold focus:outline-none cursor-pointer"
                  >
                    <option value="طلب عام">طلب عام من المنيو</option>
                    <option value="تجهيز صواني عرس / خطوبة">
                      تجهيز صواني عرس أو خطوبة
                    </option>
                    <option value="ضيافة جمعات واجتماعات">
                      ضيافة جمعات واجتماعات عائلية
                    </option>
                    <option value="طلب كميات مخصصة">طلب كميات مخصصة</option>
                    <option value="اقتراح أو استفسار">اقتراح أو استفسار</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brown block">
                    تفاصيل الرسالة أو الطلب *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="اكتب هنا الأصناف والكميات المطلوبة، أو موعد المناسبة..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-xl border border-beige bg-cream/30 focus:border-gold focus:outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-brown hover:bg-brown-dark text-cream-light font-extrabold text-sm shadow-md transition-all"
                >
                  <Send className="w-4 h-4 text-gold" />
                  <span>إرسال الرسالة الآن</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct WhatsApp Callout Info */}
          <div className="lg:col-span-5 rounded-3xl bg-brown-dark text-cream-light p-8 sm:p-10 border-2 border-gold/40 shadow-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>استجابة فورية</span>
            </div>

            <h3 className="text-2xl font-black text-cream-light">
              هل تفضل الطلب السريع دون انتظار؟
            </h3>

            <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
              فريقنا متواجد على مدار اليوم لتسجيل طلباتكم وتأكيد الحجوزات للمناسبات عبر المحادثة المباشرة في تطبيق واتساب.
            </p>

            <div className="pt-2 space-y-3">
              <a
                href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                  "مرحباً حلويات حبات الشهد 🌸 أود تقديم طلب مباشر عبر واتساب."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>محادثة واتساب فورية: {settings.primaryPhone}</span>
              </a>

              <a
                href={`https://wa.me/${settings.secondaryWhatsapp}?text=${encodeURIComponent(
                  "مرحباً حلويات حبات الشهد 🌸 أود تقديم طلب مباشر عبر واتساب."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-cream-light font-bold text-xs border border-gold/30 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                <span>محادثة واتساب الرقم الثاني: {settings.secondaryPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
