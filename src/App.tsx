import { Search, X } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArticleReader } from './components/ArticleReader';
import { ContactSection } from './components/ContactSection';
import { EditorialComparison } from './components/EditorialComparison';
import { Navbar } from './components/Navbar';
import { N8nChatbot } from './components/N8nChatbot';
import { Toast } from './components/Toast';
import { WorkCard } from './components/WorkCard';
import {
  AUTHOR_EMAIL,
  EDITORIAL_SERVICES,
  HOMEPAGE_COMPARISON_SAMPLES,
  PORTFOLIO_WORKS,
  WORK_CATEGORIES,
} from './data/portfolioData';
import { ArticleWork, WorkCategory } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<ArticleWork | null>(null);
  const [activeComparisonId, setActiveComparisonId] = useState<string>(
    HOMEPAGE_COMPARISON_SAMPLES[0].id
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailCopiedRecently, setEmailCopiedRecently] = useState(false);

  const toastTimerRef = useRef<number | null>(null);
  const copiedFlagTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      if (copiedFlagTimerRef.current) window.clearTimeout(copiedFlagTimerRef.current);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  const handleCopyEmail = useCallback(async () => {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(AUTHOR_EMAIL);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (!copied) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = AUTHOR_EMAIL;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        copied = true;
      } catch {
        copied = false;
      }
    }

    setEmailCopiedRecently(true);
    if (copiedFlagTimerRef.current) {
      window.clearTimeout(copiedFlagTimerRef.current);
    }
    copiedFlagTimerRef.current = window.setTimeout(() => {
      setEmailCopiedRecently(false);
    }, 2200);

    showToast('Email berhasil disalin!');
  }, [showToast]);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleNavigateSection = useCallback(
    (sectionId: string) => {
      if (selectedArticle) {
        setSelectedArticle(null);
        window.setTimeout(() => {
          scrollToSection(sectionId);
        }, 60);
      } else {
        scrollToSection(sectionId);
      }
    },
    [selectedArticle, scrollToSection]
  );

  const handleBackToWorks = useCallback(() => {
    setSelectedArticle(null);
    window.setTimeout(() => {
      const worksEl = document.getElementById('karya');
      if (worksEl) {
        worksEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const worksMatchingQuery = useMemo(() => {
    if (!normalizedQuery) return PORTFOLIO_WORKS;
    return PORTFOLIO_WORKS.filter((work) => {
      const searchableText = [
        work.title,
        work.subtitle,
        work.excerpt,
        work.category,
        work.formatLabel,
        work.publication,
        work.role,
        work.year,
        ...work.tags,
      ]
        .join(' ')
        .toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const filteredWorks = useMemo(() => {
    if (activeCategory === 'Semua') return worksMatchingQuery;
    return worksMatchingQuery.filter((work) => work.category === activeCategory);
  }, [activeCategory, worksMatchingQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<WorkCategory, number> = {
      Semua: worksMatchingQuery.length,
      'Artikel & Esai': 0,
      'Fiksi & Naskah': 0,
      Penyuntingan: 0,
    };
    for (const work of worksMatchingQuery) {
      counts[work.category] += 1;
    }
    return counts;
  }, [worksMatchingQuery]);

  const activeComparison = useMemo(
    () =>
      HOMEPAGE_COMPARISON_SAMPLES.find(
        (item) => item.id === activeComparisonId
      ) ?? HOMEPAGE_COMPARISON_SAMPLES[0],
    [activeComparisonId]
  );

  const relatedWorks = useMemo(() => {
    if (!selectedArticle) return [];
    const sameCategory = PORTFOLIO_WORKS.filter(
      (item) =>
        item.id !== selectedArticle.id &&
        item.category === selectedArticle.category
    );
    const others = PORTFOLIO_WORKS.filter(
      (item) =>
        item.id !== selectedArticle.id &&
        item.category !== selectedArticle.category
    );
    return [...sameCategory, ...others].slice(0, 2);
  }, [selectedArticle]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1F2421]">
      <Navbar
        isReadingArticle={Boolean(selectedArticle)}
        onNavigateSection={handleNavigateSection}
        onBackToWorks={handleBackToWorks}
      />

      {selectedArticle ? (
        <ArticleReader
          article={selectedArticle}
          relatedWorks={relatedWorks}
          onBack={handleBackToWorks}
          onSelectWork={(work) => setSelectedArticle(work)}
          onCopyEmail={handleCopyEmail}
        />
      ) : (
        <main id="beranda">
          {/* Section 1: Hero Editorial Spread */}
          <section className="mx-auto max-w-[1280px] px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20 lg:px-16 lg:pt-24 lg:pb-24">
            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left Editorial Declaration */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <p className="font-sans text-[12px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                    Penulis Konten · Penyunting · Pembaca Aksara · Penulis Naskah
                  </p>

                  <h1 className="mt-5 font-display text-[38px] leading-[1.16] font-semibold tracking-[-0.02em] text-[#1F2421] sm:text-[48px] lg:text-[56px]">
                    Merangkai kata yang jernih, menyunting gagasan hingga bernas.
                  </h1>

                  <p className="mt-6 max-w-[600px] font-serif text-[18px] leading-[1.72] text-[#5C6360] sm:text-[20px]">
                    Saya Teuku Aqiel Mustaqim. Saya membantu penerbit, media independen,
                    rumah produksi, dan jenama merumuskan esai budaya, naskah
                    cerita, serta penyuntingan bahasa Indonesia yang tenang,
                    presisi, dan layak dibaca berulang kali.
                  </p>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleNavigateSection('karya')}
                    className="inline-flex min-h-[46px] cursor-pointer items-center justify-center rounded-lg bg-[#C06C54] px-6 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-[#FAF9F6] transition-colors duration-200 hover:bg-[#A85842] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C06C54] whitespace-nowrap"
                  >
                    Jelajahi Karya Tulis
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigateSection('kontak')}
                    className="inline-flex min-h-[46px] cursor-pointer items-center justify-center rounded-lg border border-[#1F2421] px-6 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-[#1F2421] transition-colors duration-200 hover:bg-[#1F2421] hover:text-[#FAF9F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C06C54] whitespace-nowrap"
                  >
                    Diskusikan Naskah
                  </button>
                </div>
              </div>

              {/* Right Archival Editorial Folio Card */}
              <aside className="flex flex-col justify-between rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] p-6 sm:p-8 lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-4 font-sans text-[11px] font-semibold tracking-[0.08em] text-[#5C6360] uppercase">
                    <span>Lembar Redaksi</span>
                    <span className="tabular-nums text-[#914731]">Arsip 2026</span>
                  </div>

                  <blockquote className="mt-6 font-serif text-[21px] leading-[1.6] italic text-[#1F2421] sm:text-[22px]">
                    “Bahasa yang baik tidak berusaha memukau dengan kerumitan; ia
                    menuntun pembaca memahami perkara yang rumit dengan hati yang
                    lapang.”
                  </blockquote>
                  <p className="mt-4 font-sans text-[12px] font-medium tracking-[0.05em] text-[#5C6360]">
                    — Prinsip Kerja Editorial, Teuku Aqiel Mustaqim
                  </p>
                </div>

                {/* Editorial Summary Index */}
                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-[#E4DFD5] pt-6">
                  <div>
                    <dt className="font-sans text-[11px] font-medium tracking-[0.04em] text-[#5C6360]">
                      Esai &amp; Artikel
                    </dt>
                    <dd className="mt-1 font-display text-[26px] font-semibold text-[#1F2421] tabular-nums">
                      60+
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-[11px] font-medium tracking-[0.04em] text-[#5C6360]">
                      Buku Disunting
                    </dt>
                    <dd className="mt-1 font-display text-[26px] font-semibold text-[#1F2421] tabular-nums">
                      14
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-[11px] font-medium tracking-[0.04em] text-[#5C6360]">
                      Naskah Layar
                    </dt>
                    <dd className="mt-1 font-display text-[26px] font-semibold text-[#1F2421] tabular-nums">
                      8
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </section>

          {/* Section 2: Karya Tulis Terpilih & Dynamic Category Filter */}
          <section
            id="karya"
            aria-labelledby="karya-heading"
            className="scroll-mt-24 border-t border-[#E4DFD5] py-16 sm:py-24"
          >
            <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16">
              <div className="max-w-2xl">
                <p className="font-sans text-[12px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                  Arsip Publikasi &amp; Proyek
                </p>
                <h2
                  id="karya-heading"
                  className="mt-2.5 font-display text-[32px] leading-[1.2] font-semibold tracking-[-0.015em] text-[#1F2421] sm:text-[40px]"
                >
                  Karya Tulis Terpilih
                </h2>
                <p className="mt-3 font-serif text-[17px] leading-[1.68] text-[#5C6360]">
                  Cari berdasarkan judul atau kata kunci, atau saring berdasarkan
                  kategori untuk membuka ruang baca lengkap.
                </p>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="mt-8 flex flex-col gap-4 border-y border-[#E4DFD5] py-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Search Input */}
                <div className="relative w-full lg:max-w-[380px]">
                  <label htmlFor="cari-karya" className="sr-only">
                    Cari karya berdasarkan judul atau kata kunci
                  </label>
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#5C6360]"
                  />
                  <input
                    id="cari-karya"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul, topik, atau kata kunci..."
                    className="min-h-[44px] w-full rounded-lg border border-[#D5CFC3] bg-[#FAF9F6] py-2.5 pr-10 pl-10 font-serif text-[15.5px] text-[#1F2421] placeholder:text-[#8C9390] transition-colors focus:border-[#C06C54] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Hapus kata kunci pencarian"
                      className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-[#5C6360] transition-colors hover:bg-[#E8E3DA] hover:text-[#1F2421]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Interactive Category Filter Tabs */}
                <div
                  role="tablist"
                  aria-label="Filter kategori karya tulis"
                  className="flex flex-wrap items-center gap-2"
                >
                  {WORK_CATEGORIES.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveCategory(category)}
                        className={`inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 font-sans text-[13px] font-semibold tracking-[0.02em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C06C54] whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'border-[#C06C54] bg-[#C06C54] text-[#FAF9F6]'
                            : 'border-[#E4DFD5] bg-[#F2EFE9] text-[#5C6360] hover:border-[#D5CFC3] hover:bg-[#EBE6DC] hover:text-[#1F2421]'
                        }`}
                      >
                        <span>{category}</span>
                        <span
                          className={`text-[11px] tabular-nums ${
                            isActive ? 'text-[#FAF9F6]/85' : 'text-[#87736D]'
                          }`}
                        >
                          {categoryCounts[category]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Search Feedback Bar */}
              {normalizedQuery && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 font-sans text-[13px] text-[#5C6360]">
                  <p>
                    Menampilkan{' '}
                    <span className="font-semibold text-[#1F2421] tabular-nums">
                      {filteredWorks.length}
                    </span>{' '}
                    karya untuk kata kunci{' '}
                    <span className="font-semibold text-[#914731]">
                      “{searchQuery.trim()}”
                    </span>
                    {activeCategory !== 'Semua' && (
                      <span> pada kategori {activeCategory}</span>
                    )}
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('Semua');
                    }}
                    className="editorial-underline cursor-pointer font-semibold text-[#1F2421] transition-colors hover:text-[#C06C54]"
                  >
                    Atur ulang penyaringan
                  </button>
                </div>
              )}

              {/* Dynamic Works Grid or Empty State */}
              {filteredWorks.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {filteredWorks.map((work) => (
                      <WorkCard
                        key={work.id}
                        work={work}
                        onSelect={(item) => setSelectedArticle(item)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="mt-8 rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] px-6 py-12 text-center sm:px-10">
                  <p className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                    Pencarian Arsip
                  </p>
                  <h3 className="mt-2 font-display text-[24px] font-medium text-[#1F2421]">
                    Tidak ada karya yang sesuai
                  </h3>
                  <p className="mx-auto mt-2.5 max-w-md font-serif text-[16px] leading-[1.68] text-[#5C6360]">
                    Tidak ditemukan tulisan dengan kata kunci “{searchQuery.trim()}”
                    {activeCategory !== 'Semua'
                      ? ` di kategori ${activeCategory}`
                      : ''}
                    . Coba gunakan kata kunci lain seperti{' '}
                    <span className="italic text-[#1F2421]">kopi</span>,{' '}
                    <span className="italic text-[#1F2421]">skenario</span>, atau{' '}
                    <span className="italic text-[#1F2421]">EYD</span>.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {activeCategory !== 'Semua' && worksMatchingQuery.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveCategory('Semua')}
                        className="inline-flex min-h-[42px] cursor-pointer items-center rounded-lg bg-[#C06C54] px-5 py-2 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#FAF9F6] transition-colors hover:bg-[#A85842]"
                      >
                        Lihat di Semua Kategori ({worksMatchingQuery.length})
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('Semua');
                      }}
                      className="inline-flex min-h-[42px] cursor-pointer items-center rounded-lg border border-[#1F2421] px-5 py-2 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#1F2421] transition-colors hover:bg-[#1F2421] hover:text-[#FAF9F6]"
                    >
                      Tampilkan Semua Karya
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 3: Tentang Penulis */}
          <section
            id="tentang"
            aria-labelledby="tentang-heading"
            className="scroll-mt-24 border-t border-[#E4DFD5] py-16 sm:py-24"
          >
            <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <p className="font-sans text-[12px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                    Tentang
                  </p>
                  <h2
                    id="tentang-heading"
                    className="mt-2.5 font-display text-[32px] leading-[1.2] font-semibold tracking-[-0.015em] text-[#1F2421] sm:text-[38px]"
                  >
                    Menulis sebagai Laku Mendengar
                  </h2>
                </div>

                <div className="space-y-5 font-serif text-[18px] leading-[1.78] text-[#1F2421]/90 lg:col-span-8">
                  <p>
                    Berangkat dari kegemaran membaca majalah sastra dan arsip
                    surat kabar lama, saya menekuni dunia kepenulisan dan
                    penyuntingan selama lebih dari enam tahun. Pekerjaan saya
                    berada di persimpangan antara jurnalisme lambat, dramaturgi
                    naskah, dan disiplin ketat bahasa Indonesia baku.
                  </p>
                  <p className="text-[#5C6360]">
                    Baik saat menulis esai budaya dari nol maupun menyunting
                    manuskrip setebal ratusan halaman, pendekatan saya selalu
                    serupa: menghormati kecerdasan pembaca, merawat keutuhan
                    suara penulis, dan memastikan setiap tanda baca bekerja pada
                    tempatnya.
                  </p>

                  <div className="grid grid-cols-1 gap-6 border-t border-[#E4DFD5] pt-6 sm:grid-cols-3">
                    <div>
                      <p className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                        Rujukan Bahasa
                      </p>
                      <p className="mt-1.5 font-sans text-[13.5px] font-medium text-[#1F2421]">
                        EYD Edisi V &amp; KBBI VI Daring
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                        Bidang Fokus
                      </p>
                      <p className="mt-1.5 font-sans text-[13.5px] font-medium text-[#1F2421]">
                        Budaya, Sastra, Sejarah &amp; Sosial
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                        Mitra Terdahulu
                      </p>
                      <p className="mt-1.5 font-sans text-[13.5px] font-medium text-[#1F2421]">
                        Penerbit, Media &amp; Yayasan Budaya
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Jasa Editorial (Layanan) */}
          <section
            id="layanan"
            aria-labelledby="layanan-heading"
            className="scroll-mt-24 border-t border-[#E4DFD5] py-16 sm:py-24"
          >
            <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16">
              <div className="max-w-2xl">
                <p className="font-sans text-[12px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                  Jasa Editorial
                </p>
                <h2
                  id="layanan-heading"
                  className="mt-2.5 font-display text-[32px] leading-[1.2] font-semibold tracking-[-0.015em] text-[#1F2421] sm:text-[40px]"
                >
                  Ruang Lingkup Layanan
                </h2>
                <p className="mt-3 font-serif text-[17px] leading-[1.68] text-[#5C6360]">
                  Setiap proyek dikerjakan secara terukur—mulai dari riset awal,
                  penyusunan kerangka, hingga pemeriksaan aksara akhir sebelum
                  naik cetak atau tayang.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                {EDITORIAL_SERVICES.map((service) => (
                  <div
                    key={service.number}
                    className="flex flex-col justify-between rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] p-6 sm:p-7"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 font-sans text-[12px]">
                        <span className="font-semibold tracking-[0.06em] text-[#914731] tabular-nums">
                          {service.number}.
                        </span>
                        <span className="font-medium text-[#5C6360]">
                          {service.subtitle}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-[24px] leading-[1.3] font-medium text-[#1F2421]">
                        {service.title}
                      </h3>
                      <p className="mt-3 font-serif text-[16px] leading-[1.68] text-[#5C6360]">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-[#E4DFD5] pt-4 font-sans text-[12px] font-medium text-[#1F2421]">
                      {service.deliverables.map((item, idx) => (
                        <span key={item} className="inline-flex items-center gap-2.5">
                          <span>{item}</span>
                          {idx < service.deliverables.length - 1 && (
                            <span className="text-[#87736D]" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: Uji Sunting (Sebelum & Sesudah) */}
          <section
            id="uji-sunting"
            aria-labelledby="uji-sunting-heading"
            className="scroll-mt-24 border-t border-[#E4DFD5] py-16 sm:py-24"
          >
            <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="font-sans text-[12px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                    Meja Kerja Penyunting
                  </p>
                  <h2
                    id="uji-sunting-heading"
                    className="mt-2.5 font-display text-[32px] leading-[1.2] font-semibold tracking-[-0.015em] text-[#1F2421] sm:text-[40px]"
                  >
                    Uji Sunting: Sebelum &amp; Sesudah
                  </h2>
                  <p className="mt-3 font-serif text-[17px] leading-[1.68] text-[#5C6360]">
                    Bandingkan draf mentah dan hasil penyelarasan untuk melihat
                    bagaimana perampingan diksi serta perbaikan struktur menjaga
                    ketajaman makna.
                  </p>
                </div>

                {/* Interactive Sample Switcher */}
                <div className="flex flex-wrap items-center gap-2">
                  {HOMEPAGE_COMPARISON_SAMPLES.map((sample) => {
                    const isSelected = sample.id === activeComparison.id;
                    return (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => setActiveComparisonId(sample.id)}
                        className={`min-h-[40px] cursor-pointer rounded-lg border px-4 py-2 font-sans text-[12.5px] font-semibold tracking-[0.03em] transition-colors duration-200 whitespace-nowrap shrink-0 ${
                          isSelected
                            ? 'border-[#1F2421] bg-[#1F2421] text-[#FAF9F6]'
                            : 'border-[#E4DFD5] bg-[#F2EFE9] text-[#5C6360] hover:border-[#D5CFC3] hover:bg-[#EBE6DC] hover:text-[#1F2421]'
                        }`}
                      >
                        {sample.category}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <EditorialComparison
                  label={`${activeComparison.projectTitle} · ${activeComparison.client}`}
                  before={activeComparison.before}
                  after={activeComparison.after}
                  editorNote={activeComparison.editorNote}
                />
              </div>
            </div>
          </section>

          {/* Section 6: Kontak & Salin Email */}
          <ContactSection
            onCopyEmail={handleCopyEmail}
            emailCopiedRecently={emailCopiedRecently}
          />
        </main>
      )}

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E4DFD5] bg-[#FAF9F6] py-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8 lg:px-16">
          <div>
            <p className="font-display text-[18px] font-semibold text-[#1F2421]">
              Teuku Aqiel Mustaqim
            </p>
            <p className="mt-1 font-sans text-[12px] text-[#5C6360]">
              © 2026 Teuku Aqiel Mustaqim. Penulis Konten, Penyunting &amp; Penulis Naskah.
            </p>
            <a
              href={`mailto:${AUTHOR_EMAIL}`}
              className="mt-1.5 inline-block font-sans text-[12.5px] font-medium text-[#914731] transition-colors hover:text-[#C06C54]"
            >
              {AUTHOR_EMAIL}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[12.5px] font-medium text-[#5C6360]">
            <button
              type="button"
              onClick={() => handleNavigateSection('beranda')}
              className="cursor-pointer transition-colors hover:text-[#C06C54]"
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => handleNavigateSection('karya')}
              className="cursor-pointer transition-colors hover:text-[#C06C54]"
            >
              Karya Tulis
            </button>
            <button
              type="button"
              onClick={() => handleNavigateSection('layanan')}
              className="cursor-pointer transition-colors hover:text-[#C06C54]"
            >
              Layanan
            </button>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="editorial-underline cursor-pointer font-semibold text-[#1F2421] transition-colors hover:text-[#C06C54]"
            >
              Salin Email
            </button>
          </div>
        </div>
      </footer>

      <N8nChatbot
        pageContext={
          selectedArticle
            ? `Membaca karya: ${selectedArticle.title}`
            : `Beranda Portofolio (Kategori aktif: ${activeCategory})`
        }
        onCopyEmail={handleCopyEmail}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
