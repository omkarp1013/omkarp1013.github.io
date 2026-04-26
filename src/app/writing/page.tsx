import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Heading, Text, VStack, Box, Link as ChakraLink } from '@chakra-ui/react';
import PageLayout from '../../components/PageLayout';
import Link from 'next/link';
import React from 'react';

const WRITING_DIR = path.join(process.cwd(), 'src/content/writing');

function getYears() {
  try {
    const entries = fs.readdirSync(WRITING_DIR);
    return entries
      .filter(entry => fs.statSync(path.join(WRITING_DIR, entry)).isDirectory())
      .sort((a, b) => b.localeCompare(a)); // Newest years first
  } catch (e) {
    console.error("Error reading years:", e);
    return [];
  }
}

export default function WritingIndexPage() {
  const years = getYears();

  return (
    <PageLayout>
      <VStack align="stretch" gap={6} color="gray.900">
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="bold"
            letterSpacing="-0.02em"
            marginBottom="0.5rem"
          >
            Writing
          </Heading>

          <Link
            href="/"
            style={{ textDecoration: 'underline', fontSize: '1rem', color: '#718096' }}
          >
            Back to home
          </Link>
        </Box>

        <VStack align="stretch" gap={4} marginTop={4}>
          <VStack align="stretch" gap={3}>
            {years.map((year) => (
              <Box key={year} fontSize="2xl">
                <Link
                  href={`/writing/${year}`}
                  style={{ textDecoration: 'underline', color: '#171717', fontWeight: 600 }}
                >
                  {year}
                </Link>
              </Box>
            ))}
            {years.length === 0 && (
              <Text color="gray.400">No writing found yet.</Text>
            )}
          </VStack>
        </VStack>
      </VStack>
    </PageLayout>
  );
}
