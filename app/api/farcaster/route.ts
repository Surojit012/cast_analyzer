import { NextResponse } from 'next/server'

// Farcaster manifest API route - returns raw JSON
export async function GET() {
  const manifest = {
    "name": "Cast Analyzer",
    "description": "Analyze your Farcaster casts with AI",
    "icon": "https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app/icon.svg",
    "url": "https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app"
  }

  return NextResponse.json(manifest, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}