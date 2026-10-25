"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Category, SiteSettings, Inquiry } from "@/types";
import {
  initialProducts,
  initialCategories,
  initialSiteSettings,
} from "@/data/initialData";

interface StoreContextType {
  products: Product[];
  categories: Category[];
  settings: SiteSettings;
  inquiries: Inquiry[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt" | "status">) => void;
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => void;
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const p = localStorage.getItem("habat_alshahd_products");
        if (p) {
          const parsed = JSON.parse(p) as Product[];
          const existingIds = new Set(parsed.map((item) => item.id));
          const missing = initialProducts.filter((item) => !existingIds.has(item.id));
          if (missing.length > 0) {
            return [...parsed, ...missing];
          }
          return parsed;
        }
      } catch (e) {
        console.error("Failed to load products from localStorage", e);
      }
    }
    return initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const c = localStorage.getItem("habat_alshahd_categories");
        if (c) {
          const parsed = JSON.parse(c) as Category[];
          const existingIds = new Set(parsed.map((cat) => cat.id));
          const missing = initialCategories.filter((cat) => !existingIds.has(cat.id));
          if (missing.length > 0) {
            return [...parsed, ...missing];
          }
          return parsed;
        }
      } catch (e) {
        console.error("Failed to load categories from localStorage", e);
      }
    }
    return initialCategories;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window !== "undefined") {
      try {
        const s = localStorage.getItem("habat_alshahd_settings");
        if (s) return JSON.parse(s);
      } catch (e) {
        console.error("Failed to load settings from localStorage", e);
      }
    }
    return initialSiteSettings;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const inq = localStorage.getItem("habat_alshahd_inquiries");
        if (inq) return JSON.parse(inq);
      } catch (e) {
        console.error("Failed to load inquiries from localStorage", e);
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("habat_alshahd_products", JSON.stringify(products));
      localStorage.setItem("habat_alshahd_categories", JSON.stringify(categories));
      localStorage.setItem("habat_alshahd_settings", JSON.stringify(settings));
      localStorage.setItem("habat_alshahd_inquiries", JSON.stringify(inquiries));
    } catch (e) {
      console.error("Failed to save store to localStorage", e);
    }
  }, [products, categories, settings, inquiries]);

  const addProduct = (prodData: Omit<Product, "id">) => {
    const newId = "prod_" + Date.now();
    const newProduct: Product = { ...prodData, id: newId };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const addCategory = (catData: Omit<Category, "id">) => {
    const newId = "cat_" + Date.now();
    setCategories((prev) => [...prev, { ...catData, id: newId }]);
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addInquiry = (inquiryData: Omit<Inquiry, "id" | "createdAt" | "status">) => {
    const newInq: Inquiry = {
      ...inquiryData,
      id: "inq_" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    setInquiries((prev) => [newInq, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const resetToDefaults = () => {
    setProducts(initialProducts);
    setCategories(initialCategories);
    setSettings(initialSiteSettings);
    localStorage.removeItem("habat_alshahd_products");
    localStorage.removeItem("habat_alshahd_categories");
    localStorage.removeItem("habat_alshahd_settings");
  };

  const exportDataJSON = () => {
    return JSON.stringify({ products, categories, settings, inquiries }, null, 2);
  };

  const importDataJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.categories) setCategories(parsed.categories);
      if (parsed.settings) setSettings(parsed.settings);
      if (parsed.inquiries) setInquiries(parsed.inquiries);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        settings,
        inquiries,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSettings,
        addInquiry,
        updateInquiryStatus,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
