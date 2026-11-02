"use client";

import Footer from "@/components/footer/footer";
import { ThemeProvider } from "next-themes";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
      <Footer/>
    </ThemeProvider>
  );
}
