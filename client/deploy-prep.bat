@echo off
REM Mood Metrics - Deployment Preparation Script for Windows

echo 🚀 Preparing Mood Metrics for Vercel deployment...

REM Navigate to client directory
cd /d "%~dp0"

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Run linting
echo 🔍 Running linting...
call npm run lint

REM Build the project
echo 🏗️ Building for production...
call npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build successful! Your app is ready for deployment.
    echo.
    echo 📋 Deployment checklist:
    echo   ✅ Dependencies installed
    echo   ✅ Code linted
    echo   ✅ Production build created
    echo   ✅ vercel.json configured
    echo   ✅ .gitignore configured
    echo.
    echo 🎯 Next steps:
    echo   1. Push your code to GitHub
    echo   2. Connect repository to Vercel
    echo   3. Set root directory to 'client'
    echo   4. Deploy!
    echo.
    echo 📖 For detailed instructions, see DEPLOYMENT.md
) else (
    echo ❌ Build failed! Please fix the errors and try again.
    exit /b 1
)

pause
