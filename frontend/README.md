# Inventory Frontend (Next.js)

Minimal Next.js (App Router) frontend to interact with the Inventory API.

## Setup

From the `frontend/` directory:

```bash
npm install
npm run dev
```

The frontend assumes the API server is running at `http://localhost:8000` (Django dev server).

Tips:
- Create a `.env.local` file (copy `.env.local.example`) to customize the API base URL with `NEXT_PUBLIC_API_BASE`.
- Make sure the Django dev server is running before opening the frontend — otherwise the UI will show a friendly error and Retry button.
- CORS is enabled in the Django project for development (`CORS_ALLOW_ALL_ORIGINS = True`).
- The app provides a simple list, add form, inline edit, and delete actions.
