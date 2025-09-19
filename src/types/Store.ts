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
  reviewSummary: string;
  videoCallAvailable: boolean;
  videoCallHours?: string;
  hasPromotions: boolean;
  promotionText?: string;
  promotionType?: 'sale' | 'discount' | 'offer' | 'new';
  promotionDetails?: string;
  promotionValidTill?: string;
}