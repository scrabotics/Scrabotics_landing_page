import React from 'react';
import { Github, Linkedin, Mail, UserCheck } from 'lucide-react';
import BentoCard from './BentoCard';
import { TEAM_MEMBERS } from '../data/team';

export default function Team() {
  return (
    <section
      id="team"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00C8E8]">
            <span className="w-2 h-2 rounded-full bg-[#8065D8]" />
            <span>10 // MEET THE TEAM</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.05] tracking-[-0.03em] text-[#F1F0EA]">
            THE PEOPLE BEHIND THE{' '}
            <span className="text-[#00C8E8]">MACHINES.</span>
          </h2>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-2">
          <p className="text-[#F1F0EA]/68 text-sm sm:text-base max-w-md leading-relaxed lg:text-right">
            Faculty mentors, student coordinators, and technical domain leads
            driving robotics innovation at GIFT Autonomous College.
          </p>
          <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#F1F0EA]/8 text-[#00C8E8]">
            Editable roster in src/data/team.js
          </span>
        </div>
      </div>

      {/* Asymmetric 12-Column Team Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-5">
        {TEAM_MEMBERS.map((member, index) => {
          const isWide = member.colSpan.includes('lg:col-span-6');
          const isViolet = index % 2 === 1;

          return (
            <BentoCard
              key={member.id}
              colSpan={member.colSpan}
              accent={isViolet ? 'violet' : 'cyan'}
              padding="p-0"
              className={`group overflow-hidden flex ${
                isWide
                  ? 'flex-col sm:flex-row min-h-[260px]'
                  : 'flex-col justify-between min-h-[360px]'
              }`}
            >
              {/* Profile Photo */}
              <div
                className={`relative overflow-hidden ${
                  isWide
                    ? 'sm:w-2/5 min-h-[220px] sm:min-h-full'
                    : 'h-48 sm:h-52'
                }`}
              >
                <img
                  src={member.image}
                  alt={member.role}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter grayscale-[25%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D12] via-[#090D12]/30 to-transparent" />

                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded bg-[#090D12]/85 backdrop-blur-md border border-[#F1F0EA]/15 font-mono text-[10px] uppercase tracking-[0.15em] text-[#00C8E8]">
                    {member.department}
                  </span>
                </div>
              </div>

              {/* Member Info */}
              <div
                className={`p-6 flex-1 flex flex-col justify-between ${
                  isWide ? 'sm:w-3/5' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#00C8E8]">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{member.role}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F1F0EA] mt-1">
                    {member.name}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#F1F0EA]/70 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-5 pt-3.5 border-t border-[#F1F0EA]/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#F1F0EA]/45">
                    CONNECT //
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={member.socials.linkedin}
                      aria-label={`${member.role} LinkedIn`}
                      className="w-8 h-8 rounded-lg bg-[#F1F0EA]/[0.06] border border-[#F1F0EA]/10 flex items-center justify-center text-[#F1F0EA]/75 hover:text-[#00C8E8] hover:border-[#00C8E8]/50 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.socials.github}
                      aria-label={`${member.role} GitHub`}
                      className="w-8 h-8 rounded-lg bg-[#F1F0EA]/[0.06] border border-[#F1F0EA]/10 flex items-center justify-center text-[#F1F0EA]/75 hover:text-[#00C8E8] hover:border-[#00C8E8]/50 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.socials.email}
                      aria-label={`Email ${member.role}`}
                      className="w-8 h-8 rounded-lg bg-[#F1F0EA]/[0.06] border border-[#F1F0EA]/10 flex items-center justify-center text-[#F1F0EA]/75 hover:text-[#00C8E8] hover:border-[#00C8E8]/50 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </BentoCard>
          );
        })}
      </div>
    </section>
  );
}
