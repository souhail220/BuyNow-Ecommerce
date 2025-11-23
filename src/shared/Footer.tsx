export const Footer = () => {
    return (
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
    );
};