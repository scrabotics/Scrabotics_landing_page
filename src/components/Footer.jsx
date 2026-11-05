import React from 'react';
import { Github, Instagram, Linkedin, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { CLUB_INFO } from '../data/projects';

export default function Footer({ onSelectSection, onOpenJoinModal, onReplayBoot }) {
  return (
    <footer className="border-t border-[#F1F0EA]/10 bg-[#090D12] text-[#F1F0EA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#F1F0EA]/10">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0F1620] border border-[#00C8E8]/45 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C8E8] shadow-[0_0_10px_#00C8E8]" />
              </div>
              <div>
                <div className="font-display font-bold text-xl tracking-tight text-[#F1F0EA]">
                  {CLUB_INFO.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00C8E8]">
                  Robotics Club, {CLUB_INFO.institution}
                </div>
              </div>
            </div>

            <p className="text-sm text-[#F1F0EA]/68 max-w-sm leading-relaxed">
              A student-driven robotics and engineering community designing
              human-centred machines, autonomous rovers, and intelligent
              systems.
            </p>

            <div className="pt-1 font-display font-bold text-sm tracking-[0.22em] uppercase text-[#00C8E8]">
              {CLUB_INFO.footerTagline}
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#F1F0EA]/45">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'projects', label: 'Projects' },
                { id: 'events', label: 'Events' },
                { id: 'team', label: 'Team' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelectSection(item.id)}
                    className="text-[#F1F0EA]/72 hover:text-[#00C8E8] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#F1F0EA]/45">
              Laboratory & Contact
            </div>

            <div className="space-y-2.5 text-sm text-[#F1F0EA]/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00C8E8] shrink-0 mt-1" />
                <span>
                  Robotics Innovation Lab, GIFT Autonomous College, Bhubaneswar,
                  Odisha
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00C8E8] shrink-0" />
                <a
                  href={`mailto:${CLUB_INFO.email}`}
                  className="hover:text-[#00C8E8] transition-colors"
                >
                  {CLUB_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={CLUB_INFO.socials.instagram}
                aria-label="SCRABOTICS Instagram"
                className="w-10 h-10 rounded-xl bg-[#0F1620] border border-[#F1F0EA]/12 flex items-center justify-center text-[#F1F0EA]/75 hover:text-[#00C8E8] hover:border-[#00C8E8]/50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CLUB_INFO.socials.linkedin}
                aria-label="SCRABOTICS LinkedIn"
                className="w-10 h-10 rounded-xl bg-[#0F1620] border border-[#F1F0EA]/12 flex items-center justify-center text-[#F1F0EA]/75 hover:text-[#00C8E8] hover:border-[#00C8E8]/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={CLUB_INFO.socials.github}
                aria-label="SCRABOTICS GitHub"
                className="w-10 h-10 rounded-xl bg-[#0F1620] border border-[#F1F0EA]/12 flex items-center justify-center text-[#F1F0EA]/75 hover:text-[#00C8E8] hover:border-[#00C8E8]/50 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onOpenJoinModal}
                className="ml-auto inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00C8E8]/12 border border-[#00C8E8]/40 font-mono text-xs text-[#00C8E8] hover:bg-[#00C8E8] hover:text-[#090D12] transition-colors cursor-pointer"
              >
                <span>Join Club</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#F1F0EA]/50">
          <div>
            © {new Date().getFullYear()} SCRABOTICS — Robotics Club, GIFT
            Autonomous College. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[#00C8E8]">
            {onReplayBoot && (
              <button
                type="button"
                onClick={onReplayBoot}
                className="px-2.5 py-1 rounded-md border border-[#00C8E8]/30 hover:border-[#00C8E8] hover:bg-[#00C8E8]/10 text-[10px] uppercase tracking-widest transition-all cursor-pointer"
              >
                [ REPLAY BOOT SEQUENCE ]
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C8E8]" />
              <span>ENGINEER THE FUTURE.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
