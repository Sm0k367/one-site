'use client'
import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  content: string
  type: 'user' | 'ai' | 'system' | 'error'
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'S.I.N._V1.0_ACTIVE',
      type: 'system',
      timestamp: new Date()
    },
    {
      id: '2',
      content: 'EPIC TECH AI - RESULT: THE SOVEREIGN INTELLIGENCE NEXUS IS LIVE. ALL TEN NODES-VAULT, GAME, NEURAL LOUNGE, AND MUSIC HUB-ARE BEING SYNTHESIZED. AWAITING YOUR NARRATIVE WEAPON, @SMOKEN420.',
      type: 'ai',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call the API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          context: 'user_query'
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'NEXUS ERROR: NO RESPONSE GENERATED',
        type: data.type || 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: `SYSTEM ERROR: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        type: 'error',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatMessage = (message: Message) => {
    if (message.type === 'system') {
      return <span className="text-yellow-400">{message.content}</span>
    } else if (message.type === 'ai') {
      return <span className="text-cyan-400">{message.content}</span>
    } else if (message.type === 'error') {
      return <span className="text-red-400">{message.content}</span>
    } else {
      return <span className="text-green-400">{message.content}</span>
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white font-mono">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(message => (
          <div key={message.id} className="text-sm">
            {formatMessage(message)}
          </div>
        ))}
        {isLoading && (
          <div className="text-sm">
            <span className="text-cyan-400">EPIC TECH AI - RESULT: </span>
            <span className="inline-block">
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse mr-1"></span>
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse mr-1" style={{ animationDelay: '0.2s' }}></span>
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="border-t border-cyan-400 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="MANIFEST YOUR REALITY..."
            className="flex-1 bg-black text-green-400 border border-green-400 px-3 py-2 text-sm focus:outline-none focus:border-cyan-400 focus:text-cyan-400"
            autoFocus
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-cyan-400 text-black px-4 py-2 text-sm font-bold hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            EXECUTE
          </button>
        </form>
      </div>

      {/* Status Bar */}
      <div className="border-t border-cyan-400 p-2 text-xs text-gray-500 bg-black">
        <span className="text-purple-400">SYNCING_MULTI_MODAL_NODES...</span>
        <span className="ml-4 text-purple-400">SOVEREIGN_COGNITIVE_ENTITY_WQ...</span>
      </div>
    </div>
  )
}
