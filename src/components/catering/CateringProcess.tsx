import React from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { Mail, Utensils, CheckCircle2, Truck } from 'lucide-react';

export const CateringProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Enquire & Share Vision',
      desc: 'Submit your event date, estimated headcount, venue details, and dietary preferences via our catering form.',
      icon: Mail,
      color: 'bg-[#F0C964]',
    },
    {
      num: '02',
      title: 'Custom Menu & Tasting',
      desc: 'We craft a tailored proposal and invite wedding & gala clients to our Brooklyn kitchen for an intimate menu tasting.',
      icon: Utensils,
      color: 'bg-[#E67A3E]',
    },
    {
      num: '03',
      title: 'Confirm & Coordinate',
      desc: 'Lock in your date with a clear agreement. Our event captain coordinates load-in timings, power, and chaffing logistics.',
      icon: CheckCircle2,
      color: 'bg-[#9CBF77]',
    },
    {
      num: '04',
      title: 'Flawless Feast Delivery',
      desc: 'Our uniformed crew arrives promptly to set up live stations, hot chaffers, and unhurried hospitality for your guests.',
      icon: Truck,
      color: 'bg-[#EE9B3B]',
    },
  ];

  return (
    <section aria-label="How Catering Works" className="py-16 md:py-24 bg-[#F2F2F2] border-y border-[#DDDDDD]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block mb-2">
            Seamless Planning
          </span>
          <ScriptHeading as="h2">How Catering Works</ScriptHeading>
          <p className="mt-4 text-base text-[#4A4A4A]">
            Four straightforward steps from initial inspiration to unforgettable celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-[28px] p-6 border border-[#DDDDDD] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#4A4A4A]">
                      Step {step.num}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-[#111111]`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-lg text-[#111111] mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
