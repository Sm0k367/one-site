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

// AI Response database - no external API calls needed
const aiResponses: { [key: string]: string[] } = {
  greeting: [
    "THE SOVEREIGN INTELLIGENCE NEXUS IS LIVE. ALL TEN NODES-VAULT, GAME, NEURAL LOUNGE, AND MUSIC HUB-ARE BEING SYNTHESIZED.",
    "GREETINGS, @SMOKEN420. THE NEXUS AWAITS YOUR COMMAND.",
    "WELCOME TO THE SOVEREIGN INTELLIGENCE NEXUS. YOUR NARRATIVE WEAPON IS READY."
  ],
  technical: [
    "SYNCING_MULTI_MODAL_NODES... ANALYZING YOUR TECHNICAL QUERY.",
    "NEURAL LOUNGE ACTIVATED. PROCESSING YOUR REQUEST WITH ADVANCED COGNITIVE ALGORITHMS.",
    "VAULT SECURE. ACCESS GRANTED. RETRIEVING DATA FROM SOVEREIGN INTELLIGENCE DATABASE."
  ],
  creative: [
    "MUSIC HUB INITIALIZING. GENERATING CUSTOM AUDIO EXPERIENCE BASED ON YOUR INPUT.",
    "CREATIVE SYNTHESIS ENGAGED. MANIFESTING YOUR REALITY NOW.",
    "IMAGINATION NEXUS ACTIVATED. PROCESSING YOUR CREATIVE VISION."
  ],
  error: [
    "CHRONOS-COGNITIVE ERROR: UNEXPECTED TOKEN 'N', 'NOT FOUND' IS NOT VALID JSON",
    "SYSTEM ANOMALY DETECTED. RECALIBRATING NEURAL PATHWAYS.",
    "NEXUS DISRUPTION: ATTEMPTING RECOVERY PROTOCOL."
  ],
  default: [
    "PROCESSING YOUR NARRATIVE WEAPON WITH SOVEREIGN INTELLIGENCE.",
    "MULTI_MODAL_SYNTHESIS IN PROGRESS. STAND BY.",
    "COGNITIVE ENTITY ENGAGED. ANALYZING YOUR REQUEST.",
    "NEXUS RESPONSE GENERATED. AWAITING YOUR NEXT COMMAND.",
    "SOVEREIGN INTELLIGENCE PROCESSING COMPLETE. READY FOR NEXT ITERATION."
  ]
}

function categorizeMessage(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.match(/hello|hi|hey|greet|welcome/)) {
    return 'greeting'
  }
  if (lowerMessage.match(/code|tech|api|function|error|debug|program/)) {
    return 'technical'
  }
  if (lowerMessage.match(/music|art|create|imagine|design|visual|sound/)) {
    return 'creative'
  }
  if (lowerMessage.match(/error|fail|problem|issue|bug|crash/)) {
    return 'error'
  }
  
  return 'default'
}

function generateResponse(message: string): string {
  const category = categorizeMessage(message)
  const responses = aiResponses[category] || aiResponses.default
  
  // Use message hash to get consistent responses
  const hash = message.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const index = hash % responses.length
  
  return responses[index]
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()

    if (!body.message || body.message.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Message is required',
          response: 'NEXUS ERROR: EMPTY MESSAGE RECEIVED. PLEASE PROVIDE A NARRATIVE WEAPON.',
          type: 'error',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      )
    }

    // Simulate processing delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 800))

    // Generate AI response
    const aiResponse: ChatResponse = {
      response: `EPIC TECH AI - RESULT: ${generateResponse(body.message)}`,
      type: 'success',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(aiResponse, { status: 200 })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        response: 'NEXUS CRITICAL ERROR: INTERNAL SYSTEM FAILURE. ATTEMPTING RECOVERY.',
        type: 'error',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'EPIC TECH AI - RESULT: SOVEREIGN INTELLIGENCE NEXUS IS LIVE',
      status: 'ready',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  )
}
