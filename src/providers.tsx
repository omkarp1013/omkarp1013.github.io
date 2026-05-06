'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import system from './theme';
import SmoothScroll from './components/SmoothScroll';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="system" enableSystem>
        <SmoothScroll />
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
