import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
  timeout: 60000,
})

// Attach the login token (added in the authentication phase) when present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'Cannot reach the server. Please check that the backend is running.'
    const message = (error.response.data as { message?: string } | undefined)?.message
    return message ?? `Request failed (status ${error.response.status}).`
  }
  return 'Something went wrong. Please try again.'
}