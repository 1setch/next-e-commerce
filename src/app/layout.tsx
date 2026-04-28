import type { Metadata } from "next";
import Link from 'next/link'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">

      <body>
        
        {children}
      </body>
    </html>
  );
}
