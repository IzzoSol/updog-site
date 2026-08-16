import type { Metadata, Viewport } from "next";
// Self-hosted fonts (bundled via npm — no build-time network fetch). The
// font-family names ('Fredoka Variable' / 'Nunito Variable') are wired to
// --font-display / --font-sans in globals.css.
import "@fontsource-variable/fredoka";
import "@fontsource-variable/nunito";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SoundProvider } from "@/components/sound/SoundContext";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Preloader } from "@/components/preloader/Preloader";
import { CustomCursor } from "@/components/cursor/CustomCursor";

const siteUrl = "https://updog.example"; // placeholder — set to the real domain at launch

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.siteName} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.siteName}`,
  },
  description:
    "What's UPDOG? Not much. The meme that refuses to come down — an internet-native sky world. Not financial advice.",
  applicationName: siteConfig.siteName,
  keywords: ["UPDOG", "meme coin", "$UPDOG", "sky", "dog", "crypto meme"],
  openGraph: {
    type: "website",
    title: `${siteConfig.siteName} — ${siteConfig.tagline}`,
    description: "The meme that refuses to come down.",
    siteName: siteConfig.siteName,
    url: siteUrl,
    images: [{ url: "/assets/brand/updog-ticker.jpg", width: 1440, height: 1440, alt: "UPDOG" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.xHandle,
    creator: siteConfig.xHandle,
    title: `${siteConfig.siteName} — ${siteConfig.tagline}`,
    description: "The meme that refuses to come down.",
    images: ["/assets/brand/updog-ticker.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#159BFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        <SoundProvider>
          <Preloader />
          <CustomCursor />
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </SoundProvider>
      </body>
    </html>
  );
}
