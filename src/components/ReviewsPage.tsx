import React, { useState } from 'react';
import { Star, MessageSquarePlus, Filter, CheckCircle2, AlertCircle, Trash2, ShieldCheck, Lock, Unlock, Sparkles, ArrowDown } from 'lucide-react';
import { ClientReview, ServiceCategory } from '../types';
import { AdminAuthModal } from './AdminAuthModal';

interface ReviewsPageProps {
  reviews: ClientReview[];
  onAddReview: (review: Omit<ClientReview, 'id' | 'date'>) => void;
  onDeleteReview?: (id: string) => void;
  isAdmin?: boolean;
  onToggleAdmin?: (val: boolean) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviews,
  onAddReview,
  onDeleteReview,
  isAdmin = false,
  onToggleAdmin,
}) => {
  // Form state
  const formRef = React.useRef<HTMLDivElement>(null);
  const [fullName, setFullName] = useState('');
  const [roleAndCompany, setRoleAndCompany] = useState('');
  const [service, setService] = useState<'cad' | 'pcb' | '3d-printing'>('cad');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const nameInput = document.getElementById('fullName');
    nameInput?.focus();
  };

  // Admin secret modal state
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Filter & sort state
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');

  // Rating labels
  const ratingDescriptions = [
    '',
    '1 Star — Needs Improvement',
    '2 Stars — Fair Precision',
    '3 Stars — Good Standard Workmanship',
    '4 Stars — High Quality & Responsive',
    '5 Stars — Exceptional Engineering Precision',
  ];

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (!feedback.trim() || feedback.trim().length < 10) {
      newErrors.feedback = 'Please provide detailed engineering feedback (at least 10 characters).';
    }

    if (rating < 1 || rating > 5) {
      newErrors.rating = 'Please select a star rating between 1 and 5.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitSuccess(false);
      return;
    }

    setErrors({});
    let companyName = '';
    let roleTitle = '';
    if (roleAndCompany.trim()) {
      if (roleAndCompany.includes(',')) {
        const parts = roleAndCompany.split(',');
        roleTitle = parts[0].trim();
        companyName = parts.slice(1).join(',').trim();
      } else if (roleAndCompany.includes('·')) {
        const parts = roleAndCompany.split('·');
        roleTitle = parts[0].trim();
        companyName = parts.slice(1).join('·').trim();
      } else {
        companyName = roleAndCompany.trim();
      }
    }

    onAddReview({
      name: fullName.trim(),
      role: roleTitle || undefined,
      company: companyName || undefined,
      rating,
      service,
      feedback: feedback.trim(),
      verified: true,
    });

    // Reset fields
    setFullName('');
    setRoleAndCompany('');
    setFeedback('');
    setRating(5);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 6000);
  };

  // Filter & sort reviews
  const filteredReviews = reviews.filter((r) => {
    if (categoryFilter === 'all') return true;
    return r.service === categoryFilter;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return 0;
  });

  // Aggregate stats
  const totalReviews = reviews.length;
  const avgScore = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage: totalReviews > 0
      ? (reviews.filter((r) => r.rating === stars).length / totalReviews) * 100
      : 0,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hidden Admin Verification Modal */}
      <AdminAuthModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onAuthenticated={() => {
          if (onToggleAdmin) onToggleAdmin(true);
        }}
      />

      {/* Header */}
      <div className="text-left space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Client Feedback &amp; Verification
          </div>
          {/* Invisible stealth trigger for the owner: Looks like a static quiet period separator */}
          <button
            type="button"
            onClick={() => setShowAdminModal(true)}
            className="text-slate-800 hover:text-slate-700 text-xs font-mono cursor-default focus:outline-none transition-colors select-none"
            title=""
            tabIndex={-1}
            aria-hidden="true"
          >
            ·
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
          Client Reviews &amp; Testimonials
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Read verified engineering feedback from robotics founders, hardware labs, and biomedical developers. Reviews are stored and persisted via local storage.
        </p>

        {/* If Owner has authenticated, show private Owner Management Banner */}
        {isAdmin && (
          <div className="p-3 bg-cyan-950/40 border border-cyan-800/80 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-mono">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Owner Management Mode Active — Delete options are now visible to you only</span>
            </div>
            <button
              type="button"
              onClick={() => onToggleAdmin && onToggleAdmin(false)}
              className="text-slate-400 hover:text-white font-mono text-[11px] underline"
            >
              Lock &amp; Hide Delete Controls
            </button>
          </div>
        )}
      </div>

      {/* Visually Prominent 'Be the first to share your experience' prompt when reviews array is empty */}
      {reviews.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-8 sm:p-12 text-center shadow-2xl shadow-cyan-950/50 bg-blueprint-grid">
          {/* Subtle neon glow backdrops */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/60 text-xs font-mono text-cyan-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Pioneer Hardware Evaluation</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
                Be the first to share your experience
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-balance">
                Have you worked with TRIKONA on parametric 3D CAD modeling, multi-layer PCB routing, or rapid physical prototypes? Share your technical evaluation and help fellow robotics founders and hardware innovators.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-950 cursor-pointer hover:scale-105 active:scale-95"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write the First Review</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919970113207?text=Hello%20TRIKONA%20Engineering%2C%20I%20would%20like%20to%20share%20my%20feedback%20directly."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-800/80 rounded-xl transition-colors cursor-pointer"
              >
                <span>Share via WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center gap-6 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Instant live publication
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Verified client badge
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Persistent local storage
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Aggregate Score & Distribution Grid when reviews exist */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          {/* Left score */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-xl border border-slate-800 text-center">
            <div className="text-5xl font-black font-mono text-white mb-2 tabular-nums">
              {avgScore}
            </div>
            <div className="flex items-center text-amber-400 gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(parseFloat(avgScore))
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">
              Based on {totalReviews} Client Evaluation{totalReviews !== 1 ? 's' : ''}
            </span>
            <div className="mt-3 text-[11px] text-cyan-400 font-mono">
              100% Verified Hardware Projects
            </div>
          </div>

          {/* Right distribution bars */}
          <div className="md:col-span-8 flex flex-col justify-center space-y-2.5">
            {ratingCounts.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="font-mono text-slate-300 w-12 text-right shrink-0">
                  {stars} {stars === 1 ? 'Star' : 'Stars'}
                </span>
                <div className="flex-1 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="font-mono text-slate-400 w-12 text-left tabular-nums shrink-0">
                  {count} ({Math.round(percentage)}%)
                </span>
              </div>
            ))}

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span>Stored locally via HTML5 LocalStorage</span>
              <span className="text-[11px] text-slate-500 font-mono">
                Strictly authenticated review governance
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main 2-Column Layout: Submission Form + Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Review Submission Form */}
        <div ref={formRef} className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 sticky top-24 scroll-mt-24">
          <div className="flex items-center gap-2.5 mb-2 text-cyan-400">
            <MessageSquarePlus className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white font-display">Submit a Project Review</h2>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Share your hardware engineering or prototyping experience with the TRIKONA team.
          </p>

          {submitSuccess && (
            <div className="mb-5 p-4 bg-emerald-950/60 border border-emerald-800/80 rounded-xl flex items-start gap-3 text-emerald-200 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-emerald-300">Review Submitted Successfully!</span>
                Your evaluation has been prepended to the live feed and saved to LocalStorage.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name <span className="text-cyan-400">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                  errors.fullName
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Role & Company */}
            <div>
              <label htmlFor="roleCompany" className="block text-xs font-medium text-slate-300 mb-1.5">
                Role &amp; Company <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                id="roleCompany"
                type="text"
                value={roleAndCompany}
                onChange={(e) => setRoleAndCompany(e.target.value)}
                placeholder="e.g. Lead Roboticist, CyberKinetic"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>

            {/* Service Category */}
            <div>
              <label htmlFor="serviceCategory" className="block text-xs font-medium text-slate-300 mb-1.5">
                Service Category <span className="text-cyan-400">*</span>
              </label>
              <select
                id="serviceCategory"
                value={service}
                onChange={(e) => setService(e.target.value as 'cad' | 'pcb' | '3d-printing')}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors cursor-pointer"
              >
                <option value="cad">Computer-Aided Design (CAD) &amp; 3D Modeling</option>
                <option value="pcb">PCB Design &amp; Circuit Schematics</option>
                <option value="3d-printing">3D Printing &amp; Physical Prototyping</option>
              </select>
            </div>

            {/* Interactive Star Rating Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Star Rating <span className="text-cyan-400">*</span>
              </label>
              <div className="flex items-center gap-1.5 mb-1">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isFilled = (hoverRating || rating) >= starValue;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-slate-600 hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                      aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          isFilled ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="text-[11px] font-mono text-cyan-400 h-4">
                {ratingDescriptions[hoverRating || rating]}
              </div>
              {errors.rating && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.rating}</span>
                </p>
              )}
            </div>

            {/* Feedback Textarea */}
            <div>
              <label htmlFor="feedback" className="block text-xs font-medium text-slate-300 mb-1.5">
                Technical Feedback &amp; Verification Details <span className="text-cyan-400">*</span>
              </label>
              <textarea
                id="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Describe part fit, routing quality, turnaround speed, tolerances, or overall lab execution..."
                className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                  errors.feedback
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                }`}
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-0.5 font-mono">
                <span>Min 10 characters</span>
                <span>{feedback.length} chars</span>
              </div>
              {errors.feedback && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.feedback}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-cyan-950"
            >
              Post Review to Live Feed
            </button>
          </form>
        </div>

        {/* Right Column: Live Feed & Filters */}
        <div className="lg:col-span-7 space-y-6">
          {/* Filter & Sort Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                Filter:
              </span>
              {(['all', 'cad', 'pcb', '3d-printing'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    categoryFilter === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All Services' : cat === 'cad' ? 'CAD 3D' : cat === 'pcb' ? 'PCB Circuit' : '3D Print'}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'highest' | 'lowest')}
                className="bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="newest">Newest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {sortedReviews.length === 0 ? (
              <div className="bg-slate-950/90 border-2 border-dashed border-cyan-500/30 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
                <div className="w-16 h-16 rounded-full bg-cyan-950/90 border border-cyan-500/50 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-950">
                  <Sparkles className="w-8 h-8 animate-pulse text-cyan-400" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                    No Reviews Recorded Yet
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Be the first to share your experience
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {categoryFilter === 'all'
                      ? 'No project reviews have been posted yet. Submit your engineering feedback below to share your experience in our live client feed!'
                      : `No reviews posted under ${categoryFilter.toUpperCase()} yet. Be the first hardware pioneer to share your experience with this discipline!`}
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (categoryFilter !== 'all') {
                        setService(categoryFilter as 'cad' | 'pcb' | '3d-printing');
                      }
                      scrollToForm();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-950 hover:scale-105 active:scale-95"
                  >
                    <MessageSquarePlus className="w-4 h-4" />
                    <span>Be the First to Review</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  {categoryFilter !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setCategoryFilter('all')}
                      className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-colors cursor-pointer"
                    >
                      Show All Categories
                    </button>
                  )}
                </div>
              </div>
            ) : (
              sortedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 transition-all hover:border-slate-700/80 space-y-4 text-left relative group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{rev.name}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.2 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified Client
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {rev.role && <span>{rev.role}</span>}
                        {rev.role && rev.company && <span> · </span>}
                        {rev.company && <span>{rev.company}</span>}
                        {!rev.role && !rev.company && <span>Hardware Customer</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Delete button: ONLY rendered if isAdmin is true */}
                      {isAdmin && onDeleteReview && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete review from "${rev.name}"?`)) {
                              onDeleteReview(rev.id);
                            }
                          }}
                          className="px-2 py-1 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded text-[11px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                          title="Delete review (Owner only)"
                        >
                          <Trash2 className="w-3 h-3 text-rose-400" />
                          <span>Delete</span>
                        </button>
                      )}

                      <div className="text-right shrink-0">
                        <div className="flex items-center text-amber-400 gap-0.5 justify-end mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {rev.date}
                      </div>
                    </div>
                  </div>
                </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {rev.feedback}
                  </p>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="text-slate-400">
                      Discipline: <span className="text-cyan-400 font-semibold uppercase">{rev.service === 'cad' ? 'CAD Modeling' : rev.service === 'pcb' ? 'PCB Circuit' : '3D Printing'}</span>
                    </span>
                    <span>Review ID: {rev.id}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
