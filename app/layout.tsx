import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "./providers";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NCC | Anna University",
  description: "Official NCC Website of Anna University, Chennai",
  keywords:
    "NCC, Anna University, NCC Anna University, NCC AU, National Cadet Corps Anna University, National Cadet Corps AU, NCC College of Engineering Guindy, NCC CEG, NCC ACTech, 1 TN CTC NCC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(plusJakartaSans.className, "min-w-[320px]")}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
