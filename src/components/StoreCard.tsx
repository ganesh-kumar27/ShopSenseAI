import React from 'react';
import { createPortal } from 'react-dom';
import { Star, MapPin, Phone, Clock, ExternalLink, Navigation, X, Video } from 'lucide-react';
import { Store } from '../types/Store';
import CallSchedulingModal from './CallSchedulingModal';
import VideoCallBookingModal from './VideoCallBookingModal';

interface StoreCardProps {
  store: Store;
  onStoreClick: (store: Store) => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onStoreClick }) => {
  const [showReviewPopup, setShowReviewPopup] = React.useState(false);
  const [showPromotionPopup, setShowPromotionPopup] = React.useState(false);
  const [showCallScheduling, setShowCallScheduling] = React.useState(false);
  const [showVideoCallPopup, setShowVideoCallPopup] = React.useState(false);
  const [showSlotBooking, setShowSlotBooking] = React.useState(false);
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');
  const [isBooking, setIsBooking] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  // Generate next 7 business days for date selection
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const videoCallHours = store.videoCallHours || store.hours[dayName];
      
      if (videoCallHours && videoCallHours !== 'Closed') {
        dates.push({
          date: date.toISOString().split('T')[0],
          displayDate: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          dayName,
          hours: videoCallHours,
          isToday: i === 0
        });
      }
    }
    
    return dates;
  }, [store]);

  // Generate 15-minute time slots based on video call hours
  const availableTimeSlots = React.useMemo(() => {
    if (!selectedDate) return [];
    
    const selectedDateInfo = availableDates.find(d => d.date === selectedDate);
    if (!selectedDateInfo || selectedDateInfo.hours === 'Closed') return [];
    
    // Parse hours (simplified - assumes format like "9:00 AM - 8:00 PM")
    const [openTime, closeTime] = selectedDateInfo.hours.split(' - ');
    
    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let hour24 = hours;
      
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;
      
      return hour24 * 60 + minutes;
    };
    
    const openMinutes = parseTime(openTime);
    const closeMinutes = parseTime(closeTime);
    
    const slots = [];
    
    // Generate 15-minute slots
    for (let minutes = openMinutes; minutes < closeMinutes; minutes += 15) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      
      let displayHour = hours;
      const period = hours >= 12 ? 'PM' : 'AM';
      
      if (hours === 0) displayHour = 12;
      else if (hours > 12) displayHour = hours - 12;
      
      const timeString = `${displayHour}:${mins.toString().padStart(2, '0')} ${period}`;
      
      // Simulate some booked slots (30% chance)
      const isBooked = Math.random() < 0.3;
      
      slots.push({
        time: timeString,
        minutes,
        isBooked,
        isAvailable: !isBooked
      });
    }
    
    return slots;
  }, [selectedDate, availableDates]);

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
    setShowVideoCallPopup(true);
  };

  const handleBookingSubmit = () => {
    if (!customerName.trim() || !customerPhone.trim() || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields and select a time slot.');
      return;
    }
    
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsConfirmed(true);
      setIsBooking(false);
      
      // Show confirmation and close after delay
      setTimeout(() => {
        alert(`Video consultation booked successfully! 📹\n\nStore: ${store.name}\nDate: ${availableDates.find(d => d.date === selectedDate)?.displayDate}\nTime: ${selectedTime}\nDuration: 15 minutes\n\nYou will receive a video call link via SMS 5 minutes before your appointment.`);
        setShowVideoCallPopup(false);
        setShowSlotBooking(false);
        setIsConfirmed(false);
        setCustomerName('');
        setCustomerPhone('');
        setSelectedDate('');
        setSelectedTime('');
      }, 2000);
    }, 2000);
  };

  const handleBackToVideoInfo = () => {
    setShowSlotBooking(false);
    setCustomerName('');
    setCustomerPhone('');
    setSelectedDate('');
    setSelectedTime('');
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

      {/* Video Call Popup */}
      {showVideoCallPopup && (
        createPortal(
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" 
              onClick={() => setShowVideoCallPopup(false)} 
            />
            
            {/* Popup Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Video className="h-5 w-5 fill-current text-green-600 mr-2" />
                    Video Consultation
                  </h3>
                  <button
                    onClick={() => setShowVideoCallPopup(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">{store.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{store.brand} • {store.phone}</p>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {store.rating} out of 5 stars ({store.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  
                  {!showSlotBooking ? (
                    <>
                      <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                        <h5 className="font-medium text-green-900 mb-2">📹 15-Minute Video Consultation Available</h5>
                        <p className="text-sm text-green-800 leading-relaxed mb-3">
                          Connect with our style experts for personalized assistance during: {store.videoCallHours || 'Business hours'}
                        </p>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Get personalized style advice from store experts</li>
                          <li>• See products up close with live video demonstration</li>
                          <li>• Ask questions about fit, sizing, and availability</li>
                          <li>• Receive styling tips and outfit recommendations</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={() => setShowSlotBooking(true)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                        >
                          <Video className="h-5 w-5" />
                          <span>Book 15-min Video Call</span>
                        </button>
                        
                        <button
                          onClick={() => window.open(`tel:${store.phone}`, '_self')}
                          className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                        >
                          <Phone className="h-5 w-5" />
                          <span>Call Store Directly</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {!isConfirmed ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium text-gray-900">Book Your Slot</h5>
                            <button
                              onClick={handleBackToVideoInfo}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Customer Information */}
                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                              <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent"
                                placeholder="Your name"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Phone *</label>
                              <input
                                type="tel"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent"
                                placeholder="Your phone number"
                              />
                            </div>
                          </div>

                          {/* Date Selection */}
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Select Date *</label>
                            <div className="grid grid-cols-2 gap-2">
                              {availableDates.slice(0, 4).map((dateInfo) => (
                                <button
                                  key={dateInfo.date}
                                  onClick={() => {
                                    setSelectedDate(dateInfo.date);
                                    setSelectedTime('');
                                  }}
                                  className={`p-2 rounded text-xs font-medium transition-all duration-200 ${
                                    selectedDate === dateInfo.date
                                      ? 'border-green-500 bg-green-50 text-green-700 border-2'
                                      : 'border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="font-medium">
                                    {dateInfo.isToday ? 'Today' : dateInfo.displayDate}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Time Selection */}
                          {selectedDate && (
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-2">Select Time *</label>
                              <div className="grid grid-cols-3 gap-1 max-h-32 overflow-y-auto">
                                {availableTimeSlots.slice(0, 12).map((slot) => (
                                  <button
                                    key={slot.time}
                                    onClick={() => setSelectedTime(slot.time)}
                                    disabled={slot.isBooked}
                                    className={`p-1 rounded text-xs font-medium transition-all duration-200 ${
                                      slot.isBooked
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : selectedTime === slot.time
                                          ? 'bg-green-500 text-white'
                                          : 'border border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700'
                                    }`}
                                  >
                                    {slot.time}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Book Button */}
                          <button
                            onClick={handleBookingSubmit}
                            disabled={!customerName.trim() || !customerPhone.trim() || !selectedDate || !selectedTime || isBooking}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors duration-200 font-semibold text-sm flex items-center justify-center space-x-2"
                          >
                            {isBooking ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                <span>Booking...</span>
                              </>
                            ) : (
                              <>
                                <Video className="h-4 w-4" />
                                <span>Confirm Booking</span>
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Video className="h-6 w-6 text-green-600" />
                          </div>
                          <h5 className="font-medium text-gray-900 mb-1">Booking Confirmed!</h5>
                          <p className="text-sm text-gray-600">Your video consultation is scheduled</p>
                        </div>
                      )}
                    </>
                  )}
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