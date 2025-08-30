import React, { useState } from 'react';
import { Scissors, MapPin, Filter, ArrowLeft } from 'lucide-react';
import { Tailor } from '../types/Tailor';
import TailorCard from './TailorCard';
import TailorModal from './TailorModal';

interface TailoringViewProps {
  tailors: Tailor[];
  onBack: () => void;
  hideBackButton?: boolean;
}

const TailoringView: React.FC<TailoringViewProps> = ({ tailors, onBack, hideBackButton = false }) => {
  const [selectedTailor, setSelectedTailor] = useState<Tailor | null>(null);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name' | 'price'>('rating');
  const [filterBy, setFilterBy] = useState<string>('');

  const filteredAndSortedTailors = tailors
    .filter(tailor => {
      if (!filterBy) return true;
      return tailor.specialties.some(specialty => 
        specialty.toLowerCase().includes(filterBy.toLowerCase())
      ) || tailor.name.toLowerCase().includes(filterBy.toLowerCase()) ||
      tailor.businessName.toLowerCase().includes(filterBy.toLowerCase());
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.businessName.localeCompare(b.businessName);
        case 'price':
          return a.consultationFee - b.consultationFee;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      {!hideBackButton && (
        <div className="text-center py-6">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={onBack}
              className="absolute left-4 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Scissors className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Custom Tailoring Services</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find verified professional tailors near you. Get custom clothing, alterations, and expert craftsmanship with transparent pricing and reviews.
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Showing {filteredAndSortedTailors.length} verified tailors near you
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Specialties</option>
                <option value="suits">Suits</option>
                <option value="formal">Formal Wear</option>
                <option value="wedding">Wedding Attire</option>
                <option value="alterations">Alterations</option>
                <option value="vintage">Vintage</option>
                <option value="traditional">Traditional Wear</option>
              </select>
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating' | 'name' | 'price')}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="rating">Sort by Rating</option>
              <option value="distance">Sort by Distance</option>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tailors Grid */}
      {filteredAndSortedTailors.length === 0 ? (
        <div className="text-center py-8">
          <Scissors className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No tailors found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredAndSortedTailors.map((tailor) => (
            <TailorCard
              key={tailor.id}
              tailor={tailor}
              onTailorClick={setSelectedTailor}
            />
          ))}
        </div>
      )}

      {/* Info Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Scissors className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h4 className="font-bold text-purple-900 mb-2">🧵 Why Choose Custom Tailoring?</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• <strong>Perfect Fit:</strong> Clothing tailored specifically to your measurements</li>
              <li>• <strong>Quality Craftsmanship:</strong> Expert tailors with years of experience</li>
              <li>• <strong>Personalized Service:</strong> One-on-one consultations and fittings</li>
              <li>• <strong>Verified Professionals:</strong> All tailors are verified and reviewed</li>
              <li>• <strong>Transparent Pricing:</strong> Clear consultation fees and turnaround times</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tailor Modal */}
      <TailorModal
        tailor={selectedTailor}
        isOpen={!!selectedTailor}
        onClose={() => setSelectedTailor(null)}
      />
    </div>
  );
};

export default TailoringView;