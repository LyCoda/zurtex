import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zurtex.org"),
  title: "Zurtex | International Pet Travel Route Guide",
  description:
    "A free, source-linked first-pass guide for international dog and cat journeys. No email, payment or document upload required.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={afacad.variable}>{children}</body>
    </html>
  );
}
