import "../styles/globals.css";
import Header from "@/components/layout/Header/Header";
import { Roboto } from 'next/font/google';
import Footer from "@/components/layout/Footer/Footer";
import Providers from "@/providers/Providers";
import Toast from "@/components/ui/Toast/Toast";
import type { Metadata } from "next";

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: {
    default: "Мегамагазик",
    template: "%s | SHOP.CO",
  },
  description: "Browse our diverse range of meticulously crafted garments. Find clothes that match your style.",
  keywords: ["clothing", "fashion", "online store", "t-shirts", "dresses", "pants"],
  authors: [{ name: "SHOP.CO" }],
  creator: "SHOP.CO",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "SHOP.CO",
    title: "SHOP.CO | Online Clothing Store",
    description: "Browse our diverse range of meticulously crafted garments.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHOP.CO | Online Clothing Store",
    description: "Browse our diverse range of meticulously crafted garments.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>

      <body className={roboto.className}>
        <Providers>
          <Header />
          {children}
          <Toast />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
