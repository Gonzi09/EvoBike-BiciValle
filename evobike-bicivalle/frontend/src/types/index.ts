export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  inStock: boolean;
  category: 'bicicleta' | 'scooter' | 'triciclo';
  tags: string[];
  description: string;
  specs: { label: string; value: string }[];
  variants?: { color: string; available: boolean }[];
  badge?: string;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface Filters {
  category?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'popular' | 'newest';
}

export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: 'card' | 'pse' | 'cash' | 'paypal';
}