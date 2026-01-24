
import { Footer } from '../components/site/Footer';
import { Header } from '../components/site/Header';
import { ThemeProvider } from '../components/theme-provider';

import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'Klarstack Portal',
    template: '%s | Klarstack',
  },
  description: 'Public marketing portal for the Klarstack Nx monorepo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
