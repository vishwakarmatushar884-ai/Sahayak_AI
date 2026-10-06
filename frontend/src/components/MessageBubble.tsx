import type { ChatMessage, Language } from '../types'
import { ui } from '../i18n'

export default function MessageBubble({ message, lang }: { message: ChatMessage; lang: Language }) {
  if (message.role === 'user') {
    return (
      <div className="max-w-[85%] self-end whitespace-pre-wrap rounded-2xl bg-green-700 px-4 py-2.5 text-white sm:max-w-[75%]">
        {message.content}
      </div>
    )
  }
  return (
    <div className="max-w-[92%] self-start rounded-2xl bg-green-50 px-4 py-2.5 sm:max-w-[80%]">
      <p className="whitespace-pre-wrap">{message.content}</p>
      {message.sources && message.sources.length > 0 && (
        <div className="mt-3 border-t border-dashed border-stone-300 pt-2 text-sm">
          <b>{ui[lang].sources}</b>
          {message.sources.map((s, i) => (
            <div key={`${s.documentName}-${s.page}-${i}`} className="mt-1">
              📄 {s.documentName}
              {s.isDemo && (
                <span className="ml-2 rounded border border-amber-400 bg-amber-50 px-1.5 text-xs font-bold">
                  DEMO – NOT OFFICIAL
                </span>
              )}
              <div className="text-stone-500">
                {s.page !== null && <span>Page {s.page}</span>}
                {s.page !== null && s.section && <span> · </span>}
                {s.section && <span>{s.section}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 flex gap-1">
        <button aria-label="Helpful" className="rounded border border-stone-200 px-2 hover:bg-white">👍</button>
        <button aria-label="Not helpful" className="rounded border border-stone-200 px-2 hover:bg-white">👎</button>
      </div>
    </div>
  )
}