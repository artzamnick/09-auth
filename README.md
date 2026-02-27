# 📝 NoteHub

<p align="center">
  <strong>Full-stack Notes Application built with Next.js App Router</strong><br/>
  Authentication • Private Routes • SSR • Theme Toggle
</p>

---

## 🚀 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![TanStack Query](https://img.shields.io/badge/TanStack-Query-orange)
![Axios](https://img.shields.io/badge/Axios-HTTP-purple)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-green)

---

## ✨ Features

- 🔐 Authentication (Login / Register)
- 🛡 Middleware-based private routes
- 📝 Full CRUD operations for notes
- 🔎 Filtering & Pagination (`[...slug]`)
- 🌗 Global theme toggle (Header + Sidebar)
- 🖼 Custom background (`notehub.jpg`)
- ⚡ Server-side rendering via `serverApi`

---

## 🔐 Authentication Flow

1. User logs in  
2. Token stored in HTTP-only cookie  
3. Middleware validates access  
4. Unauthorized users are redirected to `/login`

---

## ⚡ SSR & Data Flow

- `serverApi` → used for SSR data fetching
- `clientApi` → used inside React components
- TanStack Query → caching & mutations
- `HydrationBoundary` → server → client synchronization

---

## 🎨 UI & Theming

- Global Theme Context
- Header + Sidebar react to theme changes
- CSS Modules for styling
- Background image: `notehub.jpg`

---

## 🛠 Installation

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

---

## 📌 What I Practiced

- App Router architecture
- SSR with React Query hydration
- Middleware-based route protection
- Client / Server API separation
- Context-based theme management
Client / Server API separation
Context-based theme management
