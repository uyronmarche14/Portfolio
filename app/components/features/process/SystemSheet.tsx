"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

export const SHEET_W = 0;

/**
 * A modal for the full write-up of whatever is open: a centred dialog over a dimmed backdrop on desktop, a bottom sheet on phones.
 * Escape and a click on the backdrop close it (Escape is handled by the page). Page scroll is locked while it is open.
 */
export default function SystemSheet({ open, label, onClose, footer, children }: { open: boolean; label: string; onClose: () => void; footer?: ReactNode; children: ReactNode }) {
  const reduce = useReducedMotion();
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    close.current?.focus({ preventScroll: true });
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="absolute inset-0 bg-black/55"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={reduce ? false : { opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.98 }}
            transition={reduce ? { duration: 0 } : { type: "spring", damping: 28, stiffness: 320 }}
            className="relative flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-foreground/15 bg-background shadow-soft-lg sm:h-[90vh] sm:max-w-5xl sm:rounded-3xl"
          >
            <div className="flex items-center justify-between gap-3 px-6 pb-2 pt-4 sm:px-12 sm:pt-6">
              <span aria-hidden="true" className="mx-auto h-1 w-10 rounded-full bg-foreground/20 sm:hidden" />
              <p className="hidden font-mono text-xs text-foreground/50 sm:block">Details</p>
              <button
                ref={close}
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="absolute right-4 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:static"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.05 }}
              className="min-h-0 flex-1 overflow-y-auto px-6 pb-10 sm:px-12"
            >
              {children}
            </motion.div>
            {footer && <div className="border-t border-foreground/10 px-6 py-3 sm:px-12">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
