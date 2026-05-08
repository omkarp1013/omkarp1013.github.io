import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers";
import PageLayout from "../components/PageLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Omkar Pathak",
  description: "CS & Math @ UMD. Interested in financial markets, global macro trading, and building robust, high-performance infrastructure.",
  icons: {
    icon: 'data:,',
  },
  openGraph: {
    title: "Omkar Pathak",
    description: "CS & Math @ UMD. Interested in financial markets, global macro trading, and building robust, high-performance infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>

      <body>
        <Providers>
          <PageLayout>
            {children}
          </PageLayout>
        </Providers>
      </body>
    </html>
  );
}
