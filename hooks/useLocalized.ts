import { useTranslation } from 'react-i18next';

import type { Category, Product } from '@/data/types';
import { useSettingsStore } from '@/store/settingsStore';

export function useLocalizedProduct(product: Product) {
  const isRTL = useSettingsStore((s) => s.isRTL());
  return {
    title: isRTL ? product.titleAr : product.title,
    description: isRTL ? product.descriptionAr : product.description,
    features: isRTL ? product.featuresAr : product.features,
  };
}

export function useLocalizedCategory(category: Category) {
  const isRTL = useSettingsStore((s) => s.isRTL());
  return { name: isRTL ? category.nameAr : category.name };
}

export function useAppTranslation() {
  const { t, i18n: i18nInstance } = useTranslation();
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const isRTL = useSettingsStore((s) => s.isRTL());

  return { t, language, setLanguage, isRTL, i18n: i18nInstance };
}
