# Quickstart

1) Install dependencies
   npm install

2) Run development server
   npm run dev
   Open http://localhost:3000

3) Build for production
   npm run build
   npm start

Notes:
- No backend required. Data is saved in localStorage.
- To integrate with a backend, replace the implementations in:
  - src/lib/auth.ts
  - src/lib/notes.ts
  and use NEXT_PUBLIC_API_BASE_URL from .env.
