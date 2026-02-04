'use client';

import { Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6 },
};

export default function About() {
  return (
    <PageLayout>
        <VStack align="stretch" gap={4}>
        <MotionHeading
          {...fadeInUp}
          as="h1"
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight="bold"
          letterSpacing="-0.02em"
          lineHeight="1.2"
          marginBottom="0.5rem"
        >
          About
        </MotionHeading>

        <MotionText
          {...fadeInUp}
          fontSize="md"
          lineHeight="1.7"
          color="gray.700"
        >
          I'm a trader and technologist based in Chicago, where I work on systematic equity options at IMC Trading. My work sits at the intersection of quantitative finance, technology, and problem-solving.
        </MotionText>

        <MotionText
          {...fadeInUp}
          fontSize="md"
          lineHeight="1.7"
          color="gray.700"
        >
          Before trading, I worked on the James Webb Space Telescope ground control station at Raytheon, where I developed software systems for one of humanity's most ambitious scientific instruments. This experience taught me the importance of precision, reliability, and thinking deeply about complex systems.
        </MotionText>

        <MotionText
          {...fadeInUp}
          fontSize="md"
          lineHeight="1.7"
          color="gray.700"
        >
          I studied computer science and mathematics at the University of Pennsylvania. During my time there, I played club volleyball and won the Class of 1880 award for competitive mathematics—an experience that reinforced my belief that excellence comes from sustained effort and intellectual curiosity.
        </MotionText>

        <MotionText
          {...fadeInUp}
          fontSize="md"
          lineHeight="1.7"
          color="gray.700"
        >
          Outside of work, I build AI systems, read extensively, and think about technology's role in shaping our future. I'm particularly interested in how we can use technology to solve hard problems while maintaining human agency and understanding.
        </MotionText>

        <MotionText
          {...fadeInUp}
          fontSize="md"
          lineHeight="1.7"
          color="gray.700"
        >
          Some thinkers who have influenced my worldview: Richard Feynman, David Deutsch, Carlo Rovelli, Ted Chiang, and Jiddu Krishnamurti. I believe the best ideas emerge from thinking across domains, questioning inherited wisdom, and engaging in rigorous conjecture, criticism, and testing.
        </MotionText>
      </VStack>
    </PageLayout>
  );
}
