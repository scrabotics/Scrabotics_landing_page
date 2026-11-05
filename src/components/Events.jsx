import React from 'react';
import { Calendar, MapPin, ArrowUpRight, Clock } from 'lucide-react';
import BentoCard from './BentoCard';
import {
  FEATURED_EVENT,
  UPCOMING_EVENTS,
  CALENDAR_SCHEDULE,
} from '../data/events';

export default function Events({ onRegisterEvent }) {
  return (
    <section
      id="events"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto"
    >
      {/* Section Heading */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00C8E8]">
            <span className="w-2 h-2 rounded-full bg-[#00C8E8]" />
            <span>09 // EVENTS & WORKSHOPS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.05] tracking-[-0.03em] text-[#F1F0EA]">
            LEARN. BUILD. <span className="text-[#00C8E8]">COMPETE.</span>
          </h2>
        </div>

        <p className="text-[#F1F0EA]/68 text-sm sm:text-base max-w-md leading-relaxed">
          Hands-on technical bootcamps, internal hackathons, and national
          robotics arena trials hosted at GIFT Autonomous College.
        </p>
      </div>

      {/* Bento Layout:
          - 1 Large Featured Event Card (7 cols, 2 rows)
          - 2 Smaller Upcoming Event Cards (5 cols each)
          - 1 Horizontal Event Calendar Card (12 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* 1. Large Featured Event Card */}
        <BentoCard
          colSpan="md:col-span-6 lg:col-span-7 lg:row-span-2"
          accent="cyan"
          padding="p-0"
          className="group overflow-hidden flex flex-col justify-between min-h-[460px]"
        >
          <div className="relative h-60 sm:h-72 overflow-hidden">
            <img
              src={FEATURED_EVENT.image}
              alt={FEATURED_EVENT.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D12] via-[#090D12]/45 to-transparent" />

            <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-md bg-[#00C8E8] text-[#090D12] font-mono font-bold text-[10px] uppercase tracking-[0.16em]">
                FEATURED // {FEATURED_EVENT.type}
              </span>
              <span className="px-3 py-1 rounded-md bg-[#090D12]/85 backdrop-blur-md border border-[#F1F0EA]/15 font-mono text-[10px] text-[#F1F0EA]/80">
                {FEATURED_EVENT.status}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#00C8E8] mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {FEATURED_EVENT.date}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#F1F0EA]/60">
                  <MapPin className="w-3.5 h-3.5 text-[#8065D8]" />
                  {FEATURED_EVENT.venue}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F1F0EA] tracking-tight">
                {FEATURED_EVENT.title}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#F1F0EA]/72 leading-relaxed">
                {FEATURED_EVENT.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F1F0EA]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {FEATURED_EVENT.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#F1F0EA]/[0.06] text-[#F1F0EA]/75 border border-[#F1F0EA]/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onRegisterEvent(FEATURED_EVENT)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C8E8] text-[#090D12] font-display font-bold text-xs uppercase tracking-[0.12em] hover:bg-[#33D6F0] transition-colors cursor-pointer"
              >
                <span>REGISTER INTEREST</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </BentoCard>

        {/* 2. Two Smaller Upcoming Event Cards */}
        {UPCOMING_EVENTS.map((evt, idx) => (
          <BentoCard
            key={evt.id}
            colSpan="md:col-span-3 lg:col-span-5"
            accent={idx === 0 ? 'violet' : 'cyan'}
            className="flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded bg-[#8065D8]/15 border border-[#8065D8]/40 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F1F0EA]/90">
                  {evt.type}
                </span>
                <span className="font-mono text-[11px] text-[#00C8E8] inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {evt.date}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-[#F1F0EA]">
                {evt.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#F1F0EA]/70 leading-relaxed">
                {evt.description}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-[#F1F0EA]/10 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-[#F1F0EA]/55 inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00C8E8]" />
                {evt.venue}
              </span>

              <button
                type="button"
                onClick={() => onRegisterEvent(evt)}
                className="font-mono text-xs text-[#00C8E8] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Reserve Slot</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </BentoCard>
        ))}

        {/* 3. Horizontal Event Calendar Card (12 columns) */}
        <BentoCard
          colSpan="md:col-span-6 lg:col-span-12"
          accent="cyan"
          className="space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#00C8E8]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C8E8]">
                ACADEMIC SESSION SCHEDULE // PLACEHOLDER CALENDAR
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#F1F0EA]/50">
              Editable in src/data/events.js
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {CALENDAR_SCHEDULE.map((slot) => (
              <div
                key={slot.id}
                className="p-4 rounded-xl bg-[#090D12]/75 border border-[#F1F0EA]/10 hover:border-[#00C8E8]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-[#8065D8]">
                    <span>{slot.category}</span>
                    <span className="text-[#00C8E8]">{slot.datePlaceholder}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-[#F1F0EA] mt-2">
                    {slot.activity}
                  </h4>
                </div>
                <p className="font-mono text-[11px] text-[#F1F0EA]/55 mt-3 pt-2 border-t border-[#F1F0EA]/8">
                  {slot.note}
                </p>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
