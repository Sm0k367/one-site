export interface ChatRequest {
  message: string
  context?: string
}

export interface ChatResponse {
  response: string
  type: 'success' | 'error' | 'warning'
  timestamp: string
}

export interface Message {
  id: string
  content: string
  type: 'user' | 'ai' | 'system' | 'error'
  timestamp: Date
}
