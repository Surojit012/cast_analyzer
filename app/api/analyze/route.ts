import { NextRequest, NextResponse } from 'next/server'
import { analyzeCast } from '@/lib/openrouter'

export async function POST(request: NextRequest) {
  try {
    const { castText } = await request.json()

    if (!castText || typeof castText !== 'string') {
      return NextResponse.json(
        { error: 'Cast text is required' },
        { status: 400 }
      )
    }

    if (castText.length > 320) {
      return NextResponse.json(
        { error: 'Cast text too long (max 320 characters)' },
        { status: 400 }
      )
    }

    if (castText.trim().length < 5) {
      return NextResponse.json(
        { error: 'Cast text too short (min 5 characters)' },
        { status: 400 }
      )
    }

    const analysis = await analyzeCast(castText.trim())
    
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis API error:', error)
    
    // Return a more specific error message for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Analysis failed',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}