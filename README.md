boxMeter

Environment setup
- Create a `.env` file (or copy `.env.example` to `.env`). Fill in:
  - `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET` from your Shopify app.
  - `SHOPIFY_APP_URL` set to `https://boxmeter-production.up.railway.app:8080`.
  - `SCOPES` should match `shopify.app.toml` (currently `write_products`).
- For local/dev: `PORT=3000`, `FRONTEND_PORT=8002` are already set.
- Optional: `SHOP_CUSTOM_DOMAIN` if you use a custom shop domain.
- Optional: `DATABASE_URL` if you switch Prisma from sqlite to another DB.

Note: In production (Railway), set the same variables in your Railway project settings.
