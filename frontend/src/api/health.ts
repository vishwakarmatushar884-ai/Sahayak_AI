import { api } from './client'

export interface HealthResponse {
  status: string
  database: string
  vectorStore: string
}

export async function getHealth(): Promise<HealthResponse> {
  const { data } = await api.get<HealthResponse>('/api/health')
  return data
}