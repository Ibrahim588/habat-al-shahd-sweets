"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { totalItems, openCart, openSearch } = useCart();
  const { settings } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "منتجاتنا", href: "/products" },
    { label: "المنيو الكامل", href: "/menu" },
    { label: "من نحن", href: "/about" },
    { label: "معرض الصور", href: "/gallery" },
    { label: "تواصل معنا", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-2.5 shadow-md border-b border-gold/20"
            : "bg-cream/95 py-3.5 border-b border-beige"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0"
              aria-label="الصفحة الرئيسية لحلويات حبات الشهد"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="شعار حلويات حبات الشهد"
                  fill
                  sizes="56px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl text-brown tracking-tight leading-tight group-hover:text-gold-dark transition-colors">
                  حبات الشهد
                </span>
                <span className="text-[11px] sm:text-xs text-gold-dark font-medium -mt-0.5">
                  حلويات شرقية فاخرة
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-brown-dark bg-gold/15 font-bold border-b-2 border-gold"
                        : "text-brown/85 hover:text-brown-dark hover:bg-beige/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Cart, WhatsApp CTA, Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={openSearch}
                aria-label="البحث عن منتج"
                className="p-2 sm:p-2.5 text-brown/80 hover:text-brown hover:bg-beige/50 rounded-xl transition-all"
                title="بحث"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <button
                onClick={openCart}
                aria-label="سلة المشتريات"
                className="relative p-2 sm:p-2.5 text-brown/80 hover:text-brown hover:bg-beige/50 rounded-xl transition-all"
                title="سلة المشتريات"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-brown-dark font-bold text-[11px] min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 shadow-md animate-scale">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* WhatsApp Quick Order CTA */}
              <a
                href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                  "مرحباً حلويات حبات الشهد 🌸، أود الاستفسار والطلب من التشكيلة المتوفرة."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-brown-dark font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm hover:shadow transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>اطلب واتساب</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                className="lg:hidden p-2 text-brown rounded-xl hover:bg-beige/50 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay / Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-cream p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-gold/30 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-beige">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/images/logo.png"
                      alt="حبات الشهد"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-brown block text-base">
                      حلويات حبات الشهد
                    </span>
                    <span className="text-[11px] text-gold-dark">
                      طعم شرقي فاخر
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-brown/70 hover:text-brown hover:bg-beige/60"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-6 flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        isActive
                          ? "bg-gold text-brown-dark font-bold shadow-sm"
                          : "text-brown/90 hover:bg-beige/50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & Contacts */}
            <div className="pt-6 border-t border-beige space-y-3">
              <a
                href={`https://wa.me/${settings.primaryWhatsapp}?text=${encodeURIComponent(
                  "مرحباً حلويات حبات الشهد 🌸 أود تقديم طلب."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl shadow hover:bg-[#20ba59] transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>طلب سريع عبر واتساب</span>
              </a>

              <a
                href={`tel:${settings.primaryPhone}`}
                className="w-full flex items-center justify-center gap-2 bg-brown text-cream-light font-bold py-3 px-4 rounded-xl hover:bg-brown-dark transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>اتصل بنا: {settings.primaryPhone}</span>
              </a>

              <div className="text-center text-xs text-brown/60 pt-2">
                حلويات حبات الشهد © 2026
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
