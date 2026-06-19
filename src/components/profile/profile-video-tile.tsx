"use client";

import { Play, Pause } from "lucide-react";
import { useRef, useState } from "react";
import type { Post } from "@/lib/mock-data";

type ProfileVideoTileProps = {
  post: Post;
};

export function ProfileVideoTile({ post }: ProfileVideoTileProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="group relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
      <video
        ref={videoRef}
        className="size-full object-cover transition duration-300 group-hover:scale-[1.03]"
        src={post.videoUrl}
        muted
        playsInline
        loop
        preload="metadata"
        poster={`data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 1280'><rect width='100%' height='100%' fill='${post.author.accent}'/></svg>`)}`}
      />
      <button
        type="button"
        onClick={() => {
          const video = videoRef.current;
          if (!video) {
            return;
          }

          if (video.paused) {
            void video.play().then(() => setIsPlaying(true)).catch(() => undefined);
            return;
          }

          video.pause();
          setIsPlaying(false);
        }}
        className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white backdrop-blur"
        aria-label={isPlaying ? "Pause profile video" : "Play profile video"}
      >
        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/45 to-transparent p-4 text-white">
        <p className="text-sm font-semibold">{post.caption}</p>
        <div className="mt-2 flex items-center justify-between text-xs text-white/80">
          <span>@{post.author.handle}</span>
          <span>{post.likesLabel}</span>
        </div>
      </div>
    </article>
  );
}
