'use client';

import { ChakraProvider } from '@chakra-ui/react';
import system from './theme';
import SmoothScroll from './components/SmoothScroll';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <SmoothScroll />
      {children}
    </ChakraProvider>
  );
}
