import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Heading, Text, VStack, Box, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

function getAllPostsForYear(targetYear: string) {
  const WRITING_DIR = path.join(process.cwd(), 'src/content/writing');
  const posts: { slug: string; title: string }[] = [];
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
          title: data.title || slug,
        });
      });
    }
  } catch (e) {
    console.error(`Error reading posts for ${targetYear}:`, e);
  }
  // Sort chronologically (ascending by date)
  return posts.sort((a, b) => a.slug.localeCompare(b.slug));
}

export default async function PostPage({ params }: PostPageProps) {
  const { year, slug } = await params;
  const filePath = path.join(process.cwd(), 'src/content/writing', year, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <>
        <VStack align="stretch" gap={4}>
          <Heading as="h1" fontSize="2xl">Post Not Found</Heading>
          <Link href={`/writing/${year}`} style={{ textDecoration: 'underline' }}>Back to {year} writing</Link>
        </VStack>
      </>
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

  // Get adjacent posts for prev/next navigation
  const allPosts = getAllPostsForYear(year);
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      <div style={{ maxWidth: '800px' }} className="post-content">
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.8rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {data.title || slug}
        </h1>

        <div style={{ color: '#888', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          {formattedDate}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Link
            href={`/writing/${year}`}
            style={{ textDecoration: 'underline', fontSize: '1rem', color: '#718096' }}
          >
            Back to {year} writing
          </Link>
        </div>

        <div style={{ fontSize: '1.05rem', lineHeight: 1.7 }} className="post-body">
          <style>{`
            section[data-footnotes] ol {
              list-style-type: none !important;
              counter-reset: footnotes-counter;
              padding-left: 1.5rem;
            }
            section[data-footnotes] li {
              counter-increment: footnotes-counter;
              position: relative;
              font-size: 0.9rem;
              color: #fff;
            }
            .footnote-backref {
              position: absolute;
              left: -1.5rem;
              top: 0;
              text-decoration: none !important;
              color: #3182ce !important;
              font-weight: 600;
              font-size: 0; /* Hide the ↩ emoji */
            }
            .footnote-backref::before {
              content: counter(footnotes-counter) ".";
              font-size: 0.85rem; /* Smaller footnote number */
            }
            .footnote-backref:hover::before {
              text-decoration: underline;
            }
            .footnote-backref ~ .footnote-backref {
              display: none; /* Hide extra backrefs if footnote is referenced multiple times */
            }
          `}</style>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => <p style={{ marginBottom: '1rem' }} {...props} />,
              strong: ({ node, ...props }) => <strong style={{ fontWeight: 700 }} {...props} />,
              em: ({ node, ...props }) => <em style={{ fontStyle: 'italic' }} {...props} />,
              a: ({ node, children, className, ...props }) => {
                const isBackref = (className && typeof className === 'string' && className.includes('data-footnote-backref')) || (props as any)['data-footnote-backref'];
                const isRef = (className && typeof className === 'string' && className.includes('data-footnote-ref')) || (props as any)['data-footnote-ref'];

                if (isBackref) {
                  // Omit children entirely to remove the emoji
                  return <a {...props} className="footnote-backref" />;
                }
                if (isRef) {
                  return <a style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 600 }} className={className} {...props}>{children}</a>;
                }
                return <a style={{ color: '#3182ce', textDecoration: 'underline' }} className={className} {...props}>{children}</a>;
              },
              ul: ({ node, ...props }) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }} {...props} />,
              ol: ({ node, ...props }) => <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'decimal' }} {...props} />,
              li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
              h1: ({ node, ...props }) => <h1 style={{ fontSize: '2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
              h2: ({ node, ...props }) => {
                if (props.id === 'footnote-label') {
                  return <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', marginBottom: '1rem' }} {...props} />;
                }
                return <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '1rem' }} {...props} />;
              },
              h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.75rem' }} {...props} />,
              blockquote: ({ node, ...props }) => <blockquote style={{ borderLeft: '4px solid #e2e8f0', paddingLeft: '1rem', color: '#4a5568', margin: '1rem 0' }} {...props} />,
              section: ({ node, ...props }) => {
                if ((props as any)['data-footnotes']) {
                  return <section style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }} {...props} />;
                }
                return <section {...props} />;
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Prev / Next day navigation */}
        {(prevPost || nextPost) && (
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginTop: '3rem',
              gap: '1rem',
            }}
          >
            <div style={{ flex: 1, textAlign: 'left' }}>
              {prevPost && (
                <Link
                  href={`/writing/${year}/${prevPost.slug}`}
                  style={{
                    color: '#ffffff',
                    textDecoration: 'underline',
                    fontSize: '0.95rem',
                  }}
                >
                  ← {prevPost.slug} {prevPost.title !== prevPost.slug ? prevPost.title : ''}
                </Link>
              )}
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              {nextPost && (
                <Link
                  href={`/writing/${year}/${nextPost.slug}`}
                  style={{
                    color: '#ffffff',
                    textDecoration: 'underline',
                    fontSize: '0.95rem',
                  }}
                >
                  {nextPost.slug} {nextPost.title !== nextPost.slug ? nextPost.title : ''} →
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
