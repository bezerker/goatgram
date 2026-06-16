"use client";

import type { Story } from "@/lib/mock-data";

type StoriesBarProps = {
  stories: Story[];
  onSelect: (storyId: string) => void;
};

export function StoriesBar({ stories, onSelect }: StoriesBarProps) {
  return (
    <section className="border-b border-[var(--border-soft)] bg-[var(--surface)] px-4 py-4">
      <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
        {stories.map((story) => (
          <button
            key={story.id}
            type="button"
            onClick={() => onSelect(story.id)}
            className="flex min-w-[4.75rem] flex-col items-center gap-2"
            aria-label={`Open story from ${story.author.name}`}
          >
            <span className="story-ring rounded-full p-[2px]">
              <span className="story-ring-inner flex size-[4.25rem] items-center justify-center rounded-full">
                <span
                  className="flex size-[3.8rem] items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: story.accent }}
                >
                  {story.author.initials}
                </span>
              </span>
            </span>
            <span className="max-w-[4.5rem] truncate text-[0.72rem] font-medium text-[var(--text-secondary)]">
              {story.author.handle}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
