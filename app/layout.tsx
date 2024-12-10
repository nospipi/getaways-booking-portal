import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Providers from "@/utils/Providers.client";
import Script from "next/script";
import "./globals.css";
const BOKUN_LOADER = process.env.BOKUN_LOADER;

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

//------------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Your Getaways Tour !",
  description: "View all the details of your tour",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src={BOKUN_LOADER} strategy="lazyOnload" />
      </head>
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
