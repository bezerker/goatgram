"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import type { Story } from "@/lib/mock-data";

type StoryViewerProps = {
  story: Story;
  storyCount: number;
  storyIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

const STORY_DURATION = 5000;

export function StoryViewer({ story, storyCount, storyIndex, onClose, onNext, onPrevious }: StoryViewerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    const interval = window.setInterval(() => {
      const nextProgress = Math.min(((performance.now() - startedAt) / STORY_DURATION) * 100, 100);
      setProgress(nextProgress);
      if (nextProgress >= 100) {
        onNext();
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [story.id, onNext]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  const segments = useMemo(() => Array.from({ length: storyCount }, (_, index) => index), [storyCount]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white">
      <div className="mx-auto flex h-full w-full max-w-[460px] flex-col">
        <div className="absolute inset-x-0 top-0 z-10 mx-auto flex w-full max-w-[460px] gap-1 px-4 pt-4">
          {segments.map((segment) => (
            <div key={segment} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-100"
                style={{ width: `${segment < storyIndex ? 100 : segment === storyIndex ? progress : 0}%` }}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="absolute right-4 top-6 z-20 rounded-full bg-black/35 p-2"
          onClick={onClose}
          aria-label="Close story viewer"
        >
          <X className="size-5" />
        </button>

        <button type="button" className="absolute inset-y-0 left-0 z-10 w-1/3" onClick={onPrevious} aria-label="Previous story" />
        <button type="button" className="absolute inset-y-0 right-0 z-10 w-1/3" onClick={onNext} aria-label="Next story" />

        <video
          key={story.id}
          src={story.videoUrl}
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="rounded-[2rem] bg-black/30 p-4 backdrop-blur">
            <div className="text-sm font-semibold">{story.author.name}</div>
            <div className="mt-1 text-sm text-white/80">{story.note}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
