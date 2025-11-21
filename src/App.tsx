import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Filters, { FilterState } from './components/Filters';
import ProductGrid from './components/ProductGrid';
import Promotions from './components/Promotions';
import Cart from './pages/Cart';
import { CartProvider, useCart } from './context/CartContext';
import { products, categories, brands } from './data/mockData';

function AppContent() {
  const { cartCount, addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState<'shop' | 'cart'>('shop');
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

  if (currentPage === 'cart') {
    return (
      <>
        <Navbar
          cartCount={cartCount}
          onSearchChange={setSearchQuery}
          onCartClick={() => setCurrentPage('cart')}
        />
        <Cart onBackToShop={() => setCurrentPage('shop')} />
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">BuyNow</h3>
                <p className="text-gray-400">Your one-stop shop for fashion and lifestyle.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Men</li>
                  <li>Women</li>
                  <li>Kids</li>
                  <li>Accessories</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Help</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Contact Us</li>
                  <li>Shipping Info</li>
                  <li>Returns</li>
                  <li>FAQs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Instagram</li>
                  <li>Facebook</li>
                  <li>Twitter</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 BuyNow. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        cartCount={cartCount}
        onSearchChange={setSearchQuery}
        onCartClick={() => setCurrentPage('cart')}
      />
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

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BuyNow</h3>
              <p className="text-gray-400">Your one-stop shop for fashion and lifestyle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a className="cursor-pointer hover:underline">Men</a></li>
                <li><a className="cursor-pointer hover:underline">Women</a></li>
                <li><a className="cursor-pointer hover:underline">Kids</a></li>
                <li><a className="cursor-pointer hover:underline">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a className="cursor-pointer hover:underline">Contact Us</a></li>
                <li><a className="cursor-pointer hover:underline">Shipping Info</a></li>
                <li><a className="cursor-pointer hover:underline">Returns</a></li>
                <li><a className="cursor-pointer hover:underline">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a className="cursor-pointer hover:underline">Instagram</a></li>
                <li><a className="cursor-pointer hover:underline">Facebook</a></li>
                <li><a className="cursor-pointer hover:underline">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BuyNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
