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

## Task Management Features

The application now includes comprehensive task management functionality:

### Task Operations
- **Create Tasks**: Add new tasks with title and optional description
- **View Tasks**: Browse all tasks with pagination support (10 tasks per page)
- **Edit Tasks**: Modify task title, description, and status
- **Delete Tasks**: Remove tasks with confirmation modal
- **Toggle Status**: Quickly switch task status between PENDING and COMPLETED

### Advanced Features
- **Search**: Find tasks by title (case-insensitive)
- **Filter**: Filter tasks by status (PENDING, COMPLETED, or All)
- **Pagination**: Navigate through multiple pages of tasks
- **Real-time Updates**: Automatic task list refresh after operations
- **Loading States**: Visual feedback during API operations
- **Empty States**: Helpful messages when no tasks are found
- **Toast Notifications**: Success and error messages for all operations

### Testing Task Management

#### Prerequisites
1. Make sure the backend server is running on `http://localhost:3001`
2. Login to the application

#### Manual Testing Steps

1. **Test Create Task:**
   ```
   - Navigate to http://localhost:3000/dashboard
   - Click the "+ Add Task" button
   - Fill in the task title (required)
   - Optionally add a description
   - Click "Add Task"
   - Verify the task appears in the list
   - Check for success toast notification
   ```

2. **Test View Tasks:**
   ```
   - Verify all tasks are displayed with title, description, status
   - Check that task creation date is shown
   - Verify status badges (PENDING in yellow, COMPLETED in green)
   ```

3. **Test Edit Task:**
   ```
   - Click the "Edit" button on any task
   - Modify the title, description, or status
   - Click "Save Changes"
   - Verify the task is updated in the list
   - Check for success toast notification
   ```

4. **Test Delete Task:**
   ```
   - Click the "Delete" button on any task
   - Verify confirmation modal appears with task title
   - Click "Delete" to confirm
   - Verify the task is removed from the list
   - Check for success toast notification
   - Test "Cancel" button to dismiss the modal
   ```

5. **Test Toggle Task Status:**
   ```
   - For a PENDING task, click the "✓ Complete" button
   - Verify the task status changes to COMPLETED
   - For a COMPLETED task, click the "↻ Pending" button
   - Verify the task status changes to PENDING
   - Check for success toast notification
   - Verify the stats cards update accordingly
   ```

6. **Test Search Functionality:**
   ```
   - Type a search query in the "Search tasks by title..." field
   - Verify the task list updates to show matching tasks
   - Clear the search to show all tasks again
   - Test with partial matches
   - Test with no matches to see empty state
   ```

7. **Test Filter Functionality:**
   ```
   - Select "PENDING" from the status filter dropdown
   - Verify only pending tasks are displayed
   - Select "COMPLETED" to show only completed tasks
   - Select "All Status" to show all tasks
   - Verify pagination resets to page 1 when filtering
   ```

8. **Test Pagination:**
   ```
   - Create more than 10 tasks
   - Verify pagination controls appear
   - Click "Next" to go to the next page
   - Click "Previous" to go back
   - Click specific page numbers to jump to that page
   - Verify current page is highlighted
   - Test that "Previous" is disabled on page 1
   - Test that "Next" is disabled on the last page
   ```

9. **Test Combined Search and Filter:**
   ```
   - Apply a status filter
   - Enter a search query
   - Verify both filters work together
   - Clear one filter at a time to verify independent operation
   ```

10. **Test Statistics Dashboard:**
    ```
    - Verify "Total Tasks" shows the correct total count
    - Verify "Pending" shows the count of PENDING tasks
    - Verify "Completed" shows the count of COMPLETED tasks
    - Add/delete/toggle tasks and verify counts update
    ```

11. **Test Responsive Design:**
    ```
    - Open the application on mobile viewport (< 640px)
    - Verify layout adjusts appropriately
    - Test all operations on mobile view
    - Verify buttons stack vertically on small screens
    - Test tablet viewport (640px - 1024px)
    ```

12. **Test Error Handling:**
    ```
    - Try to create a task with an empty title
    - Verify the submit button is disabled
    - Stop the backend server
    - Try to perform any task operation
    - Verify error toast appears with appropriate message
    - Restart backend and verify operations work again
    ```

## Features

- ✅ **User Authentication**
  - Login with email and password
  - User registration with validation
  - Secure token-based authentication (JWT)
  - Automatic token refresh on expiry
  - Protected routes requiring authentication
  - Logout functionality
- ✅ **Task Management**
  - Create, read, update, and delete tasks
  - Toggle task status (PENDING/COMPLETED)
  - Search tasks by title
  - Filter tasks by status
  - Pagination support (10 tasks per page)
  - Real-time task statistics
  - Confirmation modals for destructive actions
- ✅ **State Management**
  - Zustand for global authentication state
  - Persistent login with localStorage
  - React Context API for auth provider
- ✅ **User Experience**
  - Toast notifications for feedback
  - Loading states during API calls
  - Error handling with user-friendly messages
  - Responsive design with Tailwind CSS
  - Empty states with helpful messages
  - Modal forms for task creation/editing
- ✅ **API Integration**
  - Centralized API client with axios
  - Automatic token inclusion in requests
  - Global error handling for expired tokens
  - Request/response interceptors
  - TypeScript interfaces for type safety
- Server-side rendering with Next.js
- Type-safe development with TypeScript

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
