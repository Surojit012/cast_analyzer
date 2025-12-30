// Simple Farcaster environment detection
// The SDK will be added when we have proper documentation

export function initializeFarcasterSDK() {
  try {
    // For now, just log that we're in a Farcaster environment
    console.log('Farcaster environment detected')
    return true
  } catch (error) {
    console.log('Not running in Farcaster environment:', error)
    return false
  }
}

export function isFarcasterEnvironment(): boolean {
  try {
    return typeof window !== 'undefined' && 
           window.parent !== window && 
           window.location !== window.parent.location
  } catch {
    return false
  }
}