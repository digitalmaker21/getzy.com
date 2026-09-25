import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface Message {
  sender: 'concierge' | 'client';
  text: string;
  time: string;
}

export const VipConciergeModal: React.FC = () => {
  const { isConciergeOpen, setIsConciergeOpen, setCurrentView } = useCart();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'concierge',
      text: "Buonasera, Lady Eleanor. I am Maestro Vittorio, Head of Client Relations at our Via Montenapoleone atelier. How may I assist your autumn silhouette acquisitions today?",
      time: '18:42'
    }
  ]);

  if (!isConciergeOpen) return null;

  const quickPrompts = [
    "What size do you recommend for The Grand Nocturne?",
    "Book a private evening salon viewing in Milan",
    "Tell me about the 14.5µm Mongolian cashmere weave",
    "Can you embroider my initials in gold ingot thread?"
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: Message = {
      sender: 'client',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Concierge intelligent response
    setTimeout(() => {
      let reply = "Our master tailors in Milan ensure complete archival precision. We would be delighted to reserve an allocation or prepare a private fitting session.";
      const lower = userText.toLowerCase();

      if (lower.includes('size') || lower.includes('fit') || lower.includes('grand nocturne')) {
        reply = "For The Grand Nocturne Overcoat, our silhouette features an architectural razor-cut shoulder with gentle fluid drape. If you typically wear a 40 IT in tailored evening jackets, we recommend Size 42 IT for effortless layering over wool blazers.";
      } else if (lower.includes('milan') || lower.includes('viewing') || lower.includes('salon') || lower.includes('book')) {
        reply = "We have private salon appointments available at Via Montenapoleone 14 this Thursday and Friday at 11:00 AM or 05:00 PM (Evening Salon with Dom Pérignon). Would you like me to reserve your chauffeured private arrival?";
      } else if (lower.includes('cashmere') || lower.includes('fabric') || lower.includes('weave') || lower.includes('mongolian')) {
        reply = "Our raw cashmere is combed exclusively in early spring from high-plateau Mongolian herds at an extraordinary 14.5-micron fineness. It is spun in Biella into double-faced cloth that our sarti split by 4mm along every perimeter for invisible blind-stitched seams.";
      } else if (lower.includes('monogram') || lower.includes('initials') || lower.includes('gold')) {
        reply = "Absolutamente. We hand-embroider up to 3 initials using pure gold-thread ingot wire on the interior breast pocket facing, completely complimentary on all Nocturne limited archival editions.";
      }

      const botReply: Message = {
        sender: 'concierge',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070e1b]/80 backdrop-blur-xl p-4 animate-in fade-in duration-200">
      <div className="bg-[#141c29] border border-[#434655]/40 w-full max-w-lg shadow-2xl flex flex-col h-[580px] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#19202d] border-b border-[#434655]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-serif text-lg font-bold">
                V
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#19202d] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base text-white font-medium">Maestro Vittorio</h3>
                <span className="text-[10px] bg-[#2563eb]/20 text-[#b4c5ff] px-1.5 py-0.5 font-mono uppercase">
                  Encrypted
                </span>
              </div>
              <p className="text-[11px] text-[#8d90a0]">Senior Atelier Concierge • Milan Flagship</p>
            </div>
          </div>
          <button
            onClick={() => setIsConciergeOpen(false)}
            className="text-[#8d90a0] hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0c1321]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${m.sender === 'client' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                  m.sender === 'client'
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-[#19202d] text-[#dce2f5] border border-[#434655]/40'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-[#8d90a0] mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="px-3 py-2 bg-[#141c29] border-t border-[#434655]/20 flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="flex-shrink-0 text-[11px] bg-[#19202d] hover:bg-[#232a38] text-[#c3c6d7] hover:text-white px-2.5 py-1 border border-[#434655]/40 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-3 bg-[#19202d] border-t border-[#434655]/30 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Direct inquiry for Maestro Vittorio..."
            className="flex-1 bg-[#0c1321] border border-[#434655]/40 px-3 py-2 text-xs text-white placeholder:text-[#8d90a0] focus:border-[#b4c5ff] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#2563eb] hover:bg-[#0053db] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </form>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#0c1321] border-t border-[#434655]/20 flex items-center justify-between text-[11px]">
          <span className="text-[#8d90a0]">Chauffeured Transit Service Available</span>
          <button
            onClick={() => {
              setIsConciergeOpen(false);
              setCurrentView('appointment');
            }}
            className="text-[#b4c5ff] hover:underline"
          >
            Open Viewing Scheduler →
          </button>
        </div>
      </div>
    </div>
  );
};
