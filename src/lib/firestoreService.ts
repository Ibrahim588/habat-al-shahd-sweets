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
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.warn("Firestore product save failed:", error);
    return false;
  }
}

export async function deleteProductFromFirestore(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
    return true;
  } catch (error) {
    console.warn("Firestore product delete failed:", error);
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
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.warn("Firestore category save failed:", error);
    return false;
  }
}

export async function deleteCategoryFromFirestore(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
    return true;
  } catch (error) {
    console.warn("Firestore category delete failed:", error);
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
    await setDoc(docRef, settings, { merge: true });
    return true;
  } catch (error) {
    console.warn("Firestore settings save failed:", error);
    return false;
  }
}

// ==========================================
// INQUIRIES
// ==========================================

export async function saveInquiryToFirestore(inquiry: Inquiry): Promise<boolean> {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, inquiry.id);
    await setDoc(docRef, inquiry);
    return true;
  } catch (error) {
    console.warn("Firestore inquiry save failed:", error);
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
// SEED / SYNC INITIAL DATA TO FIRESTORE
// ==========================================

export async function syncInitialDataToFirestore(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // 1. Upload initial categories
    for (const cat of initialCategories) {
      await saveCategoryToFirestore(cat);
    }

    // 2. Upload initial products
    for (const prod of initialProducts) {
      await saveProductToFirestore(prod);
    }

    // 3. Upload initial site settings
    await saveSettingsToFirestore(initialSiteSettings);

    return {
      success: true,
      message: `تم رفع ${initialProducts.length} صنف و ${initialCategories.length} تصنيفات وإعدادات الموقع إلى Firebase Firestore بنجاح!`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `تعذر الرفع إلى Firestore: ${error?.message || "خطأ غير معروف"}`,
    };
  }
}
