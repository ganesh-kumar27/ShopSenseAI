import React from 'react';
import { createPortal } from 'react-dom';
import { Star, MapPin, Phone, Clock, ExternalLink, Navigation, X, Award, Calendar, DollarSign, Languages } from 'lucide-react';
import { Tailor } from '../types/Tailor';

interface TailorCardProps {
  tailor: Tailor;
  onTailorClick: (tailor: Tailor) => void;
}

const TailorCard: React.FC<TailorCardProps> = ({ tailor, onTailorClick }) => {
  const [showReviewPopup, setShowReviewPopup] = React.useState(false);
  const [showPortfolioPopup, setShowPortfolioPopup] = React.useState(false);

  const getPriceRangeText = (range: string) => {
    switch (range) {
      case '$': return 'Budget-friendly';
      case '$$': return 'Moderate';
      case '$$$': return 'Premium';
      case '$$$$': return 'Luxury';
      default: return 'Price varies';
    }
  };

  const getCurrentStatus = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const todayHours = tailor.hours[currentDay];
    
    if (!todayHours || todayHours === 'Closed') {
      return { status: 'Closed', color: 'text-red-600' };
    }
    return { status: 'Open', color: 'text-green-600' };
  };

  const status = getCurrentStatus();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden h-48">
        <img
          src={tailor.image}
          alt={tailor.businessName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Verified Badge */}
        {tailor.isVerified && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Award className="h-3 w-3" />
            <span>Verified</span>
          </div>
        )}
        
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-lg">
          <span className="text-sm font-medium text-gray-700">{tailor.priceRange}</span>
        </div>
        <div className="absolute bottom-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-lg">
          <span className={`text-sm font-medium ${status.color}`}>{status.status}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 text-lg">{tailor.businessName}</h3>
            <span className="text-sm text-gray-500">{tailor.distance} mi</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">by {tailor.name}</p>
          <p className="text-sm text-gray-500">{getPriceRangeText(tailor.priceRange)} • {tailor.experience}</p>
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
                {tailor.rating} ({tailor.reviews} reviews)
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              {tailor.address}, {tailor.city}, {tailor.state} {tailor.zipCode}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <p className="text-sm text-gray-600">{tailor.phone}</p>
          </div>
          
          <div className="flex items-start space-x-2">
            <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p className={status.color}>{status.status}</p>
              <p className="text-xs text-gray-500">
                {tailor.hours[new Date().toLocaleDateString('en-US', { weekday: 'long' })]}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Consultation: ${tailor.consultationFee} • {tailor.turnaroundTime}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {tailor.specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onTailorClick(tailor)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-medium text-sm"
          >
            View Details
          </button>
          
          {tailor.portfolioImages.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPortfolioPopup(true);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Portfolio
            </button>
          )}
          
          <button
            onClick={() => {
              const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${tailor.coordinates.lat},${tailor.coordinates.lng}`;
              window.open(mapsUrl, '_blank');
            }}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            title="Get Directions"
          >
            <Navigation className="h-4 w-4" />
          </button>
          
          {tailor.website && (
            <button
              onClick={() => window.open(tailor.website, '_blank')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex-shrink-0"
              title="Visit Website"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Review Summary Popup */}
      {showReviewPopup && (
        createPortal(
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" 
              onClick={() => setShowReviewPopup(false)} 
            />
            
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
                        {tailor.rating} out of 5 stars ({tailor.reviews} reviews)
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{tailor.businessName}</h4>
                    <p className="text-sm text-gray-600 mb-2">by {tailor.name} • {tailor.priceRange}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">AI-Generated Summary:</h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {tailor.reviewSummary}
                    </p>
                  </div>

                  {tailor.certifications.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Certifications</span>
                      </div>
                      <div className="space-y-1">
                        {tailor.certifications.map((cert, index) => (
                          <p key={index} className="text-xs text-green-700">• {cert}</p>
                        ))}
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

      {/* Portfolio Popup */}
      {showPortfolioPopup && (
        createPortal(
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" 
              onClick={() => setShowPortfolioPopup(false)} 
            />
            
            <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tailor.name}'s Portfolio
                  </h3>
                  <button
                    onClick={() => setShowPortfolioPopup(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tailor.portfolioImages.map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`${tailor.name} work ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {tailor.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
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

export default TailorCard;