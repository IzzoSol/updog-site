import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SoundProvider } from "@/components/sound/SoundContext";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Preloader } from "@/components/preloader/Preloader";
import { CustomCursor } from "@/components/cursor/CustomCursor";

/**
 * Typography — a rounded, toy-like pairing that matches the puffy sky world:
 *  • Fredoka  → display (headlines, the UPDOG wordmark, buttons)
 *  • Nunito   → body/sans
 * Both are loaded as CSS variables consumed by tailwind.config.ts + globals.css.
 */
const display = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

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
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
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
