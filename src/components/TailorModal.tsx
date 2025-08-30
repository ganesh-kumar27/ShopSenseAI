import React from 'react';
import { X, Star, MapPin, Phone, Clock, Navigation, ExternalLink, Award, Calendar, DollarSign, Languages, Scissors } from 'lucide-react';
import { Tailor } from '../types/Tailor';

interface TailorModalProps {
  tailor: Tailor | null;
  isOpen: boolean;
  onClose: () => void;
}

const TailorModal: React.FC<TailorModalProps> = ({ tailor, isOpen, onClose }) => {
  if (!isOpen || !tailor) return null;

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

  const handleBookConsultation = () => {
    alert(`Booking consultation with ${tailor.name}...\n\nConsultation Fee: $${tailor.consultationFee}\nTurnaround Time: ${tailor.turnaroundTime}\n\nThis would normally open a booking system or redirect to their website.`);
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
            <h2 className="text-xl font-semibold text-gray-900">{tailor.businessName}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Tailor Image and Basic Info */}
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={tailor.image}
                  alt={tailor.businessName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tailor:</span>
                    <span className="font-medium">{tailor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{tailor.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price Range:</span>
                    <span className="font-medium">{tailor.priceRange} - {getPriceRangeText(tailor.priceRange)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">{tailor.distance} miles away</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Turnaround:</span>
                    <span className="font-medium">{tailor.turnaroundTime}</span>
                  </div>
                </div>
              </div>

              {/* Portfolio Images */}
              {tailor.portfolioImages.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Portfolio</h4>
                  <div className="grid grid-cols-2 gap-2">
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
                </div>
              )}

              {/* Interactive Map Placeholder */}
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 mb-4">Interactive Map</p>
                <button
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${tailor.coordinates.lat},${tailor.coordinates.lng}`;
                    window.open(mapsUrl, '_blank');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2 mx-auto"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>

            {/* Tailor Details */}
            <div className="space-y-6">
              {/* Rating and Reviews */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                    <span className="ml-1 text-lg font-semibold text-gray-900">
                      {tailor.rating}
                    </span>
                    <span className="ml-2 text-gray-600">
                      ({tailor.reviews} reviews)
                    </span>
                  </div>
                  {tailor.isVerified && (
                    <div className="ml-3 flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <Award className="h-3 w-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tailor.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                    >
                      {specialty}
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
                      <p className="text-gray-900">{tailor.address}</p>
                      <p className="text-gray-600">{tailor.city}, {tailor.state} {tailor.zipCode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <a href={`tel:${tailor.phone}`} className="text-blue-600 hover:text-blue-700">
                      {tailor.phone}
                    </a>
                  </div>
                  
                  {tailor.website && (
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <a 
                        href={tailor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  {tailor.languages.length > 0 && (
                    <div className="flex items-center space-x-3">
                      <Languages className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600">{tailor.languages.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Services & Pricing */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Scissors className="h-5 w-5 mr-2" />
                  Services & Pricing
                </h3>
                <div className="bg-blue-50 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-900">Consultation Fee</span>
                    <span className="text-blue-800 font-bold">${tailor.consultationFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-900">Typical Turnaround</span>
                    <span className="text-blue-800 font-bold">{tailor.turnaroundTime}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {tailor.services.map((service) => (
                    <div key={service} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{service}</span>
                    </div>
                  ))}
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
                  {Object.entries(tailor.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-gray-600">{day}:</span>
                      <span className={hours === 'Closed' ? 'text-red-600' : 'text-gray-900'}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {tailor.certifications.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Certifications</h3>
                  <div className="space-y-2">
                    {tailor.certifications.map((cert) => (
                      <div key={cert} className="flex items-center space-x-2 text-sm text-gray-600">
                        <Award className="w-4 h-4 text-green-500" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleBookConsultation}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book Consultation</span>
                </button>
                
                <button
                  onClick={() => window.open(`tel:${tailor.phone}`, '_self')}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Phone className="h-5 w-5" />
                </button>
                
                {tailor.website && (
                  <button
                    onClick={() => window.open(tailor.website, '_blank')}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-1">
                  <Scissors className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Professional Tailoring Services</span>
                </div>
                <p className="text-xs text-green-700">
                  {tailor.experience} of experience • Custom fittings and alterations available
                </p>
              </div>
            </div>
          </div>

          {/* Review Summary */}
          <div className="border-t p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Customer Reviews Summary</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {tailor.reviewSummary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TailorModal;