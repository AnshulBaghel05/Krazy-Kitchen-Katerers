import React, { useState } from 'react';
import { useCMS } from '../../lib/cmsStore';
import { ScriptHeading } from '../ui/ScriptHeading';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsCarousel: React.FC = () => {
  const cms = useCMS();
  const reviews = cms.testimonials || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hide unless >= 3 real reviews (per spec requirement)
  if (reviews.length < 3) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentIndex];

  return (
    <section aria-label="Guest Testimonials" className="py-16 md:py-24 bg-[#F2F2F2] border-y border-[#DDDDDD] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block mb-2">
            Community Voices
          </span>
          <ScriptHeading as="h2">Praise &amp; Stories</ScriptHeading>
        </div>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto relative bg-white rounded-[32px] p-8 sm:p-12 border border-[#DDDDDD]">
          <div className="flex items-center justify-between mb-6">
            {/* Orange Stars non-negotiable */}
            <div className="flex items-center gap-1">
              {[...Array(currentReview.stars || 5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#EE9B3B] text-[#EE9B3B]"
                  aria-hidden="true"
                />
              ))}
            </div>

            <Quote className="w-8 h-8 text-[#9CBF77]/40" aria-hidden="true" />
          </div>

          {/* Quote Body */}
          <blockquote className="text-lg sm:text-xl md:text-2xl text-[#111111] font-medium leading-relaxed mb-6">
            &ldquo;{currentReview.quote}&rdquo;
          </blockquote>

          {/* Review Author & Role */}
          <div className="flex items-center justify-between pt-4 border-t border-[#DDDDDD]">
            <div>
              <p className="font-bold text-base text-[#111111]">{currentReview.author}</p>
              <p className="text-xs text-[#4A4A4A] font-medium">
                {currentReview.role} · {currentReview.date}
              </p>
            </div>

            {/* Navigation arrows (no autoplay per spec) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold text-[#4A4A4A] px-1 tabular-nums">
                {currentIndex + 1} / {reviews.length}
              </span>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
