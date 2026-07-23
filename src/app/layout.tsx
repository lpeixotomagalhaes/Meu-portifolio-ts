import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LKZ | Portfolio",
  description: "O developer que você estava procurando",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white font-sans overflow-x-hidden">{children}</body>
    </html>
  );
}