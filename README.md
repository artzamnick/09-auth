📝 NoteHub
<p align="center"> <strong>Full-stack Notes Application built with Next.js App Router</strong><br/> Authentication • Private Routes • SSR • Theme Toggle </p>

🚀 Tech Stack
<p align="left"> <img src="https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs" /> <img src="https://img.shields.io/badge/React-18-blue?logo=react" /> <img src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript" /> <img src="https://img.shields.io/badge/TanStack-Query-orange" /> <img src="https://img.shields.io/badge/Axios-HTTP-purple" /> <img src="https://img.shields.io/badge/CSS-Modules-green" /> </p>
✨ Features

🔐 Authentication (Login / Register)
🛡 Middleware-based Private Routes
📄 CRUD operations for Notes
🔎 Filtering & Pagination ([...slug])
🌗 Global Theme Toggle (Header + Sidebar)
🖼 Custom Background (notehub.jpg)
⚡ Server-Side Rendering via serverApi

🔐 Authentication Flow
User logs in
Token stored in HTTP-only cookie
Middleware validates access
Unauthorized users are redirected to /login

⚡ SSR & Data Flow
serverApi → used for SSR
clientApi → used inside components
TanStack Query → caching & mutations
HydrationBoundary → server → client sync

🎨 UI & Theming
Global Theme Context
Header + Sidebar react to theme changes
CSS Modules for styling
Background image: notehub.jpg

🛠 Installation
npm install
npm run dev

Production:
npm run build
npm start

📌 What I Practiced
App Router architecture
SSR with React Query hydration
Middleware-based route protection
Client / Server API separation
Context-based theme management
