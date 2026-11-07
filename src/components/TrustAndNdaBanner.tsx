import React, { useState } from 'react';
import { ShieldCheck, Lock, Award, MapPin, CheckCircle, MessageCircle, FileText, Scale, AlertTriangle } from 'lucide-react';
import { LegalDisclaimerModal } from './LegalDisclaimerModal';
import { TrikonaLogo } from './TrikonaLogo';

export const TrustAndNdaBanner: React.FC = () => {
  const [showLegalModal, setShowLegalModal] = useState(false);

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 relative overflow-hidden bg-blueprint-fine">
      <LegalDisclaimerModal isOpen={showLegalModal} onClose={() => setShowLegalModal(false)} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Intellectual Property & Disclaimers */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-mono text-cyan-400">
            <Lock className="w-3.5 h-3.5" />
            <span>Confidentiality &amp; Client IP Ownership</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">
            Client Intellectual Property Ownership &amp; Mutual NDA
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All 3D CAD files, proprietary schematics, and mechanical concepts remain exclusively your property. TRIKONA provides technical consulting and design services with bilateral confidentiality agreements.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase">Bilateral Mutual NDA</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Available for execution before exchanging proprietary STEP or circuit files.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase">PCB Scope Clarity</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  We strictly design PCB schematics and Gerbers — we do not print/fabricate boards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase">Pre-Dispatch Inspection</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Vernier checks and assembly fit inspection on physical 3D prints.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80">
              <Scale className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase">Limitation of Liability</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Informational &amp; advisory only. Final physical testing remains with the client.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Notice Box */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span>
              All deliverables provided &ldquo;AS-IS&rdquo; without express or implied warranties. Subject to jurisdiction of Nashik/Yeola courts.
            </span>
            <button
              type="button"
              onClick={() => setShowLegalModal(true)}
              className="text-cyan-400 hover:text-cyan-300 font-mono underline shrink-0 cursor-pointer text-xs"
            >
              Read Full Legal Terms &rarr;
            </button>
          </div>
        </div>

        {/* Right: Founder & Engineering Profile Card (Yeola / Nashik) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 text-left">
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <TrikonaLogo size="sm" showWordmark={false} accentColor="cyan" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-0.5">
                  Engineering Leadership
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  TRIKONA Hardware Lab
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Yeola, Nashik, Maharashtra, India</span>
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-1 rounded shrink-0">
              Active Studio
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Founded by dedicated mechatronics engineers, TRIKONA bridges the gap between digital CAD concepts and physically assembled, functional prototypes. We provide localized engineering support across Maharashtra, with express dispatch across India.
          </p>

          <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-500">Core Expertise:</span>
              <span className="text-slate-200">Mechatronics, DFM, PCB Layout</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Facility Location:</span>
              <span className="text-cyan-400">Yeola / Nashik (MH)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Direct Contact:</span>
              <span className="text-emerald-400 font-bold">+91 9970113207</span>
            </div>
          </div>

          <a
            href="https://wa.me/919970113207?text=Hello%20TRIKONA%2C%20I%20would%20like%20to%20request%20an%20NDA%20and%20discuss%20a%20hardware%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Chat Directly on WhatsApp (+91 9970113207)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
