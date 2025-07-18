#!/bin/bash

# Mood Metrics - Deployment Preparation Script

echo "🚀 Preparing Mood Metrics for Vercel deployment..."

# Navigate to client directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the project
echo "🏗️ Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Your app is ready for deployment."
    echo ""
    echo "📋 Deployment checklist:"
    echo "  ✅ Dependencies installed"
    echo "  ✅ Code linted"
    echo "  ✅ Production build created"
    echo "  ✅ vercel.json configured"
    echo "  ✅ .gitignore configured"
    echo ""
    echo "🎯 Next steps:"
    echo "  1. Push your code to GitHub"
    echo "  2. Connect repository to Vercel"
    echo "  3. Set root directory to 'client'"
    echo "  4. Deploy!"
    echo ""
    echo "📖 For detailed instructions, see DEPLOYMENT.md"
else
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi
