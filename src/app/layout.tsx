import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Department of Computer Science | Stellenbosch University",
    template: "%s | CS Stellenbosch",
  },
  description:
    "The Department of Computer Science at Stellenbosch University — advancing research in machine learning, robotics, software engineering, and more since 1972.",
  keywords: [
    "computer science",
    "Stellenbosch University",
    "SU",
    "AI",
    "machine learning",
    "research",
    "undergraduate",
    "postgraduate",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Stellenbosch University — Computer Science",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen bg-brand-black text-brand-offwhite antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex flex-col">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
