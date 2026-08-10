import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, Building2, GraduationCap, Users } from 'lucide-react';
import { getSuccessReviewsByType } from '../data/collegeData';
import type { SuccessReview, SuccessReviewType } from '../types';

const PREVIEW_LENGTH = 160;

const TABS: { id: SuccessReviewType; label: string; emoji: string; icon: typeof Users }[] = [
  { id: 'parent', label: 'Parents', emoji: '👨‍👩‍👧', icon: Users },
  { id: 'student', label: 'Students', emoji: '🎓', icon: GraduationCap },
];

const ReviewCard: React.FC<{ review: SuccessReview }> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.review.length > PREVIEW_LENGTH;
  const displayText =
    !isLong || expanded ? review.review : `${review.review.slice(0, PREVIEW_LENGTH).trim()}…`;

  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full relative group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="bg-blue-50 text-[#0B3C91] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-blue-100">
          {review.type === 'parent' ? 'Parent' : 'Student'}
          {review.course ? ` · ${review.course}` : ''}
        </span>

        {typeof review.rating === 'number' && review.rating > 0 && (
          <div className="flex items-center text-[#FBBF24] shrink-0" aria-label={`${review.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < review.rating! ? 'fill-[#FBBF24]' : 'fill-transparent text-slate-300'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative mb-3 flex-1">
        <Quote className="w-6 h-6 text-blue-200/70 absolute -top-1 -left-1" aria-hidden="true" />
        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed pt-2 pl-2">
          &ldquo;{displayText}&rdquo;
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 ml-2 text-[11px] sm:text-xs font-bold text-[#0B3C91] hover:text-[#F97316] transition-colors cursor-pointer"
          >
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center gap-3 mt-auto">
        {review.photo ? (
          <img
            src={review.photo}
            alt={review.name}
            className="w-11 h-11 rounded-xl object-cover border border-blue-200 shrink-0"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-[#0B3C91]/10 text-[#0B3C91] flex items-center justify-center shrink-0 font-bold text-sm">
            {review.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#0B3C91] leading-snug truncate">{review.name}</h3>
          {review.type === 'parent' && review.studentName && (
            <p className="text-[11px] text-slate-600 font-medium truncate">
              Parent of {review.studentName}
            </p>
          )}
          {review.campus && (
            <p className="text-[11px] text-slate-500 truncate">{review.campus}</p>
          )}
          {review.achievement && (
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
              <Building2 className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{review.achievement}</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export const SuccessStories: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SuccessReviewType>('parent');

  const reviews = useMemo(() => getSuccessReviewsByType(activeTab), [activeTab]);

  return (
    <section
      id="stories"
      className="py-12 sm:py-16 md:py-24 bg-[#EFF6FF] text-[#1E293B] scroll-mt-[5.5rem] sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="text-[#0B3C91] bg-blue-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
            Real Voices of Success
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B3C91] font-serif mt-3">
            Parent & Alumni Success Stories
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Hear from parents and students whose journeys reflect trust, discipline, and achievement at Krishna Chaitanya.
          </p>
        </div>

        {/* Tab selector */}
        <div
          className="flex justify-center mb-6 sm:mb-8"
          role="tablist"
          aria-label="Success story categories"
        >
          <div className="inline-flex p-1 rounded-2xl bg-white border border-blue-100 shadow-sm gap-1 w-full max-w-md sm:w-auto">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0B3C91] text-white shadow-md'
                      : 'text-[#0B3C91] hover:bg-blue-50'
                  }`}
                >
                  <span aria-hidden="true">{tab.emoji}</span>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {reviews.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    className="h-full"
                  >
                    <ReviewCard review={review} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-blue-200 bg-white/70 px-6 py-10 text-center max-w-xl mx-auto">
                <p className="text-sm font-semibold text-[#0B3C91]">
                  {activeTab === 'parent' ? 'Parent' : 'Student'} reviews will appear here
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  Verified testimonials from the college will be published in this tab once provided by management.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
