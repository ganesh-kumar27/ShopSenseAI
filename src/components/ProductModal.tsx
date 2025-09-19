import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Share2, Minus, Plus, Store } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const getPlatformLogo = (platform: string) => {
    const platformColors = {
      'Myntra': 'text-pink-600',
      'Flipkart': 'text-blue-600',
      'Amazon': 'text-orange-500',
      'Meesho': 'text-purple-600'
    };
    
    return (
      <div className={`flex items-center space-x-1 ${platformColors[platform as keyof typeof platformColors] || 'text-gray-600'}`}>
        <Store className="h-4 w-4" />
        <span className="text-sm font-medium">{platform}</span>
      </div>
    );
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index
                          ? 'border-blue-500'
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
               {getPlatformLogo(product.platform)}
                <p className="text-sm text-blue-600 font-medium">{product.brand}</p>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-600">{product.description}</p>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                          selectedColor === color
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                </button>
                
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;