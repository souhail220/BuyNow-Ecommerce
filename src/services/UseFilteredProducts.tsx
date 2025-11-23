import { useMemo } from 'react';
import {products} from "../data/mockData.ts";
import {FilterState} from "../components/Filters.tsx";

const useFilteredProducts = (searchQuery: string, selectedCategory: string, filters: FilterState) => {
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

    return { filteredProducts, allSizes, allColors };
};

export default useFilteredProducts;