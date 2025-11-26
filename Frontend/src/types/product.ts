export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    brand: string;
    sizes: string[];
    colors: string[];
}

export interface Category {
    id: string;
    name: string;
    image: string;
}