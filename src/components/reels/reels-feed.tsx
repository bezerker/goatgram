"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ReelCard } from "@/components/reels/reel-card";
import type { Post } from "@/lib/mock-data";

type ReelsFeedProps = {
  posts: Post[];
  onUploadOpen: () => void;
};

export function ReelsFeed({ posts, onUploadOpen }: ReelsFeedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activePostId, setActivePostId] = useState(posts[0]?.id ?? "");
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);

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

  const likedLookup = useMemo(() => new Set(likedPostIds), [likedPostIds]);

  return (
    <div ref={containerRef} className="hide-scrollbar flex-1 snap-y snap-mandatory overflow-y-auto bg-[var(--surface-strong)]">
      {posts.map((post) => (
        <div key={post.id} data-post-id={post.id} className="snap-start">
          <ReelCard
            post={post}
            isActive={activePostId === post.id}
            isLiked={likedLookup.has(post.id)}
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
