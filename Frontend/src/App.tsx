import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import { CartProvider } from './context/CartContext';
import { ProfileProvider } from './context/ProfileContext';
import { NotificationProvider } from './context/NotificationContext';
import {HomeLayout} from "./pages/HomeLayout.tsx";
import Shop from "./pages/Shop.tsx";
import NotificationPanel from "./components/NotificationPanel.tsx";

function AppContent() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
      <HomeLayout
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          onSearchChange={setSearchQuery}
      >
          <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
          <Routes>
              <Route path="/" element={<Shop searchQuery={searchQuery} onSearchChange={setSearchQuery} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
          </Routes>
      </HomeLayout>
  );
}

function App() {
  return (
      <BrowserRouter>
          <CartProvider>
              <ProfileProvider>
                  <NotificationProvider>
                      <AppContent />
                  </NotificationProvider>
              </ProfileProvider>
          </CartProvider>
      </BrowserRouter>
  );
}

export default App;
