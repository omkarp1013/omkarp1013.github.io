import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Heading, Text, VStack, Box } from '@chakra-ui/react';
import PageLayout from '../../../components/PageLayout';
import Link from 'next/link';
import React from 'react';
import WritingYearClient from '../../../components/WritingYearClient';

const WRITING_DIR = path.join(process.cwd(), 'src/content/writing');

interface YearPageProps {
  params: Promise<{
    year: string;
  }>;
}

export async function generateStaticParams() {
  const currentYear = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric'
  });

  try {
    const entries = fs.existsSync(WRITING_DIR) ? fs.readdirSync(WRITING_DIR) : [];
    const years = entries
      .filter(entry => fs.statSync(path.join(WRITING_DIR, entry)).isDirectory());
    
    if (!years.includes(currentYear)) {
      years.push(currentYear);
    }

    return years.map(year => ({ year }));
  } catch (e) {
    console.error("Error generating static params for years:", e);
    return [{ year: currentYear }];
  }
}

function getPosts(targetYear: string) {
  const posts: any[] = [];
  try {
    const yearPath = path.join(WRITING_DIR, targetYear);
    if (fs.existsSync(yearPath) && fs.statSync(yearPath).isDirectory()) {
      const files = fs.readdirSync(yearPath);
      files.filter(f => f.endsWith('.md')).forEach(file => {
        const filePath = path.join(yearPath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        const slug = file.replace('.md', '');
        posts.push({
          slug,
          year: targetYear,
          title: data.title || slug,
          date: slug, // Assuming filename is YYYY-MM-DD
        });
      });
    }
  } catch (e) {
    console.error(`Error reading posts for ${targetYear}:`, e);
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export default async function YearPage({ params }: YearPageProps) {
  const { year } = await params;
  const posts = getPosts(year);

  return (
    <PageLayout>
      <VStack align="stretch" gap={6} color="gray.900" _dark={{ color: "gray.100" }}>
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="bold"
            letterSpacing="-0.02em"
            marginBottom="0.5rem"
          >
            Writing — {year}
          </Heading>

          <Link
            href="/writing"
            style={{ textDecoration: 'underline', fontSize: '1rem', color: '#718096' }}
          >
            Back to years
          </Link>
        </Box>

        <VStack align="stretch" gap={4} marginTop={4}>
          <Text fontSize="md" fontWeight="semibold" fontStyle="italic" color="gray.700" _dark={{ color: "gray.300" }}>
            Shorter thoughts (that I try to post every day):
          </Text>

          {/* Client component handles date logic so "today" updates at midnight EST in the browser */}
          <WritingYearClient
            year={year}
            posts={posts.map(p => ({ slug: p.slug, year: p.year, title: p.title, date: p.date }))}
            startDate="2026-04-24"
          />
        </VStack>
      </VStack>
    </PageLayout>
  );
}
