import { useState, useMemo } from 'react';
import { Product, SearchFilters } from '../types/Product';

export const useSearch = (products: Product[], userProfile?: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    priceRange: [0, 500],
    minRating: 0,
    brands: [],
    sizes: [],
    colors: [],
    platforms: [],
    inStock: false,
    deliveryTime: ''
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Text search
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Occasion filter
      const matchesOccasion = selectedOccasion === '' || 
        product.occasions.some(occasion => occasion.toLowerCase().includes(selectedOccasion.toLowerCase()));

      // Category filter
      const matchesCategory = filters.category === '' || product.category === filters.category;

      // Price filter
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

      // Rating filter
      const matchesRating = product.rating >= filters.minRating;

      // Brand filter
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);

      // Size filter
      const matchesSize = filters.sizes.length === 0 || 
        filters.sizes.some(size => product.sizes.includes(size));

      // Color filter
      const matchesColor = filters.colors.length === 0 || 
        filters.colors.some(color => product.colors.includes(color));

      // Platform filter
      const matchesPlatform = filters.platforms.length === 0 || 
        filters.platforms.includes(product.platform);

      // Stock filter
      const matchesStock = !filters.inStock || product.inStock;

      // Delivery time filter
      const matchesDelivery = filters.deliveryTime === '' || product.deliveryTime === filters.deliveryTime;

      return matchesSearch && matchesOccasion && matchesCategory && matchesPrice && 
             matchesRating && matchesBrand && matchesSize && matchesColor && 
             matchesPlatform && matchesStock && matchesDelivery;
    });
  }, [products, searchQuery, selectedOccasion, filters]);

  // Sort products based on user profile preferences
  const personalizedProducts = useMemo(() => {
    if (!userProfile) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Boost score for preferred brands
      if (userProfile.preferredBrands?.includes(a.brand)) scoreA += 10;
      if (userProfile.preferredBrands?.includes(b.brand)) scoreB += 10;

      // Boost score for preferred size availability
      if (userProfile.preferredSize && a.sizes.includes(userProfile.preferredSize)) scoreA += 5;
      if (userProfile.preferredSize && b.sizes.includes(userProfile.preferredSize)) scoreB += 5;

      // Boost score for style preferences matching tags
      if (userProfile.stylePreferences) {
        const aStyleMatches = userProfile.stylePreferences.filter((style: string) => 
          a.tags.some(tag => tag.toLowerCase().includes(style.toLowerCase()))
        ).length;
        const bStyleMatches = userProfile.stylePreferences.filter((style: string) => 
          b.tags.some(tag => tag.toLowerCase().includes(style.toLowerCase()))
        ).length;
        scoreA += aStyleMatches * 3;
        scoreB += bStyleMatches * 3;
      }

      return scoreB - scoreA; // Higher score first
    });
  }, [filteredProducts, userProfile]);

  return {
    searchQuery,
    setSearchQuery,
    selectedOccasion,
    setSelectedOccasion,
    filters,
    setFilters,
    filteredProducts: personalizedProducts
  };
};