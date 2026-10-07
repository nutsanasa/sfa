# Openlab — Creative Technology Agency

A premium digital presence for a creative technology studio: **React, Vite, TypeScript, Tailwind CSS, shadcn/ui, and Supabase**.

The brand sits between a design studio and a development company. Copy, case studies, and team names are placeholders. Swap them in `src/config` and `src/content`.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui (Nova / Radix)
- React Router
- Supabase (`@supabase/supabase-js`) for contact inquiries

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Customize the studio

| What | Where |
| --- | --- |
| Name, nav, email, social | `src/config/site.ts` |
| Case studies | `src/content/work.ts` |
| Services, engagements, FAQ | `src/content/services.ts` |
| Manifesto, process, team, testimonials, technologies | `src/content/studio.ts` |
| Color, type, motion | `src/index.css` |

## Supabase

The contact form writes to `public.inquiries`. The site works without Supabase; submissions only persist after you connect a project.

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env.local`.
3. Paste the project URL and **publishable** key (`sb_publishable_...`). Legacy `anon` keys still work as `VITE_SUPABASE_ANON_KEY`.
4. Run `supabase/migrations/20261006120000_create_inquiries.sql` in the SQL editor.

Row Level Security is on. The public client can **insert** inquiries only. Read them in the Dashboard, or with a secret key on a server — never put a secret key in this Vite app.

## Routes

- `/` Home
- `/work` Project index
- `/work/:slug` Case study
- `/services` Capabilities
- `/studio` and `/about` Studio
- `/contact` Inquiry form

## Notes

- The site is framed in a light editorial canvas (rounded window on a stone ground).
- Work covers are generated SVGs so you do not need stock photography to start.
- shadcn components live in `src/components/ui`. Add more with `npx shadcn@latest add <name>`.
