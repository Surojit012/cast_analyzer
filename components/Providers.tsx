'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { useState, useEffect } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [privyConfig, setPrivyConfig] = useState<{
    appId: string | null
    isValid: boolean
  }>({ appId: null, isValid: false })
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
    
    // Validate Privy App ID format
    const isValidAppId = appId && 
                        appId !== 'demo-app-id' && 
                        appId.length > 10 && 
                        !appId.includes('your_privy_app_id_here')
    
    setPrivyConfig({
      appId: isValidAppId ? appId : null,
      isValid: !!isValidAppId
    })
    setIsReady(true)
  }, [])

  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // If no valid Privy App ID, render without authentication
  if (!privyConfig.isValid || !privyConfig.appId) {
    console.log('Privy not configured, running without authentication')
    return <>{children}</>
  }

  // Render with Privy provider
  try {
    return (
      <PrivyProvider
        appId={privyConfig.appId}
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
  } catch (error) {
    console.error('Privy initialization failed:', error)
    return <>{children}</>
  }
}