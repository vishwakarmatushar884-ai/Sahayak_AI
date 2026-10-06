export type Language = 'en' | 'hi'

// Matches the backend source DTO. Missing values stay null, never invented.
export interface Source {
  documentId: number | null
  documentName: string
  page: number | null
  section: string | null
  sourceUrl: string | null
  isDemo?: boolean
}

export interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
}

export interface Conversation {
  id: number // local id used by the UI
  backendId?: number // set once the backend creates the conversation
  title: string
  messages: ChatMessage[]
}