# Migration Notes: Vercel Deployment Ready

## What Changed

This project has been migrated from a traditional Express.js backend to a **Vercel serverless architecture**. Here's what was changed:

### Architecture Changes

#### Before
- Express server running on Node.js
- Mixed frontend and backend in same process
- Required 3000 port management
- Build script compiled both frontend and backend

#### After
- Serverless functions in `/api` directory
- Frontend (React + Vite) and backend separated
- No port management needed
- Build script creates only frontend artifacts
- API routes handled by Vercel

### File Changes

#### New Files Created
- `api/recommend.ts` - Serverless function (replaces Express route)
- `vercel.json` - Vercel configuration
- `.env.local` - Local development environment
- `DEPLOYMENT_GUIDE.md` - Step-by-step deployment instructions
- `PRODUCTION_CHECKLIST.md` - Production readiness verification

#### Files Updated
- `package.json`
  - Removed: `express`, `tsx`, `esbuild`, `@types/express`, `dotenv`
  - Added: `@vercel/node`
  - Updated build script to use Vite only
  
- `vite.config.ts`
  - Added build configuration for production
  - Added proxy for local API calls
  
- `README.md`
  - Updated for Vercel deployment
  - Simplified setup instructions

- `index.html`
  - Updated title and meta tags for production

#### Files Archived (No Longer Used)
- `server.ts` - This file is kept for reference but not used anymore

### Breaking Changes
None. All functionality preserved with better architecture.

### Configuration Updates

#### Local Development
Create `.env.local` with:
```
OPENROUTER_API_KEY=your-key-here
```

#### Production (Vercel)
Add via Vercel dashboard → Settings → Environment Variables:
```
OPENAI_API_KEY=your-key-here
```

### Benefits of Vercel Serverless

✅ No server management
✅ Auto-scaling
✅ Global CDN
✅ Built-in security
✅ Environment variables management
✅ Automatic HTTPS
✅ Cheaper than traditional hosting
✅ One-click deployments

### API Route Migration

#### Before (Express)
```javascript
app.post('/api/recommend', async (req, res) => {
  // handler logic
});
```

#### After (Vercel Serverless)
```typescript
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  // handler logic
}
```

### How It Works

1. **Local Development (`npm run dev`)**
   - Vite runs frontend on http://localhost:5173
   - Proxy in vite.config.ts forwards `/api/*` to localhost:3000
   - No actual API server runs; use fallback or real API during testing

2. **Build (`npm run build`)**
   - Vite builds React frontend to `dist/`
   - Vercel detects `api/recommend.ts` as serverless function

3. **Production (Vercel)**
   - Vercel deploys frontend to edge network
   - Serverless function at `/api/recommend`
   - Environment variables injected at runtime

### Testing the Migration

Local testing with API:
```bash
# Option 1: Use real API (if you have a key)
npm run dev
# The app will call /api/recommend which will use fallback mode

# Option 2: Test build
npm run build
npm run preview
# Shows production build locally
```

### Rollback (If Needed)

The old `server.ts` is still in the repository. To revert:
1. Keep using the Express setup locally
2. But for Vercel, you must use serverless functions

### Support

See `DEPLOYMENT_GUIDE.md` for deployment help.
See `PRODUCTION_CHECKLIST.md` for production verification.
