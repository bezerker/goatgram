"use client";

import Link from "next/link";
import { Compass, House, PlusSquare, PlaySquare, UserRound } from "lucide-react";

type BottomNavProps = {
  onUploadOpen: () => void;
};

export function BottomNav({ onUploadOpen }: BottomNavProps) {
  return (
    <nav className="sticky bottom-0 z-30 border-t border-[var(--border-soft)] bg-[var(--surface)] px-4 pb-[calc(env(safe-area-inset-bottom)+0.85rem)] pt-3 backdrop-blur">
      <ul className="grid grid-cols-5 items-center text-[var(--text-primary)]">
        <li className="flex justify-center">
          <Link href="/" aria-label="Home" className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10">
            <House className="size-6" />
          </Link>
        </li>
        <li className="flex justify-center">
          <button type="button" aria-label="Explore" className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10">
            <Compass className="size-6" />
          </button>
        </li>
        <li className="flex justify-center">
          <button
            type="button"
            aria-label="Upload goat video"
            onClick={onUploadOpen}
            className="rounded-[1.2rem] bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[2px] shadow-[0_12px_30px_rgba(253,29,29,0.35)]"
          >
            <span className="flex size-12 items-center justify-center rounded-[1rem] bg-[var(--surface-strong)]">
              <PlusSquare className="size-6" />
            </span>
          </button>
        </li>
        <li className="flex justify-center">
          <button type="button" aria-label="Reels" className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10">
            <PlaySquare className="size-6" />
          </button>
        </li>
        <li className="flex justify-center">
          <Link href="/profile/goatgram" aria-label="Profile" className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10">
            <UserRound className="size-6" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
