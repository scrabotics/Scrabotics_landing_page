import React, { useState } from 'react';
import { ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import BentoCard from './BentoCard';
import { PROJECTS_DATA } from '../data/projects';

export default function Projects({ onInspectProject }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL',
    ...Array.from(new Set(PROJECTS_DATA.map((p) => p.category))),
  ];

  const displayedProjects =
    selectedCategory === 'ALL'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00C8E8]">
            <span className="w-2 h-2 rounded-full bg-[#00C8E8]" />
            <span>07 // FEATURED PROJECTS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.05] tracking-[-0.03em] text-[#F1F0EA]">
            IDEAS THAT COME TO <span className="text-[#00C8E8]">LIFE.</span>
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#F1F0EA]/50 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#00C8E8]" />
            FILTER:
          </span>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider border transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#00C8E8] text-[#090D12] border-[#00C8E8] font-bold'
                  : 'bg-[#0F1620]/70 text-[#F1F0EA]/70 border-[#F1F0EA]/12 hover:border-[#00C8E8]/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Varied Asymmetric 12-Column Bento Grid:
          1 large featured card (8 cols), 2 medium cards (4 & 6 cols),
          2 smaller cards (3 & 3 cols), 1 wide experimental card (12 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-5">
        {displayedProjects.map((project, idx) => {
          const isWide = project.size === 'wide';
          const isLarge = project.size === 'large';

          return (
            <BentoCard
              key={project.id}
              colSpan={
                selectedCategory === 'ALL'
                  ? project.colSpan
                  : 'md:col-span-6 lg:col-span-6'
              }
              accent={idx % 3 === 1 ? 'violet' : 'cyan'}
              padding="p-0"
              onClick={() => onInspectProject(project)}
              className={`group overflow-hidden flex ${
                isWide
                  ? 'flex-col lg:flex-row min-h-[300px]'
                  : 'flex-col justify-between min-h-[340px]'
              }`}
            >
              {/* Project Visual with subtle hover zoom */}
              <div
                className={`relative overflow-hidden ${
                  isWide
                    ? 'lg:w-1/2 min-h-[240px] lg:min-h-full'
                    : isLarge
                    ? 'h-56 sm:h-64'
                    : 'h-48'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D12] via-[#090D12]/35 to-transparent" />

                {/* Category & Status Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#090D12]/85 backdrop-blur-md border border-[#F1F0EA]/15 font-mono text-[10px] uppercase tracking-[0.16em] text-[#00C8E8]">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#090D12]/85 backdrop-blur-md border border-[#8065D8]/40 font-mono text-[10px] text-[#F1F0EA]/80">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div
                className={`p-6 sm:p-7 flex-1 flex flex-col justify-between ${
                  isWide ? 'lg:w-1/2' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F1F0EA] group-hover:text-[#00C8E8] transition-colors">
                      {project.title}
                    </h3>
                    <div className="w-9 h-9 rounded-xl bg-[#F1F0EA]/[0.06] border border-[#F1F0EA]/12 flex items-center justify-center text-[#F1F0EA] group-hover:bg-[#00C8E8] group-hover:text-[#090D12] group-hover:border-[#00C8E8] transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#F1F0EA]/72 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F1F0EA]/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-[#F1F0EA]/[0.06] text-[#F1F0EA]/75 border border-[#F1F0EA]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#00C8E8] inline-flex items-center gap-1">
                    Explore Project
                  </span>
                </div>
              </div>
            </BentoCard>
          );
        })}
      </div>
    </section>
  );
}
