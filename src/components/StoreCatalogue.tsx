import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Filter, Grid, List, Star, ShoppingBag } from 'lucide-react';
import { Store } from '../types/Store';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface StoreCatalogueProps {
  store: Store;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const StoreCatalogue: React.FC<StoreCatalogueProps> = ({ store, onBack, onProductClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Generate store-specific products based on store categories and brand
  const storeProducts: Product[] = useMemo(() => {
    const baseProducts = [
      {
        id: `${store.id}-1`,
        name: 'Premium Cotton Shirt',
        brand: store.brand,
        platform: store.name,
        category: 'Shirts',
        price: store.priceRange === '$$$$' ? 89.99 : store.priceRange === '$$$' ? 59.99 : 39.99,
        originalPrice: store.priceRange === '$$$$' ? 109.99 : store.priceRange === '$$$' ? 79.99 : 49.99,
        image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600',
        images: ['https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600'],
        description: `Premium quality shirt from ${store.brand}. Perfect for professional and casual wear.`,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Blue', 'Black'],
        rating: 4.5,
        reviews: 89,
        inStock: true,
        tags: ['shirt', 'cotton', 'premium'],
        reviewSummary: `Customers love the quality and fit of ${store.brand} shirts. Excellent fabric and professional appearance.`,
        deliveryTime: 'Available in-store'
      },
      {
        id: `${store.id}-2`,
        name: 'Formal Trousers',
        brand: store.brand,
        platform: store.name,
        category: 'Trousers',
        price: store.priceRange === '$$$$' ? 79.99 : store.priceRange === '$$$' ? 49.99 : 34.99,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
        images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'],
        description: `Classic formal trousers from ${store.brand}. Tailored fit with premium fabric.`,
        sizes: ['30', '32', '34', '36', '38', '40'],
        colors: ['Black', 'Navy', 'Grey'],
        rating: 4.3,
        reviews: 67,
        inStock: true,
        tags: ['trousers', 'formal', 'tailored'],
        reviewSummary: `Great fit and quality. Perfect for office wear and formal occasions.`,
        deliveryTime: 'Available in-store'
      },
      {
        id: `${store.id}-3`,
        name: 'Casual Polo Shirt',
        brand: store.brand,
        platform: store.name,
        category: 'Polo Shirts',
        price: store.priceRange === '$$$$' ? 69.99 : store.priceRange === '$$$' ? 45.99 : 29.99,
        image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
        images: ['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600'],
        description: `Comfortable polo shirt from ${store.brand}. Perfect for casual and semi-formal occasions.`,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['White', 'Navy', 'Red', 'Green'],
        rating: 4.4,
        reviews: 123,
        inStock: true,
        tags: ['polo', 'casual', 'comfortable'],
        reviewSummary: `Excellent quality polo shirts with great comfort and style. Perfect for weekend wear.`,
        deliveryTime: 'Available in-store'
      }
    ];

    // Add category-specific products based on store specialties
    if (store.categories.includes('Innerwear')) {
      baseProducts.push({
        id: `${store.id}-4`,
        name: 'Premium Cotton Briefs',
        brand: store.brand,
        platform: store.name,
        category: 'Innerwear',
        price: store.priceRange === '$$$$' ? 24.99 : store.priceRange === '$$$' ? 18.99 : 12.99,
        image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600',
        images: ['https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600'],
        description: `Premium comfort innerwear from ${store.brand}. Superior cotton blend for all-day comfort.`,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Grey'],
        rating: 4.6,
        reviews: 234,
        inStock: true,
        tags: ['innerwear', 'cotton', 'comfort'],
        reviewSummary: `Exceptional comfort and quality. Customers appreciate the premium cotton and perfect fit.`,
        deliveryTime: 'Available in-store'
      });
    }

    if (store.categories.includes('Luxury Suits')) {
      baseProducts.push({
        id: `${store.id}-5`,
        name: 'Bespoke Business Suit',
        brand: store.brand,
        platform: store.name,
        category: 'Suits',
        price: store.priceRange === '$$$$' ? 899.99 : 599.99,
        originalPrice: store.priceRange === '$$$$' ? 1199.99 : 799.99,
        image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600',
        images: ['https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600'],
        description: `Luxury bespoke suit from ${store.brand}. Handcrafted with premium fabrics and expert tailoring.`,
        sizes: ['38', '40', '42', '44', '46'],
        colors: ['Charcoal', 'Navy', 'Black'],
        rating: 4.9,
        reviews: 45,
        inStock: true,
        tags: ['suit', 'bespoke', 'luxury'],
        reviewSummary: `Exceptional craftsmanship and perfect fit. The ultimate in luxury formal wear.`,
        deliveryTime: 'Custom tailoring - 2 weeks'
      });
    }

    return baseProducts;
  }, [store]);

  const filteredProducts = useMemo(() => {
    return storeProducts
      .filter(product => {
        const matchesSearch = searchQuery === '' || 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price':
            return a.price - b.price;
          case 'rating':
            return b.rating - a.rating;
          case 'name':
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [storeProducts, searchQuery, selectedCategory, sortBy]);

  const categories = useMemo(() => {
    return [...new Set(storeProducts.map(p => p.category))];
  }, [storeProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{store.name}</h1>
                <p className="text-sm text-gray-600">{store.brand} • {store.priceRange}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">
                  {store.rating} ({store.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search products..."
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Store Catalogue ({filteredProducts.length} items)
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreCatalogue;