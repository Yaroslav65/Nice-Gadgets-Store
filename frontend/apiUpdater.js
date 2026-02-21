import fs from 'fs';
import path from 'path';

const apiDir = path.resolve('./public/api');

const products = JSON.parse(
  fs.readFileSync(path.join(apiDir, 'products.json'), 'utf8'),
);
const phones = JSON.parse(
  fs.readFileSync(path.join(apiDir, 'phones.json'), 'utf8'),
);
const tablets = JSON.parse(
  fs.readFileSync(path.join(apiDir, 'tablets.json'), 'utf8'),
);
const accessories = JSON.parse(
  fs.readFileSync(path.join(apiDir, 'accessories.json'), 'utf8'),
);

const detailsById = {};
[...phones, ...tablets, ...accessories].forEach(p => {
  detailsById[p.id] = p;
});

const updated = products.map(item => {
  const details = detailsById[item.itemId];

  const images =
    details?.images && details.images.length > 0
      ? details.images.slice(0, 2)
      : [`00.webp`];

  const normalized = images.map(img => {
    if (img.startsWith('img/')) return img;

    return `img/${item.category}/${item.itemId}/${img}`;
  });

  return {
    ...item,
    image: normalized,
  };
});

fs.writeFileSync(
  path.join(apiDir, 'products_updated.json'),
  JSON.stringify(updated, null, 2),
);
