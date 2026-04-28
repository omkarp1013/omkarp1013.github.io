import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Heading, Text, VStack, Box, Link as ChakraLink } from '@chakra-ui/react';
import PageLayout from '../../../components/PageLayout';
import Link from 'next/link';
import React from 'react';

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

export const revalidate = 3600; // Revalidate every hour

export default async function YearPage({ params }: YearPageProps) {
  const { year } = await params;
  const posts = getPosts(year);

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

  const currentEST = getDateEST(0);
  const currentYearEST = currentEST.slug.split('-')[0];
  const postSlugs = new Set(posts.map(p => p.slug));
  const displayItems = [...posts.map(p => ({ ...p, type: 'post' }))];

  const START_DATE = '2026-04-24';

  // Only add missing markers if we are looking at the current year or a past year that started after START_DATE
  if (year <= currentYearEST) {
    let i = 0;
    while (true) {
      const d = getDateEST(i);
      
      // Stop if we go before the challenge started or before the year we are viewing
      if (d.slug < START_DATE || d.slug < `${year}-01-01`) break;

      // Only process dates that are in the target year and not in the future
      if (d.slug.startsWith(year) && d.slug <= currentEST.slug) {
        if (!postSlugs.has(d.slug)) {
          displayItems.push({
            slug: d.slug,
            year: d.slug.split('-')[0],
            title: 'I did not post anything today.',
            date: d.slug,
            type: 'missing'
          });
        }
      }
      
      i--;
      if (i < -5000) break; // Safety break
    }
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
