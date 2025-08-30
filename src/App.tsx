import React, { useState, useMemo } from 'react';
import { Search, Camera, Calendar, User } from 'lucide-react';
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
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'stores'>('home');
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
    if (query.trim()) {
      setCurrentView('search');
    }
  };

  const handleOccasionSelect = (occasion: string) => {
    setSelectedOccasion(occasion);
    setCurrentView('search');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSearchQuery('');
    setSelectedOccasion('');
    setShowImageResults(false);
    setImageSearchResults([]);
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

  // Homepage View
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Simple Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShopSense AI
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium ${!isOnlineMode ? 'text-gray-900' : 'text-gray-500'}`}>
                    Offline
                  </span>
                  <button
                    onClick={() => setIsOnlineMode(!isOnlineMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isOnlineMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        isOnlineMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-medium ${isOnlineMode ? 'text-gray-900' : 'text-gray-500'}`}>
                    Online
                  </span>
                </div>
                <button
                  onClick={() => setShowProfile(true)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  title="Profile"
                >
                  <User className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-4xl w-full text-center">
            {/* Hero Section */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Style Match
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover clothing that matches your style with AI-powered search and personalized recommendations
              </p>
            </div>

            {/* Search Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Search by Text/Image */}
              <div className="group">
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Search className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Search</h3>
                    <p className="text-gray-600 mb-6">
                      Search by text or upload an image to find similar clothing items
                    </p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <button
                        onClick={() => setIsImageSearchOpen(true)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50"
                        title="Search by image"
                      >
                        <Camera className="h-5 w-5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleTextSearch(e.target.value)}
                      className="block w-full pl-12 pr-16 py-4 border border-gray-300 rounded-xl text-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Search for clothes, brands, or styles..."
                    />
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Search className="h-4 w-4" />
                      <span>Text Search</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center space-x-1">
                      <Camera className="h-4 w-4" />
                      <span>Image Search</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shop by Occasion */}
              <div className="group">
                <button
                  onClick={() => setIsOccasionMenuOpen(true)}
                  className="w-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100 text-left"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Shop by Occasion</h3>
                    <p className="text-gray-600 mb-6 text-center">
                      Find perfect outfits for specific events and occasions
                    </p>
                  </div>
                  
                  {/* Occasion Preview */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">💼</div>
                      <div className="text-xs text-gray-600">Professional</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">🎩</div>
                      <div className="text-xs text-gray-600">Formal</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">👕</div>
                      <div className="text-xs text-gray-600">Casual</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">🏃</div>
                      <div className="text-xs text-gray-600">Active</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-purple-600 font-medium">Browse All Occasions →</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mode Toggle Info */}
            <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span><strong>Online Mode:</strong> Search products from multiple e-commerce platforms</span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span><strong>Offline Mode:</strong> Browse nearby retail stores</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <OccasionMenu
          isOpen={isOccasionMenuOpen}
          onClose={() => setIsOccasionMenuOpen(false)}
          onOccasionSelect={handleOccasionSelect}
          selectedOccasion={selectedOccasion}
        />

        <ImageSearch
          isOpen={isImageSearchOpen}
          onClose={() => setIsImageSearchOpen(false)}
          products={products}
          onSearchResults={handleImageSearchResults}
        />
      </div>
    );
  }

  // Search Results View
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
        onBackToHome={handleBackToHome}
        showBackButton={true}
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
            onOccasionSelect={handleOccasionSelect}
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