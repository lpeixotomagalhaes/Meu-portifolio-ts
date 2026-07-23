# Render: set Root Directory to `backend`

Your GitHub repo root is the Next.js frontend. The API lives in the `backend/` folder.

## Dashboard settings

| Setting | Value |
|---------|--------|
| Root Directory | `backend` |
| Build Command | `npm install && npx prisma generate && npm run build` |
| Start Command | `npx prisma migrate deploy && npm start` |
| Health Check Path | `/health` |

## Env vars

Copy from `backend/.env.example`: `DATABASE_URL`, `DIRECT_URL`, `SUPABASE_URL`, `SUPABASE_JWT_SECRET`, `CORS_ORIGIN`.

`PORT` is injected by Render — do not hardcode it.
