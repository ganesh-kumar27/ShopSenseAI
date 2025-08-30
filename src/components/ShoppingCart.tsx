import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types/Product';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}) => {
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Shopping Cart ({totalItems})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-2">Add some items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.brand}</p>
                        {item.selectedSize && (
                          <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                        )}
                        {item.selectedColor && (
                          <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-gray-900">${item.price}</span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 bg-white border rounded text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;