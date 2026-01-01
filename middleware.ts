import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Handle Farcaster manifest specifically
  if (pathname === '/.well-known/farcaster.json') {
    // Create the rewrite URL
    const url = new URL('/api/farcaster', request.url)
    
    // Return the rewrite response
    return NextResponse.rewrite(url)
  }
  
  // Continue with the request for all other paths
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/.well-known/farcaster.json',
    '/.well-known/:path*'
  ]
}