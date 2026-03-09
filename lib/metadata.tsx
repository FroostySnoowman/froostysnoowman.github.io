import type { Metadata } from "next";

const metadataInfos: Metadata = {
  title: "Jacob Beal Portfolio | Software Engineer",
  description:
    "Portfolio of Jacob Beal, software engineer passionate about web development, artificial intelligence, and SAP systems. Explore my projects, skills, and professional experience.",
  keywords: [
    "Jacob Beal",
    "web developer",
    "portfolio",
    "Next.js",
    "React",
    "artificial intelligence",
    "SAP development",
    "DevOps",
    "Python",
    "TypeScript",
    "C++",
    "software engineer",
  ],
  authors: [{ name: "Jacob", url: "https://github.com/FroostySnoowman/" }],
  creator: "Jacob",
  publisher: "Jacob",
  openGraph: {
    title: "Jacob Beal Portfolio | Software Developer",
    description:
      "Discover the portfolio of Jacob Beal: web apps with Next.js, AI projects using Python, low-level and SAP development, and DevOps tools.",
    url: "https://froostysnoowman.github.io",
    siteName: "Jacob Beal Portfolio",
    images: [
      {
        url: "https://froostysnoowman.github.io/preview.png",
        width: 1856,
        height: 928,
        alt: "Preview of Jacob Beal's developer portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "favicon.png",
  },
  metadataBase: new URL("https://froostysnoowman.github.io"),
};

export default metadataInfos;