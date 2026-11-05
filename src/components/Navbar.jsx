import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Terminal, Layers, ScrollText } from 'lucide-react';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'teams', label: 'Teams' },
  { id: 'events', label: 'Events' },
  { id: 'achievements', label: 'Achievements' },
];

// Custom Robot-Inspired Geometric Brutalist Logo
export function ScraboticsLogo({ inverted = false }) {
  const bg = inverted ? '#F3F0E8' : '#111111';
  const fg = inverted ? '#111111' : '#F3F0E8';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group">
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 border-[3px] border-[#111111] flex items-center justify-center relative transition-transform duration-200 group-hover:-rotate-3 shrink-0"
        style={{ backgroundColor: bg }}
      >
        <svg viewBox="0 0 40 40" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
          {/* Outer Industrial Chassis */}
          <rect x="5" y="9" width="30" height="22" fill="none" stroke={fg} strokeWidth="3" />
          {/* Top LiDAR Turret */}
          <rect x="14" y="3" width="12" height="6" fill="#C7FF35" stroke={fg} strokeWidth="2" />
          {/* Left Optical Eye */}
          <rect x="10" y="15" width="7" height="6" fill="#C7FF35" />
          {/* Right Optical Visor Bar */}
          <rect x="21" y="16" width="9" height="4" fill="#C7FF35" />
          {/* Mechanical Jaw / Grille */}
          <line x1="11" y1="26" x2="29" y2="26" stroke={fg} strokeWidth="2.5" />
          {/* Side Servo Bolts */}
          <rect x="1" y="16" width="4" height="8" fill="#C7FF35" />
          <rect x="35" y="16" width="4" height="8" fill="#C7FF35" />
        </svg>
      </div>
      <div>
        <div className="font-display font-extrabold text-lg sm:text-xl tracking-tight leading-none flex items-center gap-1">
          <span>SCRABOTICS</span>
          <span className="inline-block w-2 h-2 bg-[#C7FF35] border border-[#111111]" />
        </div>
        <div className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase opacity-75 mt-0.5">
          ENG_LAB // UNIT_001
        </div>
      </div>
    </div>
  );
}

export default function Navbar({
  onOpenModal,
  loggedInMember,
  activeSection = 'home',
  onSelectSection,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id) => {
    if (onSelectSection) {
      onSelectSection(id);
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Brutalist Navbar Island */}
      <div
        className={`pointer-events-auto max-w-[1360px] w-full bg-[#F3F0E8] border-[3px] border-[#111111] transition-all duration-300 ${
          scrolled
            ? 'py-2 px-3.5 sm:px-6 shadow-[7px_7px_0px_0px_#111111]'
            : 'py-2.5 sm:py-3 px-3.5 sm:px-6 shadow-[5px_5px_0px_0px_#111111]'
        } flex items-center justify-between gap-4`}
      >
        {/* LEFT: Custom Robot-Inspired Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="focus:outline-none cursor-pointer text-left shrink-0"
        >
          <ScraboticsLogo />
        </button>

        {/* CENTER: Navigation Links (Instant Direct Switching - No Scrolling) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center border-[2px] border-[#111111] bg-[#F3F0E8] divide-x-[2px] divide-[#111111]"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#C7FF35] text-[#111111]'
                    : 'text-[#111111] hover:bg-[#C7FF35]/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Member Login + JOIN THE CLUB */}
        <div className="hidden lg:flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenModal('login')}
            className="px-3.5 py-2 font-mono text-xs font-bold uppercase border-[3px] border-[#111111] bg-[#F3F0E8] hover:bg-[#B8B6AC] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{loggedInMember ? `OP: ${loggedInMember}` : 'Login'}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenModal('join')}
            className="brutal-btn px-4.5 py-2 font-mono text-xs font-extrabold uppercase bg-[#C7FF35] text-[#111111] flex items-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_#111111]"
          >
            <span>JOIN CLUB</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* MOBILE: Animated Brutalist Hamburger Button */}
        <button
          type="button"
          aria-label="Toggle Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="xl:hidden w-10 h-10 border-[3px] border-[#111111] bg-[#C7FF35] flex flex-col items-center justify-center gap-1.5 brutal-btn cursor-pointer shadow-[3px_3px_0px_#111111]"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-5 h-[3px] bg-[#111111] block"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-[3px] bg-[#111111] block"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-5 h-[3px] bg-[#111111] block"
          />
        </button>
      </div>

      {/* MOBILE FLOATING DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 4 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto max-w-[1360px] w-full border-[3px] border-[#111111] bg-[#F3F0E8] shadow-[6px_6px_0px_0px_#111111] overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`p-3 font-mono text-xs font-bold uppercase border-2 border-[#111111] text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-[#C7FF35]'
                        : 'bg-[#F3F0E8] hover:bg-[#C7FF35]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t-2 border-[#111111]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenModal('login');
                  }}
                  className="w-full py-2.5 font-mono text-xs font-bold uppercase border-2 border-[#111111] bg-[#F3F0E8] text-center"
                >
                  Member Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenModal('join');
                  }}
                  className="w-full py-2.5 font-mono text-xs font-extrabold uppercase bg-[#C7FF35] border-2 border-[#111111] text-center"
                >
                  JOIN THE CLUB
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
