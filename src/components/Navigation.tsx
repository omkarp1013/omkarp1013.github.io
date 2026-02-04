'use client';

import {
  Box,
  VStack,
  Text,
  Link,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const MotionBox = motion(Box);

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Reading', href: '/books' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/omkarp1013', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/omkarp0706/', icon: FaLinkedin },
  { label: 'Twitter', href: 'https://x.com/omkarp1013/', icon: FaTwitter },
];

export default function Navigation() {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      position={{ base: 'relative', md: 'sticky' }}
      top={0}
      height={{ base: 'auto', md: '100vh' }}
      width={{ base: '100%', md: '220px' }}
      padding={{ base: '1.5rem 1rem', md: '2rem 1.5rem' }}
      bg="transparent"
    >
      <VStack 
        align="stretch" 
        gap={{ base: 4, md: 6 }}
      >
        <VStack align="stretch" gap={4} flex={1}>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wider"
            color="gray.600"
            textTransform="uppercase"
            marginBottom={1}
          >
            NAVIGATION
          </Text>
          <HStack 
            gap={4} 
            flexWrap="wrap"
            display={{ base: 'flex', md: 'none' }}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                color="gray.900"
                fontSize="sm"
                fontWeight="normal"
                _hover={{ color: 'gray.600', textDecoration: 'none' }}
                transition="color 0.2s"
              >
                {item.label}
              </Link>
            ))}
          </HStack>
          <VStack 
            align="stretch" 
            gap={3}
            display={{ base: 'none', md: 'flex' }}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                color="gray.900"
                fontSize="sm"
                fontWeight="normal"
                _hover={{ color: 'gray.600', textDecoration: 'none' }}
                transition="color 0.2s"
              >
                {item.label}
              </Link>
            ))}
          </VStack>
        </VStack>

        <VStack align="stretch" gap={4} flex={1}>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wider"
            color="gray.600"
            textTransform="uppercase"
            marginBottom={1}
          >
            CONNECT
          </Text>
          <HStack 
            gap={4}
            display={{ base: 'flex', md: 'none' }}
          >
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                color="gray.900"
                fontSize="sm"
                fontWeight="normal"
                _hover={{ color: 'gray.600', textDecoration: 'none' }}
                transition="color 0.2s"
                target="_blank"
                rel="noopener noreferrer"
              >
                <item.icon size={16} />
              </Link>
            ))}
          </HStack>
          <VStack 
            align="stretch" 
            gap={3}
            display={{ base: 'none', md: 'flex' }}
          >
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                color="gray.900"
                fontSize="sm"
                fontWeight="normal"
                _hover={{ color: 'gray.600', textDecoration: 'none' }}
                transition="color 0.2s"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HStack gap={2.5}>
                  <item.icon size={14} />
                  <Text>{item.label}</Text>
                </HStack>
              </Link>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </MotionBox>
  );
}
