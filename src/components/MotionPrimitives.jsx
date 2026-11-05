import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Layers, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// 1. CUSTOM TECHNICAL CROSSHAIR CURSOR (60FPS GSAP quickTo)
// ============================================================================
export function TechnicalCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const coordRef = useRef(null);
  const [cursorMode, setCursorMode] = useState('DEFAULT');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || isReduced) return;

    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !outerRef.current || !innerRef.current) return;

    const xOuter = gsap.quickTo(outerRef.current, 'x', { duration: 0.22, ease: 'power3.out' });
    const yOuter = gsap.quickTo(outerRef.current, 'y', { duration: 0.22, ease: 'power3.out' });
    const xInner = gsap.quickTo(innerRef.current, 'x', { duration: 0.05, ease: 'none' });
    const yInner = gsap.quickTo(innerRef.current, 'y', { duration: 0.05, ease: 'none' });

    const onMouseMove = (e) => {
      xOuter(e.clientX);
      yOuter(e.clientY);
      xInner(e.clientX);
      yInner(e.clientY);

      if (coordRef.current) {
        const xStr = String(Math.round(e.clientX)).padStart(4, '0');
        const yStr = String(Math.round(e.clientY)).padStart(4, '0');
        coordRef.current.textContent = `X:${xStr} Y:${yStr}`;
      }

      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      const customAttr = target.closest('[data-cursor]');
      if (customAttr) {
        setCursorMode(customAttr.getAttribute('data-cursor'));
      } else if (target.closest('a, button, select, input, textarea')) {
        setCursorMode('INTERACT');
      } else {
        setCursorMode('DEFAULT');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  const isExpanded = cursorMode !== 'DEFAULT';

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden hidden lg:block">
      <div
        ref={outerRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-200 flex items-center justify-center"
        style={{
          width: isExpanded ? 68 : 36,
          height: isExpanded ? 68 : 36,
        }}
      >
        {/* 4 Corner Crosshair Brackets in Cyan (#00C8E8) */}
        <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00C8E8]" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00C8E8]" />
        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00C8E8]" />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00C8E8]" />

        {/* Active Lock Ring when hovering interactive elements */}
        <div
          className={`w-full h-full border transition-all duration-200 ${
            isExpanded
              ? 'border-[#00C8E8] bg-[#00C8E8]/20 shadow-[0_0_14px_#00C8E8] rotate-45 scale-90'
              : 'border-[#00C8E8]/40 rotate-0 scale-100'
          }`}
        />

        {/* Context Telemetry Tag */}
        <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#111111] text-[#F3F0E8] px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider border border-[#00C8E8] shadow-[2px_2px_0_0_#111111]">
          {isExpanded ? (
            <span className="text-[#C7FF35]">[{cursorMode}]</span>
          ) : (
            <span ref={coordRef} className="text-[#00C8E8]">
              X:0000 Y:0000
            </span>
          )}
        </div>
      </div>

      {/* Inner Precision Center Dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <div
          className={`transition-all duration-150 ${
            isExpanded
              ? 'w-2.5 h-2.5 bg-[#C7FF35] border border-[#111111] shadow-[0_0_10px_#C7FF35]'
              : 'w-1.5 h-1.5 bg-[#00C8E8] shadow-[0_0_6px_#00C8E8]'
          }`}
        />
      </div>
    </div>
  );
}

// ============================================================================
// 2. MAGNETIC BUTTON / ELEMENT WRAPPER
// ============================================================================
export function Magnetic({ children, strength = 0.28, className = '' }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <div ref={wrapRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

// ============================================================================
// 3. STAGGERED CHARACTER & LINE REVEAL TYPOGRAPHY
// ============================================================================
export function StaggerHeading({
  lines = [],
  highlightLineIndex = -1,
  highlightStyle = 'orange',
  className = '',
  as: Tag = 'h2',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const chars = el.querySelectorAll('.stagger-char');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 115, rotateZ: 3, opacity: 0 },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.018,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Tag
      ref={containerRef}
      className={`font-display font-extrabold uppercase tracking-tight leading-[0.92] text-[#FFFFFF] ${className}`}
    >
      {lines.map((line, lineIdx) => {
        const isHighlighted = lineIdx === highlightLineIndex;
        const badgeClass =
          highlightStyle === 'orange' || highlightStyle === 'lime'
            ? 'bg-[#FF9A4D] text-[#000000] px-3 border-2 border-[#FFFFFF] brutal-shadow-visor inline-block mt-1.5'
            : 'bg-[#0F4C8A] text-[#FF9A4D] px-3 border-2 border-[#8CCFD6] inline-block mt-1.5';

        return (
          <span key={lineIdx} className="block overflow-hidden pb-1">
            <span className={isHighlighted ? badgeClass : 'inline-block'}>
              {line.split('').map((ch, charIdx) => (
                <span
                  key={charIdx}
                  className="stagger-char inline-block"
                  style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}

// ============================================================================
// 4. 3D TILT MECHANICAL PROJECT CARD (NEO-BRUTALIST INDUSTRIAL PALETTE)
// ============================================================================
function ProjectBlueprintSVG({ type }) {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full bg-[#111111] p-4">
      <g stroke="#00C8E8" strokeOpacity="0.25" strokeWidth="1">
        <line x1="0" y1="65" x2="400" y2="65" strokeDasharray="4 4" />
        <line x1="0" y1="130" x2="400" y2="130" strokeDasharray="4 4" />
        <line x1="0" y1="195" x2="400" y2="195" strokeDasharray="4 4" />
        <line x1="100" y1="0" x2="100" y2="260" strokeDasharray="4 4" />
        <line x1="200" y1="0" x2="200" y2="260" strokeDasharray="4 4" />
        <line x1="300" y1="0" x2="300" y2="260" strokeDasharray="4 4" />
      </g>

      {type === 'rover' && (
        <g stroke="#00C8E8" strokeWidth="2.5" fill="none">
          <rect x="95" y="75" width="210" height="70" fill="#222222" stroke="#F3F0E8" />
          <rect x="160" y="40" width="80" height="35" fill="#111111" stroke="#C7FF35" />
          <line x1="120" y1="145" x2="90" y2="195" stroke="#F3F0E8" strokeWidth="3" />
          <line x1="200" y1="145" x2="200" y2="195" stroke="#F3F0E8" strokeWidth="3" />
          <line x1="280" y1="145" x2="310" y2="195" stroke="#F3F0E8" strokeWidth="3" />
          <circle cx="90" cy="195" r="26" fill="#222222" stroke="#C7FF35" strokeWidth="3" />
          <circle cx="200" cy="195" r="26" fill="#222222" stroke="#C7FF35" strokeWidth="3" />
          <circle cx="310" cy="195" r="26" fill="#222222" stroke="#C7FF35" strokeWidth="3" />
        </g>
      )}

      {type === 'linefollower' && (
        <g stroke="#00C8E8" strokeWidth="2.5" fill="none">
          <polygon points="200,35 310,190 90,190" fill="#222222" stroke="#F3F0E8" />
          <rect x="135" y="45" width="130" height="18" fill="#C7FF35" stroke="#111111" />
          <rect x="80" y="145" width="26" height="55" fill="#111111" stroke="#00C8E8" />
          <rect x="294" y="145" width="26" height="55" fill="#111111" stroke="#00C8E8" />
          <circle cx="200" cy="140" r="28" stroke="#00C8E8" strokeDasharray="6 4" />
        </g>
      )}

      {type === 'arm' && (
        <g stroke="#00C8E8" strokeWidth="2.5" fill="none">
          <rect x="130" y="205" width="140" height="24" fill="#222222" stroke="#F3F0E8" />
          <line x1="200" y1="205" x2="150" y2="120" stroke="#F3F0E8" strokeWidth="8" />
          <line x1="150" y1="120" x2="255" y2="65" stroke="#C7FF35" strokeWidth="6" />
          <circle cx="200" cy="205" r="14" fill="#C7FF35" />
          <circle cx="150" cy="120" r="14" fill="#00C8E8" />
          <circle cx="255" cy="65" r="12" fill="#F3F0E8" />
          <polyline points="255,65 295,45 305,60" stroke="#00C8E8" strokeWidth="3" />
          <polyline points="255,65 295,85 305,70" stroke="#00C8E8" strokeWidth="3" />
        </g>
      )}

      {type !== 'rover' && type !== 'linefollower' && type !== 'arm' && (
        <g stroke="#00C8E8" strokeWidth="2.5" fill="none">
          <rect x="105" y="95" width="190" height="90" fill="#222222" stroke="#F3F0E8" />
          <circle cx="200" cy="70" r="32" fill="#111111" stroke="#C7FF35" />
          <circle cx="200" cy="70" r="12" fill="#00C8E8" />
          <rect x="75" y="115" width="30" height="65" fill="#C7FF35" stroke="#111111" />
          <rect x="295" y="115" width="30" height="65" fill="#C7FF35" stroke="#111111" />
        </g>
      )}

      <text x="16" y="24" fill="#C7FF35" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
        CAD_WIREFRAME // ORTHOGRAPHIC PROJECTION
      </text>
      <text x="16" y="246" fill="#00C8E8" fontSize="9" fontFamily="JetBrains Mono">
        TOLERANCE: ±0.05MM • SCALE 1:5
      </text>
    </svg>
  );
}

export function TiltProjectCard({ project, onInspect, className = '' }) {
  const cardRef = useRef(null);
  const [showBlueprint, setShowBlueprint] = useState(false);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      rotateY: x * 9,
      rotateX: -y * 9,
      transformPerspective: 1100,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="INSPECT BUILD"
      className={`border-[3px] border-[#111111] bg-[#F3F0E8] text-[#111111] flex flex-col justify-between overflow-hidden group relative will-change-transform shadow-[6px_6px_0px_#111111] hover:shadow-[10px_10px_0px_#C7FF35] transition-shadow duration-300 ${className}`}
    >
      <div>
        {/* Top Metadata Telemetry Bar */}
        <div className="bg-[#111111] text-[#F3F0E8] px-5 py-3 flex items-center justify-between border-b-2 border-[#111111] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[#C7FF35] animate-pulse" />
            <span className="font-bold text-[#C7FF35]">{project.codename}</span>
          </div>
          <span className="px-2.5 py-0.5 bg-[#C7FF35] text-[#111111] font-extrabold uppercase">
            {project.status}
          </span>
        </div>

        {/* Visual Viewport with Scanning Line & Blueprint Toggle */}
        <div className="relative h-64 sm:h-72 overflow-hidden border-b-[3px] border-[#111111] bg-[#111111]">
          {showBlueprint ? (
            <ProjectBlueprintSVG type={project.schematicType} />
          ) : (
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
            />
          )}

          {/* Mechanical Horizontal Laser Scan Line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[#00C8E8] shadow-[0_0_12px_#00C8E8] opacity-0 group-hover:opacity-100 group-hover:animate-[scanLine_2.4s_linear_infinite]" />

          {/* Top-Left Build Number Stamp */}
          <div className="absolute top-3 left-3 bg-[#111111] text-[#C7FF35] border-2 border-[#111111] px-2.5 py-1 font-mono text-xs font-extrabold shadow-[3px_3px_0_0_#111111]">
            UNIT #{project.number} // {project.id}
          </div>

          {/* Top-Right Interactive CAD / Photo Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowBlueprint((prev) => !prev);
            }}
            className="absolute top-3 right-3 bg-[#111111] text-[#C7FF35] hover:bg-[#C7FF35] hover:text-[#111111] border-2 border-[#111111] px-2.5 py-1 font-mono text-[11px] font-extrabold uppercase flex items-center gap-1.5 cursor-pointer transition-colors shadow-[3px_3px_0_0_#111111]"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showBlueprint ? 'PHOTO VIEW' : 'CAD SCHEMATIC'}</span>
          </button>

          {/* Bottom Dimension Ruler Overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-[#111111]/90 text-[#F3F0E8] px-4 py-1.5 flex items-center justify-between font-mono text-[10px]">
            <span>MASS: {project.longSpecs?.mass || 'N/A'}</span>
            <span className="text-[#C7FF35]">TELEMETRY: LINKED</span>
          </div>
        </div>

        {/* Project Editorial Body */}
        <div className="p-6 sm:p-7">
          <div className="font-mono text-xs font-bold uppercase text-[#111111]/70 mb-1">
            {project.category}
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase mb-3 text-[#111111] group-hover:text-[#111111] transition-colors">
            {project.name}
          </h3>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-[#111111]/90 mb-6">
            {project.description}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs font-bold px-2.5 py-1 border-2 border-[#111111] bg-[#F3F0E8] text-[#111111]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 sm:px-7 pb-6 pt-2">
        <button
          type="button"
          onClick={() => onInspect(project)}
          className="w-full brutal-btn py-3.5 px-5 bg-[#111111] text-[#C7FF35] hover:bg-[#C7FF35] hover:text-[#111111] font-mono text-xs font-extrabold uppercase flex items-center justify-between cursor-pointer border-[3px] border-[#111111]"
        >
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>OPEN ENGINEERING DOSSIER</span>
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </article>
  );
}
