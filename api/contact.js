import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

const MAX_LENGTH = {
  name: 100,
  email: 254,
  company: 200,
  message: 5000,
}

// Bots that fill the site's forms almost always submit faster than a human can
// read the fields, and fill hidden inputs a human never sees. Both checks are
// silent (the caller still gets a success response) so a bot doesn't learn to
// route around them.
const MIN_SUBMIT_MS = 1500

function getClient() {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  return global._mongoClientPromise
}

function withinLength(value, max) {
  return typeof value === 'string' && value.length <= max
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, message, website, startedAt } = req.body || {}

  const isSpam =
    (typeof website === 'string' && website.trim().length > 0) ||
    (typeof startedAt === 'number' && Date.now() - startedAt < MIN_SUBMIT_MS)

  const isValidEmail =
    typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && withinLength(email, MAX_LENGTH.email)
  const isValidName = withinLength(name, MAX_LENGTH.name) && name.trim().length > 0
  const isValidMessage = withinLength(message, MAX_LENGTH.message) && message.trim().length > 0
  const isValidCompany = company === undefined || company === '' || withinLength(company, MAX_LENGTH.company)

  if (!isValidEmail || !isValidName || !isValidMessage || !isValidCompany) {
    return res.status(400).json({ error: 'Name, a valid email, and a message are required.' })
  }

  if (isSpam) {
    return res.status(201).json({ message: 'Received' })
  }

  if (!uri) {
    console.error('MONGODB_URI is not set')
    return res.status(500).json({ error: 'Server is not configured.' })
  }

  try {
    const client = await getClient()
    const db = client.db('syphar')
    await db.collection('inquiries').insertOne({
      name: name.trim(),
      email: email.trim(),
      company: typeof company === 'string' ? company.trim() : '',
      message: message.trim(),
      createdAt: new Date(),
    })
    return res.status(201).json({ message: 'Received' })
  } catch (err) {
    console.error('contact error', err)
    return res.status(500).json({ error: 'Failed to save your message.' })
  }
}
