import React, { useState } from 'react';
import { Calendar, ChevronRight, ArrowLeft, X, Sparkles } from 'lucide-react';

interface OccasionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOccasionSelect: (occasion: string) => void;
  selectedOccasion: string;
}

const occasionCategories = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Work and business attire',
    icon: '💼',
    color: 'from-blue-500 to-blue-600',
    items: [
      { id: 'office', name: 'Office Wear', description: 'Professional attire for daily work', icon: '👔' },
      { id: 'business', name: 'Business Meetings', description: 'Formal business presentations', icon: '🤝' },
      { id: 'interviews', name: 'Job Interviews', description: 'Make a great first impression', icon: '📋' },
      { id: 'business casual', name: 'Business Casual', description: 'Relaxed professional look', icon: '👕' },
      { id: 'meetings', name: 'Client Meetings', description: 'Professional client interactions', icon: '💻' }
    ]
  },
  {
    id: 'formal',
    name: 'Formal Events',
    description: 'Special occasions and ceremonies',
    icon: '🎩',
    color: 'from-purple-500 to-purple-600',
    items: [
      { id: 'formal', name: 'Black Tie Events', description: 'Formal evening occasions', icon: '🎭' },
      { id: 'wedding', name: 'Weddings', description: 'Wedding guest attire', icon: '💒' },
      { id: 'dinner', name: 'Dinner Parties', description: 'Elegant dinner occasions', icon: '🍽️' },
      { id: 'cocktail', name: 'Cocktail Events', description: 'Semi-formal cocktail parties', icon: '🍸' },
      { id: 'gala', name: 'Gala Events', description: 'Upscale evening events', icon: '✨' }
    ]
  },
  {
    id: 'casual',
    name: 'Casual & Lifestyle',
    description: 'Everyday and relaxed wear',
    icon: '👕',
    color: 'from-green-500 to-green-600',
    items: [
      { id: 'casual', name: 'Casual Wear', description: 'Everyday comfortable clothing', icon: '👖' },
      { id: 'weekend', name: 'Weekend Outings', description: 'Relaxed weekend activities', icon: '🌞' },
      { id: 'date', name: 'Date Night', description: 'Romantic dinner or casual dates', icon: '💕' },
      { id: 'smart casual', name: 'Smart Casual', description: 'Polished yet relaxed look', icon: '👌' },
      { id: 'everyday', name: 'Everyday Wear', description: 'Daily comfort and style', icon: '🏠' }
    ]
  },
  {
    id: 'active',
    name: 'Active & Sports',
    description: 'Fitness and athletic wear',
    icon: '🏃',
    color: 'from-orange-500 to-orange-600',
    items: [
      { id: 'gym', name: 'Gym & Fitness', description: 'Workout and exercise gear', icon: '💪' },
      { id: 'sports', name: 'Sports Activities', description: 'Athletic and sports wear', icon: '⚽' },
      { id: 'running', name: 'Running', description: 'Running and jogging attire', icon: '🏃‍♂️' },
      { id: 'workout', name: 'Workout Sessions', description: 'Training and fitness clothing', icon: '🏋️' },
      { id: 'active', name: 'Active Lifestyle', description: 'Performance and active wear', icon: '🚴' }
    ]
  },
  {
    id: 'seasonal',
    name: 'Seasonal & Special',
    description: 'Weather and occasion specific',
    icon: '🌟',
    color: 'from-pink-500 to-pink-600',
    items: [
      { id: 'summer', name: 'Summer Events', description: 'Hot weather occasions', icon: '☀️' },
      { id: 'winter', name: 'Winter Occasions', description: 'Cold weather events', icon: '❄️' },
      { id: 'vacation', name: 'Vacation & Travel', description: 'Holiday and travel wear', icon: '✈️' },
      { id: 'outdoor', name: 'Outdoor Activities', description: 'Nature and outdoor events', icon: '🌲' },
      { id: 'party', name: 'Parties', description: 'Social gatherings and celebrations', icon: '🎉' }
    ]
  },
];

const OccasionMenu: React.FC<OccasionMenuProps> = ({
  isOpen,
  onClose,
  onOccasionSelect,
  selectedOccasion
}) => {
  const [currentView, setCurrentView] = useState<'categories' | 'items'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  if (!isOpen) return null;

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setCurrentView('items');
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
  };

  const handleOccasionClick = (occasionId: string) => {
    onOccasionSelect(occasionId);
    onClose();
    setCurrentView('categories');
    setSelectedCategory(null);
  };

  const handleClearSelection = () => {
    onOccasionSelect('');
    onClose();
    setCurrentView('categories');
    setSelectedCategory(null);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Popup Dialog */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className={`p-4 border-b bg-gradient-to-r ${
            currentView === 'categories' 
              ? 'from-purple-600 to-blue-600' 
              : `${selectedCategory?.color} text-white`
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {currentView === 'items' && (
                  <button
                    onClick={handleBackToCategories}
                    className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 text-white" />
                  </button>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-white" />
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {currentView === 'categories' ? 'Shop by Occasion' : selectedCategory?.name}
                    </h2>
                    <p className="text-white text-opacity-90 text-xs">
                      {currentView === 'categories' 
                        ? 'Choose your occasion to get personalized recommendations'
                        : selectedCategory?.description
                      }
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Current Selection Banner */}
            {selectedOccasion && (
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <div>
                      <span className="text-sm font-medium text-purple-800">
                        Currently shopping for:
                      </span>
                      <p className="text-lg font-bold text-purple-900">
                        {occasionCategories.flatMap(cat => cat.items).find(item => item.id === selectedOccasion)?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClearSelection}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm bg-white px-4 py-2 rounded-lg border border-purple-300 hover:border-purple-400 transition-all duration-200 hover:shadow-md"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

            {/* Categories View */}
            {currentView === 'categories' && (
              <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
                {occasionCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex-shrink-0 w-44 min-w-44"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative p-4 text-center">
                      <div className="text-3xl mb-3">{category.icon}</div>
                      <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-center text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                        <span className="text-xs font-medium mr-1">Explore</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Item Count Badge */}
                    <div className="absolute top-2 right-2 bg-gray-100 group-hover:bg-white text-gray-600 text-xs font-bold px-2 py-1 rounded-full transition-colors duration-200">
                      {category.items.length}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Items View */}
            {currentView === 'items' && selectedCategory && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCategory.items.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => handleOccasionClick(item.id)}
                    className={`group relative p-6 rounded-xl transition-all duration-200 text-left border-2 ${
                      selectedOccasion === item.id 
                        ? 'bg-purple-100 border-purple-300 shadow-lg transform scale-105' 
                        : 'bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-50 hover:shadow-md hover:transform hover:scale-102'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl flex-shrink-0">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold mb-2 ${
                          selectedOccasion === item.id ? 'text-purple-900' : 'text-gray-900 group-hover:text-purple-800'
                        }`}>
                          {item.name}
                        </h4>
                        <p className={`text-sm leading-relaxed ${
                          selectedOccasion === item.id ? 'text-purple-700' : 'text-gray-600 group-hover:text-purple-600'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                      {selectedOccasion === item.id && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Personalization Info */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">🎯 Personalized Just for You</h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Our AI analyzes your profile preferences, size, style choices, and preferred brands to curate the perfect collection for your selected occasion. Get recommendations tailored specifically to your taste and needs!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OccasionMenu;