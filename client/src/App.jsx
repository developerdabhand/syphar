import { useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || ''

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('Submitting...')
    try {
      const res = await fetch(`${API_URL}/api/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus("You're on the list. We'll email you at launch.")
      setEmail('')
    } catch {
      setStatus("Couldn't reach the server. Try again later.")
    }
  }

  return (
    <div className="page">
      <div className="glow" />
      <div className="brand">Sypher</div>
      <h1 className="title">Coming Soon</h1>
      <p className="subtitle">
        We're building something new. Leave your email and we'll let you know the moment it's live.
      </p>
      <form className="notify" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Notify Me</button>
      </form>
      <div className="status">{status}</div>
      <div className="footer">&copy; {new Date().getFullYear()} Sypher. All rights reserved.</div>
    </div>
  )
}

export default App
