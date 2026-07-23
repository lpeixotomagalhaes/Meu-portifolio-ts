# LKZ Portfolio

Stack:

- **Frontend:** Next.js on [Vercel](https://vercel.com) (repo root)
- **Backend:** Express API on [Render](https://render.com) (`backend/`)
- **Data / Auth:** [Supabase](https://supabase.com) (PostgreSQL + Auth)

> GitHub repo root = frontend. API is the `backend/` subfolder.

```
Browser → Vercel (Next.js) → Render (Express + Prisma) → Supabase Postgres
Browser → Supabase Auth (admin login JWT)
```

## Local setup

### 1. Supabase

1. Create a project at https://supabase.com
2. **Settings → Database** — copy pooler → `DATABASE_URL`, direct → `DIRECT_URL`
3. **Settings → API** — URL, anon key, JWT secret
4. **Authentication → Users** — create admin email/password for `/login`

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate deploy
npm run prisma:seed
npm run dev
```

### 3. Frontend (repo root)

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Production — Render (critical)

Your failed deploy ran `frontend@0.1.0` / `next build` because **Root Directory was empty**.

| Setting | Value |
|---------|--------|
| **Root Directory** | `backend` |
| Build Command | `npm install && npx prisma generate && npm run build` |
| Start Command | `npx prisma migrate deploy && npm start` |
| Health Check Path | `/health` |

Env vars: `DATABASE_URL`, `DIRECT_URL`, `SUPABASE_URL`, `SUPABASE_JWT_SECRET`, `CORS_ORIGIN`.

Push the new `backend/` folder to GitHub first, then redeploy.
