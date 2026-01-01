'use client'

import { useState } from 'react'

export default function TestManifest() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testManifest = async () => {
    setLoading(true)
    try {
      const response = await fetch('/.well-known/farcaster.json')
      const contentType = response.headers.get('content-type')
      const text = await response.text()
      
      setResult(`
Status: ${response.status}
Content-Type: ${contentType}
Response:
${text}
      `)
    } catch (error) {
      setResult(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Farcaster Manifest Test</h1>
      <button
        onClick={testManifest}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Manifest'}
      </button>
      {result && (
        <pre className="mt-4 p-4 bg-gray-800 rounded text-sm overflow-auto">
          {result}
        </pre>
      )}
    </div>
  )
}