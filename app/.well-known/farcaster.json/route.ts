import { NextResponse } from 'next/server'

// Farcaster Mini App manifest at /.well-known/farcaster.json
export async function GET() {
  const manifest = {
    miniapp: {
      version: "1",
      name: "Cast Analyzer",
      iconUrl: "https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app/icon.svg",
      homeUrl: "https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app?miniApp=true",
      subtitle: "AI-powered cast insights",
      description: "Analyze and improve your Farcaster casts with AI-powered engagement predictions, optimal timing suggestions, and rewrite recommendations.",
      primaryCategory: "productivity",
      tags: [
        "ai",
        "analytics",
        "farcaster",
        "productivity",
        "insights"
      ],
      tagline: "AI-powered cast insights",
      ogTitle: "Cast Analyzer",
      ogDescription: "Analyze and improve your Farcaster casts with AI-powered insights",
      ogImageUrl: "https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app/icon.svg"
    }
  }

  return new NextResponse(JSON.stringify(manifest), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}