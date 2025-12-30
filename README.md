# Cast Analyzer

A Farcaster Mini App that analyzes casts and provides engagement predictions, optimal posting times, and rewrite suggestions.

## Features

- **Engagement Prediction**: Get Low/Medium/High engagement forecasts
- **Optimal Timing**: Best posting times based on Farcaster activity patterns  
- **Rewrite Suggestions**: Concise, engaging, and viral versions of your cast
- **Farcaster Integration**: Works inside Farcaster clients and regular browsers
- **Optional Authentication**: Privy integration for tipping functionality

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Privy (Authentication)
- OpenRouter (AI Analysis)
- Farcaster Mini App SDK

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your API keys:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `NEXT_PUBLIC_PRIVY_APP_ID`: Your Privy app ID

5. Run the development server:
   ```bash
   npm run dev
   ```

## API Keys Setup

### OpenRouter API Key
1. Go to [openrouter.ai](https://openrouter.ai)
2. Create an account and get an API key
3. Add credits to your account for AI inference

### Privy App ID
1. Go to [privy.io](https://privy.io)
2. Create an account and new app
3. Configure Farcaster login in the dashboard
4. Copy your App ID

## Deployment

Deploy to Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

Update the Farcaster manifest URL in `.well-known/farcaster.json` with your deployed domain.

## Farcaster Mini App Setup

The app includes a Farcaster manifest at `/.well-known/farcaster.json`. Update the `url` field with your deployed domain.

## Authentication

Authentication is optional and only required for the tipping feature. The app supports:
- Farcaster login (primary)
- Email login (fallback)

## Architecture

- **Clean separation**: AI logic in `/lib/openrouter.ts`
- **Environment validation**: Robust env var checking
- **Error boundaries**: Graceful error handling
- **Mobile-first**: Optimized for Farcaster mobile clients
- **Production-ready**: Proper error handling and fallbacks

## License

MIT