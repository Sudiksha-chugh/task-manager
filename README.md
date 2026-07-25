# 📋 TaskFlow | Real-Time Task Management App

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://task-manager-ecru-chi-56.vercel.app)
[![Backend Status](https://img.shields.io/badge/API_Status-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://task-manager-backend-ypav.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#-license)

> A full-stack real-time Kanban-style task management app with drag-and-drop, Google OAuth, OTP verification, forgot password, and an email-to-task webhook pipeline — inspired by Trello.

---

## 🌐 Live Demo

- **Frontend:** https://task-manager-ecru-chi-56.vercel.app
- **Backend API:** https://task-manager-backend-ypav.onrender.com

> **Note:** The backend is hosted on Render's free tier. If the server has been idle, the first request may take **30–50 seconds** while it spins up.

---

## ✨ Features

- 🔐 **JWT Authentication** — secure email/password register and login with **bcryptjs** password hashing
- 🔑 **Google OAuth** — one-click login via Passport.js
- 📧 **OTP Email Verification** — 6-digit OTP sent on register, expires in 10 minutes
- 🔁 **Forgot Password** — time-expiring reset link sent via email
- 📋 **Boards** — create and manage multiple boards per user
- ✅ **Tasks** — create, edit, update, and delete tasks with To Do / In Progress / Done status
- 🎯 **Drag & Drop** — move tasks between columns using **@dnd-kit** with optimistic UI updates
- ⚡ **Real-Time Updates** — Socket.IO pushes task changes instantly, no page refresh needed
- 📨 **Email-to-Task Webhook** — send an email to your inbound address → task created automatically on your board
- 🔒 **Protected Routes** — user-specific, ownership-scoped workspaces
- ☁️ **Cloud Persistence** — MongoDB Atlas database
- 📱 **Responsive Design** — works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React.js + Vite | UI framework |
| React Router | Client-side routing |
| Axios | API requests with JWT interceptor |
| @dnd-kit/core | Drag-and-drop between columns |
| Socket.IO Client | Real-time task updates |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express.js | REST API server |
| MongoDB + Mongoose | Database and schema modeling |
| Socket.IO | Real-time bidirectional communication |
| Passport.js | Google OAuth2 strategy |
| JWT (jsonwebtoken) | Stateless authentication |
| bcryptjs | Password hashing |
| Resend | Transactional email (OTP, password reset, notifications) |
| Cloudmailin | Inbound email webhook |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |


---

## 🏗️ Architecture Overview

```
Frontend (Vercel)
    ↓ REST API (Axios + JWT)
Backend (Render)
    ↓
MongoDB Atlas
    ↓ Socket.IO
Frontend (real-time updates)

Email → Cloudmailin → Webhook → MongoDB → Socket.IO → React
```

### Flow Breakdown
* **Authentication & API:** Client applications communicate with the backend using JWT-authenticated REST endpoints via Axios.
* **Real-time Sync:** Socket.IO handles live updates across connected clients when boards or tasks change.
* **Email Integration:** Inbound emails sent to your custom address are parsed by **Cloudmailin**, forwarded via webhooks to the Node/Express backend, stored in **MongoDB Atlas**, and broadcast live to the React client via **Socket.IO**.

---

## 📊 Database Relationships

```
User (1)
  │
  └──► Board (N)
         │
         └──► Task (N)
```

* **User**: Represents registered platform accounts.
* **Board**: Belongs to a single user (or team) and contains multiple tasks.
* **Task**: Belongs to a specific board and holds task details, status, and metadata created manually or via email.

---

## 💻 Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Resend account
- Google Cloud OAuth credentials

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5001/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=your_session_secret
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

---

## 🚀 Local Development Setup

### 1. Clone the repo
```bash
git clone [https://github.com/Sudiksha-chugh/task-manager.git](https://github.com/Sudiksha-chugh/task-manager.git)
cd task-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create your .env file here based on the configuration above
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Create your .env file here based on the configuration above
npm run dev
```

Open `http://localhost:5173` in your browser to view the application.

## 🔌 API Routes

### Auth
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/auth/register` | Register with OTP | ❌ |
| POST | `/api/auth/verify-otp` | Verify OTP | ❌ |
| POST | `/api/auth/resend-otp` | Resend OTP | ❌ |
| POST | `/api/auth/login` | Login with JWT | ❌ |
| GET | `/api/auth/google` | Google OAuth | ❌ |
| GET | `/api/auth/google/callback` | Google OAuth callback | ❌ |

### Password
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/password/forgot-password` | Send reset link | ❌ |
| POST | `/api/password/reset-password` | Reset with token | ❌ |

### Boards
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/boards` | Create board | ✅ |
| GET | `/api/boards` | Get user's boards | ✅ |
| DELETE | `/api/boards/:id` | Delete board | ✅ |

### Tasks
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/tasks` | Create task | ✅ |
| GET | `/api/tasks/:boardId` | Get tasks for board | ✅ |
| PATCH | `/api/tasks/:id` | Update task status | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

### Webhook
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/webhook/email` | Inbound email → task | ❌ |

---
---

## ⚡ Real-Time Flow

```text
User opens board → Socket.IO connects → joins user room
         ↓
Email sent to Cloudmailin address
         ↓
Cloudmailin POSTs to /api/webhook/email
         ↓
Backend creates task in MongoDB
         ↓
Socket.IO emits task:created to user's room
         ↓
React receives event → board updates instantly
```

---

## 📂 Project Structure

```text
task-management-app
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🚀 Future Scope

- [ ] Custom domain email ingestion (`tasks@yourdomain.com`)
- [ ] GitHub OAuth login
- [ ] Task assignment to other users
- [ ] Due dates and priority levels
- [ ] Team/workspace support with member roles
- [ ] Mobile app (React Native)
- [ ] AI-based task suggestions
- [ ] Activity logs
- [ ] File attachments
- [ ] Search & filtering

---

## 🏆 Resume Highlights

- Engineered a real-time webhook pipeline: inbound email triggers task creation via HTTP webhook with instant UI updates via Socket.IO
- Implemented multi-strategy authentication: JWT email/password + Google OAuth via Passport.js
- Built secure OTP email verification with 10-minute expiry using the Resend API
- Implemented a forgot-password flow with time-expiring crypto tokens
- Designed a MongoDB schema with referenced relationships (User → Board → Task) and ownership-scoped data access
- Deployed a full-stack app: backend on Render, frontend on Vercel, with environment-based API configuration

---

## 👩‍💻 Author

**Sudiksha Chugh**

- GitHub: https://github.com/Sudiksha-chugh

---

## 📄 License

MIT

---

⭐ If you found this project useful, don't forget to give it a star!
