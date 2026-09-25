import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const AppointmentView: React.FC = () => {
  const { setCurrentView, showToast, setIsConciergeOpen } = useCart();

  const [salon, setSalon] = useState<'milan' | 'paris' | 'ny' | 'london' | 'tokyo'>('milan');
  const [date, setDate] = useState('2025-11-20');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [service, setService] = useState('Nocturne Capsule Private Viewing & Master Fitting');
  const [clientName, setClientName] = useState('Lady Eleanor Vance');
  const [contact, setContact] = useState('eleanor.vance@nocturnecouture.ch');
  const [beverage, setBeverage] = useState('Vintage Dom Pérignon Champagne');
  const [submitted, setSubmitted] = useState(false);

  const salonData = {
    milan: {
      name: 'Milan Flagship Atelier',
      address: 'Via Montenapoleone 14, Palazzo Sola Cabiati',
      tailor: 'Maestro Vittorio Bellini',
      city: 'Milano, Italy'
    },
    paris: {
      name: 'Paris Haute Joaillerie Suite',
      address: 'Place Vendôme 8',
      tailor: 'Maître Henri Laurent',
      city: 'Paris, France'
    },
    ny: {
      name: 'New York Madison Penthouse',
      address: 'Madison Avenue 680, Upper East Side',
      tailor: 'Master Tailor Julian Vance',
      city: 'New York, USA'
    },
    london: {
      name: 'Mayfair Private Suite',
      address: 'Mount Street 42, Mayfair',
      tailor: 'Master Bespoke Arthur Sterling',
      city: 'London, UK'
    },
    tokyo: {
      name: 'Ginza Private Salon',
      address: '6-Chome Ginza, Chuo City',
      tailor: 'Master Artisan Kenji Takahashi',
      city: 'Tokyo, Japan'
    }
  };

  const currentSalon = salonData[salon];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(`Private salon fitting confirmed at ${currentSalon.name}`);
  };

  return (
    <div className="flex flex-col w-full bg-[#0c1321] min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8d90a0]">
          <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">
            Atelier
          </button>
          <span>/</span>
          <span className="text-white">Private Salon Viewing &amp; Bespoke Fitting</span>
        </div>

        {/* Header */}
        <div className="space-y-2 border-b border-[#434655]/30 pb-6">
          <span className="text-xs uppercase tracking-widest text-[#b4c5ff] font-semibold">
            Private Client Salons
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">
            Schedule a Private Atelier Viewing
          </h1>
          <p className="text-sm text-[#c1c7cf] max-w-2xl leading-relaxed">
            Experience the architectural Nocturne collection with undivided attention from our Master Tailor. Each private 90-minute consultation includes bespoke body mapping, fabric tactile review, and private salon hospitality.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#141c29] border border-[#2563eb]/50 p-8 md:p-12 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#2563eb]/20 text-[#b4c5ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">event_available</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#b4c5ff] font-semibold">
                Salon Itinerary Confirmed
              </span>
              <h2 className="font-serif text-3xl text-white">
                We Await Your Arrival, {clientName}
              </h2>
            </div>
            <div className="bg-[#0c1321] border border-[#434655]/30 p-6 max-w-md mx-auto text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-[#8d90a0]">Destination:</span>
                <span className="text-white font-medium">{currentSalon.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d90a0]">Address:</span>
                <span className="text-white">{currentSalon.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d90a0]">Date &amp; Time:</span>
                <span className="text-[#b4c5ff] font-semibold">{date} at {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d90a0]">Master Sarto:</span>
                <span className="text-white">{currentSalon.tailor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d90a0]">Private Hospitality:</span>
                <span className="text-[#a4c9ff]">{beverage}</span>
              </div>
            </div>
            <p className="text-xs text-[#8d90a0] max-w-sm mx-auto">
              Chauffeured transportation details have been dispatched to your correspondence email.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setCurrentView('home')}
                className="bg-[#2563eb] text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold"
              >
                Return to Collection
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#19202d] text-[#c3c6d7] px-6 py-2.5 text-xs uppercase tracking-wider border border-[#434655]/40"
              >
                Reschedule
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#141c29] border border-[#434655]/40 p-6 md:p-8 space-y-6 shadow-2xl">
            {/* Salon Destination Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest text-[#a4c9ff] font-semibold block">
                1. Select Flagship Atelier Destination
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSalon('milan')}
                  className={`p-4 text-left border transition-all ${
                    salon === 'milan'
                      ? 'bg-[#19202d] border-[#b4c5ff]'
                      : 'bg-[#0c1321] border-[#434655]/30 hover:bg-[#19202d]'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider text-[#b4c5ff] font-bold block">
                    Milan Flagship
                  </span>
                  <span className="font-serif text-sm text-white block mt-0.5">Via Montenapoleone 14</span>
                  <span className="text-[11px] text-[#8d90a0] mt-1 block">Maestro Vittorio Bellini</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSalon('paris')}
                  className={`p-4 text-left border transition-all ${
                    salon === 'paris'
                      ? 'bg-[#19202d] border-[#b4c5ff]'
                      : 'bg-[#0c1321] border-[#434655]/30 hover:bg-[#19202d]'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider text-[#b4c5ff] font-bold block">
                    Paris Atelier
                  </span>
                  <span className="font-serif text-sm text-white block mt-0.5">Place Vendôme 8</span>
                  <span className="text-[11px] text-[#8d90a0] mt-1 block">Maître Henri Laurent</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSalon('ny')}
                  className={`p-4 text-left border transition-all ${
                    salon === 'ny'
                      ? 'bg-[#19202d] border-[#b4c5ff]'
                      : 'bg-[#0c1321] border-[#434655]/30 hover:bg-[#19202d]'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider text-[#b4c5ff] font-bold block">
                    New York Penthouse
                  </span>
                  <span className="font-serif text-sm text-white block mt-0.5">Madison Avenue 680</span>
                  <span className="text-[11px] text-[#8d90a0] mt-1 block">Master Julian Vance</span>
                </button>
              </div>
            </div>

            {/* Date, Time & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#c3c6d7] block mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#0c1321] text-white px-3 py-2 text-xs border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#c3c6d7] block mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#0c1321] text-white px-3 py-2 text-xs border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                >
                  <option>10:00 AM CET</option>
                  <option>11:30 AM CET</option>
                  <option>02:30 PM CET</option>
                  <option>04:00 PM CET</option>
                  <option>05:30 PM CET (Evening Salon)</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#c3c6d7] block mb-1">
                  Private Hospitality
                </label>
                <select
                  value={beverage}
                  onChange={(e) => setBeverage(e.target.value)}
                  className="w-full bg-[#0c1321] text-white px-3 py-2 text-xs border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                >
                  <option>Vintage Dom Pérignon Champagne</option>
                  <option>Barolo Riserva &amp; Truffle Amuse-Bouche</option>
                  <option>Single-Origin Illy Espresso &amp; Biscotti</option>
                  <option>San Pellegrino Sparkling Mineral</option>
                </select>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#c3c6d7] block mb-1">
                  Patron / Client Name
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#0c1321] text-white px-3 py-2 text-xs border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#c3c6d7] block mb-1">
                  Private Registry Email or Telephone
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-[#0c1321] text-white px-3 py-2 text-xs border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
                />
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#c3c6d7] block mb-1">
                Specific Pieces or Sizing Requirements to Prepare in Advance
              </label>
              <textarea
                rows={2}
                defaultValue="Please prepare The Grand Nocturne Overcoat in Size 40 & 42, and the Sovereign Trench in Sapphire Wool."
                className="w-full bg-[#0c1321] text-white p-3 text-xs border border-[#434655]/40 focus:border-[#b4c5ff] focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-[#0053db] text-white py-3.5 text-xs uppercase tracking-widest font-semibold transition-all shadow-xl active:scale-[0.99]"
            >
              Confirm Private Atelier Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
