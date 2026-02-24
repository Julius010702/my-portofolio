import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "julius portofolio",
  description: "My Next.js App",
  icons: {
    icon: "/ss.png",
  },
  openGraph: {
    title: "julius portofolio",
    description: "My Next.js App",
    url: "https://my-portofolio-five-mauve.vercel.app",
    siteName: "julius portofolio",
    images: [
      {
        url: "https://my-portofolio-five-mauve.vercel.app/ss.png",
        width: 1200,
        height: 630,
        alt: "julius portofolio",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}