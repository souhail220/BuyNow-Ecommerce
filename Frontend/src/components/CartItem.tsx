import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types/cart';

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4 hover:shadow-md transition">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
        <p className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
          className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-semibold text-gray-900">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
          className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-900 mb-2">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item.productId)}
          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
