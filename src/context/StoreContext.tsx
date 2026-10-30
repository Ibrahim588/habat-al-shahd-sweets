"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Category, SiteSettings, Inquiry } from "@/types";
import {
  initialProducts,
  initialCategories,
  initialSiteSettings,
} from "@/data/initialData";
import {
  saveProductToFirestore,
  deleteProductFromFirestore,
  saveCategoryToFirestore,
  deleteCategoryFromFirestore,
  saveSettingsToFirestore,
  saveInquiryToFirestore,
  subscribeToProducts,
  subscribeToCategories,
  subscribeToSettings,
  syncInitialDataToFirestore,
  syncStoreDataToFirestore,
} from "@/lib/firestoreService";

interface StoreContextType {
  products: Product[];
  categories: Category[];
  settings: SiteSettings;
  inquiries: Inquiry[];
  isFirestoreConnected: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<boolean>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  addCategory: (category: Omit<Category, "id">) => Promise<boolean>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt" | "status">) => Promise<void>;
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => void;
  syncInitialData: () => Promise<{ success: boolean; message: string }>;
  syncStoreData: () => Promise<{ success: boolean; message: string }>;
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const sanitizeProductOptions = (list: Product[]): Product[] =>
  list.map((prod) => ({
    ...prod,
    options: prod.options?.filter(
      (opt) =>
        opt.name !== "الحجم / الوزن" &&
        opt.name !== "الحجم / العبوة" &&
        !opt.name.includes("الوزن") &&
        !opt.name.includes("الحجم")
    ),
  }));

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const p = localStorage.getItem("habat_alshahd_products");
        if (p) {
          const parsed = JSON.parse(p) as Product[];
          const existingIds = new Set(parsed.map((item) => item.id));
          const missing = initialProducts.filter((item) => !existingIds.has(item.id));
          const result = missing.length > 0 ? [...parsed, ...missing] : parsed;
          return sanitizeProductOptions(result);

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

  const [isFirestoreConnected, setIsFirestoreConnected] = useState(false);

  // Real-time synchronization with Cloud Firestore
  useEffect(() => {
    const unsubProducts = subscribeToProducts(
      (firestoreProducts) => {
        if (firestoreProducts && firestoreProducts.length > 0) {
          setProducts(sanitizeProductOptions(firestoreProducts));
          setIsFirestoreConnected(true);
        }
      },
      () => setIsFirestoreConnected(false)
    );

    const unsubCategories = subscribeToCategories(
      (firestoreCategories) => {
        if (firestoreCategories && firestoreCategories.length > 0) {
          setCategories(firestoreCategories);
          setIsFirestoreConnected(true);
        }
      },
      () => setIsFirestoreConnected(false)
    );

    const unsubSettings = subscribeToSettings(
      (firestoreSettings) => {
        if (firestoreSettings) {
          setSettings(firestoreSettings);
          setIsFirestoreConnected(true);
        }
      },
      () => setIsFirestoreConnected(false)
    );

    return () => {
      unsubProducts();
      unsubCategories();
      unsubSettings();
    };
  }, []);

  // Save to local cache as fallback
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

  const addProduct = async (prodData: Omit<Product, "id">): Promise<boolean> => {
    const newId = "prod_" + Date.now();
    const newProduct: Product = { ...prodData, id: newId };
    setProducts((prev) => [newProduct, ...prev]);
    return await saveProductToFirestore(newProduct);
  };

  const updateProduct = async (
    id: string,
    updatedFields: Partial<Product>
  ): Promise<boolean> => {
    // 1. Compute updated product immediately outside queued state update
    const existing = products.find((p) => p.id === id);
    const productToSave: Product = existing
      ? { ...existing, ...updatedFields }
      : ({ id, ...updatedFields } as Product);

    // 2. Update React local state
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );

    // 3. Immediately persist to Firestore
    return await saveProductToFirestore(productToSave);
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    return await deleteProductFromFirestore(id);
  };

  const addCategory = async (catData: Omit<Category, "id">): Promise<boolean> => {
    const newId = "cat_" + Date.now();
    const newCategory: Category = { ...catData, id: newId };
    setCategories((prev) => [...prev, newCategory]);
    return await saveCategoryToFirestore(newCategory);
  };

  const updateCategory = async (
    id: string,
    updatedFields: Partial<Category>
  ): Promise<boolean> => {
    // 1. Compute updated category immediately
    const existing = categories.find((c) => c.id === id);
    const categoryToSave: Category = existing
      ? { ...existing, ...updatedFields }
      : ({ id, ...updatedFields } as Category);

    // 2. Update React local state
    setCategories((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );

    // 3. Immediately persist to Firestore
    return await saveCategoryToFirestore(categoryToSave);
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
    return await deleteCategoryFromFirestore(id);
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    return await saveSettingsToFirestore(merged);
  };

  const addInquiry = async (inquiryData: Omit<Inquiry, "id" | "createdAt" | "status">) => {
    const newInq: Inquiry = {
      ...inquiryData,
      id: "inq_" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    setInquiries((prev) => [newInq, ...prev]);
    await saveInquiryToFirestore(newInq);
  };

  const updateInquiryStatus = (id: string, status: Inquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const syncStoreData = async () => {
    const toSyncProducts = products && products.length > 0 ? products : initialProducts;
    const toSyncCategories = categories && categories.length > 0 ? categories : initialCategories;
    const toSyncSettings = settings || initialSiteSettings;
    const res = await syncStoreDataToFirestore(toSyncProducts, toSyncCategories, toSyncSettings);
    if (res.success) {
      setIsFirestoreConnected(true);
    }
    return res;
  };

  const syncInitialData = syncStoreData;

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
      if (parsed.products) {
        setProducts(parsed.products);
        parsed.products.forEach((p: Product) => saveProductToFirestore(p));
      }
      if (parsed.categories) {
        setCategories(parsed.categories);
        parsed.categories.forEach((c: Category) => saveCategoryToFirestore(c));
      }
      if (parsed.settings) {
        setSettings(parsed.settings);
        saveSettingsToFirestore(parsed.settings);
      }
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
        isFirestoreConnected,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSettings,
        addInquiry,
        updateInquiryStatus,
        syncInitialData,
        syncStoreData,
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
