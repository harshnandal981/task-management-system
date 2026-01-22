# Task Management System - Frontend

This is the frontend application for the Task Management System, built with Next.js and TypeScript.

## Technology Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **Zustand** - State management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the environment variables in `.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the application for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
frontend/
├── app/                 # Next.js App Router pages
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── dashboard/      # Dashboard page (protected)
│   ├── layout.tsx      # Root layout with AuthProvider
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable React components
│   ├── Toast.tsx       # Toast notification system
│   └── ProtectedRoute.tsx  # Route protection component
├── context/            # React contexts
│   └── AuthContext.tsx # Authentication context provider
├── lib/                # Libraries and utilities
│   └── api.ts          # Axios API client with token management
├── store/              # State management
│   └── authStore.ts    # Zustand authentication store
└── package.json
```

## Available Routes

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main dashboard (protected - requires authentication)

## Authentication Flow

### Registration
1. Navigate to `/register`
2. Fill in name, email, and password
3. Confirm password
4. Submit form
5. On success, redirected to login page

### Login
1. Navigate to `/login`
2. Enter email and password
3. Submit form
4. On success, tokens stored in localStorage
5. Redirected to `/dashboard`

### Protected Routes
- Unauthenticated users trying to access `/dashboard` are redirected to `/login`
- Authentication state is checked on page load
- Access tokens are automatically refreshed when expired

### Logout
- Click "Logout" button on dashboard
- Tokens cleared from localStorage
- Redirected to login page

## Testing the Application

### Prerequisites
Make sure the backend server is running on `http://localhost:3001`

### Manual Testing Steps

1. **Test Registration:**
   ```
   - Visit http://localhost:3000/register
   - Register a new user with valid credentials
   - Verify redirect to login page
   - Check for success toast notification
   ```

2. **Test Login:**
   ```
   - Visit http://localhost:3000/login
   - Login with registered credentials
   - Verify redirect to dashboard
   - Check for success toast notification
   - Verify user name is displayed
   ```

3. **Test Protected Routes:**
   ```
   - Without logging in, try to access http://localhost:3000/dashboard
   - Verify redirect to login page
   ```

4. **Test Logout:**
   ```
   - While logged in, click the Logout button
   - Verify redirect to login page
   - Verify cannot access dashboard without logging in again
   ```

5. **Test Token Refresh:**
   ```
   - Login and wait for access token to expire (if backend has short expiry)
   - Make an API call (or navigate pages)
   - Verify token is automatically refreshed without user intervention
   ```

6. **Test Error Handling:**
   ```
   - Try to login with invalid credentials
   - Verify error toast notification
   - Try to register with existing email
   - Verify error toast notification
   ```

## Features

- ✅ **User Authentication**
  - Login with email and password
  - User registration with validation
  - Secure token-based authentication (JWT)
  - Automatic token refresh on expiry
  - Protected routes requiring authentication
  - Logout functionality
- ✅ **State Management**
  - Zustand for global authentication state
  - Persistent login with localStorage
  - React Context API for auth provider
- ✅ **User Experience**
  - Toast notifications for feedback
  - Loading states during API calls
  - Error handling with user-friendly messages
  - Responsive design with Tailwind CSS
- ✅ **API Integration**
  - Centralized API client with axios
  - Automatic token inclusion in requests
  - Global error handling for expired tokens
  - Request/response interceptors
- Server-side rendering with Next.js
- Type-safe development with TypeScript

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
