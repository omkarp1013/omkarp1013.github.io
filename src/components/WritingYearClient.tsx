'use client';

import React, { useMemo } from 'react';
import { Text, VStack, Box } from '@chakra-ui/react';
import Link from 'next/link';

interface Post {
  slug: string;
  year: string;
  title: string;
  date: string;
}

interface WritingYearClientProps {
  year: string;
  posts: Post[];
  startDate: string;
}

/**
 * Computes the current date in EST/EDT (America/New_York) using the browser's
 * built-in Intl support.  This runs on the client, so "today" updates at
 * midnight Eastern time regardless of when GitHub Actions last built the site.
 */
function getTodayEST(): string {
  const now = new Date();
  // toLocaleDateString with timeZone gives the date in that zone
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);

  const y = parts.find(p => p.type === 'year')!.value;
  const m = parts.find(p => p.type === 'month')!.value;
  const d = parts.find(p => p.type === 'day')!.value;
  return `${y}-${m}-${d}`;
}

/**
 * Generate all dates between two YYYY-MM-DD strings (inclusive).
 */
function dateRange(from: string, to: string): string[] {
  const dates: string[] = [];
  const cur = new Date(from + 'T00:00:00');
  const end = new Date(to + 'T00:00:00');
  while (cur <= end) {
    const yy = cur.getFullYear();
    const mm = String(cur.getMonth() + 1).padStart(2, '0');
    const dd = String(cur.getDate()).padStart(2, '0');
    dates.push(`${yy}-${mm}-${dd}`);
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

export default function WritingYearClient({ year, posts, startDate }: WritingYearClientProps) {
  const displayItems = useMemo(() => {
    const todayEST = getTodayEST();
    const postSlugs = new Set(posts.map(p => p.slug));

    // Determine the range of dates to check for this year
    const yearStart = `${year}-01-01`;
    const rangeFrom = startDate > yearStart ? startDate : yearStart;
    const yearEnd = `${year}-12-31`;
    const rangeTo = todayEST < yearEnd ? todayEST : yearEnd;

    // Only add missing-day markers if the range makes sense
    const items: Array<Post & { type: string }> = posts.map(p => ({ ...p, type: 'post' }));

    if (rangeFrom <= rangeTo) {
      const allDates = dateRange(rangeFrom, rangeTo);
      for (const d of allDates) {
        if (!postSlugs.has(d)) {
          items.push({
            slug: d,
            year: d.split('-')[0],
            title: 'I did not write anything today.',
            date: d,
            type: 'missing',
          });
        }
      }
    }

    // Sort descending by date
    items.sort((a, b) => b.date.localeCompare(a.date));
    return items;
  }, [year, posts, startDate]);

  return (
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
            <Text as="span" color="gray.900" _dark={{ color: "gray.300" }}>{formattedDate}</Text>
            <Link
              href={`/writing/${item.year}/${item.slug}`}
              className="post-link"
              style={{ textDecoration: 'underline' }}
            >
              {item.title}
            </Link>
          </Box>
        );
      })}
    </VStack>
  );
}
