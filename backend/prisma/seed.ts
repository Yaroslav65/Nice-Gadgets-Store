import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import prisma from '../src/db/prisma';
import { Prisma } from '@prisma/client';

const toJson = (value: unknown): Prisma.InputJsonValue =>
  value as Prisma.InputJsonValue;

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

interface DescriptionBlock {
  title: string;
  text: string[];
}

interface ProductDetailsSeed {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionBlock[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
}

const detailFiles = ['phones', 'tablets', 'accessories'];
const detailsFileCandidates = (fileName: string) => [
  path.resolve(process.cwd(), `frontend/public/api/${fileName}.json`),
  path.resolve(process.cwd(), `../frontend/public/api/${fileName}.json`),
];

const allDetails: ProductDetailsSeed[] = detailFiles.flatMap((file) => {
  const filePath = detailsFileCandidates(file).find(fs.existsSync);

  if (!filePath) {
    throw new Error('Category is not found')
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
});

const detailsById = new Map(allDetails.map(d => [d.id, d]));


const productsFileCandidates = [
  path.resolve(process.cwd(), 'frontend/public/api/products_updated.json'),
  path.resolve(process.cwd(), '../frontend/public/api/products_updated.json'),
];
const productsFilePath = productsFileCandidates.find((candidate) =>
  fs.existsSync(candidate),
);
if (!productsFilePath) {
  throw new Error('Products are not found');
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
  categorySlug: prod.category,
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

    const detail = detailsById.get(product.itemId);

    if (!detail) {
      throw new Error('Details not found');
    }

    await prisma.productDetails.upsert({
      where: { itemId: product.itemId },
      create: {
        itemId: product.itemId,
        category: detail.category,
        namespaceId: detail.namespaceId,
        name: detail.name,
        capacityAvailable: detail.capacityAvailable,
        capacity: detail.capacity,
        priceRegular: detail.priceRegular,
        priceDiscount: detail.priceDiscount,
        colorsAvailable: detail.colorsAvailable,
        color: detail.color,
        images: detail.images,
        description: toJson(detail.description),
        screen: detail.screen,
        resolution: detail.resolution,
        processor: detail.processor,
        ram: detail.ram,
        camera: detail.camera ?? null,
        zoom: detail.zoom ?? null,
        cell: detail.cell,
      },
      update: {
        category: detail.category,
        namespaceId: detail.namespaceId,
        name: detail.name,
        capacityAvailable: detail.capacityAvailable,
        capacity: detail.capacity,
        priceRegular: detail.priceRegular,
        priceDiscount: detail.priceDiscount,
        colorsAvailable: detail.colorsAvailable,
        color: detail.color,
        images: detail.images,
        description: toJson(detail.description),
        screen: detail.screen,
        resolution: detail.resolution,
        processor: detail.processor,
        ram: detail.ram,
        camera: detail.camera ?? null,
        zoom: detail.zoom ?? null,
        cell: detail.cell,
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
