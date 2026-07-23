# LKZ Frontend (Next.js)

Public site + admin UI. Talks to the Express API and uses Supabase Auth for `/login`.

See the root [README](../README.md) for full setup and deploy steps.

## Env

Copy `.env.example` → `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL` (local: `http://localhost:4000`)

## Scripts

```bash
npm run dev
npm run build
npm start
```
