@echo off
REM Mood Metrics - Redeployment Script for Windows

echo 🚀 Starting Mood Metrics redeployment...

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build the project
echo 🏗️ Building project...
npm run build

REM Check if build was successful
if exist dist (
    echo ✅ Build successful!
    echo 📁 Build contents:
    dir dist
    
    REM Deploy to Vercel
    echo 🌐 Deploying to Vercel...
    npx vercel --prod
    
    echo 🎉 Deployment complete!
) else (
    echo ❌ Build failed!
    exit /b 1
)

pause
