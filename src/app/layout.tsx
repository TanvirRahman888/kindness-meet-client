import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/navbar/navbar";
import { Suspense } from "react";
import NavbarFallback from "@/components/navbar/NavbarFallback";

export const metadata: Metadata = {
  title: "KindnessMeet",
  description: "Create, discover, and join community service events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <Suspense fallback={<NavbarFallback />}>
            <Navbar />
          </Suspense>
          {children}
          
        </Providers>
      </body>
    </html>
  );
}
