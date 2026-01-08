# Watchly API

Lightweight Express + Prisma API for Watchly (movies & TV shows catalog).

## Requirements
- Node.js (14+)
- npm
- SQLite (used by Prisma datasource)

## Install

Install dependencies:

```bash
npm install
```

Generate the Prisma client (run after changing `prisma/schema.prisma`):

```bash
npx prisma generate
```

## Database migrations

Create or apply migrations (development):

```bash
npx prisma migrate dev --name init
```

Reset the database (destructive):

```bash
npx prisma migrate reset
```

Open a local GUI for the database:

```bash
npx prisma studio
```

## Environment variables

All runtime configuration should be provided via a `.env` file at the project root.

Copy the example file and edit values:

```bash
cp .env.example .env
```

Minimum recommended variables (place these in `.env`):

- `PORT` (default: `3000`)
- `NODE_ENV` (`development` or `production`)
- `DATABASE_URL` (Prisma datasource URL, e.g. `file:./dev.db`)
- `ACCESS_TOKEN_SECRET` (JWT secret)
- `REFRESH_TOKEN_SECRET` (refresh JWT secret)
- `REFRESH_TOKEN_EXPIRES_IN` (e.g. `7d`, `15m`; default `7d`)

Optional (used by seed script):

- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`

Example seeding (create admin user):

```powershell
npm run seed
```

## Run

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API (overview)

Base path: `/api/v1`

- Auth: `/api/v1/auth`
	- `POST /register` — register new user
	- `POST /login` — returns `accessToken` and sets `refreshToken` cookie
	- `POST /refresh` — rotate refresh token, returns new access token
	- `POST /logout` — revoke refresh token

- Movies: `/api/v1/movies`
- TV Shows: `/api/v1/tv-shows`
- Platforms: `/api/v1/platforms`
- Users: `/api/v1/users`
- Comments: `/api/v1/comments`
- FAQs: `/api/v1/faqs`
- Catalog: `/api/v1/catalog` — combined movies + tv shows

- Docs: `/` redirects to `/api-docs` (Swagger UI) when the server is running

List endpoints accept pagination query params: `?page=` and `?perPage=` (default `perPage=20`).

Responses for paginated list endpoints include:

- `page`, `perPage`, `total`, `totalPages`, `hasMore`, `items`

The `/api/v1/catalog` endpoint returns a merged, time-sorted list with the same pagination metadata; items include a `__type` field (`movie` or `tv_show`).

## Auth notes

- Passwords are stored hashed with bcrypt.
- Access tokens are JWTs signed with `ACCESS_TOKEN_SECRET` and are short lived.
- Refresh tokens are signed JWTs stored as an HttpOnly cookie (path `/auth`) and persisted hashed in the `refresh_tokens` table; tokens are rotated on refresh.

## Development tips

- After changing `prisma/schema.prisma`, run:

```bash
npx prisma migrate dev --name <desc>
npx prisma generate
```

- Use `npx prisma studio` to inspect DB records (users, refresh_tokens, etc.).