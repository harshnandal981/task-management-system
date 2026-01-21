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
│   ├── dashboard/      # Dashboard page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable React components
├── services/           # API service functions
├── utils/              # Utility functions
└── package.json
```

## Available Routes

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main dashboard

## Features

- Server-side rendering with Next.js
- Type-safe development with TypeScript
- Responsive design with Tailwind CSS
- API integration ready
- State management with Zustand

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
