import React from 'react';

export const InfoBand: React.FC = () => {
  const pillars = [
    { number: '48h', label: 'Scotch Bonnet Marinades', desc: 'Deep seasoning penetration into bone and muscle before cooking.' },
    { number: '100%', label: 'Halal Certified Poultry', desc: 'Ethically raised, farm-sourced whole chicken and halal meats.' },
    { number: '9h', label: 'Slow-Simmered Braises', desc: 'Low-and-slow cast iron reduction for fork-tender butter bean oxtails.' },
    { number: '500+', label: 'Guest Banquet Capacity', desc: 'Full-service on-site banquet trailers, staff, and chaffing setups.' },
  ];

  return (
    <section aria-label="Our Culinary Standards" className="bg-[#F2F2F2] py-16 border-y border-[#DDDDDD]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {pillars.map((p, idx) => (
            <div key={idx} className="space-y-2">
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#E67A3E] tabular-nums block">
                {p.number}
              </span>
              <h4 className="font-bold text-sm sm:text-base text-[#111111]">
                {p.label}
              </h4>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
