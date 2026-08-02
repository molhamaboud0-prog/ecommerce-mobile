const unsplash = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

/** Category cover images — match the aisle they represent */
export const categoryImages: Record<string, string> = {
  'cat-electronics': unsplash('photo-1498049794561-7780e7231661'),
  'cat-fashion': unsplash('photo-1483985988355-763728e1935b'),
  'cat-home': unsplash('photo-1586023492125-27b2c045efd7'),
  'cat-sports': unsplash('photo-1517836357463-d25dfeac3438'),
  'cat-beauty': unsplash('photo-1612817288484-6f916006741a'),
  'cat-books': unsplash('photo-1495446815901-a7297e633e8d'),
};

/**
 * Realistic product-type photos. Keys match catalog `visualKey` in products.ts.
 * Each entry is [primary, secondary] for gallery swipe.
 */
export const productVisuals: Record<string, [string, string]> = {
  headphones: [
    unsplash('photo-1505740420928-5e560c06d30e'),
    unsplash('photo-1484704849700-f032a568e944'),
  ],
  smartwatch: [
    unsplash('photo-1523275335684-37898b6baf30'),
    unsplash('photo-1546868871-7041f2a55e12'),
  ],
  earbuds: [
    unsplash('photo-1590658268037-6bf12165a8df'),
    unsplash('photo-1606220945770-b5b6c2c55bf1'),
  ],
  speaker: [
    unsplash('photo-1608043152269-423dbba4e7e1'),
    unsplash('photo-1545454675-3531b543be5d'),
  ],
  laptop: [
    unsplash('photo-1496181133206-80ce9b88a853'),
    unsplash('photo-1517336714731-489689fd1ca8'),
  ],
  phone: [
    unsplash('photo-1511707171634-5f897ff02aa9'),
    unsplash('photo-1592899677977-9c10ca588bbd'),
  ],
  tshirt: [
    unsplash('photo-1521572163474-6864f9cf17ab'),
    unsplash('photo-1583743814966-8936f5b7be1a'),
  ],
  jeans: [
    unsplash('photo-1542272604-787c3835535d'),
    unsplash('photo-1604176354204-9268737828e4'),
  ],
  jacket: [
    unsplash('photo-1551028719-00167b16eac5'),
    unsplash('photo-1591047139829-d91aecb6caea'),
  ],
  sneakers: [
    unsplash('photo-1549298916-b41d501d3772'),
    unsplash('photo-1460353581641-37baddab0fa2'),
  ],
  dress: [
    unsplash('photo-1595777457583-95e059d581b8'),
    unsplash('photo-1566174053879-31528523f8ae'),
  ],
  hoodie: [
    unsplash('photo-1556821840-3a63f95609a7'),
    unsplash('photo-1556905055-8f358a7a47b2'),
  ],
  sofa: [
    unsplash('photo-1555041469-a586c61ea9bc'),
    unsplash('photo-1493663284031-b7e3aefcae8e'),
  ],
  lamp: [
    unsplash('photo-1507473885765-e6ed057f782c'),
    unsplash('photo-1513506003901-1e6a229e2d15'),
  ],
  coffeeMaker: [
    unsplash('photo-1517668808822-9ebb02f2a0e6'),
    unsplash('photo-1495474472287-4d71bcdd2085'),
  ],
  vase: [
    unsplash('photo-1578500494198-246f612d3b3d'),
    unsplash('photo-1581783342308-f792dbdd27c5'),
  ],
  candles: [
    unsplash('photo-1603006905003-be475563bc59'),
    unsplash('photo-1558618666-fcd25c85cd64'),
  ],
  bedding: [
    unsplash('photo-1631049307264-da0ec9d70304'),
    unsplash('photo-1522771739844-6a9f6d5f14af'),
  ],
  runningShoes: [
    unsplash('photo-1542291026-7eec264c27ff'),
    unsplash('photo-1460353581641-37baddab0fa2'),
  ],
  yogaMat: [
    unsplash('photo-1601925260368-ae2f83cf8b7f'),
    unsplash('photo-1592432678016-e910b452f9a2'),
  ],
  dumbbells: [
    unsplash('photo-1517836357463-d25dfeac3438'),
    unsplash('photo-1576678927484-cc907957088c'),
  ],
  bike: [
    unsplash('photo-1571068316344-75bc76f77890'),
    unsplash('photo-1571333250630-f0230c320b6d'),
  ],
  ball: [
    unsplash('photo-1574629810360-7efbbe195018'),
    unsplash('photo-1579952363873-27f3bade9f55'),
  ],
  waterBottle: [
    unsplash('photo-1602143407151-7111542de6e8'),
    unsplash('photo-1523362628745-0c100150b504'),
  ],
  perfume: [
    unsplash('photo-1541643600914-78b084683601'),
    unsplash('photo-1588405748880-12d1d2a59f75'),
  ],
  serum: [
    unsplash('photo-1611930022073-b7a4ba5fcccd'),
    unsplash('photo-1571781926291-c477ebfd024b'),
  ],
  lipstick: [
    unsplash('photo-1580870069867-74c57ee1bb07'),
    unsplash('photo-1631214524020-7e18db9a8f92'),
  ],
  skincare: [
    unsplash('photo-1556228578-0d85b1a4d571'),
    unsplash('photo-1616394584738-fc6e612e71b9'),
  ],
  makeup: [
    unsplash('photo-1522335789203-aabd1fc54bc9'),
    unsplash('photo-1512496015851-a90fb38ba796'),
  ],
  novel: [
    unsplash('photo-1544947950-fa07a98d237f'),
    unsplash('photo-1512820790803-83ca734da794'),
  ],
  textbook: [
    unsplash('photo-1495446815901-a7297e633e8d'),
    unsplash('photo-1481627834876-b7833e8f5570'),
  ],
  notebook: [
    unsplash('photo-1531346680769-a1d79b57de5c'),
    unsplash('photo-1517842645767-c639042777db'),
  ],
  comics: [
    unsplash('photo-1612036782180-6f0b6cd846fe'),
    unsplash('photo-1476275466078-4007374efbbe'),
  ],
};

const fallbackImages = productVisuals.headphones!;

export function getProductImagesByKey(visualKey: string): [string, string] {
  return productVisuals[visualKey] ?? fallbackImages;
}

/** @deprecated Prefer getProductImagesByKey — kept for older call sites */
export function getProductImages(categoryId: string, index: number): [string, string] {
  const keys = Object.keys(productVisuals);
  const key = keys[index % keys.length]!;
  return getProductImagesByKey(key);
}

export function getCategoryImage(categoryId: string): string {
  return categoryImages[categoryId] ?? categoryImages['cat-electronics']!;
}
