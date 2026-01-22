"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { ToastContainer, useToast } from "../../components/Toast";
import { TaskList } from "../../components/TaskList";
import { TaskForm } from "../../components/TaskForm";
import { DeleteConfirmationModal } from "../../components/DeleteConfirmationModal";
import { taskApi, Task } from "../../lib/api";

function DashboardContent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const params: any = {
        page: currentPage,
        limit: 10,
      };

      if (statusFilter) {
        params.status = statusFilter;
      }

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const response = await taskApi.getTasks(params);
      setTasks(response.data.tasks);
      setTotalPages(response.data.pagination.totalPages);
      setTotalTasks(response.data.pagination.total);
    } catch (error: any) {
      console.error('Error fetching tasks:', error);
      showToast(error.response?.data?.message || "Failed to fetch tasks", "error");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter, searchQuery, showToast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleLogout = async () => {
    try {
      await logout();
      showToast("Logged out successfully!", "success");
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error) {
      showToast("Logout failed. Please try again.", "error");
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleSubmitTask = async (data: { title: string; description?: string; status?: 'PENDING' | 'COMPLETED' }) => {
    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask.id, data);
        showToast("Task updated successfully!", "success");
      } else {
        await taskApi.createTask(data);
        showToast("Task created successfully!", "success");
      }
      await fetchTasks();
      handleCloseForm();
    } catch (error: any) {
      console.error('Error submitting task:', error);
      showToast(error.response?.data?.message || "Failed to save task", "error");
      throw error;
    }
  };

  const handleDeleteClick = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTaskToDelete({ id, title: task?.title || 'this task' });
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      setIsDeleting(true);
      await taskApi.deleteTask(taskToDelete.id);
      showToast("Task deleted successfully!", "success");
      setTaskToDelete(null);
      await fetchTasks();
    } catch (error: any) {
      console.error('Error deleting task:', error);
      showToast(error.response?.data?.message || "Failed to delete task", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await taskApi.toggleTaskStatus(id);
      showToast("Task status updated!", "success");
      await fetchTasks();
    } catch (error: any) {
      console.error('Error toggling task status:', error);
      showToast(error.response?.data?.message || "Failed to update task status", "error");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    setCurrentPage(1);
  };

  const pendingCount = tasks.filter((t) => t.status === "PENDING").length;
  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div>
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name || "User"}!</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              + Add Task
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tasks</h3>
            <p className="text-3xl font-bold text-blue-600">{totalTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Tasks</h2>
          </div>
          <div className="p-6">
            <TaskList
              tasks={tasks}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
              onEdit={handleEditTask}
              onDelete={handleDeleteClick}
              onToggleStatus={handleToggleStatus}
              statusFilter={statusFilter}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmitTask}
          onClose={handleCloseForm}
          mode={editingTask ? 'edit' : 'add'}
        />
      )}

      <DeleteConfirmationModal
        isOpen={!!taskToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        taskTitle={taskToDelete?.title || ''}
        isDeleting={isDeleting}
      />
    </>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
