import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { HeaderGenerator, FooterGenerator } from './utils';

import { cn } from '@/lib/utils';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Zeus',
  description: 'Gerenciador de ração para o seu pet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <HeaderGenerator />
        {children}
        <FooterGenerator />
      </body>
    </html>
  );
}
