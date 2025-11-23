import { ShoppingCart } from 'lucide-react';
import { Product } from '../data/mockData';
import { useNotifications } from '../context/NotificationContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addNotification } = useNotifications();

  const handleAddToCart = () => {
    onAddToCart(product.id);
    addNotification({
      type: 'cart',
      title: 'Item Added to Cart',
      message: `${product.title} has been added to your cart`,
      icon: 'shopping-cart'
    });
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-3 text-xs text-gray-600">
          <span>Sizes: {product.sizes.slice(0, 3).join(', ')}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2 font-medium"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
