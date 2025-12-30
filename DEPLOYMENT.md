# Deployment Guide

## Quick Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/cast-analyzer.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `OPENROUTER_API_KEY`: Your OpenRouter API key
     - `NEXT_PUBLIC_PRIVY_APP_ID`: Your Privy app ID

3. **Update Farcaster Manifest**
   - After deployment, update `.well-known/farcaster.json`
   - Replace `https://cast-analyzer.vercel.app` with your actual domain

4. **Get API Keys**

   **OpenRouter API Key:**
   - Go to [openrouter.ai](https://openrouter.ai)
   - Create an account and get an API key
   - Add credits to your account for AI inference

   **Privy App ID:**
   - Go to [privy.io](https://privy.io)
   - Create an account and new app
   - Configure Farcaster login in the dashboard
   - Copy your App ID

## Testing

1. **Local Testing**
   ```bash
   npm run dev
   ```

2. **Farcaster Testing**
   - Deploy to Vercel first
   - Test the manifest: `https://yourdomain.com/.well-known/farcaster.json`
   - Submit to Farcaster for mini app approval

## Production Checklist

- [ ] Replace placeholder icon with actual 512x512px PNG
- [ ] Update domain in farcaster.json
- [ ] Test all functionality in production
- [ ] Monitor API usage and costs
- [ ] Set up error monitoring (optional)

## Environment Variables

Required:
- `OPENROUTER_API_KEY`: For AI analysis
- `NEXT_PUBLIC_PRIVY_APP_ID`: For authentication

The app will work without these but with limited functionality.