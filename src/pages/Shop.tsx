import { useState } from 'react';
import {useCart} from "../context/CartContext.tsx";
import Filters from "../components/Filters.tsx";
import {brands, categories, products} from "../data/mockData.ts";
import Hero from "../components/Hero.tsx";
import Categories from "../components/Categories.tsx";
import Promotions from "../components/Promotions.tsx";
import ProductGrid from "../components/ProductGrid.tsx";
import useFilteredProducts from "../services/UseFilteredProducts.tsx";
import {FilterState} from "../types/filterType.ts";

interface ShopProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}
const Shop = ({ searchQuery } : ShopProps) => {
    const { addToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filters, setFilters] = useState<FilterState>({
        priceRange: [0, 300],
        brands: [],
        sizes: [],
        colors: [],
        sortBy: 'featured'
    });

    const { filteredProducts, allSizes, allColors } = useFilteredProducts(searchQuery, selectedCategory, filters);

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

    return (
        <div className="min-h-screen bg-gray-50">
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
        </div>
    );
};

export default Shop;