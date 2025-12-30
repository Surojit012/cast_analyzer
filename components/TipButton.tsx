'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'
import LoginButton from './LoginButton'

export default function TipButton() {
  const { authenticated } = usePrivy()
  const [showTip, setShowTip] = useState(false)

  const handleTip = async () => {
    if (!authenticated) {
      return // LoginButton will handle the login flow
    }

    // Simple tip acknowledgment - wallet integration will be added later
    setShowTip(true)
    setTimeout(() => setShowTip(false), 3000)
  }

  return (
    <div className="text-center space-y-3">
      {!authenticated ? (
        <LoginButton showUserInfo={false} />
      ) : (
        <div className="space-y-2">
          <button
            onClick={handleTip}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors text-sm font-medium"
          >
            ☕ Tip Creator
          </button>
          <LoginButton showUserInfo={true} />
        </div>
      )}
      
      {showTip && (
        <div className="p-3 bg-green-900/20 border border-green-800 rounded-md text-green-400 text-sm">
          Thanks for the support! 🙏
          <br />
          <span className="text-xs text-green-500">
            Wallet integration coming soon
          </span>
        </div>
      )}
    </div>
  )
}