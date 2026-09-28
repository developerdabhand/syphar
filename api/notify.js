import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}
  const isValid = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!isValid) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }

  await kv.sadd('subscribers', email)

  return res.status(201).json({ message: 'Subscribed' })
}
