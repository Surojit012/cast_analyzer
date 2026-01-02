import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    "name": "Cast Analyzer",
    "description": "Analyze your Farcaster casts with AI insights.",
    "icon": "https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app/icon.png",
    "url": "https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app"
  }

  return NextResponse.json(manifest, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}