import React from 'react';
import { useCart } from '../context/CartContext';

export const BespokeSizeModal: React.FC = () => {
  const { isBespokeModalOpen, setIsBespokeModalOpen, setIsConciergeOpen } = useCart();

  if (!isBespokeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070e1b]/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#19202d] border border-[#434655]/40 max-w-2xl w-full p-6 md:p-8 shadow-2xl relative">
        <button
          onClick={() => setIsBespokeModalOpen(false)}
          className="absolute top-4 right-4 text-[#8d90a0] hover:text-white transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-[#b4c5ff] font-semibold">
              Sartoria Sartorial Blueprint
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-white">
              Bespoke Fit Recommendations
            </h2>
            <p className="text-xs text-[#8d90a0] leading-relaxed">
              Each Nocturne Overcoat is precision-cut to accommodate evening suiting beneath without bunching or restricting shoulder articulation.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#434655]/30">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#141c29] text-[#b4c5ff] uppercase tracking-wider font-semibold border-b border-[#434655]/40">
                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">Chest (in/cm)</th>
                  <th className="p-3">Shoulder</th>
                  <th className="p-3">Back Length</th>
                  <th className="p-3">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#434655]/30 text-[#dce2f5]">
                <tr className="hover:bg-[#232a38]/40">
                  <td className="p-3 font-bold">38 IT</td>
                  <td className="p-3">38.5" / 98cm</td>
                  <td className="p-3">17.8" / 45cm</td>
                  <td className="p-3">43.0" / 109cm</td>
                  <td className="p-3">25.5" / 65cm</td>
                </tr>
                <tr className="hover:bg-[#232a38]/40">
                  <td className="p-3 font-bold">40 IT</td>
                  <td className="p-3">40.5" / 103cm</td>
                  <td className="p-3">18.3" / 46.5cm</td>
                  <td className="p-3">43.7" / 111cm</td>
                  <td className="p-3">26.0" / 66cm</td>
                </tr>
                <tr className="bg-[#2563eb]/20 text-[#b4c5ff] font-semibold">
                  <td className="p-3 font-bold">42 IT (Standard)</td>
                  <td className="p-3">42.5" / 108cm</td>
                  <td className="p-3">18.9" / 48cm</td>
                  <td className="p-3">44.5" / 113cm</td>
                  <td className="p-3">26.4" / 67cm</td>
                </tr>
                <tr className="hover:bg-[#232a38]/40">
                  <td className="p-3 font-bold">44 IT</td>
                  <td className="p-3">44.5" / 113cm</td>
                  <td className="p-3">19.5" / 49.5cm</td>
                  <td className="p-3">45.2" / 115cm</td>
                  <td className="p-3">26.8" / 68cm</td>
                </tr>
                <tr className="hover:bg-[#232a38]/40">
                  <td className="p-3 font-bold">46 IT</td>
                  <td className="p-3">46.5" / 118cm</td>
                  <td className="p-3">20.1" / 51cm</td>
                  <td className="p-3">45.8" / 116.5cm</td>
                  <td className="p-3">27.2" / 69cm</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
            <p className="text-xs text-[#8d90a0]">
              Require personal made-to-measure tailoring or custom sleeve drop?
            </p>
            <button
              onClick={() => {
                setIsBespokeModalOpen(false);
                setIsConciergeOpen(true);
              }}
              className="bg-[#2563eb] hover:bg-[#0053db] px-4 py-2 text-white text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors"
            >
              Consult Master Tailor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
