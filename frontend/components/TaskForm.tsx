"use client";

import { useState, useEffect } from "react";
import { Task } from "../lib/api";

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: { title: string; description?: string; status?: 'PENDING' | 'COMPLETED' }) => Promise<void>;
  onClose: () => void;
  mode: 'add' | 'edit';
}

export function TaskForm({ task, onSubmit, onClose, mode }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<'PENDING' | 'COMPLETED'>(task?.status || 'PENDING');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const data: { title: string; description?: string; status?: 'PENDING' | 'COMPLETED' } = {
        title: title.trim(),
      };
      
      if (description.trim()) {
        data.description = description.trim();
      }
      
      if (mode === 'edit') {
        data.status = status;
      }

      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {mode === 'add' ? 'Add New Task' : 'Edit Task'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Enter task description (optional)"
                disabled={isSubmitting}
              />
            </div>

            {mode === 'edit' && (
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'PENDING' | 'COMPLETED')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Saving...' : mode === 'add' ? 'Add Task' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
