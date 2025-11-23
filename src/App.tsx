import { useState, useMemo } from 'react';
import Navbar from './shared/Navbar.tsx';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Filters, { FilterState } from './components/Filters';
import ProductGrid from './components/ProductGrid';
import Promotions from './components/Promotions';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import NotificationPanel from './components/NotificationPanel';
import { CartProvider, useCart } from './context/CartContext';
import { ProfileProvider } from './context/ProfileContext';
import { NotificationProvider } from './context/NotificationContext';
import { products, categories, brands } from './data/mockData';
import {Footer} from "./shared/Footer.tsx";

function AppContent() {
  const { cartCount, addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState<'shop' | 'cart' | 'profile'>('shop');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 300],
    brands: [],
    sizes: [],
    colors: [],
    sortBy: 'featured'
  });

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes).sort();
  }, []);

  const allColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach(p => p.colors.forEach(c => colors.add(c)));
    return Array.from(colors).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }

    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes.some(size => filters.sizes.includes(size))
      );
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter(p =>
        p.colors.some(color => filters.colors.includes(color))
      );
    }

    filtered = filtered.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, filters]);

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(prev => prev === category ? '' : category);
  };

  if (currentPage === 'profile') {
    return (
      <>
        <Navbar
          cartCount={cartCount}
          onSearchChange={setSearchQuery}
          onCartClick={() => setCurrentPage('cart')}
          onProfileClick={() => setCurrentPage('profile')}
          notificationsOpen={showNotifications}
          onNotificationsToggle={setShowNotifications}
        />
        <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        <Profile onBack={() => setCurrentPage('shop')} />
        <Footer />
      </>
    );
  }

  if (currentPage === 'cart') {
    return (
      <>
        <Navbar
          cartCount={cartCount}
          onSearchChange={setSearchQuery}
          onCartClick={() => setCurrentPage('cart')}
          onProfileClick={() => setCurrentPage('profile')}
          notificationsOpen={showNotifications}
          onNotificationsToggle={setShowNotifications}
        />
        <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        <Cart onBackToShop={() => setCurrentPage('shop')} />
          <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        cartCount={cartCount}
        onSearchChange={setSearchQuery}
        onCartClick={() => setCurrentPage('cart')}
        onProfileClick={() => setCurrentPage('profile')}
        notificationsOpen={showNotifications}
        onNotificationsToggle={setShowNotifications}
      />
      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <Hero />
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <Promotions />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters
          filters={filters}
          onFilterChange={setFilters}
          availableBrands={brands}
          availableSizes={allSizes}
          availableColors={allColors}
        />

        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProducts.length}</span> products
          </p>
        </div>

        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      </div>
        <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <ProfileProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </ProfileProvider>
    </CartProvider>
  );
}

export default App;
