import React from "react";
import Link from "next/link";
import { FileCheck, ChevronRight } from "lucide-react";

export const metadata = {
  title: "الشروط والأحكام | حلويات حبات الشهد",
  description: "الشروط والأحكام الخاصة بالطلب والخدمات في حلويات حبات الشهد.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs text-brown/60">
          <Link href="/" className="hover:text-gold transition-colors">
            الرئيسية
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rotate-180" />
          <span className="font-bold text-brown">الشروط والأحكام</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-beige shadow-sm space-y-6 text-right">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold">
            <FileCheck className="w-4 h-4" />
            <span>تنظيم الخدمات والطلبات</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-brown-dark">
            الشروط والأحكام
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-brown/80 leading-relaxed">
            <p>
              أهلاً بكم في «حلويات حبات الشهد». يُعد تصفحكم للموقع أو إرسال طلباتكم عبر واتساب أو الهاتف إقراراً بالموافقة على الشروط والأحكام المبينة أدناه.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              1. طبيعة المنتجات والتحضير
            </h3>
            <p>
              جميع حلوياتنا تُحضر طازجة من مكونات طبيعية وسمن بلدي. نظراً لطبيعة الحلويات الطازجة، يُنصح باستهلاكها وحفظها وفق إرشادات الحفظ الموصى بها.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              2. تأكيد الطلبات والأسعار
            </h3>
            <p>
              تعتبر الأسعار المعروضة استرشادية وقد تختلف قليلاً بحسب الوزن الفعلي للصينية أو نوع التغليف المختار للضيافة، ويتم تأكيد القيمة الإجمالية وموعد التسليم مع العميل مباشرة عبر واتساب قبل بدء التحضير.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              3. طلبات المناسبات الخاصة
            </h3>
            <p>
              للطلبات الخاصة والكميات الكبيرة وحفلات الزفاف، يُفضل التواصل والتنسيق المسبق بمدة كافية لضمان توفير وتنسيق الصواني في الموعد المطلوب بكل إتقان.
            </p>

            <h3 className="text-base font-extrabold text-brown pt-2">
              4. التعديل والإلغاء
            </h3>
            <p>
              يمكن تعديل أو إلغاء الطلبات بالتنسيق المباشر مع خدمة العملاء قبل البدء في تجهيز وخبز الأصناف المطلوبة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
