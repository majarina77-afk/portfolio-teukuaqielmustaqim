import { Check, Copy, Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { AUTHOR_EMAIL } from '../data/portfolioData';

interface ContactSectionProps {
  onCopyEmail: () => void;
  emailCopiedRecently: boolean;
}

const INQUIRY_TOPICS = [
  'Penulisan Artikel & Esai',
  'Penulisan Naskah & Fiksi',
  'Penyuntingan Buku / Dokumen',
  'Pembacaan Aksara (Proofreading)',
];

export function ContactSection({
  onCopyEmail,
  emailCopiedRecently,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Penulisan Artikel & Esai',
  ]);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !senderEmail.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setSenderEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section
      id="kontak"
      aria-labelledby="kontak-heading"
      className="scroll-mt-24 border-t border-[#E4DFD5] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Editorial Invitation & Copy Email */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="font-sans text-[12px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                Kontak &amp; Kolaborasi
              </p>
              <h2
                id="kontak-heading"
                className="mt-3 font-display text-[32px] leading-[1.2] font-semibold tracking-[-0.015em] text-[#1F2421] sm:text-[40px]"
              >
                Mari Bicarakan Naskah Anda Berikutnya
              </h2>
              <p className="mt-4 font-serif text-[17px] leading-[1.72] text-[#5C6360] sm:text-[18px]">
                Terbuka untuk penugasan penulisan artikel panjang, pengembangan
                skenario, penyuntingan buku, maupun pembacaan aksara bagi
                penerbit, media, dan lembaga kebudayaan.
              </p>

              {/* Direct Email Card */}
              <div className="mt-8 rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] p-5 sm:p-6">
                <p className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#5C6360] uppercase">
                  Korespondensi Redaksi
                </p>
                <p className="mt-2 break-all font-display text-[22px] font-medium text-[#1F2421] sm:text-[24px]">
                  {AUTHOR_EMAIL}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onCopyEmail}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg bg-[#C06C54] px-5 py-2.5 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#FAF9F6] transition-colors duration-200 hover:bg-[#A85842] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C06C54] whitespace-nowrap"
                  >
                    {emailCopiedRecently ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span>Salin Email</span>
                  </button>

                  <a
                    href={`mailto:${AUTHOR_EMAIL}?subject=${encodeURIComponent(
                      'Penawaran Kolaborasi Editorial — Teuku Aqiel'
                    )}`}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#1F2421] px-5 py-2.5 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#1F2421] transition-colors duration-200 hover:bg-[#1F2421] hover:text-[#FAF9F6] whitespace-nowrap"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Buka Aplikasi Surel</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#E4DFD5] pt-5 font-sans text-[12.5px] leading-[1.7] text-[#5C6360]">
              <p>
                <span className="font-semibold text-[#1F2421]">Basis Kerja:</span>{' '}
                Jakarta &amp; Banda Aceh · Tersedia untuk kolaborasi jarak jauh
                seluruh Indonesia.
              </p>
              <p className="mt-1">
                <span className="font-semibold text-[#1F2421]">Waktu Balas:</span>{' '}
                Umumnya dalam 1–2 hari kerja.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Inquiry Form */}
          <div className="rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] p-6 sm:p-8 lg:col-span-7">
            {submitted ? (
              <div className="flex h-full flex-col justify-center py-8">
                <p className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
                  Ringkasan Pesan Siap Dikirim
                </p>
                <h3 className="mt-2 font-display text-[28px] leading-[1.25] font-medium text-[#1F2421]">
                  Terima kasih, {name}.
                </h3>
                <p className="mt-3 font-serif text-[17px] leading-[1.7] text-[#5C6360]">
                  Catatan proyek Anda telah tercatat di halaman ini. Untuk
                  respons paling cepat, Anda dapat langsung menyalin alamat
                  email redaksi atau mengirimkannya melalui aplikasi surel Anda.
                </p>

                <div className="mt-6 rounded-lg border border-[#E4DFD5] bg-[#FAF9F6] p-5 font-serif text-[15px] leading-[1.68] text-[#1F2421]">
                  <p className="font-sans text-[11.5px] font-semibold tracking-[0.05em] text-[#5C6360] uppercase">
                    Kebutuhan:{' '}
                    {selectedTopics.length > 0
                      ? selectedTopics.join(', ')
                      : 'Konsultasi Editorial'}
                  </p>
                  <p className="mt-2 text-[#5C6360]">“{message}”</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${AUTHOR_EMAIL}?subject=${encodeURIComponent(
                      `Kolaborasi Editorial dari ${name}`
                    )}&body=${encodeURIComponent(
                      `Halo Teuku Aqiel,\n\nNama: ${name}\nEmail: ${senderEmail}\nKebutuhan: ${selectedTopics.join(
                        ', '
                      )}\n\nPesan:\n${message}`
                    )}`}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#C06C54] px-5 py-2.5 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#FAF9F6] transition-colors hover:bg-[#A85842]"
                  >
                    Kirim via Surel
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex min-h-[44px] cursor-pointer items-center rounded-lg border border-[#1F2421] px-5 py-2.5 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#1F2421] transition-colors hover:bg-[#1F2421] hover:text-[#FAF9F6]"
                  >
                    Tulis Pesan Baru
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-display text-[24px] font-medium text-[#1F2421]">
                    Formulir Ringkasan Proyek
                  </h3>
                  <p className="mt-1 font-serif text-[15.5px] text-[#5C6360]">
                    Ceritakan singkat naskah, tenggat, atau kebutuhan redaksi
                    Anda.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block font-sans text-[12px] font-semibold tracking-[0.04em] text-[#1F2421]"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Misal: Nadia Larasati"
                      className="w-full rounded-lg border border-[#D5CFC3] bg-[#FAF9F6] px-3.5 py-2.5 font-serif text-[16px] text-[#1F2421] placeholder:text-[#8C9390] transition-colors focus:border-[#C06C54] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block font-sans text-[12px] font-semibold tracking-[0.04em] text-[#1F2421]"
                    >
                      Alamat Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="nama@institusi.id"
                      className="w-full rounded-lg border border-[#D5CFC3] bg-[#FAF9F6] px-3.5 py-2.5 font-serif text-[16px] text-[#1F2421] placeholder:text-[#8C9390] transition-colors focus:border-[#C06C54] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Custom Checkboxes matching Design System */}
                <fieldset>
                  <legend className="mb-2.5 font-sans text-[12px] font-semibold tracking-[0.04em] text-[#1F2421]">
                    Kebutuhan Editorial
                  </legend>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {INQUIRY_TOPICS.map((topic) => {
                      const isChecked = selectedTopics.includes(topic);
                      return (
                        <label
                          key={topic}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#E4DFD5] bg-[#FAF9F6] px-3.5 py-2.5 transition-colors hover:border-[#D5CFC3]"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleTopic(topic)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                              isChecked
                                ? 'border-[#C06C54] bg-[#C06C54] text-[#FAF9F6]'
                                : 'border-[#5C6360] bg-[#FAF9F6]'
                            }`}
                          >
                            {isChecked && <Check className="h-3 w-3" strokeWidth={3} />}
                          </span>
                          <span className="font-sans text-[13px] font-medium text-[#1F2421]">
                            {topic}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block font-sans text-[12px] font-semibold tracking-[0.04em] text-[#1F2421]"
                  >
                    Ringkasan Proyek atau Naskah
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan gambaran singkat topik, perkiraan panjang naskah, atau linimasa penerbitan..."
                    className="w-full resize-y rounded-lg border border-[#D5CFC3] bg-[#FAF9F6] px-3.5 py-2.5 font-serif text-[16px] leading-[1.6] text-[#1F2421] placeholder:text-[#8C9390] transition-colors focus:border-[#C06C54] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <p className="font-sans text-[12px] text-[#5C6360]">
                    Seluruh naskah dan informasi proyek dijaga kerahasiaannya.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg bg-[#C06C54] px-6 py-2.5 font-sans text-[13.5px] font-semibold tracking-[0.04em] text-[#FAF9F6] transition-colors duration-200 hover:bg-[#A85842] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C06C54] whitespace-nowrap"
                  >
                    Siapkan Pesan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
