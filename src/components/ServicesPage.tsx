import React, { useState, useEffect } from 'react';
import { Box, Cpu, Layers, CheckCircle2, ArrowRight, Shield, Download, FileText, Info, MessageCircle } from 'lucide-react';
import { SERVICE_ARTICLES } from '../data/initialData';
import { ClientReview } from '../types';
import { CadToleranceSimulator } from './CadToleranceSimulator';
import { PcbTraceCalculator } from './PcbTraceCalculator';
import { InfillMaterialMatrix } from './InfillMaterialMatrix';
import { ServiceReviewSection } from './ServiceReviewSection';

interface ServicesPageProps {
  initialService?: 'cad' | 'pcb' | '3d-printing';
  onNavigateToQuote: (servicePrefill?: 'cad' | 'pcb' | '3d-printing') => void;
  reviews: ClientReview[];
  onAddReview: (review: Omit<ClientReview, 'id' | 'date'>) => void;
  onDeleteReview?: (id: string) => void;
  isAdmin?: boolean;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  initialService = 'cad',
  onNavigateToQuote,
  reviews,
  onAddReview,
  onDeleteReview,
  isAdmin = false,
}) => {
  const [activeTab, setActiveTab] = useState<'cad' | 'pcb' | '3d-printing'>(initialService);

  useEffect(() => {
    if (initialService) {
      setActiveTab(initialService);
    }
  }, [initialService]);

  const currentArticle = SERVICE_ARTICLES[activeTab];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-left space-y-3 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
          Hardware Prototyping &amp; Engineering Disciplines
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
          Engineering Services &amp; In-Depth Articles
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Explore our parametric CAD enclosure architecture, multi-layer high-speed PCB routing guidelines, and functional additive manufacturing material specifications.
        </p>
      </div>

      {/* Interactive Tabs Header */}
      <div className="flex border-b border-slate-800 space-x-2 sm:space-x-8 overflow-x-auto pb-px">
        <button
          type="button"
          onClick={() => setActiveTab('cad')}
          className={`flex items-center gap-2.5 py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
            activeTab === 'cad'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>01. CAD &amp; 3D Modeling</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pcb')}
          className={`flex items-center gap-2.5 py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
            activeTab === 'pcb'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>02. PCB Design &amp; Schematics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('3d-printing')}
          className={`flex items-center gap-2.5 py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
            activeTab === '3d-printing'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>03. 3D Printing &amp; Prototyping</span>
        </button>
      </div>

      {/* Article Content Layout */}
      <div className="space-y-12">
        {/* Article Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-cyan-400">
              <span className="px-2.5 py-1 bg-cyan-950 border border-cyan-800/60 rounded">
                Turnaround: {currentArticle.turnaround}
              </span>
              <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">
                Tolerances: {currentArticle.tolerances}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {currentArticle.title}
            </h2>

            <p className="text-sm text-cyan-200/90 font-medium font-mono">
              {currentArticle.subtitle}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentArticle.shortDesc}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigateToQuote(activeTab)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
              >
                <span>Request {currentArticle.id.toUpperCase()} Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-xl bg-slate-950 relative group">
              <img
                src={currentArticle.image}
                alt={currentArticle.title}
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Deliverables Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Standard Project Engineering Deliverables</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentArticle.deliverables.map((item, index) => (
              <div key={index} className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive In-Depth Engineering Tool */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Interactive Workbench Tool
            </div>
            <span className="text-xs text-slate-400">Real-time parametric feedback</span>
          </div>

          {activeTab === 'cad' && <CadToleranceSimulator />}
          {activeTab === 'pcb' && <PcbTraceCalculator />}
          {activeTab === '3d-printing' && <InfillMaterialMatrix />}
        </section>

        {/* In-Depth Article Sections */}
        <div className="space-y-8">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-xl font-bold text-white font-display">
              Technical Principles &amp; Design-for-Manufacturability (DFM)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Deep-dive engineering specifications, thermal considerations, and assembly protocols
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {currentArticle.articleSections.map((sec, idx) => (
              <article key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-xs font-mono text-cyan-400">
                    SECTION {idx + 1}.0
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug">
                    {sec.heading}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sec.body}
                  </p>
                </div>

                {sec.keyPoints && sec.keyPoints.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase block">Engineered Constraints</span>
                    {sec.keyPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="text-cyan-400 font-bold font-mono">›</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Technical Specification Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
              {currentArticle.id.toUpperCase()} Engineering Capability Matrix
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Lab Calibrated Specs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-6">Engineering Parameter</th>
                  <th className="py-3 px-6">Specification / Tolerance</th>
                  <th className="py-3 px-6">Compliance &amp; Standards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {currentArticle.specTable.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-6 font-medium text-white">{row.parameter}</td>
                    <td className="py-3 px-6 font-mono text-cyan-300">{row.specification}</td>
                    <td className="py-3 px-6 font-mono text-slate-400">{row.standards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deliverables & Technical Scope Card (Informational — No automated quotes or e-commerce) */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5 text-cyan-400">
              <FileText className="w-5 h-5" />
              <h3 className="text-base font-bold text-white font-display">
                {currentArticle.title} — Digital Deliverables &amp; Scope
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Informational Studio · No Online Checkout</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {activeTab === 'pcb'
              ? 'Notice on PCB Scope: TRIKONA strictly provides schematic capture, high-speed multi-layer routing, impedance calculations, and standard RS-274X Gerber manufacturing packages. We DO NOT print, etch, or fabricate physical circuit boards. Clients take our verified digital package directly to their manufacturing vendor of choice.'
              : activeTab === 'cad'
              ? 'CAD Architecture Scope: We deliver fully constrained, native parametric 3D models (STEP AP242, Parasolid, IGES) and 2D engineering drawings with GD&T tolerancing for CNC machining or tooling release.'
              : '3D Prototyping Scope: We fabricate physical functional prototypes using industrial FDM equipment with engineering thermoplastics (PETG, PLA, PA-CF) and heat-set brass threaded inserts for physical testing.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">
              Ready to review your requirements with an engineer?
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigateToQuote(activeTab)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
              >
                Send Technical Inquiry
              </button>
              <a
                href={`https://wa.me/919970113207?text=${encodeURIComponent(
                  `Hello TRIKONA, I would like to consult with an engineer regarding your ${currentArticle.title} services.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-emerald-400 bg-emerald-950/80 hover:bg-emerald-950 border border-emerald-800/60 rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                <span>WhatsApp: 9970113207</span>
              </a>
            </div>
          </div>
        </section>

        {/* Dedicated Reviews & Submission Section for this specific Service */}
        <ServiceReviewSection
          serviceId={activeTab}
          serviceName={currentArticle.title}
          reviews={reviews}
          onAddReview={onAddReview}
          onDeleteReview={onDeleteReview}
          isAdmin={isAdmin}
        />

        {/* Bottom CTA */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-white">Have custom requirements or proprietary CAD files?</h4>
            <p className="text-xs text-slate-400 mt-1">Upload your STEP, STL, or Gerber archives for confidential engineering analysis.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToQuote(activeTab)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>Initiate Project Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
