import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    total,
    promoCode,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    setCurrentView,
    itemCount
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyPromoCode(inputCode);
    if (success) {
      setPromoError('');
    } else {
      setPromoError('Invalid invitation privilege token. Try GETZYVIP');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Frosted Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#070e1b]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-[#141c29] border-l border-[#434655]/30 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div>
            <div className="p-6 bg-[#19202d] border-b border-[#434655]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#b4c5ff] text-[24px]">shopping_bag</span>
                <h3 className="font-serif text-2xl text-[#dce2f5] tracking-tight font-medium">
                  Atelier Bag
                </h3>
                <span className="text-xs font-semibold bg-[#2563eb] text-[#eeefff] px-2.5 py-0.5 rounded-full">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-[#8d90a0] hover:text-white transition-colors p-1"
                aria-label="Close cart"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Delivery Banner */}
            <div className="bg-[#232a38] px-6 py-2.5 flex items-center justify-between text-[11px] uppercase tracking-wider text-[#b4c5ff] border-b border-[#434655]/30">
              <span className="font-medium">Complimentary Worldwide Express Applied</span>
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
            </div>

            {/* Items List */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-420px)] space-y-4">
              {items.length === 0 ? (
                <div className="py-16 text-center text-[#8d90a0] space-y-3">
                  <span className="material-symbols-outlined text-4xl text-[#434655]">inventory_2</span>
                  <p className="font-serif text-lg text-[#dce2f5]">Your Atelier Bag is Empty</p>
                  <p className="text-xs">Explore the Nocturne Autumn / Winter limited capsule.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-[#0c1321] p-3.5 border border-[#434655]/30 group hover:border-[#b4c5ff]/40 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover object-top bg-[#070e1b] flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm text-[#dce2f5] leading-snug truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#8d90a0] hover:text-[#ffb4ab] transition-colors p-0.5"
                            title="Remove creation"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                        <p className="text-xs text-[#8d90a0] mt-1">
                          Size: <span className="text-[#dce2f5]">{item.size}</span> • {item.color}
                        </p>
                        {item.monogram && (
                          <p className="text-[11px] text-[#a4c9ff] mt-0.5">
                            Monogram: '{item.monogram}'
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Stepper */}
                        <div className="flex items-center bg-[#19202d] border border-[#434655]/40 rounded overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-0.5 text-xs text-[#8d90a0] hover:text-white hover:bg-[#232a38] transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-0.5 text-xs text-[#8d90a0] hover:text-white hover:bg-[#232a38] transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#a4c9ff]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Drawer Footer & Financial Summary */}
          <div className="p-6 bg-[#19202d] border-t border-[#434655]/30 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="VIP Privilege Code (GETZYVIP)"
                  className="flex-1 bg-[#0c1321] border border-[#434655]/40 px-3 py-2 text-xs text-white uppercase placeholder:normal-case placeholder:text-[#8d90a0] focus:border-[#b4c5ff] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#323948] hover:bg-[#2563eb] text-white px-4 text-xs font-medium uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoCode && (
                <div className="flex items-center justify-between text-[11px] text-[#b4c5ff] pt-0.5">
                  <span>✓ 10% VIP Privilege Code ({promoCode}) Active</span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="underline hover:text-white text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-[11px] text-[#ffb4ab]">{promoError}</p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs border-t border-[#434655]/30 pt-3">
              <div className="flex items-center justify-between text-[#8d90a0]">
                <span>Subtotal</span>
                <span className="text-[#dce2f5] font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[#8d90a0]">
                <span>VIP Courier Dispatch</span>
                <span className="text-[#b4c5ff] font-medium uppercase tracking-wider">Free</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-[#a4c9ff]">
                  <span>VIP Atelier Privilege (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-white font-medium text-base pt-2 border-t border-[#434655]/30">
                <span>Total Investment</span>
                <span className="font-serif text-xl text-[#a4c9ff] font-semibold">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              disabled={items.length === 0}
              className={`w-full py-3.5 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-xl ${
                items.length === 0
                  ? 'bg-[#2e3543] text-[#8d90a0] cursor-not-allowed'
                  : 'bg-[#2563eb] hover:bg-[#0053db] text-[#eeefff] active:scale-[0.99]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>Proceed to Secure Checkout</span>
            </button>

            {/* Trust Assurances */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-[#8d90a0] pt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#b4c5ff]">shield</span>
                Encrypted Checkout
              </span>
              <span>•</span>
              <span>Discreet Signature Delivery</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
