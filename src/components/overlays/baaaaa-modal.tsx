"use client";

import { useEffect } from "react";

type BaaaaaModalProps = {
  open: boolean;
  onClose: () => void;
};

export function BaaaaaModal({ open, onClose }: BaaaaaModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="baaaaa-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-[2rem] border border-white/15 bg-[#111114] p-8 text-center text-white shadow-[0_25px_100px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="text-7xl">🐐</div>
        <h2 id="baaaaa-title" className="mt-4 text-5xl font-black tracking-[0.2em] text-white">
          BAAAAA
        </h2>
        <p className="mt-4 text-sm text-white/75">Upload later. Yell now.</p>
      </div>
    </div>
  );
}
