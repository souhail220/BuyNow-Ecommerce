import {promotions} from "../data/mockData.ts";

export default function Promotions() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo) => {
            const Icon = promo.icon;
            return (
              <div
                key={promo.id}
                className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer"
              >
                <div className="absolute inset-0">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 ${promo.bgColor} opacity-80`}></div>
                </div>
                <div className="relative p-6 text-white">
                  <Icon className="h-10 w-10 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-white/90">{promo.description}</p>
                  <button className="mt-4 bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                    Shop Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
