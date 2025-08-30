import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ExternalLink, Truck, Shield, RotateCcw } from 'lucide-react';
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
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

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
            <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
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

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-blue-600 font-medium mb-1">{product.brand}</p>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
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
              {product.colors.length > 1 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
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
                <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border border-gray-300 rounded-lg font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                
                <button
                  onClick={() => window.open(`https://${product.platform.toLowerCase()}.com`, '_blank')}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>View on {product.platform}</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="h-4 w-4" />
                  <span>Delivery: {product.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment & buyer protection</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <RotateCcw className="h-4 w-4" />
                  <span>Easy returns & exchanges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSearch;