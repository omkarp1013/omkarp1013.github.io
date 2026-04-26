import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Heading, Text, VStack, Box, Link as ChakraLink } from '@chakra-ui/react';
import PageLayout from '../../components/PageLayout';
import Link from 'next/link';
import React from 'react';

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
  
  // Calculate dates in EST on the server to avoid client-side lag
  const getDateEST = (offsetDays = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    
    const estString = date.toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    
    const [m, d, y] = estString.split('/');
    return {
      slug: `${y}-${m}-${d}`,
      display: `${m}/${d}/${y}`
    };
  };

  const today = getDateEST(0);
  const yesterday = getDateEST(-1);

  // Combine actual posts with missing markers
  const displayItems = [...posts.map(p => ({ ...p, type: 'post' }))];
  
  if (!posts.some(p => p.slug === today.slug)) {
    displayItems.push({
      slug: today.slug,
      year: today.slug.split('-')[0],
      title: 'I did not write anything today.',
      date: today.slug,
      type: 'missing'
    });
  }
  
  if (!posts.some(p => p.slug === yesterday.slug)) {
    displayItems.push({
      slug: yesterday.slug,
      year: yesterday.slug.split('-')[0],
      title: 'I did not write anything on this day.',
      date: yesterday.slug,
      type: 'missing'
    });
  }

  // Sort everything by date descending
  displayItems.sort((a, b) => b.date.localeCompare(a.date));

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
          <Text fontSize="md" fontWeight="semibold" fontStyle="italic" color="gray.700">
            Shorter thoughts (that I try to post every day):
          </Text>

          <VStack align="stretch" gap={3}>
            {displayItems.map((item) => {
              const dateParts = item.date.split('-');
              const formattedDate = `[${dateParts[1]}/${dateParts[2]}/${dateParts[0]}]`;
              
              if (item.type === 'missing') {
                return (
                  <Text key={item.slug} color="gray.400" fontSize="md">
                    {formattedDate} {item.title}
                  </Text>
                );
              }

              return (
                <Box key={item.slug} fontSize="md" display="flex" gap={2}>
                  <Text as="span" color="gray.900">{formattedDate}</Text>
                  <Link 
                    href={`/writing/${item.year}/${item.slug}`}
                    style={{ textDecoration: 'underline', color: '#171717' }}
                  >
                    {item.title}
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
