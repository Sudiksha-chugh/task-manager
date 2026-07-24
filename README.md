# 📋 TaskFlow | Real-Time Task Management App

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://task-manager-ecru-chi-56.vercel.app/register)
[![Backend Status](https://img.shields.io/badge/API_Status-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://task-manager-backend-ypav.onrender.com)

> A responsive full-stack Kanban-style task management application inspired by Trello. It features secure authentication, drag-and-drop task management, board organization, and persistent cloud storage.

---

## 🌐 Live Demo

- **Frontend:** https://task-manager-ecru-chi-56.vercel.app
- **Backend API:** https://task-manager-backend-ypav.onrender.com

> **Note:** The backend is hosted on Render's free tier. If the server has been idle, the first request may take **30–50 seconds** while it spins up.

---

# ✨ Features

- 🔐 JWT Authentication with encrypted passwords using **bcryptjs**
- 📋 Create multiple boards for organizing work
- ✅ Create, edit, update and delete tasks
- 🎯 Drag & Drop task movement using **@dnd-kit**
- 🔒 Protected Routes & User-specific workspaces
- ☁️ MongoDB Atlas cloud database
- 🚀 Deployed on Vercel + Render
- ⚡ Real-time synchronization with **Socket.IO** *(In Progress)*

---

# 🛠️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| Frontend | React.js, React Router, Axios, @dnd-kit |
| Backend | Node.js, Express.js |
| Authentication | JWT, bcryptjs |
| Database | MongoDB Atlas, Mongoose |
| Deployment | Vercel, Render |

---

# 🏗️ Project Architecture

```
User
 │
 └─────────────┐
               │
           Multiple Boards
               │
               ▼
            Tasks
```

### Database Relationships

```
User (1)
   │
   ▼
Board (N)
   │
   ▼
Task (N)
```

- **User** owns multiple boards.
- **Board** contains multiple tasks.
- **Task** belongs to a single board.

---

# 🔌 REST API

| Method | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/boards` | Fetch all boards | ✅ |
| POST | `/api/boards` | Create board | ✅ |
| GET | `/api/tasks/:boardId` | Fetch tasks | ✅ |
| POST | `/api/tasks` | Create task | ✅ |
| PATCH | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

---

# 💻 Installation

## Clone Repository

```bash
git clone https://github.com/Sudiksha-chugh/task-management-app.git
cd task-management-app
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=https://task-manager-ecru-chi-56.vercel.app
```

Run the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the **frontend** folder.

```env
VITE_API_BASE_URL=https://task-manager-backend-ypav.onrender.com/api
```

Run the frontend:

```bash
npm run dev
```

---

# 📂 Project Structure

```
task-management-app
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# 🚀 Future Improvements

- [x] JWT Authentication
- [x] Board Management
- [x] Drag & Drop Tasks
- [x] MongoDB Atlas Integration
- [x] Cloud Deployment
- [ ] Real-time Collaboration (Socket.IO)
- [ ] Activity Logs
- [ ] Task Due Dates
- [ ] File Attachments
- [ ] Search & Filtering
- [ ] Team Collaboration
- [ ] Email Notifications

---

# 👩‍💻 Author

**Sudiksha Chugh**

- GitHub: https://github.com/Sudiksha-chugh

---

## ⭐ If you found this project useful, don't forget to give it a Star!
