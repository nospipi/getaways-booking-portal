import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Providers from "@/utils/Providers.client";

import Script from "next/script";
import TrackPageVisitHandler from "@/utils/TrackPageVisitHandler.client";
import { Suspense } from "react";

import "./globals.css";
const BOKUN_LOADER = process.env.BOKUN_LOADER;

const montserrat = Montserrat({
  weight: "500",
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
        <Script
          strategy="beforeInteractive"
          src={`https://cdn-cookieyes.com/client_data/${process.env.COOKIE_YES_KEY}/script.js`}
        ></Script>
      </head>

      <body className={montserrat.className}>
        <Providers>
          <Suspense>
            {/* wrapped in Suspense because it accesses useSearchParams hook */}
            {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
            <TrackPageVisitHandler />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
