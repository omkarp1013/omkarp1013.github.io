# Deploying to GitHub Pages

This guide will help you deploy your Next.js website to GitHub Pages.

## Prerequisites

1. A GitHub account
2. A GitHub repository (create one if you haven't already)

## Steps to Deploy

### 1. Push your code to GitHub

If you haven't already, initialize git and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
5. The workflow will automatically run when you push to the `main` branch

### 3. Configure Base Path (if needed)

**If your repository name is NOT `YOUR_USERNAME.github.io`** (i.e., you're deploying to a subdirectory):

1. Open `next.config.ts`
2. Uncomment and update these lines:
   ```typescript
   basePath: '/your-repo-name',
   trailingSlash: true,
   ```
   Replace `your-repo-name` with your actual repository name.

**If your repository IS `YOUR_USERNAME.github.io`** (root domain):
- You don't need to change anything - the current config will work!

### 4. Push and Deploy

After enabling GitHub Pages and configuring the base path (if needed):

```bash
git add .
git commit -m "Configure for GitHub Pages"
git push
```

### 5. Wait for Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually takes 1-2 minutes)
4. Once it's done, go back to **Settings** → **Pages**
5. Your site URL will be displayed there!

## Your Site URL

- If repository is `username.github.io`: `https://username.github.io`
- If repository is a project repo: `https://username.github.io/repo-name`

## Troubleshooting

### Build fails
- Check the Actions tab for error messages
- Make sure all dependencies are in `package.json`
- Ensure `next.config.ts` has `output: 'export'`

### 404 errors on navigation
- Make sure `basePath` is correctly set in `next.config.ts` if deploying to a subdirectory
- Ensure `trailingSlash: true` is set if using basePath

### Images not loading
- Images are set to `unoptimized: true` for static export
- Make sure image URLs are absolute (starting with `https://`)

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
npm run build
# The static files will be in the /out directory
# You can then push the /out directory to the gh-pages branch
```

But the GitHub Actions workflow is recommended as it's automatic!
