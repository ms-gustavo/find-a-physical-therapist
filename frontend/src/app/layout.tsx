import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import ClientProvider from "@/components/ClientProvider/ClientProvider";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background text-text font-sans antialiased",
          fontSans.variable
        )}
      >
        <ClientProvider>
          <ThemeProvider />
          <Navbar /> {children}
        </ClientProvider>
      </body>
    </html>
  );
}
