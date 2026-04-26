'use client';

import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

interface DailyWritingStatusProps {
  postSlugs: string[];
}

export default function DailyWritingStatus({ postSlugs }: DailyWritingStatusProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    // This runs on the client, so it uses the visitor's local time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todaySlug = `${year}-${month}-${day}`;
    const todayDisplay = `${month}/${day}/${year}`;

    setFormattedDate(todayDisplay);

    if (!postSlugs.includes(todaySlug)) {
      setStatus(`[${todayDisplay}] I did not write anything today.`);
    } else {
      setStatus(null); // No status message if they already wrote something
    }
  }, [postSlugs]);

  if (!status) return null;

  return (
    <Text color="gray.400" fontSize="md">
      {status}
    </Text>
  );
}
