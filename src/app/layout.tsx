import "@/app/globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Viewdrop - Ultimate Movie & TV Show Collection",
  description:
    "Discover all your favorite movies and TV shows in one place with MovieVerse. Get detailed information, personalized recommendations, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} min-h-screen`}
      >
        <Toaster position="top-center" />
        <Navbar isLoggedIn={true} />
        <main className="container px-4 md:px-6">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
