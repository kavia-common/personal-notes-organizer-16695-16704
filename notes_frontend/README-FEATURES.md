# Personal Notes Organizer - Frontend

Features:
- User authentication (client-only, persisted in localStorage)
- Create, edit, delete notes
- Search notes (title and content)
- Organize notes by tags (create, rename, delete)
- Pin and archive
- Minimalistic light theme using provided colors:
  - Primary: #6366F1
  - Secondary: #2563EB
  - Accent: #F59E42

Run:
- npm install
- npm run dev
- Open http://localhost:3000

Notes:
- Data persists in localStorage per browser.
- Ready to integrate with backend by swapping lib/auth.ts and lib/notes.ts implementations.
