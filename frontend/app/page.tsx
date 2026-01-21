import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Task Management System
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        Organize, track, and manage your tasks efficiently with our comprehensive task management solution.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
