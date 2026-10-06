import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Chat from './pages/Chat'
import Home from './pages/Home'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/topics" element={<Placeholder title="Topics" />} />
        <Route path="/profile" element={<Placeholder title="Profile" />} />
        <Route path="/admin" element={<Placeholder title="Admin dashboard" />} />
        <Route path="/login" element={<Placeholder title="Login" />} />
      </Route>
    </Routes>
  )
}