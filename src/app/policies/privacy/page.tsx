import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight } from "lucide-react";

export const metadata = {
  title: "سياسة الخصوصية | حلويات حبات الشهد",
  description: "سياسة الخصوصية وحماية بيانات العملاء في حلويات حبات الشهد.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs text-brown/60">
          <Link href="/" className="hover:text-gold transition-colors">
            الرئيسية
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rotate-180" />
          <span className="font-bold text-brown">سياسة الخصوصية</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-beige shadow-sm space-y-6 text-right">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>حماية البيانات والخصوصية</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-brown-dark">
            سياسة الخصوصية
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-brown/80 leading-relaxed">
            <p>
              نحن في «حلويات حبات الشهد» نولي خصوصية عملائنا أهمية بالغة ونلتزم بحماية كافة البيانات الشخصية التي يتم مشاركتها معنا لتسهيل تقديم الطلبات وخدمات التوصيل.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              1. البيانات التي نجمعها
            </h3>
            <p>
              نقوم فقط بجمع البيانات الأساسية الضرورية لتنفيذ وتأكيد طلباتكم، وتشمل: الاسم الكريم، رقم الجوال لتأكيد موعد الاستلام أو التوصيل، والعنوان أو موقع التوصيل المطلوب.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              2. استخدام المعلومات
            </h3>
            <p>
              تُستخدم المعلومات فقط للتواصل المباشر معكم عبر الهاتف أو تطبيق واتساب بخصوص طلباتكم، وتنسيق التجهيزات الخاصة بالمناسبات، وإخطاركم بأي تحديثات على موعد التوصيل.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              3. أمان وسرية البيانات
            </h3>
            <p>
              نلتزم بعدم بيع أو تأجير أو مشاركة بياناتكم الشخصية مع أي أطراف ثالثة لأغراض تجارية، وتظل بياناتكم في سرية تامة ومحمية وفق أفضل الممارسات.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              4. التواصل معنا
            </h3>
            <p>
              لأي استفسار حول سياسة الخصوصية أو لتعديل بياناتكم، يسعدنا تواصلكم المباشر معنا عبر أرقام خدمة العملاء الموضحة في الموقع.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
