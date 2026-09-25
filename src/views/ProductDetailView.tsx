import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const ProductDetailView: React.FC = () => {
  const {
    activeProduct,
    addItem,
    formatPrice,
    setIsBespokeModalOpen,
    setCurrentView,
    navigateToProduct,
    showToast
  } = useCart();

  const product = activeProduct || PRODUCTS[0];

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Midnight Sapphire');
  const [selectedSize, setSelectedSize] = useState('42');
  const [monogram, setMonogram] = useState('E.V.');
  const [activeSpecTab, setActiveSpecTab] = useState<'craft' | 'materials' | 'alterations' | 'archival'>('craft');
  const [isAcquiring, setIsAcquiring] = useState(false);
  const [zoomMode, setZoomMode] = useState(false);

  // Companion products
  const companions = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const handleAcquire = () => {
    setIsAcquiring(true);
    setTimeout(() => {
      addItem(product, selectedSize, selectedColor, 1, monogram.trim() || undefined);
      setIsAcquiring(false);
      showToast(`Allocation Secured for ${product.name} (Size ${selectedSize})`);
    }, 600);
  };

  const remainingEditions = product.stockBySize[selectedSize] || 2;

  return (
    <div className="flex flex-col w-full bg-[#0c1321]">
      {/* Top Breadcrumb & Archival Edition Indicator Bar */}
      <div className="w-full px-6 md:px-12 py-3 bg-[#070e1b]/70 border-b border-[#434655]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-widest text-[#8d90a0]">
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">
              Atelier Editions
            </button>
            <span>/</span>
            <span className="text-[#8d90a0]">Autumn–Winter 2025</span>
            <span>/</span>
            <span className="text-[#8d90a0]">Outerwear</span>
            <span>/</span>
            <span className="text-white font-medium">{product.name}</span>
          </div>

          <div className="flex items-center gap-2 bg-[#19202d] px-3 py-1 rounded-full border border-[#434655]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse"></span>
            <span className="text-[#b4c5ff] font-semibold text-[11px]">
              Archival Plate: No. {product.edition}
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Grid (Editorial Layout) */}
      <section className="w-full px-6 md:px-12 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Editorial Gallery & Master Viewport (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Viewport */}
            <div className="relative w-full aspect-[3/4] bg-[#070e1b] overflow-hidden group shadow-2xl border border-[#434655]/30">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
                  zoomMode ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-[1.03] cursor-zoom-in'
                }`}
                onClick={() => setZoomMode(!zoomMode)}
              />

              {/* Scrim Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b]/80 via-transparent to-transparent pointer-events-none" />

              {/* Zoom & Inspection Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => setZoomMode(!zoomMode)}
                  className="w-10 h-10 bg-[#2e3543]/80 backdrop-blur-md text-white hover:text-[#b4c5ff] flex items-center justify-center transition-colors border border-[#434655]/40"
                  aria-label="Inspect Weave Texture"
                  title="Zoom Weave"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {zoomMode ? 'zoom_out' : 'loupe'}
                  </span>
                </button>
                <button
                  onClick={() => showToast('Full lookbook archive opened in salon viewer')}
                  className="w-10 h-10 bg-[#2e3543]/80 backdrop-blur-md text-white hover:text-[#b4c5ff] flex items-center justify-center transition-colors border border-[#434655]/40"
                  aria-label="View Fullscreen"
                  title="Fullscreen"
                >
                  <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                </button>
              </div>

              {/* Bottom Micro Details */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs tracking-widest uppercase">
                <span className="bg-[#070e1b]/90 px-3 py-1 backdrop-blur-md text-white border border-[#434655]/30">
                  View 0{activeImageIndex + 1} — Architectural Drape
                </span>
                <span className="bg-[#070e1b]/90 px-3 py-1 backdrop-blur-md text-[#8d90a0] border border-[#434655]/30">
                  Studio Milano • A/W 25
                </span>
              </div>
            </div>

            {/* Thumbnails Gallery Ribbon */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((img, index) => {
                const labels = ['01 Full Look', '02 Sartoria Form', '03 Weave Macro', '04 Profile Drape'];
                const isActive = activeImageIndex === index;

                return (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveImageIndex(index);
                      setZoomMode(false);
                    }}
                    className={`relative aspect-[3/4] bg-[#141c29] overflow-hidden text-left transition-all ${
                      isActive
                        ? 'ring-2 ring-[#b4c5ff] opacity-100'
                        : 'opacity-70 hover:opacity-100 border border-[#434655]/30'
                    }`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-[#070e1b]/90 px-1 py-1 text-center text-[10px] text-white uppercase font-medium">
                      {labels[index] || `0${index + 1} View`}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Material Heritage Badge */}
            <div className="bg-[#141c29] border border-[#434655]/30 p-5 flex items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#b4c5ff] text-[28px]">verified</span>
                <div>
                  <p className="font-serif text-base text-white">Certificate of Authenticity Included</p>
                  <p className="text-xs text-[#8d90a0]">
                    Registered in the Getzy Nocturne Vault with individual atelier hand-serialisation.
                  </p>
                </div>
              </div>
              <span className="font-serif text-xl text-[#b4c5ff] tracking-widest hidden md:inline-block font-semibold">
                LANIFICIO 1894
              </span>
            </div>
          </div>

          {/* Right Column: Purchase & Customization Console (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#141c29] border border-[#434655]/40 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            {/* Limited Edition Status */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a4c9ff] animate-pulse"></span>
                <span className="text-[11px] uppercase tracking-widest text-[#a4c9ff] font-semibold">
                  Strictly limited to 100 archival impressions
                </span>
              </div>
              <span className="text-[11px] text-[#8d90a0] uppercase tracking-widest">
                Milanese Sartoria • Hand-Constructed in Lombardy
              </span>
            </div>

            {/* Product Name & Price */}
            <div className="space-y-2 pb-2 border-b border-[#434655]/30">
              <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-2xl text-white font-semibold">
                  {formatPrice(product.price)} USD
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.5 border border-[#2563eb]/40 font-medium">
                  VAT &amp; Global Customs Inclusive
                </span>
              </div>
              <p className="text-xs text-[#c1c7cf] leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* Color Swatch Selection */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                <span className="text-[#8d90a0]">Archival Finish</span>
                <span className="text-white font-semibold">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-9 h-9 rounded-full transition-all border border-black/40 ${
                      selectedColor === c.name
                        ? 'ring-2 ring-[#b4c5ff] ring-offset-4 ring-offset-[#141c29]'
                        : 'hover:opacity-80'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizing Selection Matrix */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                <span className="text-[#8d90a0]">European Sizing (IT/FR)</span>
                <button
                  onClick={() => setIsBespokeModalOpen(true)}
                  className="text-[#b4c5ff] hover:text-white flex items-center gap-1 underline underline-offset-4"
                >
                  <span className="material-symbols-outlined text-[16px]">straighten</span>
                  <span>Bespoke Sizing &amp; Tailor Matrix</span>
                </button>
              </div>

              {/* Size Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs uppercase text-center font-medium transition-all ${
                      selectedSize === sz
                        ? 'bg-[#b4c5ff] text-[#002a78] font-bold shadow-lg'
                        : 'bg-[#19202d] text-white hover:bg-[#232a38] border border-[#434655]/40'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Real-time Atelier Inventory Stock Notice */}
              <div className="flex items-center gap-1.5 text-[#b4c5ff] text-[11px] pt-1">
                <span className="material-symbols-outlined text-[14px]">inventory_2</span>
                <span>
                  Only {remainingEditions} editions remaining in Milanese Atelier inventory for Size {selectedSize}.
                </span>
              </div>
            </div>

            {/* Gold-Thread Monogramming Input */}
            <div className="bg-[#19202d] border border-[#434655]/30 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#a4c9ff] text-[18px]">brush</span>
                  <span className="text-xs uppercase tracking-wider text-white font-medium">
                    Gold-Thread Monogramming
                  </span>
                </div>
                <span className="text-[10px] text-[#b4c5ff] uppercase tracking-wider font-semibold">
                  Complimentary
                </span>
              </div>
              <p className="text-[11px] text-[#8d90a0] leading-relaxed">
                Up to 3 initials hand-embroidered by master artisans inside the left chest breast pocket facing in pure gold ingot thread.
              </p>
              <div className="pt-1">
                <input
                  type="text"
                  maxLength={3}
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  placeholder="INITIALS (E.G. E.V.)"
                  className="w-full bg-[#0c1321] text-white text-xs uppercase tracking-widest px-3 py-2 border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={handleAcquire}
                disabled={isAcquiring}
                className="w-full bg-[#2563eb] hover:bg-[#0053db] text-white text-xs uppercase tracking-widest font-semibold py-3.5 flex items-center justify-center gap-2 transition-all shadow-xl active:scale-[0.99] group"
              >
                {isAcquiring ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    <span>Allocating Edition No. {product.edition}...</span>
                  </>
                ) : (
                  <>
                    <span>Acquire Creation • {formatPrice(product.price)} USD</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setCurrentView('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#232a38] hover:bg-[#323948] text-white text-xs uppercase tracking-widest font-semibold py-3 flex items-center justify-center gap-2 transition-all border border-[#434655]/40"
              >
                <span className="material-symbols-outlined text-[#a4c9ff] text-[18px]">calendar_month</span>
                <span>Reserve Private Atelier Fitting</span>
              </button>
            </div>

            {/* Client Assurance Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="bg-[#19202d] border border-[#434655]/30 p-3 flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-[#b4c5ff] text-[20px]">flight_takeoff</span>
                <span className="text-[10px] uppercase tracking-wider text-white font-semibold">Global Express</span>
                <span className="text-[9px] text-[#8d90a0]">Insured 48h dispatch</span>
              </div>
              <div className="bg-[#19202d] border border-[#434655]/30 p-3 flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-[#b4c5ff] text-[20px]">architecture</span>
                <span className="text-[10px] uppercase tracking-wider text-white font-semibold">Lifetime Atelier</span>
                <span className="text-[9px] text-[#8d90a0]">Complimentary alterations</span>
              </div>
              <div className="bg-[#19202d] border border-[#434655]/30 p-3 flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-[#b4c5ff] text-[20px]">lock</span>
                <span className="text-[10px] uppercase tracking-wider text-white font-semibold">Vault Guarantee</span>
                <span className="text-[9px] text-[#8d90a0]">30-day collector return</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garment Anatomy & Provenance Section */}
      <section className="w-full bg-[#070e1b] py-20 border-t border-b border-[#434655]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Text & Spec Tabs Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#b4c5ff] font-semibold block mb-1">
                  Material Architecture &amp; Provenance
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white">
                  The Science of Weightless Warmth
                </h2>
                <p className="text-sm text-[#8d90a0] pt-2 leading-relaxed">
                  Every Grand Nocturne mantle requires over thirty-two hours of patient artisan handling in our Lombardy atelier. We employ a double-faced technique where two layers of Mongolian cashmere are split at the edges and meticulously turned inward by hand.
                </p>
              </div>

              {/* Spec Tabs Switcher */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs uppercase tracking-widest overflow-x-auto pb-1 border-b border-[#434655]/30">
                  <button
                    onClick={() => setActiveSpecTab('craft')}
                    className={`pb-2 transition-colors whitespace-nowrap ${
                      activeSpecTab === 'craft'
                        ? 'text-[#b4c5ff] font-bold border-b-2 border-[#b4c5ff]'
                        : 'text-[#8d90a0] hover:text-white'
                    }`}
                  >
                    Artisanal Craft
                  </button>
                  <button
                    onClick={() => setActiveSpecTab('materials')}
                    className={`pb-2 transition-colors whitespace-nowrap ${
                      activeSpecTab === 'materials'
                        ? 'text-[#b4c5ff] font-bold border-b-2 border-[#b4c5ff]'
                        : 'text-[#8d90a0] hover:text-white'
                    }`}
                  >
                    Material &amp; Care
                  </button>
                  <button
                    onClick={() => setActiveSpecTab('alterations')}
                    className={`pb-2 transition-colors whitespace-nowrap ${
                      activeSpecTab === 'alterations'
                        ? 'text-[#b4c5ff] font-bold border-b-2 border-[#b4c5ff]'
                        : 'text-[#8d90a0] hover:text-white'
                    }`}
                  >
                    Bespoke Fitting
                  </button>
                  <button
                    onClick={() => setActiveSpecTab('archival')}
                    className={`pb-2 transition-colors whitespace-nowrap ${
                      activeSpecTab === 'archival'
                        ? 'text-[#b4c5ff] font-bold border-b-2 border-[#b4c5ff]'
                        : 'text-[#8d90a0] hover:text-white'
                    }`}
                  >
                    Archival Vault
                  </button>
                </div>

                {/* Tab 1: Craft */}
                {activeSpecTab === 'craft' && (
                  <div className="bg-[#141c29] border border-[#434655]/30 p-5 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#b4c5ff] text-[22px]">architecture</span>
                      <div>
                        <h3 className="font-serif text-base text-white">Hand-Split Blind Edges</h3>
                        <p className="text-xs text-[#8d90a0] leading-relaxed mt-0.5">
                          Our master needleworkers split the perimeter of the double cashmere fabric by exactly 4mm, folding it internally for seamless, unlined perfection without machine topstitching.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-t border-[#434655]/20 pt-3">
                      <span className="material-symbols-outlined text-[#b4c5ff] text-[22px]">token</span>
                      <div>
                        <h3 className="font-serif text-base text-white">Veneto Horn Buttons</h3>
                        <p className="text-xs text-[#8d90a0] leading-relaxed mt-0.5">
                          Each button is individually lathed from natural Italian horn in the Veneto foothills, finished with subtle matte laser-engraved Getzy archival hallmarks.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Materials */}
                {activeSpecTab === 'materials' && (
                  <div className="bg-[#141c29] border border-[#434655]/30 p-5 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#b4c5ff] text-[22px]">eco</span>
                      <div>
                        <h3 className="font-serif text-base text-white">14.5-Micron Mongolian Virgin Cashmere</h3>
                        <p className="text-xs text-[#8d90a0] leading-relaxed mt-0.5">
                          Ethically gathered during spring molting from high-plateau Mongolian capra hircus. Unmatched thermoregulating warmth with zero bulk.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-t border-[#434655]/20 pt-3">
                      <span className="material-symbols-outlined text-[#b4c5ff] text-[22px]">dry_cleaning</span>
                      <div>
                        <h3 className="font-serif text-base text-white">Garment Conservation</h3>
                        <p className="text-xs text-[#8d90a0] leading-relaxed mt-0.5">
                          Specialist eco-dry clean only. Store on the included cedarwood shoulder hanger inside our breathable Nocturne canvas garment vault.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Alterations */}
                {activeSpecTab === 'alterations' && (
                  <div className="bg-[#141c29] border border-[#434655]/30 p-5 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#b4c5ff] text-[22px]">storefront</span>
                      <div>
                        <h3 className="font-serif text-base text-white">Flagship Atelier Alterations</h3>
                        <p className="text-xs text-[#8d90a0] leading-relaxed mt-0.5">
                          Present your physical certificate at any Getzy salon (Paris, Milan, New York, Tokyo) for lifetime sleeve, shoulder, or hem tailoring at no added fee.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Archival */}
                {activeSpecTab === 'archival' && (
                  <div className="bg-[#141c29] border border-[#434655]/30 p-5 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#b4c5ff] text-[22px]">fingerprint</span>
                      <div>
                        <h3 className="font-serif text-base text-white">Cryptographic Provenance</h3>
                        <p className="text-xs text-[#8d90a0] leading-relaxed mt-0.5">
                          An embedded micro-NFC chip discreetly sewn inside the interior label links to your ownership record and digital museum verification archive.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Visual Anatomy Spec Card (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-square bg-[#141c29] border border-[#434655]/40 overflow-hidden shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9JKdq7ZhlmVzJBdsKc_luTxIwavCVVlRheaNFm7Sv3XrG2DzpsAgOkza9R-vXtU1BCi0IRAxp7-qffHesHtFaBQ7y3VRxdvr4EMoTUp0Jg3kRjxXaJj--QGyeCIqc9frXAjipjn17Zn07E0Ur3EXupVU48n4Ln8yXgTdwEUkKFZ3O5XsnX5SmHJO32TOgLqiZt8kocUl0UHucJeANkkmTBuKQcLdPHHfyGDTQxZchKJjcwI8-PqvZ"
                  alt="Anatomy of The Grand Nocturne Overcoat"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b]/80 via-transparent to-transparent pointer-events-none" />

                {/* Graphic Annotation 1 */}
                <div className="absolute top-[28%] left-[28%] flex items-center gap-1 group">
                  <div className="w-3 h-3 rounded-full bg-[#b4c5ff] animate-ping"></div>
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] -ml-2.5"></div>
                  <div className="bg-[#19202d]/90 backdrop-blur-md px-2.5 py-1 text-white text-[10px] uppercase tracking-wider border border-[#434655]/40">
                    Unstructured High Stand Collar
                  </div>
                </div>

                {/* Graphic Annotation 2 */}
                <div className="absolute top-[62%] left-[22%] flex items-center gap-1 group">
                  <div className="w-3 h-3 rounded-full bg-[#b4c5ff] animate-ping"></div>
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] -ml-2.5"></div>
                  <div className="bg-[#19202d]/90 backdrop-blur-md px-2.5 py-1 text-white text-[10px] uppercase tracking-wider border border-[#434655]/40">
                    Veneto Carved Horn Anchor
                  </div>
                </div>

                {/* Graphic Annotation 3 */}
                <div className="absolute bottom-[20%] right-[15%] flex items-center gap-1 group">
                  <div className="w-3 h-3 rounded-full bg-[#b4c5ff] animate-ping"></div>
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] -ml-2.5"></div>
                  <div className="bg-[#19202d]/90 backdrop-blur-md px-2.5 py-1 text-white text-[10px] uppercase tracking-wider border border-[#434655]/40">
                    Hand-Split 4mm Hem
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Nocturne Silhouette (Companion Pieces) */}
      <section className="w-full px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#b4c5ff] font-semibold block mb-1">
              The Nocturne Wardrobe
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Complete The Silhouette
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#8d90a0] max-w-md leading-relaxed">
            Curated companion editions sculpted to harmonize with the proportions, midnight palette, and drape of The Grand Nocturne Overcoat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companions.map((comp) => (
            <div
              key={comp.id}
              onClick={() => navigateToProduct(comp.slug)}
              className="group flex flex-col bg-[#141c29] border border-[#434655]/30 hover:border-[#b4c5ff]/50 transition-all cursor-pointer shadow-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#070e1b]">
                <img
                  src={comp.images[0]}
                  alt={comp.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#070e1b]/80 backdrop-blur-md px-2.5 py-1 text-[10px] uppercase tracking-widest text-white">
                  {comp.badge}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(comp, comp.sizes[0]);
                  }}
                  className="absolute bottom-3 right-3 w-10 h-10 bg-[#2e3543]/90 hover:bg-[#2563eb] text-white flex items-center justify-center transition-colors shadow-lg"
                  title="Quick Add"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#8d90a0]">
                    {comp.subtitle}
                  </span>
                  <h3 className="font-serif text-lg text-white group-hover:text-[#b4c5ff] transition-colors leading-snug">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-[#8d90a0] line-clamp-2 leading-relaxed">
                    {comp.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#434655]/30">
                  <span className="font-serif text-lg text-[#a4c9ff] font-semibold">
                    {formatPrice(comp.price)}
                  </span>
                  <span className="text-xs text-[#b4c5ff] group-hover:underline">
                    Explore Piece →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIP Atelier Fitting & Concierge Consultation Banner */}
      <section className="w-full bg-[#070e1b] py-16 border-t border-[#434655]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-[#141c29] border border-[#434655]/40 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl space-y-2 relative z-10">
              <div className="flex items-center gap-2 text-[#b4c5ff] text-xs uppercase tracking-widest font-semibold">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Private Salons • Paris — Milano — New York</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-white">
                Experience The Nocturne Fitting Salon
              </h2>
              <p className="text-xs md:text-sm text-[#c1c7cf] leading-relaxed">
                Schedule a private one-on-one session with our master tailor. Complimentary champagne, bespoke shoulder measurements, and archival garment personalization.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10 w-full lg:w-auto">
              <button
                onClick={() => {
                  setCurrentView('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#2563eb] hover:bg-[#0053db] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 whitespace-nowrap transition-all shadow-lg text-center"
              >
                Book Atelier Appointment
              </button>
              <button
                onClick={() => showToast('Digital Video Consultation reserved. Invitation dispatched via email.')}
                className="bg-[#232a38] hover:bg-[#323948] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 whitespace-nowrap transition-all text-center border border-[#434655]/40"
              >
                Digital Video Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
