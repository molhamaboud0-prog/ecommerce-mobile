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

/** Each item owns matching photos via visualKey — name and image always align */
const CATALOG: CatalogItem[] = [
  // Electronics
  {
    visualKey: 'headphones',
    categoryId: 'cat-electronics',
    en: 'Wireless Headphones',
    ar: 'سماعات لاسلكية',
    descEn: 'Over-ear wireless headphones with deep bass and long battery life.',
    descAr: 'سماعات لاسلكية فوق الأذن بصوت قوي وبطارية تدوم طويلاً.',
    featuresEn: ['40h battery', 'Noise cancellation', 'Bluetooth 5.3'],
    featuresAr: ['بطارية 40 ساعة', 'عزل ضوضاء', 'بلوتوث 5.3'],
    basePrice: 129,
  },
  {
    visualKey: 'smartwatch',
    categoryId: 'cat-electronics',
    en: 'Smart Watch Pro',
    ar: 'ساعة ذكية برو',
    descEn: 'Fitness smartwatch with heart-rate tracking and bright AMOLED display.',
    descAr: 'ساعة ذكية للياقة مع قياس نبض وشاشة AMOLED ساطعة.',
    featuresEn: ['Heart-rate monitor', 'Water resistant', 'GPS'],
    featuresAr: ['قياس نبض', 'مقاومة للماء', 'GPS'],
    basePrice: 199,
  },
  {
    visualKey: 'earbuds',
    categoryId: 'cat-electronics',
    en: 'True Wireless Earbuds',
    ar: 'سماعات أذن لاسلكية',
    descEn: 'Compact earbuds with charging case and clear call quality.',
    descAr: 'سماعات أذن صغيرة مع علبة شحن وجودة مكالمات واضحة.',
    featuresEn: ['Touch controls', 'IPX5', '24h with case'],
    featuresAr: ['تحكم باللمس', 'مقاومة للماء IPX5', '24 ساعة مع العلبة'],
    basePrice: 89,
  },
  {
    visualKey: 'speaker',
    categoryId: 'cat-electronics',
    en: 'Bluetooth Speaker',
    ar: 'مكبر صوت بلوتوث',
    descEn: 'Portable Bluetooth speaker with rich stereo sound for home or outdoors.',
    descAr: 'مكبر صوت بلوتوث محمول بصوت ستيريو غني للمنزل أو الخارج.',
    featuresEn: ['360° sound', '12h playtime', 'USB-C charge'],
    featuresAr: ['صوت 360°', 'تشغيل 12 ساعة', 'شحن USB-C'],
    basePrice: 79,
  },
  {
    visualKey: 'laptop',
    categoryId: 'cat-electronics',
    en: 'Ultrabook Laptop',
    ar: 'لابتوب خفيف',
    descEn: 'Slim laptop for work and study with fast SSD storage.',
    descAr: 'لابتوب نحيف للعمل والدراسة مع تخزين SSD سريع.',
    featuresEn: ['14" display', '512GB SSD', 'All-day battery'],
    featuresAr: ['شاشة 14 إنش', 'SSD 512GB', 'بطارية طوال اليوم'],
    basePrice: 899,
  },
  {
    visualKey: 'phone',
    categoryId: 'cat-electronics',
    en: 'Smartphone',
    ar: 'هاتف ذكي',
    descEn: 'Modern smartphone with dual camera and vivid display.',
    descAr: 'هاتف ذكي حديث بكاميرا مزدوجة وشاشة نقية.',
    featuresEn: ['Dual camera', '5G ready', 'Fast charging'],
    featuresAr: ['كاميرا مزدوجة', 'يدعم 5G', 'شحن سريع'],
    basePrice: 649,
  },

  // Fashion
  {
    visualKey: 'tshirt',
    categoryId: 'cat-fashion',
    en: 'Cotton T-Shirt',
    ar: 'تيشيرت قطني',
    descEn: 'Soft everyday cotton t-shirt with a classic fit.',
    descAr: 'تيشيرت قطني ناعم بقصة كلاسيكية للاستخدام اليومي.',
    featuresEn: ['100% cotton', 'Machine washable', 'Unisex fit'],
    featuresAr: ['قطن 100%', 'قابل للغسل', 'قصة للجنسين'],
    basePrice: 29,
  },
  {
    visualKey: 'jeans',
    categoryId: 'cat-fashion',
    en: 'Denim Jeans',
    ar: 'بنطال جينز',
    descEn: 'Classic denim jeans with comfortable stretch.',
    descAr: 'بنطال جينز كلاسيكي بمرونة مريحة.',
    featuresEn: ['Stretch denim', '5 pockets', 'Regular fit'],
    featuresAr: ['دينم مرن', '5 جيوب', 'قصة عادية'],
    basePrice: 69,
  },
  {
    visualKey: 'jacket',
    categoryId: 'cat-fashion',
    en: 'Leather Jacket',
    ar: 'جاكيت جلد',
    descEn: 'Stylish leather jacket for cool evenings and street looks.',
    descAr: 'جاكيت جلد أنيق للأمسيات والستايل العصري.',
    featuresEn: ['Genuine leather look', 'Zip front', 'Lined interior'],
    featuresAr: ['مظهر جلد فاخر', 'سحاب أمامي', 'بطانة داخلية'],
    basePrice: 159,
  },
  {
    visualKey: 'sneakers',
    categoryId: 'cat-fashion',
    en: 'Casual Sneakers',
    ar: 'حذاء كاجوال',
    descEn: 'Everyday sneakers with cushioned sole and clean design.',
    descAr: 'حذاء يومي بنعل مريح وتصميم نظيف.',
    featuresEn: ['Cushioned sole', 'Breathable upper', 'Lace-up'],
    featuresAr: ['نعل مريح', 'قماش يتنفس', 'رباط'],
    basePrice: 85,
  },
  {
    visualKey: 'dress',
    categoryId: 'cat-fashion',
    en: 'Summer Dress',
    ar: 'فستان صيفي',
    descEn: 'Light summer dress with soft fabric and flattering cut.',
    descAr: 'فستان صيفي خفيف بقماش ناعم وقصة أنيقة.',
    featuresEn: ['Lightweight fabric', 'Easy care', 'Elegant cut'],
    featuresAr: ['قماش خفيف', 'سهل العناية', 'قصة أنيقة'],
    basePrice: 75,
  },
  {
    visualKey: 'hoodie',
    categoryId: 'cat-fashion',
    en: 'Fleece Hoodie',
    ar: 'هودي فليس',
    descEn: 'Warm fleece hoodie for casual days and cool weather.',
    descAr: 'هودي فليس دافئ للأيام العادية والطقس البارد.',
    featuresEn: ['Soft fleece', 'Kangaroo pocket', 'Drawstring hood'],
    featuresAr: ['فليس ناعم', 'جيب كنغر', 'قبعة برباط'],
    basePrice: 55,
  },

  // Home
  {
    visualKey: 'sofa',
    categoryId: 'cat-home',
    en: 'Modern Sofa',
    ar: 'أريكة عصرية',
    descEn: 'Comfortable modern sofa that fits living rooms and apartments.',
    descAr: 'أريكة عصرية مريحة تناسب الصالون والشقق.',
    featuresEn: ['Soft cushions', 'Sturdy frame', 'Easy clean cover'],
    featuresAr: ['وسائد ناعمة', 'هيكل متين', 'غطاء سهل التنظيف'],
    basePrice: 499,
  },
  {
    visualKey: 'lamp',
    categoryId: 'cat-home',
    en: 'Table Lamp',
    ar: 'مصباح طاولة',
    descEn: 'Minimal table lamp for warm bedside or desk lighting.',
    descAr: 'مصباح طاولة بسيط لإضاءة دافئة بجانب السرير أو المكتب.',
    featuresEn: ['Warm LED', 'Touch dimmer', 'Stable base'],
    featuresAr: ['LED دافئ', 'تعتيم باللمس', 'قاعدة ثابتة'],
    basePrice: 45,
  },
  {
    visualKey: 'coffeeMaker',
    categoryId: 'cat-home',
    en: 'Coffee Maker',
    ar: 'ماكينة قهوة',
    descEn: 'Home coffee maker for fresh espresso-style cups every morning.',
    descAr: 'ماكينة قهوة منزلية لفناجين طازجة كل صباح.',
    featuresEn: ['Programmable', 'Removable tank', 'Auto shut-off'],
    featuresAr: ['قابلة للبرمجة', 'خزان قابل للإزالة', 'إيقاف تلقائي'],
    basePrice: 119,
  },
  {
    visualKey: 'vase',
    categoryId: 'cat-home',
    en: 'Ceramic Vase',
    ar: 'مزهرية سيراميك',
    descEn: 'Hand-finished ceramic vase for flowers and shelf décor.',
    descAr: 'مزهرية سيراميك لمسة يدوية للورد وديكور الرفوف.',
    featuresEn: ['Ceramic body', 'Waterproof glaze', 'Decor accent'],
    featuresAr: ['جسم سيراميك', 'طلاء مقاوم للماء', 'لمسة ديكور'],
    basePrice: 35,
  },
  {
    visualKey: 'candles',
    categoryId: 'cat-home',
    en: 'Scented Candles Set',
    ar: 'طقم شموع معطرة',
    descEn: 'Set of scented candles for a calm home atmosphere.',
    descAr: 'طقم شموع معطرة لأجواء منزل هادئة.',
    featuresEn: ['Soy wax', 'Long burn', 'Gift-ready box'],
    featuresAr: ['شمع صويا', 'احتراق طويل', 'علبة هدية'],
    basePrice: 32,
  },
  {
    visualKey: 'bedding',
    categoryId: 'cat-home',
    en: 'Cotton Bedding Set',
    ar: 'طقم مفارش قطن',
    descEn: "Breathable cotton bedding set for a better night's sleep.",
    descAr: 'طقم مفارش قطن يتنفس لنوم أريح.',
    featuresEn: ['Soft cotton', 'Queen size', 'Easy wash'],
    featuresAr: ['قطن ناعم', 'مقاس كوين', 'غسيل سهل'],
    basePrice: 95,
  },

  // Sports
  {
    visualKey: 'runningShoes',
    categoryId: 'cat-sports',
    en: 'Running Shoes',
    ar: 'حذاء جري',
    descEn: 'Lightweight running shoes built for daily training.',
    descAr: 'حذاء جري خفيف مصمم للتمرين اليومي.',
    featuresEn: ['Cushion midsole', 'Breathable mesh', 'Grip outsole'],
    featuresAr: ['نعل وسطي مريح', 'شبك يتنفس', 'نعل ماسك'],
    basePrice: 110,
  },
  {
    visualKey: 'yogaMat',
    categoryId: 'cat-sports',
    en: 'Yoga Mat',
    ar: 'سجادة يوغا',
    descEn: 'Non-slip yoga mat with comfortable thickness for home workouts.',
    descAr: 'سجادة يوغا مانعة للانزلاق بسمك مريح للتمرين المنزلي.',
    featuresEn: ['Non-slip', '6mm thick', 'Carry strap'],
    featuresAr: ['مانعة للانزلاق', 'سماكة 6 مم', 'شريط حمل'],
    basePrice: 39,
  },
  {
    visualKey: 'dumbbells',
    categoryId: 'cat-sports',
    en: 'Dumbbell Set',
    ar: 'طقم دمبل',
    descEn: 'Home dumbbell set for strength training and toning.',
    descAr: 'طقم دمبل منزلي لتقوية العضلات والتنشيط.',
    featuresEn: ['Rubber coated', 'Pair set', 'Floor friendly'],
    featuresAr: ['مغطى بالمطاط', 'طقم زوجي', 'آمن للأرضية'],
    basePrice: 65,
  },
  {
    visualKey: 'bike',
    categoryId: 'cat-sports',
    en: 'City Bicycle',
    ar: 'دراجة مدينة',
    descEn: 'Reliable city bicycle for commuting and weekend rides.',
    descAr: 'دراجة مدينة موثوقة للتنقل ورحلات نهاية الأسبوع.',
    featuresEn: ['Lightweight frame', 'City tires', 'Front basket ready'],
    featuresAr: ['هيكل خفيف', 'إطارات مدينة', 'جاهزة لسلة أمامية'],
    basePrice: 320,
  },
  {
    visualKey: 'ball',
    categoryId: 'cat-sports',
    en: 'Football',
    ar: 'كرة قدم',
    descEn: 'Match-ready football with durable stitching for outdoor play.',
    descAr: 'كرة قدم جاهزة للمباريات بخياطة متينة للعب الخارجي.',
    featuresEn: ['Official size', 'Durable cover', 'True bounce'],
    featuresAr: ['مقاس رسمي', 'غطاء متين', 'ارتداد ثابت'],
    basePrice: 28,
  },
  {
    visualKey: 'waterBottle',
    categoryId: 'cat-sports',
    en: 'Sports Water Bottle',
    ar: 'زجاجة رياضية',
    descEn: 'Insulated sports bottle that keeps drinks cold on the go.',
    descAr: 'زجاجة رياضية معزولة تحافظ على برودة المشروب أثناء التنقل.',
    featuresEn: ['750ml', 'Leak proof', 'BPA free'],
    featuresAr: ['750 مل', 'مانعة للتسرب', 'خالية من BPA'],
    basePrice: 24,
  },

  // Beauty
  {
    visualKey: 'perfume',
    categoryId: 'cat-beauty',
    en: 'Eau de Parfum',
    ar: 'عطر مركز',
    descEn: 'Elegant eau de parfum bottle with a long-lasting signature scent.',
    descAr: 'زجاجة عطر مركز أنيقة برائحة مميزة تدوم طويلاً.',
    featuresEn: ['100ml bottle', 'Long lasting', 'Gift packaging'],
    featuresAr: ['عبوة 100 مل', 'ثبات عالي', 'تغليف هدية'],
    basePrice: 95,
  },
  {
    visualKey: 'serum',
    categoryId: 'cat-beauty',
    en: 'Face Serum',
    ar: 'سيروم للوجه',
    descEn: 'Hydrating face serum in a glass dropper bottle for daily glow.',
    descAr: 'سيروم مرطب للوجه بقطّارة زجاجية لإشراق يومي.',
    featuresEn: ['Hydrating formula', 'Dropper bottle', 'Dermatologist tested'],
    featuresAr: ['تركيبة مرطبة', 'زجاجة بقطارة', 'مختبر جلدياً'],
    basePrice: 48,
  },
  {
    visualKey: 'lipstick',
    categoryId: 'cat-beauty',
    en: 'Matte Lipstick',
    ar: 'أحمر شفاه مات',
    descEn: 'Rich matte lipstick with smooth application and bold color.',
    descAr: 'أحمر شفاه مات غني بتطبيق ناعم ولون واضح.',
    featuresEn: ['Matte finish', 'Long wear', 'Buildable color'],
    featuresAr: ['لمسة مات', 'ثبات طويل', 'لون قابل للتكثيف'],
    basePrice: 22,
  },
  {
    visualKey: 'skincare',
    categoryId: 'cat-beauty',
    en: 'Skincare Cream',
    ar: 'كريم عناية بالبشرة',
    descEn: 'Daily skincare cream jar for soft and nourished skin.',
    descAr: 'علبة كريم يومي لبشرة ناعمة ومغذية.',
    featuresEn: ['Daily moisturizer', 'Non-greasy', '50ml jar'],
    featuresAr: ['مرطب يومي', 'غير دهني', 'علبة 50 مل'],
    basePrice: 36,
  },
  {
    visualKey: 'makeup',
    categoryId: 'cat-beauty',
    en: 'Makeup Kit',
    ar: 'طقم مكياج',
    descEn: 'Complete makeup kit with brushes and essential shades.',
    descAr: 'طقم مكياج كامل مع فرش وألوان أساسية.',
    featuresEn: ['Brush set', 'Travel case', 'Starter shades'],
    featuresAr: ['طقم فرش', 'حقيبة سفر', 'درجات أساسية'],
    basePrice: 58,
  },

  // Books
  {
    visualKey: 'novel',
    categoryId: 'cat-books',
    en: 'Bestselling Novel',
    ar: 'رواية الأكثر مبيعاً',
    descEn: 'Hardcover bestselling novel for your next weekend read.',
    descAr: 'رواية بغلاف مقوى من الأكثر مبيعاً لقراءة نهاية الأسبوع.',
    featuresEn: ['Hardcover', 'English edition', 'Gift wrap ready'],
    featuresAr: ['غلاف مقوى', 'طبعة إنجليزية', 'جاهزة للتغليف'],
    basePrice: 26,
  },
  {
    visualKey: 'textbook',
    categoryId: 'cat-books',
    en: 'Study Textbook',
    ar: 'كتاب دراسي',
    descEn: 'Clear study textbook with diagrams and practice sections.',
    descAr: 'كتاب دراسي واضح مع رسوم وأقسام تمارين.',
    featuresEn: ['Illustrated', 'Practice quizzes', 'Updated edition'],
    featuresAr: ['موضح بالرسوم', 'اختبارات تمرين', 'طبعة محدّثة'],
    basePrice: 42,
  },
  {
    visualKey: 'notebook',
    categoryId: 'cat-books',
    en: 'Lined Notebook',
    ar: 'دفتر مسطر',
    descEn: 'Premium lined notebook for notes, journaling, and planning.',
    descAr: 'دفتر مسطر فاخر للملاحظات والتدوين والتخطيط.',
    featuresEn: ['A5 size', 'Thick paper', 'Elastic band'],
    featuresAr: ['مقاس A5', 'ورق سميك', 'رباط مطاطي'],
    basePrice: 14,
  },
  {
    visualKey: 'comics',
    categoryId: 'cat-books',
    en: 'Graphic Novel',
    ar: 'رواية مصورة',
    descEn: 'Colorful graphic novel with striking cover art.',
    descAr: 'رواية مصورة ملونة بغلاف فني مميز.',
    featuresEn: ['Full color', 'Collector cover', 'Softcover'],
    featuresAr: ['ألوان كاملة', 'غلاف لهواة الجمع', 'غلاف مرن'],
    basePrice: 19,
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
    price: onSale ? Math.round(item.basePrice * 0.75) : item.basePrice,
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
