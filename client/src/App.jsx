import { useState } from 'react'
import Waves from './reactbits/Waves'
import DecryptedText from './reactbits/DecryptedText'
import ShinyText from './reactbits/ShinyText'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || ''

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

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
      <div className="waves-bg">
        <Waves
          lineColor="rgba(79, 157, 255, 0.22)"
          backgroundColor="transparent"
          waveSpeedX={0.0125}
          waveSpeedY={0.006}
          waveAmpX={36}
          waveAmpY={18}
          friction={0.92}
          tension={0.008}
          maxCursorMove={110}
          xGap={22}
          yGap={34}
        />
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
        <h1 className="title">
          <DecryptedText
            text="Coming Soon"
            animateOn="view"
            sequential
            revealDirection="center"
            speed={35}
            className="char-revealed"
            encryptedClassName="char-encrypted"
          />
        </h1>
        <p className="subtitle">
          <ShinyText
            text="We're building something new. Leave your email and we'll let you know the moment it's live."
            speed={4}
            color="#9ca3af"
            shineColor="#f3f4f6"
          />
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
