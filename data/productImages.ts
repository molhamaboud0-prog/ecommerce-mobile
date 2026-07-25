const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=600&q=80`;

export const categoryImages: Record<string, string> = {
  'cat-electronics': unsplash('photo-1498049794561-7780e7231661'),
  'cat-fashion': unsplash('photo-1445205170230-053b83016050'),
  'cat-home': unsplash('photo-1586023492125-27b2c045efd7'),
  'cat-sports': unsplash('photo-1461896836934-ffe607ba8121'),
  'cat-beauty': unsplash('photo-1596462502278-27bfad403625'),
  'cat-books': unsplash('photo-1495446815901-a7297e633e8d'),
};

const productImagePool: Record<string, string[]> = {
  'cat-electronics': [
    unsplash('photo-1505740420928-5e560c06d30e'),
    unsplash('photo-1523275335684-37898b6baf30'),
    unsplash('photo-1572569511254-d8f925fe2cbb'),
    unsplash('photo-1546868871-7041f2a55e12'),
    unsplash('photo-1593642632823-8f785ba67e45'),
    unsplash('photo-1484704849700-f032a568e944'),
  ],
  'cat-fashion': [
    unsplash('photo-1515886657613-9f3515b0c78f'),
    unsplash('photo-1521572163474-6864f9cf17ab'),
    unsplash('photo-1551028719-00167b16eac5'),
    unsplash('photo-1434389677669-e08b4cac3105'),
    unsplash('photo-1490481651871-ab68de25d43d'),
    unsplash('photo-1469334031218-e382a71b716b'),
  ],
  'cat-home': [
    unsplash('photo-1555041469-a586c61ea9bc'),
    unsplash('photo-1586023492125-27b2c045efd7'),
    unsplash('photo-1616486338812-3adaa4b4dace'),
    unsplash('photo-1618221195710-dd6b41fa5246'),
    unsplash('photo-1615874959473-aaf16c9a0dfa'),
    unsplash('photo-1616628188855-134cfcd6b684'),
  ],
  'cat-sports': [
    unsplash('photo-1542291026-7eec264c27ff'),
    unsplash('photo-1606107557195-0a029484a340'),
    unsplash('photo-1461896836934-ffe607ba8121'),
    unsplash('photo-1571019614242-c5c5dee9f50b'),
    unsplash('photo-1517836357463-d25dfeac3438'),
    unsplash('photo-1517649763962-0c623066013b'),
  ],
  'cat-beauty': [
    unsplash('photo-1596462502278-27bfad403625'),
    unsplash('photo-1571781926291-c477ebfd024b'),
    unsplash('photo-1522335789203-aabd1fc54bc9'),
    unsplash('photo-1596755389378-c175a37e6f9a'),
    unsplash('photo-1570172619644-dfd955dafd0c'),
    unsplash('photo-1522337360788-8b13eee7a7e2'),
  ],
  'cat-books': [
    unsplash('photo-1495446815901-a7297e633e8d'),
    unsplash('photo-1516979187450-13bba9f9f2b9'),
    unsplash('photo-1544947950-fa07a98d237f'),
    unsplash('photo-1519682337058-a94d519337bc'),
    unsplash('photo-1481627834876-b7833e8f5570'),
    unsplash('photo-1507003211169-0a1dd7228f2d'),
  ],
};

const fallbackPool = productImagePool['cat-electronics']!;

export function getProductImages(categoryId: string, index: number): [string, string] {
  const pool = productImagePool[categoryId] ?? fallbackPool;
  const primary = pool[index % pool.length]!;
  const secondary = pool[(index + 1) % pool.length]!;
  return [primary, secondary];
}

export function getCategoryImage(categoryId: string): string {
  return categoryImages[categoryId] ?? categoryImages['cat-electronics']!;
}
