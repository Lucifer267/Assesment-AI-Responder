# Vercel Deployment Guide

This guide will help you deploy your AI Product Recommendation System to Vercel.

## Pre-Deployment Checklist

- [ ] OpenAI API key ready
- [ ] GitHub account and repository
- [ ] Vercel account created
- [ ] All dependencies installed locally

## Step 1: Prepare Your Local Environment

1. **Get your OpenRouter API key:**
   - Go to [openrouter.ai](https://openrouter.ai)
   - Sign in or create account
   - Navigate to API Keys
   - Create and copy your key

2. **Update your `.env.local` file with your OpenRouter API key:**
   ```bash
   OPENROUTER_API_KEY=sk-or-your-actual-openrouter-key-here
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build locally to verify everything works:**
   ```bash
   npm run build
   ```

## Step 2: Push to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - production ready"
   ```

2. Push to GitHub:
   ```bash
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **When prompted:**
   - Link to existing project: No
   - Project name: spearmint
   - Directory: ./
   - Build command: `npm run build` (default)
   - Output directory: `dist` (default)

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework: Vite
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: dist

## Step 4: Add Environment Variables

### In Vercel Dashboard:

1. Go to your project settings
2. Click "Environment Variables"
3. Add the following:
   - **Name:** `OPENROUTER_API_KEY`
   - **Value:** `sk-or-your-actual-openrouter-api-key`
   - **Environments:** Production, Preview, Development

4. Click "Save"

## Step 5: Redeploy

Once environment variables are added:

1. **Via Dashboard:** Click "Deployments" → Find your latest deployment → Click "..." → "Redeploy"
2. **Via CLI:** Run `vercel --prod`

## Step 6: Test Your Deployment

1. Visit your Vercel deployment URL (you'll see it in the dashboard or CLI output)
2. Try searching for products:
   - "iPhone under $500"
   - "Noise cancelling buds"
   - "Tablets for design"
3. Verify recommendations appear

## Production Features Enabled

✅ Serverless API functions (`/api/recommend`)
✅ Static site generation for React frontend
✅ Automatic HTTPS
✅ CDN edge caching
✅ Environment variable management
✅ Automatic deployments on git push
✅ Fallback recommendations when API fails
✅ Image optimization

## Troubleshooting

### "API Key Invalid" Error
- Verify your OpenRouter API key is correct
- Check it's set in Vercel environment variables
- Ensure the key has available credits

### "404 on /api/recommend"
- Verify `vercel.json` exists in root
- Check API function is in `/api/recommend.ts`
- Redeploy after checking files

### "Frontend not loading"
- Check build output: should see `dist/` folder
- Verify `vite build` works locally
- Check Vercel build logs for errors

### Recommendations Not Showing
- Check browser console for errors
- Verify OpenRouter API key in environment variables
- Test with fallback (disabled API) by using invalid key
- Check Vercel function logs

## Monitoring & Logs

Monitor your deployment:

1. **Vercel Dashboard:** Project → Deployments → Click deployment → Logs
2. **API Function Logs:** View `/api/recommend` execution logs
3. **Errors:** Check Vercel Edge Functions logs for API errors

## Updating Your Deployment

### After Code Changes:
```bash
git add .
git commit -m "Update features"
git push origin main
```
Vercel automatically redeploys on push.

### After Updating Dependencies:
```bash
npm install
npm run build  # Test locally
git push
```

### Changing API Keys:
1. Update in Vercel dashboard (Environment Variables)
2. Click "Redeploy" on latest deployment

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [OpenRouter API Reference](https://openrouter.ai/docs)

## Production Deployment Checklist

Before going live:

- [ ] Test all search queries work
- [ ] Verify images load correctly
- [ ] Check error handling (try invalid API key)
- [ ] Test on mobile devices
- [ ] Monitor initial performance metrics
- [ ] Set up error alerts if desired
