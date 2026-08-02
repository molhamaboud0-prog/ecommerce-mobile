import type { Product } from './types';
import { getProductImagesByKey } from './productImages';

const TAGS = ['sale', 'new', 'trending', 'bestseller', 'limited', 'eco'] as const;

type CatalogItem = {
  visualKey: string;
  categoryId: string;
  en: string;
  ar: string;
  descEn: string;
  descAr: string;
  featuresEn: string[];
  featuresAr: string[];
  basePrice: number;
};

/** Grocery catalog — each item matches a food photo via visualKey */
const CATALOG: CatalogItem[] = [
  // Fruits
  {
    visualKey: 'apples',
    categoryId: 'cat-fruits',
    en: 'Fresh Red Apples',
    ar: 'تفاح أحمر طازج',
    descEn: 'Crisp sweet red apples, perfect for snacking or juice. Sold by the kilo.',
    descAr: 'تفاح أحمر مقرمش وحلو، مثالي للأكل أو العصير. يباع بالكيلو.',
    featuresEn: ['1 kg pack', 'Farm fresh', 'Rich in fiber'],
    featuresAr: ['عبوة 1 كغ', 'طازج من المزرعة', 'غني بالألياف'],
    basePrice: 3.5,
  },
  {
    visualKey: 'bananas',
    categoryId: 'cat-fruits',
    en: 'Ripe Bananas',
    ar: 'موز ناضج',
    descEn: 'Naturally sweet ripe bananas, great for breakfast and smoothies.',
    descAr: 'موز ناضج حلو طبيعياً، ممتاز للفطور والعصائر.',
    featuresEn: ['1 kg bunch', 'Ready to eat', 'High potassium'],
    featuresAr: ['ربطة 1 كغ', 'جاهز للأكل', 'غني بالبوتاسيوم'],
    basePrice: 2.2,
  },
  {
    visualKey: 'oranges',
    categoryId: 'cat-fruits',
    en: 'Juicy Oranges',
    ar: 'برتقال عصيري',
    descEn: 'Bright citrus oranges packed with vitamin C for fresh juice.',
    descAr: 'برتقال حمضي غني بفيتامين C مثالي للعصير الطازج.',
    featuresEn: ['1 kg pack', 'Seedless option', 'Vitamin C rich'],
    featuresAr: ['عبوة 1 كغ', 'خيار بدون بذور', 'غني بفيتامين C'],
    basePrice: 2.8,
  },
  {
    visualKey: 'strawberries',
    categoryId: 'cat-fruits',
    en: 'Fresh Strawberries',
    ar: 'فراولة طازجة',
    descEn: 'Sweet strawberries in a chilled punnet, ideal for desserts.',
    descAr: 'فراولة حلوة في علبة مبرّدة، مثالية للحلويات.',
    featuresEn: ['250 g punnet', 'Chilled', 'No preservatives'],
    featuresAr: ['علبة 250 غ', 'مبرّدة', 'بدون مواد حافظة'],
    basePrice: 4.5,
  },
  {
    visualKey: 'grapes',
    categoryId: 'cat-fruits',
    en: 'Seedless Grapes',
    ar: 'عنب بدون بذور',
    descEn: 'Juicy seedless grapes, washed and ready for the table.',
    descAr: 'عنب عصيري بدون بذور، مغسول وجاهز للمائدة.',
    featuresEn: ['500 g pack', 'Seedless', 'Sweet variety'],
    featuresAr: ['عبوة 500 غ', 'بدون بذور', 'صنف حلو'],
    basePrice: 5.9,
  },
  {
    visualKey: 'mango',
    categoryId: 'cat-fruits',
    en: 'Tropical Mango',
    ar: 'مانجو استوائية',
    descEn: 'Ripe tropical mango with fragrant flesh and natural sweetness.',
    descAr: 'مانجو استوائية ناضجة بلحم عطري وحلاوة طبيعية.',
    featuresEn: ['Per piece', 'Tree ripened', 'Aromatic'],
    featuresAr: ['بالحبة', 'ناضجة على الشجرة', 'عطرية'],
    basePrice: 3.0,
  },

  // Vegetables
  {
    visualKey: 'tomatoes',
    categoryId: 'cat-vegetables',
    en: 'Vine Tomatoes',
    ar: 'طماطم على الغصن',
    descEn: 'Firm vine tomatoes with rich flavor for salads and cooking.',
    descAr: 'طماطم متماسكة على الغصن بنكهة غنية للسلطات والطبخ.',
    featuresEn: ['1 kg pack', 'Vine ripened', 'Salad ready'],
    featuresAr: ['عبوة 1 كغ', 'ناضجة على الغصن', 'جاهزة للسلطة'],
    basePrice: 2.4,
  },
  {
    visualKey: 'cucumbers',
    categoryId: 'cat-vegetables',
    en: 'Fresh Cucumbers',
    ar: 'خيار طازج',
    descEn: 'Crisp green cucumbers, refreshing and low in calories.',
    descAr: 'خيار أخضر مقرمش، منعش وقليل السعرات.',
    featuresEn: ['500 g pack', 'Crisp texture', 'Hydrating'],
    featuresAr: ['عبوة 500 غ', 'قوام مقرمش', 'مرطّب'],
    basePrice: 1.8,
  },
  {
    visualKey: 'carrots',
    categoryId: 'cat-vegetables',
    en: 'Organic Carrots',
    ar: 'جزر عضوي',
    descEn: 'Sweet organic carrots, ideal for cooking, juice, or snacking.',
    descAr: 'جزر عضوي حلو، مثالي للطبخ أو العصير أو الوجبات الخفيفة.',
    featuresEn: ['1 kg bag', 'Organic', 'Naturally sweet'],
    featuresAr: ['كيس 1 كغ', 'عضوي', 'حلو طبيعياً'],
    basePrice: 2.1,
  },
  {
    visualKey: 'lettuce',
    categoryId: 'cat-vegetables',
    en: 'Green Lettuce',
    ar: 'خس أخضر',
    descEn: 'Fresh green lettuce head for crisp salads and wraps.',
    descAr: 'رأس خس أخضر طازج لسلطات ولفائف مقرمشة.',
    featuresEn: ['1 head', 'Washed ready', 'Crisp leaves'],
    featuresAr: ['رأس واحد', 'مغسول جاهز', 'أوراق مقرمشة'],
    basePrice: 1.5,
  },
  {
    visualKey: 'peppers',
    categoryId: 'cat-vegetables',
    en: 'Bell Peppers Mix',
    ar: 'فلفل ألوان مشكل',
    descEn: 'Colorful bell peppers mix — red, yellow, and green.',
    descAr: 'خلطة فلفل ألوان — أحمر وأصفر وأخضر.',
    featuresEn: ['500 g pack', '3 colors', 'Sweet crunch'],
    featuresAr: ['عبوة 500 غ', '3 ألوان', 'مقرمش وحلو'],
    basePrice: 3.2,
  },
  {
    visualKey: 'potatoes',
    categoryId: 'cat-vegetables',
    en: 'Baking Potatoes',
    ar: 'بطاطس للخبز',
    descEn: 'Starchy baking potatoes perfect for fries, mash, or roasting.',
    descAr: 'بطاطس نشوية مثالية للقلي أو الهريس أو التحميص.',
    featuresEn: ['2 kg bag', 'All-purpose', 'Long shelf life'],
    featuresAr: ['كيس 2 كغ', 'للاستخدام العام', 'صلاحية طويلة'],
    basePrice: 2.6,
  },

  // Dairy
  {
    visualKey: 'milk',
    categoryId: 'cat-dairy',
    en: 'Fresh Full Cream Milk',
    ar: 'حليب كامل الدسم طازج',
    descEn: 'Pasteurized full cream milk in a chilled carton.',
    descAr: 'حليب كامل الدسم مبستر في عبوة مبرّدة.',
    featuresEn: ['1 liter', 'Full cream', 'Keep refrigerated'],
    featuresAr: ['1 لتر', 'كامل الدسم', 'يحفظ مبرّداً'],
    basePrice: 1.9,
  },
  {
    visualKey: 'cheese',
    categoryId: 'cat-dairy',
    en: 'Cheddar Cheese Block',
    ar: 'جبنة شيدر قالب',
    descEn: 'Aged cheddar block for sandwiches, pasta, and snacks.',
    descAr: 'قالب شيدر معتق للسندويشات والمعكرونة والسناك.',
    featuresEn: ['200 g block', 'Aged flavor', 'Easy to slice'],
    featuresAr: ['قالب 200 غ', 'نكهة معتقة', 'سهل التقطيع'],
    basePrice: 4.8,
  },
  {
    visualKey: 'yogurt',
    categoryId: 'cat-dairy',
    en: 'Natural Yogurt',
    ar: 'لبن زبادي طبيعي',
    descEn: 'Creamy natural yogurt with live cultures, no added sugar.',
    descAr: 'زبادي طبيعي كريمي ببكتيريا حية، بدون سكر مضاف.',
    featuresEn: ['500 g tub', 'Live cultures', 'No added sugar'],
    featuresAr: ['علبة 500 غ', 'بكتيريا حية', 'بدون سكر مضاف'],
    basePrice: 2.5,
  },
  {
    visualKey: 'eggs',
    categoryId: 'cat-dairy',
    en: 'Farm Fresh Eggs',
    ar: 'بيض طازج من المزرعة',
    descEn: 'Large farm eggs in a protective carton of twelve.',
    descAr: 'بيض مزرعة كبير في علبة حماية من 12 حبة.',
    featuresEn: ['12 eggs', 'Large size', 'Cage-free'],
    featuresAr: ['12 بيضة', 'حجم كبير', 'حر الطليق'],
    basePrice: 3.4,
  },
  {
    visualKey: 'butter',
    categoryId: 'cat-dairy',
    en: 'Creamy Butter',
    ar: 'زبدة كريمية',
    descEn: 'Smooth creamy butter for baking, cooking, and breakfast.',
    descAr: 'زبدة كريمية ناعمة للخبز والطبخ والفطور.',
    featuresEn: ['200 g pack', 'Salted', 'Baking quality'],
    featuresAr: ['عبوة 200 غ', 'مالحة', 'جودة خبز'],
    basePrice: 3.6,
  },

  // Bakery
  {
    visualKey: 'bread',
    categoryId: 'cat-bakery',
    en: 'Whole Wheat Bread',
    ar: 'خبز قمح كامل',
    descEn: 'Soft whole wheat loaf sliced and ready for toast.',
    descAr: 'رغيف قمح كامل طري ومقطّع جاهز للتحميص.',
    featuresEn: ['Sliced loaf', 'Whole grain', 'No artificial colors'],
    featuresAr: ['رغيف مقطّع', 'حبوب كاملة', 'بدون ألوان صناعية'],
    basePrice: 2.0,
  },
  {
    visualKey: 'croissant',
    categoryId: 'cat-bakery',
    en: 'Butter Croissants',
    ar: 'كرواسون بالزبدة',
    descEn: 'Flaky butter croissants, freshly baked each morning.',
    descAr: 'كرواسون مقرمش بالزبدة، يُخبز طازجاً كل صباح.',
    featuresEn: ['Pack of 4', 'Buttery layers', 'Fresh daily'],
    featuresAr: ['علبة 4 قطع', 'طبقات زبدة', 'طازج يومياً'],
    basePrice: 4.2,
  },
  {
    visualKey: 'cake',
    categoryId: 'cat-bakery',
    en: 'Chocolate Cake Slice',
    ar: 'قطعة كيك شوكولا',
    descEn: 'Moist chocolate cake slice topped with rich frosting.',
    descAr: 'قطعة كيك شوكولا رطبة بطبقة تغطية غنية.',
    featuresEn: ['1 slice', 'Cocoa rich', 'Ready to serve'],
    featuresAr: ['قطعة واحدة', 'غني بالكاكاو', 'جاهز للتقديم'],
    basePrice: 3.8,
  },
  {
    visualKey: 'cookies',
    categoryId: 'cat-bakery',
    en: 'Chocolate Chip Cookies',
    ar: 'كوكيز رقائق شوكولا',
    descEn: 'Classic chocolate chip cookies baked golden and chewy.',
    descAr: 'كوكيز كلاسيك برقائق شوكولا مخبوزة ذهبية وطرية.',
    featuresEn: ['Pack of 8', 'Chewy center', 'Real chocolate'],
    featuresAr: ['علبة 8 قطع', 'وسط طري', 'شوكولا حقيقية'],
    basePrice: 3.1,
  },
  {
    visualKey: 'baguette',
    categoryId: 'cat-bakery',
    en: 'French Baguette',
    ar: 'باغيت فرنسي',
    descEn: 'Crispy crust French baguette with soft airy crumb.',
    descAr: 'باغيت فرنسي بقشرة مقرمشة ولبّ هوائي طري.',
    featuresEn: ['1 loaf', 'Crispy crust', 'Bake fresh'],
    featuresAr: ['رغيف واحد', 'قشرة مقرمشة', 'مخبوز طازج'],
    basePrice: 1.7,
  },

  // Drinks
  {
    visualKey: 'juice',
    categoryId: 'cat-drinks',
    en: 'Orange Juice',
    ar: 'عصير برتقال',
    descEn: '100% orange juice with no added sugar, chilled bottle.',
    descAr: 'عصير برتقال 100% بدون سكر مضاف، زجاجة مبرّدة.',
    featuresEn: ['1 liter', 'No added sugar', 'Not from concentrate'],
    featuresAr: ['1 لتر', 'بدون سكر مضاف', 'ليس من مركز'],
    basePrice: 3.3,
  },
  {
    visualKey: 'coffee',
    categoryId: 'cat-drinks',
    en: 'Arabica Coffee Beans',
    ar: 'حبوب قهوة أرابيكا',
    descEn: 'Roasted Arabica beans with balanced aroma for home brewing.',
    descAr: 'حبوب أرابيكا محمّصة برائحة متوازنة للتحضير المنزلي.',
    featuresEn: ['250 g bag', 'Medium roast', 'Whole beans'],
    featuresAr: ['كيس 250 غ', 'تحميص متوسط', 'حبوب كاملة'],
    basePrice: 8.5,
  },
  {
    visualKey: 'tea',
    categoryId: 'cat-drinks',
    en: 'Black Tea Bags',
    ar: 'أكياس شاي أسود',
    descEn: 'Classic black tea bags for a strong morning cup.',
    descAr: 'أكياس شاي أسود كلاسيك لفنجان صباحي قوي.',
    featuresEn: ['25 bags', 'Strong brew', 'Foil sealed'],
    featuresAr: ['25 كيس', 'نقيع قوي', 'مغلف بورق'],
    basePrice: 2.9,
  },
  {
    visualKey: 'water',
    categoryId: 'cat-drinks',
    en: 'Still Mineral Water',
    ar: 'مياه معدنية ساكنة',
    descEn: 'Pure still mineral water in a convenient bottle pack.',
    descAr: 'مياه معدنية نقية ساكنة في عبوة عملية.',
    featuresEn: ['6 × 500 ml', 'Still water', 'Recyclable'],
    featuresAr: ['6 × 500 مل', 'مياه ساكنة', 'قابلة لإعادة التدوير'],
    basePrice: 2.3,
  },
  {
    visualKey: 'soda',
    categoryId: 'cat-drinks',
    en: 'Sparkling Soft Drink',
    ar: 'مشروب غازي',
    descEn: 'Chilled sparkling soft drink for meals and gatherings.',
    descAr: 'مشروب غازي مبرّد للوجبات والتجمعات.',
    featuresEn: ['330 ml can', 'Sparkling', 'Serve cold'],
    featuresAr: ['علبة 330 مل', 'غازي', 'يُقدَّم بارداً'],
    basePrice: 1.2,
  },

  // Meat & seafood
  {
    visualKey: 'chicken',
    categoryId: 'cat-meat',
    en: 'Fresh Chicken Breast',
    ar: 'صدر دجاج طازج',
    descEn: 'Skinless chicken breast fillets, trimmed and chilled.',
    descAr: 'شرائح صدر دجاج بدون جلد، منتقّاة ومبرّدة.',
    featuresEn: ['500 g pack', 'Skinless', 'High protein'],
    featuresAr: ['عبوة 500 غ', 'بدون جلد', 'غني بالبروتين'],
    basePrice: 6.5,
  },
  {
    visualKey: 'beef',
    categoryId: 'cat-meat',
    en: 'Premium Beef Steak',
    ar: 'ستيك لحم بقري فاخر',
    descEn: 'Premium beef steak cut, vacuum sealed for freshness.',
    descAr: 'قطعة ستيك بقري فاخرة، مفرّغة من الهواء للحفاظ على الطزاجة.',
    featuresEn: ['300 g steak', 'Vacuum sealed', 'Grill ready'],
    featuresAr: ['ستيك 300 غ', 'مفرّغ الهواء', 'جاهز للشواء'],
    basePrice: 12.0,
  },
  {
    visualKey: 'fish',
    categoryId: 'cat-meat',
    en: 'Fresh Salmon Fillet',
    ar: 'فيليه سلمون طازج',
    descEn: 'Fresh salmon fillet rich in omega-3, perfect for baking.',
    descAr: 'فيليه سلمون طازج غني بأوميغا-3، مثالي للفرن.',
    featuresEn: ['250 g fillet', 'Omega-3', 'Boneless'],
    featuresAr: ['فيليه 250 غ', 'أوميغا-3', 'بدون عظم'],
    basePrice: 9.8,
  },
  {
    visualKey: 'shrimp',
    categoryId: 'cat-meat',
    en: 'Peeled Prawns',
    ar: 'روبيان مقشّر',
    descEn: 'Peeled prawns, frozen fresh and ready for quick cooking.',
    descAr: 'روبيان مقشّر، مجمّد طازجاً وجاهز للطبخ السريع.',
    featuresEn: ['400 g pack', 'Peeled', 'Quick cook'],
    featuresAr: ['عبوة 400 غ', 'مقشّر', 'طبخ سريع'],
    basePrice: 11.5,
  },
];

function buildProduct(index: number): Product {
  const item = CATALOG[index % CATALOG.length]!;
  const onSale = index % 4 === 0;
  const tagCount = 1 + (index % 3);
  const productTags = [...TAGS.slice(0, tagCount)];
  const edition = Math.floor(index / CATALOG.length) + 1;
  const suffix = edition > 1 ? ` ${edition}` : '';

  return {
    id: `prod-${String(index + 1).padStart(3, '0')}`,
    title: `${item.en}${suffix}`,
    titleAr: `${item.ar}${suffix}`,
    description: item.descEn,
    descriptionAr: item.descAr,
    price: onSale ? Math.round(item.basePrice * 0.75 * 100) / 100 : item.basePrice,
    originalPrice: onSale ? item.basePrice : undefined,
    images: getProductImagesByKey(item.visualKey),
    categoryId: item.categoryId,
    tags: productTags,
    features: item.featuresEn,
    featuresAr: item.featuresAr,
    rating: 3.6 + (index % 14) / 10,
    reviewCount: 12 + index * 4,
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
