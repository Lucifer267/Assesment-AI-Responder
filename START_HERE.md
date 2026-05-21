# 🎯 START HERE - Production Deployment Instructions

## Your Project is Ready! ✅

Your Spearmint AI Product Recommendation System is now **production-ready for Vercel deployment**. Follow these simple steps to launch it.

---

## ⚡ Quick Setup (5 minutes)

### 1. **Get Your OpenRouter API Key** (2 minutes)

1. Go to [https://openrouter.ai](https://openrouter.ai)
2. Sign in or create account
3. Click **"API Keys"** in settings
4. Click **"Create new key"**
5. Copy your key (looks like: `sk-or-...`)
6. Save it somewhere safe (you'll need it)

---

### 2. **Test Locally** (2 minutes)

1. Open terminal/command prompt in project folder
2. Create `.env.local` file (if it doesn't exist):
   ```bash
   echo OPENROUTER_API_KEY=sk-or-your-key-here > .env.local
   ```
   
   **Or edit `.env.local` manually** and add your actual API key

3. Install & run:
   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173)

5. Try searching: **"iPhone under $500"**
   - Should see recommendations within 3 seconds ✓

6. If it works, press Ctrl+C to stop

---

### 3. **Deploy to Vercel** (1 minute)

**Option A: Easy - Use Vercel Dashboard (Recommended)**

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Production ready"
   git push
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Select your GitHub repo
5. Click **"Deploy"** (settings are auto-detected)
6. Wait 2-3 minutes...

**Option B: CLI - Use Terminal**

```bash
npm i -g vercel
vercel --prod
```

Follow the prompts.

---

### 4. **Add API Key to Vercel** (1 minute)

1. In Vercel Dashboard, click your project
2. Go to **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Fill in:
   - **Name:** `OPENROUTER_API_KEY`
   - **Value:** `sk-or-your-actual-key`
   - **Environments:** Select all (Production, Preview, Development)
5. Click **"Save"**

---

### 5. **Redeploy** (1 minute)

1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **"..."** menu
4. Click **"Redeploy"**
5. Wait for it to finish

**Done!** 🎉

---

## ✅ Verification Checklist

- [ ] OpenAI API key created
- [ ] `.env.local` has your API key
- [ ] Local test works (`npm run dev` → search works)
- [ ] Code pushed to GitHub
- [ ] Vercel deployment complete
- [ ] API key added to Vercel
- [ ] Redeployed on Vercel

---

## 🎯 After Deployment

**Your app is live!** The Vercel dashboard shows your deployment URL.

### Test Your Live App
1. Click the deployment URL
2. Try searching for products
3. Verify recommendations work
4. Share the URL with others!

---

## 📚 Documentation

For more detailed information, read these files:

| File | Purpose |
|------|---------|
| **QUICKSTART.md** | Quick reference guide |
| **DEPLOYMENT_GUIDE.md** | Detailed step-by-step |
| **PRODUCTION_CHECKLIST.md** | Pre-deployment checklist |
| **CHANGES_SUMMARY.md** | What was changed |
| **MIGRATION_NOTES.md** | Technical migration info |

---

## 🆘 Troubleshooting

### **"npm install fails"**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **"npm run dev doesn't work"**
- Check Node.js is installed: `node --version`
- Update Node.js if old
- Try: `npm install` again

### **"Local search doesn't work"**
- Check `.env.local` has `OPENAI_API_KEY=sk-...`
- Verify your OpenAI API key is valid
- Check it has available credits

### **"Vercel deployment fails"**
- Check Vercel build logs (click deployment)
- Try `npm run build` locally to reproduce
- Verify all files are pushed to GitHub

### **"API returns 404 on Vercel"**
- Check `api/recommend.ts` exists
- Check `vercel.json` in root
- Redeploy

### **"Stuck loading on live app"**
- Open browser console (F12)
- Look for error messages
- Check API key is set in Vercel environment
- Try hard refresh (Ctrl+Shift+R)

---

## 🔑 Key Files

**Configuration:**
- `vercel.json` - Vercel settings
- `.env.local` - Your local API key
- `.env.example` - Template

**Deployment:**
- `api/recommend.ts` - API endpoint
- `package.json` - Dependencies
- `vite.config.ts` - Build config

---

## 💡 Tips

✅ **Keep your API key safe** - Never share or commit it
✅ **Monitor usage** - Check OpenAI dashboard for costs
✅ **Test thoroughly** - Try different searches
✅ **Update regularly** - Push changes to auto-deploy
✅ **Share your URL** - Send deployment link to others

---

## 📞 Getting Help

**Vercel Issues:**
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)

**OpenAI Issues:**
- [OpenAI Docs](https://platform.openai.com/docs)
- [API Status](https://status.openai.com)

**General Help:**
- Check terminal output for errors
- Read browser console (F12)
- Check Vercel deployment logs

---

## 🚀 You're Ready!

**Your production deployment is ready to go!**

### Summary of What's Done ✅
- [x] Project converted to Vercel serverless
- [x] All features working
- [x] Security configured
- [x] Documentation complete
- [x] Verification tools added

### What You Need to Do
1. Add OpenAI API key to `.env.local`
2. Test locally
3. Push to GitHub
4. Deploy to Vercel
5. Add API key to Vercel
6. Redeploy

---

## Next Step

👉 **Go to [QUICKSTART.md](./QUICKSTART.md) for detailed instructions**

Or jump straight to deployment:

**Option 1 - Step by step:**
Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Option 2 - Quick version:**
```bash
npm install
npm run build
git push
# Then deploy to Vercel via dashboard or CLI
```

---

**Questions?** Check the documentation files above or refer to links provided.

**Ready to launch?** Start with Step 1 above! 🚀
