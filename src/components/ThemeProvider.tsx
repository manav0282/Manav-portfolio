'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return early to avoid flashing
    return <>{children}</>;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      {children}
    </NextThemesProvider>
  );
} 