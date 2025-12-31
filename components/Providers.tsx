'use client'

// Authentication disabled for initial launch - focusing on core cast analysis functionality
export default function Providers({ children }: { children: React.ReactNode }) {
  console.log('Cast Analyzer running without authentication (core functionality focus)')
  return <>{children}</>
}