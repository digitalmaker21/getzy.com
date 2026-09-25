import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PACKAGING_OPTIONS } from '../data/products';

export const CheckoutView: React.FC = () => {
  const {
    items,
    subtotal,
    discount,
    promoCode,
    applyPromoCode,
    formatPrice,
    setCurrentView,
    clearCart,
    showToast,
    setIsConciergeOpen
  } = useCart();

  // Form states
  const [selectedPackaging, setSelectedPackaging] = useState<'signature' | 'diplomatic' | 'coffret'>('signature');
  const [calligraphyOpen, setCalligraphyOpen] = useState(false);
  const [calligraphyText, setCalligraphyText] = useState("To Eleanor, in celebration of the Autumn Gala. May these silhouettes accompany your quiet command.");
  const [tailoringChoice, setTailoringChoice] = useState<'standard' | 'adjustment' | 'salon'>('standard');
  const [paymentTab, setPaymentTab] = useState<'card' | 'apple' | 'crypto' | 'wire'>('card');
  const [promoInput, setPromoInput] = useState('GETZYVIP');

  // Client info
  const [email, setEmail] = useState('eleanor.vance@nocturnecouture.ch');
  const [firstName, setFirstName] = useState('Eleanor');
  const [lastName, setLastName] = useState('Vance');
  const [residence, setResidence] = useState('Via Monte Napoleone 14, Palazzo Sola Cabiati');
  const [suite, setSuite] = useState('Floor 4, Private Salon');
  const [city, setCity] = useState('Milan (Milano), Italy');
  const [postalCode, setPostalCode] = useState('20121');
  const [phone, setPhone] = useState('+39 02 8901 3320');
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  // Card info
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 9012');
  const [cardExp, setCardExp] = useState('11 / 28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [cardHolder, setCardHolder] = useState('ELEANOR VANCE');

  // Authorization simulation
  const [authorizing, setAuthorizing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('GZY-VAULT-8849-NX');

  const packagingFee = selectedPackaging === 'coffret' ? 250 : 0;
  const grandTotal = Math.max(0, subtotal - discount + packagingFee);

  const handleAuthorize = () => {
    setAuthorizing(true);
    setTimeout(() => {
      setAuthorizing(false);
      setOrderComplete(true);
      const generatedOrder = `GZY-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
      setOrderNumber(generatedOrder);
      showToast(`Allocation authorized under Diplomatic Manifest #${generatedOrder}`);
    }, 1800);
  };

  if (orderComplete) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-[#0c1321]">
        <div className="max-w-2xl w-full bg-[#141c29] border border-[#2563eb]/40 p-8 md:p-12 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#2563eb]/20 border border-[#b4c5ff]/50 flex items-center justify-center text-[#b4c5ff]">
            <span className="material-symbols-outlined text-[36px]">verified</span>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-[#b4c5ff] font-semibold">
              Archival Prêt-à-Porter Allocation Secured
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Order Confirmed &amp; Inscribed
            </h2>
            <p className="font-mono text-xs text-[#a4c9ff] tracking-wider">
              DIPLOMATIC ORDER MANIFEST: {orderNumber}
            </p>
          </div>

          <div className="bg-[#0c1321] border border-[#434655]/30 p-5 text-left text-xs space-y-2">
            <div className="flex justify-between text-[#8d90a0]">
              <span>Client / Patron:</span>
              <span className="text-white font-medium">{firstName} {lastName}</span>
            </div>
            <div className="flex justify-between text-[#8d90a0]">
              <span>Transit Destination:</span>
              <span className="text-white font-medium">{residence}, {city}</span>
            </div>
            <div className="flex justify-between text-[#8d90a0]">
              <span>Packaging Ritual:</span>
              <span className="text-[#b4c5ff] uppercase font-semibold">
                {selectedPackaging === 'coffret' ? 'Ceremonial Presentation Coffret' : 'The Nocturne Signature Vault Box'}
              </span>
            </div>
            <div className="flex justify-between text-[#8d90a0]">
              <span>Master Tailoring Protocol:</span>
              <span className="text-white font-medium uppercase">{tailoringChoice}</span>
            </div>
            <div className="flex justify-between text-[#8d90a0] pt-2 border-t border-[#434655]/30 text-sm">
              <span className="text-white font-semibold">Authorized Investment:</span>
              <span className="text-[#a4c9ff] font-serif font-bold text-base">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <p className="text-xs text-[#8d90a0] leading-relaxed max-w-md mx-auto">
            Your dedicated courier dispatch notice and real-time encrypted GPS consignment token have been transmitted to <span className="text-white">{email}</span>. Maestro Vittorio remains on private standby for any bespoke adjustments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                clearCart();
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#0053db] text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Return to Nocturne Atelier
            </button>
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="w-full sm:w-auto bg-[#19202d] hover:bg-[#232a38] text-[#c3c6d7] px-6 py-3 text-xs uppercase tracking-widest transition-all border border-[#434655]/40"
            >
              Contact Atelier Concierge
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#0c1321]">
      {/* Atelier Vault Top Bar / Ambient Scrim */}
      <div className="w-full bg-[#070e1b] px-6 md:px-12 py-2.5 border-b border-[#434655]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-widest text-[#8d90a0]">
          <div className="flex items-center gap-2 text-[#dce2f5]">
            <span className="material-symbols-outlined text-[16px] text-[#b4c5ff]">encrypted</span>
            <span>
              Secure Protocol // Order Session ID:{' '}
              <span className="font-mono text-[#a4c9ff]">GZY-VAULT-8849-NX</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b4c5ff] animate-pulse"></span>
              Diplomatic Encrypted Conduit
            </span>
            <span className="text-[#434655]">|</span>
            <span className="text-[#c3c6d7]">Priority Air Dispatch</span>
          </div>
        </div>
      </div>

      {/* Main Checkout Workspace */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Header Area */}
        <div className="pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#b4c5ff] font-semibold block mb-1">
                Private Prêt-à-Porter Allocation
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-white">
                Secure Atelier Vault Checkout
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#c1c7cf]">
              <span className="material-symbols-outlined text-[18px] text-[#a4c9ff]">shield</span>
              <span>Bespoke Concierge Escrow Protected</span>
            </div>
          </div>

          {/* Linear Stepper Track */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-1.5 bg-[#070e1b] p-1.5 border border-[#434655]/30">
            <div className="bg-[#232a38] px-4 py-2.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-wider text-[#b4c5ff] uppercase font-semibold">
                  01 / DISPATCH
                </span>
                <span className="font-serif text-xs md:text-sm text-white">Client Profile</span>
              </div>
              <span className="material-symbols-outlined text-[#b4c5ff] text-[18px]">check_circle</span>
            </div>

            <div className="bg-[#232a38] px-4 py-2.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-wider text-[#b4c5ff] uppercase font-semibold">
                  02 / RITUAL
                </span>
                <span className="font-serif text-xs md:text-sm text-white">Packaging</span>
              </div>
              <span className="material-symbols-outlined text-[#a4c9ff] text-[18px]">radio_button_checked</span>
            </div>

            <div className="bg-[#19202d] px-4 py-2.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-wider text-[#8d90a0] uppercase">
                  03 / SARTORIAL
                </span>
                <span className="font-serif text-xs md:text-sm text-[#8d90a0]">Fitting Notes</span>
              </div>
              <span className="material-symbols-outlined text-[#8d90a0] text-[18px]">straighten</span>
            </div>

            <div className="bg-[#19202d] px-4 py-2.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-wider text-[#8d90a0] uppercase">
                  04 / SETTLEMENT
                </span>
                <span className="font-serif text-xs md:text-sm text-[#8d90a0]">Vault Payment</span>
              </div>
              <span className="material-symbols-outlined text-[#8d90a0] text-[18px]">lock</span>
            </div>
          </div>
        </div>

        {/* 12-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Acquisition Steps (7 cols) */}
          <form onSubmit={(e) => { e.preventDefault(); handleAuthorize(); }} className="lg:col-span-7 flex flex-col gap-8">
            {/* STEP 1: CLIENT IDENTIFICATION & DISPATCH */}
            <section className="bg-[#141c29] border border-[#434655]/40 p-6 md:p-8 flex flex-col gap-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.5 font-bold">
                    01
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl text-white">
                    Client Identity &amp; Diplomatic Courier Destination
                  </h2>
                </div>
                <span className="text-[10px] text-[#a4c9ff] uppercase tracking-widest hidden sm:inline-block font-semibold">
                  Vault Verified
                </span>
              </div>

              {/* VIP Recognition Banner */}
              <div className="bg-[#19202d] border border-[#434655]/30 p-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#b4c5ff] text-[20px]">stars</span>
                  <p className="text-xs text-white">
                    Recognized Client: <span className="text-[#b4c5ff] font-semibold">Lady Eleanor Vance</span> (Tier I Atelier Patron)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Switched to Guest Escrow Profile')}
                  className="text-[10px] uppercase tracking-widest text-[#b4c5ff] hover:text-white underline underline-offset-4"
                >
                  Switch Profile
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#a4c9ff] mb-1">
                    Atelier Registry Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0c1321] text-white px-3 py-2 border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                    Given Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#0c1321] text-white px-3 py-2 border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                    Surname
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#0c1321] text-white px-3 py-2 border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                    Primary Diplomatic / Private Residence
                  </label>
                  <input
                    type="text"
                    required
                    value={residence}
                    onChange={(e) => setResidence(e.target.value)}
                    className="w-full bg-[#0c1321] text-white px-3 py-2 border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                    Apartment / Floor / Suite
                  </label>
                  <input
                    type="text"
                    value={suite}
                    onChange={(e) => setSuite(e.target.value)}
                    className="w-full bg-[#0c1321] text-white px-3 py-2 border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                    City / Metropole
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#0c1321] text-white px-3 py-2 border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                  >
                    <option value="Milan (Milano), Italy">Milan (Milano), Italy</option>
                    <option value="Paris, France">Paris, France</option>
                    <option value="New York, United States">New York, United States</option>
                    <option value="London, United Kingdom">London, United Kingdom</option>
                    <option value="Tokyo, Japan">Tokyo, Japan</option>
                    <option value="Geneva, Switzerland">Geneva, Switzerland</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                    Postal Code / Zone
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-[#0c1321] text-white px-3 py-2 border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                    Armored Courier Dispatch Tel (SMS Window)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0c1321] text-white px-3 py-2 border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-[#8d90a0]">
                <input
                  type="checkbox"
                  id="whatsapp-consent"
                  checked={whatsappConsent}
                  onChange={(e) => setWhatsappConsent(e.target.checked)}
                  className="w-4 h-4 accent-[#2563eb]"
                />
                <label htmlFor="whatsapp-consent" className="cursor-pointer">
                  Direct personal courier contact via encrypted WhatsApp / Signal concierge prior to gate access.
                </label>
              </div>
            </section>

            {/* STEP 2: BESPOKE PACKAGING & UNBOXING RITUAL */}
            <section className="bg-[#141c29] border border-[#434655]/40 p-6 md:p-8 flex flex-col gap-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.5 font-bold">
                    02
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl text-white">
                    Unboxing Ritual &amp; Presentation Packaging
                  </h2>
                </div>
                <span className="text-[10px] text-[#b4c5ff] uppercase tracking-wider font-semibold">
                  Archival Conservation
                </span>
              </div>

              <p className="text-xs text-[#8d90a0] leading-relaxed">
                Select the archival casing tailored for your garment's transit and wardrobe longevity.
              </p>

              {/* Packaging Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PACKAGING_OPTIONS.map((pkg) => {
                  const isSelected = selectedPackaging === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackaging(pkg.id)}
                      className={`p-4 flex flex-col justify-between cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#19202d] border-[#b4c5ff] shadow-lg'
                          : 'bg-[#0c1321] border-[#434655]/40 hover:bg-[#19202d]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`material-symbols-outlined text-[28px] ${isSelected ? 'text-[#b4c5ff]' : 'text-[#8d90a0]'}`}>
                          {pkg.icon}
                        </span>
                        <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-[#b4c5ff]' : 'text-[#8d90a0]'}`}>
                          {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-serif text-sm text-white font-medium">{pkg.title}</h3>
                        <p className="text-[11px] text-[#8d90a0] leading-relaxed">{pkg.description}</p>
                      </div>

                      <div className="pt-4 text-[10px] uppercase tracking-widest font-semibold text-[#b4c5ff]">
                        {pkg.price === 0 ? 'COMPLIMENTARY' : `+${formatPrice(pkg.price)} USD`}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Calligraphy Accordion */}
              <div className="bg-[#19202d] border border-[#434655]/30 p-4 space-y-3">
                <div
                  onClick={() => setCalligraphyOpen(!calligraphyOpen)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#a4c9ff] text-[20px]">history_edu</span>
                    <span className="text-xs uppercase tracking-wider text-white font-medium">
                      Complimentary Handwritten Calligraphy Dedication
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#a4c9ff] text-[20px]">
                    {calligraphyOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </div>

                {calligraphyOpen && (
                  <div className="space-y-2 pt-2 border-t border-[#434655]/30 animate-in fade-in duration-200">
                    <label className="text-[10px] text-[#8d90a0] uppercase tracking-wider block">
                      Dedication Text (Penned in Parisian Black Gall Ink on Heavy Deckle-Edge Cotton Paper)
                    </label>
                    <textarea
                      rows={3}
                      value={calligraphyText}
                      onChange={(e) => setCalligraphyText(e.target.value)}
                      maxLength={160}
                      className="w-full bg-[#0c1321] text-white p-3 text-xs border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                    />
                    <span className="text-[10px] text-[#8d90a0] block text-right">
                      {calligraphyText.length}/160 Characters • Atelier Calligrapher on Duty
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* STEP 3: BESPOKE ALTERATION PROTOCOLS */}
            <section className="bg-[#141c29] border border-[#434655]/40 p-6 md:p-8 flex flex-col gap-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.5 font-bold">
                    03
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl text-white">
                    Master Tailor Alteration &amp; Fitting Protocols
                  </h2>
                </div>
                <span className="text-[10px] text-[#a4c9ff] uppercase tracking-widest font-semibold">
                  Sartorial Precision
                </span>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setTailoringChoice('standard')}
                  className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border ${
                    tailoringChoice === 'standard'
                      ? 'bg-[#19202d] border-[#b4c5ff]'
                      : 'bg-[#0c1321] border-[#434655]/30 hover:bg-[#19202d]'
                  }`}
                >
                  <input
                    type="radio"
                    name="tailoring"
                    checked={tailoringChoice === 'standard'}
                    onChange={() => setTailoringChoice('standard')}
                    className="mt-1 accent-[#2563eb]"
                  />
                  <div className="space-y-0.5">
                    <span className="font-serif text-sm text-white font-medium block">
                      Standard Milanese Sizing (Ready-to-Wear)
                    </span>
                    <span className="text-xs text-[#8d90a0] leading-relaxed block">
                      Constructed true to standard European archival proportions. Immediate dispatch clearance within 24 hours.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setTailoringChoice('adjustment')}
                  className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border ${
                    tailoringChoice === 'adjustment'
                      ? 'bg-[#19202d] border-[#b4c5ff]'
                      : 'bg-[#0c1321] border-[#434655]/30 hover:bg-[#19202d]'
                  }`}
                >
                  <input
                    type="radio"
                    name="tailoring"
                    checked={tailoringChoice === 'adjustment'}
                    onChange={() => setTailoringChoice('adjustment')}
                    className="mt-1 accent-[#2563eb]"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm text-white font-medium">
                        Pre-Dispatch Sleeve &amp; Hem Adjustment
                      </span>
                      <span className="bg-[#2563eb]/20 text-[#b4c5ff] text-[10px] uppercase px-1.5 py-0.5 font-semibold">
                        Master Tailor Service
                      </span>
                    </div>
                    <span className="text-xs text-[#8d90a0] leading-relaxed block">
                      Our Lombardy head tailor will review your profile measurements or contact you within 4 hours to calibrate sleeve length and coat vent drop prior to final stitching.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setTailoringChoice('salon')}
                  className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border ${
                    tailoringChoice === 'salon'
                      ? 'bg-[#19202d] border-[#b4c5ff]'
                      : 'bg-[#0c1321] border-[#434655]/30 hover:bg-[#19202d]'
                  }`}
                >
                  <input
                    type="radio"
                    name="tailoring"
                    checked={tailoringChoice === 'salon'}
                    onChange={() => setTailoringChoice('salon')}
                    className="mt-1 accent-[#2563eb]"
                  />
                  <div className="space-y-0.5">
                    <span className="font-serif text-sm text-white font-medium block">
                      Salon Fitting Session Upon Arrival
                    </span>
                    <span className="text-xs text-[#8d90a0] leading-relaxed block">
                      Book a private 60-minute appointment at our Milan (Via Monte Napoleone), Paris (Place Vendôme), or New York (Madison Ave) flagship for in-person finishing.
                    </span>
                  </div>
                </label>
              </div>
            </section>

            {/* STEP 4: VAULT SETTLEMENT & ALLOCATION AUTHORIZATION */}
            <section className="bg-[#141c29] border border-[#434655]/40 p-6 md:p-8 flex flex-col gap-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.5 font-bold">
                    04
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl text-white">
                    Vault Settlement &amp; Allocation Authorization
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-[#b4c5ff] text-xs">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>256-Bit Encrypted</span>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 bg-[#0c1321] p-1.5 border border-[#434655]/30 text-center text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentTab('card')}
                  className={`py-2 px-2 font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    paymentTab === 'card'
                      ? 'bg-[#232a38] text-white font-semibold'
                      : 'text-[#8d90a0] hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] text-[#b4c5ff]">credit_card</span>
                  <span>Prestige Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab('apple')}
                  className={`py-2 px-2 font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    paymentTab === 'apple'
                      ? 'bg-[#232a38] text-white font-semibold'
                      : 'text-[#8d90a0] hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">contactless</span>
                  <span>Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab('crypto')}
                  className={`py-2 px-2 font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    paymentTab === 'crypto'
                      ? 'bg-[#232a38] text-white font-semibold'
                      : 'text-[#8d90a0] hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">currency_bitcoin</span>
                  <span>Crypto Vault</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab('wire')}
                  className={`py-2 px-2 font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    paymentTab === 'wire'
                      ? 'bg-[#232a38] text-white font-semibold'
                      : 'text-[#8d90a0] hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">account_balance</span>
                  <span>Atelier Wire</span>
                </button>
              </div>

              {/* Card Inputs */}
              <div className="bg-[#0c1321] border border-[#434655]/30 p-5 space-y-4">
                <div className="flex items-center justify-between pb-1 border-b border-[#434655]/30">
                  <span className="text-[10px] text-[#8d90a0] uppercase tracking-widest">
                    Recognized Card Gateways
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-[#8d90a0]">
                    <span className="text-white font-semibold">Amex Centurion</span> • <span>Visa Infinite</span> • <span>World Elite</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                    Prestige Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#19202d] text-white px-3 py-2.5 font-mono text-sm tracking-widest border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                    />
                    <span className="absolute right-3 top-3 material-symbols-outlined text-[#b4c5ff] text-[20px]">
                      credit_card
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                      Valid Thru
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-full bg-[#19202d] text-white px-3 py-2 font-mono text-xs border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                    />
                  </div>

                  <div className="col-span-1 sm:col-span-1">
                    <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                      Security Code (CVV)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full bg-[#19202d] text-white px-3 py-2 font-mono text-xs border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                    />
                  </div>

                  <div className="col-span-1 sm:col-span-1 flex flex-col justify-end pb-1">
                    <span className="text-[10px] text-[#8d90a0] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#b4c5ff]">verified_user</span>
                      Tokenized Vault
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c3c6d7] mb-1">
                    Cardholder Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    className="w-full bg-[#19202d] text-white px-3 py-2 text-xs uppercase tracking-wider border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                  />
                </div>

                <div className="pt-1 flex items-center gap-2 text-xs text-[#8d90a0]">
                  <input
                    type="checkbox"
                    id="save-vault"
                    defaultChecked
                    className="w-4 h-4 accent-[#2563eb]"
                  />
                  <label htmlFor="save-vault" className="cursor-pointer">
                    Archive this instrument in Getzy Encrypted Vault for future limited edition allocations.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  disabled={authorizing || items.length === 0}
                  className="w-full bg-[#2563eb] hover:bg-[#0053db] text-white text-xs uppercase tracking-widest font-semibold py-4 px-6 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 group active:scale-[0.99]"
                >
                  {authorizing ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                      <span>Encrypting &amp; Transmitting to Vault Protocol...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                        lock
                      </span>
                      <span>Authorize Creation Allocation • {formatPrice(grandTotal)} USD</span>
                    </>
                  )}
                </button>

                <div className="flex flex-wrap items-center justify-between text-[#8d90a0] text-[11px] tracking-wider pt-1">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#b4c5ff]">verified</span>
                    Archival Plate Registered to Buyer
                  </span>
                  <span>Fully Insured Air Courier Transit</span>
                  <span>30-Day Atelier Vault Return Privileges</span>
                </div>
              </div>
            </section>
          </form>

          {/* Right Column: Sticky Atelier Capsule Summary (5 cols) */}
          <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
            <div className="bg-[#141c29] border border-[#434655]/40 p-6 md:p-8 flex flex-col gap-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#434655]/30">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#b4c5ff] font-semibold block">
                    Atelier Order Capsule
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl text-white">
                    Allocated Pieces ({items.length})
                  </h2>
                </div>
                <span className="font-mono text-xs text-[#a4c9ff] font-semibold">LOT #0492</span>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-4">
                {items.length === 0 ? (
                  <p className="text-xs text-[#8d90a0] py-4 text-center">
                    No creations currently in capsule.
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#19202d] border border-[#434655]/30 p-3.5 flex gap-3.5 items-start group"
                    >
                      <div className="w-20 h-28 flex-shrink-0 bg-[#070e1b] overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <span className="absolute bottom-1 left-1 bg-[#070e1b]/80 text-[#b4c5ff] font-mono text-[9px] px-1 py-0.5">
                          {item.edition || '018/100'}
                        </span>
                      </div>

                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h3 className="font-serif text-sm text-white font-medium truncate">
                            {item.name}
                          </h3>
                          <span className="font-serif text-sm text-white font-semibold flex-shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>

                        <div className="text-[11px] text-[#8d90a0] space-y-0.5 mt-1">
                          <div>
                            Size: <span className="text-white">{item.size}</span>
                          </div>
                          <div>
                            Shade: <span className="text-white">{item.color}</span>
                          </div>
                          {item.monogram && (
                            <div className="text-[#a4c9ff] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">grade</span>
                              Monogram: '{item.monogram}' (Gold Ingot Thread)
                            </div>
                          )}
                          <div className="text-[#8d90a0] text-[9px] tracking-widest uppercase mt-0.5">
                            Provenance: Biella Cashmere Mill, Italy
                          </div>
                        </div>

                        <div className="pt-2 flex justify-between items-center text-[10px]">
                          <span className="text-[#b4c5ff]">Archival Plate Included</span>
                          <span className="text-[#8d90a0]">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Privilege Code Voucher Module */}
              <div className="bg-[#0c1321] border border-[#434655]/30 p-3.5 space-y-2">
                <span className="block text-[10px] uppercase tracking-widest text-[#8d90a0] font-semibold">
                  Private Salon Privilege Token
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    className="w-full bg-[#19202d] text-white px-2.5 py-1.5 font-mono text-xs tracking-wider uppercase border border-[#434655]/40 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      applyPromoCode(promoInput);
                    }}
                    className="bg-[#323948] hover:bg-[#2563eb] text-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    {promoCode ? 'Applied' : 'Apply'}
                  </button>
                </div>
                <span className="text-[10px] text-[#a4c9ff] block">
                  ✓ VIP Sovereign Privilege: Priority Handcrafting &amp; Armored Dispatch
                </span>
              </div>

              {/* Settlement Breakdown */}
              <div className="space-y-2 text-xs pt-1 border-t border-[#434655]/30">
                <div className="flex justify-between text-[#8d90a0]">
                  <span>Creations Valuation</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#8d90a0]">
                  <span>White-Glove Armored Courier</span>
                  <span className="text-[#b4c5ff] font-semibold uppercase tracking-wider">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between text-[#8d90a0]">
                  <span>Global Import Duties &amp; Taxes</span>
                  <span className="text-[#a4c9ff] font-semibold uppercase tracking-wider">
                    Covered (DDP Landed)
                  </span>
                </div>
                <div className="flex justify-between text-[#8d90a0]">
                  <span>Unboxing Signature Box &amp; Seal</span>
                  <span className="text-[#b4c5ff] font-semibold uppercase tracking-wider">
                    {selectedPackaging === 'coffret' ? `+$250.00` : 'Included'}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#a4c9ff]">
                    <span>VIP Sovereign Privilege (10%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="pt-3 mt-2 flex justify-between items-baseline bg-[#232a38] p-3 border border-[#434655]/40">
                  <div className="flex flex-col">
                    <span className="font-serif text-sm text-white font-medium">
                      Total Vault Investment
                    </span>
                    <span className="text-[10px] text-[#8d90a0]">
                      Guaranteed landed quote in USD
                    </span>
                  </div>
                  <span className="font-serif text-2xl text-[#b4c5ff] font-bold tracking-tight">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Provenance & Assurance */}
            <div className="bg-[#141c29] border border-[#434655]/40 p-5 flex flex-col gap-3 shadow-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#a4c9ff] font-semibold">
                The Nocturne Assurance
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#b4c5ff] text-[18px] flex-shrink-0 mt-0.5">
                    flight_takeoff
                  </span>
                  <div>
                    <span className="text-white font-semibold block">48-Hour Diplomatic Express Transit</span>
                    <span className="text-[#8d90a0] text-[11px]">
                      Direct flight dispatch with real-time encrypted GPS consignment tracking.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#a4c9ff] text-[18px] flex-shrink-0 mt-0.5">
                    content_cut
                  </span>
                  <div>
                    <span className="text-white font-semibold block">Lifetime Atelier Restyling &amp; Fitting</span>
                    <span className="text-[#8d90a0] text-[11px]">
                      Unconditional access to Master Tailors at our Milan, Paris, London, and New York ateliers.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#b4c5ff] text-[18px] flex-shrink-0 mt-0.5">
                    verified
                  </span>
                  <div>
                    <span className="text-white font-semibold block">Dual Vault Physical &amp; Digital Certificate</span>
                    <span className="text-[#8d90a0] text-[11px]">
                      Your garment holds an individual brass plate provenance number recorded permanently in the Getzy Archives.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Concierge Line */}
            <div className="bg-[#0c1321] border border-[#434655]/40 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2563eb] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                </div>
                <div>
                  <span className="font-serif text-xs text-white block">Atelier Private Concierge</span>
                  <span className="text-[10px] text-[#8d90a0]">Direct line to Maestro Vittorio • Milan</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsConciergeOpen(true)}
                className="text-xs uppercase tracking-widest text-[#b4c5ff] hover:text-white font-semibold underline underline-offset-4"
              >
                Connect
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
