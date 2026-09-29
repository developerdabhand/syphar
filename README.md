# Syphar

Monorepo for the Syphar website — a technology partner site for European businesses (software, AI, cloud, and digital transformation).

## Structure

- `client/` — React + TypeScript app (Vite, Tailwind CSS), the public-facing site
- `api/` — Vercel Serverless Function powering the "Start a conversation" contact form, backed by MongoDB
- `server/` — standalone Node/Express API, reserved for the full backend once the product needs one beyond the contact form (not currently deployed)

## Development

**Frontend**

```bash
cd client
npm install
npm run dev
```

**API (serverless function)**

Run with the Vercel CLI so `/api/notify` works locally the same way it does in production:

```bash
npm install
npx vercel dev
```

Requires the `MONGODB_URI` env var (see Deployment below) — `vercel dev` pulls it automatically once the project is linked and MongoDB is connected.

## Deployment

- **Frontend + API**: deployed together on Vercel from the repo root (see `vercel.json`). The client calls `/api/contact` on the same origin, so no separate API URL is needed in production.
- **Storage**: contact form submissions are stored in a MongoDB `inquiries` collection (database `syphar`). Connect via Vercel dashboard → project → **Storage** tab → **MongoDB Atlas** (or set `MONGODB_URI` manually under **Environment Variables** if using your own Atlas cluster). Redeploy after connecting/setting it.
- **Following up on inquiries**: not automated yet — submissions are only stored for now. Read the `inquiries` collection to follow up, or wire it to an email provider (e.g. Resend, SendGrid) later.
- **Domain**: `syphar.net` domain DNS is managed on GoDaddy, pointed at Vercel.
