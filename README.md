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

Run with the Vercel CLI so `/api/contact` works locally the same way it does in production:

```bash
npm install
npx vercel dev
```

Requires the `MONGODB_URI` and `BREVO_API_KEY` env vars (see Deployment below) — `vercel dev` pulls them automatically once the project is linked.

## Deployment

- **Frontend + API**: deployed together on Vercel from the repo root (see `vercel.json`). The client calls `/api/contact` on the same origin, so no separate API URL is needed in production.
- **Storage**: contact form submissions are stored in a MongoDB `inquiries` collection (database `syphar`). Connect via Vercel dashboard → project → **Storage** tab → **MongoDB Atlas** (or set `MONGODB_URI` manually under **Environment Variables** if using your own Atlas cluster). Redeploy after connecting/setting it.
- **Email forwarding**: every valid submission is also emailed via [Brevo](https://brevo.com) to the address(es) in `CONTACT_TO_EMAIL` (comma-separated, defaults to `garvshrivastava2403@gmail.com`). Set `BREVO_API_KEY` in Vercel (Project → Settings → Environment Variables) to enable it — without it, submissions are still saved to MongoDB, just not emailed (check the function logs for a warning). `syphar.net` is authenticated in Brevo (DKIM/DMARC records on GoDaddy); `CONTACT_FROM_EMAIL` must be a verified Brevo sender on that domain, e.g. `Syphar <noreply@syphar.net>`.
- **Domain**: `syphar.net` domain DNS is managed on GoDaddy, pointed at Vercel.
