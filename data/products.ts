import type { Product } from './types';
import { categories } from './categories';
import { getProductImages } from './productImages';

const TAGS = ['sale', 'new', 'trending', 'bestseller', 'limited', 'eco'];
const FEATURES_EN = [
  'Premium quality materials',
  'Fast shipping available',
  '1-year warranty included',
  'Eco-friendly packaging',
];
const FEATURES_AR = [
  'مواد عالية الجودة',
  'شحن سريع متاح',
  'ضمان سنة واحدة',
  'تغليف صديق للبيئة',
];

const PRODUCT_NAMES = [
  { en: 'Wireless Headphones', ar: 'سماعات لاسلكية' },
  { en: 'Smart Watch Pro', ar: 'ساعة ذكية برو' },
  { en: 'Running Shoes', ar: 'حذاء رياضي' },
  { en: 'Leather Jacket', ar: 'جاكيت جلد' },
  { en: 'Coffee Maker', ar: 'ماكينة قهوة' },
  { en: 'Yoga Mat', ar: 'سجادة يوغا' },
  { en: 'Face Serum', ar: 'سيروم للوجه' },
  { en: 'Novel Collection', ar: 'مجموعة روايات' },
  { en: 'Bluetooth Speaker', ar: 'مكبر صوت بلوتوث' },
  { en: 'Denim Jeans', ar: 'بنطال جينز' },
];

function buildProduct(index: number): Product {
  const category = categories[index % categories.length]!;
  const nameSet = PRODUCT_NAMES[index % PRODUCT_NAMES.length]!;
  const basePrice = 20 + (index % 15) * 10;
  const onSale = index % 4 === 0;
  const tagCount = 1 + (index % 3);
  const productTags = TAGS.slice(0, tagCount);

  return {
    id: `prod-${String(index + 1).padStart(3, '0')}`,
    title: `${nameSet.en} ${index + 1}`,
    titleAr: `${nameSet.ar} ${index + 1}`,
    description: `High-quality ${nameSet.en.toLowerCase()} perfect for everyday use. Durable and stylish.`,
    descriptionAr: `${nameSet.ar} عالي الجودة مثالي للاستخدام اليومي. متين وأنيق.`,
    price: onSale ? Math.round(basePrice * 0.7) : basePrice,
    originalPrice: onSale ? basePrice : undefined,
    images: getProductImages(category.id, index),
    categoryId: category.id,
    tags: productTags,
    features: FEATURES_EN,
    featuresAr: FEATURES_AR,
    rating: 3.5 + (index % 15) / 10,
    reviewCount: 10 + index * 3,
    inStock: index % 7 !== 0,
  };
}

export const products: Product[] = Array.from({ length: 54 }, (_, i) => buildProduct(i));

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter((p) => p.tags.includes(tag));
}

export function getFeaturedProducts(limit = 10): Product[] {
  return products.filter((p) => p.tags.includes('trending')).slice(0, limit);
}

export function getNewArrivals(limit = 10): Product[] {
  return products.filter((p) => p.tags.includes('new')).slice(0, limit);
}
