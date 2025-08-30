import React, { useState, useMemo } from 'react';
import { X, Video, Calendar, Clock, CheckCircle, User, Phone } from 'lucide-react';
import { Store } from '../types/Store';

interface VideoCallBookingModalProps {
  store: Store | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoCallBookingModal: React.FC<VideoCallBookingModalProps> = ({ store, isOpen, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationPurpose, setConsultationPurpose] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen || !store) return null;

  // Generate next 7 business days for date selection
  const availableDates = useMemo(() => {
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
  const availableTimeSlots = useMemo(() => {
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

  const handleBooking = () => {
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
        handleClose();
      }, 2000);
    }, 2000);
  };

  const handleClose = () => {
    setCustomerName('');
    setCustomerPhone('');
    setSelectedDate('');
    setSelectedTime('');
    setConsultationPurpose('');
    setIsBooking(false);
    setIsConfirmed(false);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Video className="h-5 w-5 mr-2 text-green-600" />
              Book Video Consultation - {store.name}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {!isConfirmed ? (
              <div className="space-y-6">
                {/* Store Info */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">{store.name}</h3>
                  <p className="text-sm text-green-800 mb-1">{store.brand} • {store.phone}</p>
                  <p className="text-sm text-green-700">15-minute video consultation available during: {store.videoCallHours || 'Business hours'}</p>
                </div>

                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Select Date *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {availableDates.map((dateInfo) => (
                      <button
                        key={dateInfo.date}
                        onClick={() => {
                          setSelectedDate(dateInfo.date);
                          setSelectedTime(''); // Reset time when date changes
                        }}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                          selectedDate === dateInfo.date
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {dateInfo.isToday ? 'Today' : dateInfo.displayDate}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Available
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Clock className="h-4 w-4 inline mr-2" />
                      Select 15-minute Time Slot *
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                      {availableTimeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTime(slot.time)}
                          disabled={slot.isBooked}
                          className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                    
                    {availableTimeSlots.length === 0 && (
                      <div className="text-center py-8">
                        <Clock className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                        <p className="text-gray-500">No available time slots for this date</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Consultation Purpose */}
                {selectedDate && selectedTime && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Purpose (Optional)
                    </label>
                    <select 
                      value={consultationPurpose}
                      onChange={(e) => setConsultationPurpose(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select purpose</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="size-consultation">Size Consultation</option>
                      <option value="style-advice">Style Advice</option>
                      <option value="availability">Check Availability</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="virtual-try-on">Virtual Try-On</option>
                      <option value="general">General Questions</option>
                    </select>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleClose}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={!customerName.trim() || !customerPhone.trim() || !selectedDate || !selectedTime || isBooking}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                  >
                    {isBooking ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <Video className="h-4 w-4" />
                        <span>Book 15-min Video Call</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Benefits Info */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Video className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Video Consultation Benefits</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Get personalized style advice from store experts</li>
                        <li>• See products up close with live video demonstration</li>
                        <li>• Ask questions about fit, sizing, and availability</li>
                        <li>• Receive styling tips and outfit recommendations</li>
                        <li>• Schedule convenient 15-minute sessions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Confirmation Screen */
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-4">Your 15-minute video consultation has been scheduled</p>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-left">
                  <h4 className="font-medium text-green-900 mb-2">Booking Details:</h4>
                  <div className="text-sm text-green-800 space-y-1">
                    <p><strong>Store:</strong> {store.name}</p>
                    <p><strong>Date:</strong> {availableDates.find(d => d.date === selectedDate)?.displayDate}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>Duration:</strong> 15 minutes</p>
                    <p><strong>Customer:</strong> {customerName}</p>
                    <p><strong>Phone:</strong> {customerPhone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCallBookingModal;