'use client'

// Temporarily disable Privy to focus on core functionality
export default function Providers({ children }: { children: React.ReactNode }) {
  console.log('Running without Privy authentication (temporarily disabled)')
  return <>{children}</>
}

// Original Privy implementation (commented out for now)
/*
import { PrivyProvider } from '@privy-io/react-auth'

export default function Providers({ children }: { children: React.ReactNode }) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  console.log('Privy App ID:', privyAppId)

  // Always render with Privy provider if we have an app ID
  if (privyAppId && privyAppId !== 'demo-app-id') {
    console.log('Initializing Privy with App ID:', privyAppId)
    
    return (
      <PrivyProvider
        appId={privyAppId}
        config={{
          // Start with just email to test
          loginMethods: ['email'],
          appearance: {
            theme: 'dark',
          },
          embeddedWallets: {
            createOnLogin: 'off',
          },
        }}
        onSuccess={(user) => {
          console.log('✅ Privy login successful:', user)
        }}
        onError={(error) => {
          console.error('❌ Privy login error:', error)
          console.error('Error details:', JSON.stringify(error, null, 2))
        }}
      >
        {children}
      </PrivyProvider>
    )
  }

  console.log('No valid Privy App ID, running without authentication')
  // Fallback without Privy
  return <>{children}</>
}
*/