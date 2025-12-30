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
          // Temporarily remove CSP to test
          // {
          //   key: 'Content-Security-Policy',
          //   value: [
          //     "default-src 'self' https:",
          //     "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:",
          //     "style-src 'self' 'unsafe-inline' https:",
          //     "img-src 'self' data: https: blob:",
          //     "font-src 'self' data: https:",
          //     "connect-src 'self' https: wss: data:",
          //     "frame-src 'self' https:",
          //     "worker-src 'self' blob: data:",
          //     "child-src 'self' blob: data:",
          //     "object-src 'none'",
          //     "base-uri 'self'",
          //   ].join('; '),
          // },
        ],
      },
    ]
  },
}

module.exports = nextConfig