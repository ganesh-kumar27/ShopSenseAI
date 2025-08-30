import React from 'react';
import { createPortal } from 'react-dom';
import { Star, MapPin, Phone, Clock, ExternalLink, Navigation, X, Video } from 'lucide-react';
import { Store } from '../types/Store';
import CallSchedulingModal from './CallSchedulingModal';

interface StoreCardProps {
  store: Store;
  onStoreClick: (store: Store) => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onStoreClick }) => {
  const [showReviewPopup, setShowReviewPopup] = React.useState(false);
  const [showPromotionPopup, setShowPromotionPopup] = React.useState(false);
  const [showCallScheduling, setShowCallScheduling] = React.useState(false);

  const getPriceRangeText = (range: string) => {
    switch (range) {
      case '$': return 'Budget-friendly';
      case '$$': return 'Moderate';
      case '$$$': return 'Expensive';
      case '$$$$': return 'Very expensive';
      default: return 'Price varies';
    }
  };

  const getCurrentStatus = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    const todayHours = store.hours[currentDay];
    if (!todayHours || todayHours === 'Closed') {
      return { status: 'Closed', color: 'text-red-600' };
    }

    // Parse hours (simplified - assumes format like "9:00 AM - 9:00 PM")
    const [open, close] = todayHours.split(' - ');
    // This is a simplified check - in a real app you'd parse the time properly
    return { status: 'Open', color: 'text-green-600' };
  };

  const handleVideoCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would integrate with video calling services like Zoom, Teams, or WebRTC
    alert(`Starting video call with ${store.name}...\n\nVideo consultation available during: ${store.videoCallHours || 'Business hours'}\n\nThis would normally open your video calling app or web interface.`);
  };

  const status = getCurrentStatus();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden h-48">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Promotional Badge */}
        {store.hasPromotions && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPromotionPopup(true);
            }}
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer ${
            store.promotionType === 'sale' ? 'bg-red-500' :
            store.promotionType === 'discount' ? 'bg-orange-500' :
            store.promotionType === 'offer' ? 'bg-green-500' :
            store.promotionType === 'new' ? 'bg-blue-500' :
            'bg-purple-500'
          }`}
          >
            {store.promotionText}
          </button>
        )}
        
        <div className={`absolute top-3 ${store.hasPromotions ? 'right-3' : 'left-3'} bg-white bg-opacity-90 px-2 py-1 rounded-lg`}>
          <span className="text-sm font-medium text-gray-700">{store.priceRange}</span>
        </div>
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-lg">
          <span className={`text-sm font-medium ${status.color}`}>{status.status}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 text-lg">{store.name}</h3>
            <span className="text-sm text-gray-500">{store.distance} mi</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{store.brand}</p>
          <p className="text-sm text-gray-500">{getPriceRangeText(store.priceRange)}</p>
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
                {store.rating} ({store.reviews} reviews)
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              {store.address}, {store.city}, {store.state} {store.zipCode}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCallScheduling(true);
              }}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              {store.phone}
            </button>
          </div>
          
          <div className="flex items-start space-x-2">
            <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p className={status.color}>{status.status}</p>
              <p className="text-xs text-gray-500">
                {store.hours[new Date().toLocaleDateString('en-US', { weekday: 'long' })]}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {store.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onStoreClick(store)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-medium text-sm"
          >
            View Store
          </button>
          
          {store.videoCallAvailable && (
            <button
              onClick={handleVideoCall}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 flex items-center space-x-1"
              title="Start Video Call"
            >
              <Video className="h-4 w-4" />
              <span className="text-sm font-medium">Call</span>
            </button>
          )}
          
          <button
            onClick={() => {
              const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`;
              window.open(mapsUrl, '_blank');
            }}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            title="Get Directions"
          >
            <Navigation className="h-4 w-4" />
          </button>
          
          {store.website && (
            <button
              onClick={() => window.open(store.website, '_blank')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex-shrink-0"
              title="Visit Website"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Call Scheduling Modal */}
      <CallSchedulingModal
        store={store}
        isOpen={showCallScheduling}
        onClose={() => setShowCallScheduling(false)}
      />

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
                        {store.rating} out of 5 stars ({store.reviews} Google reviews)
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{store.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{store.brand} • {store.priceRange}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">AI-Generated Summary:</h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {store.reviewSummary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )
      )}

      {/* Promotion Details Popup */}
      {showPromotionPopup && (
        createPortal(
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" 
              onClick={() => setShowPromotionPopup(false)} 
            />
            
            {/* Popup Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      store.promotionType === 'sale' ? 'bg-red-500' :
                      store.promotionType === 'discount' ? 'bg-orange-500' :
                      store.promotionType === 'offer' ? 'bg-green-500' :
                      store.promotionType === 'new' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`}></div>
                    Special Promotion
                  </h3>
                  <button
                    onClick={() => setShowPromotionPopup(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white mb-3 ${
                      store.promotionType === 'sale' ? 'bg-red-500' :
                      store.promotionType === 'discount' ? 'bg-orange-500' :
                      store.promotionType === 'offer' ? 'bg-green-500' :
                      store.promotionType === 'new' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`}>
                      {store.promotionText}
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{store.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{store.brand} • {store.priceRange}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Promotion Details:</h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {store.promotionDetails || 'Special promotion available at this store. Visit for more details.'}
                    </p>
                  </div>

                  {store.promotionValidTill && (
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-blue-800">Valid Till: {store.promotionValidTill}</span>
                      </div>
                    </div>
                  )}
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

export default StoreCard;