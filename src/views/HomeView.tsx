import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const HomeView: React.FC = () => {
  const {
    addItem,
    formatPrice,
    setQuickViewProduct,
    setIsRunwayOpen,
    navigateToProduct,
    showToast
  } = useCart();

  const [activeFilter, setActiveFilter] = useState<'all' | 'outerwear' | 'blazers' | 'eveningwear' | 'accessories'>('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'grand-overcoat': '40',
    'cashmere-blazer': 'M',
    'sovereign-trench': '40',
    'silk-slip': 'S'
  });

  // Hotspots active card
  const [activeHotspot, setActiveHotspot] = useState<'look1' | 'look2' | null>(null);

  // Accordion active state
  const [activeCraftTab, setActiveCraftTab] = useState<number>(1);

  // Appointment Form state
  const [apptLocation, setApptLocation] = useState('Via Montenapoleone Salon — Milan');
  const [apptDate, setApptDate] = useState('2025-11-15');
  const [apptTime, setApptTime] = useState('11:00 AM CET');
  const [apptName, setApptName] = useState('');
  const [apptContact, setApptContact] = useState('');
  const [apptSuccess, setApptSuccess] = useState(false);

  // Wishlist set
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({
    'grand-overcoat': true
  });

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => {
      const next = !prev[id];
      showToast(next ? 'Creation saved to Private Archive' : 'Removed from Private Archive');
      return { ...prev, [id]: next };
    });
  };

  const handleSizeSelect = (productId: string, size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAcquire = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const size = selectedSizes[product.id] || product.sizes[0];
    addItem(product, size);
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apptName && apptContact) {
      setApptSuccess(true);
      showToast(`Private consultation requested for ${apptName} at ${apptLocation}`);
    }
  };

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <div className="flex flex-col w-full bg-[#0c1321]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#070e1b] -mt-28 pt-28">
        {/* Background Image Stage with layered luxury gradients */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center md:bg-[center_top] scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPOLtpEicMGdlHChi7TAvFH6jIa21KipCy6UvtE3oqxdFbieXIvBo5liyd1qB42iQU7KDnzh5Fia2uPOXKNlm_gdkrecxMY4ZzFWacGVt5z5Lx95pj7GN9_zZ--DR6dx4MM8mDohDZVYx7MU_hwtkAET-QQx_nz5Ad5bBbd8fzzGl8WBBtQUeimHyNuG5KmCXg_f_uWRDtUnX6ahKnmbTAl9wp64qMj15NtSLusCChanG2x6A0Evxh')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1321] via-[#0c1321]/75 to-[#070e1b]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#b4c5ff]/10 via-transparent to-transparent" />
        </div>

        {/* Hero Narrative Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-36 pb-16 min-h-[90vh] flex flex-col justify-end">
          <div className="max-w-3xl space-y-4 mb-10">
            {/* Archival Pill */}
            <div className="inline-flex items-center gap-2 bg-[#19202d]/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#434655]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b4c5ff] animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-widest text-[#b4c5ff] font-semibold">
                Autumn / Winter 2025 Atelier
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-tight text-white leading-tight">
              Tailored to Perfection.{' '}
              <span className="italic font-normal text-[#d4e3ff]">Crafted in Silence.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#c1c7cf] text-base md:text-lg max-w-2xl leading-relaxed">
              Explore the new Nocturne collection — engineered in Milan from architectural double-faced cashmere and hand-sculpted Italian wool. A manifesto of contemporary restraint.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#capsule-collection"
                className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-[#0053db] transition-all shadow-xl hover:shadow-[#2563eb]/20 active:scale-[0.99]"
              >
                <span>Explore Collection</span>
                <span className="material-symbols-outlined text-[18px]">south</span>
              </a>

              <button
                onClick={() => setIsRunwayOpen(true)}
                className="inline-flex items-center gap-2 bg-[#232a38]/80 backdrop-blur-md text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-[#323948] transition-colors border border-[#434655]/40"
              >
                <span className="material-symbols-outlined text-[#b4c5ff] text-[20px]">play_circle</span>
                <span>Watch Runway Film</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 bg-[#0c1321]/60 backdrop-blur-xl p-4 md:p-6 border border-[#434655]/30">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#b4c5ff] text-[26px]">all_inclusive</span>
              <div>
                <p className="text-xs uppercase tracking-widest text-white font-semibold">
                  100% Mongolian Cashmere
                </p>
                <p className="text-xs text-[#8d90a0]">Sustainably combed 14.5µm micron fibers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#a4c9ff] text-[26px]">architecture</span>
              <div>
                <p className="text-xs uppercase tracking-widest text-white font-semibold">
                  Bespoke Italian Tailoring
                </p>
                <p className="text-xs text-[#8d90a0]">Cut by master sarti in Biella &amp; Milan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#d4e3ff] text-[26px]">verified</span>
              <div>
                <p className="text-xs uppercase tracking-widest text-white font-semibold">
                  Limited Numbered Release
                </p>
                <p className="text-xs text-[#8d90a0]">Strictly limited to 100 archival impressions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAPSULE COLLECTION SHOWCASE */}
      <section className="w-full py-20 bg-[#0c1321] px-6 md:px-12" id="capsule-collection">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Section Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs tracking-widest uppercase text-[#b4c5ff] font-semibold">
                Curated Nocturne Capsule
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                The Autumn / Winter Atelier
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#141c29] p-1.5 rounded-full border border-[#434655]/40">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all font-medium ${
                  activeFilter === 'all'
                    ? 'bg-[#0c1321] text-white shadow'
                    : 'text-[#8d90a0] hover:text-white'
                }`}
              >
                All Creations
              </button>
              <button
                onClick={() => setActiveFilter('outerwear')}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all font-medium ${
                  activeFilter === 'outerwear'
                    ? 'bg-[#0c1321] text-white shadow'
                    : 'text-[#8d90a0] hover:text-white'
                }`}
              >
                Outerwear &amp; Coats
              </button>
              <button
                onClick={() => setActiveFilter('blazers')}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all font-medium ${
                  activeFilter === 'blazers'
                    ? 'bg-[#0c1321] text-white shadow'
                    : 'text-[#8d90a0] hover:text-white'
                }`}
              >
                Tailored Blazers
              </button>
              <button
                onClick={() => setActiveFilter('eveningwear')}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all font-medium ${
                  activeFilter === 'eveningwear'
                    ? 'bg-[#0c1321] text-white shadow'
                    : 'text-[#8d90a0] hover:text-white'
                }`}
              >
                Silk Eveningwear
              </button>
              <button
                onClick={() => setActiveFilter('accessories')}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all font-medium ${
                  activeFilter === 'accessories'
                    ? 'bg-[#0c1321] text-white shadow'
                    : 'text-[#8d90a0] hover:text-white'
                }`}
              >
                Accessories
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const currentSize = selectedSizes[product.id] || product.sizes[0];
              const isFav = !!wishlist[product.id];

              return (
                <article
                  key={product.id}
                  onClick={() => navigateToProduct(product.slug)}
                  className="group flex flex-col bg-[#141c29] border border-[#434655]/30 hover:border-[#b4c5ff]/50 transition-all duration-300 shadow-lg cursor-pointer"
                >
                  {/* Image Viewport */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#070e1b]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Limited Edition badge */}
                    <div className="absolute top-3 left-3 bg-[#070e1b]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#b4c5ff] uppercase tracking-widest font-medium">
                      {product.badge}
                    </div>

                    {/* Wishlist toggle */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-[#070e1b]/80 backdrop-blur-md flex items-center justify-center transition-colors ${
                        isFav ? 'text-[#b4c5ff]' : 'text-[#8d90a0] hover:text-white'
                      }`}
                      aria-label="Save item"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isFav ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>

                    {/* Quick View Button on hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="absolute bottom-3 left-3 right-3 bg-[#2e3543]/90 hover:bg-[#323948] text-white py-2 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 shadow-xl"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#8d90a0] uppercase tracking-wider mb-1">
                        <span>{product.subtitle}</span>
                        <span className="text-[#a4c9ff] font-semibold">{formatPrice(product.price)}</span>
                      </div>
                      <h3 className="font-serif text-lg text-white group-hover:text-[#b4c5ff] transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </div>

                    {/* Color Swatches & Sizes */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#8d90a0]">Palette:</span>
                        <div className="flex items-center gap-1.5">
                          {product.colors.map((c, i) => (
                            <span
                              key={c.name}
                              style={{ backgroundColor: c.hex }}
                              className={`w-3.5 h-3.5 rounded-full border border-black/40 ${
                                i === 0 ? 'ring-2 ring-[#b4c5ff] ring-offset-2 ring-offset-[#141c29]' : ''
                              }`}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Size Selector Pills */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {product.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={(e) => handleSizeSelect(product.id, sz, e)}
                            className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
                              currentSize === sz
                                ? 'bg-[#b4c5ff] text-[#002a78] font-bold shadow'
                                : 'bg-[#19202d] text-[#8d90a0] hover:text-white hover:bg-[#232a38]'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Acquire Button */}
                    <button
                      onClick={(e) => handleAcquire(product, e)}
                      className="w-full bg-[#2563eb] hover:bg-[#0053db] text-white py-2.5 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 transition-colors shadow active:scale-[0.99]"
                    >
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span>Acquire Creation</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE EDITORIAL LOOKBOOK HOTSPOTS */}
      <section className="w-full py-20 bg-[#070e1b] overflow-hidden border-t border-b border-[#434655]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#a4c9ff] font-semibold">
                Interactive Campaign
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                Nocturne Campaign Lookbook
              </h2>
            </div>
            <p className="text-xs md:text-sm text-[#8d90a0] max-w-md leading-relaxed">
              Explore the garments in situ. Hover or tap the glowing sapphire nodes to reveal garment specifications and directly add to your private atelier bag.
            </p>
          </div>

          {/* Hotspot Interactive Frame */}
          <div className="relative w-full aspect-[16/9] min-h-[440px] bg-[#141c29] overflow-hidden border border-[#434655]/30">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3N4hTfVFeQ7BufOPiRUQpPBj5WohxwUB5hSAd_wUUvDUyxK8WFPIosP2QxOqRpACRPoNAoXy_gFKjJOr7bAfQW-LNBbwZKs2q1j7Q0C_9jvu-NOZIO3udgIXWBUG4-QTx6dL0hR9ZQRC6Qx5vhnp6oAmh9pXEssUkhfvSkMCGawpkwMMRC0PDb8UXmIG1AxKc4zR91N7zU0a5KC2SN-0zyjRAtOUEZX4E1-Al-SoksglxlDPQY-vX"
              alt="Editorial campaign models"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b]/80 via-transparent to-[#070e1b]/30"></div>

            {/* Hotspot 1: Overcoat */}
            <div className="absolute top-[38%] left-[42%] z-20 group">
              <button
                onClick={() => setActiveHotspot(activeHotspot === 'look1' ? null : 'look1')}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#2563eb]/90 text-white backdrop-blur-md shadow-lg shadow-[#2563eb]/40 hover:scale-125 transition-transform"
                aria-label="Inspect Look 1"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span className="absolute inset-0 rounded-full bg-[#b4c5ff] animate-ping opacity-40"></span>
              </button>

              {/* Floating Tooltip Desktop Hover / Mobile Click */}
              <div
                className={`absolute left-10 top-1/2 -translate-y-1/2 bg-[#19202d]/95 border border-[#434655]/60 backdrop-blur-xl p-4 shadow-2xl min-w-[270px] z-30 transition-all ${
                  activeHotspot === 'look1' ? 'flex' : 'hidden group-hover:flex'
                } flex-col`}
              >
                <span className="text-[10px] text-[#b4c5ff] uppercase tracking-widest font-semibold">
                  Look 01 • Runway
                </span>
                <h4 className="font-serif text-base text-white mt-0.5">The Grand Nocturne Overcoat</h4>
                <p className="text-[11px] text-[#8d90a0]">Double-faced 100% Cashmere</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-sm text-[#a4c9ff] font-semibold">$1,850</span>
                  <button
                    onClick={() => {
                      addItem(PRODUCTS[0], '40');
                      setActiveHotspot(null);
                    }}
                    className="text-[10px] text-white bg-[#2563eb] hover:bg-[#0053db] px-3 py-1 uppercase tracking-widest font-semibold"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>

            {/* Hotspot 2: Silk Dress & Tailored Blazer */}
            <div className="absolute top-[48%] left-[58%] z-20 group">
              <button
                onClick={() => setActiveHotspot(activeHotspot === 'look2' ? null : 'look2')}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#0267b8]/90 text-white backdrop-blur-md shadow-lg shadow-[#0267b8]/40 hover:scale-125 transition-transform"
                aria-label="Inspect Look 2"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span className="absolute inset-0 rounded-full bg-[#a4c9ff] animate-ping opacity-30"></span>
              </button>

              <div
                className={`absolute right-10 top-1/2 -translate-y-1/2 bg-[#19202d]/95 border border-[#434655]/60 backdrop-blur-xl p-4 shadow-2xl min-w-[270px] z-30 transition-all ${
                  activeHotspot === 'look2' ? 'flex' : 'hidden group-hover:flex'
                } flex-col`}
              >
                <span className="text-[10px] text-[#a4c9ff] uppercase tracking-widest font-semibold">
                  Look 02 • Atelier
                </span>
                <h4 className="font-serif text-base text-white mt-0.5">Silk Cowl Atelier Slip Dress</h4>
                <p className="text-[11px] text-[#8d90a0]">Como 30mm Mulberry Silk</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-sm text-[#a4c9ff] font-semibold">$890</span>
                  <button
                    onClick={() => {
                      addItem(PRODUCTS[3], 'S');
                      setActiveHotspot(null);
                    }}
                    className="text-[10px] text-white bg-[#2563eb] hover:bg-[#0053db] px-3 py-1 uppercase tracking-widest font-semibold"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CRAFTSMANSHIP & BESPOKE APPOINTMENT SECTION */}
      <section className="w-full py-20 bg-[#0c1321] px-6 md:px-12" id="craftsmanship-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Sartorial Mastery Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#b4c5ff] font-semibold">
                Sartorial Mastery
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                The Architecture of Cashmere
              </h2>
            </div>
            <p className="text-[#c1c7cf] text-base leading-relaxed">
              Every silhouette in the Nocturne collection emerges through months of relentless balance between weight, drape, and form. Crafted inside historical mills in northern Italy, our double-faced cashmere is hand-split along hairline hems and rolled invisibly.
            </p>

            {/* Interactive Accordion */}
            <div className="space-y-3 pt-2">
              {/* Item 1 */}
              <div
                onClick={() => setActiveCraftTab(activeCraftTab === 1 ? 0 : 1)}
                className="bg-[#141c29] border border-[#434655]/40 p-4 transition-colors cursor-pointer hover:bg-[#19202d]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#b4c5ff] font-mono font-bold">01</span>
                    <h4 className="font-serif text-lg text-white">
                      Double-Faced Cashmere Splitting
                    </h4>
                  </div>
                  <span className="material-symbols-outlined text-[#b4c5ff] text-[20px]">
                    {activeCraftTab === 1 ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
                {activeCraftTab === 1 && (
                  <div className="pt-3 text-xs md:text-sm text-[#c1c7cf] leading-relaxed border-t border-[#434655]/30 mt-3 animate-in fade-in duration-200">
                    Two layers of 14.5-micron virgin Mongolian cashmere woven as a single entity, meticulously separated by 4 millimeters along the perimeter and turned inwards by master artisans. Over 32 hours of patient blind-stitching ensures zero visible machine topstitch.
                  </div>
                )}
              </div>

              {/* Item 2 */}
              <div
                onClick={() => setActiveCraftTab(activeCraftTab === 2 ? 0 : 2)}
                className="bg-[#141c29] border border-[#434655]/40 p-4 transition-colors cursor-pointer hover:bg-[#19202d]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#b4c5ff] font-mono font-bold">02</span>
                    <h4 className="font-serif text-lg text-white">
                      Zero-Waste Sculptural Patterning
                    </h4>
                  </div>
                  <span className="material-symbols-outlined text-[#8d90a0] text-[20px]">
                    {activeCraftTab === 2 ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
                {activeCraftTab === 2 && (
                  <div className="pt-3 text-xs md:text-sm text-[#c1c7cf] leading-relaxed border-t border-[#434655]/30 mt-3 animate-in fade-in duration-200">
                    Engineered using computer-assisted geometric tessellation, ensuring less than 2.8% fabric scrap across all limited-edition production runs. The natural warp and weft of the cashmere are calculated to fall without internal canvas stiffeners.
                  </div>
                )}
              </div>

              {/* Item 3 */}
              <div
                onClick={() => setActiveCraftTab(activeCraftTab === 3 ? 0 : 3)}
                className="bg-[#141c29] border border-[#434655]/40 p-4 transition-colors cursor-pointer hover:bg-[#19202d]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#b4c5ff] font-mono font-bold">03</span>
                    <h4 className="font-serif text-lg text-white">
                      Sapphire Pigment Formulation
                    </h4>
                  </div>
                  <span className="material-symbols-outlined text-[#8d90a0] text-[20px]">
                    {activeCraftTab === 3 ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
                {activeCraftTab === 3 && (
                  <div className="pt-3 text-xs md:text-sm text-[#c1c7cf] leading-relaxed border-t border-[#434655]/30 mt-3 animate-in fade-in duration-200">
                    A bespoke nocturnal dye bath formulated in Biella, reflecting deep violet tones under direct morning sun while absorbing shadows into obsidian blue in twilight interiors. Sourced from organic cobalt mineral precipitates without harmful synthetics.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Book a Private Viewing Consultation Form */}
          <div className="lg:col-span-5 bg-[#141c29] border border-[#434655]/40 p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-1 mb-6">
              <span className="text-[11px] uppercase tracking-widest text-[#b4c5ff] font-semibold">
                Private Salon Experience
              </span>
              <h3 className="font-serif text-2xl text-white">
                Book Private Atelier Viewing
              </h3>
              <p className="text-xs text-[#8d90a0] leading-relaxed">
                Schedule a private one-on-one session with our master tailor at one of our global flagship salons.
              </p>
            </div>

            {apptSuccess ? (
              <div className="bg-[#19202d] border border-[#2563eb]/40 p-6 flex flex-col items-center text-center space-y-3 animate-in zoom-in-95 duration-200">
                <span className="material-symbols-outlined text-[#b4c5ff] text-[48px]">check_circle</span>
                <h4 className="font-serif text-xl text-white">Consultation Requested</h4>
                <p className="text-xs text-[#c1c7cf] max-w-xs leading-relaxed">
                  Your dedicated private concierge will contact you within two hours to finalize your salon itinerary for {apptLocation}.
                </p>
                <button
                  onClick={() => setApptSuccess(false)}
                  className="bg-[#2563eb] text-white text-xs uppercase tracking-widest px-4 py-2 font-medium"
                >
                  Book Another Atelier
                </button>
              </div>
            ) : (
              <form onSubmit={handleAppointmentSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-white block mb-1">
                    Atelier Location
                  </label>
                  <select
                    value={apptLocation}
                    onChange={(e) => setApptLocation(e.target.value)}
                    className="w-full bg-[#19202d] border border-[#434655]/40 px-3 py-2 text-white text-xs focus:border-[#b4c5ff] focus:outline-none"
                  >
                    <option value="Via Montenapoleone Salon — Milan">Via Montenapoleone Salon — Milan</option>
                    <option value="Place Vendôme Atelier — Paris">Place Vendôme Atelier — Paris</option>
                    <option value="Madison Avenue Penthouse — New York">Madison Avenue Penthouse — New York</option>
                    <option value="Mayfair Suite — London">Mayfair Suite — London</option>
                    <option value="Ginza Private Salon — Tokyo">Ginza Private Salon — Tokyo</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-white block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={apptDate}
                      onChange={(e) => setApptDate(e.target.value)}
                      className="w-full bg-[#19202d] border border-[#434655]/40 px-3 py-2 text-white text-xs focus:border-[#b4c5ff] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-white block mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={apptTime}
                      onChange={(e) => setApptTime(e.target.value)}
                      className="w-full bg-[#19202d] border border-[#434655]/40 px-3 py-2 text-white text-xs focus:border-[#b4c5ff] focus:outline-none"
                    >
                      <option>11:00 AM CET</option>
                      <option>02:30 PM CET</option>
                      <option>05:00 PM CET (Evening Salon)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-white block mb-1">
                    Client Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={apptName}
                    onChange={(e) => setApptName(e.target.value)}
                    placeholder="Lord / Lady / M."
                    className="w-full bg-[#19202d] border border-[#434655]/40 px-3 py-2 text-white text-xs placeholder:text-[#8d90a0] focus:border-[#b4c5ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-white block mb-1">
                    Direct Correspondence Phone or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={apptContact}
                    onChange={(e) => setApptContact(e.target.value)}
                    placeholder="vip@atelier-client.com"
                    className="w-full bg-[#19202d] border border-[#434655]/40 px-3 py-2 text-white text-xs placeholder:text-[#8d90a0] focus:border-[#b4c5ff] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2563eb] hover:bg-[#0053db] text-white py-3 text-xs uppercase tracking-widest font-semibold transition-all shadow-xl active:scale-[0.99]"
                >
                  Request Private Viewing
                </button>

                <p className="text-[10px] text-[#8d90a0] text-center">
                  Complimentary chauffeured transport included upon confirmation.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. VIP CONCIERGE & CLIENT SERVICES GRID */}
      <section className="w-full py-16 bg-[#070e1b] px-6 md:px-12 border-t border-[#434655]/20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#b4c5ff] font-semibold">
              The Atelier Standard
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Uncompromising Client Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#141c29] border border-[#434655]/30 p-6 space-y-2">
              <span className="material-symbols-outlined text-[#b4c5ff] text-[32px]">flight_takeoff</span>
              <h3 className="font-serif text-lg text-white">Global Express Delivery</h3>
              <p className="text-xs text-[#8d90a0] leading-relaxed">
                Complimentary white-glove international courier delivery with zero duties or unexpected tariffs.
              </p>
            </div>

            <div className="bg-[#141c29] border border-[#434655]/30 p-6 space-y-2">
              <span className="material-symbols-outlined text-[#a4c9ff] text-[32px]">content_cut</span>
              <h3 className="font-serif text-lg text-white">Bespoke Alterations</h3>
              <p className="text-xs text-[#8d90a0] leading-relaxed">
                Complimentary master tailoring and sleeve/hem adjustments available at any certified partner salon.
              </p>
            </div>

            <div className="bg-[#141c29] border border-[#434655]/30 p-6 space-y-2">
              <span className="material-symbols-outlined text-[#d4e3ff] text-[32px]">lock</span>
              <h3 className="font-serif text-lg text-white">30-Day Private Vault Returns</h3>
              <p className="text-xs text-[#8d90a0] leading-relaxed">
                Effortless pickup returns coordinated directly by your concierge from your residence or hotel.
              </p>
            </div>

            <div className="bg-[#141c29] border border-[#434655]/30 p-6 space-y-2">
              <span className="material-symbols-outlined text-[#b4c5ff] text-[32px]">support_agent</span>
              <h3 className="font-serif text-lg text-white">Dedicated Stylist on Call</h3>
              <p className="text-xs text-[#8d90a0] leading-relaxed">
                Direct encrypted messaging with an atelier stylist for sizing advice, look coordination, and styling notes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
