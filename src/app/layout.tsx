import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Opendoor — Sell your home the way that works for you",
  description:
    "Get a cash offer and explore the ways we can help you sell your home.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
