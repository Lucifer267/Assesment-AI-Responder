@echo off
REM Production Deployment Verification Script for Windows
REM Run this before deploying to Vercel

echo.
echo ======================================================
echo Spearmint - Production Deployment Verification
echo ======================================================
echo.

setlocal enabledelayedexpansion
set PASSED=0
set FAILED=0
set WARNINGS=0

REM 1. Check Node.js and npm
echo [*] Checking Dependencies...
echo.

node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js installed
    set /a PASSED+=1
) else (
    echo [FAIL] Node.js not found
    set /a FAILED+=1
)

npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] npm installed
    set /a PASSED+=1
) else (
    echo [FAIL] npm not found
    set /a FAILED+=1
)

REM 2. Check project structure
echo.
echo [*] Checking Project Structure...
echo.

if exist "package.json" (
    echo [OK] package.json exists
    set /a PASSED+=1
) else (
    echo [FAIL] package.json not found
    set /a FAILED+=1
)

if exist "vercel.json" (
    echo [OK] vercel.json exists
    set /a PASSED+=1
) else (
    echo [FAIL] vercel.json not found
    set /a FAILED+=1
)

if exist "vite.config.ts" (
    echo [OK] vite.config.ts exists
    set /a PASSED+=1
) else (
    echo [FAIL] vite.config.ts not found
    set /a FAILED+=1
)

if exist "index.html" (
    echo [OK] index.html exists
    set /a PASSED+=1
) else (
    echo [FAIL] index.html not found
    set /a FAILED+=1
)

if exist "src" (
    echo [OK] src/ directory exists
    set /a PASSED+=1
) else (
    echo [FAIL] src/ directory not found
    set /a FAILED+=1
)

if exist "api" (
    echo [OK] api/ directory exists
    set /a PASSED+=1
) else (
    echo [FAIL] api/ directory not found
    set /a FAILED+=1
)

if exist "api\recommend.ts" (
    echo [OK] api/recommend.ts exists
    set /a PASSED+=1
) else (
    echo [FAIL] api/recommend.ts not found
    set /a FAILED+=1
)

REM 3. Check environment setup
echo.
echo [*] Checking Environment Setup...
echo.

if exist ".env.local" (
    echo [OK] .env.local exists
    set /a PASSED+=1
) else (
    echo [WARN] .env.local not found - create it with your API key
    set /a WARNINGS+=1
)

if exist ".env.example" (
    echo [OK] .env.example exists
    set /a PASSED+=1
) else (
    echo [FAIL] .env.example not found
    set /a FAILED+=1
)

REM 4. Check documentation
echo.
echo [*] Checking Documentation...
echo.

if exist "README.md" (
    echo [OK] README.md exists
    set /a PASSED+=1
) else (
    echo [FAIL] README.md not found
    set /a FAILED+=1
)

if exist "DEPLOYMENT_GUIDE.md" (
    echo [OK] DEPLOYMENT_GUIDE.md exists
    set /a PASSED+=1
) else (
    echo [FAIL] DEPLOYMENT_GUIDE.md not found
    set /a FAILED+=1
)

if exist "PRODUCTION_CHECKLIST.md" (
    echo [OK] PRODUCTION_CHECKLIST.md exists
    set /a PASSED+=1
) else (
    echo [FAIL] PRODUCTION_CHECKLIST.md not found
    set /a FAILED+=1
)

if exist "QUICKSTART.md" (
    echo [OK] QUICKSTART.md exists
    set /a PASSED+=1
) else (
    echo [FAIL] QUICKSTART.md not found
    set /a FAILED+=1
)

REM 5. Check for TypeScript errors
echo.
echo [*] Checking TypeScript...
echo.

npm run lint >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] TypeScript compilation succeeds
    set /a PASSED+=1
) else (
    echo [WARN] TypeScript has errors - review output
    set /a WARNINGS+=1
)

REM 6. Try build
echo.
echo [*] Checking Build...
echo.

npm run build >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] npm run build succeeds
    set /a PASSED+=1
    
    if exist "dist" (
        echo [OK] dist/ directory created
        set /a PASSED+=1
    ) else (
        echo [FAIL] dist/ directory not found after build
        set /a FAILED+=1
    )
) else (
    echo [WARN] npm run build failed - check console for errors
    set /a WARNINGS+=1
)

REM Summary
echo.
echo ======================================================
echo Verification Summary
echo ======================================================
echo Passed: %PASSED%
echo Warnings: %WARNINGS%
echo Failed: %FAILED%
echo.

if %FAILED% equ 0 (
    echo [SUCCESS] Your project is ready for Vercel deployment!
    echo.
    echo Next steps:
    echo 1. Edit .env.local and add your OpenAI API key
    echo 2. Test locally: npm run dev
    echo 3. Verify everything works on http://localhost:5173
    echo 4. Push to GitHub
    echo 5. Deploy to Vercel
    echo 6. Add OPENAI_API_KEY to Vercel environment variables
    echo.
    pause
    exit /b 0
) else (
    echo [ERROR] Please fix the issues above before deploying.
    echo.
    pause
    exit /b 1
)
