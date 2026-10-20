import React from 'react';
import { useCMS } from '../../lib/cmsStore';
import { siteConfig } from '../../config/site';
import { siteImages } from '../../lib/images';
import { BlockHero } from '../sections/BlockHero';
import { InfoBand } from '../about/InfoBand';
import { VideoPoster } from '../about/VideoPoster';
import { TeamCard } from '../about/TeamCard';
import { ScriptHeading } from '../ui/ScriptHeading';
import { HoursBlock } from '../sections/HoursBlock';

export const AboutPage: React.FC = () => {
  const cms = useCMS();

  return (
    <div className="w-full">
      {/* 1. BlockHero (green non-negotiable) */}
      <BlockHero
        color="green"
        tagline="Our Ancestral Lineage"
        title="Our Story"
        description={cms.storyCopy[0] || 'From island roots to Brooklyn tables.'}
        imageSrc={siteImages.diningRoom}
        imageAlt={`Inside ${siteConfig.businessName}`}
        botanicalVariant="thyme"
      />

      {/* Story extended prose */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 space-y-6 text-base sm:text-lg text-[#4A4A4A] leading-relaxed">
          {cms.storyCopy.slice(1).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* 2. InfoBand (culinary standards and pillars) */}
      <InfoBand />

      {/* 3. VideoPoster (click to load iframe) */}
      <VideoPoster />

      {/* 4. TeamCard grid with heading [[TEAM_HEADING]] */}
      <section aria-label="Team Members" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block mb-2">
              Our Leadership
            </span>
            <ScriptHeading as="h2">{cms.teamHeading}</ScriptHeading>
            <p className="mt-4 text-base text-[#4A4A4A]">
              Decades of combined culinary rigor, Caribbean spice mastery, and authentic Brooklyn hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cms.team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. HoursBlock (yellow non-negotiable) */}
      <HoursBlock color="yellow" />
    </div>
  );
};
