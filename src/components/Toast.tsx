import React from 'react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 flex items-center gap-2.5 px-5 py-3 bg-[#19202d]/95 backdrop-blur-xl border border-[#2563eb]/40 text-[#dce2f5] shadow-2xl rounded-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <span className="material-symbols-outlined text-[#b4c5ff] text-[18px]">check_circle</span>
      <span className="text-xs uppercase tracking-wider font-medium">{toast.message}</span>
    </div>
  );
};
