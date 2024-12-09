// layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google"; // Adjust based on actual font name
import "./globals.css";
import { Toaster } from "sonner";
import FormList from "@/components/FormList";
import { AppContextProvider } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";

// Import local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Import Google Font
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Peerlist Forms - Build forms for the world",
  description: "Generate beautiful forms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
        style={
          {
            "--top-bar-height": "60px",
            "--bottom-bar-height": "60px",
          } as React.CSSProperties
        }
      >
        <AppContextProvider>
          <main className="w-screen min-h-[100dvh] flex items-stretch">
            <aside className="h-full p-4 flex-[1] max-w-[300px] overflow-y-auto pannel">
              <Link href="/">
                <Image
                  src="/images/LOGO.png"
                  width="40"
                  height="40"
                  alt="Logo"
                />
              </Link>
            </aside>
            <section className="h-[100dvh] flex-[2] border-l border-r border-gray-400/30 overflow-y-scroll">
              {children}
            </section>
            <aside className="h-screen p-4 flex-[1] max-w-[300px] overflow-y-scroll pannel">
              <FormList />
            </aside>
            <Toaster />
          </main>
        </AppContextProvider>
      </body>
    </html>
  );
}
