/**
 * Single source of truth for all portfolio content.
 *
 * Every user-facing string can be either a plain string (shown in both
 * languages) or an object `{ en, ar }`. Set `placeholder: true` on any project
 * or CV block to show the "content coming soon" marker; remove it once real
 * content is in. Empty arrays / missing sections are hidden automatically.
 *
 * Images live in /public/images and are referenced relative to it
 * (e.g. 'images/ecommerce/home.webp'). Set `framed: true` on a cover or a
 * gallery section when the screenshots already include a device bezel.
 */

export const profile = {
  name: { en: 'Molham Aboud', ar: 'ملهم عبود' },
  initials: 'MA',
  role: {
    en: 'UI/UX Designer & React Native Developer',
    ar: 'مصمم واجهات وتجربة مستخدم ومطوّر React Native',
  },
  headline: {
    en: 'I design calm, bilingual product experiences — and ship them as native apps.',
    ar: 'أصمّم تجارب رقمية هادئة وثنائية اللغة، وأحوّلها إلى تطبيقات حقيقية.',
  },
  intro: {
    en: 'An Information Engineering graduate working across the whole product loop — Figma flows and design systems through to React Native builds — with a focus on Arabic-first, RTL-ready interfaces.',
    ar: 'خرّيج هندسة معلوماتية أعمل على المنتج من البداية إلى النهاية: من مسارات Figma وأنظمة التصميم إلى تطبيقات React Native، مع اهتمام خاص بالواجهات العربية الداعمة للكتابة من اليمين إلى اليسار.',
  },
  location: { en: 'Damascus, Syria', ar: 'دمشق، سوريا' },
  available: true,
  availability: { en: 'Open to freelance & full-time roles', ar: 'متاح للعمل الحر والدوام الكامل' },
  email: 'molhamaboud0@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/molhamaboud0-prog' },
    { label: 'Behance', href: '#', placeholder: true },
    { label: 'LinkedIn', href: '#', placeholder: true },
    { label: 'Dribbble', href: '#', placeholder: true },
  ],
  cvFile: 'files/molham-aboud-cv.pdf',
};

export const stack = [
  'Figma',
  'Design Systems',
  'Wireframing',
  'User Flows',
  'Prototyping',
  'React Native',
  'Expo',
  'TypeScript',
  'NativeWind',
  'Zustand',
  'i18next',
  'Java',
  'C#',
  'SQL',
];

export const projects = [
  {
    slug: 'grocery-ecommerce-app',
    kind: { en: 'Mobile app · Design + Development', ar: 'تطبيق جوال · تصميم وتطوير' },
    title: { en: 'Bilingual Grocery E-commerce App', ar: 'تطبيق تجارة إلكترونية للبقالة ثنائي اللغة' },
    summary: {
      en: 'A React Native e-commerce app for groceries with full Arabic/RTL support, dark mode, cart, wishlist and order tracking — designed and built end to end.',
      ar: 'تطبيق تجارة إلكترونية للبقالة مبني بـ React Native، يدعم العربية والاتجاه من اليمين لليسار والوضع الداكن، مع سلة ومفضلة وتتبّع للطلبات — صمّمته وطوّرته بالكامل.',
    },
    accent: '#2B6CB0',
    cover: { type: 'phones', images: ['images/ecommerce/home.webp', 'images/ecommerce/product.webp', 'images/ecommerce/cart.webp'] },
    meta: [
      { label: { en: 'Role', ar: 'الدور' }, value: { en: 'UI/UX + Mobile dev', ar: 'تصميم + تطوير' } },
      { label: { en: 'Platform', ar: 'المنصة' }, value: 'iOS · Android · Web' },
      { label: { en: 'Year', ar: 'السنة' }, value: '2026' },
      { label: { en: 'Stack', ar: 'التقنيات' }, value: 'Expo 54 · RN 0.81 · TS' },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/molhamaboud0-prog/ecommerce-mobile' }],
    metrics: [
      { value: '15+', label: { en: 'Screens designed & built', ar: 'شاشة مصمَّمة ومنفَّذة' } },
      { value: '2', label: { en: 'Languages, full RTL', ar: 'لغتان مع دعم كامل للاتجاه' } },
      { value: '2', label: { en: 'Themes (light / dark)', ar: 'سمتان (فاتح / داكن)' } },
      { value: 'CI', label: { en: 'APK builds via EAS', ar: 'بناء تلقائي عبر EAS' } },
    ],
    sections: [
      {
        id: 'problem',
        title: { en: 'The problem', ar: 'المشكلة' },
        body: {
          en: 'Most grocery apps in the region treat Arabic as an afterthought: mirrored layouts break, typography feels foreign, and browsing a large catalog on a small screen is slow. The goal was a shopping experience that feels native in both English and Arabic, and stays fast and calm while you fill your basket.',
          ar: 'معظم تطبيقات البقالة في المنطقة تتعامل مع العربية كإضافة لاحقة: التخطيطات المعكوسة تنكسر، والخطوط تبدو غريبة، وتصفّح كتالوج كبير على شاشة صغيرة بطيء. كان الهدف تجربة تسوّق طبيعية بالعربية والإنجليزية، سريعة وهادئة أثناء ملء السلة.',
        },
      },
      {
        id: 'role',
        title: { en: 'My role', ar: 'دوري' },
        body: {
          en: 'Solo designer and developer: information architecture, visual system, component library, and the full React Native implementation, testing and CI build pipeline.',
          ar: 'مصمم ومطوّر وحيد: هندسة المعلومات، النظام البصري، مكتبة المكوّنات، والتنفيذ الكامل بـ React Native مع الاختبارات وخط البناء التلقائي.',
        },
      },
      {
        id: 'process',
        title: { en: 'Process', ar: 'المنهجية' },
        steps: [
          {
            title: { en: 'Map the journeys', ar: 'رسم رحلات المستخدم' },
            body: { en: 'Browse → product → cart → order tracking, plus auth, favorites and search as supporting flows.', ar: 'تصفّح ← منتج ← سلة ← تتبّع الطلب، مع تسجيل الدخول والمفضلة والبحث كمسارات مساندة.' },
          },
          {
            title: { en: 'Design system first', ar: 'النظام التصميمي أولاً' },
            body: { en: 'A navy + steel-blue palette with light/dark tokens, the Dubai typeface for both scripts, soft card elevation and 16–24px radii.', ar: 'لوحة ألوان كحلية وزرقاء مع رموز للوضعين الفاتح والداكن، وخط دبي للغتين، وظلال ناعمة وزوايا دائرية.' },
          },
          {
            title: { en: 'Build in sections', ar: 'البناء على مراحل' },
            body: { en: 'Shipped in four sections — auth & profile, catalog, drawer polish, then cart, orders and notifications — each with an EAS APK build.', ar: 'تم التسليم على أربع مراحل: الحساب والملف الشخصي، الكتالوج، تحسين القائمة الجانبية، ثم السلة والطلبات والإشعارات — مع نسخة APK لكل مرحلة.' },
          },
          {
            title: { en: 'Polish the details', ar: 'صقل التفاصيل' },
            body: { en: 'Skeleton loaders, pull-to-refresh, haptics, toasts and empty states so every screen has a considered in-between state.', ar: 'هياكل تحميل، سحب للتحديث، اهتزازات لمسية، إشعارات منبثقة وحالات فارغة مدروسة لكل شاشة.' },
          },
        ],
      },
      {
        id: 'features',
        title: { en: 'Key features', ar: 'أبرز المزايا' },
        list: [
          { en: 'English / Arabic with runtime RTL switching (i18next + expo-localization)', ar: 'العربية والإنجليزية مع تبديل اتجاه الواجهة أثناء التشغيل' },
          { en: 'Light & dark themes driven by shared design tokens', ar: 'وضع فاتح وداكن مبنيان على رموز تصميم مشتركة' },
          { en: 'Categories, tags, search and a fast FlashList product grid', ar: 'تصنيفات ووسوم وبحث وشبكة منتجات سريعة' },
          { en: 'Cart with notes, wishlist and persisted state (Zustand + AsyncStorage)', ar: 'سلة مع ملاحظات، ومفضلة، وحفظ للحالة' },
          { en: 'Order history & tracking with in-app notifications', ar: 'سجل الطلبات وتتبّعها مع إشعارات داخل التطبيق' },
          { en: 'Auth flow with route guards and secure storage', ar: 'تسجيل دخول مع حماية للمسارات وتخزين آمن' },
          { en: 'Jest + Testing Library tests, ESLint/Prettier, GitHub Actions → EAS APK', ar: 'اختبارات آلية وفحص للكود وبناء تلقائي عبر GitHub Actions' },
        ],
      },
      {
        id: 'screens',
        title: { en: 'Screens', ar: 'الشاشات' },
        gallery: [
          { src: 'images/ecommerce/login.webp', caption: { en: 'Sign in', ar: 'تسجيل الدخول' } },
          { src: 'images/ecommerce/home.webp', caption: { en: 'Home', ar: 'الرئيسية' } },
          { src: 'images/ecommerce/categories.webp', caption: { en: 'Categories', ar: 'التصنيفات' } },
          { src: 'images/ecommerce/product.webp', caption: { en: 'Product detail', ar: 'تفاصيل المنتج' } },
          { src: 'images/ecommerce/cart.webp', caption: { en: 'Cart', ar: 'السلة' } },
          { src: 'images/ecommerce/home-ar.webp', caption: { en: 'Arabic · RTL', ar: 'العربية · من اليمين لليسار' } },
        ],
      },
      {
        id: 'learnings',
        title: { en: 'Outcome & learnings', ar: 'النتيجة والدروس' },
        body: {
          en: 'Designing RTL from day one — logical spacing, mirrored icons only where meaning flips, one typeface for both scripts — was far cheaper than retrofitting it. Next steps: a real checkout and payments, and usability tests with Arabic-first shoppers.',
          ar: 'تصميم الاتجاه من اليمين لليسار منذ اليوم الأول كان أوفر بكثير من إضافته لاحقاً. الخطوات القادمة: دفع فعلي، واختبارات استخدام مع متسوّقين يفضّلون العربية.',
        },
      },
    ],
  },
  {
    slug: 'carevisit-clinic-booking',
    kind: { en: 'UI/UX case study · Mobile + Web', ar: 'دراسة حالة UI/UX · جوال وويب' },
    title: { en: 'CareVisit — Clinic Booking for Patients', ar: 'CareVisit — حجز مواعيد العيادات للمرضى' },
    summary: {
      en: 'A patient app for finding doctors, booking visits and keeping medical records in one place — designed as a complete Figma system for mobile and web.',
      ar: 'تطبيق للمرضى للبحث عن الأطباء وحجز المواعيد وحفظ السجلات الطبية في مكان واحد — مصمَّم كنظام Figma متكامل للجوال والويب.',
    },
    accent: '#0D9488',
    cover: { type: 'phones', framed: true, images: ['images/clinics/home.webp', 'images/clinics/slots.webp', 'images/clinics/doctor.webp'] },
    meta: [
      { label: { en: 'Role', ar: 'الدور' }, value: { en: 'UI/UX Designer', ar: 'مصمم UI/UX' } },
      { label: { en: 'Platform', ar: 'المنصة' }, value: { en: 'Mobile · Web', ar: 'جوال · ويب' } },
      { label: { en: 'Year', ar: 'السنة' }, value: '2026' },
      { label: { en: 'Tools', ar: 'الأدوات' }, value: 'Figma · HTML prototype' },
    ],
    metrics: [
      { value: '34', label: { en: 'Mobile frames (390×844)', ar: 'إطاراً للجوال (390×844)' } },
      { value: '8', label: { en: 'Web frames (1440, 12-col)', ar: 'إطارات للويب (1440، 12 عموداً)' } },
      { value: '22', label: { en: 'Prototype links wired', ar: 'رابطاً في النموذج التفاعلي' } },
      { value: '44px', label: { en: 'Minimum tap target', ar: 'الحد الأدنى لمساحة اللمس' } },
    ],
    sections: [
      {
        id: 'problem',
        title: { en: 'The problem', ar: 'المشكلة' },
        body: {
          en: 'Booking a clinic visit usually means phone calls, unclear availability and paper results scattered across visits. CareVisit gives patients one calm place to find the right doctor, pick a real time slot, manage upcoming visits and open their prescriptions and documents.',
          ar: 'حجز موعد في عيادة يعني غالباً اتصالات هاتفية ومواعيد غير واضحة ونتائج ورقية متفرقة. يقدّم CareVisit للمريض مكاناً واحداً هادئاً لإيجاد الطبيب المناسب، واختيار موعد متاح فعلاً، وإدارة زياراته القادمة، والوصول إلى وصفاته ووثائقه.',
        },
      },
      {
        id: 'role',
        title: { en: 'My role', ar: 'دوري' },
        body: {
          en: 'Sole designer: information architecture, user flows, the variable-based design system, component library, every mobile and web frame with its states, the clickable prototype and an HTML preview of the screens.',
          ar: 'المصمم الوحيد: هندسة المعلومات، مسارات المستخدم، النظام التصميمي المبني على المتغيرات، مكتبة المكوّنات، جميع إطارات الجوال والويب بحالاتها، النموذج التفاعلي، ومعاينة HTML للشاشات.',
        },
      },
      {
        id: 'process',
        title: { en: 'Process', ar: 'المنهجية' },
        steps: [
          {
            title: { en: 'Foundations as variables', ar: 'الأساسيات كمتغيرات' },
            body: { en: 'Primitive and semantic color collections (teal #0D9488 primary, slate text), a 4px spacing scale, radius and size tokens, and an Inter type scale — no raw hex inside components.', ar: 'مجموعات ألوان أساسية ودلالية (الأخضر المزرق ‎#0D9488 أساسياً)، ومقياس مسافات 4px، ورموز للزوايا والأحجام، وسلّم خطوط Inter — بدون أي لون مباشر داخل المكوّنات.' },
          },
          {
            title: { en: 'Components with states', ar: 'مكوّنات بحالاتها' },
            body: { en: 'Navigation, inputs, doctor and appointment cards, a 7-column calendar, time-slot chips (available / selected / unavailable) and a 3-step indicator, all in auto-layout.', ar: 'التنقّل، الحقول، بطاقات الأطباء والمواعيد، تقويم بسبعة أعمدة، شرائح الأوقات (متاح / مختار / غير متاح) ومؤشر خطوات ثلاثي، كلها بـ Auto Layout.' },
          },
          {
            title: { en: 'Screens for every state', ar: 'شاشات لكل حالة' },
            body: { en: 'Each frame is designed in its default, loading, empty and error state — from sign-in errors to "no slots this week" — so nothing is left to guesswork in build.', ar: 'كل إطار مصمَّم بحالته العادية والتحميل والفارغة والخطأ — من خطأ تسجيل الدخول إلى «لا مواعيد هذا الأسبوع» — حتى لا يُترك شيء للتخمين عند التنفيذ.' },
          },
          {
            title: { en: 'Prototype & web layout', ar: 'النموذج التفاعلي وتخطيط الويب' },
            body: { en: 'The booking journey is wired end to end in the prototype, and the web version maps the same flows to a 12-column grid with a 240px sidebar and a quick-book rail.', ar: 'رحلة الحجز موصولة بالكامل في النموذج التفاعلي، ونسخة الويب تنقل المسارات نفسها إلى شبكة من 12 عموداً مع قائمة جانبية بعرض 240px ولوحة حجز سريع.' },
          },
        ],
      },
      {
        id: 'features',
        title: { en: 'Key flows', ar: 'أبرز المسارات' },
        list: [
          { en: 'Search doctors, clinics and specialties, with filters in a bottom sheet', ar: 'البحث عن الأطباء والعيادات والتخصصات مع فلاتر في لوحة سفلية' },
          { en: 'Doctor profile → choose a time → confirm → success, in three clear steps', ar: 'ملف الطبيب ← اختيار الوقت ← التأكيد ← النجاح، بثلاث خطوات واضحة' },
          { en: 'Appointments with upcoming / past tabs, reschedule and cancel', ar: 'المواعيد مع تبويب القادمة والسابقة، وإعادة الجدولة والإلغاء' },
          { en: 'Records hub for prescriptions and documents', ar: 'مركز السجلات للوصفات والوثائق' },
          { en: 'Notifications grouped by day, and insurance upload in the profile', ar: 'إشعارات مجمّعة حسب اليوم، ورفع بطاقة التأمين من الملف الشخصي' },
        ],
      },
      {
        id: 'screens',
        title: { en: 'Mobile screens', ar: 'شاشات الجوال' },
        framed: true,
        gallery: [
          { src: 'images/clinics/welcome.webp', caption: { en: 'Welcome', ar: 'الترحيب' } },
          { src: 'images/clinics/home.webp', caption: { en: 'Home', ar: 'الرئيسية' } },
          { src: 'images/clinics/search.webp', caption: { en: 'Search', ar: 'البحث' } },
          { src: 'images/clinics/doctor.webp', caption: { en: 'Doctor profile', ar: 'ملف الطبيب' } },
          { src: 'images/clinics/slots.webp', caption: { en: 'Choose a time', ar: 'اختيار الوقت' } },
          { src: 'images/clinics/confirm.webp', caption: { en: 'Confirm booking', ar: 'تأكيد الحجز' } },
          { src: 'images/clinics/success.webp', caption: { en: 'Booked', ar: 'تم الحجز' } },
          { src: 'images/clinics/appointments.webp', caption: { en: 'Appointments', ar: 'المواعيد' } },
          { src: 'images/clinics/records.webp', caption: { en: 'Records', ar: 'السجلات' } },
        ],
      },
      {
        id: 'web',
        title: { en: 'Web dashboard', ar: 'لوحة الويب' },
        body: {
          en: 'On desktop the same patient home becomes a dashboard: persistent sidebar, search across the top, the upcoming visit front and centre and a quick-book card on the right rail.',
          ar: 'على سطح المكتب تتحوّل الصفحة الرئيسية إلى لوحة تحكّم: قائمة جانبية ثابتة، بحث في الأعلى، الموعد القادم في المنتصف، وبطاقة حجز سريع على الجانب.',
        },
        wide: { src: 'images/clinics/web-home.webp', caption: { en: 'Web · Home dashboard (1440)', ar: 'الويب · لوحة الرئيسية (1440)' } },
      },
      {
        id: 'learnings',
        title: { en: 'Accessibility & next steps', ar: 'سهولة الوصول والخطوات التالية' },
        body: {
          en: 'Tap targets are at least 44px, focus rings are a 2px teal outline, and every status chip pairs color with a label so meaning never depends on color alone. Next: a dark mode on the existing variable modes, an Arabic RTL version, and usability tests of the booking flow with real patients.',
          ar: 'مساحات اللمس 44px على الأقل، وحلقات التركيز إطار أخضر مزرق بعرض 2px، وكل شارة حالة تجمع اللون مع نص حتى لا يعتمد المعنى على اللون وحده. الخطوات القادمة: وضع داكن عبر أنماط المتغيرات الحالية، ونسخة عربية من اليمين لليسار، واختبارات استخدام لمسار الحجز مع مرضى حقيقيين.',
        },
      },
    ],
  },
  {
    slug: 'flavorhub-restaurant-app',
    kind: { en: 'UI/UX case study · Mobile app', ar: 'دراسة حالة UI/UX · تطبيق جوال' },
    title: { en: 'FlavorHub — Delivery, Table Booking & Offers', ar: 'FlavorHub — توصيل وحجز طاولات وعروض' },
    summary: {
      en: 'A bilingual restaurant app that brings food delivery, table booking and offers into one experience — designed in English and Arabic (RTL), in light and dark.',
      ar: 'تطبيق مطاعم ثنائي اللغة يجمع توصيل الطعام وحجز الطاولات والعروض في تجربة واحدة — مصمَّم بالإنجليزية والعربية (من اليمين لليسار) وبالوضعين الفاتح والداكن.',
    },
    accent: '#FF6B35',
    cover: { type: 'phones', framed: true, images: ['images/restaurant/home.webp', 'images/restaurant/dish-detail.webp', 'images/restaurant/home-ar-dark.webp'] },
    meta: [
      { label: { en: 'Role', ar: 'الدور' }, value: { en: 'UI/UX Designer', ar: 'مصمم UI/UX' } },
      { label: { en: 'Platform', ar: 'المنصة' }, value: 'iOS · 393×852' },
      { label: { en: 'Year', ar: 'السنة' }, value: '2026' },
      { label: { en: 'Tools', ar: 'الأدوات' }, value: 'Figma · HTML prototype' },
    ],
    metrics: [
      { value: '27', label: { en: 'Screens incl. empty states', ar: 'شاشة مع الحالات الفارغة' } },
      { value: '2', label: { en: 'Languages, full RTL', ar: 'لغتان مع دعم كامل للاتجاه' } },
      { value: '2', label: { en: 'Themes (light / dark)', ar: 'سمتان (فاتح / داكن)' } },
      { value: '4', label: { en: 'Prototype flows', ar: 'مسارات في النموذج التفاعلي' } },
    ],
    sections: [
      {
        id: 'problem',
        title: { en: 'The problem', ar: 'المشكلة' },
        body: {
          en: 'Diners jump between one app to order, another to reserve a table and social posts to find deals. Menus are often walls of text, and Arabic versions feel like a mirrored afterthought. FlavorHub puts discovery, ordering and booking in one flow that feels native in both languages.',
          ar: 'ينتقل الزبائن بين تطبيق للطلب وآخر لحجز طاولة ومنشورات للعثور على العروض. والقوائم غالباً نصوص طويلة، والنسخ العربية تبدو انعكاساً متأخراً. يجمع FlavorHub الاكتشاف والطلب والحجز في مسار واحد طبيعي باللغتين.',
        },
      },
      {
        id: 'research',
        title: { en: 'Research', ar: 'البحث' },
        body: {
          en: 'I reviewed food-delivery UI kits on Figma Community (Foodora, Zomato, Foodu), open-source food app designs on GitHub, restaurant app trends for 2026, and Material Design 3 guidance on color roles and contrast.',
          ar: 'راجعت أطقم واجهات توصيل الطعام على Figma Community (Foodora وZomato وFoodu)، وتصاميم تطبيقات طعام مفتوحة المصدر على GitHub، واتجاهات تطبيقات المطاعم لعام 2026، وإرشادات Material Design 3 حول أدوار الألوان والتباين.',
        },
      },
      {
        id: 'process',
        title: { en: 'Process', ar: 'المنهجية' },
        steps: [
          {
            title: { en: 'Tokens in two modes', ar: 'رموز بوضعين' },
            body: { en: 'One Figma variable collection with Light and Dark modes: warm cream surface, orange #FF6B35 primary, teal secondary and a yellow promo accent.', ar: 'مجموعة متغيرات واحدة في Figma بوضعين فاتح وداكن: خلفية كريمية دافئة، برتقالي ‎#FF6B35 أساسي، أخضر مزرق ثانوي، وأصفر للعروض.' },
          },
          {
            title: { en: 'Type for both scripts', ar: 'خطوط للغتين' },
            body: { en: 'Plus Jakarta Sans for English and Tajawal for Arabic, sharing one 8-step type scale so both layouts keep the same rhythm.', ar: 'Plus Jakarta Sans للإنجليزية وTajawal للعربية، بسلّم خطوط واحد من ثماني درجات ليحافظ التخطيطان على الإيقاع نفسه.' },
          },
          {
            title: { en: 'Components & modifiers', ar: 'المكوّنات والإضافات' },
            body: { en: 'Bento home cards, restaurant and dish cards, filter chips, dish modifiers (size, spice, sauces, sides), a cart stepper and time-slot chips.', ar: 'بطاقات رئيسية بأسلوب Bento، بطاقات المطاعم والأطباق، شرائح الفلترة، إضافات الطبق (الحجم، الحدّة، الصلصات، الأطباق الجانبية)، عدّاد السلة وشرائح الأوقات.' },
          },
          {
            title: { en: 'Four prototype flows', ar: 'أربعة مسارات تفاعلية' },
            body: { en: 'Order (splash → menu → dish → cart → pay → track), Booking (branch → slot → QR), Offer (promo → coupon) and Empty states, plus an Arabic RTL demo.', ar: 'الطلب (البداية ← القائمة ← الطبق ← السلة ← الدفع ← التتبّع)، الحجز (الفرع ← الموعد ← رمز QR)، العرض (الإعلان ← القسيمة)، والحالات الفارغة، مع عرض للنسخة العربية.' },
          },
        ],
      },
      {
        id: 'rtl',
        title: { en: 'Designing for Arabic', ar: 'التصميم للعربية' },
        list: [
          { en: 'A dedicated RTL page in Figma, not an automatic mirror', ar: 'صفحة مخصّصة للعربية في Figma وليست انعكاساً تلقائياً' },
          { en: 'Mirrored only what carries direction: back chevrons, chip scroll, card thumbnails, price columns', ar: 'عكس ما يحمل اتجاهاً فقط: أسهم الرجوع، تمرير الشرائح، صور البطاقات، أعمدة الأسعار' },
          { en: 'Arabic copy written separately from English, not translated word for word', ar: 'نصوص عربية مكتوبة بشكل مستقل وليست ترجمة حرفية' },
          { en: 'Arabic-Indic numerals and local currency in the Arabic UI', ar: 'أرقام عربية-هندية وعملة محلية في الواجهة العربية' },
        ],
      },
      {
        id: 'screens',
        title: { en: 'Screens', ar: 'الشاشات' },
        framed: true,
        gallery: [
          { src: 'images/restaurant/splash.webp', caption: { en: 'Splash', ar: 'شاشة البداية' } },
          { src: 'images/restaurant/home.webp', caption: { en: 'Bento home', ar: 'الرئيسية' } },
          { src: 'images/restaurant/menu.webp', caption: { en: 'Menu', ar: 'القائمة' } },
          { src: 'images/restaurant/dish-detail.webp', caption: { en: 'Dish + modifiers', ar: 'الطبق والإضافات' } },
          { src: 'images/restaurant/cart.webp', caption: { en: 'Cart', ar: 'السلة' } },
          { src: 'images/restaurant/track.webp', caption: { en: 'Order tracking', ar: 'تتبّع الطلب' } },
          { src: 'images/restaurant/booking-slots.webp', caption: { en: 'Book a table', ar: 'حجز طاولة' } },
          { src: 'images/restaurant/booking-success.webp', caption: { en: 'Booking QR', ar: 'رمز الحجز' } },
          { src: 'images/restaurant/home-ar-dark.webp', caption: { en: 'Arabic · dark', ar: 'العربية · داكن' } },
        ],
      },
      {
        id: 'learnings',
        title: { en: 'Accessibility & learnings', ar: 'سهولة الوصول والدروس' },
        body: {
          en: 'Contrast checks shaped the palette: body text passes WCAG AA at over 12:1, white on orange (about 3.2:1) is kept to large buttons, and teal chips use dark labels instead of white. Every state pairs an icon with color, and all controls meet a 44×44 tap target.',
          ar: 'فحوص التباين هي التي شكّلت لوحة الألوان: النص الأساسي يتجاوز معيار WCAG AA بنسبة تفوق 12:1، والأبيض على البرتقالي (نحو 3.2:1) يقتصر على الأزرار الكبيرة، وشرائح الأخضر المزرق تستخدم نصاً داكناً بدل الأبيض. كل حالة تجمع أيقونة مع اللون، وكل العناصر بمساحة لمس 44×44.',
        },
      },
    ],
  },
];

export const cv = {
  about: {
    en: 'Information Engineering graduate who combines software development with UI/UX design. I build cross-platform mobile apps in React Native — multi-screen navigation, REST APIs and state management — and design them in Figma, from user flows to visual systems. I also bring a solid networking foundation (CCNA). A fast learner and bilingual communicator in Arabic and English.',
    ar: 'خرّيج هندسة معلوماتية أجمع بين تطوير البرمجيات وتصميم واجهات وتجربة المستخدم. أبني تطبيقات جوال متعددة المنصات بـ React Native — تنقّل متعدد الشاشات، وواجهات REST، وإدارة الحالة — وأصمّمها في Figma من مسارات المستخدم إلى الأنظمة البصرية. لديّ أيضاً أساس متين في الشبكات (CCNA). سريع التعلّم وأتواصل بالعربية والإنجليزية.',
  },
  skills: [
    { group: { en: 'UI/UX design', ar: 'تصميم UI/UX' }, items: ['Figma', 'Wireframing', 'User Flows', 'Visual Design', { en: 'Mobile & Web UI', ar: 'واجهات الجوال والويب' }] },
    { group: { en: 'Software & mobile', ar: 'البرمجيات والجوال' }, items: ['React Native', 'Java', 'C#', 'OOP', 'REST APIs', { en: 'State management', ar: 'إدارة الحالة' }, 'SQL'] },
    { group: { en: 'Networking (CCNA)', ar: 'الشبكات (CCNA)' }, items: ['OSPF / EIGRP', 'VLANs · STP', 'NAT · DHCP · ACLs', 'IPv4 / IPv6', 'Packet Tracer', 'Wireshark', 'GNS3'] },
    { group: { en: 'Systems', ar: 'الأنظمة' }, items: ['Linux', 'Windows Server'] },
    { group: { en: 'Languages', ar: 'اللغات' }, items: [{ en: 'Arabic — native', ar: 'العربية — اللغة الأم' }, { en: 'English — fluent', ar: 'الإنجليزية — بطلاقة' }] },
  ],
  experience: [
    { period: { en: 'Project', ar: 'مشروع' }, title: { en: 'Cross-platform mobile app', ar: 'تطبيق جوال متعدد المنصات' }, org: 'React Native', body: { en: 'Multi-screen stack navigation, structured forms, and REST API integration with async data and dynamic state.', ar: 'تنقّل متعدد الشاشات، نماذج إدخال منظّمة، وربط مع واجهات REST مع بيانات غير متزامنة وحالة ديناميكية.' } },
    { period: { en: 'Project', ar: 'مشروع' }, title: { en: 'Object-oriented mini system', ar: 'نظام مصغّر كائني التوجّه' }, org: 'Java', body: { en: 'Console application applying inheritance, encapsulation and polymorphism for robust data handling.', ar: 'تطبيق سطر أوامر يطبّق الوراثة والتغليف وتعدد الأشكال لمعالجة موثوقة للبيانات.' } },
    { period: { en: 'Lab', ar: 'مختبر' }, title: { en: 'Small office network design', ar: 'تصميم شبكة مكتب صغير' }, org: 'Cisco Packet Tracer', body: { en: 'Multi-VLAN network with inter-VLAN routing, DHCP pools and NAT.', ar: 'شبكة متعددة VLAN مع توجيه بينها، وتوزيع DHCP، وNAT.' } },
    { period: { en: 'Lab', ar: 'مختبر' }, title: { en: 'Router & switch configuration', ar: 'إعداد الموجّهات والمبدّلات' }, org: 'Cisco', body: { en: 'OSPF and static routing across a multi-router topology, secured with ACLs.', ar: 'توجيه OSPF وثابت عبر عدة موجّهات، مع تأمين بقوائم ACL.' } },
  ],
  education: [
    { period: { en: 'Graduated', ar: 'متخرّج' }, title: { en: 'Bachelor of Information Engineering', ar: 'بكالوريوس في هندسة المعلوماتية' }, org: { en: 'Al Rasheed International Private University', ar: 'جامعة الرشيد الدولية الخاصة' }, body: { en: 'Software engineering, advanced networking, databases, operating systems.', ar: 'هندسة البرمجيات، الشبكات المتقدمة، قواعد البيانات، أنظمة التشغيل.' } },
  ],
  courses: [
    { period: { en: 'Self-study', ar: 'تعلّم ذاتي' }, title: { en: 'UI/UX Design & Figma', ar: 'تصميم UI/UX وFigma' } },
    { period: { en: 'Online', ar: 'عبر الإنترنت' }, title: { en: 'React Native Mobile Development', ar: 'تطوير تطبيقات الجوال بـ React Native' } },
    { period: { en: 'Certificate', ar: 'شهادة' }, title: { en: 'C# Programming', ar: 'البرمجة بلغة C#' }, org: { en: 'Syrian Society for Informatics', ar: 'الجمعية العلمية السورية للمعلوماتية' } },
    { period: { en: 'University', ar: 'جامعي' }, title: { en: 'Advanced Java & Database Systems', ar: 'Java المتقدمة وأنظمة قواعد البيانات' } },
    { period: { en: 'Training', ar: 'تدريب' }, title: 'Cisco Certified Network Associate (CCNA)', org: 'Cisco Academy' },
  ],
};

export const ui = {
  en: {
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    available: 'Available',
    viewCase: 'View case study',
    selectedWork: 'Selected work',
    selectedWorkSub: 'Product design and mobile development, end to end.',
    placeholder: 'Placeholder — content coming soon',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    education: 'Education',
    courses: 'Courses & certifications',
    downloadCv: 'Download CV',
    contactTitle: "Let's build something people enjoy using.",
    copyEmail: 'Copy email',
    copied: 'Copied!',
    backHome: 'All work',
    nextProject: 'Next project',
    onThisPage: 'On this page',
    stackTitle: 'Toolkit',
    featured: 'Featured',
    projects: 'Projects',
    rights: 'Designed & built by',
    toggleTheme: 'Toggle theme',
    toggleLang: 'العربية',
  },
  ar: {
    nav: { work: 'الأعمال', about: 'نبذة', contact: 'تواصل' },
    available: 'متاح',
    viewCase: 'عرض دراسة الحالة',
    selectedWork: 'أعمال مختارة',
    selectedWorkSub: 'تصميم منتجات وتطوير تطبيقات جوال من البداية إلى النهاية.',
    placeholder: 'محتوى مؤقت — قريباً',
    about: 'نبذة',
    skills: 'المهارات',
    experience: 'الخبرات',
    education: 'التعليم',
    courses: 'الدورات والشهادات',
    downloadCv: 'تحميل السيرة الذاتية',
    contactTitle: 'لنبنِ معاً تجربة يستمتع بها الناس.',
    copyEmail: 'نسخ البريد',
    copied: 'تم النسخ!',
    backHome: 'كل الأعمال',
    nextProject: 'المشروع التالي',
    onThisPage: 'في هذه الصفحة',
    stackTitle: 'الأدوات',
    featured: 'مميّز',
    projects: 'مشاريع',
    rights: 'تصميم وتطوير',
    toggleTheme: 'تبديل السمة',
    toggleLang: 'English',
  },
};
