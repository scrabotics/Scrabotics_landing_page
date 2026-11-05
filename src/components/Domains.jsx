import React from 'react';
import { Bot, Compass, Cpu, Cog, Eye, Layers } from 'lucide-react';
import BentoCard from './BentoCard';
import { DOMAINS_DATA } from '../data/projects';

const DOMAIN_ICONS = {
  'domain-humanoid': Bot,
  'domain-autonomous': Compass,
  'domain-embedded': Cpu,
  'domain-mechanical': Cog,
  'domain-vision': Eye,
  'domain-industrial': Layers,
};

export default function Domains() {
  return (
    <section
      id="domains"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00C8E8]">
            <span className="w-2 h-2 rounded-full bg-[#8065D8]" />
            <span>06 // ROBOTICS DOMAINS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl leading-[1.06] tracking-[-0.03em] text-[#F1F0EA]">
            CORE DISCIPLINES OF{' '}
            <span className="text-[#00C8E8]">INTELLIGENT MACHINES.</span>
          </h2>
        </div>

        <p className="text-[#F1F0EA]/68 text-sm sm:text-base max-w-md leading-relaxed">
          Every autonomous robot combines mechanical precision, embedded nerve
          systems, and machine perception. Explore our six technical tracks.
        </p>
      </div>

      {/* Asymmetric 12-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-5">
        {DOMAINS_DATA.map((domain, idx) => {
          const Icon = DOMAIN_ICONS[domain.id] || Cpu;
          const isViolet = idx % 2 === 1;

          return (
            <BentoCard
              key={domain.id}
              colSpan={domain.colSpan}
              accent={isViolet ? 'violet' : 'cyan'}
              padding="p-0"
              className="group overflow-hidden flex flex-col justify-between min-h-[290px]"
            >
              {/* Image Header */}
              <div className="relative h-40 sm:h-44 overflow-hidden">
                <img
                  src={domain.image}
                  alt={domain.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D12] via-[#090D12]/55 to-transparent" />

                <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#090D12]/85 backdrop-blur-md border border-[#F1F0EA]/15 font-mono text-[10px] uppercase tracking-[0.18em] text-[#00C8E8]">
                    {domain.code}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#090D12]/85 border border-[#F1F0EA]/15 flex items-center justify-center text-[#F1F0EA] group-hover:text-[#00C8E8] group-hover:border-[#00C8E8]/50 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#F1F0EA] group-hover:text-[#00C8E8] transition-colors">
                    {domain.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#F1F0EA]/70 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#F1F0EA]/10 flex flex-wrap gap-1.5">
                  {domain.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="font-mono text-[10px] px-2.5 py-0.5 rounded-md bg-[#F1F0EA]/[0.06] text-[#F1F0EA]/75 border border-[#F1F0EA]/10"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>
          );
        })}
      </div>
    </section>
  );
}
