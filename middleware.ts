import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Rewrite /.well-known/farcaster.json to /api/farcaster
  if (request.nextUrl.pathname === '/.well-known/farcaster.json') {
    return NextResponse.rewrite(new URL('/api/farcaster', request.url))
  }
}

export const config = {
  matcher: ['/.well-known/farcaster.json']
}