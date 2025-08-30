export interface Tailor {
  id: string;
  name: string;
  businessName: string;
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
  specialties: string[];
  priceRange: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance: number;
  image: string;
  website?: string;
  services: string[];
  experience: string;
  reviewSummary: string;
  isVerified: boolean;
  certifications: string[];
  turnaroundTime: string;
  consultationFee: number;
  portfolioImages: string[];
  languages: string[];
}