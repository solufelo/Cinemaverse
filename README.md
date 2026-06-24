# CinemaVerse

Barebones gamer-style social film logger. Search TMDB, post watch status, browse the squad feed.

**Live:** [cinemaverse-solo.netlify.app](https://cinemaverse-solo.netlify.app)

## Stack

- Vite + React + Tailwind
- TMDB via Netlify Function (`TMDB_API_KEY`)
- Auth + feed: localStorage demo mode, or Supabase for production shared feed

## Features

- Hero landing + responsive navbar (Sign In / Sign Up)
- TMDB trending + search
- Log status: watching, completed, queued, dropped
- Social feed + player profile

## Local dev

```bash
npm install
cp .env.example .env
# Add VITE_TMDB_API_KEY for local TMDB (get one at themoviedb.org)
npm run dev
```

## Netlify deploy

1. Connect repo to Netlify
2. **Framework preset:** None (or Vite) — **not** Next.js
3. Build: `npm run build` · Publish: `dist`
4. If deploy still picks Next.js: Site settings → Build & deploy → **Clear build cache**, then redeploy
5. Env vars:
   - `TMDB_API_KEY` — required for movie data
   - `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` — optional, enables shared auth/feed

Without Supabase, sign-up works in-browser (demo mode) — great for portfolio preview; add Supabase for real multi-user feed.

## Supabase setup (optional)

Run `supabase/schema.sql` in the SQL editor, then disable email confirmation under Authentication → Providers → Email for fastest onboarding.

## Scope

Intentionally minimal: film status logging + sharing only. No payments, AI, or TV episode tracking in this prototype.
