import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Navigation } from "@/components/navigation/Navigation";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The display serif licensed by 006-design-system.md, Section 4's third
// typeface exception — large display headings only (currently Hero's
// positioning statement), never body copy or UI text. Newsreader specifically:
// a calm, literary book serif, legible at very large sizes, closer to the
// "precise, restrained, quietly confident" brand personality (006, Section 1)
// than a more expressive or high-contrast display serif would be.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "An engineering portfolio built on evidence: case studies, an evolving product, and an engineering journal.",
};

// Sets the theme class before first paint, per 027-application-behaviour.md,
// Section 4 — avoids a flash of the wrong theme. A manual override in
// localStorage takes precedence; otherwise the system preference applies.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
