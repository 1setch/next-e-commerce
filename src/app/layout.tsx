import type { Metadata } from "next";
import Link from 'next/link';
import "../styles/globals.css";
import Header from "@/components/layout/Header/Header";
import { Roboto } from 'next/font/google';
import Footer from "@/components/layout/Footer/Footer";

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>

      <body className={roboto.className}>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
