import React from 'react';
import { TeamMemberData } from '../../config/seedData';
import { OptimizedImage } from '../ui/OptimizedImage';

interface TeamCardProps {
  member: TeamMemberData;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="flex flex-col group">
      {/* 4:5 portrait with 30px radius */}
      <div className="relative aspect-[4/5] w-full rounded-[30px] overflow-hidden bg-[#F2F2F2] border border-black/10 mb-4">
        <OptimizedImage
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false}
        />
      </div>

      <div className="space-y-1">
        <h4 className="font-bold text-lg text-[#111111]">{member.name}</h4>
        <p className="text-xs font-bold uppercase tracking-wider text-[#EE9B3B]">
          {member.role}
        </p>
        <p className="text-sm text-[#4A4A4A] leading-relaxed pt-1">
          {member.bio}
        </p>
      </div>
    </div>
  );
};
