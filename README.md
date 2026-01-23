# Task Management System

A full-stack task management application built with Next.js (frontend) and Node.js/Express (backend).

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with access and refresh tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Status**: Toggle tasks between PENDING and COMPLETED
- **Search & Filter**: Find tasks by title and filter by status
- **Pagination**: Handle large task lists with pagination
- **Real-time Updates**: Automatic task statistics and list updates
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Protected Routes**: Secure dashboard accessible only to authenticated users

## 📁 Project Structure

```
task-management-system/
├── frontend/           # Next.js frontend application
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable React components
│   ├── context/       # React contexts
│   ├── lib/           # API client and utilities
│   ├── store/         # State management
│   ├── vercel.json    # Vercel deployment configuration
│   ├── DEPLOYMENT.md  # Detailed deployment guide
│   └── README.md      # Frontend documentation
└── backend/           # Express.js backend API
    └── README.md      # Backend documentation
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Zustand** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication

## 📖 Documentation

- **[Frontend README](./frontend/README.md)** - Frontend setup, features, and development guide
- **[Frontend Deployment Guide](./frontend/DEPLOYMENT.md)** - Comprehensive Vercel deployment instructions
- **[Backend README](./backend/README.md)** - Backend setup and API documentation

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials and JWT secrets.

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

Backend will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update `NEXT_PUBLIC_API_URL` if needed (default: `http://localhost:3001`)

4. Start the development server:
   ```bash
   npm run dev
   ```

Frontend will be available at `http://localhost:3000`

## 🌐 Deployment

### Frontend Deployment (Vercel)

The frontend is optimized for Vercel deployment:

1. **Using Vercel Dashboard**:
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Configure `NEXT_PUBLIC_API_URL` environment variable
   - Deploy

2. **Using Vercel CLI**:
   ```bash
   cd frontend
   npm install -g vercel
   vercel
   ```

**📖 For complete deployment instructions, see [Frontend Deployment Guide](./frontend/DEPLOYMENT.md)**

### Backend Deployment

The backend can be deployed to various platforms:
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS Elastic Beanstalk

Refer to the backend README for platform-specific instructions.

## 🧪 Testing the Application

### Complete Testing Flow

1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test User Registration**:
   - Visit `http://localhost:3000/register`
   - Create a new account
   - Verify redirect to login

4. **Test Login**:
   - Visit `http://localhost:3000/login`
   - Login with credentials
   - Verify redirect to dashboard

5. **Test Task Management**:
   - Create tasks
   - Edit task details
   - Toggle task status
   - Delete tasks
   - Use search and filter
   - Test pagination

6. **Test Logout**:
   - Click logout
   - Verify redirect to login
   - Confirm dashboard is inaccessible

## 🔐 Environment Variables

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/taskdb
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
PORT=3001
```

## 📝 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token

### Tasks (Protected)
- `GET /tasks` - Get all tasks (with pagination, search, filter)
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `PATCH /tasks/:id/toggle` - Toggle task status

## 🎯 Available Routes

### Frontend Routes
- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Task management dashboard (protected)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a software engineering assessment.

## 🆘 Support

For issues and questions:
- Check the [Frontend Deployment Guide](./frontend/DEPLOYMENT.md) for deployment issues
- Review frontend and backend README files for setup issues
- Check the application logs for error details

## ✨ Features Roadmap

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Task priorities
- [ ] Task due dates
- [ ] Task categories/tags
- [ ] Collaborative tasks
- [ ] Task comments
- [ ] File attachments
- [ ] Dark mode
- [ ] Export tasks to CSV/PDF

---

Built with ❤️ using Next.js, Express, and PostgreSQL
