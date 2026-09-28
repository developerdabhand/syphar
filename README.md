# Syphar

Monorepo for the Syphar website — currently showing a "Coming Soon" page while the full product is built.

## Structure

- `client/` — React app (Vite), the public-facing site (Coming Soon page for now)
- `server/` — Node/Express API (currently powers the email notify-me form)

## Development

**Frontend**

```bash
cd client
npm install
npm run dev
```

**Backend**

```bash
cd server
npm install
npm run dev
```

The client reads the API base URL from `VITE_API_URL` (see `client/.env.example`). Leave it empty to call the same origin, or point it at the server during local development, e.g. `http://localhost:4000`.

## Deployment

- **Frontend**: deployed on Vercel, with Root Directory set to `client`.
- **Backend**: deploy separately (Vercel Serverless/Node hosting, Render, Railway, etc.) once the API is needed beyond the coming-soon form.
- **Domain**: `syphar.net` domain DNS is managed on GoDaddy, pointed at Vercel.
