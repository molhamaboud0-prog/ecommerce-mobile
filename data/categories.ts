import type { Category } from './types';
import { getCategoryImage } from './productImages';

export const categories: Category[] = [
  {
    id: 'cat-fruits',
    name: 'Fruits',
    nameAr: 'فواكه',
    slug: 'fruits',
    image: getCategoryImage('cat-fruits'),
  },
  {
    id: 'cat-vegetables',
    name: 'Vegetables',
    nameAr: 'خضار',
    slug: 'vegetables',
    image: getCategoryImage('cat-vegetables'),
  },
  {
    id: 'cat-dairy',
    name: 'Dairy & Eggs',
    nameAr: 'ألبان وبيض',
    slug: 'dairy',
    image: getCategoryImage('cat-dairy'),
  },
  {
    id: 'cat-bakery',
    name: 'Bakery',
    nameAr: 'مخبوزات',
    slug: 'bakery',
    image: getCategoryImage('cat-bakery'),
  },
  {
    id: 'cat-drinks',
    name: 'Beverages',
    nameAr: 'مشروبات',
    slug: 'drinks',
    image: getCategoryImage('cat-drinks'),
  },
  {
    id: 'cat-meat',
    name: 'Meat & Seafood',
    nameAr: 'لحوم ومأكولات بحرية',
    slug: 'meat',
    image: getCategoryImage('cat-meat'),
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
