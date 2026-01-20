import React from 'react';
import { Sidebar } from '@/app/components/Sidebar';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata = {
  title: 'Design 99x Agent Studio',
  description: 'Agent Studio Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen bg-background">
            <Sidebar />
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
