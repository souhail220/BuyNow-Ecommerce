import { ReactNode } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../shared/Navbar.tsx";
import { Footer } from "../shared/Footer.tsx";
import { useCart } from "../context/CartContext.tsx";

interface LayoutProps {
    children: ReactNode;
    showNotifications: boolean;
    setShowNotifications: (show: boolean) => void;
    onSearchChange: (query: string) => void;
}

export const HomeLayout = ({
        children,
        showNotifications,
        setShowNotifications,
        onSearchChange
    }: LayoutProps) => {
    const navigate = useNavigate();
    const { cartCount } = useCart();
    return (
        <>
            <Navbar
                cartCount={cartCount}
                onSearchChange={onSearchChange}
                onCartClick={() => navigate('/cart')}
                onProfileClick={() => navigate('/profile')}
                notificationsOpen={showNotifications}
                onNotificationsToggle={setShowNotifications}
            />
            {children}
            <Footer />
        </>
    );
};
