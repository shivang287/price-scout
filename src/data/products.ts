export type Platform = "blinkit" | "amazon" | "flipkart";

export type PriceEntry = {
  platform: Platform;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  deliveryTime: string;
  url: string;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  brand: string;
  unit: string;
  prices: PriceEntry[];
};

export const platformMeta: Record<Platform, { label: string; color: string; icon: string }> = {
  blinkit: { label: "Blinkit", color: "bg-blinkit", icon: "⚡" },
  amazon: { label: "Amazon", color: "bg-amazon", icon: "📦" },
  flipkart: { label: "Flipkart", color: "bg-flipkart", icon: "🛒" },
};

export const categories = [
  "All",
  "Groceries",
  "Electronics",
  "Personal Care",
  "Beverages",
  "Snacks",
  "Home & Kitchen",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Tata Gold Tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop",
    category: "Beverages",
    brand: "Tata",
    unit: "500g",
    prices: [
      { platform: "blinkit", price: 270, originalPrice: 310, inStock: true, deliveryTime: "10 min", url: "#" },
      { platform: "amazon", price: 285, originalPrice: 310, inStock: true, deliveryTime: "1 day", url: "#" },
      { platform: "flipkart", price: 275, originalPrice: 310, inStock: true, deliveryTime: "2 days", url: "#" },
    ],
  },
  {
    id: "2",
    name: "boAt Rockerz 450 Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    category: "Electronics",
    brand: "boAt",
    unit: "1 piece",
    prices: [
      { platform: "blinkit", price: 1499, inStock: false, deliveryTime: "N/A", url: "#" },
      { platform: "amazon", price: 1299, originalPrice: 2990, inStock: true, deliveryTime: "1 day", url: "#" },
      { platform: "flipkart", price: 1349, originalPrice: 2990, inStock: true, deliveryTime: "2 days", url: "#" },
    ],
  },
  {
    id: "3",
    name: "Maggi 2-Minute Noodles",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&h=300&fit=crop",
    category: "Snacks",
    brand: "Nestlé",
    unit: "Pack of 12",
    prices: [
      { platform: "blinkit", price: 144, originalPrice: 168, inStock: true, deliveryTime: "8 min", url: "#" },
      { platform: "amazon", price: 152, originalPrice: 168, inStock: true, deliveryTime: "1 day", url: "#" },
      { platform: "flipkart", price: 148, originalPrice: 168, inStock: true, deliveryTime: "3 days", url: "#" },
    ],
  },
  {
    id: "4",
    name: "Nivea Soft Moisturizing Cream",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
    category: "Personal Care",
    brand: "Nivea",
    unit: "200ml",
    prices: [
      { platform: "blinkit", price: 209, originalPrice: 249, inStock: true, deliveryTime: "12 min", url: "#" },
      { platform: "amazon", price: 199, originalPrice: 249, inStock: true, deliveryTime: "1 day", url: "#" },
      { platform: "flipkart", price: 215, originalPrice: 249, inStock: true, deliveryTime: "2 days", url: "#" },
    ],
  },
  {
    id: "5",
    name: "Aashirvaad Atta",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
    category: "Groceries",
    brand: "Aashirvaad",
    unit: "5kg",
    prices: [
      { platform: "blinkit", price: 295, originalPrice: 345, inStock: true, deliveryTime: "10 min", url: "#" },
      { platform: "amazon", price: 310, originalPrice: 345, inStock: true, deliveryTime: "1 day", url: "#" },
      { platform: "flipkart", price: 305, originalPrice: 345, inStock: false, deliveryTime: "N/A", url: "#" },
    ],
  },
  {
    id: "6",
    name: "Prestige Induction Cooktop",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop",
    category: "Home & Kitchen",
    brand: "Prestige",
    unit: "1 piece",
    prices: [
      { platform: "blinkit", price: 2199, inStock: false, deliveryTime: "N/A", url: "#" },
      { platform: "amazon", price: 1899, originalPrice: 2995, inStock: true, deliveryTime: "2 days", url: "#" },
      { platform: "flipkart", price: 1949, originalPrice: 2995, inStock: true, deliveryTime: "3 days", url: "#" },
    ],
  },
  {
    id: "7",
    name: "Coca-Cola Can",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop",
    category: "Beverages",
    brand: "Coca-Cola",
    unit: "Pack of 6",
    prices: [
      { platform: "blinkit", price: 210, originalPrice: 240, inStock: true, deliveryTime: "8 min", url: "#" },
      { platform: "amazon", price: 225, originalPrice: 240, inStock: true, deliveryTime: "1 day", url: "#" },
      { platform: "flipkart", price: 220, originalPrice: 240, inStock: true, deliveryTime: "2 days", url: "#" },
    ],
  },
  {
    id: "8",
    name: "Samsung Galaxy Buds FE",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=300&h=300&fit=crop",
    category: "Electronics",
    brand: "Samsung",
    unit: "1 piece",
    prices: [
      { platform: "blinkit", price: 4999, inStock: false, deliveryTime: "N/A", url: "#" },
      { platform: "amazon", price: 4499, originalPrice: 6999, inStock: true, deliveryTime: "1 day", url: "#" },
      { platform: "flipkart", price: 4299, originalPrice: 6999, inStock: true, deliveryTime: "2 days", url: "#" },
    ],
  },
];
