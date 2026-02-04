'use client';

import {
  Heading,
  Text,
  Link,
  VStack,
} from '@chakra-ui/react';
import PageLayout from '../components/PageLayout';

export default function Home() {
  return (
    <PageLayout>
      <VStack align="stretch" gap={4}>
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
          >
            I love thinking about and solving hard problems. Right now, I'm reading and thinking about macroeconomic policy, AI agents/infrastructure/training, general computer systems, and financial markets.
          </Text>

          <Text
            fontSize="md"
            lineHeight="1.7"
            color="gray.700"
          >
            I earned a B.S. in mathematics and computer science and an M.S. in computer science at the University of Maryland, where I was a member of the Smith Investment Fund. Previously, I interned at Goldman Sachs and RBC Capital Markets on the interest rates trading and futures execution desks. I was very fortunate to work with amazing people at both companies.
          </Text>

          <Text
            fontSize="md"
            lineHeight="1.7"
            color="gray.700"
          >
            See what I'm currently reading{' '}
            <Link
              href="/books"
              color="gray.900"
              textDecoration="underline"
              _hover={{ color: 'gray.600' }}
            >
              here
            </Link>
            .
          </Text>
      </VStack>
    </PageLayout>
  );
}
