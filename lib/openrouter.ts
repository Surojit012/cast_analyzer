import { env } from './env'

export interface CastAnalysis {
  engagement: 'Low' | 'Medium' | 'High'
  bestTime: string
  rewrites: {
    concise: string
    engaging: string
    viral: string
  }
}

export async function analyzeCast(castText: string): Promise<CastAnalysis> {
  const apiKey = env.OPENROUTER_API_KEY
  
  if (!apiKey) {
    throw new Error('OpenRouter API key not configured')
  }

  const systemPrompt = `You are a Farcaster social analyst.

Analyze the following cast:
1. Predict engagement (Low / Medium / High).
2. Suggest the best posting time in UTC.
3. Rewrite the cast in three styles:
   - concise: Make it shorter and more direct
   - engaging: More interactive and community-focused
   - viral: Optimized for maximum reach and shareability

Use natural crypto-native language.
Avoid emojis unless they feel natural.
Keep responses short and skimmable.

Respond in this exact JSON format:
{
  "engagement": "Low|Medium|High",
  "bestTime": "Best time: X-Y AM/PM UTC",
  "rewrites": {
    "concise": "Shorter version",
    "engaging": "More engaging version",
    "viral": "Viral-style version"
  }
}`

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': env.NEXT_PUBLIC_SITE_URL,
        'X-Title': 'Cast Analyzer'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku', // Using a cheaper model for testing
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Cast to analyze: "${castText}"`
          }
        ],
        temperature: 0.7,
        max_tokens: 800 // Increased for longer responses
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenRouter API error:', response.status, errorData)
      
      // Provide specific error messages
      if (response.status === 401) {
        throw new Error('OpenRouter API key is invalid or account needs setup')
      } else if (response.status === 402) {
        throw new Error('OpenRouter account needs credits added')
      } else {
        throw new Error(`OpenRouter API error: ${response.status}`)
      }
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('No response content from OpenRouter')
    }

    // Parse the JSON response
    const analysis = JSON.parse(content)
    
    // Validate the response structure
    if (!analysis.engagement || !analysis.bestTime || !analysis.rewrites) {
      throw new Error('Invalid response structure from AI')
    }

    return analysis
  } catch (error) {
    console.error('Error analyzing cast:', error)
    
    // Enhanced fallback response with actual analysis logic
    const wordCount = castText.split(' ').length
    const hasHashtags = castText.includes('#')
    const hasEmojis = castText.includes('🚀') || castText.includes('🔥') || castText.includes('💎') || castText.includes('🌟')
    const hasQuestions = castText.includes('?')
    const hasUrls = castText.includes('http') || castText.includes('.com') || castText.includes('.eth')
    
    // More sophisticated engagement prediction
    let engagement: 'Low' | 'Medium' | 'High' = 'Medium'
    if (wordCount < 5) {
      engagement = 'Low'
    } else if (wordCount > 50 && (hasHashtags || hasEmojis || hasQuestions)) {
      engagement = 'High'
    } else if (hasHashtags || hasEmojis || hasQuestions || hasUrls) {
      engagement = 'High'
    }
    
    // Better fallback rewrites
    const conciseVersion = castText.length > 100 ? 
      castText.split('.')[0] + (castText.split('.').length > 1 ? '.' : '') : 
      castText
    
    const engagingVersion = hasQuestions ? castText : 
      castText + (hasEmojis ? '' : ' 🚀') + '\n\nWhat do you think?'
    
    const viralVersion = `${castText} ${hasHashtags ? '' : '#farcaster #crypto'}`
    
    return {
      engagement,
      bestTime: 'Best time: 9-11 AM UTC (peak Farcaster activity)',
      rewrites: {
        concise: conciseVersion,
        engaging: engagingVersion.slice(0, 300), // Keep it reasonable
        viral: viralVersion.slice(0, 300)
      }
    }
  }
}