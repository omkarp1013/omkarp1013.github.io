import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Heading, Text, VStack, Box, Link as ChakraLink } from '@chakra-ui/react';
import PageLayout from '../../../../components/PageLayout';
import Link from 'next/link';
import React from 'react';

interface PostPageProps {
  params: Promise<{
    year: string;
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const WRITING_DIR = path.join(process.cwd(), 'src/content/writing');
  const paths: { year: string; slug: string }[] = [];
  
  try {
    const years = fs.readdirSync(WRITING_DIR);
    years.forEach(year => {
      const yearPath = path.join(WRITING_DIR, year);
      if (fs.statSync(yearPath).isDirectory()) {
        const files = fs.readdirSync(yearPath);
        files.filter(f => f.endsWith('.md')).forEach(file => {
          paths.push({
            year,
            slug: file.replace('.md', ''),
          });
        });
      }
    });
  } catch (e) {
    console.error("Error generating static params:", e);
  }
  
  return paths;
}

export default async function PostPage({ params }: PostPageProps) {
  const { year, slug } = await params;
  const filePath = path.join(process.cwd(), 'src/content/writing', year, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <PageLayout>
        <VStack align="stretch" gap={4}>
          <Heading as="h1" fontSize="2xl">Post Not Found</Heading>
          <Link href="/writing" style={{ textDecoration: 'underline' }}>Back to writing</Link>
        </VStack>
      </PageLayout>
    );
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Format date from slug (YYYY-MM-DD) to "Month Day, Year"
  const dateObj = new Date(slug + 'T00:00:00'); // Use T00:00:00 to avoid timezone shifts
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <PageLayout>
      <div style={{ maxWidth: '800px', color: '#171717' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.8rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {data.title || slug}
        </h1>
        
        <div style={{ color: '#888', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          {formattedDate}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Link 
            href="/writing" 
            style={{ textDecoration: 'underline', fontSize: '1rem', color: '#718096' }}
          >
            Back to writing
          </Link>
        </div>
        
        <div style={{ fontSize: '1.05rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', color: 'gray.700' }}>
          {content}
        </div>
      </div>
    </PageLayout>
  );
}
