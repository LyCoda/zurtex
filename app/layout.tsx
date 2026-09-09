import type { Metadata } from 'next';
import { Afacad } from 'next/font/google';
import './globals.css';

const afacad = Afacad({
  variable: '--font-afacad',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zurtex | International Pet Travel Readiness Check',
  description:
    'A route-specific, human-reviewed readiness check for international dog and cat travel, with secure Stripe checkout.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={afacad.variable}>{children}</body>
    </html>
  );
}
