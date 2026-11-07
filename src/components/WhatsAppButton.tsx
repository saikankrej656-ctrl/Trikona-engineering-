import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink, ArrowRight } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '9970113207',
  defaultMessage = 'Hello TRIKONA Engineering, I would like to discuss a hardware engineering and prototyping project.',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const formattedNumber = `+91 ${phoneNumber}`;
  const encodedText = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodedText}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover preview box */}
      {isOpen && (
        <div className="mb-3 w-80 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-4 text-left animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <MessageCircle className="w-4 h-4 fill-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">TRIKONA Hardware Lab</div>
                <div className="text-[11px] font-mono text-emerald-400">{formattedNumber}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
              aria-label="Close WhatsApp chat preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-300 space-y-2">
            <p className="leading-relaxed">
              Connect directly with our engineering team on WhatsApp for fast turnarounds, CAD file questions, and custom prototyping inquiries.
            </p>
            <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px] text-slate-400 italic">
              &ldquo;{defaultMessage}&rdquo;
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950 cursor-pointer"
          >
            <span>Open WhatsApp Chat</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2.5">
        {!isOpen && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-full text-xs text-slate-200 shadow-lg pointer-events-none font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Chat on WhatsApp: <strong className="text-emerald-400">{phoneNumber}</strong>
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-950/60 hover:scale-105 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Chat with TRIKONA on WhatsApp at 9970113207"
          title="Chat on WhatsApp (+91 9970113207)"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <MessageCircle className="w-7 h-7 fill-slate-950 stroke-[1.5]" />
          )}
        </button>
      </div>
    </div>
  );
};
