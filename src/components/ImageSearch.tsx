import React, { useState } from 'react';
import { X, Camera, Upload, Search } from 'lucide-react';
import { Product } from '../types/Product';

interface ImageSearchProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSearchResults: (results: Product[]) => void;
}

const ImageSearch: React.FC<ImageSearchProps> = ({
  isOpen,
  onClose,
  products,
  onSearchResults
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (!selectedImage) return;
    
    setIsSearching(true);
    
    // Simulate AI image search
    setTimeout(() => {
      // Mock search results - in a real app, this would use AI image recognition
      const mockResults = products.filter(() => Math.random() > 0.7);
      onSearchResults(mockResults);
      setIsSearching(false);
      onClose();
      setSelectedImage(null);
    }, 2000);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Search by Image
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {!selectedImage ? (
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors duration-200">
                  <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload an Image</h3>
                  <p className="text-gray-600 mb-4">
                    Upload a photo of clothing to find similar items
                  </p>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium inline-flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>Choose Image</span>
                    </span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="max-w-full h-48 object-contain mx-auto rounded-lg"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Choose Different Image
                  </button>
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                  >
                    {isSearching ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Searching...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        <span>Find Similar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSearch;