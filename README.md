
<div align="center">

# 🤝 KindnessMeet — Client

### Connect people. Inspire kindness. Create community impact.

**A responsive community volunteering platform for discovering, organizing, and joining meaningful events.**

[🌐 Live Website](https://kindness-meet.vercel.app) · [💻 Client Repository](https://github.com/TanvirRahman888/kindness-meet-client) · [⚙️ Server Repository](https://github.com/TanvirRahman888/kindness-meet-server)

![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47a248?logo=mongodb)

</div>

---

## 📖 Overview

**KindnessMeet** brings event organizers and volunteers together in one place. Visitors can explore community initiatives, view event details, and discover opportunities to make a difference. Signed-in members can create events, join others' events, track participation, and manage their own events through a dashboard.

This repository contains the **Next.js frontend and Better Auth integration**. A separate Express/MongoDB service handles the event and volunteer REST APIs.

## ✨ Features

- **Responsive landing page:** Hero carousel, community statistics, upcoming events, category exploration, how-it-works content, FAQs, and calls to action.
- **Upcoming events:** Dynamic event cards with event information, search, and category filtering.
- **Event details:** Event description, organizer details, date/location, joined-volunteer list, and Join Event action.
- **Authentication:** Email/password registration and login, plus Google and GitHub OAuth through Better Auth.
- **Protected dashboard:** Overview, Create Event, Manage Events, Joined Events, and Profile pages.
- **Event management:** Create, edit, and delete your own events; event participation with authenticated JWT requests.
- **Volunteer tracking:** Check joined events and leave an event.
- **Editable user profile:** Update account details and profile image URL.
- **Light/dark themes:** Theme switching with `next-themes`.
- **UI experience:** HeroUI components, Tailwind CSS, Swiper, Lucide icons, loading placeholders, and SweetAlert2 feedback.
- **Past events showcase:** A static/illustrative portfolio carousel.
- **Newsletter and contact forms:** Frontend-only demos; no message or subscription API is connected.

## 🧰 Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 (App Router) | Routing, Server/Client Components, rendering |
| React 19 + TypeScript | Interactive UI and type safety |
| Tailwind CSS 4 | Responsive styling |
| HeroUI | Form fields and UI components |
| Better Auth | Sessions, email/password login, and OAuth |
| Better Auth JWT plugin + JOSE (server) | Signed tokens for the separate Express API |
| MongoDB adapter | Better Auth user/session persistence |
| Swiper | Homepage hero and carousel interfaces |
| SweetAlert2 | Success, error, and confirmation dialogs |
| next-themes | Light and dark themes |
| Lucide React + React Icons | Iconography |

## 🗺️ Application Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Homepage and featured community content |
| `/about` | Public | About KindnessMeet |
| `/contact` | Public | Contact information and demo contact form |
| `/upcoming-events` | Public | Browse, search, and filter upcoming events |
| `/upcoming-events/[id]` | Public | Individual event details; login required to join |
| `/login` | Public | Email/password and social login |
| `/register` | Public | Account registration |
| `/dashboard` | Authenticated | Dashboard overview |
| `/dashboard/create-event` | Authenticated | Create an event |
| `/dashboard/manage-events` | Authenticated | Update or delete owned events |
| `/dashboard/joined-events` | Authenticated | View joined events and leave an event |
| `/dashboard/profile` | Authenticated | Profile view and edit |

## 📁 Project Structure

```text
kindness-meet-client/
├── public/                       # Static assets and images
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/    # Better Auth route handler
│   │   ├── about/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   │   ├── create-event/
│   │   │   ├── joined-events/
│   │   │   ├── manage-events/
│   │   │   └── profile/
│   │   ├── login/
│   │   ├── register/
│   │   ├── upcoming-events/
│   │   │   └── [id]/
│   │   ├── lib/
│   │   │   ├── auth.ts           # Better Auth server configuration
│   │   │   └── auth-client.ts    # Browser authentication client
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── footer/
│   │   ├── home/
│   │   └── navbar/
│   └── proxy.ts                 # Authentication check for dashboard paths
├── next.config.ts
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm (a current Node.js LTS release is recommended)
- A MongoDB database, such as MongoDB Atlas
- The [KindnessMeet Express backend](https://github.com/TanvirRahman888/kindness-meet-server) running locally or deployed
- Google/GitHub OAuth credentials if you want to use social login

### 1. Clone the repository

```bash
git clone https://github.com/TanvirRahman888/kindness-meet-client.git
cd kindness-meet-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

```dotenv
# The origin where the Next.js app and Better Auth run
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-long-random-secret

# Better Auth MongoDB database
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER/

# Express REST API
NEXT_PUBLIC_API_URL=http://localhost:8000
API_URL=http://localhost:8000

# Social authentication
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

| Variable | Purpose |
| --- | --- |
| `BETTER_AUTH_URL` | **Frontend origin** hosting Better Auth (not the Express server) |
| `BETTER_AUTH_SECRET` | Server-only signing/encryption secret |
| `MONGODB_URI` | Connection string for Better Auth data |
| `NEXT_PUBLIC_API_URL` | Express API URL usable by browser components |
| `API_URL` | Express API URL for server-side requests |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials |

> Never commit `.env.local` or expose secrets through `NEXT_PUBLIC_` environment variables. `BETTER_AUTH_URL` must point to the frontend domain. The browser auth client can use `createAuthClient()` without a base URL when the auth endpoint is hosted on the same origin.

### 4. Start the development server

First ensure the backend is running at the configured API URL, then start the frontend:

```bash
npm run dev
```

Open **http://localhost:3000**.

### 5. Check the production build

```bash
npm run lint
npm run build
npm start
```

## 🔐 How Authentication Works

1. A visitor signs up or signs in using **Better Auth** (email/password, Google, or GitHub).
2. Better Auth creates an authenticated session and manages the session cookie.
3. For protected event operations, the app obtains a JWT from Better Auth (`/api/auth/token` or `auth.api.getToken()`).
4. The JWT is sent to Express as `Authorization: Bearer <token>`.
5. Express verifies the token using **JOSE** and Better Auth's `/api/auth/jwks` public keys.
6. The backend uses the verified user ID to apply event ownership and participation checks.

```text
Browser / Next.js
    │
    ├── Better Auth login ──► Session cookie
    │
    └── Request JWT ──► Express REST API
                           │
                           ├── Verify Bearer token via JWKS
                           └── Authorized MongoDB operation
```

Dashboard pages are protected by the project's `src/proxy.ts` session check; protected server-rendered dashboard content also checks the session. Backend API security is enforced separately by the Express server.

## 🔌 Backend API Integration

The frontend interacts with the [KindnessMeet server](https://github.com/TanvirRahman888/kindness-meet-server) through endpoints such as:

| Method | Endpoint | Used for | Auth |
| --- | --- | --- | --- |
| `GET` | `/api/categories` | Browse event categories | Public |
| `GET` | `/api/events` | Upcoming event lists and cards | Public |
| `GET` | `/api/events/:id` | Event details | Public |
| `GET` | `/api/events/:id/volunteers` | Joined volunteers | Public |
| `POST` | `/api/events` | Create event | JWT |
| `POST` | `/api/events/:id/join` | Join event | JWT |
| `GET` | `/api/my-events` | My created events | JWT |
| `PATCH` | `/api/events/:id` | Update owned event | JWT |
| `DELETE` | `/api/events/:id` | Delete owned event | JWT |
| `GET` | `/api/my-joined-events` | My joined events | JWT |
| `DELETE` | `/api/my-joined-events/:id` | Leave event | JWT |

The homepage displays **up to six upcoming events** and dynamically computes counts by category. The client requests `/api/events?limit=6`; database-level limiting requires support in the deployed backend.

## ☁️ Deploy to Vercel

1. Import this repository into a new [Vercel](https://vercel.com/new) project.
2. Keep the **Next.js** framework preset.
3. Set the Production environment variables:

   ```dotenv
   BETTER_AUTH_URL=https://kindness-meet.vercel.app
   BETTER_AUTH_SECRET=your-production-secret
   MONGODB_URI=your-production-mongodb-connection-string
   NEXT_PUBLIC_API_URL=https://kindness-meet-server.vercel.app
   API_URL=https://kindness-meet-server.vercel.app
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

4. Ensure the **backend** uses `CLIENT_URL=https://kindness-meet.vercel.app` for JWT verification.
5. Configure the OAuth apps with the matching production callback URLs:

   ```text
   https://kindness-meet.vercel.app/api/auth/callback/google
   https://kindness-meet.vercel.app/api/auth/callback/github
   ```

6. Deploy and test registration, login, event creation, joining, editing, and deleting.
7. After changing environment variables, **redeploy** the Vercel project. Public (`NEXT_PUBLIC_`) values are incorporated into browser bundles at build time.

### Production troubleshooting

- **`Invalid origin` during login:** Check that `BETTER_AUTH_URL` points to the **frontend** and that Better Auth trusts the actual browser origin; check OAuth callback settings separately.
- **Browser asks for local-network access:** Make sure `NEXT_PUBLIC_API_URL` does not reference `localhost` in production.
- **JWT verification returns `401`:** Confirm the backend `CLIENT_URL` matches the Better Auth issuer/audience and that `/api/auth/jwks` is accessible.
- **Server Component fetching fails on build:** With the project's `cacheComponents` configuration, uncached data may need an explicit request-time boundary and an accompanying Suspense fallback.
- **Events do not load:** Verify the deployed backend URL, MongoDB connectivity, and Network tab errors.

## 📝 Implementation Notes

- The **contact form** and **newsletter subscription** currently provide frontend-only interactions; they do not save data or send email.
- The **past events** showcase uses static data, not a database query.
- Event and volunteer information is loaded from the separate Express backend.
- The JWT plugin supports protected API calls; the browser login session and individual Bearer JWT lifetimes are separate concepts.

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production server |
| `npm run lint` | Run ESLint |

## 🔗 Links

- **Live Site:** https://kindness-meet.vercel.app
- **Client Repository:** https://github.com/TanvirRahman888/kindness-meet-client
- **Server Repository:** https://github.com/TanvirRahman888/kindness-meet-server
- **Next.js:** https://nextjs.org/docs
- **Better Auth:** https://www.better-auth.com/docs

---

<div align="center">

**Built with ❤️ for stronger, kinder communities.**

</div>
