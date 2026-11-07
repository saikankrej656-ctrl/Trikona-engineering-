/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ServicesPage } from './components/ServicesPage';
import { PortfolioPage } from './components/PortfolioPage';
import { EngineeringTemplatesHub } from './components/EngineeringTemplatesHub';
import { ReviewsPage } from './components/ReviewsPage';
import { ContactPage } from './components/ContactPage';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ClientReview } from './types';
import { INITIAL_REVIEWS } from './data/initialData';
import { LegalDisclaimerModal } from './components/LegalDisclaimerModal';

const STORAGE_KEY = 'trikona_client_reviews_live';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'portfolio' | 'templates' | 'reviews' | 'contact'>('home');
  const [serviceSubTab, setServiceSubTab] = useState<'cad' | 'pcb' | '3d-printing'>('cad');
  const [quotePrefillService, setQuotePrefillService] = useState<'cad' | 'pcb' | '3d-printing' | undefined>(undefined);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);

  // Protected Owner Admin Mode: strictly false by default so ordinary users never see delete options
  const [isOwnerAdmin, setIsOwnerAdmin] = useState<boolean>(false);

  // Reviews State: starts with 0 reviews by default so visitors see "Be the first to share your experience"
  const [reviews, setReviews] = useState<ClientReview[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to load reviews from LocalStorage, falling back to initial data', err);
    }
    return INITIAL_REVIEWS; // Empty array []
  });

  // Save to LocalStorage whenever reviews change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (err) {
      console.error('Failed to save reviews to LocalStorage', err);
    }
  }, [reviews]);

  // Sync with browser hash route for multi-page feel & individual service pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const [path, query] = hash.split('?');

      if (path === 'cad' || path === 'services/cad') {
        setActiveTab('services');
        setServiceSubTab('cad');
      } else if (path === 'pcb' || path === 'services/pcb') {
        setActiveTab('services');
        setServiceSubTab('pcb');
      } else if (path === '3d-printing' || path === 'services/3d-printing') {
        setActiveTab('services');
        setServiceSubTab('3d-printing');
      } else if (path === 'services') {
        setActiveTab('services');
        if (query) {
          const params = new URLSearchParams(query);
          const tab = params.get('tab');
          if (tab === 'cad' || tab === 'pcb' || tab === '3d-printing') {
            setServiceSubTab(tab);
          }
        }
      } else if (path === 'portfolio') {
        setActiveTab('portfolio');
      } else if (path === 'templates' || path === 'dfm') {
        setActiveTab('templates');
      } else if (path === 'reviews') {
        setActiveTab('reviews');
      } else if (path === 'contact') {
        setActiveTab('contact');
      } else {
        setActiveTab('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (
    tab: 'home' | 'services' | 'portfolio' | 'templates' | 'reviews' | 'contact',
    serviceTab?: 'cad' | 'pcb' | '3d-printing'
  ) => {
    setActiveTab(tab);
    if (serviceTab) {
      setServiceSubTab(serviceTab);
    }
    // Update window hash
    if (tab === 'home') {
      window.location.hash = '#/';
    } else if (tab === 'services') {
      window.location.hash = serviceTab ? `#/services?tab=${serviceTab}` : '#/services';
    } else if (tab === 'portfolio') {
      window.location.hash = '#/portfolio';
    } else if (tab === 'templates') {
      window.location.hash = '#/templates';
    } else if (tab === 'reviews') {
      window.location.hash = '#/reviews';
    } else if (tab === 'contact') {
      window.location.hash = '#/contact';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToQuote = (servicePrefill?: 'cad' | 'pcb' | '3d-printing') => {
    setQuotePrefillService(servicePrefill);
    navigateTo('contact');
  };

  const handleAddReview = (newReviewData: Omit<ClientReview, 'id' | 'date'>) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date());

    const createdReview: ClientReview = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: formattedDate,
      verified: true,
    };

    // Prepend to reviews
    setReviews((prev) => [createdReview, ...prev]);
  };

  const handleDeleteReview = (id: string) => {
    // Only executed when owner confirms
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleClearReviews = () => {
    setReviews([]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation bar following Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        serviceSubTab={serviceSubTab}
        onNavigate={(tab, srv) => navigateTo(tab, srv)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={(tab, srv) => navigateTo(tab, srv)}
            reviews={reviews}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            initialService={serviceSubTab}
            onNavigateToQuote={handleNavigateToQuote}
            reviews={reviews}
            onAddReview={handleAddReview}
            onDeleteReview={handleDeleteReview}
            isAdmin={isOwnerAdmin}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioPage onNavigateToQuote={handleNavigateToQuote} />
        )}

        {activeTab === 'templates' && (
          <EngineeringTemplatesHub />
        )}

        {activeTab === 'reviews' && (
          <ReviewsPage
            reviews={reviews}
            onAddReview={handleAddReview}
            onDeleteReview={handleDeleteReview}
            isAdmin={isOwnerAdmin}
            onToggleAdmin={setIsOwnerAdmin}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage initialServicePrefill={quotePrefillService} />
        )}
      </main>

      {/* Engineering Footer */}
      <Footer
        onNavigate={(tab) => navigateTo(tab)}
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
      />

      {/* Global Legal & Non-Warranty Disclaimer Modal */}
      <LegalDisclaimerModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />

      {/* WhatsApp Quick Chat Launcher for TRIKONA (+91 9970113207) */}
      <WhatsAppButton phoneNumber="9970113207" />
    </div>
  );
}
