# Task Management System - Backend API

A RESTful API for a Task Management System built with Express.js, TypeScript, Prisma ORM, and PostgreSQL.

## Features

- JWT-based authentication (Access Token + Refresh Token)
- User registration and login
- Token refresh mechanism
- Secure password hashing with bcrypt
- Input validation using Zod
- Authentication middleware for protected routes
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

### Protected Routes

To access protected routes (future task management endpoints), include the access token in the Authorization header:

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
│   └── schema.prisma        # Database schema
├── src/
│   ├── controllers/
│   │   └── authController.ts    # Authentication request handlers
│   ├── services/
│   │   └── authService.ts       # Business logic
│   ├── routes/
│   │   └── authRoutes.ts        # Route definitions
│   ├── middlewares/
│   │   └── authMiddleware.ts    # Authentication middleware
│   ├── validators/
│   │   └── authValidator.ts     # Zod schemas
│   ├── utils/
│   │   └── jwt.ts               # JWT utilities
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point
├── .env.example             # Example environment variables
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
