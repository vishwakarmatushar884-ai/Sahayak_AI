import { api } from './client'
import type { Language, Source } from '../types'

export interface ChatRequest {
  conversationId?: number
  message: string
  language: Language
}

export interface ChatResponse {
  conversationId: number
  message: string
  language: Language
  sources: Source[]
}

export async function sendChat(request: ChatRequest): Promise<ChatResponse> {
  const { data } = await api.post<ChatResponse>('/api/chat', request)
  return data
}