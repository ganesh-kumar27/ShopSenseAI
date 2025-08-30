import React from 'react';
import { ArrowLeft, Heart, ShoppingBag, Trash2, Bell, MessageCircle, Settings, X } from 'lucide-react';
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
  const [alertSettings, setAlertSettings] = React.useState<{[key: string]: {priceAlert: boolean, stockAlert: boolean, whatsappNumber: string}}>({});
  const [showAlertModal, setShowAlertModal] = React.useState<string | null>(null);

  const wishlistProducts = products.filter(product => wishlistItems.includes(product.id));

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      wishlistItems.forEach(productId => onToggleWishlist(productId));
      setAlertSettings({});
    }
  };

  const handleSetAlert = (productId: string, settings: {priceAlert: boolean, stockAlert: boolean, whatsappNumber: string}) => {
    setAlertSettings(prev => ({
      ...prev,
      [productId]: settings
    }));
    setShowAlertModal(null);
    
    // Simulate WhatsApp alert setup
    const product = products.find(p => p.id === productId);
    if (product && settings.whatsappNumber) {
      alert(`Alert set up successfully! 🔔\n\nProduct: ${product.name}\nWhatsApp: ${settings.whatsappNumber}\n\nYou'll receive notifications for:\n${settings.priceAlert ? '• Price drops\n' : ''}${settings.stockAlert ? '• Stock availability\n' : ''}\nNote: In a real app, this would integrate with WhatsApp Business API.`);
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
            <div className="space-y-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                    {/* Product Image */}
                    <div className="md:col-span-1">
                      <div className="aspect-square overflow-hidden rounded-lg cursor-pointer" onClick={() => onProductClick(product)}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div className="cursor-pointer" onClick={() => onProductClick(product)}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-blue-600 font-medium">{product.brand}</p>
                          <span className="text-sm text-gray-500">{product.platform}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-gray-900">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 fill-current text-yellow-400" />
                            <span className="ml-1 text-sm text-gray-600">
                              {product.rating} ({product.reviews} reviews)
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onToggleWishlist(product.id)}
                            className="flex items-center space-x-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors duration-200"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">Remove</span>
                          </button>
                          
                          <button
                            onClick={() => setShowAlertModal(product.id)}
                            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                              alertSettings[product.id] 
                                ? 'text-green-600 bg-green-50 hover:bg-green-100' 
                                : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                            }`}
                          >
                            <Bell className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {alertSettings[product.id] ? 'Alert Set' : 'Set Alert'}
                            </span>
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                          <button
                            onClick={() => window.open(`https://${product.platform.toLowerCase()}.com`, '_blank')}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium text-sm"
                          >
                            Visit Store
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Alert Setup Modal */}
            {showAlertModal && (
              <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowAlertModal(null)} />
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                    <div className="flex items-center justify-between p-6 border-b">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-blue-600" />
                        Set WhatsApp Alerts
                      </h3>
                      <button
                        onClick={() => setShowAlertModal(null)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <AlertSetupForm
                      product={products.find(p => p.id === showAlertModal)!}
                      currentSettings={alertSettings[showAlertModal] || {priceAlert: false, stockAlert: false, whatsappNumber: ''}}
                      onSave={(settings) => handleSetAlert(showAlertModal, settings)}
                      onCancel={() => setShowAlertModal(null)}
                    />
                  </div>
                </div>
              </>
            )}

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

// Alert Setup Form Component
interface AlertSetupFormProps {
  product: Product;
  currentSettings: {priceAlert: boolean, stockAlert: boolean, whatsappNumber: string};
  onSave: (settings: {priceAlert: boolean, stockAlert: boolean, whatsappNumber: string}) => void;
  onCancel: () => void;
}

const AlertSetupForm: React.FC<AlertSetupFormProps> = ({ product, currentSettings, onSave, onCancel }) => {
  const [priceAlert, setPriceAlert] = React.useState(currentSettings.priceAlert);
  const [stockAlert, setStockAlert] = React.useState(currentSettings.stockAlert);
  const [whatsappNumber, setWhatsappNumber] = React.useState(currentSettings.whatsappNumber);

  const handleSave = () => {
    if (!whatsappNumber.trim()) {
      alert('Please enter your WhatsApp number to receive alerts.');
      return;
    }
    
    if (!priceAlert && !stockAlert) {
      alert('Please select at least one alert type.');
      return;
    }
    
    onSave({ priceAlert, stockAlert, whatsappNumber: whatsappNumber.trim() });
  };

  return (
    <div className="p-6">
      {/* Product Info */}
      <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-lg"
        />
        <div>
          <h4 className="font-medium text-gray-900">{product.name}</h4>
          <p className="text-sm text-gray-600">{product.brand} • ${product.price}</p>
        </div>
      </div>
      
      {/* WhatsApp Number */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MessageCircle className="h-4 w-4 inline mr-1" />
          WhatsApp Number
        </label>
        <input
          type="tel"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="+1 (555) 123-4567"
        />
        <p className="text-xs text-gray-500 mt-1">
          Include country code (e.g., +1 for US, +91 for India)
        </p>
      </div>
      
      {/* Alert Types */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Alert Types</label>
        <div className="space-y-3">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={priceAlert}
              onChange={(e) => setPriceAlert(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-900">Price Drop Alert</span>
              <p className="text-xs text-gray-600">Get notified when the price drops below ${product.price}</p>
            </div>
          </label>
          
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={stockAlert}
              onChange={(e) => setStockAlert(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-900">Stock Alert</span>
              <p className="text-xs text-gray-600">Get notified when this item comes back in stock</p>
            </div>
          </label>
        </div>
      </div>
      
      {/* WhatsApp Integration Info */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start space-x-3">
          <MessageCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-green-900 mb-1">WhatsApp Notifications</h4>
            <p className="text-sm text-green-800 leading-relaxed">
              You'll receive instant WhatsApp messages when your selected alerts are triggered. 
              Messages include product details, current price, and direct purchase links.
            </p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
        >
          <Bell className="h-4 w-4" />
          <span>Set Alert</span>
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;