#!/bin/bash
# Mood Metrics - Deployment Verification Script

echo "🔍 Verifying deployment readiness..."

# Check if required files exist
echo "📁 Checking files..."
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json not found"
    exit 1
fi

if [ ! -f "vite.config.js" ]; then
    echo "❌ vite.config.js not found"
    exit 1
fi

if [ ! -f "index.html" ]; then
    echo "❌ index.html not found"
    exit 1
fi

echo "✅ All required files present"

# Check if build works
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
    
    # Check if dist directory exists and has files
    if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
        echo "✅ Build output created successfully"
        echo "📋 Build contents:"
        ls -la dist/
        
        echo ""
        echo "🚀 Ready to deploy! Run: npx vercel --prod"
    else
        echo "❌ Build output missing"
        exit 1
    fi
else
    echo "❌ Build failed"
    exit 1
fi
