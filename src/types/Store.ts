export interface Store {
  id: string;
  name: string;
  brand: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  rating: number;
  reviews: number;
  hours: {
    [key: string]: string;
  };
  categories: string[];
  priceRange: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance: number;
  image: string;
  website?: string;
  features: string[];
  hasPromotions: boolean;
  promotionType: 'sale' | 'discount' | 'offer' | 'new' | 'none';
  promotionText: string;
  promotionDetails?: string;
  promotionValidTill?: string;
  videoCallAvailable: boolean;
  videoCallHours?: string;
  reviewSummary: string;
}