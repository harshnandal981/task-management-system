# Task Management System - Backend API

A RESTful API for a Task Management System built with Express.js, TypeScript, Prisma ORM, and PostgreSQL.

## Features

- JWT-based authentication (Access Token + Refresh Token)
- User registration and login
- Token refresh mechanism
- Secure password hashing with bcrypt
- Input validation using Zod
- Authentication middleware for protected routes
- Task management with CRUD operations
- Task filtering by status
- Task search by title
- Pagination support
- TypeScript for type safety

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the backend directory with the following variables:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/taskmanagement
JWT_SECRET=your_jwt_secret_key_here
REFRESH_SECRET=your_refresh_secret_key_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
PORT=3000
```

3. Set up the database:
```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Or generate Prisma client
npx prisma generate
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

#### 1. Register a New User
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- **400 Bad Request:** Validation error or user already exists
- **500 Internal Server Error:** Server error

#### 2. Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- **400 Bad Request:** Validation error
- **401 Unauthorized:** Invalid credentials
- **500 Internal Server Error:** Server error

#### 3. Refresh Access Token
**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- **400 Bad Request:** Validation error
- **401 Unauthorized:** Invalid or expired refresh token
- **500 Internal Server Error:** Server error

#### 4. Logout
**Endpoint:** `POST /auth/logout`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Note:** In this JWT implementation, logout is handled client-side by removing the stored tokens.

### Task Management Endpoints

All task endpoints are protected and require authentication. Include the access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

#### 1. Get All Tasks
**Endpoint:** `GET /tasks`

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of tasks per page (default: 10)
- `status` (optional): Filter by status (`PENDING` or `COMPLETED`)
- `search` (optional): Search by title (case insensitive)

**Example Request:**
```bash
curl -H "Authorization: Bearer <access_token>" \
  "http://localhost:3000/tasks?page=1&limit=10&status=PENDING&search=meeting"
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": {
    "tasks": [
      {
        "id": "uuid",
        "title": "Complete project",
        "description": "Finish the task management system",
        "status": "PENDING",
        "userId": "uuid",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

#### 2. Create New Task
**Endpoint:** `POST /tasks`

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the task management system",
  "status": "PENDING"
}
```

**Note:** `description` and `status` are optional. Status defaults to `PENDING`.

**Success Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "PENDING",
    "userId": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- **400 Bad Request:** Validation error
- **401 Unauthorized:** Invalid or missing token
- **500 Internal Server Error:** Server error

#### 3. Get Task by ID
**Endpoint:** `GET /tasks/:id`

**Example Request:**
```bash
curl -H "Authorization: Bearer <access_token>" \
  http://localhost:3000/tasks/task-uuid
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "PENDING",
    "userId": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- **400 Bad Request:** Invalid task ID
- **401 Unauthorized:** Invalid or missing token
- **404 Not Found:** Task not found
- **500 Internal Server Error:** Server error

#### 4. Update Task
**Endpoint:** `PATCH /tasks/:id`

**Request Body:** (All fields are optional)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "COMPLETED"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "uuid",
    "title": "Updated title",
    "description": "Updated description",
    "status": "COMPLETED",
    "userId": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

**Error Responses:**
- **400 Bad Request:** Validation error or invalid task ID
- **401 Unauthorized:** Invalid or missing token
- **404 Not Found:** Task not found
- **500 Internal Server Error:** Server error

#### 5. Delete Task
**Endpoint:** `DELETE /tasks/:id`

**Example Request:**
```bash
curl -X DELETE -H "Authorization: Bearer <access_token>" \
  http://localhost:3000/tasks/task-uuid
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Responses:**
- **400 Bad Request:** Invalid task ID
- **401 Unauthorized:** Invalid or missing token
- **404 Not Found:** Task not found
- **500 Internal Server Error:** Server error

#### 6. Toggle Task Status
**Endpoint:** `PATCH /tasks/:id/toggle`

**Description:** Toggles the task status between `PENDING` and `COMPLETED`.

**Example Request:**
```bash
curl -X PATCH -H "Authorization: Bearer <access_token>" \
  http://localhost:3000/tasks/task-uuid/toggle
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task status toggled successfully",
  "data": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "COMPLETED",
    "userId": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

**Error Responses:**
- **400 Bad Request:** Invalid task ID
- **401 Unauthorized:** Invalid or missing token
- **404 Not Found:** Task not found
- **500 Internal Server Error:** Server error

### Protected Routes

To access protected routes, include the access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

Example using curl:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:3000/api/protected-route
```

## Testing the API

### Using cURL

#### Register a new user:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Refresh token:
```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN_HERE"
  }'
```

#### Logout:
```bash
curl -X POST http://localhost:3000/auth/logout
```

### Using Postman or Insomnia

1. **Register a user:**
   - Method: POST
   - URL: `http://localhost:3000/auth/register`
   - Body (JSON):
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```

2. **Login:**
   - Method: POST
   - URL: `http://localhost:3000/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - Copy the `accessToken` and `refreshToken` from the response

3. **Test protected routes:**
   - Add Authorization header: `Bearer <accessToken>`

4. **Refresh token:**
   - Method: POST
   - URL: `http://localhost:3000/auth/refresh`
   - Body (JSON):
     ```json
     {
       "refreshToken": "<refreshToken>"
     }
     ```

## Validation Rules

### Registration
- **name:** 2-100 characters
- **email:** Valid email format
- **password:** 6-100 characters

### Login
- **email:** Valid email format
- **password:** Required

### Task Creation
- **title:** Required, 1-200 characters
- **description:** Optional, max 1000 characters
- **status:** Optional, either `PENDING` or `COMPLETED` (defaults to `PENDING`)

### Task Update
- **title:** Optional, 1-200 characters
- **description:** Optional, max 1000 characters, can be set to null
- **status:** Optional, either `PENDING` or `COMPLETED`

### Task Query Parameters
- **page:** Optional, positive integer (default: 1)
- **limit:** Optional, positive integer (default: 10)
- **status:** Optional, either `PENDING` or `COMPLETED`
- **search:** Optional, string for case-insensitive title search

## Error Handling

The API uses standard HTTP status codes:

- **200 OK:** Request successful
- **201 Created:** Resource created successfully
- **400 Bad Request:** Invalid input or validation error
- **401 Unauthorized:** Authentication failed or token invalid
- **404 Not Found:** Resource not found
- **500 Internal Server Error:** Server error

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional, for validation errors
}
```

## Security Considerations

- Passwords are hashed using bcrypt with a salt round of 10
- JWT tokens are signed with secret keys
- Access tokens expire in 15 minutes by default
- Refresh tokens expire in 7 days by default
- Token secrets should be strong and kept secure
- Use HTTPS in production
- Store tokens securely on the client-side (e.g., httpOnly cookies or secure storage)

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma            # Database schema
├── src/
│   ├── controllers/
│   │   ├── authController.ts    # Authentication request handlers
│   │   └── taskController.ts    # Task request handlers
│   ├── services/
│   │   ├── authService.ts       # Authentication business logic
│   │   └── taskService.ts       # Task business logic
│   ├── routes/
│   │   ├── authRoutes.ts        # Authentication route definitions
│   │   └── taskRoutes.ts        # Task route definitions
│   ├── middlewares/
│   │   └── authMiddleware.ts    # Authentication middleware
│   ├── validators/
│   │   ├── authValidator.ts     # Authentication Zod schemas
│   │   └── taskValidator.ts     # Task Zod schemas
│   ├── utils/
│   │   ├── jwt.ts               # JWT utilities
│   │   └── prisma.ts            # Prisma client
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point
├── .env.example                 # Example environment variables
├── package.json
└── tsconfig.json
```

## Development

### Building the Project
```bash
npm run build
```

### Type Checking
TypeScript will automatically check types during build. The project uses strict mode.

## License

ISC
