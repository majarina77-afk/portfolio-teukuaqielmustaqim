import { motion } from 'motion/react';
import { ArticleWork } from '../types';

interface WorkCardProps {
  work: ArticleWork;
  onSelect: (work: ArticleWork) => void;
}

export function WorkCard({ work, onSelect }: WorkCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(work)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(work);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Baca karya: ${work.title}`}
      className="group flex h-full cursor-pointer flex-col justify-between rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] p-5 transition-colors duration-200 hover:border-[#D5CFC3] hover:bg-[#EBE6DC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C06C54] sm:p-7"
    >
      <div>
        {/* Quiet Unboxed Editorial Metadata Kicker */}
        <div className="mb-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[12px] tracking-[0.05em]">
          <span className="font-semibold text-[#914731] uppercase">
            {work.formatLabel}
          </span>
          <span className="text-[#87736D]" aria-hidden="true">
            ·
          </span>
          <span className="font-medium text-[#5C6360]">{work.publication}</span>
          <span className="text-[#87736D]" aria-hidden="true">
            ·
          </span>
          <span className="font-medium text-[#5C6360] tabular-nums">
            {work.year}
          </span>
        </div>

        {/* Title in Playfair Display */}
        <h3 className="font-display text-[22px] leading-[1.32] font-medium tracking-[-0.01em] text-[#1F2421] transition-colors duration-200 group-hover:text-[#914731] sm:text-[26px]">
          {work.title}
        </h3>

        {/* Excerpt in Newsreader */}
        <p className="mt-3.5 font-serif text-[15.5px] leading-[1.68] text-[#5C6360] sm:text-[16px]">
          {work.excerpt}
        </p>
      </div>

      {/* Footer Rule & Action Link */}
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#E4DFD5] pt-4">
        <span className="font-sans text-[12px] font-medium tracking-[0.04em] text-[#5C6360] tabular-nums">
          {work.role} · {work.readTime}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(work);
          }}
          className="editorial-underline cursor-pointer font-sans text-[13px] font-semibold tracking-[0.03em] text-[#1F2421] transition-colors duration-200 group-hover:text-[#C06C54] whitespace-nowrap shrink-0"
        >
          Baca Selengkapnya →
        </button>
      </div>
    </motion.article>
  );
}
