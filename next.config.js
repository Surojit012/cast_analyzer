/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TypeScript errors during build for deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during build for deployment
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/.well-known/farcaster.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          // Add very permissive CSP specifically for Privy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https: data: blob:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:",
              "style-src 'self' 'unsafe-inline' https: data:",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https: blob:",
              "connect-src 'self' https: wss: data: blob:",
              "frame-src 'self' https: data: blob:",
              "worker-src 'self' blob: data: https:",
              "child-src 'self' blob: data: https:",
              "object-src 'self' data: blob:",
              "base-uri 'self'",
              "form-action 'self' https:",
              "frame-ancestors 'self' https:",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig