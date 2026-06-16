"use client";

import { useCallback, useMemo, useState } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { TopBar } from "@/components/navigation/top-bar";
import { BaaaaaModal } from "@/components/overlays/baaaaa-modal";
import { ReelsFeed } from "@/components/reels/reels-feed";
import { StoryViewer } from "@/components/stories/story-viewer";
import { StoriesBar } from "@/components/stories/stories-bar";
import { mockPosts, mockStories } from "@/lib/mock-data";

export function GoatgramApp() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);

  const activeStoryIndex = useMemo(
    () => mockStories.findIndex((story) => story.id === activeStoryId),
    [activeStoryId],
  );

  const activeStory = activeStoryIndex >= 0 ? mockStories[activeStoryIndex] : null;
  const closeStory = useCallback(() => setActiveStoryId(null), []);
  const openUpload = useCallback(() => setIsUploadOpen(true), []);
  const nextStory = useCallback(() => {
    setActiveStoryId((current) => {
      const index = mockStories.findIndex((story) => story.id === current);
      return mockStories[(index + 1) % mockStories.length]?.id ?? null;
    });
  }, []);
  const previousStory = useCallback(() => {
    setActiveStoryId((current) => {
      const index = mockStories.findIndex((story) => story.id === current);
      return mockStories[(index - 1 + mockStories.length) % mockStories.length]?.id ?? null;
    });
  }, []);

  return (
    <main className="min-h-dvh bg-[var(--app-bg)] px-2 py-2 text-[var(--text-primary)] sm:px-6 sm:py-6">
      <div className="mx-auto flex min-h-[calc(100dvh-1rem)] w-full max-w-[460px] flex-col overflow-hidden rounded-[2.25rem] border border-[var(--border-soft)] bg-[var(--surface)] shadow-[0_24px_100px_rgba(0,0,0,0.24)] backdrop-blur md:min-h-[900px]">
        <TopBar />
        <StoriesBar stories={mockStories} onSelect={setActiveStoryId} />
        <ReelsFeed posts={mockPosts} onUploadOpen={openUpload} />
        <BottomNav onUploadOpen={openUpload} />
      </div>

      <BaaaaaModal open={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

      {activeStory ? (
        <StoryViewer
          key={activeStory.id}
          story={activeStory}
          storyCount={mockStories.length}
          storyIndex={activeStoryIndex}
          onClose={closeStory}
          onNext={nextStory}
          onPrevious={previousStory}
        />
      ) : null}
    </main>
  );
}
