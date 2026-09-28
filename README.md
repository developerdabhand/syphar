# Syphar

Monorepo for the Syphar website — currently showing a "Coming Soon" page while the full product is built.

## Structure

- `client/` — React app (Vite), the public-facing site (Coming Soon page for now)
- `api/` — Vercel Serverless Function powering the "Notify Me" email signup, backed by Vercel KV
- `server/` — standalone Node/Express API, reserved for the full backend once the product needs one beyond the coming-soon form (not currently deployed)

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

Requires the `KV_REST_API_URL` / `KV_REST_API_TOKEN` env vars (see Deployment below) — `vercel dev` pulls these automatically once the project is linked and KV is connected.

## Deployment

- **Frontend + API**: deployed together on Vercel from the repo root (see `vercel.json`). The client calls `/api/notify` on the same origin, so no separate API URL is needed in production.
- **Storage**: subscriber emails are stored in a Vercel KV (Redis) set named `subscribers`. Enable it once per project: Vercel dashboard → project → **Storage** tab → **Create Database** → **KV** → connect to this project. Vercel injects the required env vars automatically; redeploy after connecting.
- **Sending launch emails**: not implemented yet — signups are only stored for now. When ready to notify subscribers, read the `subscribers` set from KV and send through an email provider (e.g. Resend, SendGrid).
- **Domain**: `syphar.net` domain DNS is managed on GoDaddy, pointed at Vercel.
