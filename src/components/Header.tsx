import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { AppView } from '../types';

export const Header: React.FC = () => {
  const {
    itemCount,
    setIsCartOpen,
    currency,
    setCurrency,
    currentView,
    setCurrentView,
    setIsSearchOpen,
    setIsConciergeOpen,
    showToast
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleNav = (view: AppView, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement Ribbon */}
      <div className="bg-[#070e1b] text-[#c3c6d7] border-b border-[#434655]/30 py-1.5 px-4 md:px-8 text-center">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs tracking-widest uppercase">
          <span className="hidden lg:inline-block text-[#c1c7cf] font-medium">Haute Couture Atelier</span>
          <p className="text-[#dce2f5] mx-auto text-[11px] sm:text-xs">
            Complimentary Worldwide Express Delivery on Orders Over $300 — Discover The Autumn / Winter Nocturne Collection
          </p>
          <div className="hidden lg:flex items-center gap-2 text-[#c1c7cf]">
            <button 
              onClick={() => setIsConciergeOpen(true)}
              className="text-[#b4c5ff] hover:text-white transition-colors cursor-pointer"
            >
              Atelier Concierge
            </button>
            <span>•</span>
            <span className="text-stone-400">Paris — Milano — New York</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#070e1b]/90 backdrop-blur-xl border-b border-[#434655]/20">
        <div className="h-20 w-full px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4 max-w-7xl mx-auto">
          {/* Left: Mobile hamburger + Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#dce2f5] hover:text-[#b4c5ff] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <button 
              onClick={(e) => handleNav('home', e)} 
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              {/* Hotlinked SVG logo from HTML */}
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1VQ9hJXfKqAdn55Ww-1vmX_Nwrjef1uNfnXAAhbZTrY0_LRB8BzUOtKwqqIzxi1sh-eiQEgt6zijWUiPDKBporZrxHUnrEdoiovZOVbQCTrezhk9HgHQSF9Q20c2LUNdKeollZwAjxGBKp2imw8c9wvNfDI-PIuVbYnt8fjtXZvgKK7Ne8rYq8uMA0cfP8B0Bh_Ub1M9mroeVzP3xnXp87KRUJmDKqAUFXSlCDlVpTz1YgtULEqSXuyKw"
                alt="Getzy Luxury Wordmark Logo"
                className="h-7 w-auto object-contain"
              />
              <span className="font-serif text-2xl tracking-widest text-[#dce2f5] uppercase font-medium group-hover:text-[#b4c5ff] transition-colors">
                GETZY
              </span>
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button
              onClick={(e) => handleNav('home', e)}
              className={`text-xs uppercase tracking-widest py-2 transition-colors border-b-2 ${
                currentView === 'home'
                  ? 'text-[#b4c5ff] border-[#b4c5ff]'
                  : 'text-[#c3c6d7] border-transparent hover:text-white'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={(e) => handleNav('women', e)}
              className={`text-xs uppercase tracking-widest py-2 transition-colors border-b-2 ${
                currentView === 'women'
                  ? 'text-[#b4c5ff] border-[#b4c5ff]'
                  : 'text-[#c3c6d7] border-transparent hover:text-white'
              }`}
            >
              Women
            </button>
            <button
              onClick={(e) => handleNav('men', e)}
              className={`text-xs uppercase tracking-widest py-2 transition-colors border-b-2 ${
                currentView === 'men'
                  ? 'text-[#b4c5ff] border-[#b4c5ff]'
                  : 'text-[#c3c6d7] border-transparent hover:text-white'
              }`}
            >
              Men
            </button>
            <button
              onClick={(e) => handleNav('pdp', e)}
              className={`text-xs uppercase tracking-widest py-2 transition-colors border-b-2 ${
                currentView === 'pdp'
                  ? 'text-[#b4c5ff] border-[#b4c5ff]'
                  : 'text-[#c3c6d7] border-transparent hover:text-white'
              }`}
            >
              Atelier Editions
            </button>
            <button
              onClick={(e) => handleNav('campaign', e)}
              className={`text-xs uppercase tracking-widest py-2 transition-colors border-b-2 ${
                currentView === 'campaign'
                  ? 'text-[#b4c5ff] border-[#b4c5ff]'
                  : 'text-[#c3c6d7] border-transparent hover:text-white'
              }`}
            >
              Campaign
            </button>
            <button
              onClick={(e) => handleNav('about', e)}
              className={`text-xs uppercase tracking-widest py-2 transition-colors border-b-2 ${
                currentView === 'about'
                  ? 'text-[#b4c5ff] border-[#b4c5ff]'
                  : 'text-[#c3c6d7] border-transparent hover:text-white'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Controls: Currency, Search, Wishlist, Bag, Profile */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center text-xs tracking-wider text-[#c3c6d7] bg-[#141c29] px-2.5 py-1 rounded border border-[#434655]/40">
              <button
                onClick={() => setCurrency('USD')}
                className={`transition-colors font-medium ${
                  currency === 'USD' ? 'text-white font-bold' : 'text-[#8d90a0] hover:text-[#dce2f5]'
                }`}
              >
                USD
              </button>
              <span className="mx-1.5 text-[#434655]">/</span>
              <button
                onClick={() => setCurrency('EUR')}
                className={`transition-colors font-medium ${
                  currency === 'EUR' ? 'text-white font-bold' : 'text-[#8d90a0] hover:text-[#dce2f5]'
                }`}
              >
                EUR
              </button>
            </div>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-[#232a38]/60 rounded-full px-3 py-1.5 border border-[#434655]/40 text-[#c3c6d7] hover:border-[#b4c5ff]/50 hover:text-white transition-all cursor-pointer"
              title="Search Boutique"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="hidden md:inline text-xs tracking-wide">Search Collection</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => showToast('Vault Wishlist: 3 archival silhouettes saved')}
              className="relative p-2 text-[#c3c6d7] hover:text-[#b4c5ff] transition-colors"
              aria-label="Wishlist"
              title="Saved Items"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#b4c5ff]"></span>
            </button>

            {/* Shopping Bag with live counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#c3c6d7] hover:text-[#b4c5ff] transition-colors flex items-center"
              aria-label="Shopping Bag"
              title="Atelier Bag"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[10px] font-bold bg-[#2563eb] text-[#eeefff] w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Profile / Tier Recognition Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-8 h-8 rounded-full bg-[#b4c5ff] flex items-center justify-center text-[#002a78] hover:ring-2 hover:ring-[#2563eb] transition-all cursor-pointer"
                title="Client Profile"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
              </button>

              {profileOpen && (
                <div 
                  className="absolute right-0 mt-3 w-64 bg-[#19202d] border border-[#434655]/60 shadow-2xl p-4 text-xs z-50 rounded"
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <div className="pb-3 border-b border-[#434655]/40 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#b4c5ff] font-bold block">
                      Tier I Atelier Patron
                    </span>
                    <p className="font-serif text-sm text-white font-medium mt-0.5">Lady Eleanor Vance</p>
                    <p className="text-[11px] text-[#8d90a0]">eleanor.vance@nocturnecouture.ch</p>
                  </div>
                  <div className="space-y-2 text-[#c3c6d7]">
                    <button 
                      onClick={() => { handleNav('appointment'); setProfileOpen(false); }}
                      className="w-full text-left py-1 hover:text-white flex items-center justify-between"
                    >
                      <span>Private Salon Viewings</span>
                      <span className="material-symbols-outlined text-[14px]">event</span>
                    </button>
                    <button 
                      onClick={() => { handleNav('checkout'); setProfileOpen(false); }}
                      className="w-full text-left py-1 hover:text-white flex items-center justify-between"
                    >
                      <span>Vault Allocations</span>
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                    </button>
                    <button 
                      onClick={() => { setIsConciergeOpen(true); setProfileOpen(false); }}
                      className="w-full text-left py-1 hover:text-white flex items-center justify-between text-[#b4c5ff]"
                    >
                      <span>Direct Concierge Line</span>
                      <span className="material-symbols-outlined text-[14px]">support_agent</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c1321] border-b border-[#434655]/40 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-3 font-serif text-lg tracking-wide">
              <button
                onClick={(e) => handleNav('home', e)}
                className="text-left text-[#dce2f5] hover:text-[#b4c5ff] py-1 border-b border-[#1f2838]"
              >
                New Arrivals
              </button>
              <button
                onClick={(e) => handleNav('women', e)}
                className="text-left text-[#dce2f5] hover:text-[#b4c5ff] py-1 border-b border-[#1f2838]"
              >
                Women's Nocturne
              </button>
              <button
                onClick={(e) => handleNav('men', e)}
                className="text-left text-[#dce2f5] hover:text-[#b4c5ff] py-1 border-b border-[#1f2838]"
              >
                Men's Bespoke Tailoring
              </button>
              <button
                onClick={(e) => handleNav('pdp', e)}
                className="text-left text-[#b4c5ff] py-1 border-b border-[#1f2838] flex items-center justify-between"
              >
                <span>The Grand Nocturne Overcoat</span>
                <span className="text-[10px] tracking-widest uppercase bg-[#2563eb]/30 text-[#b4c5ff] px-2 py-0.5 rounded">
                  Archive No. 018
                </span>
              </button>
              <button
                onClick={(e) => handleNav('campaign', e)}
                className="text-left text-[#dce2f5] hover:text-[#b4c5ff] py-1 border-b border-[#1f2838]"
              >
                Nocturne Campaign Lookbook
              </button>
              <button
                onClick={(e) => handleNav('appointment', e)}
                className="text-left text-[#dce2f5] hover:text-[#b4c5ff] py-1 border-b border-[#1f2838]"
              >
                Book Private Atelier Viewing
              </button>
              <button
                onClick={(e) => handleNav('checkout', e)}
                className="text-left text-[#dce2f5] hover:text-[#b4c5ff] py-1"
              >
                Vault Allocation Checkout
              </button>
            </nav>

            <div className="pt-2 flex items-center justify-between text-xs text-[#8d90a0]">
              <div className="flex items-center gap-2">
                <span>Currency:</span>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-2 py-1 rounded ${currency === 'USD' ? 'bg-[#2563eb] text-white' : 'bg-[#19202d]'}`}
                >
                  USD
                </button>
                <button
                  onClick={() => setCurrency('EUR')}
                  className={`px-2 py-1 rounded ${currency === 'EUR' ? 'bg-[#2563eb] text-white' : 'bg-[#19202d]'}`}
                >
                  EUR
                </button>
              </div>
              <button
                onClick={() => { setIsConciergeOpen(true); setMobileMenuOpen(false); }}
                className="text-[#b4c5ff] flex items-center gap-1 font-medium"
              >
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                <span>VIP Concierge</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
