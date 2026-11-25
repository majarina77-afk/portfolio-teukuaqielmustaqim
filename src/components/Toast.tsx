import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  return (
    <div
      className="pointer-events-none fixed right-4 bottom-20 z-50 flex justify-end sm:right-6 sm:bottom-22"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-3 rounded-lg border border-[#D5CFC3] bg-[#1F2421] px-4 py-3 text-[#FAF9F6] shadow-[0_12px_32px_-8px_rgba(31,36,33,0.2)]"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C06C54] text-[#FAF9F6]">
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span className="font-sans text-sm font-medium tracking-[0.01em] whitespace-nowrap">
              {message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
