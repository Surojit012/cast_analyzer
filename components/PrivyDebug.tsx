'use client'

import { useEffect, useState } from 'react'

export default function PrivyDebug() {
  const [privyStatus, setPrivyStatus] = useState<any>({})

  useEffect(() => {
    const checkPrivyStatus = async () => {
      const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
      
      try {
        // Try to fetch Privy app info
        const response = await fetch(`https://auth.privy.io/api/v1/apps/${appId}/config`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        const data = await response.json()
        setPrivyStatus({
          appId,
          status: response.status,
          data: data,
          error: null,
        })
      } catch (error) {
        setPrivyStatus({
          appId,
          status: 'error',
          data: null,
          error: error.message,
        })
      }
    }

    checkPrivyStatus()
  }, [])

  return (
    <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
      <h3 className="text-white font-medium mb-2">Privy App Status</h3>
      <div className="text-sm space-y-1">
        <p className="text-gray-300">
          App ID: <span className="text-blue-400">{privyStatus.appId}</span>
        </p>
        <p className="text-gray-300">
          Status: <span className={privyStatus.status === 200 ? 'text-green-400' : 'text-red-400'}>
            {privyStatus.status}
          </span>
        </p>
        {privyStatus.error && (
          <p className="text-red-400">Error: {privyStatus.error}</p>
        )}
        {privyStatus.data && (
          <pre className="text-xs text-gray-400 bg-gray-800 p-2 rounded mt-2 overflow-auto">
            {JSON.stringify(privyStatus.data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}