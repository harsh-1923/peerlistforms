import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Toaster } from "sonner";
import FormList from "@/components/FormList";
import { AppContextProvider } from "@/context/AppContext";
// import Image from "next/image";
import Link from "next/link";
import Peerlist from "@/components/icons/Peerlist";

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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-instrument-serif",
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
              <Link href="/" className="flex items-center gap-2">
                {/* <Image src="/LOGO.png" width="30" height="30" alt="Logo" /> */}
                <Peerlist />

                <div className="text-black text-2xl font-serif">Peerlist</div>
              </Link>
            </aside>
            <section className="h-[100dvh] flex-[2] border-l border-r border-gray-400/30 overflow-y-scroll">
              {children}
            </section>
            <aside className="h-screen flex-[1] max-w-[300px] overflow-y-scroll pannel">
              <FormList />
            </aside>
            <Toaster />
            <Analytics />
          </main>
        </AppContextProvider>
      </body>
    </html>
  );
}
