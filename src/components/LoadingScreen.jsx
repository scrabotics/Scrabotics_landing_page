import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Cpu, ArrowRight, Activity, Terminal } from 'lucide-react';

const BOOT_LOGS = [
  'INITIALIZING UNIT_001 KINEMATIC RIG...',
  'CALIBRATING 6061-T6 ALUMINUM DELTOIDS & GREADBOXES...',
  'STARTING 360° RPLIDAR SCANNING TURRET...',
  'ESTABLISHING ROS2 HUMBLE TELEMETRY BUS...',
  'SYSTEM READY // ENTERING SCRABOTICS LAB.',
];

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onLoadingComplete();
      return;
    }

    const duration = 2100; // 2.1s high-impact boot sequence
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      const idx = Math.min(
        BOOT_LOGS.length - 1,
        Math.floor((pct / 100) * BOOT_LOGS.length)
      );
      setLogIndex(idx);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 650);
        }, 250);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const handleSkip = () => {
    setIsDone(true);
    setTimeout(onLoadingComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isDone ? (
        <motion.div
          key="loader-main"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-[#F3F0E8] text-[#111111] flex flex-col justify-between p-6 sm:p-12 border-b-[6px] border-[#111111] bg-blueprint-grid select-none"
        >
          {/* Top Bar: Institutional Identification & Skip */}
          <div className="flex items-center justify-between border-b-[3px] border-[#111111] pb-4 font-mono text-xs font-bold uppercase tracking-wider">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#C7FF35] border-2 border-[#111111] inline-block animate-pulse" />
              <span className="bg-[#111111] text-[#C7FF35] px-2.5 py-1">
                SCRABOTICS // BOOT PROTOCOL
              </span>
              <span className="hidden sm:inline text-[#111111]/50">//</span>
              <span className="hidden sm:inline">ODISHA, INDIA</span>
            </div>

            <button
              type="button"
              onClick={handleSkip}
              className="px-3 py-1 bg-[#111111] text-[#C7FF35] hover:bg-[#C7FF35] hover:text-[#111111] border-2 border-[#111111] transition-colors flex items-center gap-1 text-[11px] font-mono font-extrabold cursor-pointer"
            >
              <span>[ SKIP BOOT ]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Centerpiece: Brutalist Radar Aperture + Monolithic Progress Display */}
          <div className="my-auto max-w-2xl mx-auto w-full text-center space-y-6">
            {/* Mechanical Turret Gear & Crosshair graphic */}
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 mx-auto border-[4px] border-[#111111] bg-[#F3F0E8] shadow-[8px_8px_0_0_#111111] flex items-center justify-center p-4">
              {/* Outer Rotating Gear */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-[spin_8s_linear_infinite]"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="5"
                  strokeDasharray="12 6"
                />
                <circle cx="50" cy="50" r="28" fill="#111111" />
                <circle cx="50" cy="50" r="10" fill="#C7FF35" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="#111111" strokeWidth="3" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="#111111" strokeWidth="3" />
              </svg>

              {/* Pulsing Status Core in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Crosshair className="w-8 h-8 text-[#C7FF35] animate-pulse" />
              </div>

              {/* Corner Bolt Rivets */}
              <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-[#111111]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#111111]" />
              <span className="absolute bottom-1.5 left-1.5 w-2 h-2 bg-[#111111]" />
              <span className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-[#111111]" />
            </div>

            {/* Huge Monolithic Counter */}
            <div className="space-y-2">
              <div className="font-display font-extrabold text-6xl sm:text-8xl tracking-tight leading-none text-[#111111]">
                <span className="bg-[#C7FF35] px-4 border-[3px] border-[#111111] inline-block shadow-[6px_6px_0_0_#111111]">
                  {String(progress).padStart(2, '0')}%
                </span>
              </div>
              <div className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#111111] pt-1">
                &gt; {BOOT_LOGS[logIndex]}
              </div>
            </div>

            {/* Brutalist Segmented Progress Track */}
            <div className="border-[3px] border-[#111111] bg-[#111111] p-1 shadow-[5px_5px_0_0_#111111] max-w-lg mx-auto">
              <div className="h-4 bg-[#222222] relative overflow-hidden">
                <div
                  className="h-full bg-[#C7FF35] transition-all duration-75 ease-out flex items-center justify-end pr-1"
                  style={{ width: `${progress}%` }}
                >
                  <span className="w-2 h-2 bg-[#111111] inline-block" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="border-t-[3px] border-[#111111] pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] font-bold uppercase text-[#111111]/70">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#111111]">
                <Cpu className="w-4 h-4 text-[#111111]" />
                UNIT_001 RIG
              </span>
              <span className="flex items-center gap-1.5 text-[#111111]">
                <Activity className="w-4 h-4 text-[#111111]" />
                VOLTAGE: 48.2V DC
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>GIFT ROBOTICS ENGINEERING LAB</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
