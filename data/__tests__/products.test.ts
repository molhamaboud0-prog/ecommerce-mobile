import { categories } from '@/data/categories';
import { products, getProductsByCategory, getProductsByTag } from '@/data/products';

describe('products data', () => {
  it('has 50+ products', () => {
    expect(products.length).toBeGreaterThanOrEqual(50);
  });

  it('every product has required fields', () => {
    products.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.titleAr).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.images.length).toBeGreaterThan(0);
      expect(p.tags.length).toBeGreaterThan(0);
      expect(p.features.length).toBeGreaterThan(0);
    });
  });

  it('has valid category references', () => {
    const categoryIds = new Set(categories.map((c) => c.id));
    products.forEach((p) => {
      expect(categoryIds.has(p.categoryId)).toBe(true);
    });
  });

  it('filters by category', () => {
    const catId = categories[0]!.id;
    const filtered = getProductsByCategory(catId);
    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach((p) => expect(p.categoryId).toBe(catId));
  });

  it('filters by tag', () => {
    const tagged = getProductsByTag('sale');
    expect(tagged.length).toBeGreaterThan(0);
    tagged.forEach((p) => expect(p.tags).toContain('sale'));
  });
});
