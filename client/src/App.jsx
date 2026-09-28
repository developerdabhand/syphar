import { useState } from 'react'
import LetterGlitch from './reactbits/LetterGlitch'
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
      <div className="letter-glitch">
        <LetterGlitch
          glitchColors={['#14213a', '#1f3a5f', '#2f6690', '#35e6c1']}
          glitchSpeed={70}
          centerVignette
          outerVignette
          smooth
          backgroundColor="transparent"
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
