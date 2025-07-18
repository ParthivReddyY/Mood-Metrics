# Mood Metrics - Vercel Deployment Guide

This guide will help you deploy the Mood Metrics application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Git repository containing your code

## Quick Deploy to Vercel

### Method 1: Direct GitHub Integration (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Select the `client` folder as your root directory
   - Vercel will automatically detect the Vite configuration
   - Click "Deploy"

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from client directory**
   ```bash
   cd client
   vercel
   ```

3. **Follow the prompts**
   - Login to your Vercel account
   - Link to existing project or create new
   - Configure deployment settings

## Configuration

### Build Settings (Auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Environment Variables
No environment variables are required for basic functionality. The application works out of the box.

## Post-Deployment

After successful deployment, you'll get:
- **Production URL**: Your live application URL
- **Preview URLs**: For each deployment
- **Custom Domain**: Can be configured in Vercel dashboard

## Features Available in Production

✅ **Team Dashboard**: Complete team health overview
✅ **Mood Tracking**: Real-time mood check-ins
✅ **Productivity Metrics**: Team productivity analytics
✅ **Wellness Monitoring**: Health and burnout tracking
✅ **GitHub Integration**: Repository statistics (configure in Settings)
✅ **Responsive Design**: Mobile and desktop optimized
✅ **Role Switching**: Manager and team member views

## Performance Optimizations

The application includes:
- Code splitting for optimal loading
- Lazy loading of components
- Optimized bundle sizes
- Production-ready build configuration

## Support

If you encounter any issues during deployment:
1. Check the Vercel build logs
2. Ensure all dependencies are listed in `package.json`
3. Verify the `client` folder is set as the root directory
4. Check that the `vercel.json` configuration is correct

## Live Demo

Once deployed, your application will be available at your Vercel URL with all features fully functional.
