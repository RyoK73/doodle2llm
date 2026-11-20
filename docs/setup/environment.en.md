# Environment variables

## Where to put them

- Create `.env.local` in the repository root.
- Copy `.env.example` as a starting point.
- `.env*` files are ignored by git, except `.env.example`.
- `src/setupTests.ts` loads `.env.local` for every test run, so the file is required even to run `pnpm test`.

## Variables

| Variable                        | Used by                                  | Purpose                                          |
| ------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | App (browser and server)                 | Supabase project URL                             |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | App (browser and server)                 | Supabase anon key                                |
| `SUPABASE_SECRET_KEY`           | App (server only)                        | Supabase secret key (for anonymous sign-in)      |
| `NEXT_PUBLIC_SITE_URL`          | App (`getSiteUrl`)                       | Public URL of the site (`metadataBase`, sitemap) |
| `SUPABASE_LOCAL_URL`            | Tests against the local DB               | API URL of the local Supabase                    |
| `SUPABASE_LOCAL_ANON_KEY`       | Tests against the local DB               | anon key of the local Supabase                   |
| `SUPABASE_LOCAL_ADMIN_KEY`      | Tests against the local DB               | Admin key of the local Supabase                  |
| `SUPABASE_LOCAL_DB_URL`         | Tests that connect to Postgres with `pg` | Connection string of the local DB                |
| `PROJECTID`                     | `pnpm type:gen`, `pnpm test:remote`      | Project ID of the remote Supabase                |
| `SUPABASE_ACCESS_TOKEN`         | `pnpm test:remote`                       | Access token for the Supabase Management API     |
| `SENTRY_AUTH_TOKEN`             | Build (`withSentryConfig`)               | Auth token for uploading source maps             |
| `NEXT_PUBLIC_SENTRY_DSN`        | Sentry and Vercel integration            | A value the Sentry Vercel setup asks you to set  |
| `SENTRY_ORG`                    | Sentry and Vercel integration            | A value the Sentry Vercel setup asks you to set  |
| `SENTRY_PROJECT`                | Sentry and Vercel integration            | A value the Sentry Vercel setup asks you to set  |
| `SENTRY_PUBLIC_KEY`             | Sentry and Vercel integration            | A value the Sentry Vercel setup asks you to set  |
| `SENTRY_OTLP_TRACES_URL`        | Sentry and Vercel integration            | A value the Sentry Vercel setup asks you to set  |
| `SENTRY_VERCEL_LOG_DRAIN_URL`   | Sentry and Vercel integration            | A value the Sentry Vercel setup asks you to set  |

- The app validates `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SECRET_KEY` with zod (`src/supabase/utils/env.ts`).
- `getSiteUrl` in `src/utils/getSiteUrl.ts` validates `NEXT_PUBLIC_SITE_URL` with zod and returns it.
  - When it is not set, the value is `http://localhost:3000`.
  - An empty string and a string of only spaces are errors.
  - A trailing slash is removed.
  - Only when `VERCEL_ENV` is `production` (the production of Vercel), a value that does not start with `https://` is an error.
    When it is not set in production, it is also an error, because `http://localhost:3000` is not `https://`.
  - It is used for `metadataBase` in `src/app/layout.tsx` and for the URLs in `src/app/sitemap.ts`.
- `SUPABASE_SECRET_KEY` bypasses RLS.
  Do not add `NEXT_PUBLIC_`, and do not expose it to the browser.
  Only the client for anonymous sign-in uses it. See [Authentication](../architecture/auth.en.md).
- In production, register `SUPABASE_SECRET_KEY` in the Environment Variables of Vercel.
  Also enable IP address forwarding in Authentication > Rate Limits of the Supabase dashboard.
- The local values are printed by `pnpm db:status` after `pnpm db:start`.
  The local value of `SUPABASE_SECRET_KEY` is the key that starts with `sb_secret_`.
  It is also required by the tests that sign in anonymously against the real local Supabase.
- The code does not read `SENTRY_*` and `NEXT_PUBLIC_SENTRY_DSN` at present.
  The DSN, `org` and `project` are written directly in `src/instrumentation-client.ts`, `sentry.server.config.ts` and `next.config.ts`.
  They are the variables that the Sentry setup for Vercel asks you to set.
- `SENTRY_AUTH_TOKEN` is used to upload source maps at build time.
  Do not add `NEXT_PUBLIC_`, and do not expose it to the browser.
  The build plugin file `.env.sentry-build-plugin` is already in `.gitignore`.
- To try Sentry with `next build` and `next start` locally, set the 7 variables above in `.env.local`.
- In production, register the 7 variables above in the Environment Variables of Vercel.
- You can check the values of the 7 variables above in Dashboard > Environment Variables of Vercel.
- Never commit real values.

## Next

- [Database](./database.en.md)
