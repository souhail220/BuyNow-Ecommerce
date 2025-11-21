import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Summer Collection 2024
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Discover the latest trends with up to 50% off on selected items.
            Shop now and elevate your style!
          </p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center space-x-2 shadow-lg">
            <span>Shop Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden lg:block opacity-20">
        <div className="w-96 h-96 bg-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
}
