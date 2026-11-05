import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  Crosshair,
  Cpu,
  Wrench,
  Layers,
  Calendar,
  MapPin,
  ShieldAlert,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Activity,
} from 'lucide-react';

import Navbar, { ScraboticsLogo } from './components/Navbar';
import MechanicalSchematic from './components/MechanicalSchematic';
import InteractiveModals from './components/InteractiveModals';
import LoadingScreen from './components/LoadingScreen';
import { TechnicalCursor, Magnetic, TiltProjectCard } from './components/MotionPrimitives';
import {
  CLUB_META,
  EXPERTISE_ITEMS,
  PROJECTS_DATA,
  CLUB_STATS,
  TEAMS_DATA,
  EVENTS_DATA,
  ACHIEVEMENTS_DATA,
} from './data/scraboticsData';

// Lazy load the 3D scene for performance optimization
const Robot3DScene = lazy(() => import('./components/Robot3DScene'));

gsap.registerPlugin(ScrollTrigger);

// Animated Counter Component for Section 10 (Club Statistics)
function AnimatedStatNumber({ value, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => setCount(Math.round(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={elRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  const [loggedInMember, setLoggedInMember] = useState(null);
  const [projectFilter, setProjectFilter] = useState('ALL');
  const [activeSection, setActiveSection] = useState('home');

  const scrollProgressRef = useRef(0);
  const heroRef = useRef(null);
  const mainRef = useRef(null);

  const openModal = (type, item = null) => {
    setSelectedModalItem(item);
    setActiveModal(type);
  };

  const handleSelectSection = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -92; // Offset for floating navbar island
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  // ScrollSpy to update active navbar indicator as user scrolls
  useEffect(() => {
    const navSectionIds = ['home', 'about', 'projects', 'teams', 'events', 'achievements'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = navSectionIds.length - 1; i >= 0; i--) {
        const id = navSectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP ScrollTrigger setup for Hero Headline Line-by-Line Reveal, Robot Scroll Sync & Section Entrances
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero Headline Line-by-Line Intro Reveal
      gsap.fromTo(
        '.hero-line-reveal',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power4.out',
          delay: 0.15,
        }
      );

      // Scroll-linked progress for 3D Robot rotation & parallax
      if (heroRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        });
      }

      // Section Reveals
      gsap.utils.toArray('.gsap-section-reveal').forEach((section) => {
        gsap.fromTo(
          section,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const filteredProjects =
    projectFilter === 'ALL'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.status === projectFilter);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#F3F0E8] text-[#111111] flex flex-col">
      {/* 60FPS GSAP Precision Crosshair Cursor with Live Coordinates */}
      <TechnicalCursor />

      {/* High-Impact Industrial Robotics Boot Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      {/* =====================================================================
          04. STICKY NAVIGATION BAR
         ===================================================================== */}
      <Navbar
        onOpenModal={(type) => openModal(type)}
        loggedInMember={loggedInMember}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      <main className="flex-1 pt-20 sm:pt-24">
        {/* =====================================================================
            05. HERO SECTION — THE 3D ROBOT EXPERIENCE
           ===================================================================== */}
        <section
          id="home"
          ref={heroRef}
          className="relative min-h-[calc(100vh-76px)] bg-blueprint-grid border-b-[4px] border-[#111111] flex flex-col justify-between overflow-hidden"
        >
          {/* Top Engineering Coordinate Ruler Bar */}
          <div className="border-b-[2px] border-[#111111] bg-[#F3F0E8]/90 px-4 sm:px-6 lg:px-10 py-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 bg-[#C7FF35] border border-[#111111]" />
              <span>{CLUB_META.division}</span>
              <span className="hidden md:inline text-[#111111]/50">//</span>
              <span className="hidden md:inline">{CLUB_META.tagline}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-[#111111] text-[#C7FF35] px-2 py-0.5">{CLUB_META.established}</span>
              <span>{CLUB_META.location}</span>
              <span className="hidden sm:inline text-[#111111]/60">[{CLUB_META.coordinates}]</span>
            </div>
          </div>

          {/* Main Hero Grid: Left Editorial Typography / Center-Right 3D Robot */}
          <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center flex-1">
            {/* LEFT COLUMN: Oversized Editorial Headline & Technical Controls */}
            <div className="lg:col-span-6 z-10 space-y-6">
              {/* Technical Status Pill */}
              <div className="inline-flex items-center gap-2.5 border-[3px] border-[#111111] bg-[#F3F0E8] px-3.5 py-1.5 brutal-shadow">
                <Crosshair className="w-4 h-4 text-[#111111]" />
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
                  {CLUB_META.unitCode} • {CLUB_META.systemStatus} • {CLUB_META.motionStatus}
                </span>
              </div>

              {/* Oversized Editorial Headline with Line-by-Line Reveal */}
              <h1 className="font-display font-extrabold text-[3.1rem] sm:text-[4.5rem] xl:text-[5.4rem] uppercase tracking-tight leading-[0.9] text-[#111111]">
                <span className="block overflow-hidden pb-1">
                  <span className="hero-line-reveal block">WE DON&apos;T JUST</span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span className="hero-line-reveal block">
                    <span className="bg-[#C7FF35] px-3 border-[3px] border-[#111111] inline-block shadow-[5px_5px_0px_#111111]">
                      BUILD ROBOTS.
                    </span>
                  </span>
                </span>
                <span className="block overflow-hidden pb-1 mt-1">
                  <span className="hero-line-reveal block">WE BUILD</span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span className="hero-line-reveal block">
                    WHAT&apos;S{' '}
                    <span className="bg-[#111111] text-[#C7FF35] px-3 border-[3px] border-[#111111] inline-block">
                      NEXT.
                    </span>
                  </span>
                </span>
              </h1>

              {/* Sub-copy & Engineering Telemetry */}
              <p className="text-base sm:text-lg font-medium text-[#111111] max-w-xl leading-relaxed border-l-[4px] border-[#111111] pl-4 bg-[#F3F0E8]/80">
                An experimental student robotics laboratory &amp; industrial hardware collective in{' '}
                <strong className="font-bold underline decoration-[#C7FF35] decoration-4">
                  Odisha, India
                </strong>
                . Designing autonomous rovers, 6-DOF manipulators, and embedded intelligence.
              </p>

              {/* Hero CTA Buttons (Hovering triggers 3D Robot reaction & Magnetic pull) */}
              <div
                className="flex flex-wrap items-center gap-4 pt-2"
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
              >
                <Magnetic strength={0.3}>
                  <button
                    type="button"
                    onClick={() => handleSelectSection('projects')}
                    className="brutal-btn px-7 py-4 bg-[#111111] text-[#C7FF35] hover:bg-[#C7FF35] hover:text-[#111111] font-mono text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <span>[ EXPLORE PROJECTS → ]</span>
                  </button>
                </Magnetic>

                <Magnetic strength={0.3}>
                  <button
                    type="button"
                    onClick={() => openModal('join')}
                    className="brutal-btn px-7 py-4 bg-[#C7FF35] text-[#111111] hover:bg-[#F3F0E8] font-mono text-sm font-extrabold uppercase tracking-wider cursor-pointer"
                  >
                    [ JOIN THE CLUB ]
                  </button>
                </Magnetic>
              </div>

              {/* Technical Spec Readout Bar */}
              <div className="grid grid-cols-3 gap-2 pt-3 max-w-lg font-mono text-[11px]">
                <div className="border-2 border-[#111111] bg-[#F3F0E8] p-2.5">
                  <div className="text-[#111111]/60 font-bold">CHASSIS_SPEC</div>
                  <div className="font-extrabold uppercase mt-0.5">6061-T6 ALUM</div>
                </div>
                <div className="border-2 border-[#111111] bg-[#B8B6AC]/60 p-2.5">
                  <div className="text-[#111111]/60 font-bold">CONTROL_STACK</div>
                  <div className="font-extrabold uppercase mt-0.5">ROS2 / STM32</div>
                </div>
                <div className="border-2 border-[#111111] bg-[#C7FF35] p-2.5">
                  <div className="text-[#111111]/70 font-bold">TELEMETRY</div>
                  <div className="font-extrabold uppercase mt-0.5">60FPS 3D ACTIVE</div>
                </div>
              </div>
            </div>

            {/* CENTER-RIGHT COLUMN: Interactive 3D Mechanical Robot */}
            <div className="lg:col-span-6 relative">
              <Suspense
                fallback={
                  <div className="w-full h-[460px] sm:h-[540px] lg:h-[640px] border-[3px] border-[#111111] bg-[#222222] text-[#C7FF35] flex flex-col items-center justify-center p-8 brutal-shadow-lg font-mono">
                    <Activity className="w-10 h-10 animate-spin mb-3" />
                    <div className="text-sm font-extrabold uppercase tracking-widest">
                      INITIALIZING UNIT_001 3D KINEMATIC RIG...
                    </div>
                    <div className="text-xs text-[#B8B6AC] mt-1">
                      LOADING SHADERS, SERVO JOINTS &amp; OPTICAL SENSORS
                    </div>
                  </div>
                }
              >
                <Robot3DScene
                  isHeroHovered={isHeroHovered}
                  scrollProgressRef={scrollProgressRef}
                />
              </Suspense>
            </div>
          </div>

          {/* Bottom Blueprint Measurement Footer */}
          <div className="border-t-[2px] border-[#111111] bg-[#B8B6AC]/40 px-4 sm:px-6 lg:px-10 py-2 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-widest">
            <span>SCALE 1:1 // METRIC (MM)</span>
            <span className="hidden sm:inline">
              CURSOR TRACKING: ENABLED • SCROLL PARALLAX: LINKED
            </span>
            <span>REV_4.02 // ODISHA_LAB</span>
          </div>
        </section>

        {/* =====================================================================
            06. ANIMATED MARQUEE
           ===================================================================== */}
        <section
          aria-label="Engineering Mantra Marquee"
          className="bg-[#111111] text-[#C7FF35] border-b-[4px] border-[#111111] py-4 overflow-hidden select-none"
        >
          <div className="animate-marquee flex items-center">
            {[0, 1, 2, 3].map((groupIndex) => (
              <div key={groupIndex} className="flex items-center shrink-0">
                {['BUILD', 'EXPERIMENT', 'BREAK', 'REBUILD', 'INNOVATE', 'REPEAT'].map(
                  (word, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight uppercase px-5">
                        {word}
                      </span>
                      <span className="inline-block w-3.5 h-3.5 bg-[#C7FF35] border-2 border-[#F3F0E8] rotate-45" />
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            07. ABOUT SECTION — 01 / WHO WE ARE
           ===================================================================== */}
        <section
          id="about"
          className="gsap-section-reveal py-20 lg:py-28 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b-[4px] border-[#111111]"
        >
          {/* Section Index Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-[#111111] pb-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-extrabold bg-[#111111] text-[#C7FF35] px-3 py-1">
                01 / WHO WE ARE
              </span>
              <span className="font-mono text-xs font-bold uppercase text-[#111111]/70">
                // LAB DOSSIER &amp; PHILOSOPHY
              </span>
            </div>
            <span className="font-mono text-xs font-bold uppercase">
              DOC_REF: SCR_ABOUT_20XX
            </span>
          </div>

          {/* Asymmetric Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column (7 Cols): Oversized Heading, Editorial Copy & Interactive Mechanical Illustration */}
            <div className="lg:col-span-7 space-y-8">
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl uppercase tracking-tight leading-[0.92]">
                CURIOUS MINDS.
                <br />
                <span className="bg-[#C7FF35] px-3 border-[3px] border-[#111111] inline-block mt-2 brutal-shadow">
                  ENGINEERING
                </span>{' '}
                THE IMPOSSIBLE.
              </h2>

              <div className="space-y-4 text-base sm:text-lg font-medium leading-relaxed text-[#111111] max-w-2xl">
                <p>
                  <strong>Scrabotics</strong> is a student-driven robotics community focused on
                  engineering, creativity and experimentation.
                </p>
                <p>
                  We bring together curious minds who enjoy designing, building and developing
                  innovative robotic systems.
                </p>
                <p>
                  Through collaborative projects, competitions and technical exploration, we turn
                  ambitious ideas into working machines.
                </p>
              </div>

              {/* Interactive Mechanical Gear & Servo Testbench Illustration */}
              <MechanicalSchematic />
            </div>

            {/* Right Column (5 Cols): Real Robotics Workshop Photography + Technical Annotations */}
            <div className="lg:col-span-5 space-y-6">
              <div className="brutal-card bg-[#222222] p-3 relative">
                {/* Top Blueprint Annotation Tag */}
                <div className="bg-[#C7FF35] text-[#111111] border-2 border-[#111111] px-3 py-1 font-mono text-[11px] font-extrabold uppercase inline-flex items-center gap-2 mb-3">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>FIG 01.A // HARDWARE FABRICATION BAY</span>
                </div>

                <div className="relative overflow-hidden border-[3px] border-[#111111] bg-[#111111]">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                    alt="Scrabotics engineers assembling robotic hardware in workshop"
                    loading="lazy"
                    className="w-full h-[360px] sm:h-[420px] object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-500"
                  />
                  {/* Corner Reticle Overlay */}
                  <div className="absolute bottom-3 right-3 bg-[#111111]/90 text-[#C7FF35] border border-[#C7FF35] px-2.5 py-1 font-mono text-[10px] font-bold">
                    CAM_02 // PROTOTYPE BENCH
                  </div>
                </div>

                {/* Technical Annotations Footer */}
                <div className="grid grid-cols-2 gap-2 mt-3 font-mono text-xs text-[#F3F0E8]">
                  <div className="border border-[#B8B6AC]/30 bg-[#111111] p-3">
                    <div className="text-[10px] text-[#B8B6AC]">METHODOLOGY</div>
                    <div className="font-bold text-[#C7FF35] mt-0.5">CAD → PCB → FIRMWARE</div>
                  </div>
                  <div className="border border-[#B8B6AC]/30 bg-[#111111] p-3">
                    <div className="text-[10px] text-[#B8B6AC]">LAB CULTURE</div>
                    <div className="font-bold text-[#F3F0E8] mt-0.5">100% STUDENT BUILT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            08. WHAT WE DO — 02 / OUR EXPERTISE
           ===================================================================== */}
        <section className="gsap-section-reveal py-20 lg:py-28 bg-[#F3F0E8] border-b-[4px] border-[#111111]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-[#111111] pb-4 mb-10">
              <span className="font-mono text-sm font-extrabold bg-[#C7FF35] text-[#111111] border-2 border-[#111111] px-3 py-1">
                02 / OUR EXPERTISE
              </span>
              <span className="font-mono text-xs font-bold uppercase">
                CORE ENGINEERING PILLARS // 01—04
              </span>
            </div>

            <div className="mb-12">
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
                IDEAS INTO{' '}
                <span className="bg-[#111111] text-[#C7FF35] px-3 inline-block">
                  ENGINEERED REALITY.
                </span>
              </h2>
            </div>

            {/* Four Asymmetric Brutalist Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {EXPERTISE_ITEMS.map((item) => (
                <motion.article
                  key={item.id}
                  whileHover={{ y: -4 }}
                  className={`${item.spanClass} ${item.bgClass} brutal-card p-7 sm:p-9 flex flex-col justify-between group hover:bg-[#C7FF35] hover:text-[#111111] transition-colors`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <span className="font-display font-extrabold text-5xl sm:text-6xl leading-none">
                        {item.id}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 border-2 border-current">
                          {item.code}
                        </span>
                        <div className="w-10 h-10 border-2 border-[#111111] bg-[#111111] text-[#C7FF35] flex items-center justify-center group-hover:rotate-45 transition-transform">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="font-mono text-xs font-bold uppercase opacity-75 mb-1">
                      {item.subtitle}
                    </div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-4xl uppercase mb-4">
                      {item.id} — {item.title}
                    </h3>
                    <p className="text-base font-medium leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-8 mt-6 border-t-2 border-current/20">
                    {item.specs.map((spec) => (
                      <span
                        key={spec}
                        className="font-mono text-[11px] font-bold uppercase px-2.5 py-1 border-2 border-[#111111] bg-[#F3F0E8] text-[#111111]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            09. FEATURED PROJECTS — 03 / SELECTED BUILDS
           ===================================================================== */}
        <section
          id="projects"
          className="gsap-section-reveal py-20 lg:py-28 bg-blueprint-grid border-b-[4px] border-[#111111]"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-[#111111] pb-4 mb-10">
              <span className="font-mono text-sm font-extrabold bg-[#111111] text-[#C7FF35] px-3 py-1">
                03 / SELECTED BUILDS
              </span>
              <span className="font-mono text-xs font-bold uppercase">
                HARDWARE ARCHIVE // CLICK ANY UNIT FOR FULL CAD DOSSIER
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
                BUILT BY US.
                <br />
                <span className="bg-[#C7FF35] px-3 border-[3px] border-[#111111] inline-block mt-2 brutal-shadow">
                  POWERED BY CURIOSITY.
                </span>
              </h2>

              {/* Interactive Status Filter */}
              <div className="flex flex-wrap gap-2">
                {['ALL', 'FIELD TESTING', 'COMPETITION READY', 'ACTIVE PROTOTYPE', 'DEPLOYED IN LAB'].map(
                  (status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setProjectFilter(status)}
                      className={`px-3 py-2 font-mono text-xs font-bold uppercase border-[2px] border-[#111111] cursor-pointer transition-colors ${
                        projectFilter === status
                          ? 'bg-[#111111] text-[#C7FF35]'
                          : 'bg-[#F3F0E8] text-[#111111] hover:bg-[#C7FF35]'
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Asymmetric Editorial Project Grid with 3D Tilt & Interactive CAD Blueprint Toggle */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {filteredProjects.map((project) => (
                <TiltProjectCard
                  key={project.id}
                  project={project}
                  onInspect={(p) => openModal('project', p)}
                  className={project.layout}
                />
              ))}
            </div>

            {/* Bottom View All Projects CTA */}
            <div className="mt-12 flex justify-center">
              <Magnetic strength={0.3}>
                <button
                  type="button"
                  onClick={() => {
                    setProjectFilter('ALL');
                    openModal('project', PROJECTS_DATA[0]);
                  }}
                  className="brutal-btn px-8 py-4 bg-[#C7FF35] text-[#111111] font-mono text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[5px_5px_0_0_#111111]"
                >
                  <span>VIEW ALL PROJECTS →</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* =====================================================================
            10. CLUB STATISTICS — FULL-WIDTH BLACK SECTION
           ===================================================================== */}
        <section
          aria-label="Club Telemetry Statistics"
          className="bg-[#111111] text-[#F3F0E8] border-b-[4px] border-[#111111] py-20 lg:py-24"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#F3F0E8]/20 pb-4 mb-12 font-mono text-xs">
              <span className="text-[#C7FF35] font-bold uppercase">
                // SCRABOTICS LIVE METRICS TELEMETRY
              </span>
              <span className="text-[#B8B6AC]">
                SAMPLE VALUES — CONFIGURED FOR CMS DATABASE SYNC
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CLUB_STATS.map((stat) => (
                <div
                  key={stat.id}
                  className="border-[3px] border-[#F3F0E8] bg-[#222222] p-7 brutal-shadow-lime flex flex-col justify-between"
                >
                  <div className="font-mono text-[11px] text-[#B8B6AC] uppercase mb-4">
                    {stat.code}
                  </div>
                  <div
                    className={`font-display font-extrabold text-6xl sm:text-7xl tracking-tight leading-none ${
                      stat.accent ? 'text-[#C7FF35]' : 'text-[#F3F0E8]'
                    }`}
                  >
                    <AnimatedStatNumber
                      value={stat.value}
                      prefix={stat.prefix || ''}
                      suffix={stat.suffix || ''}
                    />
                  </div>
                  <div className="font-mono text-sm font-extrabold uppercase tracking-wider mt-4 pt-3 border-t border-[#F3F0E8]/20">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            11. TEAMS SECTION — 04 / OUR PEOPLE
           ===================================================================== */}
        <section
          id="teams"
          className="gsap-section-reveal py-20 lg:py-28 bg-[#F3F0E8] border-b-[4px] border-[#111111]"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-[#111111] pb-4 mb-10">
              <span className="font-mono text-sm font-extrabold bg-[#C7FF35] text-[#111111] border-2 border-[#111111] px-3 py-1">
                04 / OUR PEOPLE
              </span>
              <span className="font-mono text-xs font-bold uppercase">
                5 SPECIALIZED ENGINEERING DIVISIONS
              </span>
            </div>

            <div className="mb-12">
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
                DIFFERENT MINDS.
                <br />
                <span className="bg-[#111111] text-[#C7FF35] px-3 inline-block mt-2">
                  ONE ENGINEERING SPIRIT.
                </span>
              </h2>
            </div>

            {/* Creative Editorial Team Layouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {TEAMS_DATA.map((team, idx) => {
                const spanClass = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
                return (
                  <article
                    key={team.id}
                    className={`${spanClass} brutal-card bg-[#F3F0E8] flex flex-col justify-between overflow-hidden group`}
                  >
                    <div>
                      <div className="relative h-56 overflow-hidden border-b-[3px] border-[#111111] bg-[#222222]">
                        <img
                          src={team.image}
                          alt={team.name}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#111111] text-[#C7FF35] px-2.5 py-1 font-mono text-xs font-extrabold">
                          UNIT {team.index}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="font-mono text-[11px] font-bold uppercase text-[#111111]/70 mb-1">
                          {team.divisionCode}
                        </div>
                        <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase mb-2 group-hover:bg-[#C7FF35] group-hover:inline-block group-hover:px-1.5">
                          {team.name}
                        </h3>
                        <p className="text-sm font-medium leading-relaxed text-[#111111] mb-4">
                          {team.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t-2 border-[#111111]/15">
                      <div className="flex flex-wrap gap-1.5">
                        {team.tools.map((tool) => (
                          <span
                            key={tool}
                            className="font-mono text-[11px] font-bold px-2 py-0.5 border border-[#111111] bg-[#B8B6AC]/50"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            12. EVENTS AND WORKSHOPS — 05 / WHAT'S HAPPENING
           ===================================================================== */}
        <section
          id="events"
          className="gsap-section-reveal py-20 lg:py-28 bg-[#B8B6AC] border-b-[4px] border-[#111111]"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-[#111111] pb-4 mb-10">
              <span className="font-mono text-sm font-extrabold bg-[#111111] text-[#C7FF35] px-3 py-1">
                05 / WHAT&apos;S HAPPENING
              </span>
              <span className="font-mono text-xs font-bold uppercase">
                WORKSHOPS • ARENA TRIALS • TECHNICAL SESSIONS
              </span>
            </div>

            <div className="mb-12">
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
                WHERE IDEAS{' '}
                <span className="bg-[#C7FF35] px-3 border-[3px] border-[#111111] inline-block brutal-shadow">
                  MEET ACTION.
                </span>
              </h2>
            </div>

            {/* Bold Editorial Event Rows */}
            <div className="space-y-4">
              {EVENTS_DATA.map((evt) => (
                <div
                  key={evt.id}
                  className="brutal-card bg-[#F3F0E8] p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center hover:bg-[#C7FF35] transition-colors"
                >
                  <div className="lg:col-span-2 font-mono">
                    <span className="inline-block bg-[#111111] text-[#C7FF35] px-2.5 py-1 text-xs font-extrabold">
                      {evt.code}
                    </span>
                    <div className="text-xs font-bold uppercase mt-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="font-mono text-xs font-extrabold uppercase text-[#111111]/70">
                      {evt.type}
                    </div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase mt-0.5">
                      {evt.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-3 font-mono text-xs font-bold flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{evt.location}</span>
                  </div>

                  <div className="lg:col-span-2 flex lg:justify-end">
                    <button
                      type="button"
                      onClick={() => openModal('event', evt)}
                      className="w-full lg:w-auto px-4 py-3 border-[3px] border-[#111111] bg-[#111111] text-[#C7FF35] hover:bg-[#F3F0E8] hover:text-[#111111] font-mono text-xs font-extrabold uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{evt.status}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            13. ACHIEVEMENTS — 06 / OUR MILESTONES (STRICTLY PLACEHOLDERS)
           ===================================================================== */}
        <section
          id="achievements"
          className="gsap-section-reveal py-20 lg:py-28 bg-graphite-grid text-[#F3F0E8] border-b-[4px] border-[#111111]"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-[#F3F0E8]/30 pb-4 mb-10">
              <span className="font-mono text-sm font-extrabold bg-[#C7FF35] text-[#111111] px-3 py-1">
                06 / OUR MILESTONES
              </span>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#C7FF35]">
                <ShieldAlert className="w-4 h-4" />
                <span>VERIFIED PLACEHOLDER SLOTS — READY FOR OFFICIAL CLUB RECORDS</span>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
                MADE TO COMPETE.
                <br />
                <span className="bg-[#C7FF35] text-[#111111] px-3 inline-block mt-2">
                  BUILT TO ACHIEVE.
                </span>
              </h2>
            </div>

            {/* Engineering Portfolio Milestone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACHIEVEMENTS_DATA.map((item) => (
                <div
                  key={item.id}
                  className="border-[3px] border-[#F3F0E8] bg-[#111111] p-7 brutal-shadow-lime flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-xs mb-4">
                      <span className="bg-[#C7FF35] text-[#111111] px-2 py-0.5 font-extrabold">
                        {item.code}
                      </span>
                      <span className="text-[#B8B6AC]">{item.year}</span>
                    </div>
                    <div className="font-mono text-xs font-bold text-[#C7FF35] uppercase mb-1">
                      {item.category}
                    </div>
                    <h3 className="font-display font-extrabold text-2xl uppercase text-[#F3F0E8] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#B8B6AC] leading-relaxed">{item.description}</p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#F3F0E8]/20 font-mono text-[10px] font-bold uppercase text-[#C7FF35]">
                    STATUS: {item.placeholderTag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            14. JOIN SCRABOTICS — FULL-WIDTH ACID-LIME CTA SECTION
           ===================================================================== */}
        <section className="relative bg-[#C7FF35] text-[#111111] border-b-[4px] border-[#111111] py-20 lg:py-28 overflow-hidden">
          {/* Subtle Moving Technical Lines & Animated Mechanical Components */}
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#111111] text-[#C7FF35] px-3.5 py-1.5 font-mono text-xs font-extrabold uppercase">
                  <Cpu className="w-4 h-4" />
                  <span>RECRUITMENT &amp; COLLABORATION TERMINAL OPEN</span>
                </div>

                <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9]">
                  YOUR NEXT
                  <br />
                  BUILD STARTS HERE.
                </h2>

                <p className="text-lg sm:text-xl font-bold max-w-2xl leading-relaxed">
                  Have an idea? Love building things? Want to explore robotics and engineering?
                  Join a community where curiosity becomes creation.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => openModal('join')}
                    className="brutal-btn px-9 py-5 bg-[#111111] text-[#C7FF35] hover:bg-[#F3F0E8] hover:text-[#111111] font-mono text-base font-extrabold uppercase tracking-wider flex items-center gap-3 cursor-pointer"
                  >
                    <span>JOIN SCRABOTICS →</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openModal('contact')}
                    className="brutal-btn px-7 py-5 bg-[#F3F0E8] text-[#111111] font-mono text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>PARTNER / CONTACT LAB</span>
                  </button>
                </div>
              </div>

              {/* Animated Mechanical Schematic Stamp on Right */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-64 h-64 sm:w-72 sm:h-72 border-[4px] border-[#111111] bg-[#F3F0E8] brutal-shadow-lg flex flex-col items-center justify-center p-6 relative">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-36 h-36 animate-[spin_18s_linear_infinite]"
                    aria-hidden="true"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      fill="none"
                      stroke="#111111"
                      strokeWidth="6"
                      strokeDasharray="14 8"
                    />
                    <circle cx="60" cy="60" r="34" fill="#111111" />
                    <circle cx="60" cy="60" r="14" fill="#C7FF35" />
                    <line x1="60" y1="6" x2="60" y2="114" stroke="#111111" strokeWidth="4" />
                    <line x1="6" y1="60" x2="114" y2="60" stroke="#111111" strokeWidth="4" />
                  </svg>
                  <div className="font-mono text-[11px] font-extrabold uppercase mt-3 text-center">
                    SCRABOTICS LAB SEAL // ODISHA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          15. FOOTER
         ===================================================================== */}
      <footer className="bg-[#111111] text-[#F3F0E8] pt-16 pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b-2 border-[#F3F0E8]/20">
            {/* Brand & Statement */}
            <div className="lg:col-span-5 space-y-5">
              <ScraboticsLogo inverted />
              <div className="font-display font-extrabold text-3xl sm:text-4xl uppercase text-[#C7FF35] leading-tight pt-2">
                BUILT WITH CURIOSITY.
                <br />
                DRIVEN BY ENGINEERING.
              </div>
              <p className="font-mono text-xs text-[#B8B6AC] max-w-sm">
                OFFICIAL ROBOTICS &amp; ENGINEERING CLUB • ODISHA, INDIA. READY FOR SCRABOTICS CLUB
                MANAGEMENT SYSTEM INTEGRATION.
              </p>
            </div>

            {/* Navigation Directory */}
            <div className="lg:col-span-3 space-y-3 font-mono text-xs">
              <div className="text-[#C7FF35] font-extrabold uppercase tracking-wider mb-3">
                01 // DIRECTORY
              </div>
              <ul className="space-y-2.5 font-bold uppercase">
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectSection('about')}
                    className="hover:text-[#C7FF35] transition-colors cursor-pointer text-left uppercase font-mono"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectSection('projects')}
                    className="hover:text-[#C7FF35] transition-colors cursor-pointer text-left uppercase font-mono"
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectSection('teams')}
                    className="hover:text-[#C7FF35] transition-colors cursor-pointer text-left uppercase font-mono"
                  >
                    Teams
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectSection('events')}
                    className="hover:text-[#C7FF35] transition-colors cursor-pointer text-left uppercase font-mono"
                  >
                    Events
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectSection('achievements')}
                    className="hover:text-[#C7FF35] transition-colors cursor-pointer text-left uppercase font-mono"
                  >
                    Achievements
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openModal('contact')}
                    className="hover:text-[#C7FF35] uppercase cursor-pointer text-left font-mono"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Socials & Terminal Access */}
            <div className="lg:col-span-4 space-y-4 font-mono text-xs">
              <div className="text-[#C7FF35] font-extrabold uppercase tracking-wider">
                02 // EXTERNAL COMMS
              </div>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-[#F3F0E8] p-3 hover:bg-[#C7FF35] hover:text-[#111111] hover:border-[#C7FF35] transition-colors flex flex-col items-center gap-1.5 font-bold"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-[#F3F0E8] p-3 hover:bg-[#C7FF35] hover:text-[#111111] hover:border-[#C7FF35] transition-colors flex flex-col items-center gap-1.5 font-bold"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-[#F3F0E8] p-3 hover:bg-[#C7FF35] hover:text-[#111111] hover:border-[#C7FF35] transition-colors flex flex-col items-center gap-1.5 font-bold"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => openModal('login')}
                className="w-full py-3 border-2 border-[#C7FF35] text-[#C7FF35] hover:bg-[#C7FF35] hover:text-[#111111] font-extrabold uppercase transition-colors cursor-pointer"
              >
                MEMBER CMS LOGIN TERMINAL →
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="w-full py-2.5 border-2 border-[#B8B6AC] text-[#B8B6AC] hover:border-[#C7FF35] hover:text-[#C7FF35] font-extrabold uppercase transition-colors cursor-pointer text-center text-[11px]"
              >
                [ ↺ REPLAY SYSTEM BOOT SEQUENCE ]
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#B8B6AC]">
            <span>© {new Date().getFullYear()} SCRABOTICS ENGINEERING DIVISION. ALL RIGHTS RESERVED.</span>
            <span>PALETTE: #F3F0E8 • #111111 • #C7FF35</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals for Login, Join, Event Registration, Project Dossier & Contact */}
      <InteractiveModals
        activeModal={activeModal}
        selectedItem={selectedModalItem}
        onClose={() => setActiveModal(null)}
        onLoginSuccess={(callSign) => setLoggedInMember(callSign)}
      />
    </div>
  );
}
