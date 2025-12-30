'use client'

import { useState } from 'react'

export default function SimplePrivyTest() {
  const [testResult, setTestResult] = useState('')
  const [testing, setTesting] = useState(false)

  const testPrivyAppId = async () => {
    setTesting(true)
    setTestResult('')
    
    const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
    
    try {
      // Test if we can at least reach Privy's domain
      const response = await fetch('https://auth.privy.io/health', {
        method: 'GET',
        mode: 'cors',
      })
      
      if (response.ok) {
        setTestResult(`✅ Privy service is reachable. App ID: ${appId}`)
      } else {
        setTestResult(`⚠️ Privy service returned: ${response.status}. App ID: ${appId}`)
      }
    } catch (error) {
      setTestResult(`❌ Cannot reach Privy service: ${error.message}. App ID: ${appId}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
      <h3 className="text-white font-medium mb-2">Simple Privy Test</h3>
      <button
        onClick={testPrivyAppId}
        disabled={testing}
        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {testing ? '🔄 Testing...' : 'Test Privy Connection'}
      </button>
      {testResult && (
        <p className="mt-2 text-sm text-gray-300">{testResult}</p>
      )}
    </div>
  )
}