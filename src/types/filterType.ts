export type SortBy = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export interface FilterState {
    priceRange: [number, number];
    brands: string[];
    sizes: string[];
    colors: string[];
    sortBy: SortBy;
}

export interface FiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    availableBrands: string[];
    availableSizes: string[];
    availableColors: string[];
}