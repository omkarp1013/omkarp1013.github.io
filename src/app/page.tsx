'use client';

import {
  Heading,
  Text,
  Link,
  VStack,
  HStack,
  Box,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import PageLayout from '../components/PageLayout';

export default function Home() {
  return (
    <PageLayout>
      <Box position="relative">
        <VStack align="stretch" gap={4} paddingRight={{ base: 0, md: '160px' }}>
          <Box
            position="absolute"
            top={0}
            right={0}
            width={{ base: '120px', md: '140px' }}
            height={{ base: '160px', md: '180px' }}
            display={{ base: 'none', md: 'block' }}
            borderRadius="md"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.200"
            opacity={0.9}
          >
            <img
              src="/profile.jpg"
              alt="Omkar Pathak"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </Box>

          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="bold"
            letterSpacing="-0.02em"
            lineHeight="1.2"
            marginBottom="0.5rem"
          >
            Omkar Pathak
          </Heading>

          <Text
            fontSize="md"
            lineHeight="1.7"
            color="gray.700"
            _dark={{ color: "gray.300" }}
          >
            I love thinking about and solving hard problems. Right now, I'm{' '}
            <Link
              asChild
              color="gray.900"
              _dark={{ color: "gray.100" }}
              textDecoration="underline"
              _hover={{ color: 'gray.600' }}
            >
              <NextLink href="/reading">
                reading
              </NextLink>
            </Link>
            {' '}and thinking about macroeconomic policy, AI agents/infrastructure/training, general computer systems, and financial markets.
          </Text>

          <Text
            fontSize="md"
            lineHeight="1.7"
            color="gray.700"
            _dark={{ color: "gray.300" }}
          >
            I am completing an M.S. in computer science and earned a B.S. in mathematics and computer science at the University of Maryland, where I was a member of the Smith Investment Fund. Previously, I interned at Goldman Sachs and RBC Capital Markets on the interest rates trading and futures execution desks. I was very fortunate to work with amazing people at both companies.
          </Text>

          <Box
            display={{ base: 'block', md: 'none' }}
            position="relative"
            width="120px"
            height="160px"
            borderRadius="md"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.200"
            opacity={0.9}
            marginTop={2}
          >
            <img
              src="/profile.jpg"
              alt="Omkar Pathak"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </Box>
        </VStack>
      </Box>
    </PageLayout>
  );
}
