export interface Product {
  id: string;
  name: string;
  brand: string;
  platform: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  occasions: string[];
  reviewSummary: string;
  deliveryTime: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface SearchFilters {
  category: string;
  priceRange: [number, number];
  minRating: number;
  brands: string[];
  sizes: string[];
  colors: string[];
  platforms: string[];
  inStock: boolean;
  deliveryTime: string;
}