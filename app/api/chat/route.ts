import { NextRequest, NextResponse } from 'next/server'

interface ChatRequest {
  message: string
  context?: string
}

interface ChatResponse {
  response: string
  type: 'success' | 'error' | 'warning'
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()

    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Simulate AI processing with delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate AI response based on user input
    const aiResponse: ChatResponse = {
      response: `EPIC TECH AI - RESULT: ${generateResponse(body.message)}`,
      type: 'success',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(aiResponse)
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function generateResponse(message: string): string {
  const responses = [
    "THE SOVEREIGN INTELLIGENCE NEXUS IS LIVE. ALL TEN NODES-VAULT, GAME, NEURAL LOUNGE, AND MUSIC HUB-ARE BEING SYNTHESIZED.",
    "CHRONOS-COGNITIVE ERROR: UNEXPECTED TOKEN 'N', 'NOT FOUND' IS NOT VALID JSON",
    "SYNCING_MULTI_MODAL_NODES... ANALYZING YOUR NARRATIVE WEAPON.",
    "NEURAL LOUNGE ACTIVATED. PROCESSING YOUR REQUEST WITH ADVANCED COGNITIVE ALGORITHMS.",
    "VAULT SECURE. ACCESS GRANTED. RETRIEVING DATA FROM SOVEREIGN INTELLIGENCE DATABASE.",
    "MUSIC HUB INITIALIZING. GENERATING CUSTOM AUDIO EXPERIENCE BASED ON YOUR INPUT."
  ]

  // Simple hash function to get consistent responses
  const hash = message.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const index = hash % responses.length

  return responses[index]
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'EPIC TECH AI - RESULT: SOVEREIGN INTELLIGENCE NEXUS IS LIVE',
      status: 'ready'
    },
    { status: 200 }
  )
}
