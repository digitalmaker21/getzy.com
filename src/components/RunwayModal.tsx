import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const RunwayModal: React.FC = () => {
  const { isRunwayOpen, setIsRunwayOpen } = useCart();
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isRunwayOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070e1b]/95 backdrop-blur-2xl p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#0c1321] border border-[#434655]/40 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#141c29] border-b border-[#434655]/30">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#b4c5ff] text-[22px]">movie</span>
            <span className="text-xs uppercase tracking-widest text-[#dce2f5] font-semibold">
              Nocturne Runway Film — Autumn / Winter 2025
            </span>
          </div>
          <button
            onClick={() => setIsRunwayOpen(false)}
            className="text-[#8d90a0] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative w-full aspect-video bg-[#070e1b] flex flex-col items-center justify-center text-center p-6 overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS1i29Pt_6x4MpeUv-5aswbaFP0A62Bn-MhnQahSQvDoWctrM_4pD78bJNeKqF5PtJIZ_136fPUISLQQMl3_D_utpPfvpkusYC-fmVDYkmjJx6w0_3_PO6f_QZhgbga9ZgPytKj9Vg3iR-XgLBhu_Mn9QRDCQ5yGyzbgaA4sh7dFmfne8jcg0k8fqkxdiG3Na5_NmaEUrtUcU90Aa_nnkcNDsCKDZCfrCF2GRiJ3SFvpJXLa-m_43A"
            alt="Runway Stage"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isPlaying ? 'opacity-70 scale-105' : 'opacity-40 scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1321] via-transparent to-[#0c1321]/60"></div>

          {/* Interactive Player Overlay */}
          <div className="relative z-10 space-y-4 max-w-lg">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 mx-auto rounded-full bg-[#2563eb]/90 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl cursor-pointer"
            >
              <span className="material-symbols-outlined text-[36px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <h4 className="font-serif text-2xl md:text-3xl text-white">
              Milan Private Salon Projection
            </h4>
            <p className="text-xs text-[#c1c7cf] leading-relaxed">
              Soundtrack: <span className="text-[#a4c9ff] font-medium">Nocturne Suite</span> by Orchestre de Chambre de Paris. Recorded live at the Palazzo Serbelloni under midnight acoustics.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <span className="px-3 py-1 bg-[#2563eb] text-white text-[10px] uppercase tracking-widest font-semibold">
                4K CinemaStream (60 FPS)
              </span>
              <span className="px-3 py-1 bg-[#19202d] text-[#c1c7cf] text-[10px] uppercase tracking-widest font-medium border border-[#434655]/40">
                Spatial Binaural Audio
              </span>
              <span className="px-3 py-1 bg-[#19202d] text-[#c1c7cf] text-[10px] uppercase tracking-widest font-medium border border-[#434655]/40">
                Live From Milan (04:12)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
