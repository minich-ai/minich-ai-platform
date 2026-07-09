import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minich AI Tutor — CS1",
  description: "Socratic CMU CS Academy tutor with automatic Skill selection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
