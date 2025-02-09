import '@/styles/globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import { MainLayout } from '@/components/templates/MainLayout';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const rangerFont = localFont({
  src: '../../public/fonts/drone-ranger/dronerangerpro_bold.otf',
  variable: '--font-ranger'
});

export const metadata: Metadata = {
  title: 'Home page | Nextjs boilerplate',
  description:
    '🚀 Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer experience first: Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged, Jest, React Testing Library, PostCSS, Tailwind CSS, Storybook, Plop, GH actions.'
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={cn(rangerFont.variable, inter.variable, 'font-inter')}
        suppressHydrationWarning
      >
        <MainLayout>
          <main>{children}</main>
        </MainLayout>
      </body>
    </html>
  );
};

export default RootLayout;
