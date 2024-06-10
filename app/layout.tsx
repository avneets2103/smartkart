import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "./RTK/provider";
import {NextUIProvider} from "@nextui-org/react";
import AuthProvider from "./my_components/AuthProvider/AuthProvider";

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
            <ReduxProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </ReduxProvider>
          </NextUIProvider>
          </body>
      </html>
  );
}
