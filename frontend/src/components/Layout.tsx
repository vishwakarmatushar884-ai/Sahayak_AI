import { NavLink, Outlet } from 'react-router-dom'

const links = [
  ['/', 'Home'],
  ['/chat', 'Chat'],
  ['/topics', 'Topics'],
  ['/profile', 'Profile'],
  ['/admin', 'Admin'],
  ['/login', 'Login'],
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-stone-200 bg-white px-4 py-3">
        <NavLink to="/" className="whitespace-nowrap text-lg font-bold">
          🌾 Sahayak AI
        </NavLink>
        <nav className="flex flex-1 gap-1 overflow-x-auto">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-2 font-semibold ${
                  isActive ? 'bg-green-100 text-green-800' : 'text-stone-500 hover:bg-green-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}