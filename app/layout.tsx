import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cast Analyzer - AI-Powered Farcaster Cast Insights',
  description: 'Analyze and improve your Farcaster casts with AI-powered engagement predictions, optimal timing suggestions, and rewrite recommendations.',
  keywords: ['Farcaster', 'Cast', 'Analytics', 'AI', 'Social Media', 'Engagement', 'Optimization'],
  authors: [{ name: 'Cast Analyzer Team' }],
  openGraph: {
    title: 'Cast Analyzer - AI-Powered Farcaster Cast Insights',
    description: 'Analyze and improve your Farcaster casts with AI-powered engagement predictions, optimal timing suggestions, and rewrite recommendations.',
    type: 'website',
    url: 'https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app',
    images: [
      {
        url: 'https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app/icon.svg',
        width: 512,
        height: 512,
        alt: 'Cast Analyzer Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cast Analyzer - AI-Powered Farcaster Cast Insights',
    description: 'Analyze and improve your Farcaster casts with AI-powered insights',
    images: ['https://cast-analyzer-flp1d2bza-surojit-guhas-projects.vercel.app/icon.svg'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
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