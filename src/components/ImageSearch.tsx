import React, { useState } from 'react';
import { Upload, X, Camera, Image as ImageIcon } from 'lucide-react';
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
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateImageSearch = () => {
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, return random products based on uploaded image
      // In a real app, this would use image recognition AI
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      const results = shuffled.slice(0, Math.floor(Math.random() * 4) + 3);
      
      onSearchResults(results);
      setIsSearching(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
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
            {!uploadedImage ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop an image here, or</p>
                <label className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg cursor-pointer transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    className="hidden"
                  />
                  Choose File
                </label>
                <p className="text-sm text-gray-500 mt-3">
                  Upload a photo of clothing to find similar items
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={simulateImageSearch}
                  disabled={isSearching}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4" />
                      <span>Find Similar Items</span>
                    </>
                  )}
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  AI will analyze your image and find similar clothing items
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSearch;