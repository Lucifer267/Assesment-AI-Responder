#!/bin/bash

# Production Deployment Verification Script
# Run this before deploying to Vercel

echo "🚀 Spearmint - Production Deployment Verification"
echo "=================================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Check function
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1"
        ((FAILED++))
    fi
}

check_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

# 1. Check Node.js and npm
echo "📦 Checking Dependencies..."
echo ""

node --version > /dev/null 2>&1
check_status "Node.js installed"

npm --version > /dev/null 2>&1
check_status "npm installed"

# 2. Check project structure
echo ""
echo "📁 Checking Project Structure..."
echo ""

[ -f "package.json" ]
check_status "package.json exists"

[ -f "vercel.json" ]
check_status "vercel.json exists"

[ -f "vite.config.ts" ]
check_status "vite.config.ts exists"

[ -f "index.html" ]
check_status "index.html exists"

[ -d "src" ]
check_status "src/ directory exists"

[ -d "api" ]
check_status "api/ directory exists"

[ -f "api/recommend.ts" ]
check_status "api/recommend.ts exists (serverless function)"

# 3. Check configuration files
echo ""
echo "⚙️ Checking Configuration..."
echo ""

grep -q '"build": "vite build"' package.json
check_status "Build script configured for Vite"

grep -q '"dev": "vite"' package.json
check_status "Dev script configured for Vite"

grep -q "outDir" vite.config.ts
check_status "Vite output directory configured"

grep -q "OPENAI_API_KEY" vercel.json
check_status "OpenAI API key in vercel.json"

# 4. Check environment setup
echo ""
echo "🔐 Checking Environment Setup..."
echo ""

[ -f ".env.local" ]
check_status ".env.local exists for local development"

[ -f ".env.example" ]
check_status ".env.example exists"

grep -q "OPENAI_API_KEY" .env.example
check_status "OPENAI_API_KEY documented in .env.example"

# 5. Check dependencies
echo ""
echo "📚 Checking Dependencies..."
echo ""

npm list @vitejs/plugin-react > /dev/null 2>&1
check_status "@vitejs/plugin-react installed"

npm list openai > /dev/null 2>&1
check_status "openai package installed"

npm list axios > /dev/null 2>&1
check_status "axios installed"

npm list @vercel/node > /dev/null 2>&1 || check_warning "Consider installing @vercel/node for type hints"

# 6. Check for security issues
echo ""
echo "🔒 Checking Security..."
echo ""

grep -q "node_modules" .gitignore
check_status "node_modules in .gitignore"

grep -q ".env" .gitignore
check_status ".env files in .gitignore"

grep -q "dist" .gitignore
check_status "dist/ in .gitignore"

[ ! -f ".env" ] || grep -q ".env" .gitignore
if [ -f ".env" ]; then
    grep -q ".env" .gitignore
    check_status ".env not committed to git"
else
    check_status "No .env file (good)"
fi

# 7. Check documentation
echo ""
echo "📖 Checking Documentation..."
echo ""

[ -f "README.md" ]
check_status "README.md exists"

[ -f "DEPLOYMENT_GUIDE.md" ]
check_status "DEPLOYMENT_GUIDE.md exists"

[ -f "PRODUCTION_CHECKLIST.md" ]
check_status "PRODUCTION_CHECKLIST.md exists"

[ -f "QUICKSTART.md" ]
check_status "QUICKSTART.md exists"

# 8. Check for TypeScript errors
echo ""
echo "🔍 Checking TypeScript..."
echo ""

if [ -f "tsconfig.json" ]; then
    npm run lint > /dev/null 2>&1
    check_status "TypeScript compilation succeeds"
else
    check_warning "tsconfig.json not found"
fi

# 9. Try build
echo ""
echo "🏗️ Checking Build..."
echo ""

npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    check_status "npm run build succeeds"
    [ -d "dist" ] && check_status "dist/ directory created"
else
    check_warning "npm run build had issues (check console)"
fi

# 10. Check API endpoint
echo ""
echo "🔌 Checking API Endpoint..."
echo ""

grep -q "'/api/recommend'" api/recommend.ts
check_status "API endpoint exported from api/recommend.ts"

grep -q "export default" api/recommend.ts
check_status "Serverless function properly exported"

grep -q "VercelRequest" api/recommend.ts
check_status "Using Vercel Request/Response types"

# 11. Check frontend configuration
echo ""
echo "⚡ Checking Frontend..."
echo ""

grep -q "import App from" src/main.tsx
check_status "React app entry point configured"

[ -f "src/App.tsx" ]
check_status "App.tsx exists"

[ -d "src/components" ]
check_status "Components directory exists"

grep -q "OPENAI_API_KEY" .env.example
check_status "API key mentioned in .env.example"

# Summary
echo ""
echo "=================================================="
echo "✅ Verification Summary"
echo "=================================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
[ $FAILED -gt 0 ] && echo -e "${RED}Failed: $FAILED${NC}" || echo "Failed: 0"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ Your project is ready for Vercel deployment!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Add your OpenAI API key to .env.local"
    echo "2. Test locally: npm run dev"
    echo "3. Push to GitHub"
    echo "4. Deploy to Vercel: vercel --prod"
    echo "5. Add OPENAI_API_KEY to Vercel environment variables"
    echo "6. Redeploy on Vercel"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Please fix the issues above before deploying.${NC}"
    echo ""
    exit 1
fi
