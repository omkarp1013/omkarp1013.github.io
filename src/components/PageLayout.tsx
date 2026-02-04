'use client';

import { Box, Flex, VStack } from '@chakra-ui/react';
import Navigation from './Navigation';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <Flex 
      direction={{ base: 'column', md: 'row' }}
      align="flex-start"
      minH="100vh"
      justify="center"
      gap={0}
    >
      <Navigation />
      <Box 
        flex={1} 
        padding={{ base: '2rem 1.5rem', md: '3rem 2rem' }} 
        maxW="600px"
        width="100%"
      >
        {children}
      </Box>
    </Flex>
  );
}
