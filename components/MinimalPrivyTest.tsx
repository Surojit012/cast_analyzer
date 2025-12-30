'use client'

import { PrivyProvider, usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'

function TestComponent() {
  const { ready, authenticated, login, user } = usePrivy()
  const [testing, setTesting] = useState(false)

  const handleLogin = async () => {
    setTesting(true)
    try {
      await login()
    } catch (error) {
      console.error('Minimal test login failed:', error)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-white mb-2">Minimal Privy Test</h3>
      <p className="text-sm text-gray-300 mb-2">
        Ready: {ready ? '✅' : '❌'} | Auth: {authenticated ? '✅' : '❌'}
      </p>
      {user && (
        <p className="text-xs text-green-400 mb-2">
          User: {user.id}
        </p>
      )}
      <button
        onClick={handleLogin}
        disabled={testing || !ready}
        className="px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
      >
        {testing ? 'Testing...' : 'Minimal Login Test'}
      </button>
    </div>
  )
}

export default function MinimalPrivyTest() {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  if (!privyAppId) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
        <p className="text-red-400">No Privy App ID found</p>
      </div>
    )
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ['email'], // Start with just email
        appearance: { theme: 'dark' },
        embeddedWallets: { createOnLogin: 'off' },
        clientAnalyticsEnabled: false,
      }}
    >
      <TestComponent />
    </PrivyProvider>
  )
}