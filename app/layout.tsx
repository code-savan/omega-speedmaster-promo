import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Omega Speedmaster | Exclusive Flash Sale',
  description: 'The watch that commands respect. Claim your ₦20,000 discount and free premium bracelet today.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="bg-bg-theme text-white font-sans">
      <body className="antialiased selection:bg-gold selection:text-black" suppressHydrationWarning>{children}</body>
    </html>
  );
}
