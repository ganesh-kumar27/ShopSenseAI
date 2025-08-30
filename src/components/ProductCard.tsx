import React from 'react';
import { createPortal } from 'react-dom';
import { Star, ExternalLink, Store, X, Heart } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  isInWishlist: boolean;
  onToggleWishlist: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, isInWishlist, onToggleWishlist }) => {
  const [showReviewPopup, setShowReviewPopup] = React.useState(false);

  const getPlatformLogo = (platform: string) => {
    const platformColors = {
      'Myntra': 'text-pink-600',
      'Flipkart': 'text-blue-600',
      'Amazon': 'text-orange-500',
      'Meesho': 'text-purple-600'
    };
    
    return (
      <div className={`flex items-center space-x-1 ${platformColors[platform as keyof typeof platformColors] || 'text-gray-600'}`}>
        <Store className="h-3 w-3" />
        <span className="text-xs font-medium">{platform}</span>
      </div>
    );
  };

  return (
    <div className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden" onClick={() => onProductClick(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
            Sale
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2" onClick={() => onProductClick(product)}>
          {getPlatformLogo(product.platform)}
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowReviewPopup(true);
              }}
              className="flex items-center hover:bg-gray-100 rounded px-2 py-1 transition-colors duration-200"
            >
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600">
                {product.rating} ({product.reviews})
              </span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isInWishlist
                  ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                  : 'border border-gray-300 text-gray-400 hover:text-rose-500 hover:border-rose-300'
              }`}
              title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Navigate to external e-commerce site
                window.open(`https://${product.platform.toLowerCase()}.com`, '_blank');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200 flex items-center space-x-1"
              title={`Visit ${product.platform}`}
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Review Summary Popup */}
      {showReviewPopup && (
        createPortal(
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" 
              onClick={() => setShowReviewPopup(false)} 
            />
            
            {/* Popup Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Star className="h-5 w-5 fill-current text-yellow-400 mr-2" />
                    Customer Reviews Summary
                  </h3>
                  <button
                    onClick={() => setShowReviewPopup(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {product.rating} out of 5 stars ({product.reviews} reviews)
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">by {product.brand}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">AI-Generated Summary:</h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {product.reviewSummary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )
      )}
    </div>
  );
};

export default ProductCard;