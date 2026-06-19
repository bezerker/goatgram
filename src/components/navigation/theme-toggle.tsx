"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full p-2 transition hover:bg-black/5 dark:hover:bg-white/10"
    >
      {mounted ? (isDark ? <SunMedium className="size-5" /> : <MoonStar className="size-5" />) : <span className="block size-5" />}
    </button>
  );
}
