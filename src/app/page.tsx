'use client';

import {
  Heading,
  Text,
  Link,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';

const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <PageLayout>
      <VStack align="stretch" gap={4}>
          <MotionHeading
            {...fadeInUp}
            as="h1"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            letterSpacing="-0.02em"
            lineHeight="1.2"
            marginBottom="0.5rem"
          >
            Omkar Pathak
          </MotionHeading>

          <MotionText
            {...fadeInUp}
            fontSize="sm"
            lineHeight="1.7"
            color="gray.700"
          >
            I love thinking and solving hard problems. Right now, I'm reading and thinking about macroeconomic policy, AI agents/infrastructure/training, general computer systems, and financial markets.
          </MotionText>

          <MotionText
            {...fadeInUp}
            fontSize="sm"
            lineHeight="1.7"
            color="gray.700"
          >
            I earned a B.S. in mathematics and computer science and an M.S. in computer science at the University of Maryland, where I was a member of the Smith Investment Fund. Previously, I interned at Barclays on the equities trading desk and Goldman Sachs and RBC Capital Markets on the interest rate trading desks. I was very fortunate to work with amazing people at every company. I will be joining an AI startup in August 2026.
          </MotionText>
      </VStack>
    </PageLayout>
  );
}
