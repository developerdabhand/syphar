import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const subscribers = []

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/notify', (req, res) => {
  const { email } = req.body || {}
  const isValid = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!isValid) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }

  if (!subscribers.includes(email)) {
    subscribers.push(email)
  }

  res.status(201).json({ message: 'Subscribed' })
})

app.listen(PORT, () => {
  console.log(`Syphar server listening on port ${PORT}`)
})
