import React from 'react';
import { X, Star, MapPin, Phone, Clock, Navigation, ExternalLink, Wifi, CreditCard, Video } from 'lucide-react';
import { Store } from '../types/Store';
import CallSchedulingModal from './CallSchedulingModal';
import VideoCallBookingModal from './VideoCallBookingModal';

interface StoreModalProps {
  store: Store | null;
  isOpen: boolean;
  onClose: () => void;
}

const StoreModal: React.FC<StoreModalProps> = ({ store, isOpen, onClose }) => {
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
    if (!store) return [];
    
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
    if (!selectedDate || !store) return [];
    
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
  }, [selectedDate, availableDates, store]);

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

      {/* Video Call Popup */}
      {showVideoCallPopup && (
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
                    onClick={() => {
                      setShowVideoCallPopup(false);
                      // Simulate booking process
                      setTimeout(() => {
                        alert(`Video consultation booking initiated! 📹\n\nStore: ${store.name}\nService: 15-minute video consultation\n\nIn a real app, this would open a booking system to schedule your video call with available time slots.`);
                      }, 100);
                    }}
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
        </>
      )}
    </>
  );
};

export default StoreModal;