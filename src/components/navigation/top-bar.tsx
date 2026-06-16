"use client";

import Link from "next/link";
import { Bell, MessageCircleHeart } from "lucide-react";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border-soft)] bg-[var(--surface)] px-5 py-4 backdrop-blur">
      <Link href="/" className="goatgram-logo text-[2rem] leading-none">
        Goatgram
      </Link>

      <div className="flex items-center gap-2 text-[var(--text-primary)]">
        <ThemeToggle />
        <button
          type="button"
          className="rounded-full p-2 transition hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </button>
        <button
          type="button"
          className="rounded-full p-2 transition hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Messages"
        >
          <MessageCircleHeart className="size-5" />
        </button>
      </div>
    </header>
  );
}
