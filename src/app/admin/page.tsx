"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Product, Category, SiteSettings, Inquiry } from "@/types";
import {
  Lock,
  LayoutDashboard,
  ShoppingBag,
  Tags,
  Settings,
  Mail,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  Eye,
  Sparkles,
  Phone,
  MessageCircle,
  Link2,
  X,
  Database,
  Cloud,
  RefreshCw,
  Clock,
  MapPin,
} from "lucide-react";

export default function AdminPage() {
  const {
    products,
    categories,
    settings,
    inquiries,
    isFirestoreConnected,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateSettings,
    updateInquiryStatus,
    syncInitialData,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
  } = useStore();

  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "categories" | "settings" | "inquiries" | "backup"
  >("overview");

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: categories[0]?.id || "basbousa",
    price: 0,
    pricePerKilo: "" as string | number,
    pricePerBox: "" as string | number,
    unit: "كغم / صندوق",
    description: "",
    image: "",
    isFeatured: false,
    isAvailable: true,
  });

  // Category modal state
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    image: "/images/basbousa.jpg",
  });

  // Settings form local state
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Check if session stored
  useEffect(() => {
    const auth = sessionStorage.getItem("shahd_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "shahd2026" || passcode === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("shahd_admin_auth", "true");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("shahd_admin_auth");
  };

  const showNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // If not authenticated, show modern passcode login
  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-cream min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gold/40 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gold/15 text-gold-dark mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-brown">
              لوحة تحكم حبات الشهد
            </h1>
            <p className="text-xs text-brown/60">
              يرجى إدخال رمز المرور للمتابعة إلى الإدارة
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="أدخل رمز المرور"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setLoginError(false);
                }}
                className="w-full text-center text-sm p-3.5 rounded-2xl border border-beige bg-cream/40 focus:border-gold focus:outline-none tracking-widest font-mono"
              />
              {loginError && (
                <span className="text-xs text-red-600 block mt-1.5 font-bold">
                  رمز المرور غير صحيح، يرجى التحقق والمحاولة مرة أخرى
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-brown hover:bg-brown-dark text-cream-light font-extrabold py-3.5 px-4 rounded-2xl text-sm transition-all shadow-md"
            >
              تسجيل الدخول
            </button>

            <div className="pt-2">
              <Link
                href="/"
                className="text-xs text-brown/60 hover:text-gold-dark font-medium underline"
              >
                العودة إلى الصفحة الرئيسية للموقع
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Bar */}
        <div className="bg-white p-6 rounded-3xl border border-beige shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-cream rounded-2xl p-1 border border-gold/40">
              <Image
                src="/images/logo.png"
                alt="شعار حبات الشهد"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-brown">
                لوحة إدارة حلويات حبات الشهد
              </h1>
              <span className="text-xs text-brown/60">
                إدارة الأصناف والأسعار والإعدادات ومتابعة الطلبات
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-cream hover:bg-beige/60 text-brown font-bold text-xs border border-beige flex items-center gap-1.5 transition-all"
            >
              <Eye className="w-4 h-4 text-gold-dark" />
              <span>معاينة الموقع</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>

        {/* Global Save Notification */}
        {saveSuccessMsg && (
          <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Database Status & Cloud Sync Bar */}
        <div className="bg-white p-4 rounded-2xl border border-beige shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${isFirestoreConnected ? "bg-green-500 animate-pulse" : "bg-amber-500"}`} />
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-brown font-bold">
              <Database className="w-4 h-4 text-gold-dark" />
              <span>قاعدة البيانات:</span>
              {isFirestoreConnected ? (
                <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded-md font-semibold">
                  سحابية متصلة (Firebase Firestore) — أي تعديل في الأسعار أو المنتجات ينعكس فوراً للجميع
                </span>
              ) : (
                <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                  محفوظة محلياً وسحابياً — اضغط مزامنة لرفع البيانات الحالية للسحابة
                </span>
              )}
            </div>
          </div>

          <button
            onClick={async () => {
              setIsSyncing(true);
              const res = await syncInitialData();
              setIsSyncing(false);
              showNotification(res.message);
            }}
            disabled={isSyncing}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold hover:bg-gold-light text-brown-dark font-extrabold text-xs transition-all shadow-sm disabled:opacity-50 shrink-0 cursor-pointer"
            title="رفع الأصناف والأسعار الحالية إلى قاعدة بيانات Firestore السحابية"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "جارٍ المزامنة السحابية..." : "مزامنة ورفع البيانات إلى السحابة"}</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "overview"
                ? "bg-brown text-cream-light shadow-md"
                : "bg-white text-brown hover:bg-beige/50 border border-beige"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>ملخص الإحصاءات</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "products"
                ? "bg-brown text-cream-light shadow-md"
                : "bg-white text-brown hover:bg-beige/50 border border-beige"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>إدارة المنتجات ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "categories"
                ? "bg-brown text-cream-light shadow-md"
                : "bg-white text-brown hover:bg-beige/50 border border-beige"
            }`}
          >
            <Tags className="w-4 h-4" />
            <span>إدارة التصنيفات ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "settings"
                ? "bg-brown text-cream-light shadow-md"
                : "bg-white text-brown hover:bg-beige/50 border border-beige"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات الموقع والهوية</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "inquiries"
                ? "bg-brown text-cream-light shadow-md"
                : "bg-white text-brown hover:bg-beige/50 border border-beige"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>الطلبات والاستفسارات ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("backup")}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "backup"
                ? "bg-brown text-cream-light shadow-md"
                : "bg-white text-brown hover:bg-beige/50 border border-beige"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>نسخ احتياطي / استعادة</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-beige shadow-sm space-y-2">
                <span className="text-xs text-brown/60 block">إجمالي المنتجات</span>
                <span className="text-3xl font-black text-brown font-mono">
                  {products.length}
                </span>
                <span className="text-[11px] text-green-700 font-medium block">
                  {products.filter((p) => p.isAvailable).length} صنف متاح للطلب
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-beige shadow-sm space-y-2">
                <span className="text-xs text-brown/60 block">الأصناف المميزة</span>
                <span className="text-3xl font-black text-gold-dark font-mono">
                  {products.filter((p) => p.isFeatured).length}
                </span>
                <span className="text-[11px] text-brown/60 block">
                  تظهر في الواجهة الرئيسية
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-beige shadow-sm space-y-2">
                <span className="text-xs text-brown/60 block">التصنيفات المعتمدة</span>
                <span className="text-3xl font-black text-brown font-mono">
                  {categories.length}
                </span>
                <span className="text-[11px] text-brown/60 block">
                  بسبوسيات، كنافيات، شرقيات...
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-beige shadow-sm space-y-2">
                <span className="text-xs text-brown/60 block">رسائل وطلبات العملاء</span>
                <span className="text-3xl font-black text-brown font-mono">
                  {inquiries.length}
                </span>
                <span className="text-[11px] text-gold-dark font-bold block">
                  {inquiries.filter((i) => i.status === "new").length} طلبات جديدة
                </span>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige shadow-sm space-y-4">
              <h2 className="text-lg font-black text-brown">إجراءات سريعة</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setActiveTab("products");
                    setIsAddingProduct(true);
                  }}
                  className="bg-gold hover:bg-gold-light text-brown-dark font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة صنف جديد</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("settings");
                  }}
                  className="bg-brown hover:bg-brown-dark text-cream-light font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <Settings className="w-4 h-4 text-gold" />
                  <span>تعديل ساعات العمل والإعدادات</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("inquiries");
                  }}
                  className="bg-cream hover:bg-beige/60 text-brown font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-beige flex items-center gap-2 transition-all"
                >
                  <Mail className="w-4 h-4 text-gold-dark" />
                  <span>مراجعة طلبات السلة والتواصل</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products Management */}
        {activeTab === "products" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige">
              <div>
                <h2 className="text-xl font-black text-brown">إدارة الأصناف والمنتجات</h2>
                <span className="text-xs text-brown/60">
                  إضافة، تعديل، حذف، وتحديد الأسعار وتفعيل ظهور الأصناف المميزة
                </span>
              </div>
              <button
                onClick={() => setIsAddingProduct(true)}
                className="bg-gold hover:bg-gold-light text-brown-dark font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة صنف جديد</span>
              </button>
            </div>

            {/* Add Product Form Modal / Section */}
            {isAddingProduct && (
              <div className="p-6 rounded-2xl bg-cream-light border-2 border-gold/40 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-brown">
                    إضافة صنف جديد إلى القائمة
                  </h3>
                  <button
                    onClick={() => setIsAddingProduct(false)}
                    className="text-brown/60 hover:text-brown text-xs"
                  >
                    إلغاء
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brown block">
                      اسم الصنف *
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: بسبوسة بالمكسرات"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="w-full text-xs p-3 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brown block">
                      التصنيف *
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, category: e.target.value })
                      }
                      className="w-full text-xs p-3 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing Options: Kilo & Box */}
                <div className="p-4 rounded-2xl bg-cream/50 border border-beige space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-bold text-brown flex items-center gap-1.5">
                      <Tags className="w-3.5 h-3.5 text-gold-dark" />
                      <span>خيارات وأسعار البيع (بالكيلو / بالصندوق)</span>
                    </span>
                    <span className="text-[10px] text-brown/60">
                      اترك الحقل فارغاً إذا كان الصنف لا يُباع بتلك الوحدة
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brown block">
                        ⚖️ سعر الكيلو (ر.س):
                      </label>
                      <input
                        type="number"
                        placeholder="مثال: 60 (اتركه فارغاً إن لم يتوفر)"
                        value={newProduct.pricePerKilo}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            pricePerKilo: e.target.value === "" ? "" : Number(e.target.value),
                          })
                        }
                        className="w-full text-xs p-3 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brown block">
                        📦 سعر الصندوق (ر.س):
                      </label>
                      <input
                        type="number"
                        placeholder="مثال: 100 (اتركه فارغاً إن لم يتوفر)"
                        value={newProduct.pricePerBox}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            pricePerBox: e.target.value === "" ? "" : Number(e.target.value),
                          })
                        }
                        className="w-full text-xs p-3 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-beige/60">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brown/80 block">
                        سعر عام / ثابت (اختياري للقطعة):
                      </label>
                      <input
                        type="number"
                        placeholder="سعر افتراضي بديل إن وجد"
                        value={newProduct.price || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value === "" ? 0 : Number(e.target.value),
                          })
                        }
                        className="w-full text-xs p-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brown/80 block">
                        نص الوحدة الافتراضية:
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: كغم / صندوق"
                        value={newProduct.unit}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, unit: e.target.value })
                        }
                        className="w-full text-xs p-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brown flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Link2 className="w-3.5 h-3.5 text-gold-dark" />
                        <span>رابط صورة الصنف (URL مباشر)</span>
                      </span>
                      {newProduct.image && (
                        <span className="text-[10px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-md">
                          تم تعيين الرابط
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        placeholder="https://example.com/sweet-photo.jpg أو /images/item.png"
                        value={newProduct.image}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, image: e.target.value })
                        }
                        className="w-full text-xs p-3 pl-8 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold text-left font-mono"
                        dir="ltr"
                      />
                      {newProduct.image && (
                        <button
                          type="button"
                          onClick={() => setNewProduct({ ...newProduct, image: "" })}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brown/40 hover:text-brown text-xs p-1"
                          title="مسح الرابط"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] text-brown/60 block">
                      ضع رابط الصورة المباشر من أي موقع أو خدمة رفع صور (يدعم JPG, PNG, WebP)
                    </span>
                  </div>

                  {/* Live Image Preview */}
                  {newProduct.image ? (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-beige">
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-cream shrink-0 border border-gold/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={newProduct.image}
                          alt="معاينة الصورة المرفقة"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/basbousa.jpg";
                          }}
                        />
                      </div>
                      <div className="text-right flex-1 min-w-0">
                        <span className="text-xs font-bold text-brown block">معاينة الصورة المرفقة</span>
                        <span className="text-[10px] text-brown/60 truncate block text-left font-mono" dir="ltr">
                          {newProduct.image}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-cream/40 border border-dashed border-beige text-center">
                      <span className="text-[11px] text-brown/60">
                        معاينة الصورة ستظهر هنا فور إدخال الرابط (في حال تركه فارغاً ستُعتمد صورة افتراضية)
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-brown">
                      <input
                        type="checkbox"
                        checked={newProduct.isFeatured}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            isFeatured: e.target.checked,
                          })
                        }
                        className="rounded text-gold focus:ring-gold"
                      />
                      <span>صنف مميز (يظهر في الواجهة)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-brown">
                      <input
                        type="checkbox"
                        checked={newProduct.isAvailable}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            isAvailable: e.target.checked,
                          })
                        }
                        className="rounded text-gold focus:ring-gold"
                      />
                      <span>متاح للطلب</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown block">
                    الوصف
                  </label>
                  <textarea
                    rows={2}
                    placeholder="وصف مختصر عن الصنف ومكوناته..."
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full text-xs p-3 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold"
                  />
                </div>

                <button
                  onClick={async () => {
                    if (!newProduct.name.trim()) {
                      alert("يرجى إدخال اسم الصنف أولاً");
                      return;
                    }
                    const finalImage = newProduct.image.trim() || "/images/basbousa.jpg";
                    const pk =
                      newProduct.pricePerKilo !== "" && !isNaN(Number(newProduct.pricePerKilo))
                        ? Number(newProduct.pricePerKilo)
                        : undefined;
                    const pb =
                      newProduct.pricePerBox !== "" && !isNaN(Number(newProduct.pricePerBox))
                        ? Number(newProduct.pricePerBox)
                        : undefined;
                    const pBase =
                      Number(newProduct.price) > 0
                        ? Number(newProduct.price)
                        : pk || pb || 0;

                    const ok = await addProduct({
                      ...newProduct,
                      price: pBase,
                      pricePerKilo: pk,
                      pricePerBox: pb,
                      image: finalImage,
                    });
                    const createdName = newProduct.name;
                    setNewProduct({
                      name: "",
                      category: categories[0]?.id || "basbousa",
                      price: 0,
                      pricePerKilo: "",
                      pricePerBox: "",
                      unit: "كغم / صندوق",
                      description: "",
                      image: "",
                      isFeatured: false,
                      isAvailable: true,
                    });
                    setIsAddingProduct(false);
                    if (ok) {
                      showNotification(`تمت إضافة الصنف "${createdName}" وحفظه في السحابة بنجاح!`);
                    } else {
                      showNotification(`تمت إضافة الصنف "${createdName}" محلياً، تعذر الحفظ السحابي`);
                    }
                  }}
                  className="bg-brown hover:bg-brown-dark text-cream-light font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  حفظ الصنف الجديد
                </button>
              </div>
            )}

            {/* Edit Product Modal */}
            {editingProduct && (
              <div className="p-6 rounded-2xl bg-cream-light border-2 border-gold/40 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-brown">
                    تعديل بيانات الصنف: {editingProduct.name}
                  </h3>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="text-brown/60 hover:text-brown text-xs"
                  >
                    إلغاء
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brown block">
                      اسم الصنف *
                    </label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      className="w-full text-xs p-3 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brown block">
                      التصنيف *
                    </label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, category: e.target.value })
                      }
                      className="w-full text-xs p-3 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Edit Pricing Options: Kilo & Box */}
                <div className="p-4 rounded-2xl bg-cream/50 border border-beige space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-bold text-brown flex items-center gap-1.5">
                      <Tags className="w-3.5 h-3.5 text-gold-dark" />
                      <span>خيارات وأسعار البيع (بالكيلو / بالصندوق)</span>
                    </span>
                    <span className="text-[10px] text-brown/60">
                      اترك الحقل فارغاً إذا كان الصنف لا يُباع بتلك الوحدة
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brown block">
                        ⚖️ سعر الكيلو (ر.س):
                      </label>
                      <input
                        type="number"
                        placeholder="مثال: 60 (اتركه فارغاً إن لم يتوفر)"
                        value={editingProduct.pricePerKilo ?? ""}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            pricePerKilo:
                              e.target.value === "" ? undefined : Number(e.target.value),
                          })
                        }
                        className="w-full text-xs p-3 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brown block">
                        📦 سعر الصندوق (ر.س):
                      </label>
                      <input
                        type="number"
                        placeholder="مثال: 100 (اتركه فارغاً إن لم يتوفر)"
                        value={editingProduct.pricePerBox ?? ""}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            pricePerBox:
                              e.target.value === "" ? undefined : Number(e.target.value),
                          })
                        }
                        className="w-full text-xs p-3 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-beige/60">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brown/80 block">
                        سعر عام / ثابت (اختياري للقطعة):
                      </label>
                      <input
                        type="number"
                        placeholder="سعر افتراضي بديل"
                        value={editingProduct.price || ""}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price:
                              e.target.value === "" ? undefined : Number(e.target.value),
                          })
                        }
                        className="w-full text-xs p-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brown/80 block">
                        نص الوحدة الافتراضية:
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: كغم / صندوق"
                        value={editingProduct.unit}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, unit: e.target.value })
                        }
                        className="w-full text-xs p-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Edit Image URL */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brown flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Link2 className="w-3.5 h-3.5 text-gold-dark" />
                        <span>رابط صورة الصنف (URL مباشر)</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        placeholder="https://example.com/sweet-photo.jpg"
                        value={editingProduct.image}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, image: e.target.value })
                        }
                        className="w-full text-xs p-3 pl-8 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold text-left font-mono"
                        dir="ltr"
                      />
                      {editingProduct.image && (
                        <button
                          type="button"
                          onClick={() => setEditingProduct({ ...editingProduct, image: "" })}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brown/40 hover:text-brown text-xs p-1"
                          title="مسح الرابط"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {editingProduct.image && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-beige">
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-cream shrink-0 border border-gold/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={editingProduct.image}
                          alt="معاينة الصورة"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/basbousa.jpg";
                          }}
                        />
                      </div>
                      <div className="text-right flex-1 min-w-0">
                        <span className="text-xs font-bold text-brown block">معاينة الصورة المرفقة</span>
                        <span className="text-[10px] text-brown/60 truncate block text-left font-mono" dir="ltr">
                          {editingProduct.image}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-brown">
                      <input
                        type="checkbox"
                        checked={editingProduct.isFeatured}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            isFeatured: e.target.checked,
                          })
                        }
                        className="rounded text-gold focus:ring-gold"
                      />
                      <span>صنف مميز (يظهر في الواجهة)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-brown">
                      <input
                        type="checkbox"
                        checked={editingProduct.isAvailable}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            isAvailable: e.target.checked,
                          })
                        }
                        className="rounded text-gold focus:ring-gold"
                      />
                      <span>متاح للطلب</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown block">
                    الوصف
                  </label>
                  <textarea
                    rows={2}
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full text-xs p-3 rounded-xl border border-beige bg-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      if (!editingProduct.name.trim()) return;
                      const targetName = editingProduct.name;
                      const ok = await updateProduct(editingProduct.id, editingProduct);
                      setEditingProduct(null);
                      if (ok) {
                        showNotification(`تم حفظ وتحديث بيانات وسعر الصنف "${targetName}" في السحابة بنجاح!`);
                      } else {
                        showNotification(`تم حفظ تعديل الصنف "${targetName}" محلياً، تعذر الحفظ السحابي`);
                      }
                    }}
                    className="bg-brown hover:bg-brown-dark text-cream-light font-bold px-6 py-2.5 rounded-xl text-xs"
                  >
                    حفظ التعديلات
                  </button>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="bg-cream hover:bg-beige/60 text-brown font-bold px-4 py-2.5 rounded-xl text-xs"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-beige bg-cream/40 text-brown/70 font-bold">
                    <th className="p-3">الصورة</th>
                    <th className="p-3">اسم الصنف</th>
                    <th className="p-3">التصنيف</th>
                    <th className="p-3">السعر</th>
                    <th className="p-3 text-center">مميز</th>
                    <th className="p-3 text-center">الحالة</th>
                    <th className="p-3 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-beige">
                  {products.map((p) => {
                    const cat = categories.find((c) => c.id === p.category);
                    return (
                      <tr key={p.id} className="hover:bg-cream/20">
                        <td className="p-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                              unoptimized={p.image?.startsWith("http")}
                            />
                          </div>
                        </td>
                        <td className="p-3 font-bold text-brown">
                          {p.name}
                          <span className="block text-[10px] text-brown/50 font-normal truncate max-w-xs">
                            {p.description}
                          </span>
                        </td>
                        <td className="p-3 text-brown/80">{cat?.name || p.category}</td>
                        <td className="p-3">
                          <div className="space-y-0.5">
                            {p.pricePerKilo ? (
                              <div className="text-xs font-bold text-brown whitespace-nowrap">
                                ⚖️ الكيلو: <span className="font-mono text-gold-dark">{p.pricePerKilo}</span> ر.س
                              </div>
                            ) : null}
                            {p.pricePerBox ? (
                              <div className="text-xs font-bold text-brown whitespace-nowrap">
                                📦 الصندوق: <span className="font-mono text-gold-dark">{p.pricePerBox}</span> ر.س
                              </div>
                            ) : null}
                            {!p.pricePerKilo && !p.pricePerBox && (
                              <span className="text-xs font-mono font-bold text-brown">
                                {p.price ? `${p.price} ر.س` : "حسب الطلب"}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={async () => {
                              await updateProduct(p.id, { isFeatured: !p.isFeatured });
                              showNotification("تم تحديث حالة الصنف المميز في السحابة");
                            }}
                            className={`p-1.5 rounded-lg text-xs font-bold ${
                              p.isFeatured
                                ? "bg-gold/20 text-gold-dark"
                                : "bg-beige/40 text-brown/40"
                            }`}
                          >
                            <Sparkles className="w-4 h-4 inline" />
                          </button>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={async () => {
                              await updateProduct(p.id, { isAvailable: !p.isAvailable });
                              showNotification("تم تحديث حالة توفر الصنف في السحابة");
                            }}
                            className={`px-2 py-1 rounded-md text-[11px] font-bold ${
                              p.isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {p.isAvailable ? "متاح" : "معطل"}
                          </button>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-1.5 rounded-lg hover:bg-beige/60 text-brown"
                              title="تعديل الصنف ورابط الصورة"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={async () => {
                                if (
                                  confirm(`هل أنت متأكد من حذف صنف "${p.name}"؟`)
                                ) {
                                  await deleteProduct(p.id);
                                  showNotification("تم حذف الصنف بنجاح من السحابة!");
                                }
                              }}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"
                              title="حذف الصنف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Categories */}
        {activeTab === "categories" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-beige">
              <div>
                <h2 className="text-xl font-black text-brown">إدارة التصنيفات</h2>
                <span className="text-xs text-brown/60">
                  إضافة وتعديل أقسام الكتالوج لتنظيم عرض المنتجات
                </span>
              </div>
              <button
                onClick={() => setIsAddingCategory(true)}
                className="bg-gold hover:bg-gold-light text-brown-dark font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة تصنيف</span>
              </button>
            </div>

            {isAddingCategory && (
              <div className="p-5 rounded-2xl bg-cream-light border border-gold/40 space-y-3">
                <h3 className="font-bold text-sm text-brown">تصنيف جديد:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="اسم التصنيف (مثال: بسبوسيات)"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    className="p-2.5 text-xs rounded-xl border border-beige bg-white"
                  />
                  <input
                    type="text"
                    placeholder="المعرف الإنجليزي (slug)"
                    value={newCategory.slug}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, slug: e.target.value })
                    }
                    className="p-2.5 text-xs rounded-xl border border-beige bg-white"
                  />
                  <input
                    type="text"
                    placeholder="وصف مختصر للتصنيف"
                    value={newCategory.description}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                    }
                    className="p-2.5 text-xs rounded-xl border border-beige bg-white"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={async () => {
                      if (!newCategory.name.trim()) return;
                      await addCategory({
                        ...newCategory,
                        slug:
                          newCategory.slug.trim() ||
                          "cat_" + Date.now(),
                      });
                      setIsAddingCategory(false);
                      showNotification("تمت إضافة التصنيف بنجاح في السحابة!");
                    }}
                    className="bg-brown text-cream-light font-bold px-4 py-2 rounded-xl text-xs"
                  >
                    حفظ
                  </button>
                  <button
                    onClick={() => setIsAddingCategory(false)}
                    className="text-xs text-brown/60 hover:text-brown"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.id).length;
                return (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-cream/40 border border-beige flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-brown">{c.name}</h4>
                      <span className="text-[11px] text-brown/60 block">
                        {count} أصناف مسجلة
                      </span>
                    </div>
                    <button
                      onClick={async () => {
                        if (
                          confirm(`هل تريد بالتأكيد حذف تصنيف "${c.name}"؟`)
                        ) {
                          await deleteCategory(c.id);
                          showNotification("تم حذف التصنيف بنجاح من السحابة!");
                        }
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Site Settings */}
        {activeTab === "settings" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige shadow-sm space-y-6">
            <div className="pb-4 border-b border-beige">
              <h2 className="text-xl font-black text-brown">إعدادات الموقع والهوية</h2>
              <span className="text-xs text-brown/60">
                تعديل نصوص الصفحة الرئيسية، أوقات وزمن العمل، أرقام التواصل، رابط واتساب، والشريط الإعلاني
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Working Hours & Store Schedule */}
              <div className="space-y-4 p-5 rounded-2xl bg-cream/30 border border-beige">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-brown flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    <span>أوقات وزمن العمل المعتمد</span>
                  </h3>
                  <span className="text-[10px] text-gold-dark font-bold bg-gold/15 px-2.5 py-0.5 rounded-full">
                    مباشر في الموقع
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brown block">
                    نص ساعات العمل المعتمدة (يظهر في أسفل الموقع وصفحة التواصل):
                  </label>
                  <input
                    type="text"
                    value={localSettings.workingHours || ""}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        workingHours: e.target.value,
                      })
                    }
                    placeholder="مثال: يومياً من 9:00 صباحاً حتى 11:30 مساءً"
                    className="w-full text-xs p-3 rounded-xl border border-beige bg-white font-medium focus:border-gold focus:outline-none"
                  />
                </div>

                {/* Quick Presets */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-brown/70 block">
                    نماذج جاهزة للاختيار السريع:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "يومياً من 9:00 صباحاً حتى 11:30 مساءً",
                      "فترتين: 9:00 ص - 1:00 م | 4:30 م - 11:30 م",
                      "طوال أيام الأسبوع من 10:00 ص حتى 12:00 منتصف الليل",
                      "أوقات رمضان: يومياً بعد صلاة العصر حتى 2:00 فجراً",
                      "يومياً من 8:00 ص حتى 11:00 م (الجمعة من 1:00 م)",
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() =>
                          setLocalSettings({
                            ...localSettings,
                            workingHours: preset,
                          })
                        }
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-white hover:bg-gold/10 hover:border-gold border border-beige text-brown/80 transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Preview */}
                <div className="p-3 bg-white/80 rounded-xl border border-gold/30 space-y-1">
                  <span className="text-[10px] text-brown/60 block font-bold">
                    معاينة شكل الظهور للعملاء:
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold text-brown">
                    <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{localSettings.workingHours || "لم يتم تحديد وقت العمل بعد"}</span>
                  </div>
                </div>
              </div>

              {/* Phones & WhatsApp */}
              <div className="space-y-4 p-5 rounded-2xl bg-cream/30 border border-beige">
                <h3 className="font-extrabold text-sm text-brown flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>أرقام التواصل وواتساب المعتمدة</span>
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown block">
                    الهاتف المعتمد الأول:
                  </label>
                  <input
                    type="text"
                    value={localSettings.primaryPhone}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        primaryPhone: e.target.value,
                      })
                    }
                    className="w-full text-xs p-3 rounded-xl border border-beige bg-white font-mono"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown block">
                    الهاتف المعتمد الثاني:
                  </label>
                  <input
                    type="text"
                    value={localSettings.secondaryPhone}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        secondaryPhone: e.target.value,
                      })
                    }
                    className="w-full text-xs p-3 rounded-xl border border-beige bg-white font-mono"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown block">
                    رقم واتساب المباشر للطلبات (مع الرمز الدولي):
                  </label>
                  <input
                    type="text"
                    value={localSettings.primaryWhatsapp}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        primaryWhatsapp: e.target.value,
                      })
                    }
                    className="w-full text-xs p-3 rounded-xl border border-beige bg-white font-mono"
                    dir="ltr"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brown block">
                      عنوان وموقع المحل:
                    </label>
                    <input
                      type="text"
                      value={localSettings.address || ""}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          address: e.target.value,
                        })
                      }
                      placeholder="المملكة العربية السعودية"
                      className="w-full text-xs p-3 rounded-xl border border-beige bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brown block">
                      رابط الخريطة / جوجل ماب:
                    </label>
                    <input
                      type="text"
                      value={localSettings.mapUrl}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          mapUrl: e.target.value,
                        })
                      }
                      className="w-full text-xs p-3 rounded-xl border border-beige bg-white font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Announcement Bar */}
              <div className="md:col-span-2 space-y-4 p-5 rounded-2xl bg-cream/30 border border-beige">
                <h3 className="font-extrabold text-sm text-brown flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>الشريط الإعلاني العلوي</span>
                </h3>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-brown">
                  <input
                    type="checkbox"
                    checked={localSettings.announcement.enabled}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        announcement: {
                          ...localSettings.announcement,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-gold focus:ring-gold"
                  />
                  <span>تفعيل ظهور الشريط الإعلاني في أعلى الموقع</span>
                </label>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown block">
                    نص الإعلان أو العرض:
                  </label>
                  <textarea
                    rows={3}
                    value={localSettings.announcement.text}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        announcement: {
                          ...localSettings.announcement,
                          text: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs p-3 rounded-xl border border-beige bg-white leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="p-5 rounded-2xl bg-cream/30 border border-beige space-y-4">
              <h3 className="font-extrabold text-sm text-brown">
                نصوص الواجهة الرئيسية (Hero Section)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown block">
                    النص التمهيدي الصغير (Eyebrow):
                  </label>
                  <input
                    type="text"
                    value={localSettings.heroEyebrow}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        heroEyebrow: e.target.value,
                      })
                    }
                    className="w-full text-xs p-3 rounded-xl border border-beige bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown block">
                    العنوان الرئيسي:
                  </label>
                  <input
                    type="text"
                    value={localSettings.heroTitle}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        heroTitle: e.target.value,
                      })
                    }
                    className="w-full text-xs p-3 rounded-xl border border-beige bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brown block">
                  الشعار الفرعي:
                </label>
                <input
                  type="text"
                  value={localSettings.heroSubtitle}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      heroSubtitle: e.target.value,
                    })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-beige bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brown block">
                  الوصف الترحيبي:
                </label>
                <textarea
                  rows={2}
                  value={localSettings.heroDescription}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      heroDescription: e.target.value,
                    })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-beige bg-white leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={async () => {
                  const ok = await updateSettings(localSettings);
                  if (ok) {
                    showNotification("تم حفظ جميع إعدادات الموقع وتحديثها في السحابة بنجاح!");
                  } else {
                    showNotification("تم حفظ الإعدادات محلياً، تعذر الحفظ السحابي");
                  }
                }}
                className="bg-brown hover:bg-brown-dark text-cream-light font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <Save className="w-4 h-4 text-gold" />
                <span>حفظ التعديلات في الموقع</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Inquiries & Orders Log */}
        {activeTab === "inquiries" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-beige">
              <div>
                <h2 className="text-xl font-black text-brown">
                  سجل الطلبات والاستفسارات
                </h2>
                <span className="text-xs text-brown/60">
                  كافة الطلبات المسجلة من سلة المشتريات ونموذج التواصل
                </span>
              </div>
              <span className="text-xs font-bold text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
                {inquiries.length} طلب مسجل
              </span>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-12 text-center text-brown/60 space-y-2">
                <Mail className="w-10 h-10 mx-auto text-gold-dark" />
                <p className="font-bold text-base text-brown">
                  لا توجد طلبات أو استفسارات حتى الآن
                </p>
                <p className="text-xs">
                  عند قيام العملاء بإرسال استفسار أو إتمام طلب من السلة، ستظهر التفاصيل هنا.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl bg-cream/40 border border-beige space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-beige pb-2.5">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-sm text-brown">
                          {inq.name}
                        </span>
                        <a
                          href={`tel:${inq.phone}`}
                          className="font-mono text-xs text-gold-dark font-bold hover:underline"
                          dir="ltr"
                        >
                          {inq.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-brown/50">
                          {new Date(inq.createdAt).toLocaleString("ar-SA")}
                        </span>
                        <select
                          value={inq.status}
                          onChange={(e) => {
                            updateInquiryStatus(
                              inq.id,
                              e.target.value as Inquiry["status"]
                            );
                            showNotification("تم تحديث حالة الطلب");
                          }}
                          className={`text-[11px] font-bold px-2 py-1 rounded-md border cursor-pointer ${
                            inq.status === "new"
                              ? "bg-amber-100 text-amber-800 border-amber-300"
                              : inq.status === "contacted"
                              ? "bg-blue-100 text-blue-800 border-blue-300"
                              : "bg-green-100 text-green-800 border-green-300"
                          }`}
                        >
                          <option value="new">جديد</option>
                          <option value="contacted">تم التواصل</option>
                          <option value="completed">مكتمل</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs text-brown/80 leading-relaxed bg-white p-3 rounded-xl border border-beige/60">
                      <span className="text-gold-dark font-bold block mb-1">
                        {inq.occasionType || "طلب"}:
                      </span>
                      {inq.message}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#25D366] px-3 py-1.5 rounded-lg hover:bg-[#20ba59]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>محادثة العميل عبر واتساب</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 6: Backup / Restore / Reset */}
        {activeTab === "backup" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige shadow-sm space-y-6">
            <div className="pb-4 border-b border-beige">
              <h2 className="text-xl font-black text-brown">
                النسخ الاحتياطي وإعادة الضبط
              </h2>
              <span className="text-xs text-brown/60">
                تصدير كافة بيانات الموقع أو استعادتها بملف JSON، أو إعادة الضبط للبيانات الأولية
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Export */}
              <div className="p-6 rounded-2xl bg-cream/40 border border-beige space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-brown">تصدير البيانات</h3>
                  <p className="text-xs text-brown/60 leading-relaxed">
                    تحميل نسخة احتياطية كاملة تشمل المنتجات، التصنيفات، والإعدادات.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const data = exportDataJSON();
                    const blob = new Blob([data], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `habat-alshahd-backup-${Date.now()}.json`;
                    a.click();
                    showNotification("تم تنزيل النسخة الاحتياطية بنجاح!");
                  }}
                  className="w-full bg-brown hover:bg-brown-dark text-cream-light font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-gold" />
                  <span>تنزيل ملف JSON</span>
                </button>
              </div>

              {/* Import */}
              <div className="p-6 rounded-2xl bg-cream/40 border border-beige space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-brown">استيراد بيانات</h3>
                  <p className="text-xs text-brown/60 leading-relaxed">
                    استرجاع بيانات سابقة من ملف JSON تم تصديره مسبقاً.
                  </p>
                </div>
                <label className="w-full bg-gold hover:bg-gold-light text-brown-dark font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                  <Upload className="w-4 h-4" />
                  <span>اختر ملف JSON للاستيراد</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const content = event.target?.result as string;
                        const success = importDataJSON(content);
                        if (success) {
                          showNotification("تم استيراد البيانات وتحديث الموقع بنجاح!");
                        } else {
                          alert("فشل استيراد الملف، تأكد من صحة تنسيق JSON.");
                        }
                      };
                      reader.readAsText(file);
                    }}
                  />
                </label>
              </div>

              {/* Reset to defaults */}
              <div className="p-6 rounded-2xl bg-red-50 border border-red-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-red-900">
                    إعادة ضبط المصنع
                  </h3>
                  <p className="text-xs text-red-700 leading-relaxed">
                    استرجاع القائمة الأولية الأصلية المعتمدة من الموقع والمنيو الأصليين.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "هل أنت متأكد من رغبتك في إعادة ضبط كافة البيانات إلى الحالة الافتراضية؟"
                      )
                    ) {
                      resetToDefaults();
                      showNotification("تمت استعادة البيانات الافتراضية بنجاح!");
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة الضبط للحالة الأصلية</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
