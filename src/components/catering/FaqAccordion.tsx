import React, { useState } from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'How far in advance should we book our catering?',
      answer: 'For full-service weddings and large corporate galas (75+ guests), we recommend booking 2 to 6 months in advance to reserve dates and schedule private tastings. For intimate corporate lunches and family gatherings, a 5-day notice is usually sufficient depending on kitchen capacity.',
    },
    {
      question: 'Can you accommodate dietary restrictions and allergies?',
      answer: 'Absolutely. All our chicken and beef are 100% Halal-certified. We also prepare dedicated Gluten-Free jerk braises, Vegan Callaloo, and vegetarian bakes in separate culinary prep areas to avoid cross-contamination.',
    },
    {
      question: 'Do you provide chaffing dishes, servers, and bartenders?',
      answer: 'Yes! Our Celebration and Wedding packages include full chaffing setups, bio-compostable tableware, and professional uniformed banquet servers. We also provide licensed bar staff and Caribbean signature cocktail service.',
    },
    {
      question: 'What is your catering delivery radius from Brooklyn?',
      answer: 'We proudly deliver throughout Brooklyn, Manhattan, Queens, Staten Island, and the Bronx, as well as select parts of Northern New Jersey and Long Island. Delivery fees vary based on distance and staffing needs.',
    },
    {
      question: 'What is required to confirm our catering booking?',
      answer: 'After you review and approve the customized menu proposal, a 30% deposit reserves your date on our calendar. The remaining balance is due 7 days prior to your event.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section aria-label="Frequently Asked Questions" className="py-16 md:py-24 bg-white">
      {/* FAQPage JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block mb-2">
            Common Inquiries
          </span>
          <ScriptHeading as="h2">Catering FAQ</ScriptHeading>
          <p className="mt-4 text-base text-[#4A4A4A]">
            Answers to our most frequently asked questions about booking, service styles, and dietary accommodations.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#DDDDDD] border-y border-[#DDDDDD]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-bold text-base sm:text-lg text-[#111111] hover:text-[#EE9B3B] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#F2F2F2] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#111111] text-white' : 'text-[#111111]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="pt-3 pb-1 text-sm sm:text-base text-[#4A4A4A] leading-relaxed animate-in fade-in duration-150"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
