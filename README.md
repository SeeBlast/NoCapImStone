# FeedMe Client Refactor — Apply Guide

This folder mirrors the repo structure. Copy each file into the same
location in your repo, overwriting if it already exists.

---

## 🚨 Step 0 — Rotate your Supabase anon key (do this FIRST)

Your old anon key is committed in `assets/js/config.js` on GitHub.
Rotate it before doing anything else:

1. Go to **Supabase Dashboard → Project Settings → API**
2. Find the `anon` / `public` key and click **Reset**
3. Copy the new key
4. Open `feedme_client/assets/js/config.js` and replace
   `PASTE_YOUR_ROTATED_ANON_KEY_HERE` with your new key
5. Commit + push the whole refactor after that

---

## Files to COPY INTO your repo (overwrite existing)

```
index.html                               ← replaces root landing
assets/css/style.css                     ← NEW unified stylesheet (replaces old)
assets/js/config.js                      ← updated, put your new key here
assets/js/cart.js                        ← NEW
assets/js/utils/money.js                 ← NEW
assets/js/services/auth.js               ← NEW (replaces old assets/js/auth.js)
assets/js/services/restaurants.js        ← NEW
assets/js/services/orders.js             ← NEW
assets/js/pages/home.js                  ← NEW
assets/js/pages/menu.js                  ← NEW
assets/js/pages/checkout.js              ← NEW
assets/js/pages/admin.js                 ← NEW
auth/login.html                          ← replaces
auth/register.html                       ← replaces
views/customer/home.html                 ← replaces
views/customer/menu.html                 ← NEW
views/customer/checkout.html             ← NEW
views/restaurant/dashboard.html          ← replaces
```

## Files to DELETE from your repo

These are the old mock-data/duplicate codebase. Delete them:

```
login.html                       ← root-level, sessionStorage-based
menu.html                        ← root-level, uses window.restaurants
checkout.html                    ← root-level, fake order placement
js/app.js                        ← hardcoded mock data
css/style.css                    ← merged into assets/css/style.css
js/                              ← whole folder (only contained app.js)
css/                             ← whole folder (only contained style.css)
assets/js/customer.js            ← replaced by services + pages/home.js
assets/js/scrypt.js              ← replaced by services + pages/menu.js
assets/js/auth.js                ← replaced by services/auth.js
views/customer/restaurants.html  ← replaced by views/customer/menu.html
```

---

## Quick test checklist (after copying + key rotation + push)

1. Open `index.html` → should show landing page with hero.
2. Click **Log In** → `auth/login.html` loads.
3. Sign in with a seeded customer: `alice1@feedme.test` / `password123`.
4. Lands on `views/customer/home.html`. You should see 30 restaurants
   with cuisine filters.
5. Click any restaurant → menu loads with 6 items.
6. Add items → cart sidebar fills, totals compute.
7. Click **Proceed to Checkout** → fill address, click **Place Order**.
8. Success modal shows an order number from the database.
9. In another browser, sign in as `owner1@feedme.test` / `password123`.
10. Dashboard loads — your new order should appear in realtime.
11. Click **Accept** → status flips to `accepted`. Customer's modal updates live.

---

## What's in each layer

- **`assets/js/config.js`** — single Supabase client. Nothing else
  imports `createClient`.
- **`assets/js/services/*`** — data access. Returns plain objects/arrays,
  throws on error, no DOM code.
- **`assets/js/cart.js`** — pub/sub cart store. Persists in `sessionStorage`,
  enforces one-restaurant-at-a-time.
- **`assets/js/pages/*`** — page controllers. Call services, render to DOM,
  wire event listeners. One file per page.
- **`views/*` and `auth/*`** — HTML shells. Each imports exactly one
  page controller via `<script type="module">`.

## How mutations work

- **Customers read** restaurants/menus via the service layer (public-read RLS).
- **Placing an order** goes through the `place_order` RPC — the server
  recomputes the total from current prices and checks it against what the
  client expected. If they differ, `place_order` returns `price_changed` and
  `checkout.js` asks the user to re-confirm.
- **Order status transitions** go through `update_order_status` RPC, which
  verifies the caller owns the restaurant.
- **Realtime subscriptions** in `orders.js` let the restaurant dashboard
  react to new orders instantly, and let the customer's success modal
  update as the order progresses.

## Known limitations

- The register flow creates a profile with whatever `role` the user picks.
  For a real product, restaurant-owner accounts should go through a
  separate approval flow, not self-serve.
- "Card details" on checkout are cosmetic — nothing is validated or charged.
  This would integrate with Stripe or similar in production.
- No password reset flow. Add `supabase.auth.resetPasswordForEmail` when ready.