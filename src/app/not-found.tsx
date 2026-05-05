import Link from 'next/link';
import { Heading, Text, VStack, Box } from '@chakra-ui/react';
import PageLayout from '../components/PageLayout';

export default function NotFound() {
  return (
    <PageLayout>
      <VStack align="stretch" gap={6}>
        <Box>
          <Text
            fontSize="6xl"
            fontWeight="bold"
            letterSpacing="-0.03em"
            lineHeight="1"
            color="gray.200"
            _dark={{ color: "gray.800" }}
          >
            404
          </Text>
        </Box>

        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="bold"
          letterSpacing="-0.02em"
          lineHeight="1.2"
          color="gray.900"
          _dark={{ color: "gray.100" }}
        >
          Page not found
        </Heading>

        <Text fontSize="md" lineHeight="1.7" color="gray.700" _dark={{ color: "gray.300" }}>
          This page doesn't exist.
        </Text>

        <Box paddingTop={2}>
          <Link href="/">
            <Text
              fontSize="md"
              color="gray.900"
              _dark={{ color: "gray.100" }}
              textDecoration="underline"
              _hover={{ color: 'gray.600', _dark: { color: "gray.300" } }}
            >
              ← Back to home
            </Text>
          </Link>
        </Box>
      </VStack>
    </PageLayout>
  );
}
