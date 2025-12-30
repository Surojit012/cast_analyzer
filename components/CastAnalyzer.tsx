'use client'

import { useState } from 'react'
import { CastAnalysis } from '@/lib/openrouter'

export default function CastAnalyzer() {
  const [castText, setCastText] = useState('')
  const [analysis, setAnalysis] = useState<CastAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'Low': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="w-full max-w-mobile mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Cast Analyzer</h1>
        <p className="text-gray-400 text-sm">
          Analyze and improve your Farcaster casts
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
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
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4">
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
    </div>
  )
}