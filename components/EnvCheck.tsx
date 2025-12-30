'use client'

import React, { useEffect, useState } from 'react'
import { validateClientEnv } from '@/lib/env'

export default function EnvCheck({ children }: { children: React.ReactNode }) {
  const [envValid, setEnvValid] = useState<boolean | null>(null)

  useEffect(() => {
    setEnvValid(validateClientEnv())
  }, [])

  // Show loading state while checking
  if (envValid === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Show warning if environment is not properly configured
  if (!envValid) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-6 max-w-mobile w-full text-center">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">Configuration Required</h2>
          <p className="text-yellow-300 mb-4 text-sm">
            The app is missing required environment variables. 
            Authentication features may not work properly.
          </p>
          <p className="text-xs text-yellow-500">
            Check the deployment guide for setup instructions.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}