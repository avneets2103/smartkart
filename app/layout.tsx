import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "./RTK/provider";
import {NextUIProvider} from "@nextui-org/react";

export const metadata: Metadata = {
  title: "smartKart",
  description: "ADD DESCRIPTION HERE",
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
            <ReduxProvider>{children}</ReduxProvider>
          </NextUIProvider>
          </body>
      </html>
  );
}
