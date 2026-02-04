# Personal Website

A modern, minimalist personal website built with Next.js, Chakra UI, and Framer Motion.

## Features

- **Dark Mode First**: Pure black background with white text and subtle gray accents
- **Smooth Scrolling**: Lenis-powered smooth scroll experience
- **Responsive Design**: Adapts from 2-column desktop layout to 1-column mobile stack
- **Animations**: Framer Motion fade-in-up animations as elements enter viewport
- **Project Cards**: Interactive project cards with hover effects (image scale + overlay)
- **Typography**: Large, bold headings with tight letter spacing using Inter font

## Tech Stack

- **Next.js 16** with App Router and TypeScript
- **Chakra UI** for component library and theming
- **Framer Motion** for animations
- **Lenis** for smooth scrolling
- **React Icons** for social media icons

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── about/          # About page
│   ├── books/          # Bookshelf page
│   ├── essays/         # Essays page
│   ├── projects/       # Projects page with ProjectCard components
│   ├── random/         # Random page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Navigation.tsx   # Sticky navigation sidebar
│   ├── PageLayout.tsx  # Reusable page layout wrapper
│   ├── ProjectCard.tsx # Project card with hover effects
│   └── SmoothScroll.tsx # Lenis smooth scroll integration
├── providers.tsx       # Chakra UI provider wrapper
└── theme.ts            # Chakra UI theme configuration
```

## Pages

- **Home** (`/`): Landing page with introduction
- **About** (`/about`): Detailed about page
- **Projects** (`/projects`): Grid of project cards
- **Books** (`/books`): Bookshelf with reading list
- **Essays** (`/essays`): Collection of essays and thoughts
- **Random** (`/random`): Miscellaneous links and thoughts

## Customization

### Theme

Edit `src/theme.ts` to customize colors, fonts, and component styles.

### Content

Update the content in each page file (`src/app/*/page.tsx`) to match your information.

### Social Links

Update social media links in `src/components/Navigation.tsx`.

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Deploy

### GitHub Pages

This project is configured for GitHub Pages deployment. See [DEPLOY.md](./DEPLOY.md) for detailed instructions.

Quick steps:
1. Push your code to GitHub
2. Enable GitHub Pages in repository Settings → Pages (select "GitHub Actions" as source)
3. The site will automatically deploy on every push to `main`

### Vercel (Alternative)

You can also deploy using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Deploy with one click

**Note**: If deploying to Vercel, you may want to remove `output: 'export'` from `next.config.ts` to enable server-side features.
