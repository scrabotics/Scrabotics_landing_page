import React, { useState } from 'react';
import {
  ArrowUpRight,
  Activity,
  Cpu,
  Layers,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import Robot3DScene from './Robot3DScene';
import { CLUB_INFO } from '../data/projects';

export default function Hero({
  onExploreWork,
  onOpenJoinModal,
  scrollProgressRef,
}) {
  const [robotState, setRobotState] = useState('ACTIVE');

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#090D12]">
      {/* 1. Refined Ambient Lighting & Background Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Soft Electric Cyan Halo behind the humanoid */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full opacity-45"
          style={{
            background:
              'radial-gradient(circle, rgba(0, 200, 232, 0.22) 0%, rgba(128, 101, 216, 0.08) 42%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Clean Engineering Grid lines */}
        <div className="absolute inset-x-8 top-24 h-px bg-white/[0.06]" />
        <div className="absolute inset-x-8 bottom-16 h-px bg-white/[0.06]" />
      </div>

      {/* 2. Laboratory Status Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto w-full mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1520] border border-[#00C8E8]/30 font-mono text-[10px] text-[#00C8E8] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] animate-pulse" />
            <span>LAB PROTOCOL // UNIT_001</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-[#F1F0EA]/50 tracking-wider">
            ROBOTICS CLUB • GIFT AUTONOMOUS COLLEGE
          </span>
        </div>

        {/* State Selector */}
        <div className="flex items-center gap-1 bg-[#0D141F] p-1 rounded-full border border-white/10">
          {['IDLE', 'SCAN', 'ACTIVE'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setRobotState(mode)}
              className={`px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                robotState === mode
                  ? 'bg-[#00C8E8] text-[#090D12] font-bold shadow-[0_0_12px_rgba(0,200,232,0.35)]'
                  : 'text-[#F1F0EA]/60 hover:text-[#F1F0EA]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Centerpiece Stage: Monolithic Typography + 3D Humanoid Robot + Professional Telemetry Cards */}
      <div className="relative z-10 flex-1 flex items-center justify-center max-w-7xl mx-auto w-full min-h-[560px] sm:min-h-[620px]">
        {/* Giant Monolithic Watermark Typography (Behind Robot) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0"
        >
          <div className="font-display font-black text-[18vw] lg:text-[13rem] xl:text-[15.5rem] tracking-[-0.07em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#F1F0EA]/[0.12] to-transparent leading-none whitespace-nowrap">
            SCRABOTICS
          </div>
        </div>

        {/* 3D Humanoid Robot Canvas (Center Stage) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
          <div className="w-full h-full max-w-[980px] max-h-[680px]">
            <Robot3DScene
              systemState={robotState}
              scrollProgressRef={scrollProgressRef}
              onRobotEngage={() =>
                setRobotState((prev) => (prev === 'ACTIVE' ? 'SCAN' : 'ACTIVE'))
              }
            />
          </div>
        </div>

        {/* Left Editorial Column */}
        <div className="relative z-20 mr-auto max-w-sm sm:max-w-md pointer-events-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#8065D8]/15 border border-[#8065D8]/30 text-[#F1F0EA]/90 font-mono text-[10px] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8]" />
            <span>Human-Centred Robotics Research</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.6rem] leading-[1.02] tracking-[-0.035em] text-[#F1F0EA]">
            BUILDING THE{' '}
            <span className="text-[#00C8E8] drop-shadow-[0_0_24px_rgba(0,200,232,0.35)]">
              FUTURE,
            </span>{' '}
            TOGETHER.
          </h1>

          <p className="text-sm sm:text-base text-[#F1F0EA]/75 leading-relaxed font-normal">
            Where human imagination meets intelligent machines. Students and
            researchers designing, building, and deploying real autonomous systems.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExploreWork}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00C8E8] text-[#090D12] font-display font-bold text-xs uppercase tracking-widest shadow-[0_0_24px_rgba(0,200,232,0.35)] hover:shadow-[0_0_32px_rgba(0,200,232,0.55)] transition-all duration-300 cursor-pointer"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={onOpenJoinModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F1622]/80 hover:bg-white/10 text-[#F1F0EA] border border-white/15 hover:border-[#00C8E8]/50 font-display font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              <span>JOIN THE CLUB</span>
            </button>
          </div>

          {/* Research Telemetry Card */}
          <div className="p-4 rounded-xl bg-[#0D141F]/80 backdrop-blur-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#F1F0EA]/50 uppercase tracking-widest">
              <span className="flex items-center gap-1.5 text-[#00C8E8]">
                <Activity className="w-3.5 h-3.5" />
                Control Loop Frequency
              </span>
              <span className="text-[#00C8E8] font-bold">1000 Hz</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#00C8E8] rounded-full w-[84%]" />
            </div>
            <div className="flex justify-between font-mono text-[9px] text-[#F1F0EA]/45">
              <span>LATENCY: &lt; 1.2 MS</span>
              <span>DDS JITTER: 0.04 MS</span>
            </div>
          </div>
        </div>

        {/* Right Research Specs Cards */}
        <div className="relative z-20 ml-auto hidden lg:flex flex-col gap-3.5 max-w-xs pointer-events-auto">
          {/* Platform Spec 1 */}
          <div className="p-4 rounded-xl bg-[#0D141F]/80 backdrop-blur-xl border border-white/10 space-y-1">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#00C8E8] uppercase tracking-wider">
              <span>HUMANOID PLATFORM</span>
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div className="font-display font-bold text-xl text-[#F1F0EA]">
              H1-AURA // BIOMECH
            </div>
            <p className="font-mono text-[10px] text-[#F1F0EA]/55 leading-relaxed">
              18 articulated degrees of freedom with tendon-driven actuators and
              integrated force-torque sensors.
            </p>
          </div>

          {/* Platform Spec 2 */}
          <div className="p-4 rounded-xl bg-[#0D141F]/80 backdrop-blur-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#F1F0EA]/60 uppercase tracking-wider">
              <span>ARCHITECTURE</span>
              <span className="text-[#00C8E8] font-semibold">ROS2 HUMBLE</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <div className="text-[#F1F0EA]/40 text-[9px]">BATTERY BUS</div>
                <div className="font-bold text-[#F1F0EA]">48V LiFePO4</div>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <div className="text-[#F1F0EA]/40 text-[9px]">VISION</div>
                <div className="font-bold text-[#F1F0EA]">Stereo Depth</div>
              </div>
            </div>
          </div>

          {/* Institutional Stamp */}
          <div className="p-3 rounded-lg bg-[#090D12]/90 border border-white/8 font-mono text-[10px] text-[#F1F0EA]/50 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#00C8E8]">
              <ShieldCheck className="w-3.5 h-3.5" />
              GIFT AUTONOMOUS
            </span>
            <span>LAB 402</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Footer Strip */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#F1F0EA]/50">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#00C8E8]" />
          <span>HUMANOID PLATFORM // GIFT AUTONOMOUS COLLEGE</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[#F1F0EA]/70">
            [ INTERACT: DRAG TO ROTATE 3D ROBOT ]
          </span>
          <span className="text-[#8065D8]">BHUBANESWAR, ODISHA</span>
        </div>
      </div>
    </section>
  );
}
