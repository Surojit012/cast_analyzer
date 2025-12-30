'use client'

import React from 'react'
import { usePrivy } from '@privy-io/react-auth'

interface LoginButtonProps {
  className?: string
  showUserInfo?: boolean
}

export default function LoginButton({ className = '', showUserInfo = false }: LoginButtonProps) {
  const { login, logout, authenticated, user, ready } = usePrivy()

  // Don't render until Privy is ready to avoid hydration issues
  if (!ready) {
    return (
      <div className={`animate-pulse bg-gray-700 rounded-md h-10 w-24 ${className}`} />
    )
  }

  const handleAuth = () => {
    if (authenticated) {
      logout()
    } else {
      login()
    }
  }

  const getUserDisplayName = () => {
    if (user?.farcaster?.displayName) {
      return user.farcaster.displayName
    }
    if (user?.email?.address) {
      return user.email.address.split('@')[0]
    }
    return 'User'
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleAuth}
        className={`px-4 py-2 rounded-md transition-colors font-medium ${
          authenticated
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        } ${className}`}
      >
        {authenticated ? 'Logout' : 'Login to Tip'}
      </button>
      
      {authenticated && showUserInfo && (
        <p className="text-xs text-gray-500">
          Connected as {getUserDisplayName()}
        </p>
      )}
    </div>
  )
}