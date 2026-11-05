import React from 'react';
import { ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import BentoCard from './BentoCard';

export default function JoinUs({ onOpenJoinModal, onOpenContactModal }) {
  return (
    <section
      id="contact"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto space-y-12"
    >
      {/* Large Call-to-Action Bento Card */}
      <BentoCard
        accent="cyan"
        padding="p-0"
        className="relative overflow-hidden min-h-[420px] flex flex-col justify-between"
      >
        {/* Background Visual: Human and Robot Collaboration */}
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85"
          alt="Students and humanoid robot collaborating in engineering studio"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 80% 30%, rgba(0, 200, 232, 0.22), rgba(128, 101, 216, 0.14) 40%, rgba(9, 13, 18, 0.95) 80%)',
          }}
        />

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-6 my-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00C8E8]/12 border border-[#00C8E8]/35 font-mono text-xs uppercase tracking-[0.18em] text-[#00C8E8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>11 // JOIN SCRABOTICS</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-[-0.03em] text-[#F1F0EA]">
            YOUR IDEAS DESERVE TO BE{' '}
            <span className="text-[#00C8E8]">BUILT.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#F1F0EA]/78 leading-relaxed max-w-2xl">
            Whether you are interested in robotics, coding, electronics, design
            or innovation — there is a place for you in SCRABOTICS.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenJoinModal}
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#00C8E8] text-[#090D12] font-display font-bold text-xs sm:text-sm tracking-[0.12em] uppercase transition-all duration-300 hover:bg-[#33D6F0] hover:shadow-[0_0_28px_rgba(0,200,232,0.4)] cursor-pointer"
            >
              <span>BECOME A MEMBER</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={onOpenContactModal}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#0F1620]/90 hover:bg-[#F1F0EA]/10 text-[#F1F0EA] border border-[#F1F0EA]/20 hover:border-[#8065D8] font-display font-semibold text-xs sm:text-sm tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#8065D8]" />
              <span>CONTACT THE TEAM</span>
            </button>
          </div>
        </div>
      </BentoCard>

      {/* Section 16: Final Brand Statement Banner */}
      <div className="py-10 sm:py-14 border-y border-[#F1F0EA]/10 text-center space-y-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#8065D8]">
          SCRABOTICS MANIFESTO • GIFT AUTONOMOUS COLLEGE
        </div>
        <p className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-[-0.03em] text-[#F1F0EA]">
          WE IMAGINE. <span className="text-[#00C8E8]">WE ENGINEER.</span> WE
          BUILD.
        </p>
      </div>
    </section>
  );
}
