import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import Footer from './Footer';
import Header from './Header';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

// This is the place responsible for wrapping your app.
// Add here components like Footer, Nav etc.
export const MainLayout = ({ children, className }: MainLayoutProps) => {
  const wrapperStyles = cn('flex flex-col min-h-screen', className);

  return (
    <div className={wrapperStyles}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
