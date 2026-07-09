import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minich AI Tutor — CS1 Unit 1",
  description: "Socratic programming tutor powered by the CS1 Unit 1 Skill",
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
