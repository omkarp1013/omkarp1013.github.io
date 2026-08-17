import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://omkarp1013.github.io';
const WRITING_DIR = path.join(process.cwd(), 'src/content/writing');

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ['', '/about', '/reading', '/writing'].map((route) => ({
    url: `${BASE_URL}${route}`,
  }));

  const postRoutes: MetadataRoute.Sitemap = [];

  try {
    const years = fs.readdirSync(WRITING_DIR).filter((entry) =>
      fs.statSync(path.join(WRITING_DIR, entry)).isDirectory()
    );

    for (const year of years) {
      postRoutes.push({ url: `${BASE_URL}/writing/${year}` });

      const yearPath = path.join(WRITING_DIR, year);
      const files = fs.readdirSync(yearPath).filter((f) => f.endsWith('.md'));
      for (const file of files) {
        const slug = file.replace('.md', '');
        postRoutes.push({
          url: `${BASE_URL}/writing/${year}/${slug}`,
          lastModified: slug,
        });
      }
    }
  } catch (e) {
    console.error('Error generating sitemap:', e);
  }

  return [...staticRoutes, ...postRoutes];
}
