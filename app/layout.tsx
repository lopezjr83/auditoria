import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "vp-auditoria | Auditor's Command Center",
  description: "Centralized audit management for any standard (SMETA, ISO, etc.)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
