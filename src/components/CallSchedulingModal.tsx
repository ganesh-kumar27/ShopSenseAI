import React, { useState, useMemo } from 'react';
import { X, Phone, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Store } from '../types/Store';

interface CallSchedulingModalProps {
  store: Store | null;
  isOpen: boolean;
  onClose: () => void;
}

const CallSchedulingModal: React.FC<CallSchedulingModalProps> = ({ store, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen || !store) return null;

  // Generate next 7 days for date selection
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const storeHours = store.hours[dayName];
      
      if (storeHours && storeHours !== 'Closed') {
        dates.push({
          date: date.toISOString().split('T')[0],
          displayDate: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          dayName,
          hours: storeHours,
          isToday: i === 0
        });
      }
    }
    
    return dates;
  }, [store]);

  // Generate time slots based on store hours
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    
    const selectedDateInfo = availableDates.find(d => d.date === selectedDate);
    if (!selectedDateInfo || selectedDateInfo.hours === 'Closed') return [];
    
    // Parse store hours (simplified - assumes format like "9:00 AM - 9:00 PM")
    const [openTime, closeTime] = selectedDateInfo.hours.split(' - ');
    
    // Convert to 24-hour format for easier calculation
    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let hour24 = hours;
      
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;
      
      return hour24 * 60 + minutes; // Return minutes from midnight
    };
    
    const openMinutes = parseTime(openTime);
    const closeMinutes = parseTime(closeTime);
    
    const slots = [];
    
    // Generate 15-minute slots
    for (let minutes = openMinutes; minutes < closeMinutes; minutes += 15) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      
      // Convert back to 12-hour format
      let displayHour = hours;
      const period = hours >= 12 ? 'PM' : 'AM';
      
      if (hours === 0) displayHour = 12;
      else if (hours > 12) displayHour = hours - 12;
      
      const timeString = `${displayHour}:${mins.toString().padStart(2, '0')} ${period}`;
      
      // Check if slot is available (simulate some booked slots)
      const isBooked = Math.random() < 0.3; // 30% chance of being booked
      
      slots.push({
        time: timeString,
        minutes,
        isBooked,
        isAvailable: !isBooked
      });
    }
    
    return slots;
  }, [selectedDate, availableDates]);

  const handleConfirmCall = () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsConfirmed(true);
    
    // Simulate booking confirmation
    setTimeout(() => {
      alert(`Call scheduled successfully!\n\nStore: ${store.name}\nDate: ${availableDates.find(d => d.date === selectedDate)?.displayDate}\nTime: ${selectedTime}\n\nYou will receive a confirmation call 5 minutes before your scheduled time.`);
      onClose();
      setIsConfirmed(false);
      setSelectedDate('');
      setSelectedTime('');
    }, 2000);
  };

  const handleReset = () => {
    setSelectedDate('');
    setSelectedTime('');
    setIsConfirmed(false);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-green-600" />
              Schedule a Call with {store.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {!isConfirmed ? (
              <div className="space-y-6">
                {/* Store Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{store.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{store.brand}</p>
                  <p className="text-sm text-gray-600">{store.phone}</p>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Select Date
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
                          {dateInfo.hours}
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
                      Select Time (15-minute slots)
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

                {/* Call Purpose */}
                {selectedDate && selectedTime && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Call Purpose (Optional)
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="">Select purpose</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="size-consultation">Size Consultation</option>
                      <option value="availability">Check Availability</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="store-visit">Plan Store Visit</option>
                      <option value="general">General Questions</option>
                    </select>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleConfirmCall}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Schedule Call</span>
                  </button>
                </div>

                {/* Info */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-900 mb-1">How it works</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Select your preferred date and time slot</li>
                        <li>• Store representative will call you at the scheduled time</li>
                        <li>• Get personalized assistance and product information</li>
                        <li>• No charges for the consultation call</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Confirmation Screen */
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scheduling Your Call...</h3>
                <p className="text-gray-600">Please wait while we confirm your appointment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CallSchedulingModal;