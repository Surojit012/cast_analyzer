'use client'

import { PrivyProvider } from '@privy-io/react-auth'

export default function Providers({ children }: { children: React.ReactNode }) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  // Always render with Privy provider if we have an app ID
  if (privyAppId && privyAppId !== 'demo-app-id') {
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
            createOnLogin: 'users-without-wallets',
          },
        }}
      >
        {children}
      </PrivyProvider>
    )
  }

  // Fallback without Privy
  return <>{children}</>
}