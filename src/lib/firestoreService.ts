import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { Product, Category, SiteSettings, Inquiry } from "@/types";
import {
  initialProducts,
  initialCategories,
  initialSiteSettings,
} from "@/data/initialData";

const PRODUCTS_COLLECTION = "products";
const CATEGORIES_COLLECTION = "categories";
const SETTINGS_COLLECTION = "settings";
const SETTINGS_DOC_ID = "site";
const INQUIRIES_COLLECTION = "inquiries";

// Helper to remove any undefined fields before sending to Firestore
// Firestore crashes if any document field is undefined
export function sanitizeForFirestore<T extends Record<string, any>>(data: T): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      result[key] = sanitizeForFirestore(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

// ==========================================
// PRODUCTS
// ==========================================

export async function fetchProductsFromFirestore(): Promise<Product[] | null> {
  try {
    const snap = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (snap.empty) return null;
    const items: Product[] = [];
    snap.forEach((d) => {
      items.push({ id: d.id, ...d.data() } as Product);
    });
    return items;
  } catch (error) {
    console.warn("Firestore products fetch failed, falling back to local:", error);
    return null;
  }
}

export async function saveProductToFirestore(product: Product): Promise<boolean> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
    const { id, ...data } = product;
    const cleanData = sanitizeForFirestore(data);
    await setDoc(docRef, cleanData, { merge: true });
    return true;
  } catch (error) {
    console.error("Firestore product save failed:", error);
    return false;
  }
}

export async function deleteProductFromFirestore(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error("Firestore product delete failed:", error);
    return false;
  }
}

// ==========================================
// CATEGORIES
// ==========================================

export async function fetchCategoriesFromFirestore(): Promise<Category[] | null> {
  try {
    const snap = await getDocs(collection(db, CATEGORIES_COLLECTION));
    if (snap.empty) return null;
    const items: Category[] = [];
    snap.forEach((d) => {
      items.push({ id: d.id, ...d.data() } as Category);
    });
    return items;
  } catch (error) {
    console.warn("Firestore categories fetch failed, falling back to local:", error);
    return null;
  }
}

export async function saveCategoryToFirestore(category: Category): Promise<boolean> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, category.id);
    const { id, ...data } = category;
    const cleanData = sanitizeForFirestore(data);
    await setDoc(docRef, cleanData, { merge: true });
    return true;
  } catch (error) {
    console.error("Firestore category save failed:", error);
    return false;
  }
}

export async function deleteCategoryFromFirestore(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
    return true;
  } catch (error) {
    console.error("Firestore category delete failed:", error);
    return false;
  }
}

// ==========================================
// SETTINGS
// ==========================================

export async function fetchSettingsFromFirestore(): Promise<SiteSettings | null> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return snap.data() as SiteSettings;
  } catch (error) {
    console.warn("Firestore settings fetch failed, falling back to local:", error);
    return null;
  }
}

export async function saveSettingsToFirestore(settings: SiteSettings): Promise<boolean> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const cleanData = sanitizeForFirestore(settings);
    await setDoc(docRef, cleanData, { merge: true });
    return true;
  } catch (error) {
    console.error("Firestore settings save failed:", error);
    return false;
  }
}

// ==========================================
// INQUIRIES
// ==========================================

export async function saveInquiryToFirestore(inquiry: Inquiry): Promise<boolean> {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, inquiry.id);
    const cleanData = sanitizeForFirestore(inquiry);
    await setDoc(docRef, cleanData);
    return true;
  } catch (error) {
    console.error("Firestore inquiry save failed:", error);
    return false;
  }
}

// ==========================================
// REAL-TIME LISTENERS
// ==========================================

export function subscribeToProducts(
  onUpdate: (products: Product[]) => void,
  onError?: (error: Error) => void
) {
  try {
    return onSnapshot(
      collection(db, PRODUCTS_COLLECTION),
      (snap) => {
        if (!snap.empty) {
          const items: Product[] = [];
          snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Product));
          onUpdate(items);
        }
      },
      (err) => {
        console.warn("Firestore products listener error:", err);
        if (onError) onError(err);
      }
    );
  } catch (e) {
    console.warn("Failed to subscribe to products:", e);
    return () => {};
  }
}

export function subscribeToCategories(
  onUpdate: (categories: Category[]) => void,
  onError?: (error: Error) => void
) {
  try {
    return onSnapshot(
      collection(db, CATEGORIES_COLLECTION),
      (snap) => {
        if (!snap.empty) {
          const items: Category[] = [];
          snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Category));
          onUpdate(items);
        }
      },
      (err) => {
        console.warn("Firestore categories listener error:", err);
        if (onError) onError(err);
      }
    );
  } catch (e) {
    console.warn("Failed to subscribe to categories:", e);
    return () => {};
  }
}

export function subscribeToSettings(
  onUpdate: (settings: SiteSettings) => void,
  onError?: (error: Error) => void
) {
  try {
    return onSnapshot(
      doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID),
      (snap) => {
        if (snap.exists()) {
          onUpdate(snap.data() as SiteSettings);
        }
      },
      (err) => {
        console.warn("Firestore settings listener error:", err);
        if (onError) onError(err);
      }
    );
  } catch (e) {
    console.warn("Failed to subscribe to settings:", e);
    return () => {};
  }
}

// ==========================================
// SEED / SYNC STORE DATA TO FIRESTORE
// ==========================================

export async function syncStoreDataToFirestore(
  productsToSync: Product[] = initialProducts,
  categoriesToSync: Category[] = initialCategories,
  settingsToSync: SiteSettings = initialSiteSettings
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    for (const cat of categoriesToSync) {
      await saveCategoryToFirestore(cat);
    }

    for (const prod of productsToSync) {
      await saveProductToFirestore(prod);
    }

    await saveSettingsToFirestore(settingsToSync);

    return {
      success: true,
      message: `تم رفع ومزامنة ${productsToSync.length} صنف و ${categoriesToSync.length} تصنيفات وإعدادات الموقع بنجاح إلى Firebase Firestore!`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `تعذر الرفع إلى Firestore: ${error?.message || "خطأ غير معروف"}`,
    };
  }
}

export async function syncInitialDataToFirestore(): Promise<{
  success: boolean;
  message: string;
}> {
  return syncStoreDataToFirestore(initialProducts, initialCategories, initialSiteSettings);
}
