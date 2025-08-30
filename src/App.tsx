import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import SearchFilters from './components/SearchFilters';
import ShoppingCart from './components/ShoppingCart';
import ImageSearch from './components/ImageSearch';
import ProductModal from './components/ProductModal';
import StoresView from './components/StoresView';
import ProfilePage from './components/ProfilePage';
import OccasionMenu from './components/OccasionMenu';
import { useSearch } from './hooks/useSearch';
import { products } from './data/products';
import { stores } from './data/stores';
import { Product, CartItem } from './types/Product';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [isOccasionMenuOpen, setIsOccasionMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageSearchResults, setImageSearchResults] = useState<Product[]>([]);
  const [showImageResults, setShowImageResults] = useState(false);
  const [isOnlineMode, setIsOnlineMode] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    preferredBrands: ['Louis Philippe', 'Van Heusen'],
    preferredSize: 'L',
    stylePreferences: ['Formal', 'Smart Casual']
  });

  const { 
    searchQuery, 
    setSearchQuery, 
    selectedOccasion, 
    setSelectedOccasion, 
    filters, 
    setFilters, 
    filteredProducts 
  } = useSearch(products, userProfile);

  // Display either search results or image search results
  const displayProducts = showImageResults ? imageSearchResults : filteredProducts;

  const availableCategories = useMemo(() => 
    [...new Set(products.map(p => p.category))], []);
  
  const availableBrands = useMemo(() => 
    [...new Set(products.map(p => p.brand))], []);
  
  const availableSizes = useMemo(() => 
    [...new Set(products.flatMap(p => p.sizes))], []);
  
  const availableColors = useMemo(() => 
    [...new Set(products.flatMap(p => p.colors))], []);

  const availablePlatforms = useMemo(() => 
    [...new Set(products.map(p => p.platform))], []);

  const handleAddToCart = (product: Product, quantity: number = 1, size?: string, color?: string) => {
    const existingItem = cartItems.find(item => 
      item.id === product.id && item.selectedSize === size && item.selectedColor === color
    );

    if (existingItem) {
      setCartItems(items =>
        items.map(item =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const cartItem: CartItem = {
        ...product,
        quantity,
        selectedSize: size,
        selectedColor: color
      };
      setCartItems(items => [...items, cartItem]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleImageSearchResults = (results: Product[]) => {
    setImageSearchResults(results);
    setShowImageResults(true);
    setSearchQuery(''); // Clear text search when showing image results
  };

  const handleTextSearch = (query: string) => {
    setSearchQuery(query);
    setShowImageResults(false); // Clear image results when doing text search
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Show profile page if selected
  if (showProfile) {
    return (
      <ProfilePage 
        onBack={() => setShowProfile(false)} 
        onProfileUpdate={setUserProfile}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
        onImageSearchClick={() => setIsImageSearchOpen(true)}
        onProfileClick={() => setShowProfile(true)}
        onOccasionMenuClick={() => setIsOccasionMenuOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={handleTextSearch}
        isOnlineMode={isOnlineMode}
        onModeToggle={() => setIsOnlineMode(!isOnlineMode)}
        selectedOccasion={selectedOccasion}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isOnlineMode ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                availableCategories={availableCategories}
                availableBrands={availableBrands}
                availableSizes={availableSizes}
                availableColors={availableColors}
                availablePlatforms={availablePlatforms}
              />
            </div>

            {/* Products */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {showImageResults 
                      ? 'Similar Items Found' 
                      : selectedOccasion 
                        ? `Perfect for ${selectedOccasion.charAt(0).toUpperCase() + selectedOccasion.slice(1)}` 
                        : 'Products'
                    }
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {displayProducts.length} item{displayProducts.length !== 1 ? 's' : ''} found
                    {selectedOccasion && !showImageResults && (
                      <span className="text-purple-600"> • Personalized for you</span>
                    )}
                    {showImageResults && (
                      <button
                        onClick={() => {
                          setShowImageResults(false);
                          setImageSearchResults([]);
                        }}
                        className="ml-2 text-blue-600 hover:text-blue-700 underline"
                      >
                        Clear image search
                      </button>
                    )}
                  </p>
                </div>
              </div>

              <ProductGrid
                products={displayProducts}
                onProductClick={setSelectedProduct}
              />
            </div>
          </div>
        ) : (
          <StoresView stores={stores} onProductClick={setSelectedProduct} />
        )}
      </main>

      {isOnlineMode && (
        <>
          <OccasionMenu
            isOpen={isOccasionMenuOpen}
            onClose={() => setIsOccasionMenuOpen(false)}
            onOccasionSelect={setSelectedOccasion}
            selectedOccasion={selectedOccasion}
          />

          <ShoppingCart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />

          <ImageSearch
            isOpen={isImageSearchOpen}
            onClose={() => setIsImageSearchOpen(false)}
            products={products}
            onSearchResults={handleImageSearchResults}
          />

          <ProductModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        </>
      )}
    </div>
  );
}

export default App;