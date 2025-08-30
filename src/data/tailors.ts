import { Tailor } from '../types/Tailor';

export const tailors: Tailor[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    businessName: 'Elite Custom Tailoring',
    address: '456 Fashion Avenue',
    city: 'Downtown',
    state: 'CA',
    zipCode: '90210',
    phone: '(555) 234-5678',
    rating: 4.9,
    reviews: 187,
    hours: {
      'Monday': '9:00 AM - 6:00 PM',
      'Tuesday': '9:00 AM - 6:00 PM',
      'Wednesday': '9:00 AM - 6:00 PM',
      'Thursday': '9:00 AM - 7:00 PM',
      'Friday': '9:00 AM - 7:00 PM',
      'Saturday': '10:00 AM - 5:00 PM',
      'Sunday': 'Closed'
    },
    specialties: ['Men\'s Suits', 'Wedding Attire', 'Formal Wear'],
    priceRange: '$$$',
    coordinates: {
      lat: 34.0522,
      lng: -118.2437
    },
    distance: 0.4,
    image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600',
    website: 'https://elitecustomtailoring.com',
    services: ['Custom Suits', 'Alterations', 'Formal Wear', 'Wedding Attire', 'Shirt Making'],
    experience: '15+ years',
    reviewSummary: 'Maria is renowned for her exceptional craftsmanship and attention to detail. Clients praise her ability to create perfectly fitted suits and her expertise in wedding attire. Her professional approach and timely delivery make her a top choice for custom tailoring.',
    isVerified: true,
    certifications: ['Master Tailor Certification', 'Bridal Wear Specialist'],
    turnaroundTime: '2-3 weeks',
    consultationFee: 50,
    portfolioImages: [
      'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1884582/pexels-photo-1884582.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    languages: ['English', 'Spanish']
  },
  {
    id: '2',
    name: 'James Chen',
    businessName: 'Precision Tailoring Studio',
    address: '789 Craft Street',
    city: 'Artisan District',
    state: 'CA',
    zipCode: '90211',
    phone: '(555) 345-6789',
    rating: 4.8,
    reviews: 156,
    hours: {
      'Monday': '10:00 AM - 7:00 PM',
      'Tuesday': '10:00 AM - 7:00 PM',
      'Wednesday': '10:00 AM - 7:00 PM',
      'Thursday': '10:00 AM - 8:00 PM',
      'Friday': '10:00 AM - 8:00 PM',
      'Saturday': '9:00 AM - 6:00 PM',
      'Sunday': '12:00 PM - 5:00 PM'
    },
    specialties: ['Business Attire', 'Casual Wear', 'Alterations'],
    priceRange: '$$',
    coordinates: {
      lat: 34.0622,
      lng: -118.2537
    },
    distance: 0.7,
    image: 'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=600',
    website: 'https://precisiontailoring.com',
    services: ['Custom Shirts', 'Suit Alterations', 'Hemming', 'Resizing', 'Repairs'],
    experience: '12+ years',
    reviewSummary: 'James is known for his precision and quick turnaround times. Customers appreciate his reasonable prices and excellent alteration work. His expertise in business attire makes him popular among professionals.',
    isVerified: true,
    certifications: ['Certified Tailor', 'Alteration Specialist'],
    turnaroundTime: '1-2 weeks',
    consultationFee: 25,
    portfolioImages: [
      'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    languages: ['English', 'Mandarin']
  },
  {
    id: '3',
    name: 'Sarah Thompson',
    businessName: 'Vintage & Modern Tailoring',
    address: '321 Heritage Lane',
    city: 'Historic Quarter',
    state: 'CA',
    zipCode: '90212',
    phone: '(555) 456-7890',
    rating: 4.7,
    reviews: 203,
    hours: {
      'Monday': 'Closed',
      'Tuesday': '11:00 AM - 6:00 PM',
      'Wednesday': '11:00 AM - 6:00 PM',
      'Thursday': '11:00 AM - 7:00 PM',
      'Friday': '11:00 AM - 7:00 PM',
      'Saturday': '10:00 AM - 6:00 PM',
      'Sunday': '12:00 PM - 4:00 PM'
    },
    specialties: ['Vintage Restoration', 'Women\'s Wear', 'Unique Designs'],
    priceRange: '$$$',
    coordinates: {
      lat: 34.0722,
      lng: -118.2637
    },
    distance: 1.2,
    image: 'https://images.pexels.com/photos/1884583/pexels-photo-1884583.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Vintage Restoration', 'Custom Dresses', 'Unique Alterations', 'Design Consultation'],
    experience: '20+ years',
    reviewSummary: 'Sarah specializes in vintage clothing restoration and unique custom designs. Her artistic approach and attention to historical accuracy make her the go-to tailor for special projects and vintage enthusiasts.',
    isVerified: true,
    certifications: ['Vintage Restoration Expert', 'Fashion Design Certificate'],
    turnaroundTime: '3-4 weeks',
    consultationFee: 75,
    portfolioImages: [
      'https://images.pexels.com/photos/1884583/pexels-photo-1884583.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    languages: ['English', 'French']
  },
  {
    id: '4',
    name: 'Roberto Silva',
    businessName: 'Silva\'s Master Tailoring',
    address: '654 Excellence Boulevard',
    city: 'Luxury District',
    state: 'CA',
    zipCode: '90213',
    phone: '(555) 567-8901',
    rating: 4.9,
    reviews: 124,
    hours: {
      'Monday': '9:00 AM - 6:00 PM',
      'Tuesday': '9:00 AM - 6:00 PM',
      'Wednesday': '9:00 AM - 6:00 PM',
      'Thursday': '9:00 AM - 6:00 PM',
      'Friday': '9:00 AM - 6:00 PM',
      'Saturday': '10:00 AM - 4:00 PM',
      'Sunday': 'By Appointment'
    },
    specialties: ['Luxury Suits', 'Italian Tailoring', 'Bespoke Clothing'],
    priceRange: '$$$$',
    coordinates: {
      lat: 34.0422,
      lng: -118.2337
    },
    distance: 0.9,
    image: 'https://images.pexels.com/photos/1884585/pexels-photo-1884585.jpeg?auto=compress&cs=tinysrgb&w=600',
    website: 'https://silvasmastertailoring.com',
    services: ['Bespoke Suits', 'Italian Style Tailoring', 'Luxury Alterations', 'Personal Styling'],
    experience: '25+ years',
    reviewSummary: 'Roberto brings traditional Italian tailoring techniques to create exceptional bespoke clothing. His attention to detail and use of premium fabrics result in truly luxurious garments. Clients value his expertise and craftsmanship.',
    isVerified: true,
    certifications: ['Master Tailor - Italy', 'Bespoke Specialist', 'Luxury Garment Expert'],
    turnaroundTime: '4-6 weeks',
    consultationFee: 100,
    portfolioImages: [
      'https://images.pexels.com/photos/1884585/pexels-photo-1884585.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    languages: ['English', 'Italian', 'Spanish']
  },
  {
    id: '5',
    name: 'Emily Park',
    businessName: 'Modern Fit Tailoring',
    address: '987 Contemporary Way',
    city: 'Modern Plaza',
    state: 'CA',
    zipCode: '90214',
    phone: '(555) 678-9012',
    rating: 4.6,
    reviews: 178,
    hours: {
      'Monday': '10:00 AM - 7:00 PM',
      'Tuesday': '10:00 AM - 7:00 PM',
      'Wednesday': '10:00 AM - 7:00 PM',
      'Thursday': '10:00 AM - 8:00 PM',
      'Friday': '10:00 AM - 8:00 PM',
      'Saturday': '9:00 AM - 6:00 PM',
      'Sunday': '11:00 AM - 5:00 PM'
    },
    specialties: ['Modern Fits', 'Contemporary Styles', 'Quick Alterations'],
    priceRange: '$$',
    coordinates: {
      lat: 34.0822,
      lng: -118.2737
    },
    distance: 1.5,
    image: 'https://images.pexels.com/photos/1884586/pexels-photo-1884586.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Modern Suit Tailoring', 'Quick Alterations', 'Contemporary Styling', 'Fit Consultation'],
    experience: '8+ years',
    reviewSummary: 'Emily specializes in modern, contemporary fits that appeal to younger professionals. Her quick turnaround times and understanding of current fashion trends make her popular for modern tailoring needs.',
    isVerified: true,
    certifications: ['Contemporary Tailoring Certificate', 'Quick Alteration Specialist'],
    turnaroundTime: '1 week',
    consultationFee: 30,
    portfolioImages: [
      'https://images.pexels.com/photos/1884586/pexels-photo-1884586.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    languages: ['English', 'Korean']
  },
  {
    id: '6',
    name: 'David Kumar',
    businessName: 'Heritage Tailoring House',
    address: '147 Traditional Street',
    city: 'Cultural District',
    state: 'CA',
    zipCode: '90215',
    phone: '(555) 789-0123',
    rating: 4.8,
    reviews: 145,
    hours: {
      'Monday': '9:30 AM - 6:30 PM',
      'Tuesday': '9:30 AM - 6:30 PM',
      'Wednesday': '9:30 AM - 6:30 PM',
      'Thursday': '9:30 AM - 7:00 PM',
      'Friday': '9:30 AM - 7:00 PM',
      'Saturday': '10:00 AM - 5:00 PM',
      'Sunday': 'Closed'
    },
    specialties: ['Traditional Wear', 'Cultural Attire', 'Formal Suits'],
    priceRange: '$$',
    coordinates: {
      lat: 34.0322,
      lng: -118.2237
    },
    distance: 1.8,
    image: 'https://images.pexels.com/photos/1884582/pexels-photo-1884582.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Traditional Clothing', 'Cultural Wear', 'Formal Suits', 'Ceremonial Attire'],
    experience: '18+ years',
    reviewSummary: 'David specializes in traditional and cultural attire alongside formal Western wear. His expertise in various cultural clothing styles and attention to traditional craftsmanship techniques make him unique in the area.',
    isVerified: true,
    certifications: ['Traditional Tailoring Master', 'Cultural Wear Specialist'],
    turnaroundTime: '2-3 weeks',
    consultationFee: 40,
    portfolioImages: [
      'https://images.pexels.com/photos/1884582/pexels-photo-1884582.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    languages: ['English', 'Hindi', 'Punjabi']
  }
];