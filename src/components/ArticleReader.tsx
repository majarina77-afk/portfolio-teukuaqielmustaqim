import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Copy } from 'lucide-react';
import { AUTHOR_EMAIL } from '../data/portfolioData';
import { ArticleWork } from '../types';
import { EditorialComparison } from './EditorialComparison';

interface ArticleReaderProps {
  article: ArticleWork;
  relatedWorks: ArticleWork[];
  onBack: () => void;
  onSelectWork: (work: ArticleWork) => void;
  onCopyEmail: () => void;
}

export function ArticleReader({
  article,
  relatedWorks,
  onBack,
  onSelectWork,
  onCopyEmail,
}: ArticleReaderProps) {
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadProgress(0);
        return;
      }
      setReadProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  return (
    <motion.div
      key={article.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#FAF9F6]"
    >
      {/* Subtle Hairline Reading Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-16 left-0 z-30 h-[2px] w-full bg-[#E4DFD5]/60 sm:top-[72px]"
      >
        <div
          className="h-full bg-[#C06C54] transition-[width] duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article className="mx-auto max-w-[1280px] px-5 pt-8 pb-20 sm:px-8 sm:pt-12 sm:pb-24 lg:px-16">
        {/* Top Return Control */}
        <div className="mx-auto max-w-[740px]">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#5C6360] transition-colors duration-200 hover:text-[#C06C54] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C06C54]"
          >
            ← Kembali ke Karya Tulis
          </button>

          {/* Article Editorial Header */}
          <header className="mt-7 border-b border-[#E4DFD5] pb-8 sm:mt-9 sm:pb-10">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[12px] tracking-[0.06em]">
              <span className="font-semibold text-[#914731] uppercase">
                {article.category}
              </span>
              <span className="text-[#87736D]" aria-hidden="true">
                ·
              </span>
              <span className="font-medium text-[#5C6360]">
                {article.formatLabel}
              </span>
              <span className="text-[#87736D]" aria-hidden="true">
                ·
              </span>
              <span className="font-medium text-[#5C6360] tabular-nums">
                {article.readTime}
              </span>
            </div>

            <h1 className="mt-4 font-display text-[32px] leading-[1.2] font-semibold tracking-[-0.015em] text-[#1F2421] sm:text-[42px] lg:text-[46px]">
              {article.title}
            </h1>

            <p className="mt-5 font-serif text-[19px] leading-[1.6] text-[#5C6360] sm:text-[21px]">
              {article.subtitle}
            </p>

            {/* Byline Strip */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#E4DFD5] pt-5 font-sans text-[12.5px] text-[#5C6360]">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span className="font-semibold text-[#1F2421]">Teuku Aqiel</span>
                <span className="text-[#87736D]" aria-hidden="true">
                  ·
                </span>
                <span>{article.role}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 tabular-nums">
                <span>Diterbitkan oleh {article.publication}</span>
                <span className="text-[#87736D]" aria-hidden="true">
                  ·
                </span>
                <span>{article.year}</span>
              </div>
            </div>
          </header>

          {/* Optional Featured Epigraph */}
          {article.featuredQuote && (
            <div className="my-8 rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] px-6 py-5 sm:my-10 sm:px-8 sm:py-6">
              <p className="font-serif text-[19px] leading-[1.65] italic text-[#1F2421] sm:text-[21px]">
                “{article.featuredQuote}”
              </p>
            </div>
          )}

          {/* Main Reading Prose */}
          <div className="mt-8 space-y-10 sm:mt-10">
            {article.sections.map((section, sectionIdx) => (
              <section key={sectionIdx} className="space-y-6">
                {section.heading && (
                  <h2 className="pt-2 font-display text-[24px] leading-[1.3] font-medium tracking-[-0.01em] text-[#1F2421] sm:text-[28px]">
                    {section.heading}
                  </h2>
                )}

                {section.paragraphs.map((paragraph, pIdx) => {
                  const isFirstParagraphOfArticle =
                    sectionIdx === 0 && pIdx === 0;
                  return (
                    <p
                      key={pIdx}
                      className={`font-serif text-[18px] leading-[1.82] text-[#1F2421]/92 sm:text-[20px] sm:leading-[1.82] ${
                        isFirstParagraphOfArticle ? 'editorial-dropcap' : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  );
                })}

                {/* Pull Quote / Kutipan Naskah */}
                {section.quote && (
                  <figure className="my-8 rounded-lg border border-[#E4DFD5] bg-[#F2EFE9]/80 px-6 py-6 sm:px-8 sm:py-7">
                    <blockquote className="font-serif text-[20px] leading-[1.65] italic text-[#1F2421] sm:text-[22px]">
                      “{section.quote.text}”
                    </blockquote>
                    <figcaption className="mt-4 font-sans text-[12px] font-medium tracking-[0.06em] text-[#914731] uppercase">
                      — {section.quote.attribution}
                    </figcaption>
                  </figure>
                )}

                {/* Screenplay / Script Excerpt Block */}
                {section.scriptExcerpt && (
                  <div className="my-8 overflow-hidden rounded-lg border border-[#E4DFD5] bg-[#F2EFE9]">
                    <div className="flex items-center justify-between border-b border-[#E4DFD5] bg-[#EBE6DC]/70 px-5 py-3 sm:px-7">
                      <span className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                        Kutipan Naskah
                      </span>
                      <span className="font-sans text-[11px] font-medium tracking-[0.05em] text-[#5C6360]">
                        {section.scriptExcerpt.title}
                      </span>
                    </div>
                    <div className="space-y-3.5 px-5 py-6 font-serif text-[16px] leading-[1.7] text-[#1F2421] sm:px-9 sm:py-8 sm:text-[17px]">
                      {section.scriptExcerpt.lines.map((line, lineIdx) => {
                        if (line.type === 'scene') {
                          return (
                            <p
                              key={lineIdx}
                              className="pb-1 font-sans text-[12px] font-semibold tracking-[0.08em] text-[#1F2421] uppercase"
                            >
                              {line.text}
                            </p>
                          );
                        }
                        if (line.type === 'character') {
                          return (
                            <p
                              key={lineIdx}
                              className="pt-2 text-center font-sans text-[12px] font-semibold tracking-[0.1em] text-[#914731] uppercase"
                            >
                              {line.text}
                            </p>
                          );
                        }
                        if (line.type === 'parenthetical') {
                          return (
                            <p
                              key={lineIdx}
                              className="mx-auto max-w-[460px] text-center font-serif text-[15px] italic text-[#5C6360]"
                            >
                              {line.text}
                            </p>
                          );
                        }
                        if (line.type === 'dialogue') {
                          return (
                            <p
                              key={lineIdx}
                              className="mx-auto max-w-[480px] text-center font-serif text-[17px] leading-[1.68] text-[#1F2421]"
                            >
                              “{line.text}”
                            </p>
                          );
                        }
                        return (
                          <p
                            key={lineIdx}
                            className="font-serif text-[16px] leading-[1.75] text-[#5C6360]"
                          >
                            {line.text}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Editorial Comparison Block (Penyuntingan) */}
                {section.editorialDiff && (
                  <div className="my-8">
                    <EditorialComparison
                      label={section.editorialDiff.label}
                      before={section.editorialDiff.before}
                      after={section.editorialDiff.after}
                      editorNote={section.editorialDiff.editorNote}
                    />
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Closing Publication Note & Keywords */}
          <footer className="mt-12 border-t border-[#E4DFD5] pt-8">
            {article.closingNote && (
              <p className="font-serif text-[15px] leading-[1.7] italic text-[#5C6360]">
                {article.closingNote}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12px] tracking-[0.04em] text-[#5C6360]">
              <span className="font-semibold text-[#1F2421]">Topik:</span>
              {article.tags.map((tag, idx) => (
                <span key={tag} className="inline-flex items-center gap-3">
                  <span>{tag}</span>
                  {idx < article.tags.length - 1 && (
                    <span className="text-[#87736D]" aria-hidden="true">
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Author & Direct Contact Card */}
            <div className="mt-10 rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-lg">
                  <p className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                    Tentang Penulis
                  </p>
                  <h3 className="mt-1.5 font-display text-[22px] font-medium text-[#1F2421]">
                    Teuku Aqiel
                  </h3>
                  <p className="mt-2 font-serif text-[15.5px] leading-[1.65] text-[#5C6360]">
                    Penulis konten, penyunting bahasa, dan penulis naskah yang
                    membantu penerbit, media, serta jenama merangkai tulisan
                    berbahasa Indonesia yang jernih dan berdaya tahan.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={onCopyEmail}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg bg-[#C06C54] px-5 py-2.5 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#FAF9F6] transition-colors duration-200 hover:bg-[#A85842] whitespace-nowrap"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Salin Email</span>
                  </button>
                </div>
              </div>
              <p className="mt-4 border-t border-[#E4DFD5] pt-3 font-sans text-[12px] text-[#5C6360]">
                Korespondensi langsung:{' '}
                <span className="font-medium text-[#1F2421]">{AUTHOR_EMAIL}</span>
              </p>
            </div>

            {/* Bottom Return Button */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-[#1F2421] px-5 py-2.5 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#1F2421] transition-colors duration-200 hover:bg-[#1F2421] hover:text-[#FAF9F6]"
              >
                ← Kembali ke Karya Tulis
              </button>
            </div>
          </footer>
        </div>

        {/* Related Works Section */}
        {relatedWorks.length > 0 && (
          <section
            aria-labelledby="karya-terkait-heading"
            className="mx-auto mt-16 max-w-[1040px] border-t border-[#E4DFD5] pt-12"
          >
            <div className="mb-7 flex items-baseline justify-between gap-4">
              <h2
                id="karya-terkait-heading"
                className="font-display text-[26px] font-medium text-[#1F2421] sm:text-[30px]"
              >
                Karya Pilihan Lainnya
              </h2>
              <button
                type="button"
                onClick={onBack}
                className="editorial-underline cursor-pointer font-sans text-[13px] font-semibold text-[#5C6360] transition-colors hover:text-[#C06C54] whitespace-nowrap"
              >
                Lihat Semua
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedWorks.map((item) => (
                <article
                  key={item.id}
                  onClick={() => onSelectWork(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectWork(item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="group cursor-pointer rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] p-6 transition-colors duration-200 hover:border-[#D5CFC3] hover:bg-[#EBE6DC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C06C54]"
                >
                  <div className="mb-2.5 flex items-center gap-2 font-sans text-[11.5px] tracking-[0.05em]">
                    <span className="font-semibold text-[#914731] uppercase">
                      {item.formatLabel}
                    </span>
                    <span className="text-[#87736D]">·</span>
                    <span className="text-[#5C6360] tabular-nums">
                      {item.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-[21px] leading-[1.32] font-medium text-[#1F2421] transition-colors group-hover:text-[#914731]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 font-serif text-[15px] leading-[1.65] text-[#5C6360]">
                    {item.excerpt}
                  </p>
                  <div className="mt-4">
                    <span className="editorial-underline font-sans text-[12.5px] font-semibold text-[#1F2421] transition-colors group-hover:text-[#C06C54]">
                      Baca Selengkapnya →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </motion.div>
  );
}
