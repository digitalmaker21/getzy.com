import React from 'react';
import { useCart } from '../context/CartContext';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, setIsConciergeOpen, setIsSearchOpen } = useCart();

  return (
    <>
      {/* Desktop Floating VIP Concierge Button */}
      <aside className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setIsConciergeOpen(true)}
          className="flex items-center gap-2.5 bg-[#232a38]/95 hover:bg-[#323948] text-white border border-[#434655]/50 backdrop-blur-xl px-5 py-3 shadow-[0_12px_32px_rgba(7,14,27,0.8)] transition-all cursor-pointer group hover:scale-105"
        >
          <span className="material-symbols-outlined text-[#b4c5ff] text-[20px]">room_service</span>
          <span className="text-xs uppercase tracking-widest font-semibold">VIP Concierge</span>
          <span className="w-2 h-2 rounded-full bg-[#a4c9ff] animate-pulse"></span>
        </button>
      </aside>

      {/* Mobile Bottom Tab Bar (as shown in mobile screenshot) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#070e1b]/95 backdrop-blur-2xl border-t border-[#434655]/30 shadow-[0_-4px_24px_rgba(0,0,0,0.6)] pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              currentView === 'home' ? 'text-[#b4c5ff]' : 'text-[#8d90a0] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">diamond</span>
            <span className="text-[10px] tracking-wider uppercase font-semibold">Atelier</span>
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 text-[#8d90a0] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">travel_explore</span>
            <span className="text-[10px] tracking-wider uppercase font-semibold">Discover</span>
          </button>

          <button
            onClick={() => setIsConciergeOpen(true)}
            className="flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 text-[#8d90a0] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">support_agent</span>
            <span className="text-[10px] tracking-wider uppercase font-semibold">Concierge</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              currentView === 'checkout' ? 'text-[#b4c5ff]' : 'text-[#8d90a0] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
            <span className="text-[10px] tracking-wider uppercase font-semibold">Profile</span>
          </button>
        </div>
      </nav>
    </>
  );
};
