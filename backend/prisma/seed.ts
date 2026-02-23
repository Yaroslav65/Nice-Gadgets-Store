import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import prisma from '../src/db/prisma';

type ProductSeed = {
  name: string,
  slug: string,
  itemId: string,
  price: number,
  fullPrice: number,
  screen: string,
  capacity: string,
  color: string,
  ram: string,
  year: number,
  images: string[],
  stock: number,
  categorySlug: string,
}

type CategorySeed = {
  name: string,
  slug: string,
}

interface ProductJson {
  id: number,
  category: string,
  itemId: string,
  name: string,
  fullPrice: number,
  price: number,
  screen: string,
  capacity: string,
  color: string,
  ram: string,
  year: number,
  image: string[],
}

const productsFileCandidates = [
  path.resolve(process.cwd(), 'frontend/public/api/products_updated.json'),
  path.resolve(process.cwd(), '../frontend/public/api/products_updated.json'),
];
const productsFilePath = productsFileCandidates.find((candidate) =>
  fs.existsSync(candidate),
);
if (!productsFilePath) {
  throw new Error('products_updated.json not found in frontend/public/api');
}
const productsData = fs.readFileSync(productsFilePath, 'utf-8');
const jsonProducts: ProductJson[] = JSON.parse(productsData);
const products: ProductSeed[] = jsonProducts.map((prod) => ({
  name: prod.name,
  slug: prod.itemId,
  itemId: prod.itemId,
  price: prod.price,
  fullPrice: prod.fullPrice,
  screen: prod.screen,
  capacity: prod.capacity,
  color: prod.color,
  ram: prod.ram,
  year: prod.year,
  images: prod.image,
  stock: 100,
  categorySlug: prod.category
}));

const categories: CategorySeed[] = [
  { name: 'Phones', slug: 'phones' },
  { name: 'Tablets', slug: 'tablets' },
  { name: 'Accessories', slug: 'accessories' },
];


async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      create: {
        name: category.name,
        slug: category.slug
      },
      update: {
        name: category.name,
      },
    })
  }

  for (const product of products) {
    const category = await prisma.category.findUnique({
      where: { slug: product.categorySlug },
      select: { id: true, slug: true },
    });

    if (!category) {
      throw new Error(`Category not found: ${product.categorySlug}`);
    }

    await prisma.product.upsert({
      where: { itemId: product.itemId },
      create: {
        name: product.name,
        slug: product.slug,
        itemId: product.itemId,
        price: product.price,
        fullPrice: product.fullPrice,
        screen: product.screen,
        capacity: product.capacity,
        color: product.color,
        ram: product.ram,
        year: product.year,
        images: product.images,
        stock: product.stock,
        categoryId: category.id,
      },
      update: {
        name: product.name,
        slug: product.slug,
        itemId: product.itemId,
        price: product.price,
        fullPrice: product.fullPrice,
        screen: product.screen,
        capacity: product.capacity,
        color: product.color,
        ram: product.ram,
        year: product.year,
        images: product.images,
        stock: product.stock,
        categoryId: category.id,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed completed');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
