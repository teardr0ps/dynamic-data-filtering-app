export interface Product {
  id: number;
  brand: string;
  price: number;
  color: string;
  size: string;
  material: string;
  product_description: string;
  name: string;
}

export interface ProductsResponse {
  data: Product[];
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: number | null;
}

export interface ProductQuery {
  page: number;
  per_page: number;
  brand?: { name: string; value: string };
  color?: { name: string; value: string };
  size?: { name: string; value: string };
  material?: { name: string; value: string };
  priceValues?: number[];
  lowerPrice?: number;
  upperPrice?: number;
}
