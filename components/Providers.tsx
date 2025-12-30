'use client'

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
          loginMethods: ['farcaster', 'email'],
          appearance: {
            theme: 'dark',
            accentColor: '#8B5CF6',
          },
          embeddedWallets: {
            createOnLogin: 'off', // Completely disable wallets
          },
          // Completely disable all analytics and telemetry
          clientAnalyticsEnabled: false,
          // Add explicit legal config to avoid any additional requests
          legal: {
            termsAndConditionsUrl: undefined,
            privacyPolicyUrl: undefined,
          },
          // Disable MFA to avoid additional complexity
          mfa: {
            noPromptOnMfaRequired: true,
          },
          // Add explicit domain configuration
          ...(typeof window !== 'undefined' && {
            customAuth: {
              enabled: false,
            },
          }),
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