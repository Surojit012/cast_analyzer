'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useEffect, useState } from 'react'

export default function PrivyTest() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const [loginAttempting, setLoginAttempting] = useState(false)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    console.log('Privy Test Component - State:', {
      ready,
      authenticated,
      user: user ? {
        id: user.id,
        email: user.email?.address,
        farcaster: user.farcaster?.displayName,
      } : null,
    })
  }, [ready, authenticated, user])

  const handleTestLogin = async () => {
    setLoginAttempting(true)
    setLoginError('')
    
    try {
      console.log('🔄 Starting test login...')
      const result = await login()
      console.log('✅ Test login successful:', result)
    } catch (error) {
      console.error('❌ Test login failed:', error)
      setLoginError(error.message || 'Login failed')
    } finally {
      setLoginAttempting(false)
    }
  }

  if (!ready) {
    return (
      <div className="p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
        <p className="text-yellow-400 text-sm">🔄 Privy initializing...</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
      <h3 className="text-blue-400 font-medium mb-2">Privy Status</h3>
      <div className="space-y-1 text-sm">
        <p className="text-gray-300">
          Ready: <span className="text-green-400">{ready ? '✅' : '❌'}</span>
        </p>
        <p className="text-gray-300">
          Authenticated: <span className={authenticated ? 'text-green-400' : 'text-red-400'}>
            {authenticated ? '✅' : '❌'}
          </span>
        </p>
        {user && (
          <div className="mt-2 p-2 bg-gray-800 rounded text-xs">
            <p>User ID: {user.id}</p>
            {user.email && <p>Email: {user.email.address}</p>}
            {user.farcaster && <p>Farcaster: {user.farcaster.displayName}</p>}
          </div>
        )}
        {loginError && (
          <p className="text-red-400 text-xs mt-2">Error: {loginError}</p>
        )}
        <div className="mt-3 space-x-2">
          {!authenticated ? (
            <button
              onClick={handleTestLogin}
              disabled={loginAttempting}
              className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50"
            >
              {loginAttempting ? '🔄 Testing...' : 'Test Login'}
            </button>
          ) : (
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}