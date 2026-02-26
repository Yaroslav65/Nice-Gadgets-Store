import { Product, ProductDetails } from './types/Product';

// eslint-disable-next-line operator-linebreak
const API_URL = 'http://127.0.0.1:5055/api/products';
const API_CATEGORIES = 'http://127.0.0.1:5055/api/categories';

type ApiProduct = {
  id: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  images: string[];
  category: { slug: string };
};

type Category = {
  id: string;
  name: string;
  slug: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(API_CATEGORIES);

  if (!response.ok) {
    throw new Error('Failed to load categories');
  }

  const data: Category[] = await response.json();

  return data;
}

export async function getProductDetails(itemId: string): Promise<ProductDetails> {
  const response = await fetch(`${API_URL}/${itemId}`)

   if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status}`);
  }

  const data: ProductDetails = await response.json();

  return data;
}

export async function getProduct(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status}`);
  }

  const data: ApiProduct[] = await response.json();

  return data.map((p) => ({
    id: p.id,
    itemId: p.itemId,
    name: p.name,
    fullPrice: p.fullPrice,
    price: p.price,
    screen: p.screen,
    capacity: p.capacity,
    color: p.color,
    ram: p.ram,
    year: p.year,
    category: typeof p.category === 'string' ? p.category : p.category.slug,
    image: p.images,
    img: p.images[0] ?? '',
    specs: [
      { name: 'Screen', value: p.screen },
      { name: 'Capacity', value: p.capacity },
      { name: 'RAM', value: p.ram },
    ],
  }));
}

