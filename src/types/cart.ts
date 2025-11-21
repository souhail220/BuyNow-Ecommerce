export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: { id: string; title: string; price: number; image: string; category: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  tax: number;
  total: number;
}
