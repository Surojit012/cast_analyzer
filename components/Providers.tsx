'use client'

import { PrivyProvider } from '@privy-io/react-auth'

export default function Providers({ children }: { children: React.ReactNode }) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  console.log('Privy App ID:', privyAppId)

  // Always render with Privy provider if we have an app ID
  if (privyAppId && privyAppId !== 'demo-app-id') {
    console.log('Initializing Privy with App ID:', privyAppId)
    
    try {
      return (
        <PrivyProvider
          appId={privyAppId}
          config={{
            loginMethods: ['farcaster', 'email'],
            appearance: {
              theme: 'dark',
              accentColor: '#8B5CF6',
              logo: undefined,
            },
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
              requireUserPasswordOnCreate: false,
            },
            // Explicit domain and environment configuration
            legal: {
              termsAndConditionsUrl: undefined,
              privacyPolicyUrl: undefined,
            },
            // Add explicit client configuration
            clientAnalyticsEnabled: true,
            // Ensure proper iframe handling
            mfa: {
              noPromptOnMfaRequired: false,
            },
          }}
          onSuccess={(user) => {
            console.log('Privy login successful:', user)
          }}
          onError={(error) => {
            console.error('Privy error:', error)
          }}
        >
          {children}
        </PrivyProvider>
      )
    } catch (error) {
      console.error('Privy initialization failed:', error)
      return <>{children}</>
    }
  }

  console.log('No valid Privy App ID, running without authentication')
  // Fallback without Privy
  return <>{children}</>
}