"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
  Lock,
} from "lucide-react";

export default function Footer() {
  const { settings, categories } = useStore();

  return (
    <footer className="bg-brown-dark text-cream-light border-t-2 border-gold/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 bg-white/5 rounded-2xl p-1 border border-gold/30">
                <Image
                  src="/images/logo.png"
                  alt="حلويات حبات الشهد"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl text-gold-light block">
                  حلويات حبات الشهد
                </span>
                <span className="text-xs text-cream/70">
                  {settings.slogan}
                </span>
              </div>
            </div>
            <p className="text-sm text-cream/80 leading-relaxed">
              {settings.description}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/15 text-gold text-xs font-semibold border border-gold/30">
                <ShieldCheck className="w-4 h-4" />
                <span>مستعدون لتلبية جميع طلبات المناسبات والضيافة</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base text-gold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li>
                <Link
                  href="/"
                  className="hover:text-gold transition-colors inline-block"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-gold transition-colors inline-block"
                >
                  تشكيلة المنتجات
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="hover:text-gold transition-colors inline-block"
                >
                  صورة المنيو الكامل
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-gold transition-colors inline-block"
                >
                  حكاية حبات الشهد
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-gold transition-colors inline-block"
                >
                  معرض الصور
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gold transition-colors inline-block"
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-base text-gold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
              أصنافنا المميزة
            </h3>
            <ul className="space-y-2.5 text-sm text-cream/80">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.id}`}
                    className="hover:text-gold transition-colors inline-block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-gold-light hover:underline font-medium inline-block text-xs pt-1"
                >
                  عرض جميع الأصناف ←
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div>
            <h3 className="font-bold text-base text-gold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
              معلومات التواصل المعتمدة
            </h3>
            <div className="space-y-3 text-sm text-cream/85">
              {/* Phone 1 */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-1" />
                <div>
                  <span className="text-xs text-cream/60 block">الهاتف الأول / واتساب:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`tel:${settings.primaryPhone}`}
                      className="font-bold hover:text-gold transition-colors font-mono tracking-wider"
                      dir="ltr"
                    >
                      {settings.primaryPhone}
                    </a>
                    <a
                      href={`https://wa.me/${settings.primaryWhatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:opacity-80 transition-opacity"
                      title="واتساب"
                    >
                      <MessageCircle className="w-4 h-4 fill-current inline" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone 2 */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-1" />
                <div>
                  <span className="text-xs text-cream/60 block">الهاتف الثاني / واتساب:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`tel:${settings.secondaryPhone}`}
                      className="font-bold hover:text-gold transition-colors font-mono tracking-wider"
                      dir="ltr"
                    >
                      {settings.secondaryPhone}
                    </a>
                    <a
                      href={`https://wa.me/${settings.secondaryWhatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:opacity-80 transition-opacity"
                      title="واتساب"
                    >
                      <MessageCircle className="w-4 h-4 fill-current inline" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span className="text-xs text-cream/80">{settings.workingHours}</span>
              </div>

              {/* Map Link */}
              <div className="flex items-center gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={settings.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gold hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>موقع المحل على الخريطة</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/policies/privacy"
              className="hover:text-gold transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <span>•</span>
            <Link
              href="/policies/terms"
              className="hover:text-gold transition-colors"
            >
              الشروط والأحكام
            </Link>
            <span>•</span>
            <Link
              href="/policies/shipping"
              className="hover:text-gold transition-colors"
            >
              سياسة الطلب والتوصيل
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              className="hover:text-gold transition-colors flex items-center gap-1 text-gold/80 hover:text-gold font-medium"
            >
              <Lock className="w-3 h-3" />
              <span>لوحة الإدارة</span>
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <span>جميع الحقوق محفوظة © 2026 حلويات حبات الشهد</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
