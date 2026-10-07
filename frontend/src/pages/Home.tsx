import { Link } from 'react-router-dom'
import BackendStatus from '../components/BackendStatus'

const features = [
  ['Ask in English or हिन्दी', 'Write in simple words and get answers in your chosen language.'],
  ['Answers with sources', 'Every answer shows the document and page it came from.'],
  ['Honest about gaps', 'If the documents do not cover it, the assistant says so.'],
  ['Guidance on procedures', 'Membership, documents, schemes and grievances.'],
]

const examples = [
  'How can I become a member of a cooperative society?',
  'What documents are required for cooperative membership?',
  'What are the rights of cooperative members?',
  'सहकारी समिति का सदस्य कैसे बन सकते हैं?',
]

export default function Home() {
  return (
    <>
      <section className="rounded-2xl border border-green-200 bg-green-50 px-6 py-10 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Sahayak AI</h1>
        <p className="mx-auto mt-3 max-w-xl text-stone-600">
          सहायक AI · A multilingual assistant that helps you understand cooperative societies,
          government schemes, member rights and procedures, using verified documents.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Link to="/chat" className="rounded-lg bg-green-700 px-5 py-2.5 font-bold text-white hover:bg-green-800">
            Start Chat
          </Link>
          <Link to="/topics" className="rounded-lg border-2 border-green-700 px-5 py-2.5 font-bold text-green-700">
            Browse topics
          </Link>
        </div>
        <div className="mt-4">
          <BackendStatus />
        </div>
      </section>

      <p className="my-5 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm">
        <b>Independent informational assistant</b>, not a government website. Not legal advice.
      </p>

      <h2 className="mb-3 mt-8 text-xl font-bold">What you can do</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(([title, text]) => (
          <div key={title} className="rounded-xl border border-stone-200 bg-white p-4">
            <h3 className="font-bold">{title}</h3>
            <p className="mt-1 text-sm text-stone-500">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-xl font-bold">Example questions</h2>
      <div className="flex flex-wrap gap-2">
        {examples.map((q) => (
          <span key={q} className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm">
            {q}
          </span>
        ))}
      </div>
    </>
  )
}