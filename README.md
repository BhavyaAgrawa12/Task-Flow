# TaskFlow

TaskFlow is a full-stack task management app with Kanban boards, analytics, AI-powered task suggestions, and a dark glass UI. The frontend is a React SPA; the backend is a REST API backed by MongoDB.

---

## Tech stack

| Layer | Technologies |
|-------|----------------|
| **Frontend** | React 19, Vite, React Router, Tailwind CSS v4, Framer Motion, Recharts, Radix UI, Axios |
| **Backend** | Node.js, Express 5, MongoDB, Mongoose, JWT, bcrypt, Google Gemini AI |
| **Deploy** | [Vercel](https://vercel.com) (frontend) · [Render](https://render.com) (backend) · [MongoDB Atlas](https://www.mongodb.com/atlas) (database) |

---

## Project structure

```
Task-Flow/
├── backend/                 # Express API → deploy on Render
│   ├── server.js            # Entry point
│   ├── src/
│   │   ├── app.js           # Express app + CORS + routes
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth + validation
│   │   ├── models/          # Mongoose schemas (User, Board, Task)
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic + AI
│   │   └── validators/      # Request validation
│   ├── .env.example
│   └── package.json
│
├── frontend/                # React SPA → deploy on Vercel
│   ├── src/
│   │   ├── api/             # Axios API clients
│   │   ├── components/      # UI components
│   │   ├── context/         # Auth + theme
│   │   ├── hooks/           # Data hooks
│   │   ├── layouts/         # App + auth layouts
│   │   ├── pages/           # Route pages
│   │   └── utils/           # Helpers
│   ├── vercel.json          # SPA routing for Vercel
│   ├── jsconfig.json        # Path aliases (@/)
│   ├── .env.example
│   └── package.json
│
├── render.yaml              # Render blueprint (optional)
├── .gitignore
└── README.md
```

---

## Features

- **Auth** — Register, login, JWT sessions
- **Dashboard** — Stats, charts, recent activity
- **Boards** — Create and manage project boards
- **Kanban** — Drag-and-drop tasks (Todo / In Progress / Done)
- **Tasks** — Global task list with search and filters
- **Analytics** — Status breakdown, productivity, overdue tasks
- **AI suggestions** — Gemini-powered effort/date hints when creating tasks
- **Profile** — User info, theme toggle (dark/light)
- **Command palette** — `Ctrl+K` / `Cmd+K` quick search
- **Responsive** — Mobile bottom nav, collapsible sidebar

---

## Prerequisites

- **Node.js** 18 or newer
- **npm**
- **MongoDB Atlas** account (free tier works)
- **Google AI Studio** API key (for AI features)

---

## Local development

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/Task-Flow.git
cd Task-Flow

cd backend && npm install
cd ../frontend && npm install
```

### 2. Backend environment

Copy the example file and fill in your values:

```bash
cd backend
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `Mongo_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Random secret for signing tokens |
| `GEMINI_API_KEY` | Google Gemini API key |
| `PORT` | Default `5000` |

Start the API:

```bash
npm run dev
```

API runs at **http://localhost:5000**

### 3. Frontend environment

```bash
cd frontend
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | `http://localhost:5000` |

Start the app:

```bash
npm run dev
```

App runs at **http://localhost:5173** (or the next free port Vite picks).

---

## API overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/health` | API status |
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/boards` | List boards |
| POST | `/api/boards` | Create board |
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| POST | `/api/ai/suggest` | AI task suggestion |

Protected routes require `Authorization: Bearer <token>`.

---

## Git setup

Initialize Git at the **project root** (not inside `backend/` or `frontend/`):

```bash
cd Task-Flow
git init
git add .
git status
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Task-Flow.git
git push -u origin main
```

### What is ignored (`.gitignore`)

| Ignored | Why |
|---------|-----|
| `node_modules/` | Reinstalled on each machine / deploy |
| `frontend/dist/` | Built during Vercel deploy |
| `.env` | Secrets — never commit |
| `.vercel/`, `.render/` | Local deploy CLI folders |
| `.agents/`, `.cursor/` | Local IDE tooling |

Safe to commit: source code, `package.json`, `.env.example`, `vercel.json`, `render.yaml`.

Verify env files are ignored:

```bash
git check-ignore -v backend/.env frontend/.env
```

---

## Deploy to Render (backend)

### Option A — Blueprint (recommended)

1. Push the repo to GitHub.
2. In [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**.
3. Connect the repo — Render reads `render.yaml`.
4. Set secret env vars when prompted:
   - `Mongo_URI`
   - `GEMINI_API_KEY`
   - `CLIENT_URL` → your Vercel URL (e.g. `https://taskflow.vercel.app`)

### Option B — Manual web service

| Setting | Value |
|---------|--------|
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Runtime** | Node 18+ |

**Environment variables on Render:**

| Key | Value |
|-----|--------|
| `Mongo_URI` | Atlas connection string |
| `JWT_SECRET` | Long random string |
| `GEMINI_API_KEY` | Google AI key |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | Your Vercel frontend URL |

Copy the Render URL (e.g. `https://taskflow-api.onrender.com`).

> **Note:** Render free tier services sleep after inactivity. The first request after sleep may take 30–60 seconds.

---

## Deploy to Vercel (frontend)

1. Push the repo to GitHub.
2. In [Vercel Dashboard](https://vercel.com) → **Add New Project** → import the repo.
3. Configure:

| Setting | Value |
|---------|--------|
| **Root Directory** | `frontend` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

4. Add environment variable:

| Key | Value |
|-----|--------|
| `VITE_API_URL` | Your Render backend URL (no trailing slash) |

5. Deploy.

`frontend/vercel.json` handles SPA routing so paths like `/dashboard` work on refresh.

After Vercel deploys, update Render’s `CLIENT_URL` to your Vercel URL if you set CORS restrictions.

---

## MongoDB Atlas setup

1. Create a free **M0 cluster**.
2. **Database Access** → create a user with password.
3. **Network Access** → add `0.0.0.0/0` (allow from anywhere) for Render.
4. **Connect** → copy the connection string → replace `<password>` and set the database name (e.g. `taskflow`).
5. Paste into Render as `Mongo_URI`.

---

## Environment variables summary

### Backend (Render)

```env
Mongo_URI=mongodb+srv://...
JWT_SECRET=your-secret
GEMINI_API_KEY=your-key
NODE_ENV=production
CLIENT_URL=https://your-app.vercel.app
```

### Frontend (Vercel)

```env
VITE_API_URL=https://your-api.onrender.com
```

Rebuild/redeploy the frontend whenever `VITE_API_URL` changes — Vite embeds it at build time.

---

## Scripts

### Backend

```bash
npm run dev    # Development with nodemon
npm start      # Production
```

### Frontend

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # Oxlint
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| API requests fail on Vercel | Check `VITE_API_URL` points to Render URL; redeploy frontend |
| CORS errors | Set `CLIENT_URL` on Render to your exact Vercel URL |
| MongoDB connection failed | Verify Atlas IP whitelist and connection string |
| `/dashboard` 404 on refresh | Ensure `frontend/vercel.json` is committed |
| Render service slow on first load | Free tier cold start — wait or upgrade plan |
| AI suggestions fail | Set `GEMINI_API_KEY` on Render |

---

## License

ISC
