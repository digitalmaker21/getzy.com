/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { RunwayModal } from './components/RunwayModal';
import { BespokeSizeModal } from './components/BespokeSizeModal';
import { VipConciergeModal } from './components/VipConciergeModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

import { HomeView } from './views/HomeView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { AppointmentView } from './views/AppointmentView';
import { CategoryView } from './views/CategoryView';

const MainContent: React.FC = () => {
  const { currentView } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-[#0c1321] text-[#dce2f5]">
      <Header />
      
      <main className="flex-1 w-full pt-28 pb-16 md:pb-0">
        {currentView === 'home' && <HomeView />}
        {currentView === 'pdp' && <ProductDetailView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'appointment' && <AppointmentView />}
        {currentView === 'women' && <CategoryView gender="women" />}
        {currentView === 'men' && <CategoryView gender="men" />}
        {currentView === 'campaign' && <CategoryView type="campaign" />}
        {currentView === 'about' && <CategoryView type="about" />}
      </main>

      <Footer />
      <BottomNav />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <RunwayModal />
      <BespokeSizeModal />
      <VipConciergeModal />
      <SearchModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
