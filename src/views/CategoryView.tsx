import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface CategoryViewProps {
  gender?: 'women' | 'men';
  type?: 'campaign' | 'about';
}

export const CategoryView: React.FC<CategoryViewProps> = ({ gender, type }) => {
  const { navigateToProduct, formatPrice, addItem, setIsRunwayOpen, setCurrentView } = useCart();

  if (type === 'campaign') {
    return (
      <div className="w-full bg-[#0c1321] min-h-screen py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-2 border-b border-[#434655]/30 pb-6 text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#b4c5ff] font-semibold">
              Editorial Lookbook • A/W 2025
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-white">
              The Nocturne Manifesto
            </h1>
            <p className="text-xs md:text-sm text-[#8d90a0] leading-relaxed">
              Photographed inside the brutalist Palazzo Serbelloni in Milan. Statuesque silhouettes captured in dark sapphire light, exploring the friction between severe tailored architecture and liquid silks.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsRunwayOpen(true)}
                className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#0053db] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>Watch Milan Runway Stream</span>
              </button>
            </div>
          </div>

          {/* Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/5] bg-[#070e1b] overflow-hidden group border border-[#434655]/30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPOLtpEicMGdlHChi7TAvFH6jIa21KipCy6UvtE3oqxdFbieXIvBo5liyd1qB42iQU7KDnzh5Fia2uPOXKNlm_gdkrecxMY4ZzFWacGVt5z5Lx95pj7GN9_zZ--DR6dx4MM8mDohDZVYx7MU_hwtkAET-QQx_nz5Ad5bBbd8fzzGl8WBBtQUeimHyNuG5KmCXg_f_uWRDtUnX6ahKnmbTAl9wp64qMj15NtSLusCChanG2x6A0Evxh"
                alt="Campaign Still 01"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b]/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-widest text-[#b4c5ff]">Campaign Plate 01</span>
                <h3 className="font-serif text-2xl text-white">Dichotomy of Restraint</h3>
                <p className="text-xs text-[#8d90a0] mt-1">Double-faced cashmere overcoat and liquid mulberry silk slip dress.</p>
                <button
                  onClick={() => navigateToProduct('the-grand-nocturne-overcoat')}
                  className="mt-3 text-xs text-[#b4c5ff] hover:underline uppercase tracking-wider self-start"
                >
                  Acquire Look →
                </button>
              </div>
            </div>

            <div className="relative aspect-[4/5] bg-[#070e1b] overflow-hidden group border border-[#434655]/30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBitM3gy4xwYXUzR8nsKhbBnK3pv63UvKuoV8Sboxff-HE7XMWMLBDyJkdNW7O-bt_5rWsJp4gJdWX8Vnqy4J-rF92wUggnSiVBL8UwhAglAKe8_reSbnfFbH3xbNmjE01NLuCQQ8mb5gd5D3-MeJIhfh7nZqoTflGUBWWInmlvossXDkMCwXCw20Mt3ejTXi1Ts5ksShybJ19Bm0jA02aHkE7_tBJYjKkv_SidwkZ8IbHJgP7r0Njb"
                alt="Campaign Still 02"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b]/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-widest text-[#b4c5ff]">Campaign Plate 02</span>
                <h3 className="font-serif text-2xl text-white">The Power of the Lapel</h3>
                <p className="text-xs text-[#8d90a0] mt-1">Sculpted double-breasted virgin wool blazer with silk faille facings.</p>
                <button
                  onClick={() => navigateToProduct('structured-double-breasted-blazer')}
                  className="mt-3 text-xs text-[#b4c5ff] hover:underline uppercase tracking-wider self-start"
                >
                  Acquire Look →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'about') {
    return (
      <div className="w-full bg-[#0c1321] min-h-screen py-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-2 border-b border-[#434655]/30 pb-6 text-center">
            <span className="text-xs uppercase tracking-widest text-[#b4c5ff] font-semibold">
              The Architecture of Getzy
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-white">
              Silence, Structure &amp; Sarti
            </h1>
            <p className="text-xs md:text-sm text-[#8d90a0] leading-relaxed max-w-xl mx-auto">
              Founded on the belief that modern luxury demands architectural severity over transient decoration. Every garment is an archival object.
            </p>
          </div>

          <div className="space-y-8 text-xs md:text-sm text-[#c1c7cf] leading-relaxed">
            <div className="bg-[#141c29] border border-[#434655]/30 p-8 space-y-3">
              <h3 className="font-serif text-2xl text-white">Historical Lanificio Sourcing</h3>
              <p>
                Our raw fiber begins in the frigid high plateaus of Mongolia, where Capra Hircus goats endure -40°C winters. Their spring underfleece yields hair measuring an astonishing 14.5 micrometers in diameter—exceedingly softer and warmer than standard commercial cashmere.
              </p>
              <p>
                In Biella, northern Italy, this fleece is spun by fifth-generation artisans into double-faced cloth. By weaving two identical layers connected by fine micro-threads, we create outerwear with immense thermal resilience that requires no stiffening canvas or artificial glue.
              </p>
            </div>

            <div className="bg-[#141c29] border border-[#434655]/30 p-8 space-y-3">
              <h3 className="font-serif text-2xl text-white">Numbered Limited Releases</h3>
              <p>
                Getzy strictly limits each capsule design to fewer than 100 to 150 pieces worldwide. Each creation features a laser-engraved brass plate sewn into the interior breast pocket, permanently recorded in our cryptographic vault ledger. Once an archival allocation is fulfilled, the pattern is retired to our permanent museum repository.
              </p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={() => setCurrentView('appointment')}
              className="bg-[#2563eb] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#0053db] transition-colors"
            >
              Book an Atelier Consultation
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Curated category filter for Women / Men
  const categoryProducts = PRODUCTS.filter((p) => {
    if (gender === 'women') {
      return p.category === 'blazers' || p.category === 'eveningwear' || p.id === 'sovereign-trench';
    }
    if (gender === 'men') {
      return p.category === 'outerwear' || p.category === 'accessories' || p.id === 'grand-overcoat';
    }
    return true;
  });

  return (
    <div className="w-full bg-[#0c1321] min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="border-b border-[#434655]/30 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#b4c5ff] font-semibold">
              Curated Wardrobe
            </span>
            <h1 className="font-serif text-4xl text-white capitalize">
              {gender === 'women' ? "Women's Nocturne Capsule" : "Men's Sartorial Prêt-à-Porter"}
            </h1>
          </div>
          <p className="text-xs text-[#8d90a0] max-w-sm">
            Hand-finished silhouettes sculpted in Milan from 14.5µm double-faced cashmere and Como mulberry silk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigateToProduct(p.slug)}
              className="bg-[#141c29] border border-[#434655]/30 hover:border-[#b4c5ff]/50 transition-all cursor-pointer group shadow-xl"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#070e1b]">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#070e1b]/80 px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#b4c5ff]">
                  {p.badge}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-widest text-[#8d90a0]">{p.subtitle}</span>
                  <span className="font-serif text-base text-[#a4c9ff] font-semibold">{formatPrice(p.price)}</span>
                </div>
                <h3 className="font-serif text-lg text-white group-hover:text-[#b4c5ff] transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-[#8d90a0] line-clamp-2">{p.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(p, p.sizes[0]);
                  }}
                  className="w-full bg-[#2563eb] hover:bg-[#0053db] text-white py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors mt-2"
                >
                  Acquire Creation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
