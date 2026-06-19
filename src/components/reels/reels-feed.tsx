"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ReelCard } from "@/components/reels/reel-card";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { Post } from "@/lib/mock-data";

type ReelsFeedProps = {
  posts: Post[];
  onUploadOpen: () => void;
};

export function ReelsFeed({ posts, onUploadOpen }: ReelsFeedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activePostId, setActivePostId] = useState(posts[0]?.id ?? "");
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target instanceof HTMLElement) {
          setActivePostId(visibleEntry.target.dataset.postId ?? posts[0]?.id ?? "");
        }
      },
      { root: container, threshold: [0.45, 0.7] },
    );

    const cards = container.querySelectorAll<HTMLElement>("[data-post-id]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [posts]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (prefersReducedMotion || !container.matches(":hover")) {
        return;
      }

      const atTop = container.scrollTop === 0 && event.deltaY < 0;
      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight && event.deltaY > 0;

      if (atTop || atBottom) {
        return;
      }

      event.preventDefault();
      container.scrollBy({ top: event.deltaY, behavior: "auto" });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => container.removeEventListener("wheel", handleWheel);
  }, [prefersReducedMotion]);

  const likedLookup = useMemo(() => new Set(likedPostIds), [likedPostIds]);
  const activePostIndex = posts.findIndex((post) => post.id === activePostId);

  return (
    <div ref={containerRef} className="hide-scrollbar min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto bg-[var(--surface-strong)]">
      {posts.map((post, index) => (
        <div key={post.id} data-post-id={post.id} className="h-full snap-start">
          <ReelCard
            post={post}
            isActive={activePostId === post.id}
            isLiked={likedLookup.has(post.id)}
            preload={index === activePostIndex ? "auto" : Math.abs(index - activePostIndex) <= 1 ? "metadata" : "none"}
            onToggleLike={() =>
              setLikedPostIds((current) =>
                current.includes(post.id) ? current.filter((id) => id !== post.id) : [...current, post.id],
              )
            }
            onUploadOpen={onUploadOpen}
          />
        </div>
      ))}
    </div>
  );
}
