import React, { useState, useRef } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, AlertCircle, Sparkles, Award, Trash2 } from 'lucide-react';
import { ClientReview } from '../types';

interface ServiceReviewSectionProps {
  serviceId: 'cad' | 'pcb' | '3d-printing';
  serviceName: string;
  reviews: ClientReview[];
  onAddReview: (review: Omit<ClientReview, 'id' | 'date'>) => void;
  onDeleteReview?: (id: string) => void;
  isAdmin?: boolean;
}

export const ServiceReviewSection: React.FC<ServiceReviewSectionProps> = ({
  serviceId,
  serviceName,
  reviews,
  onAddReview,
  onDeleteReview,
  isAdmin = false,
}) => {
  const formRef = useRef<HTMLDivElement>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [roleAndCompany, setRoleAndCompany] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filter reviews for this specific service
  const serviceReviews = reviews.filter((r) => r.service === serviceId);

  // Rating labels
  const ratingDescriptions = [
    '',
    '1 Star — Needs Improvement',
    '2 Stars — Fair Precision',
    '3 Stars — Good Standard Workmanship',
    '4 Stars — High Quality & Responsive',
    '5 Stars — Exceptional Engineering Precision',
  ];

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const nameInput = document.getElementById(`service-name-${serviceId}`);
    nameInput?.focus();
  };

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
      newErrors.rating = 'Please select a star rating.';
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
      service: serviceId,
      feedback: feedback.trim(),
      verified: true,
    });

    setFullName('');
    setRoleAndCompany('');
    setFeedback('');
    setRating(5);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 6000);
  };

  // Compute average for this service
  const avgServiceRating = serviceReviews.length > 0
    ? (serviceReviews.reduce((sum, r) => sum + r.rating, 0) / serviceReviews.length).toFixed(1)
    : null;

  return (
    <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 gap-4">
        <div className="text-left space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Dedicated Discipline Feedback
          </div>
          <h3 className="text-2xl font-bold text-white font-display">
            {serviceName} Client Reviews
          </h3>
          <p className="text-xs text-slate-400">
            Verified evaluations and technical performance notes from hardware clients who used our {serviceName} services.
          </p>
        </div>

        {avgServiceRating ? (
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 shrink-0">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(parseFloat(avgServiceRating))
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs font-mono text-white">
              <strong className="text-sm font-bold">{avgServiceRating}</strong> / 5.0 ({serviceReviews.length} {serviceReviews.length === 1 ? 'review' : 'reviews'})
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 hover:bg-cyan-950 border border-cyan-800/60 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Be the first to review</span>
          </button>
        )}
      </div>

      {/* 2-Column: Reviews Feed (or Empty State) + Dedicated Service Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Reviews Feed or Empty State */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {serviceName} Feed ({serviceReviews.length})
            </span>
          </div>

          {serviceReviews.length === 0 ? (
            /* EMPTY STATE: "No reviews yet. Be the first to write a review!" */
            <div className="bg-slate-950/80 border-2 border-dashed border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center mx-auto">
                <Star className="w-7 h-7 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white font-display">
                  No reviews yet.
                </h4>
                <p className="text-sm text-cyan-300 font-medium">
                  Be the first to write a review for {serviceName}!
                </p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed pt-1">
                  Have you evaluated our CAD models, PCB layout, or 3D prints? Share your feedback to help fellow hardware engineers.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-cyan-950"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>Write the First Review</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {serviceReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700/80 transition-colors text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{rev.name}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800/40 px-1.5 py-0.2 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified Client
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {rev.role && <span>{rev.role}</span>}
                        {rev.role && rev.company && <span> · </span>}
                        {rev.company && <span>{rev.company}</span>}
                        {!rev.role && !rev.company && <span>Hardware Customer</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Delete button: strictly rendered ONLY if owner has authenticated */}
                      {isAdmin && onDeleteReview && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete review from "${rev.name}"?`)) {
                              onDeleteReview(rev.id);
                            }
                          }}
                          className="px-2 py-1 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                          title="Delete review (Owner only)"
                        >
                          <Trash2 className="w-3 h-3 text-rose-400" />
                          <span>Delete</span>
                        </button>
                      )}

                      <div className="text-right shrink-0">
                        <div className="flex items-center text-amber-400 gap-0.5 justify-end mb-0.5">
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
                        <span className="text-[10px] font-mono text-slate-500">{rev.date}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    &ldquo;{rev.feedback}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Discipline: <strong className="text-cyan-400 uppercase">{serviceName}</strong></span>
                    <span>Ref: {rev.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Dedicated Place to Write Review for THIS Service */}
        <div ref={formRef} className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 text-left">
          <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
            <MessageSquarePlus className="w-5 h-5" />
            <h4 className="text-base font-bold text-white font-display">
              Review {serviceName}
            </h4>
          </div>
          <p className="text-xs text-slate-400 mb-5">
            Submit your feedback specifically for this discipline. Stored locally via LocalStorage.
          </p>

          {submitSuccess && (
            <div className="mb-4 p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl flex items-start gap-2.5 text-emerald-200 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-emerald-300">Review Published!</span>
                Your feedback has been added to {serviceName} and stored.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Locked Service Indicator */}
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Selected Service:</span>
              <span className="text-cyan-400 font-mono font-semibold uppercase">{serviceName}</span>
            </div>

            {/* Name */}
            <div>
              <label htmlFor={`service-name-${serviceId}`} className="block text-xs font-medium text-slate-300 mb-1">
                Your Name <span className="text-cyan-400">*</span>
              </label>
              <input
                id={`service-name-${serviceId}`}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Liam Zhang"
                className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                  errors.fullName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                }`}
              />
              {errors.fullName && <p className="text-[11px] text-rose-400 mt-0.5">{errors.fullName}</p>}
            </div>

            {/* Role / Org */}
            <div>
              <label htmlFor={`service-role-${serviceId}`} className="block text-xs font-medium text-slate-300 mb-1">
                Role &amp; Company <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                id={`service-role-${serviceId}`}
                type="text"
                value={roleAndCompany}
                onChange={(e) => setRoleAndCompany(e.target.value)}
                placeholder="e.g. Lead Mechanical Engineer, Stride Aero"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Star Rating <span className="text-cyan-400">*</span>
              </label>
              <div className="flex items-center gap-1 mb-1">
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
                    >
                      <Star
                        className={`w-5 h-5 transition-colors ${
                          isFilled ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="text-[10px] font-mono text-cyan-400 h-3.5">
                {ratingDescriptions[hoverRating || rating]}
              </div>
              {errors.rating && <p className="text-[11px] text-rose-400 mt-0.5">{errors.rating}</p>}
            </div>

            {/* Feedback */}
            <div>
              <label htmlFor={`service-feedback-${serviceId}`} className="block text-xs font-medium text-slate-300 mb-1">
                Feedback for {serviceName} <span className="text-cyan-400">*</span>
              </label>
              <textarea
                id={`service-feedback-${serviceId}`}
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={`How did our ${serviceName} deliverables perform in testing, assembly, or fabrication?`}
                className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                  errors.feedback ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                }`}
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>Min 10 characters</span>
                <span>{feedback.length} chars</span>
              </div>
              {errors.feedback && <p className="text-[11px] text-rose-400 mt-0.5">{errors.feedback}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-cyan-950"
            >
              Publish {serviceName} Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
