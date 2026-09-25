import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addItem, formatPrice, navigateToProduct } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0];

  const handleAdd = () => {
    addItem(quickViewProduct, currentSize);
    setQuickViewProduct(null);
  };

  const handleFullView = () => {
    setQuickViewProduct(null);
    navigateToProduct(quickViewProduct.slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070e1b]/80 backdrop-blur-xl p-4 animate-in fade-in duration-200">
      <div className="relative bg-[#19202d] border border-[#434655]/40 w-full max-w-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#070e1b]/80 text-[#dce2f5] flex items-center justify-center hover:bg-[#323948] transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Product Image */}
        <div className="relative w-full h-80 md:h-full bg-[#070e1b] overflow-hidden">
          <img
            src={quickViewProduct.images[0]}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-3 left-3 bg-[#070e1b]/80 px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase text-[#b4c5ff] font-medium">
            {quickViewProduct.badge}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] text-[#b4c5ff] uppercase tracking-widest block font-medium">
              {quickViewProduct.fabric}
            </span>
            <h3 className="font-serif text-2xl text-[#dce2f5] leading-tight">
              {quickViewProduct.name}
            </h3>
            <p className="font-serif text-xl text-[#a4c9ff] font-semibold">
              {formatPrice(quickViewProduct.price)}
            </p>
            <p className="text-xs text-[#8d90a0] leading-relaxed pt-1">
              {quickViewProduct.description}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-[11px] uppercase tracking-widest text-[#dce2f5] block font-medium">
              Select Atelier Size
            </span>
            <div className="flex flex-wrap gap-2">
              {quickViewProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 text-xs font-medium transition-all ${
                    currentSize === size
                      ? 'bg-[#b4c5ff] text-[#002a78] font-bold shadow'
                      : 'bg-[#232a38] text-[#c3c6d7] hover:bg-[#323948] hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleAdd}
                className="w-full bg-[#2563eb] hover:bg-[#0053db] text-[#eeefff] py-3 text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Add to Atelier Bag</span>
              </button>
              <button
                onClick={handleFullView}
                className="w-full bg-[#232a38] hover:bg-[#323948] text-[#dce2f5] py-2.5 text-xs uppercase tracking-widest transition-all text-center"
              >
                View Full Archival Page →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
