import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Materials',
    question: 'How do I choose between PLA+, PETG, ABS, and Carbon-Fiber Nylon (PA-CF)?',
    answer: 'For early visual ergonomics and fit checks, PLA+ offers the highest rigidity and dimensional accuracy at lowest cost. For functional housings requiring snap-fits and moisture resistance, PETG is optimal. For outdoor, automotive, or high-temperature environments (up to 98°C), choose ABS/ASA. For high-stress structural components (like robot arms or UAV mounts), our continuous chopped carbon-fiber nylon (PA-CF) withstands up to 155°C HDT with extreme impact toughness.',
  },
  {
    category: 'PCB Delivery',
    question: 'What files are required for PCB manufacturing and electrical review?',
    answer: 'We accept standard RS-274X Extended Gerber files, ODB++ archives, or native KiCad (.kicad_pcb) and Altium Designer project files. If you require assembly (PCBA), please include an IPC-compliant Bill of Materials (BOM) with manufacturer part numbers (MPNs) and Centroid Pick-and-Place (.xy / .cpl) placement files. Our team conducts a full electrical rules check (ERC) before fabrication.',
  },
  {
    category: 'Rapid Turnaround',
    question: 'How fast can TRIKONA dispatch prototypes to my lab?',
    answer: 'Standard rapid 3D prototypes and single enclosure fabrications are dispatched within 24 to 48 hours of geometry confirmation. Multi-layer PCB routing and schematic turnarounds typically take 3 to 5 business days depending on layer complexity (2 to 8 layers). Express rush options with continuous machine allocation are available on request.',
  },
  {
    category: 'Logistics',
    question: 'Do you ship prototypes across Maharashtra and India?',
    answer: 'Yes! From our central engineering facility in Yeola / Nashik, Maharashtra, we provide overnight insured courier dispatch to Mumbai, Pune, Nashik, and Aurangabad, and 24–48 hour express air delivery to Bengaluru, Hyderabad, Delhi NCR, Chennai, and tier-1/tier-2 industrial clusters across India.',
  },
  {
    category: 'Confidentiality',
    question: 'How does TRIKONA protect our intellectual property (IP) and design files?',
    answer: 'We operate under a strict 100% Client IP Guarantee. We provide a pre-signed mutual Non-Disclosure Agreement (NDA) before any file transfer. Your CAD models, STEP files, and schematic netlists are stored on isolated, encrypted engineering workstations and are never shared or published without explicit written consent.',
  },
  {
    category: 'Orders & MOQ',
    question: 'What is your Minimum Order Quantity (MOQ)?',
    answer: 'Zero MOQ! Hardware startups and engineering innovators frequently need just 1 or 2 parts to prove a concept before committing capital. Whether you need a single 3D printed mechanical enclosure or a batch of 50 assembled circuit units, we accommodate your exact development stage.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Frequently Asked Questions
          </div>
          <h3 className="text-2xl font-bold text-white font-display">
            Hardware Engineering &amp; Prototyping FAQ
          </h3>
        </div>

        <a
          href="https://wa.me/919970113207?text=Hello%20TRIKONA%2C%20I%20have%20a%20specific%20hardware%20question%20regarding%20my%20prototype."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
          <span>Ask question on WhatsApp (+91 9970113207) &rarr;</span>
        </a>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border rounded-xl transition-all overflow-hidden ${
                isOpen
                  ? 'bg-slate-950 border-cyan-500/60 shadow-md'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                    {item.category}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {item.question}
                  </span>
                </div>
                <div className="p-1 rounded-md text-slate-400 hover:text-white shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/60">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
