import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Grid, List } from 'lucide-react';
import { Store } from '../types/Store';
import { Product } from '../types/Product';
import ProductGrid from './ProductGrid';

interface StoreCatalogueProps {
  store: Store;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const StoreCatalogue: React.FC<StoreCatalogueProps> = ({
  store,
  onBack,
  onProductClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock products for the store - in a real app, this would come from an API
  const storeProducts: Product[] = [
    {
      id: 'store-1',
      name: 'Premium Cotton Shirt',
      brand: store.brand,
      platform: 'In-Store',
      category: 'Shirts',
      price: 45.99,
      originalPrice: 59.99,
      image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: ['https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600'],
      description: 'High-quality cotton shirt available in-store with expert fitting assistance.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Blue', 'Black'],
      rating: 4.7,
      reviews: 89,
      inStock: true,
      tags: ['cotton', 'formal', 'premium'],
      occasions: ['office', 'business', 'formal'],
      reviewSummary: 'Excellent quality cotton with professional fit.',
      deliveryTime: 'Available in-store'
    },
    {
      id: 'store-2',
      name: 'Casual Denim Jeans',
      brand: store.brand,
      platform: 'In-Store',
      category: 'Jeans',
      price: 79.99,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'],
      description: 'Comfortable denim jeans with modern fit, available for immediate purchase.',
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['Blue', 'Black', 'Gray'],
      rating: 4.5,
      reviews: 156,
      inStock: true,
      tags: ['denim', 'casual', 'comfortable'],
      occasions: ['casual', 'weekend'],
      reviewSummary: 'Great fit and comfort for everyday wear.',
      deliveryTime: 'Available in-store'
    }
  ];

  const filteredProducts = storeProducts.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(storeProducts.map(p => p.category))];

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
                <p className="text-sm text-gray-600">{store.brand} • {store.address}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search store products..."
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Store Catalogue
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} available in-store
          </p>
        </div>

        {/* Products */}
        <ProductGrid
          products={filteredProducts}
          onProductClick={onProductClick}
          wishlistItems={[]}
          onToggleWishlist={() => {}}
        />

        {/* Store Info */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">About {store.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Store Features</h4>
              <div className="space-y-1">
                {store.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {store.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCatalogue;