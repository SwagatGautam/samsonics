export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  featured?: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export const mockCategories: Category[] = [
  { id: 1, name: "Smartphones", description: "Latest mobile devices and accessories" },
  { id: 2, name: "Laptops", description: "High-performance laptops and notebooks" },
  { id: 3, name: "Tablets", description: "Portable tablets for work and entertainment" },
  { id: 4, name: "Audio", description: "Headphones, speakers, and audio equipment" },
  { id: 5, name: "Gaming", description: "Gaming consoles and accessories" },
  { id: 6, name: "Smart Home", description: "IoT devices and smart home solutions" },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    description: "Latest iPhone with A17 Pro chip and titanium design",
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    featured: true
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    price: 1599,
    description: "14-inch MacBook Pro with M3 chip for professional work",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    featured: true
  },
  {
    id: 3,
    name: "iPad Air",
    price: 599,
    description: "Powerful iPad Air with M2 chip and 11-inch display",
    category: "Tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "AirPods Pro",
    price: 249,
    description: "Active noise cancellation wireless earbuds",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
    featured: true
  },
  {
    id: 5,
    name: "PlayStation 5",
    price: 499,
    description: "Next-gen gaming console with 4K gaming support",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    name: "Samsung Galaxy S24",
    price: 899,
    description: "Flagship Android smartphone with AI features",
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
  },
  {
    id: 7,
    name: "Dell XPS 13",
    price: 1299,
    description: "Ultra-portable laptop with InfinityEdge display",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
  },
  {
    id: 8,
    name: "Sony WH-1000XM5",
    price: 399,
    description: "Industry-leading noise canceling headphones",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"
  },
  {
    id: 9,
    name: "Google Nest Hub",
    price: 129,
    description: "Smart display for your connected home",
    category: "Smart Home",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    featured: true
  },
  {
    id: 10,
    name: "Surface Pro 9",
    price: 999,
    description: "2-in-1 tablet and laptop with Windows 11",
    category: "Tablets",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop"
  }
];

// Mock service functions
export const getProducts = (): Product[] => {
  return mockProducts;
};

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All" || !category) return mockProducts;
  return mockProducts.filter(product => product.category === category);
};

export const getCategories = (): Category[] => {
  return mockCategories;
};

export const getCategoryNames = (): string[] => {
  return mockCategories.map(cat => cat.name);
};