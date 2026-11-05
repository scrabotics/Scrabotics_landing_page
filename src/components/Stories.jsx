import React from 'react';
import { Quote, Camera } from 'lucide-react';
import BentoCard from './BentoCard';
import { HUMAN_STORIES } from '../data/projects';

export default function Stories() {
  return (
    <section
      id="stories"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#8065D8]">
            <span className="w-2 h-2 rounded-full bg-[#00C8E8]" />
            <span>08 // HUMAN + ROBOT STORIES</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.05] tracking-[-0.03em] text-[#F1F0EA]">
            BEHIND EVERY MACHINE,{' '}
            <span className="text-[#00C8E8]">THERE’S A HUMAN.</span>
          </h2>
        </div>

        <p className="text-[#F1F0EA]/68 text-sm sm:text-base max-w-md leading-relaxed">
          Warm, human-centred moments from the GIFT Autonomous College robotics
          lab — late-night debugging, first sensor lock, and competition launch
          days.
        </p>
      </div>

      {/* Photo-led Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-5">
        {HUMAN_STORIES.map((story, idx) => (
          <BentoCard
            key={story.id}
            colSpan={story.colSpan}
            accent={idx % 2 === 0 ? 'cyan' : 'violet'}
            padding="p-0"
            className="group relative overflow-hidden min-h-[340px] sm:min-h-[380px] flex flex-col justify-end"
          >
            {/* Full-bleed Workshop Photography */}
            <img
              src={story.image}
              alt={story.caption}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D12] via-[#090D12]/65 to-[#090D12]/15" />

            {/* Top Label */}
            <div className="relative z-10 p-6 sm:p-7 flex items-center justify-between mb-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#090D12]/80 backdrop-blur-md border border-[#F1F0EA]/15 font-mono text-[10px] uppercase tracking-[0.18em] text-[#00C8E8]">
                <Camera className="w-3 h-3" />
                {story.context}
              </span>
              <Quote className="w-5 h-5 text-[#8065D8]/80" />
            </div>

            {/* Bottom Editorial Quote & Context */}
            <div className="relative z-10 p-6 sm:p-8 space-y-2.5">
              <blockquote className="font-display font-bold text-xl sm:text-2xl lg:text-[1.65rem] leading-snug text-[#F1F0EA] tracking-tight">
                “{story.caption}”
              </blockquote>
              <p className="text-xs sm:text-sm text-[#F1F0EA]/75 max-w-xl leading-relaxed">
                {story.detail}
              </p>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
