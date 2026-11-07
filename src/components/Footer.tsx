import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { TrikonaLogo } from './TrikonaLogo';

interface FooterProps {
  onNavigate: (tab: 'home' | 'services' | 'portfolio' | 'templates' | 'reviews' | 'contact') => void;
  onOpenLegalModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegalModal }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <TrikonaLogo size="sm" accentColor="cyan" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Rapid physical prototyping, parametric CAD modeling, and multi-layer circuit design engineering for hardware pioneers and robotics startups.
            </p>
            <div className="text-xs font-mono text-cyan-400/90 pt-1">
              Precision Hardware Studio · Yeola &amp; Nashik
            </div>
            <div className="text-[11px] text-amber-400/80 font-mono">
              Note: PCB services are design &amp; schematics only (no board printing/etching).
            </div>
          </div>

          {/* Core Services Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">Core Disciplines</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Parametric CAD &amp; Enclosures
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Multi-Layer PCB Layout &amp; Schematics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Rapid 3D Additive Fabrication
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('templates')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  DFM &amp; Tolerance Stack-Up Analysis
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Overview &amp; Mission
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Detailed Service Articles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Portfolio &amp; 3D Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('templates')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Engineering Templates &amp; DFM
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Client Testimonials &amp; Reviews
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Project Inquiry &amp; File Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Engineering Lab Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">Engineering Facility</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>TRIKONA Rapid Lab, Yeola / Nashik, Maharashtra 423401, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono">+91 9970113207</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/919970113207?text=Hello%20TRIKONA%20Engineering%2C%20I%20would%20like%20to%20discuss%20a%20hardware%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  WhatsApp: +91 9970113207
                </a>
              </div>
              <div className="text-[11px] text-slate-500 pt-1 font-mono">
                CAD Drop: STEP, IGES, STL, Gerber RS-274X
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-8 text-[11px] text-slate-400 space-y-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="font-mono uppercase text-slate-300 font-semibold tracking-wider text-[10px]">
              Legal Notice &amp; Scope Limitation
            </span>
            {onOpenLegalModal && (
              <button
                type="button"
                onClick={onOpenLegalModal}
                className="text-cyan-400 hover:text-cyan-300 font-mono underline cursor-pointer"
              >
                View Full Legal Terms &amp; Disclaimer &rarr;
              </button>
            )}
          </div>
          <p className="leading-relaxed">
            This website is strictly informational. TRIKONA does not operate an e-commerce platform and does not provide binding automated quotes or warranties. TRIKONA designs PCB schematics and Gerber files; we do NOT print, etch, or manufacture physical circuit boards. All engineering deliverables are supplied &ldquo;AS-IS&rdquo; without express or implied warranties. Clients retain full responsibility for independent testing and statutory certifications. Exclusive jurisdiction: Civil Courts of Nashik / Yeola, Maharashtra.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} TRIKONA Hardware Engineering. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {onOpenLegalModal && (
              <button
                type="button"
                onClick={onOpenLegalModal}
                className="hover:text-slate-300 transition-colors underline cursor-pointer"
              >
                Terms of Use &amp; Non-Warranty Disclaimer
              </button>
            )}
            <span>IPC-A-610 Reference</span>
            <span>ASME Y14.5 GD&amp;T</span>
          </div>
        </div>

        {/* Quiet footer tagline */}
        <div className="pt-3 text-center sm:text-right">
          <p className="text-[10px] text-slate-800/80 font-mono tracking-wide select-all">
            The articles, images, and pages do not represent the truth.
          </p>
        </div>
      </div>
    </footer>
  );
};
