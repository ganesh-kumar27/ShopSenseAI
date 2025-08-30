import React from 'react';
import { Star } from 'lucide-react';
import { SearchFilters } from '../types/Product';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  availableCategories: string[];
  availableBrands: string[];
  availableSizes: string[];
  availableColors: string[];
  availablePlatforms: string[];
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  availableCategories,
  availableBrands,
  availableSizes,
  availableColors,
  availablePlatforms
}) => {
  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-lg border border-gray-100 w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {availableCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="500"
          value={filters.priceRange[1]}
          onChange={(e) => updateFilters({ 
            priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
          })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Rating: {filters.minRating} {filters.minRating > 0 && '★'}
        </label>
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map(rating => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => updateFilters({ minRating: rating })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-2 flex items-center">
                {rating === 0 ? (
                  <span className="text-sm text-gray-600">All ratings</span>
                ) : (
                  <>
                    <span className="text-sm text-gray-600 mr-1">{rating}</span>
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">& up</span>
                  </>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Brands</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {availableBrands.map(brand => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={(e) => {
                  const newBrands = e.target.checked
                    ? [...filters.brands, brand]
                    : filters.brands.filter(b => b !== brand);
                  updateFilters({ brands: newBrands });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">E-commerce Platforms</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {availablePlatforms.map(platform => (
            <label key={platform} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.platforms.includes(platform)}
                onChange={(e) => {
                  const newPlatforms = e.target.checked
                    ? [...filters.platforms, platform]
                    : filters.platforms.filter(p => p !== platform);
                  updateFilters({ platforms: newPlatforms });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map(size => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={(e) => {
                  const newSizes = e.target.checked
                    ? [...filters.sizes, size]
                    : filters.sizes.filter(s => s !== size);
                  updateFilters({ sizes: newSizes });
                }}
                className="sr-only"
              />
              <span className={`px-3 py-1 text-sm border rounded-lg cursor-pointer transition-colors duration-200 ${
                filters.sizes.includes(size)
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
        <div className="flex flex-wrap gap-2">
          {availableColors.map(color => (
            <label key={color} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={(e) => {
                  const newColors = e.target.checked
                    ? [...filters.colors, color]
                    : filters.colors.filter(c => c !== color);
                  updateFilters({ colors: newColors });
                }}
                className="sr-only"
              />
              <span className={`px-3 py-1 text-sm border rounded-lg cursor-pointer transition-colors duration-200 ${
                filters.colors.includes(color)
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                {color}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Delivery Time */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
        <select
          value={filters.deliveryTime}
          onChange={(e) => updateFilters({ deliveryTime: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Any delivery time</option>
          <option value="1-2 days">1-2 days</option>
          <option value="2-3 days">2-3 days</option>
          <option value="3-5 days">3-5 days</option>
          <option value="5-7 days">5-7 days</option>
        </select>
      </div>

      {/* In Stock Only */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => updateFilters({ inStock: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">In stock only</span>
        </label>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => onFiltersChange({
          category: '',
          priceRange: [0, 500],
          minRating: 0,
          brands: [],
          sizes: [],
          colors: [],
          platforms: [],
          inStock: false,
          deliveryTime: ''
        })}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SearchFiltersComponent;