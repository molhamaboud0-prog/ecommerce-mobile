export type ProductVariant = {
  id: string;
  label: string;
  value: string;
};

export type Product = {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  images: string[];
  categoryId: string;
  tags: string[];
  features: string[];
  featuresAr: string[];
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
  inStock: boolean;
};

export type Category = {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  image: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
};

export type OrderStatus = 'processing' | 'shipping' | 'delivered';

export type OrderStatusEntry = {
  status: OrderStatus;
  date: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  statusHistory: OrderStatusEntry[];
  notes?: string;
};

export type ContactInfo = {
  phone: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
  };
};

export type AboutStat = {
  value: string;
  label: string;
  labelAr: string;
};

export type AboutValueIcon = 'award' | 'truck' | 'shield' | 'headphones';

export type AboutValue = {
  icon: AboutValueIcon;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
};

export type AboutContent = {
  title: string;
  titleAr: string;
  tagline: string;
  taglineAr: string;
  since: string;
  sinceAr: string;
  mission: string;
  missionAr: string;
  paragraphs: string[];
  paragraphsAr: string[];
  stats: AboutStat[];
  values: AboutValue[];
};
