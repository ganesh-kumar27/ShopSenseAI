import React from 'react';
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface WishlistPageProps {
  onBack: () => void;
  wishlistItems: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onProductClick: (product: Product) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({
  onBack,
  wishlistItems,
  products,
  onToggleWishlist,
  onProductClick
}) => {
  const wishlistProducts = products.filter(product => wishlistItems.includes(product.id));

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      wishlistItems.forEach(productId => onToggleWishlist(productId));
    }
  };

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
              <div className="flex items-center space-x-3">
                <Heart className="h-6 w-6 text-rose-500 fill-current" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">My Wishlist</h1>
                  <p className="text-sm text-gray-600">
                    {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved
                  </p>
                </div>
              </div>
            </div>
            
            {wishlistProducts.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
                <span className="text-sm font-medium">Clear All</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistProducts.length === 0 ? (
          /* Empty Wishlist State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Heart className="h-16 w-16 mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Start adding items you love to your wishlist. Click the heart icon on any product to save it for later.
              </p>
              <button
                onClick={onBack}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-semibold"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Wishlist Products */
          <div>
            {/* Wishlist Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-rose-100 p-3 rounded-xl">
                    <Heart className="h-6 w-6 text-rose-600 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {wishlistProducts.length} Saved Item{wishlistProducts.length !== 1 ? 's' : ''}
                    </h3>
                    <p className="text-gray-600">
                      Total value: ${wishlistProducts.reduce((sum, product) => sum + product.price, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Average rating</p>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-rose-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">
                      {(wishlistProducts.reduce((sum, product) => sum + product.rating, 0) / wishlistProducts.length).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  isInWishlist={true}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>

            {/* Wishlist Actions */}
            <div className="mt-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <ShoppingBag className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-bold text-rose-900 mb-2">💝 Ready to Shop?</h4>
                  <p className="text-sm text-rose-800 leading-relaxed mb-4">
                    Your wishlist items are waiting! Click on any product to view details and add to cart, or continue browsing to discover more items you'll love.
                  </p>
                  <button
                    onClick={onBack}
                    className="bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;