import { Product, ProductDetails } from './types/Product';

const USE_LOCAL_DATA = import.meta.env.VITE_USE_LOCAL_DATA !== 'false';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5055').replace(
  /\/$/,
  '',
);
const API_URL = `${API_BASE_URL}/api/products`;
const API_CATEGORIES = `${API_BASE_URL}/api/categories`;

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const LOCAL_PRODUCTS_URL = `${BASE_URL}api/products_updated.json`;
const LOCAL_DETAILS_URLS = [
  `${BASE_URL}api/phones.json`,
  `${BASE_URL}api/tablets.json`,
  `${BASE_URL}api/accessories.json`,
];

let localProductsCache: LocalProduct[] | null = null;
let localDetailsCache: ProductDetails[] | null = null;
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
};

type LocalProduct = {
  id: number | string;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string[];
};

const fetchJson = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load data: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

const loadLocalProducts = async (): Promise<LocalProduct[]> => {
  if (localProductsCache) {
    return localProductsCache;
  }

  const data = await fetchJson<LocalProduct[]>(LOCAL_PRODUCTS_URL);
  localProductsCache = data;
  return data;
};

const loadLocalDetails = async (): Promise<ProductDetails[]> => {
  if (localDetailsCache) {
    return localDetailsCache;
  }

  const detailsArrays = await Promise.all(
    LOCAL_DETAILS_URLS.map((url) => fetchJson<ProductDetails[]>(url)),
  );

  localDetailsCache = detailsArrays.flat();
  return localDetailsCache;
};

export async function getCategories(): Promise<Category[]> {
  if (USE_LOCAL_DATA) {
    return [
      { id: 'phones', name: 'Phones', slug: 'phones' },
      { id: 'tablets', name: 'Tablets', slug: 'tablets' },
      { id: 'accessories', name: 'Accessories', slug: 'accessories' },
    ];
  }

  return fetchJson<Category[]>(API_CATEGORIES);
}
export async function getProductDetails(itemId: string): Promise<ProductDetails> {
  if (USE_LOCAL_DATA) {
    const details = await loadLocalDetails();
    const found = details.find((item) => item.id === itemId);

    if (!found) {
      throw new Error('Product not found');
    }

    return found;
  }

  return fetchJson<ProductDetails>(`${API_URL}/${itemId}`);
}

export async function getProduct(): Promise<Product[]> {
  if (USE_LOCAL_DATA) {
    const data = await loadLocalProducts();

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
      category: p.category,
      image: p.image,
      img: p.image[0] ?? '',
      specs: [
        { name: 'Screen', value: p.screen },
        { name: 'Capacity', value: p.capacity },
        { name: 'RAM', value: p.ram },
      ],
    }));
  }

  const data = await fetchJson<ApiProduct[]>(API_URL);

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
