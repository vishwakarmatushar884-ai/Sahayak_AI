export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-stone-500">This page will be built in the next steps.</p>
    </div>
  )
}