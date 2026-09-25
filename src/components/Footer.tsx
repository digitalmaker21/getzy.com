import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsConciergeOpen, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('You have been granted confidential access to The Nocturne Gazette');
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#070e1b] border-t border-[#434655]/20 pt-16 pb-12 text-[#c3c6d7]">
      <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#434655]/20">
          {/* Brand Manifesto (2 cols) */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1VQ9hJXfKqAdn55Ww-1vmX_Nwrjef1uNfnXAAhbZTrY0_LRB8BzUOtKwqqIzxi1sh-eiQEgt6zijWUiPDKBporZrxHUnrEdoiovZOVbQCTrezhk9HgHQSF9Q20c2LUNdKeollZwAjxGBKp2imw8c9wvNfDI-PIuVbYnt8fjtXZvgKK7Ne8rYq8uMA0cfP8B0Bh_Ub1M9mroeVzP3xnXp87KRUJmDKqAUFXSlCDlVpTz1YgtULEqSXuyKw"
                alt="Getzy Luxury Wordmark Logo"
                className="h-6 w-auto object-contain"
              />
              <span className="font-serif text-xl uppercase text-[#dce2f5] tracking-widest font-semibold">
                Getzy Atelier
              </span>
            </div>
            <p className="text-sm text-[#8d90a0] leading-relaxed max-w-md">
              Born in architectural discipline, Getzy crafts bespoke couture and limited-edition prêt-à-porter for the discerning collector. Every garment balances severe structural lines with fluid luxury.
            </p>
            <div className="pt-2">
              <span className="text-xs tracking-widest uppercase text-white block mb-1">
                Private Atelier Inquiries
              </span>
              <button
                onClick={() => {
                  setCurrentView('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs uppercase tracking-wider text-[#b4c5ff] underline underline-offset-4 hover:text-white transition-colors"
              >
                Book a Private Consultation →
              </button>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#dce2f5] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8d90a0]">
              <li 
                onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Autumn / Winter Nocturne
              </li>
              <li 
                onClick={() => { setCurrentView('men'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Bespoke Suiting
              </li>
              <li 
                onClick={() => { setCurrentView('pdp'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Cashmere &amp; Silk Knitwear
              </li>
              <li 
                onClick={() => showToast('Archival Leatherwear: Fall allocation open')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Archival Leatherwear
              </li>
              <li 
                onClick={() => showToast('Haute Joaillerie: By private appointment only')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Haute Joaillerie
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#dce2f5] font-semibold">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8d90a0]">
              <li 
                onClick={() => setIsConciergeOpen(true)}
                className="hover:text-white transition-colors cursor-pointer text-[#b4c5ff]"
              >
                VIP Bespoke Concierge
              </li>
              <li 
                onClick={() => showToast('Worldwide Shipping: Fully insured 48h express transit')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Worldwide Shipping &amp; Duties
              </li>
              <li 
                onClick={() => showToast('Garment Care: Lifetime complimentary cedar repressing at our salons')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Garment Care &amp; Restoration
              </li>
              <li 
                onClick={() => showToast('Returns: 30-Day effortless private vault courier returns')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Returns &amp; Atelier Exchanges
              </li>
              <li 
                onClick={() => showToast('Sustainability: 100% ethically combed Mongolian raw fibers')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Sustainability Commitment
              </li>
            </ul>
          </div>

          {/* The Nocturne Gazette */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#dce2f5] font-semibold">
              The Nocturne Gazette
            </h4>
            <p className="text-xs text-[#8d90a0] leading-relaxed">
              Receive private salon invitations, seasonal preview lookbooks, and private release dates.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#19202d] border border-[#2563eb]/40 text-xs text-[#b4c5ff]">
                ✓ Privileged subscription confirmed. Welcome to the Nocturne Circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your correspondence email"
                    className="w-full bg-[#141c29] border border-[#434655]/40 text-white px-3 py-2 text-xs focus:border-[#b4c5ff] focus:outline-none placeholder:text-[#8d90a0]"
                  />
                  <button
                    type="submit"
                    className="bg-[#2563eb] text-[#eeefff] px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#0053db] transition-colors font-medium whitespace-nowrap"
                  >
                    Join
                  </button>
                </div>
                <p className="text-[10px] text-[#8d90a0]">
                  Discreet correspondence. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Social Grid */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8d90a0]">
          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
            <span className="uppercase tracking-wider">© 2025 Getzy Atelier Ltd. All Rights Reserved.</span>
            <button onClick={() => showToast('Privacy Policy: End-to-end client confidentiality')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => showToast('Terms of Service: Prêt-à-Porter & Bespoke Couture protocols')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <button onClick={() => showToast('Ethical Sourcing: Traceable raw Mongolian cashmere & Biella spinning mills')} className="hover:text-white transition-colors">
              Ethical Sourcing
            </button>
          </div>

          <div className="flex items-center gap-4 text-[#c3c6d7]">
            <span 
              onClick={() => showToast('Milan Atelier: Via Montenapoleone 14')}
              className="material-symbols-outlined text-[18px] hover:text-white cursor-pointer"
              title="Global Salons"
            >
              public
            </span>
            <span 
              onClick={() => showToast('Campaign Imagery: Milanese architectural archives')}
              className="material-symbols-outlined text-[18px] hover:text-white cursor-pointer"
              title="Lookbook Archives"
            >
              photo_camera
            </span>
            <span 
              onClick={() => showToast('Archival Plates: Cryptographic verification on ledger')}
              className="material-symbols-outlined text-[18px] hover:text-white cursor-pointer"
              title="Edition Registry"
            >
              auto_stories
            </span>
            <span 
              onClick={() => setIsConciergeOpen(true)}
              className="material-symbols-outlined text-[18px] hover:text-white cursor-pointer"
              title="Private Concierge Mail"
            >
              mail
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
