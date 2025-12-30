import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cast Analyzer',
  description: 'Analyze and improve your Farcaster casts',
  openGraph: {
    title: 'Cast Analyzer',
    description: 'Analyze and improve your Farcaster casts',
    type: 'website',
  },
  other: {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://openrouter.ai wss://relay.walletconnect.com wss://relay.walletconnect.org",
      "frame-src 'self' https://auth.privy.io https://verify.walletconnect.com",
      "worker-src 'self' blob:",
      "child-src 'self' blob:",
    ].join('; '),
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}