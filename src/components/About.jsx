import React from 'react';
import { Wrench, Cpu, Users, Sparkles, ArrowUpRight, Activity } from 'lucide-react';
import BentoCard from './BentoCard';
import { ABOUT_CARDS, CLUB_INFO } from '../data/projects';

const CARD_ICONS = [Wrench, Cpu, Users, Sparkles];

export default function About({ onOpenJoinModal }) {
  return (
    <section
      id="about"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto space-y-12"
    >
      {/* 1. Laboratory Telemetry Strip: Honest editable club activity metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {CLUB_INFO.activityPlaceholders.map((stat) => (
          <div
            key={stat.id}
            className="p-5 rounded-2xl bg-[#0D141F]/80 border border-white/10 hover:border-[#00C8E8]/50 transition-all backdrop-blur-xl group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#F1F0EA]/50 mb-2">
              <span>{stat.label}</span>
              <Activity className="w-3.5 h-3.5 text-[#00C8E8] group-hover:scale-110 transition-transform" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#F1F0EA] group-hover:text-[#00C8E8] transition-colors">
              {stat.value}
            </div>
            <div className="font-mono text-[10px] text-[#00C8E8]/80 mt-1">
              {stat.note}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Section Heading */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-4">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00C8E8]">
            <span className="w-2 h-2 rounded-full bg-[#00C8E8]" />
            <span>05 // ABOUT SCRABOTICS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.05] tracking-[-0.03em] text-[#F1F0EA]">
            MORE THAN MACHINES.{' '}
            <span className="text-[#00C8E8]">A COMMUNITY OF BUILDERS.</span>
          </h2>
        </div>

        <p className="text-[#F1F0EA]/70 text-sm sm:text-base max-w-md leading-relaxed">
          At GIFT Autonomous College, SCRABOTICS brings together curious minds
          across mechanical, electronics, and software engineering to build
          robots that solve real problems.
        </p>
      </div>

      {/* 3. 12-Column Asymmetric Bento Grid for About Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-5">
        {ABOUT_CARDS.map((card, index) => {
          const IconComponent = CARD_ICONS[index % CARD_ICONS.length];
          const isViolet = index === 1 || index === 2;

          return (
            <BentoCard
              key={card.id}
              colSpan={card.colSpan}
              accent={isViolet ? 'violet' : 'cyan'}
              padding="p-0"
              className="group overflow-hidden flex flex-col justify-between min-h-[320px]"
            >
              {/* Background Workshop Photography with dark editorial gradient */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D12] via-[#090D12]/45 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-[#090D12]/80 backdrop-blur-md border border-[#F1F0EA]/15 font-mono text-[10px] uppercase tracking-[0.18em] text-[#00C8E8]">
                    {card.tag}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#090D12]/80 backdrop-blur-md border border-[#F1F0EA]/15 flex items-center justify-center text-[#00C8E8]">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Text Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-[#090D12]/60">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F1F0EA] tracking-tight group-hover:text-[#00C8E8] transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-[#F1F0EA]/72 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F1F0EA]/10 flex items-center justify-between font-mono text-[11px] text-[#F1F0EA]/50">
                  <span>SCRABOTICS LAB // PILLAR 0{index + 1}</span>
                  <span className="text-[#00C8E8]">GIFT AUTONOMOUS COLLEGE</span>
                </div>
              </div>
            </BentoCard>
          );
        })}

        {/* Wide Studio Philosophy Banner inside About Bento Grid */}
        <BentoCard
          colSpan="md:col-span-6 lg:col-span-12"
          accent="cyan"
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8065D8]">
              // OPEN ENGINEERING CULTURE
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F1F0EA]">
              No prior robotics experience required — only the curiosity to build, test, and learn together.
            </h3>
          </div>

          <button
            type="button"
            onClick={onOpenJoinModal}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00C8E8]/15 hover:bg-[#00C8E8] text-[#00C8E8] hover:text-[#090D12] border border-[#00C8E8]/40 font-display font-bold text-xs uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer"
          >
            <span>JOIN A WORKGROUP</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </BentoCard>
      </div>
    </section>
  );
}
