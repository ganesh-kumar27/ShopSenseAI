import React, { useState } from 'react';
import { Calendar, ChevronDown, X, Sparkles } from 'lucide-react';

interface OccasionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOccasionSelect: (occasion: string) => void;
  selectedOccasion: string;
}

const occasions = [
  {
    category: 'Professional',
    items: [
      { id: 'office', name: 'Office Wear', description: 'Professional attire for daily work' },
      { id: 'business', name: 'Business Meetings', description: 'Formal business presentations' },
      { id: 'interviews', name: 'Job Interviews', description: 'Make a great first impression' },
      { id: 'business casual', name: 'Business Casual', description: 'Relaxed professional look' },
      { id: 'meetings', name: 'Client Meetings', description: 'Professional client interactions' }
    ]
  },
  {
    category: 'Formal Events',
    items: [
      { id: 'formal', name: 'Formal Events', description: 'Black-tie and formal occasions' },
      { id: 'wedding', name: 'Weddings', description: 'Wedding guest attire' },
      { id: 'dinner', name: 'Dinner Parties', description: 'Elegant dinner occasions' },
      { id: 'cocktail', name: 'Cocktail Events', description: 'Semi-formal cocktail parties' },
      { id: 'gala', name: 'Gala Events', description: 'Upscale evening events' }
    ]
  },
  {
    category: 'Casual & Lifestyle',
    items: [
      { id: 'casual', name: 'Casual Wear', description: 'Everyday comfortable clothing' },
      { id: 'weekend', name: 'Weekend Outings', description: 'Relaxed weekend activities' },
      { id: 'date', name: 'Date Night', description: 'Romantic dinner or casual dates' },
      { id: 'smart casual', name: 'Smart Casual', description: 'Polished yet relaxed look' },
      { id: 'everyday', name: 'Everyday Wear', description: 'Daily comfort and style' }
    ]
  },
  {
    category: 'Active & Sports',
    items: [
      { id: 'gym', name: 'Gym & Fitness', description: 'Workout and exercise gear' },
      { id: 'sports', name: 'Sports Activities', description: 'Athletic and sports wear' },
      { id: 'running', name: 'Running', description: 'Running and jogging attire' },
      { id: 'workout', name: 'Workout Sessions', description: 'Training and fitness clothing' },
      { id: 'active', name: 'Active Lifestyle', description: 'Performance and active wear' }
    ]
  },
  {
    category: 'Seasonal & Special',
    items: [
      { id: 'summer', name: 'Summer Events', description: 'Hot weather occasions' },
      { id: 'winter', name: 'Winter Occasions', description: 'Cold weather events' },
      { id: 'vacation', name: 'Vacation & Travel', description: 'Holiday and travel wear' },
      { id: 'outdoor', name: 'Outdoor Activities', description: 'Nature and outdoor events' },
      { id: 'party', name: 'Parties', description: 'Social gatherings and celebrations' }
    ]
  }
];

const OccasionMenu: React.FC<OccasionMenuProps> = ({
  isOpen,
  onClose,
  onOccasionSelect,
  selectedOccasion
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Professional');

  if (!isOpen) return null;

  const handleOccasionClick = (occasionId: string) => {
    onOccasionSelect(occasionId);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-blue-600">
          <h2 className="text-lg font-semibold text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Shop by Occasion
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="p-4">
          {selectedOccasion && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Currently shopping for: {occasions.flatMap(cat => cat.items).find(item => item.id === selectedOccasion)?.name}
                </span>
              </div>
              <button
                onClick={() => onOccasionSelect('')}
                className="text-xs text-blue-600 hover:text-blue-700 mt-1"
              >
                Clear selection
              </button>
            </div>
          )}

          <div className="space-y-2">
            {occasions.map((category) => (
              <div key={category.category} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.category ? null : category.category
                  )}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">{category.category}</span>
                  <ChevronDown 
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      expandedCategory === category.category ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedCategory === category.category && (
                  <div className="bg-white">
                    {category.items.map((occasion) => (
                      <button
                        key={occasion.id}
                        onClick={() => handleOccasionClick(occasion.id)}
                        className={`w-full text-left p-4 border-t border-gray-100 hover:bg-blue-50 transition-colors duration-200 ${
                          selectedOccasion === occasion.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">{occasion.name}</h4>
                            <p className="text-sm text-gray-600">{occasion.description}</p>
                          </div>
                          {selectedOccasion === occasion.id && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Personalized Recommendations</span>
            </div>
            <p className="text-xs text-purple-700">
              Results are tailored based on your profile preferences, size, and style choices for the perfect fit and look.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OccasionMenu;