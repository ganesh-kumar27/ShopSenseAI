import React from 'react';
import { X, Star, MapPin, Phone, Clock, Navigation, ExternalLink, Wifi, CreditCard, Video } from 'lucide-react';
import { Store } from '../types/Store';
import CallSchedulingModal from './CallSchedulingModal';

interface StoreModalProps {
  store: Store | null;
  isOpen: boolean;
  onClose: () => void;
}

const StoreModal: React.FC<StoreModalProps> = ({ store, isOpen, onClose }) => {
  const [showCallScheduling, setShowCallScheduling] = React.useState(false);

  if (!isOpen || !store) return null;

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
    const todayHours = store.hours[currentDay];
    
    if (!todayHours || todayHours === 'Closed') {
      return { status: 'Closed', color: 'text-red-600' };
    }
    return { status: 'Open', color: 'text-green-600' };
  };

  const handleVideoCall = () => {
    // In a real app, this would integrate with video calling services
    alert(`Starting video call with ${store.name}...\n\nVideo consultation available during: ${store.videoCallHours || 'Business hours'}\n\nThis would normally open your video calling app or web interface.`);
  };

  const status = getCurrentStatus();

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">{store.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Store Image and Basic Info */}
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brand:</span>
                    <span className="font-medium">{store.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price Range:</span>
                    <span className="font-medium">{store.priceRange} - {getPriceRangeText(store.priceRange)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">{store.distance} miles away</span>
                  </div>
                </div>
              </div>

              {/* Interactive Map Placeholder */}
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 mb-4">Interactive Map</p>
                <button
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`;
                    window.open(mapsUrl, '_blank');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2 mx-auto"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>

            {/* Store Details */}
            <div className="space-y-6">
              {/* Rating and Reviews */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                    <span className="ml-1 text-lg font-semibold text-gray-900">
                      {store.rating}
                    </span>
                    <span className="ml-2 text-gray-600">
                      ({store.reviews} Google reviews)
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {store.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900">{store.address}</p>
                      <p className="text-gray-600">{store.city}, {store.state} {store.zipCode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <button
                      onClick={() => setShowCallScheduling(true)}
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {store.phone}
                    </button>
                  </div>
                  
                  {store.website && (
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <a 
                        href={store.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Hours */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Hours
                  <span className={`ml-2 text-sm ${status.color}`}>({status.status})</span>
                </h3>
                <div className="space-y-1">
                  {Object.entries(store.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-gray-600">{day}:</span>
                      <span className={hours === 'Closed' ? 'text-red-600' : 'text-gray-900'}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Store Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {store.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`;
                    window.open(mapsUrl, '_blank');
                  }}
                  className={`${store.videoCallAvailable ? 'flex-1' : 'flex-1'} bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2`}
                >
                  <Navigation className="h-5 w-5" />
                  <span>Get Directions</span>
                </button>
                
                {store.videoCallAvailable && (
                  <button
                    onClick={handleVideoCall}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                  >
                    <Video className="h-5 w-5" />
                    <span>Video Call</span>
                  </button>
                )}
                
                <button
                  onClick={() => window.open(`tel:${store.phone}`, '_self')}
                  onClick={() => setShowCallScheduling(true)}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Phone className="h-5 w-5" />
                </button>
                
                {store.website && (
                  <button
                    onClick={() => window.open(store.website, '_blank')}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {store.videoCallAvailable && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Video className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Video Consultation Available</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Connect with our style experts during: {store.videoCallHours || 'Business hours'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Call Scheduling Modal */}
      <CallSchedulingModal
        store={store}
        isOpen={showCallScheduling}
        onClose={() => setShowCallScheduling(false)}
      />
    </>
  );
};

export default StoreModal;