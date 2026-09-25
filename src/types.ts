export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  category: 'outerwear' | 'blazers' | 'eveningwear' | 'accessories';
  badge: string;
  fabric: string;
  description: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  edition: string;
  origin: string;
  stockBySize: Record<string, number>;
  details: {
    composition: string;
    weight: string;
    lining: string;
    buttons: string;
    care: string;
  };
  companionIds?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  monogram?: string;
  edition?: string;
}

export interface PackagingOption {
  id: 'signature' | 'diplomatic' | 'coffret';
  title: string;
  description: string;
  price: number;
  icon: string;
}

export type Currency = 'USD' | 'EUR';

export type AppView = 
  | 'home' 
  | 'pdp' 
  | 'checkout' 
  | 'appointment'
  | 'women'
  | 'men'
  | 'campaign'
  | 'about';
