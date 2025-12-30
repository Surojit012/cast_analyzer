// Environment variable validation and configuration

export const env = {
  // Public environment variables (available on client)
  NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  // Server-only environment variables
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const

// Validation functions
export function validateServerEnv() {
  const missing: string[] = []
  
  if (!env.OPENROUTER_API_KEY) {
    missing.push('OPENROUTER_API_KEY')
  }
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`)
    console.warn('Some features may not work correctly')
  }
  
  return missing.length === 0
}

export function validateClientEnv() {
  const missing: string[] = []
  
  if (!env.NEXT_PUBLIC_PRIVY_APP_ID) {
    missing.push('NEXT_PUBLIC_PRIVY_APP_ID')
  }
  
  if (missing.length > 0) {
    console.warn(`Missing public environment variables: ${missing.join(', ')}`)
    console.warn('Authentication may not work correctly')
  }
  
  return missing.length === 0
}