import type { Category } from './types';
import { getCategoryImage } from './productImages';

export const categories: Category[] = [
  {
    id: 'cat-electronics',
    name: 'Electronics',
    nameAr: 'إلكترونيات',
    slug: 'electronics',
    image: getCategoryImage('cat-electronics'),
  },
  {
    id: 'cat-fashion',
    name: 'Fashion',
    nameAr: 'أزياء',
    slug: 'fashion',
    image: getCategoryImage('cat-fashion'),
  },
  {
    id: 'cat-home',
    name: 'Home',
    nameAr: 'منزل',
    slug: 'home',
    image: getCategoryImage('cat-home'),
  },
  {
    id: 'cat-sports',
    name: 'Sports',
    nameAr: 'رياضة',
    slug: 'sports',
    image: getCategoryImage('cat-sports'),
  },
  {
    id: 'cat-beauty',
    name: 'Beauty',
    nameAr: 'جمال',
    slug: 'beauty',
    image: getCategoryImage('cat-beauty'),
  },
  {
    id: 'cat-books',
    name: 'Books',
    nameAr: 'كتب',
    slug: 'books',
    image: getCategoryImage('cat-books'),
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
