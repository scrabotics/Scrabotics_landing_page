import React from 'react';

export default function BentoCard({
  children,
  colSpan = 'col-span-1',
  padding = 'p-6 sm:p-7',
  className = '',
  accent = 'cyan', // 'cyan' | 'violet'
  onClick,
  as: Component = 'article',
}) {
  const hoverClass =
    accent === 'violet' ? 'bento-surface-violet' : 'bento-surface';

  return (
    <Component
      data-bento-card
      onClick={onClick}
      className={`bento-surface ${hoverClass} ${colSpan} ${padding} relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Subtle Top-Edge Ambient Light Highlight */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-300 z-20 ${
          accent === 'violet'
            ? 'bg-gradient-to-r from-transparent via-[#8065D8] to-transparent'
            : 'bg-gradient-to-r from-transparent via-[#00C8E8] to-transparent'
        }`}
      />
      {children}
    </Component>
  );
}
