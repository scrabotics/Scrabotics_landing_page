import React, { useState } from 'react';
import { RotateCw, Cpu, Gauge } from 'lucide-react';

// Interactive Mechanical Planetary Gear & Servo Linkage Illustration for About Section
export default function MechanicalSchematic() {
  const [rpmMode, setRpmMode] = useState(1); // 0 = paused, 1 = normal, 2 = overdrive
  const [torqueLoad, setTorqueLoad] = useState(74);

  const cycleSpeed = () => {
    setRpmMode((prev) => (prev + 1) % 3);
    setTorqueLoad((prev) => (prev === 74 ? 96 : prev === 96 ? 18 : 74));
  };

  const durationMain = rpmMode === 0 ? '0s' : rpmMode === 1 ? '12s' : '4s';
  const durationPlanet = rpmMode === 0 ? '0s' : rpmMode === 1 ? '6s' : '2s';

  return (
    <div className="border-[3px] border-[#111111] bg-[#222222] text-[#F3F0E8] p-5 brutal-shadow select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#F3F0E8]/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#C7FF35]" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase">
            FIG 01.B // CYCLOIDAL ACTUATOR TESTBENCH
          </span>
        </div>
        <button
          type="button"
          onClick={cycleSpeed}
          className="px-3 py-1 bg-[#C7FF35] text-[#111111] font-mono text-[11px] font-extrabold uppercase border-2 border-[#111111] hover:bg-[#F3F0E8] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>
            {rpmMode === 0 ? 'ENGAGE DRIVE' : rpmMode === 1 ? 'OVERDRIVE 3X' : 'HALT SERVO'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Interactive SVG Gear Train & Linkage */}
        <div className="sm:col-span-7 flex items-center justify-center bg-[#111111] border-2 border-[#B8B6AC]/30 p-3 relative overflow-hidden">
          <svg
            viewBox="0 0 260 180"
            className="w-full h-44"
            aria-label="Interactive mechanical gear train schematic"
          >
            {/* Blueprint Grid Lines */}
            <line x1="0" y1="90" x2="260" y2="90" stroke="#B8B6AC" strokeOpacity="0.2" strokeDasharray="4 4" />
            <line x1="95" y1="0" x2="95" y2="180" stroke="#B8B6AC" strokeOpacity="0.2" strokeDasharray="4 4" />
            <line x1="185" y1="0" x2="185" y2="180" stroke="#B8B6AC" strokeOpacity="0.2" strokeDasharray="4 4" />

            {/* Primary Sun Gear (Left) */}
            <g
              style={{
                transformOrigin: '95px 90px',
                animation: rpmMode > 0 ? `spin ${durationMain} linear infinite` : 'none',
              }}
            >
              <circle cx="95" cy="90" r="48" fill="none" stroke="#F3F0E8" strokeWidth="3" strokeDasharray="10 6" />
              <circle cx="95" cy="90" r="38" fill="#222222" stroke="#C7FF35" strokeWidth="2.5" />
              <line x1="95" y1="52" x2="95" y2="128" stroke="#C7FF35" strokeWidth="2" />
              <line x1="57" y1="90" x2="133" y2="90" stroke="#C7FF35" strokeWidth="2" />
              <circle cx="95" cy="90" r="10" fill="#C7FF35" stroke="#111111" strokeWidth="3" />
            </g>

            {/* Secondary Driven Pinion Gear (Right) */}
            <g
              style={{
                transformOrigin: '175px 90px',
                animation: rpmMode > 0 ? `spin ${durationPlanet} linear infinite reverse` : 'none',
              }}
            >
              <circle cx="175" cy="90" r="30" fill="none" stroke="#C7FF35" strokeWidth="3" strokeDasharray="8 5" />
              <circle cx="175" cy="90" r="22" fill="#111111" stroke="#F3F0E8" strokeWidth="2" />
              <line x1="175" y1="68" x2="175" y2="112" stroke="#F3F0E8" strokeWidth="2" />
              <line x1="153" y1="90" x2="197" y2="90" stroke="#F3F0E8" strokeWidth="2" />
              <circle cx="175" cy="90" r="6" fill="#F3F0E8" />
            </g>

            {/* Dimension Callouts */}
            <text x="10" y="20" fill="#C7FF35" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
              RATIO 14.2:1
            </text>
            <text x="10" y="168" fill="#B8B6AC" fontSize="8" fontFamily="JetBrains Mono">
              TOLERANCE ±0.02MM
            </text>
          </svg>
        </div>

        {/* Live Telemetry Readouts */}
        <div className="sm:col-span-5 space-y-2.5 font-mono text-xs">
          <div className="border-2 border-[#B8B6AC]/30 bg-[#111111] p-2.5">
            <div className="text-[10px] text-[#B8B6AC] flex items-center justify-between">
              <span>ANGULAR VELOCITY</span>
              <Cpu className="w-3.5 h-3.5 text-[#C7FF35]" />
            </div>
            <div className="text-lg font-extrabold text-[#C7FF35] mt-0.5">
              {rpmMode === 0 ? '0.0 RPM' : rpmMode === 1 ? '1,420 RPM' : '4,260 RPM'}
            </div>
          </div>

          <div className="border-2 border-[#B8B6AC]/30 bg-[#111111] p-2.5">
            <div className="text-[10px] text-[#B8B6AC] flex items-center justify-between">
              <span>TORQUE LOAD</span>
              <Gauge className="w-3.5 h-3.5 text-[#C7FF35]" />
            </div>
            <div className="text-lg font-extrabold text-[#F3F0E8] mt-0.5">{torqueLoad}% PEAK</div>
            <div className="w-full h-2 bg-[#222222] mt-1.5 border border-[#B8B6AC]/40">
              <div
                className="h-full bg-[#C7FF35] transition-all duration-300"
                style={{ width: `${torqueLoad}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
