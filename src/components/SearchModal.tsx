import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct, formatPrice } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filtered = PRODUCTS.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const handleSelect = (slug: string) => {
    setIsSearchOpen(false);
    navigateToProduct(slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#070e1b]/80 backdrop-blur-xl p-4 pt-20 animate-in fade-in duration-200">
      <div className="bg-[#141c29] border border-[#434655]/40 w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Search Input Box */}
        <div className="p-4 bg-[#19202d] border-b border-[#434655]/30 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#b4c5ff] text-[22px]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, virgin cashmere, mulberry silk, trench..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#8d90a0] focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-[#8d90a0] hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3 bg-[#0c1321]">
          {filtered.length === 0 ? (
            <p className="text-center text-xs text-[#8d90a0] py-8">
              No archival creations match '{query}'. Try searching 'cashmere' or 'blazer'.
            </p>
          ) : (
            filtered.map((prod) => (
              <div
                key={prod.id}
                onClick={() => handleSelect(prod.slug)}
                className="flex items-center gap-4 p-3 bg-[#141c29] hover:bg-[#19202d] border border-[#434655]/30 cursor-pointer transition-colors group"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-14 h-18 object-cover object-top flex-shrink-0 bg-[#070e1b]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#b4c5ff]">
                      {prod.badge}
                    </span>
                    <span className="text-xs text-[#8d90a0]">• {prod.fabric}</span>
                  </div>
                  <h4 className="font-serif text-base text-white group-hover:text-[#b4c5ff] transition-colors truncate">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-[#8d90a0] truncate">{prod.description}</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-sm font-semibold text-[#a4c9ff]">
                    {formatPrice(prod.price)}
                  </span>
                  <span className="text-[10px] text-[#8d90a0] block uppercase tracking-wider">
                    View Look →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-[#19202d] border-t border-[#434655]/30 flex items-center justify-between text-[11px] text-[#8d90a0]">
          <span>Popular searches: Cashmere, Sovereign Trench, Evening Slip, Biella Wool</span>
          <span className="text-[#b4c5ff]">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
