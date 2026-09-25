import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Currency, AppView } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastState {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size?: string, color?: string, qty?: number, monogram?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  discount: number;
  total: number;
  promoCode: string;
  promoDiscountRate: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  itemCount: number;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountUSD: number) => string;
  
  // Navigation & View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeProduct: Product;
  setActiveProduct: (p: Product) => void;
  navigateToProduct: (productSlugOrId: string) => void;

  // Modals
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  isRunwayOpen: boolean;
  setIsRunwayOpen: (open: boolean) => void;
  isBespokeModalOpen: boolean;
  setIsBespokeModalOpen: (open: boolean) => void;
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Toast
  toast: ToastState | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const EUR_EXCHANGE_RATE = 0.92;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pre-seed cart with 2 default luxury items matching the user screenshot!
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 'grand-overcoat-default',
      productId: 'grand-overcoat',
      name: 'The Grand Nocturne Overcoat',
      price: 1850,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_5JBUie5R1wvNR2-KBOmhmaaPlvQKvgnmNJq0wiwToSYHkXLGqNBs95uQDEBpTQBfObX7k69IDnyr7VD3D3_Ix0VvEKQa5l0C_OIbYHCFpWOK5JH3IfdusfDwnnkUe1wfNCCAnMu-MDJZwyx0yAh9xzKW9V5XIIx1zozRVAbHCjGG1HXrKBbBx5g2lDo9ww8mB9AWREGKSjn83OzqVekUpvnA2ThF4uUMZM7Y0Iuz1kcCoNa2GhZD',
      size: '40',
      color: 'Midnight Navy',
      quantity: 1,
      edition: '018/100'
    },
    {
      id: 'cashmere-blazer-default',
      productId: 'cashmere-blazer',
      name: 'Structured Double-Breasted Blazer',
      price: 1290,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7XejIhYMdIPvgsKN46UptBuhOJgkvw19Rl7ksre4nOb_uFIO5o93r2BMxF__EQ78WoEkfZKftTMe-2o4lpcLLyzL8TLWNXQ9ULm1qN1UN9sKwmbeCKHDNlm0ePD_DxCfWXg1CiXNt5xdHeUEy_iPb9AolnVBe3gsIO1_anRvNJ5IJ9urb1ui2U8FQfpklhcw6IG_mhx_BavuYFT5pZBLpgvO6P_GDiFeVN055hKDX-O7nyV-OdDI_',
      size: 'M',
      color: 'Deep Sapphire',
      quantity: 1,
      edition: '042/150'
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountRate, setPromoDiscountRate] = useState(0);
  const [currency, setCurrency] = useState<Currency>('USD');
  
  // Navigation & Product View
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[0]);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isRunwayOpen, setIsRunwayOpen] = useState(false);
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string) => {
    setToast({ id: Date.now().toString(), message, type: 'success' });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const navigateToProduct = (productSlugOrId: string) => {
    const prod = PRODUCTS.find(p => p.id === productSlugOrId || p.slug === productSlugOrId) || PRODUCTS[0];
    setActiveProduct(prod);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addItem = (product: Product, size?: string, color?: string, qty = 1, monogram?: string) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const existingIndex = items.findIndex(
      item => item.productId === product.id && item.size === chosenSize && item.color === chosenColor && item.monogram === monogram
    );

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += qty;
      setItems(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${chosenSize}-${chosenColor}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: chosenSize,
        color: chosenColor,
        quantity: qty,
        monogram: monogram,
        edition: product.edition
      };
      setItems(prev => [newItem, ...prev]);
    }
    showToast(`${product.name} placed in your Atelier Bag`);
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    showToast('Creation removed from Atelier Bag');
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GETZYVIP') {
      setPromoCode('GETZYVIP');
      setPromoDiscountRate(0.10);
      showToast('VIP Sovereign Privilege code applied: 10% courtesy');
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscountRate(0);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * promoDiscountRate);
  const total = Math.max(0, subtotal - discount);

  const formatPrice = (amountUSD: number) => {
    if (currency === 'EUR') {
      const eur = Math.round(amountUSD * EUR_EXCHANGE_RATE);
      return `€${eur.toLocaleString('en-US')}`;
    }
    return `$${amountUSD.toLocaleString('en-US')}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discount,
        total,
        promoCode,
        promoDiscountRate,
        applyPromoCode,
        removePromoCode,
        itemCount,
        currency,
        setCurrency,
        formatPrice,
        currentView,
        setCurrentView,
        activeProduct,
        setActiveProduct,
        navigateToProduct,
        quickViewProduct,
        setQuickViewProduct,
        isRunwayOpen,
        setIsRunwayOpen,
        isBespokeModalOpen,
        setIsBespokeModalOpen,
        isConciergeOpen,
        setIsConciergeOpen,
        isSearchOpen,
        setIsSearchOpen,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
