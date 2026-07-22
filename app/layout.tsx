import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "WILLS",
  description: "Luxury Real Estate Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}