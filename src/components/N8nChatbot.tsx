import { MessageSquare, RotateCcw, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { AUTHOR_EMAIL } from '../data/portfolioData';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timestamp: string;
  isError?: boolean;
}

interface N8nChatbotProps {
  pageContext: string;
  onCopyEmail: () => void;
}

const QUICK_PROMPTS = [
  'Layanan editorial apa saja yang tersedia?',
  'Bagaimana cara mengajukan proyek penyuntingan?',
  'Rekomendasikan karya tulis Teuku Aqiel Mustaqim',
];

function formatCurrentTime(): string {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}

function createInitialMessages(): ChatMessage[] {
  return [
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Halo, selamat datang di ruang portofolio Teuku Aqiel Mustaqim. Ada yang bisa saya bantu mengenai karya tulis, layanan penyuntingan, atau rencana kolaborasi Anda?',
      timestamp: formatCurrentTime(),
    },
  ];
}

function createSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `sesi_${crypto.randomUUID().replace(/-/g, '')}`;
  }
  return `sesi_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function N8nChatbot({ pageContext, onCopyEmail }: N8nChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    createInitialMessages()
  );
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => createSessionId());

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, messages.length, isSending]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sendMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isSending) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: formatCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          sessionId,
          pageContext,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        sessionId?: string;
        error?: string;
      };

      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      if (!response.ok || !data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            role: 'assistant',
            text:
              data.error ||
              'Maaf, balasan dari layanan percakapan belum tersedia saat ini. Anda dapat menghubungi langsung melalui email redaksi.',
            timestamp: formatCurrentTime(),
            isError: true,
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          role: 'assistant',
          text: data.reply as string,
          timestamp: formatCurrentTime(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          text: 'Koneksi ke server percakapan terputus. Silakan coba lagi atau kirim pesan langsung ke email redaksi.',
          timestamp: formatCurrentTime(),
          isError: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(inputValue);
  };

  const handleResetChat = () => {
    setSessionId(createSessionId());
    setMessages(createInitialMessages());
    setInputValue('');
  };

  const showQuickPrompts = messages.length === 1 && !isSending;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            role="dialog"
            aria-label="Asisten Redaksi Teuku Aqiel Mustaqim"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex h-[min(540px,calc(100vh-7.5rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-[#D5CFC3] bg-[#FAF9F6] shadow-[0_12px_32px_-8px_rgba(31,36,33,0.12)]"
          >
            {/* Chat Header */}
            <header className="flex items-center justify-between gap-3 border-b border-[#E4DFD5] bg-[#F2EFE9] px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate font-display text-[19px] font-semibold text-[#1F2421]">
                  Asisten Redaksi
                </h2>
                <p className="mt-0.5 truncate font-sans text-[11.5px] font-medium tracking-[0.03em] text-[#5C6360]">
                  Terhubung dengan alur kerja n8n
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Mulai percakapan baru"
                  aria-label="Mulai percakapan baru"
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[#5C6360] transition-colors hover:bg-[#E8E3DA] hover:text-[#1F2421]"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Tutup asisten"
                  aria-label="Tutup asisten"
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[#5C6360] transition-colors hover:bg-[#E8E3DA] hover:text-[#1F2421]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Messages Thread */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[86%] rounded-lg px-4 py-3 font-serif text-[15px] leading-[1.65] whitespace-pre-wrap ${
                        isUser
                          ? 'bg-[#C06C54] text-[#FAF9F6]'
                          : msg.isError
                            ? 'border border-[#D5CFC3] bg-[#F2EFE9] text-[#54433E]'
                            : 'border border-[#E4DFD5] bg-[#F2EFE9] text-[#1F2421]'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.isError && (
                        <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[#E4DFD5] pt-2.5 font-sans text-[12px]">
                          <a
                            href={`mailto:${AUTHOR_EMAIL}`}
                            className="editorial-underline font-semibold text-[#914731] hover:text-[#C06C54]"
                          >
                            Kirim Email
                          </a>
                          <button
                            type="button"
                            onClick={onCopyEmail}
                            className="cursor-pointer font-semibold text-[#1F2421] transition-colors hover:text-[#C06C54]"
                          >
                            Salin Email
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="mt-1 px-1 font-sans text-[10.5px] text-[#87736D] tabular-nums">
                      {isUser ? 'Anda' : 'Asisten'} · {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {/* Quick Starter Prompts */}
              {showQuickPrompts && (
                <div className="space-y-2 pt-1">
                  <p className="font-sans text-[11px] font-semibold tracking-[0.06em] text-[#5C6360] uppercase">
                    Pertanyaan Cepat
                  </p>
                  <div className="flex flex-col gap-2">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        className="cursor-pointer rounded-lg border border-[#E4DFD5] bg-[#FAF9F6] px-3.5 py-2.5 text-left font-sans text-[12.5px] font-medium text-[#1F2421] transition-colors duration-200 hover:border-[#C06C54] hover:bg-[#F2EFE9]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {isSending && (
                <div className="flex flex-col items-start">
                  <div className="rounded-lg border border-[#E4DFD5] bg-[#F2EFE9] px-4 py-3 font-serif text-[14.5px] italic text-[#5C6360]">
                    Sedang menyiapkan balasan...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Composer Form */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-[#E4DFD5] bg-[#FAF9F6] p-3.5"
            >
              <div className="flex items-center gap-2">
                <label htmlFor="chatbot-input" className="sr-only">
                  Tulis pesan untuk Asisten Redaksi
                </label>
                <input
                  ref={inputRef}
                  id="chatbot-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isSending}
                  maxLength={2000}
                  placeholder="Tulis pertanyaan Anda..."
                  className="min-h-[42px] flex-1 rounded-lg border border-[#D5CFC3] bg-[#FAF9F6] px-3.5 py-2 font-serif text-[15px] text-[#1F2421] placeholder:text-[#8C9390] transition-colors focus:border-[#C06C54] focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isSending || !inputValue.trim()}
                  aria-label="Kirim pesan"
                  className="inline-flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#C06C54] text-[#FAF9F6] transition-colors duration-200 hover:bg-[#A85842] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Tutup Asisten Redaksi' : 'Buka Asisten Redaksi'}
        className="inline-flex min-h-[46px] cursor-pointer items-center gap-2.5 rounded-lg border border-[#A85842] bg-[#C06C54] px-4 py-2.5 font-sans text-[13px] font-semibold tracking-[0.03em] text-[#FAF9F6] shadow-[0_10px_24px_-8px_rgba(31,36,33,0.22)] transition-colors duration-200 hover:bg-[#A85842] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C06C54] whitespace-nowrap"
      >
        {isOpen ? (
          <>
            <X className="h-4 w-4 shrink-0" />
            <span>Tutup Asisten</span>
          </>
        ) : (
          <>
            <MessageSquare className="h-4 w-4 shrink-0" />
            <span>Tanya Asisten</span>
          </>
        )}
      </button>
    </div>
  );
}
