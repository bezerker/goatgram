import type { Metadata, Viewport } from "next";
import { Geist, Lobster_Two } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const goatFont = Lobster_Two({
  variable: "--font-goatgram",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goatgram.net"),
  title: "Goatgram",
  description: "Parody Instagram clone for baby goat chaos and tiny farm-animal cinema.",
  openGraph: {
    title: "Goatgram",
    description: "Vertical goat reels, stories, dark mode, and one very loud upload button.",
    siteName: "Goatgram",
    url: "https://goatgram.net",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#060608" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${goatFont.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
