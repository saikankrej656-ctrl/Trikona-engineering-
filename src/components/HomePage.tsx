import { ArrowRight, Star, Cpu, Layers, Box, CheckCircle2, ShieldCheck, Clock, Zap, MessageCircle, FileText, Sparkles, Sliders, Workflow, Info } from 'lucide-react';
import { ClientReview } from '../types';
import { TrustAndNdaBanner } from './TrustAndNdaBanner';
import { FaqAccordion } from './FaqAccordion';
import { TrikonaLogo } from './TrikonaLogo';

interface HomePageProps {
  onNavigate: (tab: 'home' | 'services' | 'portfolio' | 'templates' | 'reviews' | 'contact', serviceTab?: 'cad' | 'pcb' | '3d-printing') => void;
  reviews: ClientReview[];
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, reviews }) => {
  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const recentReviews = reviews.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 lg:pt-24 overflow-hidden">
        {/* Subtle background technical grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <img
                  src="/assets/aistudio/image_dedce842.png"
                  alt="TRIKONA Logo"
                  className="h-10 w-auto object-contain rounded-lg border border-cyan-500/30 bg-slate-900/90 p-1 shadow-lg shadow-cyan-950/40"
                />
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span className="font-mono text-cyan-300">Informational Hardware Engineering Studio</span>
                  <span className="text-slate-500">·</span>
                  <span>Yeola &amp; Nashik</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display text-balance">
                TRIKONA — Engineering, Circuitry &amp; Prototyping
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-balance">
                We engineer production-ready parametric 3D CAD models, high-speed multi-layer PCB circuit designs, and physical additive prototypes. 
                <span className="block mt-2 text-xs font-mono text-cyan-300/90 bg-cyan-950/40 p-2 rounded-lg border border-cyan-800/40">
                  Notice: We strictly design PCBs and generate manufacturing Gerber packages — we do not print/fabricate physical circuit boards in-house. This is an informational portfolio website (no e-commerce or automated quotes).
                </span>
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-lg shadow-cyan-950/50 cursor-pointer"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/919970113207?text=Hello%20TRIKONA%20Engineering%2C%20I%20would%20like%20to%20discuss%20a%20hardware%20prototyping%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-800/80 rounded-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-400" />
                  <span>WhatsApp (+91 9970113207)</span>
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('portfolio')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-all cursor-pointer"
                >
                  <span>3D Model Inspector &rarr;</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>100% Client IP Guarantee &amp; NDA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>24–48h Rapid Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Zero Minimum Order Quantity (MOQ)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_hardware_lab_1794039333968.jpg"
                  alt="TRIKONA Rapid Hardware Prototyping Laboratory"
                  className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Floating telemetry label */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Central Engineering Testbench</div>
                    <div className="text-[11px] text-slate-400 font-mono">Yeola / Nashik Prototype Facility</div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800/50">
                    LAB ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Stats / Mission Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 sm:p-10 relative overflow-hidden bg-blueprint-fine">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 text-left">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                ±0.02 <span className="text-cyan-400 text-lg">mm</span>
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-300 font-mono">
                CAD Tolerancing
              </div>
              <p className="text-xs text-slate-400 pt-1">
                Precision interference stack-ups and GD&amp;T validation.
              </p>
            </div>

            <div className="space-y-1 pt-6 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                4 – 8 <span className="text-cyan-400 text-lg">Layers</span>
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-300 font-mono">
                PCB Stackup
              </div>
              <p className="text-xs text-slate-400 pt-1">
                Controlled 50Ω / 90Ω differential high-speed routing.
              </p>
            </div>

            <div className="space-y-1 pt-6 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                24 – 48 <span className="text-cyan-400 text-lg">Hrs</span>
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-300 font-mono">
                Rapid Fabrication
              </div>
              <p className="text-xs text-slate-400 pt-1">
                Industrial additive prototypes in PLA, PETG, and PA-CF.
              </p>
            </div>

            <div className="space-y-1 pt-6 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                140+ <span className="text-cyan-400 text-lg">Units</span>
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-300 font-mono">
                Hardware Assemblies
              </div>
              <p className="text-xs text-slate-400 pt-1">
                Field-tested functional prototypes delivered across biotech and robotics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Design & Collaboration Protocol (Informational — No automated quotes or e-commerce) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 sm:p-10 space-y-8 text-left relative overflow-hidden bg-blueprint-fine">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                <Workflow className="w-4 h-4" />
                <span>How We Collaborate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Engineering Design &amp; Handoff Workflow
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 shrink-0">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Consultation Based · No E-Commerce / Instant Quotes</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 space-y-2.5">
              <div className="text-cyan-400 font-mono text-xs font-bold">STAGE 01</div>
              <h3 className="text-sm font-bold text-white font-display">Technical Consultation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We review your schematics, spatial dimensions, component datasheets, and physical constraints directly via WhatsApp or consultation form.
              </p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 space-y-2.5">
              <div className="text-cyan-400 font-mono text-xs font-bold">STAGE 02</div>
              <h3 className="text-sm font-bold text-white font-display">CAD &amp; PCB Schematic Design</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Parametric 3D solid modeling and multi-layer PCB routing with impedance control. <strong className="text-slate-200 block mt-1">(PCB design &amp; routing only — we do not print physical circuit boards).</strong>
              </p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 space-y-2.5">
              <div className="text-cyan-400 font-mono text-xs font-bold">STAGE 03</div>
              <h3 className="text-sm font-bold text-white font-display">DFM Rule Verification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Systematic interference checks, trace clearance audits, and bill-of-materials validation to guarantee zero fab surprises.
              </p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 space-y-2.5">
              <div className="text-cyan-400 font-mono text-xs font-bold">STAGE 04</div>
              <h3 className="text-sm font-bold text-white font-display">Manufacturing Handoff &amp; 3D Prototyping</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Delivery of STEP AP242 files, RS-274X Gerbers, and physical functional 3D printed enclosure prototypes for assembly fit testing.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-slate-300">
              Have a hardware question or schematic review? Connect directly with lead engineering:
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
              >
                Send Technical Inquiry
              </button>
              <a
                href="https://wa.me/919970113207?text=Hello%20TRIKONA%2C%20I%20have%20an%20engineering%20question%20regarding%20a%20hardware%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-emerald-400 bg-emerald-950/80 hover:bg-emerald-950 border border-emerald-800/60 rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                <span>WhatsApp: 9970113207</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              Core Engineering Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Turnkey Hardware Engineering Services
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            From initial parametric CAD sketches to finished multi-layer circuitry and functional thermoplastic prototypes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: CAD & 3D Modeling */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group">
            <div className="relative h-48 overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/cad_modeling_showcase_1794039335549.jpg"
                alt="Parametric CAD Mechanical Modeling"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-cyan-400 border border-slate-700/50">
                DISCIPLINE 01
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-cyan-400">
                  <Box className="w-4 h-4" />
                  <span className="text-xs font-mono font-medium">Mechanical Architecture</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  CAD &amp; 3D Modeling
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Parametric solid modeling, structural enclosures, precision GD&amp;T tolerancing, snap-fit mechanics, and assembly fit testing.
                </p>

                <div className="space-y-1.5 text-xs text-slate-300 font-mono mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>ISO 2768-m Fit Stackups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>STEP AP242 &amp; Native Parasolid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Brass Fastener Boss Architecture</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('services', 'cad')}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-800 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Read In-Depth Technical Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: PCB Design & Schematics */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group">
            <div className="relative h-48 overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/pcb_circuit_showcase_1794039336507.jpg"
                alt="PCB Circuit Schematic and Layout"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-cyan-400 border border-slate-700/50">
                DISCIPLINE 02
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-cyan-400">
                  <Cpu className="w-4 h-4" />
                  <span className="text-xs font-mono font-medium">Circuitry &amp; Layout</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  PCB Design &amp; Schematics
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Multi-layer schematic capture, high-speed differential routing, controlled impedance stackups, and component footprinting.
                </p>

                <div className="space-y-1.5 text-xs text-slate-300 font-mono mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>IPC-2221 Current &amp; Trace Sizing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>50Ω / 90Ω Controlled Impedance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Extended RS-274X Gerber &amp; BOM</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('services', 'pcb')}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-800 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Read In-Depth Technical Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: 3D Printing & Prototyping */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group">
            <div className="relative h-48 overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/additive_proto_showcase_1794039335483.jpg"
                alt="Industrial 3D Printing Prototyping"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-cyan-400 border border-slate-700/50">
                DISCIPLINE 03
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-cyan-400">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs font-mono font-medium">Physical Fabrication</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  3D Printing &amp; Prototyping
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Functional rapid fabrication, high-performance thermoplastics (PLA/PETG/PA-CF), infill stress optimization, and assembly.
                </p>

                <div className="space-y-1.5 text-xs text-slate-300 font-mono mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Gyroid &amp; Honeycomb Core Infill</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>M2 – M4 Brass Thread Installation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>24h – 48h Lab Turnaround</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('services', '3d-printing')}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-800 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Read In-Depth Technical Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Highlight Banner: Engineering Templates & DFM Analyzer Hub */}
        <div className="mt-10 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-800/60 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <FileText className="w-4 h-4" />
              <span>Free Engineering Templates &amp; DFM Analyzer</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              CAD Enclosure Checklists, PCB DRC Rules &amp; Mutual NDA Generator
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Accelerate your engineering cycle with ready-to-use downloadable hardware templates, interactive DFM rule validation, and instant NDA sign-off.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('templates')}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-950 cursor-pointer shrink-0 hover:scale-105 active:scale-95"
          >
            <span>Explore Engineering Templates</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Client Trust, NDA & IP Protection Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustAndNdaBanner />
      </section>

      {/* Reviews Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-800 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-mono text-white font-bold text-lg">{reviews.length > 0 ? avgRating : '0.0'} / 5.0</span>
                <span className="text-xs text-slate-400">({reviews.length} Client Evaluations)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Field-Tested by Hardware Engineers
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('reviews')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 hover:bg-cyan-950 border border-cyan-800/60 rounded-lg transition-colors shrink-0 cursor-pointer"
            >
              <span>{reviews.length === 0 ? 'Be the First to Review' : 'View All Reviews & Submit Feedback'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-slate-950/80 border-2 border-dashed border-cyan-500/40 rounded-2xl p-8 sm:p-12 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-950">
                <Sparkles className="w-8 h-8 animate-pulse text-cyan-400" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                  Pioneer Hardware Evaluation
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Be the first to share your experience
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  No project reviews have been posted yet. Have you evaluated our CAD models, PCB layout, or 3D prints? Be the first to share your engineering evaluation!
                </p>
              </div>
              <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('reviews')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-950 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Write the First Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/919970113207?text=Hello%20TRIKONA%20Engineering%2C%20I%20would%20like%20to%20share%20my%20feedback%20for%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-emerald-400 bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-800/80 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-400" />
                  <span>Direct WhatsApp Review (9970113207)</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentReviews.map((rev) => (
                <div key={rev.id} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400 uppercase">
                        {rev.service === 'cad' ? 'CAD 3D' : rev.service === 'pcb' ? 'PCB Circuit' : '3D Print'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                      &ldquo;{rev.feedback}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60">
                    <div className="text-xs font-semibold text-white">{rev.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{rev.role || 'Hardware Founder'} {rev.company ? `· ${rev.company}` : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Technical FAQ Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqAccordion />
      </section>

      {/* Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-cyan-900/40 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display text-balance">
              Ready to Accelerate Your Physical Hardware Roadmap?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-balance">
              Reach out with your initial 3D assembly (.step/.stl) or PCB schematic requirements for a thorough engineering consultation and DFM feasibility review.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-lg shadow-cyan-950"
              >
                <span>Start Technical Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919970113207?text=Hello%20TRIKONA%20Engineering%2C%20I%20would%20like%20to%20discuss%20a%20hardware%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-800/80 rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400" />
                <span>Chat on WhatsApp (+91 9970113207)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
