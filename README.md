📝 NoteHub
<p align="center"> <b>Full-stack Notes Application built with Next.js App Router</b><br/> Authentication • Private Routes • SSR • Theme Toggle </p>
🚀 Tech Stack
<p align="center">












</p>
✨ Features
Feature	Description
🔐 Authentication	Login / Register with HTTP-only cookies
🛡 Private Routes	Middleware protection for /notes
📄 CRUD Notes	Create, edit, delete and filter notes
🔎 Filtering & Pagination	Dynamic routing with [...slug]
🌗 Theme Toggle	Global light / dark theme (Header + Sidebar)
🖼 Custom Background	notehub.jpg background
⚡ SSR	Server-side rendering via serverApi
🧠 Architecture Overview
📂 App Router Structure
app/
 ├── layout.tsx
 ├── page.tsx
 ├── notes/
 │    ├── layout.tsx
 │    ├── page.tsx
 │    ├── filter/[...slug]/page.tsx
 │    └── @sidebar/
 └── api/
🔄 Data Flow

serverApi → used for SSR data fetching

clientApi → used inside React components

TanStack Query → caching & mutations

HydrationBoundary → server → client sync

🔐 Authentication Flow

User logs in

Token stored in HTTP-only cookie

Middleware validates access

Unauthorized users are redirected to /login

🎨 UI & Theming

Global Theme Context

Header + Sidebar react to theme changes

Clean layout with CSS Modules

Background image: notehub.jpg

🖥 SSR Implementation

Notes are fetched on the server:

Data requested via serverApi

Dehydrated on server

Hydrated on client with HydrationBoundary

This improves performance and SEO readiness.

🛠 Installation
npm install
npm run dev

Production build:

npm run build
npm start
📌 Learning Goals Achieved

App Router architecture

SSR with React Query hydration

Middleware-based route protection

Separation of client/server API layers

State management with Context

Clean modular folder structure

📬 Future Improvements

Unit testing

UI animations

Role-based authorization

Docker deployment

If you want, I can now:

🔥 Upgrade it to a “portfolio-ready” recruiter version

📸 Add demo screenshots section

🌍 Add live demo & deploy badge block

📊 Add architecture diagram
