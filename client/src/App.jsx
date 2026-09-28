import { useState } from 'react'
import Waves from './reactbits/Waves'
import DecryptedText from './reactbits/DecryptedText'
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
      setStatus("You're on the list — we'll email you at launch.")
      setEmail('')
    } catch {
      setStatus("Couldn't reach the server. Try again later.")
    }
  }

  return (
    <div className="page">
      <div className="waves-bg">
        <Waves
          lineColor="rgba(255, 255, 255, 0.09)"
          backgroundColor="transparent"
          waveSpeedX={0.011}
          waveSpeedY={0.005}
          waveAmpX={30}
          waveAmpY={14}
          friction={0.92}
          tension={0.008}
          maxCursorMove={100}
          xGap={24}
          yGap={36}
        />
      </div>

      <div className="content">
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
          We&rsquo;re building something new. Leave your email and we&rsquo;ll let you know the moment it&rsquo;s live.
        </p>
        <form className="notify" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Notify me</button>
        </form>
        <div className="status">{status}</div>
      </div>

      <div className="footer">&copy; {new Date().getFullYear()} Syphar. All rights reserved.</div>
    </div>
  )
}

export default App
