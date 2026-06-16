export type Author = {
  name: string;
  handle: string;
  initials: string;
  accent: string;
  tagline: string;
};

export type Post = {
  id: string;
  videoUrl: string;
  caption: string;
  likesLabel: string;
  likesLabelAlt: string;
  commentCount: string;
  audioTitle: string;
  tags: string[];
  author: Author;
};

export type Story = {
  id: string;
  videoUrl: string;
  note: string;
  accent: string;
  author: Author;
};

const authors: Author[] = [
  { name: "Goatgram", handle: "goatgram", initials: "GG", accent: "#833ab4", tagline: "professional bleat curator" },
  { name: "Milo Jr.", handle: "tiny.milo", initials: "TM", accent: "#f56040", tagline: "parkour in training" },
  { name: "Daisy Mae", handle: "daisy.moo", initials: "DM", accent: "#fcaf45", tagline: "farmyard menace" },
  { name: "Beans", handle: "barn.beans", initials: "BB", accent: "#405de6", tagline: "full-time chaos intern" },
  { name: "Poppy", handle: "pasture.poppy", initials: "PP", accent: "#c13584", tagline: "tiny hoof icon" },
];

export const mockPosts: Post[] = [
  {
    id: "feed-1",
    videoUrl: "/videos/feed/feed-1.mp4",
    caption: "POV: the smallest goat on the hill discovered cardio and chose violence.",
    likesLabel: "18.2K",
    likesLabelAlt: "18.3K",
    commentCount: "402",
    audioTitle: "bleatcore mix · original audio",
    tags: ["babygoat", "zoomies", "farmtok"],
    author: authors[0],
  },
  {
    id: "feed-2",
    videoUrl: "/videos/feed/feed-2.mp4",
    caption: "Mini goat saw a bucket. Bucket lost immediately.",
    likesLabel: "12.7K",
    likesLabelAlt: "12.8K",
    commentCount: "288",
    audioTitle: "barn percussion · original audio",
    tags: ["bucketdrama", "tinyhooves", "goatgram"],
    author: authors[1],
  },
  {
    id: "feed-3",
    videoUrl: "/videos/feed/feed-3.mp4",
    caption: "Lamb cameo. Goat still stole scene. Hollywood in shambles.",
    likesLabel: "24.6K",
    likesLabelAlt: "24.7K",
    commentCount: "911",
    audioTitle: "pasture sunrise · original audio",
    tags: ["lambfriend", "parodygram", "cutenessoverload"],
    author: authors[2],
  },
  {
    id: "feed-4",
    videoUrl: "/videos/feed/feed-4.mp4",
    caption: "This calf thought reel was about milk break. Honestly fair.",
    likesLabel: "9.4K",
    likesLabelAlt: "9.5K",
    commentCount: "178",
    audioTitle: "moo x bleat mashup",
    tags: ["farmfriends", "calfenergy", "napattack"],
    author: authors[3],
  },
  {
    id: "feed-5",
    videoUrl: "/videos/feed/feed-5.mp4",
    caption: "Piglet entered frame for three seconds and became fan favorite.",
    likesLabel: "31K",
    likesLabelAlt: "31.1K",
    commentCount: "1.2K",
    audioTitle: "snort house anthem",
    tags: ["piglet", "gueststar", "barnparty"],
    author: authors[4],
  },
  {
    id: "feed-6",
    videoUrl: "/videos/feed/feed-6.mp4",
    caption: "Golden-hour goat content. Cinematography award pending.",
    likesLabel: "15.9K",
    likesLabelAlt: "16K",
    commentCount: "355",
    audioTitle: "sunset bleats remastered",
    tags: ["goldenhour", "tinycinema", "goatreels"],
    author: authors[0],
  },
];

export const mockStories: Story[] = [
  {
    id: "story-1",
    videoUrl: "/videos/stories/story-1.mp4",
    note: "Milo discovered sprinting. Barn discovered regret.",
    accent: "#f56040",
    author: authors[1],
  },
  {
    id: "story-2",
    videoUrl: "/videos/stories/story-2.mp4",
    note: "Daisy in goblin mode before breakfast.",
    accent: "#fcaf45",
    author: authors[2],
  },
  {
    id: "story-3",
    videoUrl: "/videos/stories/story-3.mp4",
    note: "Beans trying to jump a fence half his size.",
    accent: "#833ab4",
    author: authors[3],
  },
  {
    id: "story-4",
    videoUrl: "/videos/stories/story-4.mp4",
    note: "Poppy won stare-down against entire camera crew.",
    accent: "#405de6",
    author: authors[4],
  },
  {
    id: "story-5",
    videoUrl: "/videos/stories/story-5.mp4",
    note: "Goatgram HQ reports extreme levels of tiny nonsense.",
    accent: "#c13584",
    author: authors[0],
  },
];
