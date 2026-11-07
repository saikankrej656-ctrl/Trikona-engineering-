import React, { useState } from 'react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { TrikonaLogo } from './TrikonaLogo';

interface NavbarProps {
  activeTab: 'home' | 'services' | 'portfolio' | 'templates' | 'reviews' | 'contact';
  serviceSubTab?: 'cad' | 'pcb' | '3d-printing';
  onNavigate: (tab: 'home' | 'services' | 'portfolio' | 'templates' | 'reviews' | 'contact', serviceSubTab?: 'cad' | 'pcb' | '3d-printing') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, serviceSubTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'services', label: 'Services & Tech' },
    { id: 'portfolio', label: 'Portfolio & 3D' },
    { id: 'templates', label: 'Templates & DFM' },
    { id: 'reviews', label: 'Client Reviews' },
    { id: 'contact', label: 'Contact & Inquiry' },
  ] as const;

  const handleNav = (tab: 'home' | 'services' | 'portfolio' | 'templates' | 'reviews' | 'contact', srv?: 'cad' | 'pcb' | '3d-printing') => {
    onNavigate(tab, srv);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md cursor-pointer group"
          >
            <TrikonaLogo size="sm" accentColor="cyan" />
          </button>

          {/* Zone 2: 4 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNav(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: WhatsApp + 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919970113207?text=Hello%20TRIKONA%20Engineering%2C%20I%20would%20like%20to%20discuss%20a%20hardware%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-800/60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Chat with TRIKONA on WhatsApp: 9970113207"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
              <span>WhatsApp: 9970113207</span>
            </a>

            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-950 cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-slate-900 text-cyan-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <a
              href="https://wa.me/919970113207?text=Hello%20TRIKONA%20Engineering%2C%20I%20would%20like%20to%20discuss%20a%20hardware%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400" />
              <span>WhatsApp: +91 9970113207</span>
            </a>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
