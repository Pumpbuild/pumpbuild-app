# PumpBuild

A Next.js app for PumpBuild, backed by Supabase (database + auth), ready to deploy on Vercel with your own domain.

## What this replaces

The earlier prototype ran entirely inside a Claude artifact using a Claude-only
storage API (`window.storage`), which only works inside Claude's environment.
This version uses:

- **Supabase Postgres** — stores builders (the leaderboard) and applications
- **Supabase Auth** — real, server-verified login for the admin panel
  (the old prototype's admin login was a client-side password check with the
  password visible in the page source — this version fixes that)

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. In the project dashboard, go to **SQL Editor > New query**, paste the contents
   of `supabase/schema.sql`, and run it. This creates the `builders` and
   `applications` tables with the correct access rules (Row Level Security):
   - Anyone can read the leaderboard.
   - Anyone can submit an application.
   - Only a logged-in admin can add, edit, or delete builders, or read applications.
3. (Optional) Run `supabase/seed.sql` the same way if you want to start with the
   same example builders from the prototype. Skip this if you'd rather start
   empty and add real builders through `/admin`.
4. Go to **Settings > API** and copy:
   - **Project URL**
   - **anon public** key

## 2. Create your admin login

Supabase Auth logs in with an email + password (not a plain username), so:

1. Go to **Authentication > Users** in your Supabase dashboard.
2. Click **Add user > Create new user**.
3. Use an email like `lorenzogustavo@pumpbuild.app` (or your real email) and
   set the password to `lorenzogustavo_2424` (or change it to whatever you want).
4. That's it — this is the email/password you'll use at `/admin/login`.

You can add more admin users the same way later, or remove/rotate this one
at any time from the same screen.

## 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in the two values from step 1:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

## 4. Run it locally

```
npm install
npm run dev
```

Visit `http://localhost:3000`. Admin lives at `http://localhost:3000/admin`
(you'll be redirected to `/admin/login` if you're not signed in).

## 5. Deploy to Vercel with your own domain

1. Push this project to a GitHub repo.
2. In [Vercel](https://vercel.com), click **New Project** and import the repo.
3. In the project's **Settings > Environment Variables**, add the same two
   variables from step 3 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Deploy.
5. In **Settings > Domains**, add your own domain and follow Vercel's DNS
   instructions (usually a CNAME or A record at your domain registrar).

That's it — the site, the leaderboard, the admin panel, and the login are all
live on your domain at that point.

## Project structure

```
app/
  layout.js                  Root layout (fonts/CSS only)
  (site)/                    Public site — wrapped in Nav + Footer
    layout.js
    page.js                  Landing page
    leaderboard/page.js
    builders/[id]/page.js    Individual builder profile
    apply/page.js            Public application form
    privacy/page.js
    terms/page.js
    contact/page.js
  admin/                     Admin section — its own layout, no public Nav/Footer
    layout.js
    login/page.js            Real Supabase Auth login
    page.js                  Protected dashboard (add/edit/delete builders)
middleware.js                 Protects /admin routes server-side
components/                   Shared UI (cards, nav, footer, forms, icons)
data/faq.js                   FAQ content
lib/
  supabaseClient.js            Browser Supabase client
  supabaseServer.js            Server Supabase client
supabase/
  schema.sql                   Run once in Supabase's SQL editor
  seed.sql                      Optional example data
```

## Notes and things worth doing before this handles real money

- **Row Level Security is doing the real security work.** The policies in
  `schema.sql` are what actually stop a random visitor from writing to the
  `builders` table — the admin UI itself is just a convenience layer on top.
  Don't change those policies without understanding what they block.
- **The founder-token legal framing matters.** The Terms of Service page
  includes language stating these tokens are not equity/investment. That
  reflects product decisions made during development, not legal advice — get
  an actual lawyer to review that section specifically before this goes live
  with real money involved, especially the founder/startup side.
- **pump.fun/Solana integration is not wired up.** The site describes token
  launches and fee routing, but there's no real on-chain integration here —
  "claimed" amounts are just numbers in the database until that's built.
- **Consider rate-limiting or a CAPTCHA on the Apply form** before going
  public, since it's an open `insert` policy.
