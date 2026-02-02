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
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    setError(null)

    try {
      // Call the API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          context: 'user_query'
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'No response received',
        type: data.type || 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: `SYSTEM ERROR: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        type: 'error',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      setError(error instanceof Error ? error.message : 'Unknown error')
      setIsTyping(false)
      console.error('Chat error:', error)
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
    <div className="flex flex-col h-screen">
      <div className="terminal-content flex-1 overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className="terminal-message">
            {formatMessage(message)}
          </div>
        ))}
        {isTyping && (
          <div className="terminal-message">
            <span className="text-cyan-400">EPIC TECH AI - RESULT: </span>
            <span className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        )}
        {error && (
          <div className="terminal-message">
            <span className="text-red-400">ERROR: {error}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="terminal-input-container">
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="MANIFEST YOUR REALITY..."
            className="terminal-input flex-1"
            autoFocus
            disabled={isTyping}
          />
          <button
            type="submit"
            className="terminal-button"
            disabled={isTyping}
          >
            EXECUTE
          </button>
        </form>
      </div>

      <div className="p-2 text-xs text-gray-500">
        <span className="text-purple-400">SYNCING_MULTI_MODAL_NODES...</span>
        <span className="ml-4 text-purple-400">SOVEREIGN_COGNITIVE_ENTITY_WQ...</span>
      </div>
    </div>
  )
}
