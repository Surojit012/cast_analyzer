import { NextResponse } from 'next/server'

// Farcaster manifest at /farcaster.json (root level)
export async function GET() {
  const manifest = {
    name: "Cast Analyzer",
    description: "Analyze your Farcaster casts with AI",
    icon: "https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app/icon.svg",
    url: "https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app"
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