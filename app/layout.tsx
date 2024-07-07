import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/RTK/provider";
import {NextUIProvider} from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "smartKart",
  description: "Making your shopping decisions smarter!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <body>
          <NextUIProvider>
            <ThemeProvider enableSystem={true} attribute="class"> 
              <ReduxProvider>           
                  {children}
                  <Analytics/>
              </ReduxProvider>
            </ThemeProvider>
          </NextUIProvider>
          </body>
      </html>
  );
}
