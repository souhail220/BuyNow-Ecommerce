import { ReactNode } from "react";
import Navbar from "../shared/Navbar.tsx";
import { Footer } from "../shared/Footer.tsx";
import { useCart } from "../context/CartContext.tsx";

interface LayoutProps {
    children: ReactNode;
    currentPage: 'shop' | 'cart' | 'profile';
    setCurrentPage: (page: 'shop' | 'cart' | 'profile') => void;
    showNotifications: boolean;
    setShowNotifications: (show: boolean) => void;
    onSearchChange: (query: string) => void;
}

export const HomeLayout = ({
        children,
        setCurrentPage,
        showNotifications,
        setShowNotifications,
        onSearchChange
    }: LayoutProps) => {
    const { cartCount } = useCart();
    return (
        <>
            <Navbar
                cartCount={cartCount}
                onSearchChange={onSearchChange}
                onCartClick={() => setCurrentPage('cart')}
                onProfileClick={() => setCurrentPage('profile')}
                notificationsOpen={showNotifications}
                onNotificationsToggle={setShowNotifications}
            />
            {children}
            <Footer />
        </>
    );
};
