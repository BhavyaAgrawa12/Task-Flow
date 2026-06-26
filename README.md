# 🚀 TaskFlow

<p align="center">
  <img src="./frontend/public/favicon.png" width="120" alt="TaskFlow Logo" />
</p>

<h1 align="center">TaskFlow</h1>

<p align="center">
  <strong>AI-Powered Task Management Platform</strong>
</p>

<p align="center">
TaskFlow is a modern full-stack task management application that combines Kanban boards, AI-powered task estimation, analytics, and secure authentication into a beautiful SaaS experience.
Built using the MERN Stack with Google Gemini AI integration.
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge\&logo=google\&logoColor=white)

</p>

---

# 🌐 Live Demo

| Service       | Link                                        |
| ------------- | ------------------------------------------- |
| 🚀 Frontend   | **https://bhavya-taskflow.vercel.app/**     |
| ⚡ Backend API | **https://taskflow-api-jak6.onrender.com/** |

---

# 📌 About The Project

TaskFlow is a production-ready AI-powered project management platform that enables users to organize projects efficiently using Kanban boards while leveraging Google Gemini AI to estimate task effort and suggest deadlines.

The application follows modern SaaS design principles with a responsive interface, secure authentication, productivity analytics, and a scalable REST API architecture.

---

# ✨ Features

## 🔐 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Password Hashing using bcrypt
* Protected API Routes

---

## 📋 Task Management

* Create Tasks
* Update Tasks
* Delete Tasks
* Due Dates
* Task Priority
* Status Management

---

## 📌 Kanban Boards

* Multiple Boards
* Todo
* In Progress
* Done
* Search Boards
* Responsive Layout

---

## 🤖 AI Task Suggestions

TaskFlow integrates with **Google Gemini AI** to help users estimate task effort and suggest realistic deadlines.

**Features:**
- AI-powered effort estimation
- Suggested task deadlines
- AI reasoning for recommendations

> **Note:** The live demo uses the Google Gemini AI Free Tier. AI suggestions may be temporarily unavailable if the free API quota has been exhausted.
---

## 📊 Analytics Dashboard

* Productivity Overview
* Task Distribution
* Completed Tasks
* Pending Tasks
* Overdue Tasks
* Interactive Charts

---

## 📱 Responsive UI

Designed for

* Desktop
* Tablet
* Mobile

---

# 📖 How to Use TaskFlow

Follow these steps to explore the complete workflow of the application.

---

## 1️⃣ Register

Open the application and create a new account using your:

* Name
* Email
* Password

If you already have an account, simply log in.

---

## 2️⃣ Login

After logging in successfully, you'll be redirected to your dashboard where all your project boards are displayed.

---

## 3️⃣ Create a Board

Boards represent individual projects.

Examples:

* College Project
* Personal Tasks
* Office Work
* Freelance Project

Click **Create Board**, enter a project name, and save it.

---

## 4️⃣ Open the Board

Click on the newly created board.

This opens the Kanban workspace where all tasks for that project will be managed.

---

## 5️⃣ Create a Task

Click **Create Task** and fill in the following information:

* Task Title
* Task Description
* Priority (Low / Medium / High)
* Due Date (Optional)

---

## 6️⃣ Generate AI Suggestions

Click **Suggest Estimate**.

TaskFlow sends the task information to **Google Gemini AI**, which analyzes the task and returns:

* 📅 Suggested Deadline
* ⏱ Estimated Effort
* 💡 AI Reasoning

You can then:

* ✅ Accept the AI suggestion
* ❌ Decline it and keep your own values

> **Note:** AI Suggestions use the Google Gemini AI Free Tier. If the daily quota has been exhausted, this feature may be temporarily unavailable. The rest of the application continues to work normally.

---

## 7️⃣ Save the Task

Click **Create Task**.

The task will immediately appear inside your Kanban board.

---

## 8️⃣ Manage Your Workflow

Organize tasks by moving them across the Kanban columns:

* 📝 Todo
* 🚧 In Progress
* ✅ Done

This helps visualize project progress and improve productivity.

---

## 9️⃣ View Analytics

Navigate to the **Analytics Dashboard** to monitor:

* Total Tasks
* Completed Tasks
* Pending Tasks
* Overdue Tasks
* Productivity Overview
* Task Status Distribution

---

## 🔟 Logout Securely

Use the Profile menu to securely log out of your account when finished.

---

# ⚡ Quick Demo Flow

```text
Register
    │
    ▼
Login
    │
    ▼
Create Board
    │
    ▼
Open Board
    │
    ▼
Create Task
    │
    ▼
Fill Task Details
    │
    ▼
Suggest Estimate (AI)
    │
    ▼
Accept / Decline AI Suggestion
    │
    ▼
Save Task
    │
    ▼
Manage Tasks on Kanban Board
    │
    ▼
Track Progress in Analytics Dashboard
```

---

# 📸 Screenshots

> Add screenshots after cloning or deploying the project.

| Landing Page | Dashboard  |
| ------------ | ---------- |
| Screenshot   | Screenshot |

| Kanban Board | Analytics  |
| ------------ | ---------- |
| Screenshot   | Screenshot |

| Create Task | AI Suggestions |
| ----------- | -------------- |
| Screenshot  | Screenshot     |

---

# 💡 Demo Note

This project uses the **Google Gemini AI Free Tier** for AI-powered task suggestions.

Since the live demo relies on the free API quota, AI suggestions may occasionally become unavailable if the quota has been exhausted.

All other features—including authentication, board management, task management, and analytics—remain fully functional.

---

## ⭐ Recommended Workflow

1. Register or Login.
2. Create your first board.
3. Open the board.
4. Add a task.
5. Click **Suggest Estimate** to receive AI recommendations.
6. Accept or decline the suggestion.
7. Save the task.
8. Move tasks between **Todo**, **In Progress**, and **Done**.
9. Visit the **Analytics Dashboard** to monitor project progress.

---

# 🛠 Tech Stack

### Frontend

* React 19
* Vite
* React Router DOM
* Tailwind CSS v4
* Axios
* Framer Motion
* Lucide React
* React Hook Form
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt
* Google Gemini AI

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

# 📂 Folder Structure

```text
Task-Flow
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── validators
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   └── utils
│   ├── public
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/BhavyaAgrawa12/Task-Flow.git

cd Task-Flow
```

Install dependencies

### Backend

```bash
cd backend

npm install
```

### Frontend

```bash
cd ../frontend

npm install
```

---

# 🔑 Environment Variables

### Backend (.env)

```env
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
CLIENT_URL=http://localhost:5173
PORT=5000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

# ▶️ Run Locally

### Backend

```bash
cd backend

npm run dev
```

### Frontend

```bash
cd frontend

npm run dev
```

---

# 🔗 API Endpoints

| Method | Endpoint             | Description    |
| ------ | -------------------- | -------------- |
| POST   | `/api/auth/register` | Register User  |
| POST   | `/api/auth/login`    | Login User     |
| GET    | `/api/boards`        | Fetch Boards   |
| POST   | `/api/boards`        | Create Board   |
| GET    | `/api/tasks`         | Fetch Tasks    |
| POST   | `/api/tasks`         | Create Task    |
| PATCH  | `/api/tasks/:id`     | Update Task    |
| DELETE | `/api/tasks/:id`     | Delete Task    |
| POST   | `/api/ai/suggest`    | AI Suggestions |

---

# 🚀 Deployment

## Backend (Render)

* Runtime: Node.js
* Root Directory: `backend`
* Build Command:

```bash
npm install
```

* Start Command:

```bash
npm start
```

Environment Variables

```env
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
CLIENT_URL=https://bhavya-taskflow.vercel.app
NODE_ENV=production
```

---

## Frontend (Vercel)

* Framework: Vite
* Root Directory: `frontend`
* Build Command:

```bash
npm run build
```

* Output Directory:

```text
dist
```

Environment Variable

```env
VITE_API_URL=https://taskflow-api-jak6.onrender.com
```

---

# 📈 Future Enhancements

* Team Collaboration
* Calendar View
* File Attachments
* Activity Timeline
* Email Notifications
* Real-time Updates
* Role-Based Access Control

---

# 👨‍💻 Developer

**Bhavya Agrawal**

* GitHub: https://github.com/BhavyaAgrawa12
* Repository: https://github.com/BhavyaAgrawa12/Task-Flow

---

<p align="center">
If you found this project helpful, consider giving it a ⭐ on GitHub.
</p>
