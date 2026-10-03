import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

// Comma-separated list of addresses that receive inquiry emails.
const NOTIFY_EMAILS = (process.env.CONTACT_TO_EMAIL || 'garvshrivastava2403@gmail.com')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean)
// Must be a sender verified in Brevo (Senders, Domains & Dedicated IPs),
// e.g. "Syphar <hello@syphar.net>".
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Syphar <hello@syphar.net>'

const BREVO_API_KEY = process.env.BREVO_API_KEY

function parseSender(value) {
  const match = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/)
  return match ? { name: match[1], email: match[2] } : { email: value.trim() }
}

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

  const cleanName = name.trim()
  const cleanEmail = email.trim()
  const cleanCompany = typeof company === 'string' ? company.trim() : ''
  const cleanMessage = message.trim()

  // Saving and emailing are independent: the visitor only sees an error if
  // BOTH fail, so a lead is never lost to a single misconfigured service.
  let saved = false
  if (uri) {
    try {
      const client = await getClient()
      await client.db('syphar').collection('inquiries').insertOne({
        name: cleanName,
        email: cleanEmail,
        company: cleanCompany,
        message: cleanMessage,
        createdAt: new Date(),
      })
      saved = true
    } catch (err) {
      console.error('contact save failed', err)
    }
  } else {
    console.error('MONGODB_URI is not set — inquiry not saved to the database')
  }

  let emailed = false
  if (BREVO_API_KEY) {
    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          sender: parseSender(FROM_EMAIL),
          to: NOTIFY_EMAILS.map((email) => ({ email })),
          replyTo: { email: cleanEmail, name: cleanName },
          subject: `New project inquiry from ${cleanName}`,
          textContent: [
            `Name: ${cleanName}`,
            `Email: ${cleanEmail}`,
            `Company: ${cleanCompany || '—'}`,
            '',
            cleanMessage,
          ].join('
'),
        }),
      })
      // Brevo reports rejections (unverified sender, bad key) as a non-2xx
      // response, not a thrown error.
      if (response.ok) emailed = true
      else console.error('contact email rejected by Brevo', response.status, await response.text())
    } catch (err) {
      console.error('contact email forward failed', err)
    }
  } else {
    console.error('BREVO_API_KEY is not set — inquiry not forwarded by email')
  }

  if (!saved && !emailed) {
    return res.status(500).json({ error: 'Failed to deliver your message.' })
  }

  return res.status(201).json({ message: 'Received' })
}
