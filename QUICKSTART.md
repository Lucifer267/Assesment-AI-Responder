# Quick Start Guide - Vercel Deployment Ready

## 🚀 Get Started in 5 Minutes

### Step 1: Local Setup (2 minutes)

```bash
# Install dependencies
npm install

# Create local environment file
echo "OPENAI_API_KEY=sk-your-openai-key-here" > .env.local

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Step 2: Test Locally (1 minute)

Try these searches:
- "iPhone under $500"
- "Noise cancelling buds"
- "Tablets for design"

You should see AI-powered product recommendations.

### Step 3: Prepare for Vercel (2 minutes)

```bash
# Build the project
npm run build

# Verify build output
ls -la dist/

# Push to GitHub
git add .
git commit -m "Production ready for Vercel"
git push origin main
```

### Step 4: Deploy to Vercel

#### Option A: Via Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repo
4. Framework: Vite (auto-detected)
5. Click "Deploy"

#### Option B: Via CLI

```bash
npm i -g vercel
vercel --prod
```

### Step 5: Add API Key to Vercel

1. In Vercel Dashboard → Your Project → Settings
2. Go to "Environment Variables"
3. Add: `OPENAI_API_KEY=sk-your-production-key`
4. Click "Save"
5. Go to Deployments, click latest, then "Redeploy"

**Done!** 🎉

---

## 📋 What's Included

✅ React 18 + Vite frontend
✅ Serverless OpenAI API integration
✅ Tailwind CSS styling
✅ Framer Motion animations
✅ Production-ready security
✅ Fallback recommendations
✅ Mobile responsive design

## 🔑 Your API Key

**Get your free OpenAI API key:**

1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up / Login
3. Go to API Keys
4. Create new secret key
5. Copy the key (looks like: `sk-proj-...`)

**Cost:** First $5 free credit, then pay-as-you-go.

## 📱 Features

- **AI Recommendations:** Uses GPT-4o-mini (via OpenRouter) for smart suggestions
- **Product Catalog:** 20+ pre-loaded products
- **Fallback Mode:** Works without API (local keyword matching)
- **Loading States:** Beautiful animations during processing
- **Error Handling:** Graceful fallback when API unavailable
- **Mobile Optimized:** Works on all devices

## 🐛 Troubleshooting

**Frontend not loading?**
```bash
rm -rf dist node_modules
npm install
npm run build
npm run preview
```

**API not working?**
- Check OpenAI API key is valid
- Verify it's set in `.env.local` (local) or Vercel dashboard (production)
- Check API account has available credits

**Images not showing?**
- They load from Unsplash CDN (external)
- Check internet connection
- Try different browser

**Stuck in loading?**
- Open browser console (F12)
- Look for error messages
- Verify API key is correct

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed deployment steps
- [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) - Pre-production checklist
- [MIGRATION_NOTES.md](./MIGRATION_NOTES.md) - What changed from Express to Vercel

## 🎯 Next Steps

After deployment:

1. **Share your URL** - Deploy is live!
2. **Monitor Performance** - Check Vercel dashboard
3. **Add Custom Domain** - Optional Vercel feature
4. **Set Up Analytics** - Track user behavior

## 💡 Tips

- Use production API key for best performance
- Monitor OpenRouter usage in your account
- Test thoroughly before sharing URL
- Keep git history clean

## 📞 Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- OpenRouter API: [openrouter.ai/docs](https://openrouter.ai/docs)
- React + Vite: [vitejs.dev](https://vitejs.dev)

---

**Congratulations!** Your AI Product Recommendation System is production-ready! 🚀
