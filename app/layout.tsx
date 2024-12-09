import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import FormList from "@/components/FormList";
import { AppContextProvider } from "@/context/AppContext";

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

export const metadata: Metadata = {
  title: "Peerlist Forms",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContextProvider>
          <main className="w-screen h-screen flex items-center justify-center">
            <aside className="h-screen p-4 flex-[1] max-w-[300px] overflow-y-scroll pannel">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta,
              ea?
            </aside>
            <section className="h-screen flex-[2] border border-gray-400/30 overflow-y-scroll">
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
