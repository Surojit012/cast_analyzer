'use client'

import { useState } from 'react'

interface CastAnalysis {
  engagement: 'Low' | 'Medium' | 'High'
  bestTime: string
  rewrites: {
    concise: string
    engaging: string
    viral: string
  }
}

export default function Home() {
  const [castText, setCastText] = useState('')
  const [analysis, setAnalysis] = useState<CastAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showTip, setShowTip] = useState(false)

  // Try to use Privy hooks if available
  let privyHooks: any = null
  let privyAvailable = false

  try {
    const { usePrivy } = require('@privy-io/react-auth')
    privyHooks = usePrivy()
    privyAvailable = true
    console.log('Privy hooks loaded successfully')
  } catch (error) {
    // Privy not available, continue without auth
    privyAvailable = false
    console.log('Privy hooks not available:', error)
  }

  const { login, logout, authenticated, user, ready } = privyHooks || {
    login: null,
    logout: null,
    authenticated: false,
    user: null,
    ready: true
  }

  console.log('Auth state:', { privyAvailable, authenticated, ready, user })

  const analyzeCast = async () => {
    if (!castText.trim()) {
      setError('Please enter a cast to analyze')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ castText }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const result = await response.json()
      setAnalysis(result)
    } catch (err) {
      setError('Failed to analyze cast. Please try again.')
      console.error('Analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTip = async () => {
    console.log('Tip button clicked', { privyAvailable, authenticated, login, ready })
    
    if (privyAvailable && !authenticated && login) {
      try {
        console.log('Attempting to login...')
        const result = await login()
        console.log('Login result:', result)
      } catch (error) {
        console.error('Login failed:', error)
        // Show a user-friendly error
        setError('Login failed. Please try refreshing the page.')
        setTimeout(() => setError(''), 3000)
      }
      return
    }
    
    console.log('Showing tip confirmation')
    setShowTip(true)
    setTimeout(() => setShowTip(false), 3000)
  }

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'Low': return 'text-red-400'
      default: return 'text-gray-400'
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
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8 max-w-mobile">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Cast Analyzer</h1>
          <p className="text-gray-400 text-sm">
            Analyze and improve your Farcaster casts
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-6">
          <label htmlFor="cast-input" className="block text-sm font-medium text-gray-300 mb-2">
            Paste your cast here:
          </label>
          <textarea
            id="cast-input"
            value={castText}
            onChange={(e) => setCastText(e.target.value)}
            placeholder="Enter your Farcaster cast..."
            className="w-full h-24 p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            maxLength={320}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {castText.length}/320 characters
            </span>
            <button
              onClick={analyzeCast}
              disabled={loading || !castText.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Analyzing...' : 'Analyze Cast'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-4 mb-8">
            {/* Engagement Prediction */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-2">Engagement Prediction</h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Level:</span>
                <span className={`font-bold ${getEngagementColor(analysis.engagement)}`}>
                  {analysis.engagement}
                </span>
              </div>
            </div>

            {/* Best Posting Time */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-2">Optimal Timing</h3>
              <p className="text-purple-400 font-medium">{analysis.bestTime}</p>
            </div>

            {/* Rewrite Suggestions */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-3">Rewrite Suggestions</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-1">Concise</h4>
                  <p className="text-gray-300 text-sm bg-gray-800 p-2 rounded border-l-2 border-blue-400">
                    {analysis.rewrites.concise}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-1">Engaging</h4>
                  <p className="text-gray-300 text-sm bg-gray-800 p-2 rounded border-l-2 border-green-400">
                    {analysis.rewrites.engaging}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-400 mb-1">Viral</h4>
                  <p className="text-gray-300 text-sm bg-gray-800 p-2 rounded border-l-2 border-red-400">
                    {analysis.rewrites.viral}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tip Section */}
        <div className="border-t border-gray-800 pt-6 mb-8">
          <div className="text-center space-y-3">
            <button
              onClick={handleTip}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors text-sm font-medium"
            >
              ☕ {privyAvailable && !authenticated ? 'Login to Tip' : 'Tip Creator'}
            </button>
            
            {privyAvailable && authenticated && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500">
                  Connected as {getUserDisplayName()}
                </p>
                <button
                  onClick={logout}
                  className="text-xs text-gray-400 hover:text-gray-300 underline"
                >
                  Logout
                </button>
              </div>
            )}
            
            {showTip && (
              <div className="p-3 bg-green-900/20 border border-green-800 rounded-md text-green-400 text-sm">
                Thanks for the support! 🙏
                <br />
                <span className="text-xs text-green-500">
                  {privyAvailable ? 'Wallet integration coming soon' : 'Get a valid Privy App ID for full authentication'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-600">
          <p>Built for Farcaster • Works everywhere</p>
        </footer>
      </div>
    </main>
  )
}