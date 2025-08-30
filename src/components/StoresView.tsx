import React, { useState } from 'react';
import { Store as StoreIcon, MapPin, Filter, Scissors, Building2 } from 'lucide-react';
import { Store } from '../types/Store';
import { Product } from '../types/Product';
import { Tailor } from '../types/Tailor';
import StoreCard from './StoreCard';
import StoreModal from './StoreModal';
import StoreCatalogue from './StoreCatalogue';
import TailoringView from './TailoringView';

interface StoresViewProps {
  stores: Store[];
  tailors: Tailor[];
  onProductClick: (product: Product) => void;
}

const StoresView: React.FC<StoresViewProps> = ({ stores, tailors, onProductClick }) => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [catalogueStore, setCatalogueStore] = useState<Store | null>(null);
  const [activeTab, setActiveTab] = useState<'stores' | 'tailoring'>('stores');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance');
  const [filterBy, setFilterBy] = useState<string>('');

  const filteredAndSortedStores = stores
    .filter(store => {
      if (!filterBy) return true;
      return store.categories.some(category => 
        category.toLowerCase().includes(filterBy.toLowerCase())
      ) || store.name.toLowerCase().includes(filterBy.toLowerCase());
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Show catalogue view if a store is selected for catalogue
  if (catalogueStore) {
    return (
      <StoreCatalogue
        store={catalogueStore}
        onBack={() => setCatalogueStore(null)}
        onProductClick={onProductClick}
      />
    );
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <div className="flex items-center justify-center mb-4">
          {activeTab === 'stores' ? (
            <>
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Nearby Retail Stores</h1>
            </>
          ) : (
            <>
              <Scissors className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Custom Tailoring Services</h1>
            </>
          )}
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {activeTab === 'stores' 
            ? 'Discover local clothing stores near you. Browse ratings, reviews, and get directions to find the perfect place to shop.'
            : 'Find verified professional tailors near you. Get custom clothing, alterations, and expert craftsmanship with transparent pricing and reviews.'
          }
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex">
          <button
            onClick={() => setActiveTab('stores')}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeTab === 'stores'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Building2 className="h-5 w-5" />
            <span>Retail Stores</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeTab === 'stores' 
                ? 'bg-white bg-opacity-20 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {stores.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('tailoring')}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeTab === 'tailoring'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <Scissors className="h-5 w-5" />
            <span>Custom Tailoring</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeTab === 'tailoring' 
                ? 'bg-white bg-opacity-20 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {tailors.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'stores' ? (
        <>
          {/* Controls */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Showing {filteredAndSortedStores.length} stores near you
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    <option value="clothing">Clothing</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="sportswear">Sportswear</option>
                    <option value="vintage">Vintage</option>
                    <option value="designer">Designer</option>
                  </select>
                </div>
                
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating' | 'name')}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="distance">Sort by Distance</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stores Grid */}
          {filteredAndSortedStores.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No stores found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onStoreClick={setCatalogueStore}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <TailoringView
          tailors={tailors}
          onBack={() => {}} // No back needed since we're using tabs
          hideBackButton={true}
        />
      )}

      {/* Store Modal */}
      <StoreModal
        store={selectedStore}
        isOpen={!!selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </div>
  );
};

export default StoresView;