import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { sendChat } from '../api/chat'
import { errorMessage } from '../api/client'
import MessageBubble from '../components/MessageBubble'
import { notice, suggestions, ui } from '../i18n'
import type { ChatMessage, Conversation, Language } from '../types'

export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([{ id: 1, title: 'New chat', messages: [] }])
  const [activeId, setActiveId] = useState(1)
  const [lang, setLang] = useState<Language>('en')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastQuestion, setLastQuestion] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const nextId = useRef(100)
  const bottomRef = useRef<HTMLDivElement>(null)

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0]
  const t = ui[lang]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [active.messages.length, loading, error])

  function updateConversation(id: number, change: (c: Conversation) => Conversation) {
    setConversations((list) => list.map((c) => (c.id === id ? change(c) : c)))
  }

  async function ask(question: string, alreadyShown = false) {
    if (loading) return
    const convId = active.id
    const backendId = active.backendId
    setError(null)
    setLastQuestion(question)
    if (!alreadyShown) {
      const userMessage: ChatMessage = { id: nextId.current++, role: 'user', content: question }
      updateConversation(convId, (c) => ({
        ...c,
        title: c.messages.length === 0 ? question.slice(0, 30) : c.title,
        messages: [...c.messages, userMessage],
      }))
    }
    setInput('')
    setLoading(true)
    try {
      const response = await sendChat({ conversationId: backendId, message: question, language: lang })
      const reply: ChatMessage = {
        id: nextId.current++,
        role: 'assistant',
        content: response.message,
        sources: response.sources,
      }
      updateConversation(convId, (c) => ({ ...c, backendId: response.conversationId, messages: [...c.messages, reply] }))
      setLastQuestion(null)
    } catch (e) {
      setError(errorMessage(e))
    } finally {
      setLoading(false)
    }
  }

  function send(text: string) {
    const question = text.trim()
    if (question) void ask(question)
  }

  function newChat() {
    const id = nextId.current++
    setConversations((list) => [{ id, title: 'New chat', messages: [] }, ...list])
    setActiveId(id)
    setError(null)
    setSidebarOpen(false)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        className="mb-2 rounded-lg border-2 border-green-700 px-3 py-1.5 font-semibold text-green-700 md:hidden"
      >
        ☰ Conversations
      </button>
      <div className="grid h-[calc(100dvh-9rem)] min-h-[460px] gap-4 md:grid-cols-[260px_1fr]">
        <aside
          className={`${sidebarOpen ? 'absolute left-0 right-0 z-10 max-h-[55vh] shadow-lg' : 'hidden'} overflow-y-auto rounded-xl border border-stone-200 bg-white p-3 md:static md:block md:max-h-none md:shadow-none`}
        >
          <button onClick={newChat} className="w-full rounded-lg bg-green-700 px-3 py-2 font-bold text-white hover:bg-green-800">
            {t.newChat}
          </button>
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveId(c.id)
                setError(null)
                setSidebarOpen(false)
              }}
              className={`mt-1 block w-full truncate rounded-lg px-3 py-2 text-left ${c.id === active.id ? 'bg-green-100' : 'hover:bg-green-50'}`}
            >
              {c.title}
            </button>
          ))}
        </aside>

        <section className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-stone-200 bg-white">
          <p className="m-3 mb-0 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm">{notice[lang]}</p>
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {active.messages.length === 0 && <p className="m-auto text-center text-stone-500">{t.empty}</p>}
            {active.messages.map((m) => (
              <MessageBubble key={m.id} message={m} lang={lang} />
            ))}
            {loading && (
              <div className="self-start rounded-2xl bg-green-50 px-4 py-3 text-stone-500" aria-label="Thinking">
                ● ● ●
              </div>
            )}
            {error && (
              <div role="alert" className="self-start rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
                {lastQuestion && (
                  <button onClick={() => void ask(lastQuestion, true)} className="ml-3 font-bold underline">
                    {t.retry}
                  </button>
                )}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="px-3 pb-1">
            {suggestions[lang].map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="m-1 rounded-full border border-stone-300 px-3 py-1 text-sm hover:border-green-700"
              >
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-stone-200 p-3">
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="rounded-lg border border-stone-300 bg-white px-2"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              aria-label="Question"
              className="min-w-0 flex-1 rounded-lg border border-stone-300 px-3 py-2"
            />
            <button className="rounded-lg bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-800 disabled:opacity-50" disabled={loading}>
              {t.send}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}