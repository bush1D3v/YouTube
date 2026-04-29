'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Lightweight accessible modal. For a real product we'd reach for Radix /
 * shadcn-ui — but for this scope, a focused custom dialog keeps the bundle
 * small and the dependency surface honest.
 *
 * Implements:
 *  - Escape to close
 *  - Click on backdrop to close
 *  - Focus trap (basic) by autofocusing the first input
 *  - aria-modal, aria-labelledby, aria-describedby
 *  - Restores body scroll on close
 */
export function Modal({ open, onClose, title, description, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    // Autofocus first focusable element.
    const focusable = dialogRef.current?.querySelector<HTMLElement>(
      'input, select, textarea, button',
    );
    focusable?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-desc' : undefined}
        onClick={(e) => e.stopPropagation()}
        className="card w-full max-w-md rounded-t-2xl p-6 sm:rounded-2xl"
      >
        <div className="mb-4">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
            {title}
          </h2>
          {description && (
            <p id="modal-desc" className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
