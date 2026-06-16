"use client";

import Link from "next/link";
import { Heart, MessageCircle, Music2, Send, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Post } from "@/lib/mock-data";

type ReelCardProps = {
  post: Post;
  isActive: boolean;
  isLiked: boolean;
  onToggleLike: () => void;
  onUploadOpen: () => void;
};

export function ReelCard({ post, isActive, isLiked, onToggleLike, onUploadOpen }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (isActive) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isActive]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <article className="relative flex h-[calc(100dvh-10.6rem)] min-h-[34rem] overflow-hidden bg-black text-white md:h-[43rem]">
      <video
        ref={videoRef}
        src={post.videoUrl}
        className="absolute inset-0 size-full object-cover"
        loop
        muted
        playsInline
        preload={isActive ? "metadata" : "none"}
      />

      <div className="video-overlay absolute inset-0" />

      <button
        type="button"
        onClick={() => setMuted((current) => !current)}
        className="absolute right-4 top-4 z-10 rounded-full bg-black/35 p-2"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>

      <div className="relative z-10 mt-auto flex w-full items-end justify-between gap-4 p-5">
        <div className="max-w-[76%]">
          <div className="flex items-center gap-3">
            <span
              className="flex size-11 items-center justify-center rounded-full border border-white/30 text-sm font-bold"
              style={{ backgroundColor: post.author.accent }}
            >
              {post.author.initials}
            </span>
            <div>
              <Link href={`/profile/${post.author.handle}`} className="text-sm font-semibold">
                @{post.author.handle}
              </Link>
              <p className="text-xs text-white/70">{post.author.tagline}</p>
            </div>
          </div>

          <p className="mt-4 text-[0.95rem] font-medium leading-6">{post.caption}</p>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/85">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/14 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-full bg-white/14 px-3 py-2 text-xs text-white/90 backdrop-blur">
            <Music2 className="size-3.5" />
            <span className="truncate">{post.audioTitle}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 text-center">
          <button type="button" onClick={onToggleLike} className="flex flex-col items-center gap-1" aria-label="Like reel">
            <Heart className={`size-7 ${isLiked ? "fill-[#ff3040] text-[#ff3040]" : "text-white"}`} />
            <span className="text-[0.72rem] font-semibold">{isLiked ? post.likesLabelAlt : post.likesLabel}</span>
          </button>

          <button type="button" className="flex flex-col items-center gap-1" aria-label="Open comments">
            <MessageCircle className="size-7" />
            <span className="text-[0.72rem] font-semibold">{post.commentCount}</span>
          </button>

          <button type="button" className="flex flex-col items-center gap-1" aria-label="Share reel">
            <Send className="size-7" />
            <span className="text-[0.72rem] font-semibold">share</span>
          </button>

          <button type="button" onClick={onUploadOpen} className="flex flex-col items-center gap-1" aria-label="Open upload placeholder">
            <span className="rounded-2xl border border-white/30 bg-white/15 px-3 py-2 text-lg font-black tracking-[0.18em]">
              +
            </span>
            <span className="text-[0.72rem] font-semibold">upload</span>
          </button>
        </div>
      </div>
    </article>
  );
}
