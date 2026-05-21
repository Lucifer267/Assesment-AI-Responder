# AI Product Recommendation System

A modern, scalable AI-powered product recommendation system built with React, Vite, TypeScript, Tailwind CSS, and OpenAI API.

## 🚀 Production Ready for Vercel

This project is fully optimized for Vercel deployment with serverless functions.

## Architecture

This project uses:

- **Frontend:** React 18 with Vite, React Query for state management, Tailwind CSS for styling, and Framer Motion for animations
- **Backend:** Serverless API functions on Vercel using the OpenAI API
- **API Route:** `/api/recommend` - Intelligent product recommendations using GPT-4o-mini

### Tech Stack

- React 18, Vite, TypeScript
- Tailwind CSS, Framer Motion
- React Query (TanStack Query), Axios
- OpenAI SDK
- Vercel Serverless Functions

## Local Development Guide

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```bash
   OPENROUTER_API_KEY=sk-or-your-openrouter-api-key-here
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   The app runs at `http://localhost:5173` with proxy support for `/api` routes.

4. **Build Locally:**
   ```bash
   npm run build
   ```

## Vercel Deployment

### Quick Deploy

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Framework: Vite (auto-detected)
   - Root: ./

3. **Add Environment Variables:**
   - Project Settings → Environment Variables
   - Add `OPENROUTER_API_KEY` with your OpenRouter API key

4. **Deploy:**
   Click "Deploy" and wait for the build to complete.

### Manual CLI Deploy

```bash
npm i -g vercel
vercel --prod
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## Features

✅ AI-powered product recommendations
✅ Fallback local recommendations when API is unavailable
✅ Responsive design (mobile, tablet, desktop)
✅ Smooth animations with Framer Motion
✅ Error handling and loading states
✅ Serverless API architecture
✅ Production-ready security
✅ CDN optimized images

## Sample Prompts to Try


The product catalog contains smartphones, laptops, headphones, smartwatches, and tablets.
Try entering queries like:
- "I need a great laptop for college that has long battery life."
- "What's the best noise-cancelling option for an airplane?"
- "I want an affordable secondary phone that does the basics well."
- "Show me an activity tracker under $150."

## Production Improvements (Next Steps)

- **Vector Database:** For a larger catalog, implement a vector search engine (like Pinecone) rather than sending the entire catalog within the context window.
- **Rate Limiting:** Implement robust rate limiting on the `/api/recommend` route using tools like Redis or Upstash.
- **Monitoring:** Add observability metrics (e.g., Datadog, Sentry) to track LLM response times and user queries.
