import React from 'react';
import { Search, ShoppingBag, Camera, User, Calendar, ArrowLeft, Heart } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  wishlistItemsCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onImageSearchClick: () => void;
  onProfileClick: () => void;
  onOccasionMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isOnlineMode: boolean;
  onModeToggle: () => void;
  selectedOccasion: string;
  onBackToHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItemsCount,
  wishlistItemsCount,
  onCartClick,
  onWishlistClick,
  onImageSearchClick,
  onProfileClick,
  onOccasionMenuClick,
  searchQuery,
  onSearchChange,
  isOnlineMode,
  onModeToggle,
  selectedOccasion,
  onBackToHome,
}) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={onBackToHome}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors duration-200"
            >
              ShopSense AI
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg mx-2 sm:mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  onClick={onImageSearchClick}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  title="Search by image"
                >
                  <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2 border border-gray-300 rounded-lg text-sm sm:text-base leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Search clothes..."
              />
            </div>
          </div>

          {/* Online/Offline Toggle */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-3 mx-2 lg:mx-4">
            <span className={`text-xs lg:text-sm font-medium ${!isOnlineMode ? 'text-gray-900' : 'text-gray-500'}`}>
              Offline
            </span>
            <button
              onClick={onModeToggle}
              className={`relative inline-flex h-5 w-9 lg:h-6 lg:w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                isOnlineMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 lg:h-4 lg:w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isOnlineMode ? 'translate-x-4 lg:translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-xs lg:text-sm font-medium ${isOnlineMode ? 'text-gray-900' : 'text-gray-500'}`}>
              Online
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {isOnlineMode && (
              <button
                onClick={onOccasionMenuClick}
                className={`relative p-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                  selectedOccasion 
                    ? 'text-purple-600 bg-purple-50 hover:bg-purple-100' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
                title="Shop by Occasion"
              >
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm font-medium hidden lg:block">Occasions</span>
                {selectedOccasion && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                    1
                  </span>
                )}
              </button>
            )}
            
            <button
              onClick={onProfileClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Profile"
            >
              <User className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            
            <button
              onClick={onWishlistClick}
              className="relative p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors duration-200"
              title="Wishlist"
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {wishlistItemsCount}
                </span>
              )}
            </button>
            
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;