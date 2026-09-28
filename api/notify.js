import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

function getClient() {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  return global._mongoClientPromise
}

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

  if (!uri) {
    console.error('MONGODB_URI is not set')
    return res.status(500).json({ error: 'Server is not configured.' })
  }

  try {
    const client = await getClient()
    const db = client.db('syphar')
    await db.collection('subscribers').updateOne(
      { email },
      { $setOnInsert: { email, createdAt: new Date() } },
      { upsert: true },
    )
    return res.status(201).json({ message: 'Subscribed' })
  } catch (err) {
    console.error('notify error', err)
    return res.status(500).json({ error: 'Failed to save subscription.' })
  }
}
