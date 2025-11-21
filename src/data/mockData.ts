export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  sizes: string[];
  colors: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Men',
    image: 'https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    name: 'Women',
    image: 'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    name: 'Kids',
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '4',
    name: 'Shoes',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '5',
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Classic Denim Jacket',
    price: 89.99,
    category: 'Men',
    brand: 'UrbanStyle',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black']
  },
  {
    id: '2',
    title: 'Elegant Summer Dress',
    price: 79.99,
    category: 'Women',
    brand: 'ChicWear',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Pink', 'Blue']
  },
  {
    id: '3',
    title: 'Running Sneakers Pro',
    price: 129.99,
    category: 'Shoes',
    brand: 'SportMax',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'White', 'Red']
  },
  {
    id: '4',
    title: 'Kids Cartoon T-Shirt',
    price: 24.99,
    category: 'Kids',
    brand: 'FunKids',
    image: 'https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['4Y', '6Y', '8Y', '10Y'],
    colors: ['Yellow', 'Red', 'Blue']
  },
  {
    id: '5',
    title: 'Leather Crossbody Bag',
    price: 149.99,
    category: 'Accessories',
    brand: 'LuxeLife',
    image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['One Size'],
    colors: ['Brown', 'Black', 'Tan']
  },
  {
    id: '6',
    title: 'Slim Fit Chinos',
    price: 69.99,
    category: 'Men',
    brand: 'UrbanStyle',
    image: 'https://images.pexels.com/photos/1488507/pexels-photo-1488507.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Black']
  },
  {
    id: '7',
    title: 'Floral Blouse',
    price: 54.99,
    category: 'Women',
    brand: 'ChicWear',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Pink', 'Green']
  },
  {
    id: '8',
    title: 'Canvas High-Top Sneakers',
    price: 64.99,
    category: 'Shoes',
    brand: 'StreetWear',
    image: 'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Red']
  },
  {
    id: '9',
    title: 'Kids Denim Overalls',
    price: 44.99,
    category: 'Kids',
    brand: 'FunKids',
    image: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['4Y', '6Y', '8Y', '10Y'],
    colors: ['Blue', 'Black']
  },
  {
    id: '10',
    title: 'Aviator Sunglasses',
    price: 89.99,
    category: 'Accessories',
    brand: 'SunStyle',
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Black']
  },
  {
    id: '11',
    title: 'Wool Blend Coat',
    price: 199.99,
    category: 'Men',
    brand: 'UrbanStyle',
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['M', 'L', 'XL'],
    colors: ['Grey', 'Navy', 'Black']
  },
  {
    id: '12',
    title: 'Yoga Leggings',
    price: 49.99,
    category: 'Women',
    brand: 'ActiveFit',
    image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=600',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Grey', 'Purple']
  }
];

export const brands = Array.from(new Set(products.map(p => p.brand))).sort();
