import React from 'react';
import { ShieldAlert, X, CheckCircle, Scale, AlertTriangle, FileText } from 'lucide-react';

interface LegalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalDisclaimerModal: React.FC<LegalDisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close legal terms modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded-xl">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-display">
              Terms of Informational Use &amp; Limitation of Liability
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              TRIKONA Engineering &amp; Prototyping · Effective 2026
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-cyan-300 font-mono uppercase text-[11px] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              1. Informational &amp; Advisory Nature Only
            </h3>
            <p>
              This website and all associated engineering materials, CAD files, articles, templates, calculators, and communications are provided strictly for general informational, educational, and advisory purposes. This website is not an e-commerce platform and does not offer instant quotes, online checkout, or binding price contracts.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-cyan-300 font-mono uppercase text-[11px] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              2. PCB Scope Limitation (Design Only — No Physical Board Printing)
            </h3>
            <p>
              TRIKONA strictly provides printed circuit board (PCB) schematic drafting, netlist creation, and digital Gerber RS-274X export packages. TRIKONA does not print, etch, fabricate, or manufacture physical PCB boards. Physical board production is solely the responsibility of third-party fabrication houses selected and contracted by the client.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-cyan-300 font-mono uppercase text-[11px] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              3. No Warranties &amp; "AS-IS" Engineering Deliverables
            </h3>
            <p>
              All engineering designs, 3D CAD models, PCB schematics, and prototype evaluations are provided on an &ldquo;AS-IS&rdquo; and &ldquo;AS-AVAILABLE&rdquo; basis without warranties of any kind, whether express, statutory, or implied. TRIKONA expressly disclaims all implied warranties of merchantability, fitness for a particular purpose, operational safety, or non-infringement. We make no promises or guarantees regarding production yields, commercial success, or patentability.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-cyan-300 font-mono uppercase text-[11px] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              4. Client Testing &amp; Regulatory Responsibility
            </h3>
            <p>
              The client acknowledges and agrees that hardware prototypes are experimental in nature. The client is solely and exclusively responsible for conducting independent mechanical stress analysis, thermal testing, electrical isolation verification, and obtaining all mandatory statutory certifications (including CE, FCC, RoHS, UL, BIS, or medical approvals) prior to any mass manufacturing, distribution, or commercial deployment.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-cyan-300 font-mono uppercase text-[11px] flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              5. Comprehensive Limitation of Liability &amp; Hold Harmless
            </h3>
            <p>
              To the fullest extent permitted by applicable law, neither TRIKONA, its founder (Sai Kankrej), engineers, contractors, nor affiliates shall be liable to the client or any third party for any direct, indirect, incidental, consequential, special, exemplary, or punitive damages (including but not limited to loss of profits, machine downtime, electrical fire, personal injury, structural failure, or regulatory fines) arising from or relating to the use of any CAD models, PCB designs, or 3D prototypes. The client agrees to indemnify and hold harmless TRIKONA from any and all claims or judicial actions.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-cyan-300 font-mono uppercase text-[11px]">
              6. Governing Law &amp; Exclusive Jurisdiction
            </h3>
            <p>
              Any disputes, claims, or controversies shall be governed exclusively by the laws of India. The parties irrevocably submit to the exclusive territorial jurisdiction of the competent civil courts in Nashik / Yeola, Maharashtra, India.
            </p>
          </div>
        </div>

        {/* Footer acknowledgment */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-slate-400 font-mono">
            By browsing or contacting TRIKONA, you acknowledge and agree to these terms.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
          >
            I Understand &amp; Agree
          </button>
        </div>
      </div>
    </div>
  );
};
