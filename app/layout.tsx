import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Montserrat } from "next/font/google";
import Providers from "@/utils/Providers.client";
import Script from "next/script";
import TrackPageVisitHandler from "@/utils/TrackPageVisitHandler.client";
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
      </head>
      <body className={montserrat.className}>
        <Providers>
          <TrackPageVisitHandler />
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
