export interface Product {
  id: string;
  name: string;
  category: string;
  price?: number;
  pricePerKilo?: number;
  pricePerBox?: number;
  unit: string;
  description: string;
  image: string;
  isFeatured: boolean;
  isAvailable: boolean;
  tags?: string[];
  options?: {
    name: string;
    choices: string[];
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface SiteSettings {
  siteName: string;
  slogan: string;
  description: string;
  primaryPhone: string;
  secondaryPhone: string;
  primaryWhatsapp: string;
  secondaryWhatsapp: string;
  address: string;
  mapUrl: string;
  workingHours: string;
  announcement: {
    enabled: boolean;
    text: string;
    link?: string;
  };
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  storyTitle: string;
  storyContent: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price?: number;
  quantity: number;
  selectedOption?: string;
  notes?: string;
  image: string;
  unit: string;
}

export interface Inquiry {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  occasionType?: string;
  message: string;
  status: "new" | "contacted" | "completed";
}
