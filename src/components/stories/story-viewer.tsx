"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { Story } from "@/lib/mock-data";

type StoryViewerProps = {
  story: Story;
  storyCount: number;
  storyIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function StoryViewer({ story, storyCount, storyIndex, onClose, onNext, onPrevious }: StoryViewerProps) {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const pausePlayback = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const resumePlayback = useCallback(async (force = false) => {
    const video = videoRef.current;
    if (!video || (prefersReducedMotion && !force)) {
      return;
    }

    try {
      await video.play();
      setNeedsInteraction(false);
      setPlaybackError(false);
    } catch {
      setNeedsInteraction(true);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (isHolding) {
      return;
    }

    let frameId = 0;

    const syncProgress = () => {
      const video = videoRef.current;
      if (video && duration > 0) {
        setProgress(Math.min((video.currentTime / duration) * 100, 100));
      }

      frameId = window.requestAnimationFrame(syncProgress);
    };

    frameId = window.requestAnimationFrame(syncProgress);

    return () => window.cancelAnimationFrame(frameId);
  }, [duration, isHolding]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === " ") {
        event.preventDefault();
        setIsHolding((current) => {
          const nextHolding = !current;
          if (nextHolding) {
            pausePlayback();
          } else {
            void resumePlayback();
          }

          return nextHolding;
        });
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrevious, pausePlayback, resumePlayback]);

  const segments = useMemo(() => Array.from({ length: storyCount }, (_, index) => index), [storyCount]);
  const showOverlay = needsInteraction || playbackError || prefersReducedMotion;

  return (
    <div
      className="fixed inset-0 z-50 bg-black text-white"
      onPointerDown={() => {
        setIsHolding(true);
        pausePlayback();
      }}
      onPointerUp={() => {
        setIsHolding(false);
        void resumePlayback();
      }}
      onPointerCancel={() => {
        setIsHolding(false);
        void resumePlayback();
      }}
    >
      <div className="mx-auto flex h-full w-full max-w-[460px] flex-col">
        <div className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-[460px] gap-1 px-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
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
          className="absolute right-4 top-[calc(env(safe-area-inset-top)+1.5rem)] z-30 rounded-full bg-black/35 p-2"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label="Close story viewer"
        >
          <X className="size-5" />
        </button>

        <button
          type="button"
          className="absolute inset-y-0 left-0 z-10 w-1/4"
          onPointerDown={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          onClick={onPrevious}
          aria-label="Previous story"
        />
        <button
          type="button"
          className="absolute bottom-0 right-0 z-10 h-[85%] w-1/4"
          onPointerDown={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          onClick={onNext}
          aria-label="Next story"
        />

        <video
          key={story.id}
          ref={videoRef}
          src={story.videoUrl}
          className="size-full object-cover"
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={(event) => {
            const nextDuration = event.currentTarget.duration;
            setDuration(Number.isFinite(nextDuration) ? nextDuration : 0);
            if (!prefersReducedMotion) {
              void resumePlayback();
            }
          }}
          onEnded={onNext}
          onError={() => {
            setPlaybackError(true);
            setNeedsInteraction(true);
          }}
        />

        {showOverlay ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              const video = videoRef.current;
              if (!video) {
                return;
              }

              video.load();
              void resumePlayback(true);
            }}
            className="absolute inset-x-6 top-1/2 z-30 flex -translate-y-1/2 items-center justify-center rounded-[1.5rem] bg-black/55 px-5 py-4 text-sm font-semibold text-white backdrop-blur"
          >
            {playbackError ? "Story failed to load. Tap to retry." : needsInteraction && !prefersReducedMotion ? "Tap to play story." : "Reduced motion on. Tap to play story."}
          </button>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="rounded-[2rem] bg-black/30 p-4 backdrop-blur">
            <div className="text-sm font-semibold">{story.author.name}</div>
            <div className="mt-1 text-sm text-white/80">{story.note}</div>
            {isHolding ? <div className="mt-2 text-xs uppercase tracking-[0.24em] text-white/60">paused</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
