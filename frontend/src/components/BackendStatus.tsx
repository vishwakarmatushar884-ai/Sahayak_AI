import { useEffect, useState } from 'react'
import { getHealth } from '../api/health'
import type { HealthResponse } from '../api/health'

type State = { kind: 'loading' } | { kind: 'down' } | { kind: 'ok'; health: HealthResponse }

export default function BackendStatus() {
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    let cancelled = false
    getHealth()
      .then((health) => !cancelled && setState({ kind: 'ok', health }))
      .catch(() => !cancelled && setState({ kind: 'down' }))
    return () => {
      cancelled = true
    }
  }, [])

  const text =
    state.kind === 'loading'
      ? 'Checking backend…'
      : state.kind === 'down'
        ? 'Backend not reachable'
        : `Backend ${state.health.status} · Database ${state.health.database}`
  const color =
    state.kind === 'ok' && state.health.status === 'UP'
      ? 'bg-green-100 text-green-800'
      : state.kind === 'loading'
        ? 'bg-stone-100 text-stone-600'
        : 'bg-red-100 text-red-800'

  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${color}`}>{text}</span>
}