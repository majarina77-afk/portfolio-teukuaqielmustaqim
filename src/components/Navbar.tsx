import { ArrowLeft, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  isReadingArticle: boolean;
  onNavigateSection: (sectionId: string) => void;
  onBackToWorks: () => void;
}

const NAV_LINKS = [
  { id: 'karya', label: 'Karya Tulis' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'uji-sunting', label: 'Uji Sunting' },
];

export function Navbar({
  isReadingArticle,
  onNavigateSection,
  onBackToWorks,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E4DFD5] bg-[#FAF9F6]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8 lg:gap-8 lg:px-16">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('beranda')}
          className="cursor-pointer font-display text-[18px] font-semibold tracking-[-0.015em] text-[#1F2421] transition-colors duration-200 hover:text-[#C06C54] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C06C54] whitespace-nowrap shrink-0 sm:text-[21px]"
        >
          Teuku Aqiel Mustaqim
        </button>

        {/* Zone 2: Clean Single-Line Navigation Links (Desktop) */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className="cursor-pointer font-sans text-[13px] font-medium tracking-[0.04em] text-[#5C6360] transition-colors duration-200 hover:text-[#1F2421] hover:underline hover:decoration-[#C06C54] hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C06C54] whitespace-nowrap shrink-0"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action (Desktop) / Back + Menu (Mobile) */}
        <div className="flex items-center gap-3 shrink-0">
          {isReadingArticle ? (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBackToWorks();
              }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#1F2421] px-3.5 py-2 font-sans text-xs font-semibold tracking-[0.04em] text-[#1F2421] transition-colors duration-200 hover:bg-[#1F2421] hover:text-[#FAF9F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C06C54] whitespace-nowrap shrink-0 sm:px-4 sm:text-[13px]"
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Kembali ke Karya Tulis</span>
              <span className="sm:hidden">Kembali</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleNavClick('kontak')}
              className="hidden cursor-pointer rounded-lg bg-[#C06C54] px-5 py-2.5 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#FAF9F6] transition-colors duration-200 hover:bg-[#A85842] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C06C54] whitespace-nowrap shrink-0 md:inline-flex"
            >
              Hubungi
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] text-[#1F2421] transition-colors duration-200 hover:bg-[#EBE6DC] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E4DFD5] bg-[#FAF9F6] px-5 py-4 md:hidden">
          <nav aria-label="Navigasi seluler" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-lg px-3 text-left font-sans text-sm font-medium text-[#1F2421] transition-colors hover:bg-[#F2EFE9]"
              >
                <span>{link.label}</span>
              </button>
            ))}
            <div className="mt-2 border-t border-[#E4DFD5] pt-3">
              <button
                type="button"
                onClick={() => handleNavClick('kontak')}
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-lg bg-[#C06C54] px-4 py-2.5 font-sans text-sm font-semibold tracking-[0.04em] text-[#FAF9F6] transition-colors hover:bg-[#A85842]"
              >
                Hubungi Teuku Aqiel Mustaqim
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
