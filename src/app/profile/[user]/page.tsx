import { mockPosts } from "@/lib/mock-data";
import { ProfileVideoTile } from "@/components/profile/profile-video-tile";
import { notFound } from "next/navigation";

type ProfilePageProps = {
  params: Promise<{
    user: string;
  }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { user } = await params;
  const filteredPosts = mockPosts.filter((post) => post.author.handle === user);

  if (filteredPosts.length === 0) {
    notFound();
  }

  const postCount = filteredPosts.length;

  return (
    <main className="min-h-dvh bg-[var(--app-bg)] px-4 py-8 text-[var(--text-primary)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/85 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur dark:bg-black/40 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              Goatgram profile
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">@{user}</h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)] sm:text-base">
              Curator of tiny hooves, barn zoomies, and highly suspicious baby-animal cinema.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-3xl bg-black/5 px-5 py-4 dark:bg-white/10">
              <div className="text-2xl font-bold">{postCount}</div>
              <div className="text-[var(--text-muted)]">posts</div>
            </div>
            <div className="rounded-3xl bg-black/5 px-5 py-4 dark:bg-white/10">
              <div className="text-2xl font-bold">32.4K</div>
              <div className="text-[var(--text-muted)]">fans</div>
            </div>
            <div className="rounded-3xl bg-black/5 px-5 py-4 dark:bg-white/10">
              <div className="text-2xl font-bold">118</div>
              <div className="text-[var(--text-muted)]">following</div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filteredPosts.map((post) => (
            <ProfileVideoTile key={post.id} post={post} />
          ))}
        </section>
      </div>
    </main>
  );
}
