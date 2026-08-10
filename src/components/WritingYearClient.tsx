'use client';

import { useMemo } from 'react';
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

export default function WritingYearClient({ year, posts, startDate }: WritingYearClientProps) {
  const displayItems = useMemo(() => {
    // Only show actual posts, sorted descending by date
    const items = posts.map(p => ({ ...p, type: 'post' as const }));
    items.sort((a, b) => b.date.localeCompare(a.date));
    return items;
  }, [posts]);

  return (
    <>
      <VStack align="stretch" gap={3}>
        {displayItems.map((item) => {
          const dateParts = item.date.split('-');
          const formattedDate = `[${dateParts[1]}/${dateParts[2]}/${dateParts[0]}]`;

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
    </>
  );
}