# LKZ Backend (Express + Prisma)

REST API for the portfolio. Connects to Supabase Postgres and validates admin JWTs from Supabase Auth.

See the root [README](../README.md) for setup and Render deploy.

## Env

Copy `.env.example` → `.env` and fill all values.

## Scripts

```bash
npm run dev            # tsx watch on :4000
npm run build && npm start
npx prisma migrate deploy
npm run prisma:seed
```
