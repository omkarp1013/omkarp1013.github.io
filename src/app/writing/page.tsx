import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Heading, Text, VStack, Box, Link as ChakraLink } from '@chakra-ui/react';
import PageLayout from '../../components/PageLayout';
import Link from 'next/link';
import React from 'react';
import DailyWritingStatus from '../../components/DailyWritingStatus';

const WRITING_DIR = path.join(process.cwd(), 'src/content/writing');

function getPosts() {
  const posts: any[] = [];
  try {
    const years = fs.readdirSync(WRITING_DIR);
    years.forEach(year => {
      const yearPath = path.join(WRITING_DIR, year);
      if (fs.statSync(yearPath).isDirectory()) {
        const files = fs.readdirSync(yearPath);
        files.filter(f => f.endsWith('.md')).forEach(file => {
          const filePath = path.join(yearPath, file);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContents);
          const slug = file.replace('.md', '');
          posts.push({
            slug,
            year,
            title: data.title || slug,
            date: slug, // Assuming filename is YYYY-MM-DD
          });
        });
      }
    });
  } catch (e) {
    console.error("Error reading posts:", e);
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}


export default function WritingPage() {
  const posts = getPosts();
  const postSlugs = posts.map(p => p.slug);

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
          
          <Link href="/" passHref legacyBehavior>
            <ChakraLink textDecoration="underline" fontSize="md" color="gray.600" _hover={{ color: 'gray.900' }}>
              Back to home
            </ChakraLink>
          </Link>
        </Box>

        <VStack align="stretch" gap={4} marginTop={4}>
          <Text fontSize="md" fontWeight="semibold" fontStyle="italic" color="gray.700">
            Shorter thoughts (that I try to post every day):
          </Text>

          <VStack align="stretch" gap={3}>
            <DailyWritingStatus postSlugs={postSlugs} />

            {posts.map((post) => {
              const dateParts = post.date.split('-');
              const formattedDate = `[${dateParts[1]}/${dateParts[2]}/${dateParts[0]}]`;
              
              return (
                <Box key={post.slug} fontSize="md" display="flex" gap={2}>
                  <Text as="span" color="gray.900">{formattedDate}</Text>
                  <Link href={`/writing/${post.year}/${post.slug}`} passHref legacyBehavior>
                    <ChakraLink textDecoration="underline" color="gray.900" _hover={{ color: 'gray.600' }}>
                      {post.title}
                    </ChakraLink>
                  </Link>
                </Box>
              );
            })}
          </VStack>
        </VStack>
      </VStack>
    </PageLayout>
  );
}
