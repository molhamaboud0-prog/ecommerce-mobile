const unsplash = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

/** Grocery aisle covers — verified Unsplash IDs */
export const categoryImages: Record<string, string> = {
  'cat-fruits': unsplash('photo-1619566636858-adf3ef46400b'),
  'cat-vegetables': unsplash('photo-1540420773420-3366772f4999'),
  'cat-dairy': unsplash('photo-1550583724-b2692b85b150'),
  'cat-bakery': unsplash('photo-1509440159596-0249088772ff'),
  'cat-drinks': unsplash('photo-1544145945-f90425340c7e'),
  'cat-meat': unsplash('photo-1607623814075-e51df1bdc82f'),
};

/**
 * Food product photos. Keys match catalog `visualKey` in products.ts.
 */
export const productVisuals: Record<string, [string, string]> = {
  apples: [
    unsplash('photo-1560806887-1e4cd0b6cbd6'),
    unsplash('photo-1570913149827-d2ac84ab3f9a'),
  ],
  bananas: [
    unsplash('photo-1571771894821-ce9b6c11b08e'),
    unsplash('photo-1553279768-865429fa0078'),
  ],
  oranges: [
    unsplash('photo-1547514701-42782101795e'),
    unsplash('photo-1600271886742-f049cd451bba'),
  ],
  strawberries: [
    unsplash('photo-1464965911861-746a04b4bca6'),
    unsplash('photo-1518635017498-87f514b751ba'),
  ],
  grapes: [
    unsplash('photo-1596363505729-4190a9506133'),
    unsplash('photo-1619566636858-adf3ef46400b'),
  ],
  mango: [
    unsplash('photo-1553279768-865429fa0078'),
    unsplash('photo-1547514701-42782101795e'),
  ],
  tomatoes: [
    unsplash('photo-1592924357228-91a4daadcfea'),
    unsplash('photo-1563565375-f3fdfdbefa83'),
  ],
  cucumbers: [
    unsplash('photo-1449300079323-02e209d9d3a6'),
    unsplash('photo-1540420773420-3366772f4999'),
  ],
  carrots: [
    unsplash('photo-1598170845058-32b9d6a5da37'),
    unsplash('photo-1518977676601-b53f82aba655'),
  ],
  lettuce: [
    unsplash('photo-1622206151226-18ca2c9ab4a1'),
    unsplash('photo-1540420773420-3366772f4999'),
  ],
  peppers: [
    unsplash('photo-1563565375-f3fdfdbefa83'),
    unsplash('photo-1526470498-9ae73c665de8'),
  ],
  potatoes: [
    unsplash('photo-1518977676601-b53f82aba655'),
    unsplash('photo-1590165482129-1b8b27698780'),
  ],
  milk: [
    unsplash('photo-1563636619-e9143da7973b'),
    unsplash('photo-1550583724-b2692b85b150'),
  ],
  cheese: [
    unsplash('photo-1486297678162-eb2a19b0a32d'),
    unsplash('photo-1452195100486-9cc805987862'),
  ],
  yogurt: [
    unsplash('photo-1488477181946-6428a0291777'),
    unsplash('photo-1550583724-b2692b85b150'),
  ],
  eggs: [
    unsplash('photo-1582722872445-44dc5f7e3c8f'),
    unsplash('photo-1452195100486-9cc805987862'),
  ],
  butter: [
    unsplash('photo-1589985270826-4b7bb135bc9d'),
    unsplash('photo-1486297678162-eb2a19b0a32d'),
  ],
  bread: [
    unsplash('photo-1509440159596-0249088772ff'),
    unsplash('photo-1549931319-a545dcf3bc73'),
  ],
  croissant: [
    unsplash('photo-1555507036-ab1f4038808a'),
    unsplash('photo-1623334044303-241021148842'),
  ],
  cake: [
    unsplash('photo-1578985545062-69928b1d9587'),
    unsplash('photo-1558961363-fa8fdf82db35'),
  ],
  cookies: [
    unsplash('photo-1499636136210-6f4ee915583e'),
    unsplash('photo-1558961363-fa8fdf82db35'),
  ],
  baguette: [
    unsplash('photo-1549931319-a545dcf3bc73'),
    unsplash('photo-1509440159596-0249088772ff'),
  ],
  juice: [
    unsplash('photo-1622597467836-f3285f2131b8'),
    unsplash('photo-1600271886742-f049cd451bba'),
  ],
  coffee: [
    unsplash('photo-1495474472287-4d71bcdd2085'),
    unsplash('photo-1514432324607-a09d9b4aefdd'),
  ],
  tea: [
    unsplash('photo-1514432324607-a09d9b4aefdd'),
    unsplash('photo-1495474472287-4d71bcdd2085'),
  ],
  water: [
    unsplash('photo-1548839140-29a749e1cf4d'),
    unsplash('photo-1523362628745-0c100150b504'),
  ],
  soda: [
    unsplash('photo-1544145945-f90425340c7e'),
    unsplash('photo-1600271886742-f049cd451bba'),
  ],
  chicken: [
    unsplash('photo-1587593810167-a84920ea0781'),
    unsplash('photo-1604503468506-a8da13d82791'),
  ],
  beef: [
    unsplash('photo-1607623814075-e51df1bdc82f'),
    unsplash('photo-1432139509613-5c4255815697'),
  ],
  fish: [
    unsplash('photo-1519708227418-c8fd9a32b7a2'),
    unsplash('photo-1534766555764-ce878a5e3a2b'),
  ],
  shrimp: [
    unsplash('photo-1559737558-2f5a35f4523b'),
    unsplash('photo-1551248429-40975aa4de74'),
  ],
};

const fallbackImages = productVisuals.apples!;

export function getProductImagesByKey(visualKey: string): [string, string] {
  return productVisuals[visualKey] ?? fallbackImages;
}

/** @deprecated Prefer getProductImagesByKey */
export function getProductImages(categoryId: string, index: number): [string, string] {
  const keys = Object.keys(productVisuals);
  const key = keys[index % keys.length]!;
  return getProductImagesByKey(key);
}

export function getCategoryImage(categoryId: string): string {
  return categoryImages[categoryId] ?? categoryImages['cat-fruits']!;
}
