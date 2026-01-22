"use client";

import { Task } from "../lib/api";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
  };

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-2 break-words">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 text-sm mb-3 break-words">{task.description}</p>
          )}
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium ${
                statusColors[task.status]
              }`}
            >
              {task.status}
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={() => onToggleStatus(task.id)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
            title={`Mark as ${task.status === 'PENDING' ? 'Completed' : 'Pending'}`}
          >
            {task.status === 'PENDING' ? '✓ Complete' : '↻ Pending'}
          </button>
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
