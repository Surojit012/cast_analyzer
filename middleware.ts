import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Only handle the specific Farcaster manifest path
  if (request.nextUrl.pathname === '/.well-known/farcaster.json') {
    // Rewrite to the API route
    return NextResponse.rewrite(new URL('/api/farcaster', request.url))
  }
}

export const config = {
  matcher: ['/.well-known/farcaster.json']
}