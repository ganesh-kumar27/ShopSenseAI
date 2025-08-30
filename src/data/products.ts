import { Product } from '../types/Product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Black Cotton T-Shirt',
    brand: 'Essential',
    platform: 'Myntra',
    category: 'T-Shirts',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Premium quality black cotton t-shirt with perfect fit and comfort. Made from 100% organic cotton.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    tags: ['casual', 'cotton', 'basic', 'black', 'shirt'],
    occasions: ['casual', 'weekend', 'everyday', 'travel'],
    reviewSummary: 'Customers love the soft cotton fabric and perfect fit. Many praise its durability and comfort for daily wear. Great value for money with excellent quality.',
    deliveryTime: '2-3 days'
  },
  {
    id: '2',
    name: 'Black Formal Dress Shirt',
    brand: 'FormalWear',
    platform: 'Flipkart',
    category: 'Shirts',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Elegant black formal dress shirt perfect for office wear and special occasions. Wrinkle-free fabric.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    rating: 4.8,
    reviews: 89,
    inStock: true,
    tags: ['formal', 'dress shirt', 'office', 'black', 'shirt'],
    occasions: ['office', 'business', 'formal', 'meetings', 'interviews'],
    reviewSummary: 'Professional appearance with wrinkle-free fabric that maintains its crisp look all day. Perfect for office wear and formal occasions. Excellent tailoring and fit.',
    deliveryTime: '1-2 days'
  },
  {
    id: '3',
    name: 'Black Polo Shirt',
    brand: 'SportStyle',
    platform: 'Amazon',
    category: 'Polo Shirts',
    price: 45.99,
    originalPrice: 55.99,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Classic black polo shirt with moisture-wicking fabric. Perfect for casual and semi-formal occasions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    tags: ['polo', 'casual', 'sport', 'black', 'shirt'],
    occasions: ['casual', 'sports', 'weekend', 'golf', 'outdoor'],
    reviewSummary: 'Great moisture-wicking properties make it perfect for active wear. Comfortable collar and breathable fabric. Maintains shape after multiple washes.',
    deliveryTime: '3-5 days'
  },
  {
    id: '4',
    name: 'Black Henley Shirt',
    brand: 'CasualFit',
    platform: 'Meesho',
    category: 'Casual Shirts',
    price: 35.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Comfortable black henley shirt with button placket. Perfect for layering or wearing alone.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    rating: 4.4,
    reviews: 67,
    inStock: true,
    tags: ['henley', 'casual', 'comfortable', 'black', 'shirt'],
    occasions: ['casual', 'weekend', 'date', 'relaxed'],
    reviewSummary: 'Stylish button placket design with incredibly soft fabric. Perfect for layering or wearing alone. Customers appreciate the relaxed fit and comfort.',
    deliveryTime: '5-7 days'
  },
  {
    id: '5',
    name: 'Black Long Sleeve Shirt',
    brand: 'UrbanStyle',
    platform: 'Myntra',
    category: 'Long Sleeve Shirts',
    price: 49.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Stylish black long sleeve shirt with modern fit. Great for cooler weather and layering.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    rating: 4.7,
    reviews: 92,
    inStock: true,
    tags: ['long sleeve', 'modern', 'layering', 'black', 'shirt'],
    occasions: ['casual', 'layering', 'fall', 'spring', 'smart casual'],
    reviewSummary: 'Modern slim fit with excellent sleeve length. Great for layering in cooler weather. High-quality fabric that feels premium and looks stylish.',
    deliveryTime: '2-3 days'
  },
  {
    id: '6',
    name: 'Black Button-Down Shirt',
    brand: 'ClassicWear',
    platform: 'Amazon',
    category: 'Button-Down Shirts',
    price: 54.99,
    image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Classic black button-down shirt with clean lines. Versatile piece for any wardrobe.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    rating: 4.5,
    reviews: 203,
    inStock: true,
    tags: ['button-down', 'classic', 'versatile', 'black', 'shirt'],
    occasions: ['business casual', 'office', 'dinner', 'smart casual', 'versatile'],
    reviewSummary: 'Timeless design that works for both casual and semi-formal occasions. Well-constructed with attention to detail. Customers love its versatility.',
    deliveryTime: '1-2 days'
  },
  {
    id: '7',
    name: 'Black Flannel Shirt',
    brand: 'CozyWear',
    platform: 'Flipkart',
    category: 'Flannel Shirts',
    price: 42.99,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Soft black flannel shirt perfect for casual wear. Warm and comfortable for everyday use.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    rating: 4.6,
    reviews: 134,
    inStock: true,
    tags: ['flannel', 'soft', 'casual', 'black', 'shirt'],
    occasions: ['casual', 'weekend', 'outdoor', 'fall', 'winter'],
    reviewSummary: 'Incredibly soft and warm flannel fabric perfect for casual wear. Cozy feel with great durability. Ideal for cooler weather and weekend activities.',
    deliveryTime: '3-5 days'
  },
  {
    id: '8',
    name: 'Black Performance Shirt',
    brand: 'ActiveLife',
    platform: 'Meesho',
    category: 'Performance Shirts',
    price: 38.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'High-performance black shirt with moisture-wicking technology. Ideal for active lifestyle.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    rating: 4.8,
    reviews: 167,
    inStock: true,
    tags: ['performance', 'moisture-wicking', 'active', 'black', 'shirt'],
    occasions: ['gym', 'sports', 'workout', 'running', 'active'],
    reviewSummary: 'Excellent performance fabric that keeps you dry during workouts. Lightweight and breathable with great stretch. Perfect for active lifestyle and sports.',
    deliveryTime: '2-4 days'
  },
  {
    id: '9',
    name: 'Black Linen Shirt',
    brand: 'SummerBreeze',
    platform: 'Amazon',
    category: 'Linen Shirts',
    price: 52.99,
    originalPrice: 65.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Breathable black linen shirt perfect for summer. Lightweight and comfortable with natural texture.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    rating: 4.3,
    reviews: 98,
    inStock: true,
    tags: ['linen', 'breathable', 'summer', 'black', 'shirt'],
    occasions: ['summer', 'vacation', 'beach', 'casual', 'hot weather'],
    reviewSummary: 'Lightweight and breathable linen perfect for hot weather. Natural texture adds character. Customers appreciate the relaxed summer vibe and comfort.',
    deliveryTime: '4-6 days'
  },
  {
    id: '10',
    name: 'Black Denim Shirt',
    brand: 'DenimCo',
    platform: 'Myntra',
    category: 'Denim Shirts',
    price: 67.99,
    image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Stylish black denim shirt with classic western styling. Durable and fashionable for casual wear.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    rating: 4.7,
    reviews: 145,
    inStock: true,
    tags: ['denim', 'western', 'durable', 'black', 'shirt'],
    occasions: ['casual', 'weekend', 'outdoor', 'rugged', 'western'],
    reviewSummary: 'High-quality denim with classic western styling. Extremely durable and gets better with age. Great for casual wear with excellent construction quality.',
    deliveryTime: '3-5 days'
  }
];