'use client';

import { Heading, Text, VStack, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionBox = motion(Box);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6 },
};

const currentlyReading = [
  { title: 'Principles for Dealing with the Changing World Order', author: 'Ray Dalio' },
  { title: 'Designing Data Intensive Systems', author: 'Martin Kleppmann' },
];

const upNext = [
  { title: '1929', author: 'Andrew Ross Sorkin' },
  { title: 'Operating Systems: Three Easy Pieces', author: 'Arpaci-Dusseau et al.' },
  { title: 'Empire of AI: Dreams and Nightmares in Sam Altman\'s OpenAI', author: 'Karen Hao' },
];

export default function Reading() {
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
        >
          Reading
        </MotionHeading>

        <VStack align="stretch" gap={4}>
          <MotionText
            {...fadeInUp}
            fontSize="sm"
            fontWeight="semibold"
            color="gray.900"
            letterSpacing="tight"
          >
            Currently reading
          </MotionText>
          <Box as="ul" pl={4} margin={0} listStyleType="disc">
            {currentlyReading.map((book, index) => (
              <Box 
                as="li" 
                key={index} 
                fontSize="sm" 
                color="gray.700" 
                lineHeight="1.7" 
                marginBottom={1}
              >
                <Text as="span" fontStyle="italic">{book.title}</Text> ({book.author})
              </Box>
            ))}
          </Box>

          <MotionText
            {...fadeInUp}
            fontSize="sm"
            fontWeight="semibold"
            color="gray.900"
            letterSpacing="tight"
            marginTop={2}
          >
            Up next
          </MotionText>
          <Box as="ul" pl={4} margin={0} listStyleType="disc">
            {upNext.map((book, index) => (
              <Box 
                as="li" 
                key={index} 
                fontSize="sm" 
                color="gray.700" 
                lineHeight="1.7" 
                marginBottom={1}
              >
                <Text as="span" fontStyle="italic">{book.title}</Text> ({book.author})
              </Box>
            ))}
          </Box>
        </VStack>
      </VStack>
    </PageLayout>
  );
}
