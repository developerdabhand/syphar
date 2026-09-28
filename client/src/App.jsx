import { useState, useMemo } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || ''

function useParticles(count) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: `${Math.random() * 100}%`,
        size: `${1.5 + Math.random() * 2.5}px`,
        duration: `${8 + Math.random() * 10}s`,
        delay: `${Math.random() * 10}s`,
        opacity: 0.3 + Math.random() * 0.4,
      })),
    [count],
  )
}

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const particles = useParticles(24)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('> submitting...')
    try {
      const res = await fetch(`${API_URL}/api/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus("> you're on the list — we'll email you at launch")
      setEmail('')
    } catch {
      setStatus('> connection failed — try again later')
    }
  }

  return (
    <div className="page">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid" />
      <div className="particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              '--x': p.x,
              '--s': p.size,
              '--d': p.duration,
              '--delay': p.delay,
              '--o': p.opacity,
            }}
          />
        ))}
      </div>
      <div className="scanlines" />

      <div className="card">
        <div className="tag">
          <span className="dot" />
          Building in progress
        </div>
        <div className="brand">
          Syphar<span className="cursor" />
        </div>
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
      </div>

      <div className="footer">&copy; {new Date().getFullYear()} Syphar. All rights reserved.</div>
    </div>
  )
}

export default App
