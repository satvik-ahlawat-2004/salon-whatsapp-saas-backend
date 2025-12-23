# Micro-SaaS Salon Management Backend

Backend for a salon-focused micro-SaaS with authentication, multi-tenant appointment management, WhatsApp notification stubs, and dashboard metrics. Built for quick onboarding and local development.

## Tech Stack
- Node.js + Express
- TypeScript
- Prisma ORM + PostgreSQL
- JWT-based auth
- Vitest for tests

## Requirements
- Node.js 20+
- PostgreSQL instance (local or remote)
- npm

## Setup
1. Install dependencies
   - `cd code`
   - `npm install`
2. Configure environment
   - Copy `env.example` to `.env`
   - Update `DATABASE_URL`, `JWT_SECRET`, and WhatsApp tokens if needed
3. Database migrations
   - `npx prisma migrate dev` (or `npm run prisma:dev`)
4. Seed sample data (optional)
   - `npm run db:seed`
5. Start development server
   - `npm run dev`
6. Run tests
   - `npm test`

## Folder Structure (key)
- `code/` – backend source
  - `src/` – Express app, routes, controllers, services, middleware, utils
  - `prisma/` – Prisma schema and seed script
  - `tests/` – automated tests (Vitest)
- `zensalon-pro---management-dashboard/` – React UI prototype (mock data)
- `phase*`, `ideas*`, `comp. report/` – research and planning docs

## Branch Strategy
- `main` – production-ready
- `develop` – ongoing work
- Feature branches should be created from `develop`

## Notes
- No deployment configuration included yet.

