"use client";

import { useState, useEffect } from "react";
import type { User } from "@/lib/data/users";
import { UsersService } from "@/lib/services/users-service";

export default function UsersTable() {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  // Загружаем пользователей при монтировании
  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditForm(user);
  };

  // Load users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await UsersService.getUsers();
      setUsersList(response.users || []);
      setError(null); // Убираем ошибку если API заработал
    } catch (err) {
      setUsersList([]);
      setError(
        err instanceof Error ? err.message : "Не удалось загрузить список пользователей"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id: string) => {
    try {
      setLoading(true);
      const updatedUser = await UsersService.updateUser({
        id,
        ...editForm,
      });
      
      setUsersList(usersList.map(user => 
        user.id === id ? updatedUser : user
      ));
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      console.warn("API недоступен, обновляем локально:", err);
      // Fallback: обновляем локально если API недоступен
      setUsersList(usersList.map(user => 
        user.id === id ? { ...user, ...editForm } : user
      ));
      setEditingId(null);
      setEditForm({});
      setError("API недоступен, изменения сохранены локально");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        setLoading(true);
        await UsersService.deleteUser(id);
        setUsersList(usersList.filter(user => user.id !== id));
      } catch (err) {
        console.warn("API недоступен, удаляем локально:", err);
        // Fallback: удаляем локально если API недоступен
        setUsersList(usersList.filter(user => user.id !== id));
        setError("API недоступен, пользователь удален локально");
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "Active":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "Inactive":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case "Pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getRoleBadge = (role: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (role) {
      case "Admin":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "Moderator":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "User":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Users Management</h2>
        <p className="text-sm text-gray-600">Manage your application users</p>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-red-800">{error}</span>
            <div className="ml-auto flex space-x-2">
              <button
                onClick={loadUsers}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Повторить попытку
              </button>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {loading && (
        <div className="px-6 py-8 text-center">
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">Loading users...</span>
          </div>
        </div>
      )}
      
      {!loading && (
        <div className="overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[16%]" />
            <col className="w-[16%]" />
            <col className="w-[12%]" />
          </colgroup>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersList && usersList.length > 0 ? usersList.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                                 <td className="px-6 py-4 align-top min-w-0">
                    {editingId === user.id ? (
                      <div className="flex flex-col gap-2">
                       <input
                         type="text"
                         placeholder="Name"
                         value={editForm.name || ""}
                         onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="block w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                       />
                       <input
                         type="email"
                         placeholder="Email"
                         value={editForm.email || ""}
                         onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="block w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                       />
                     </div>
                   ) : (
                     <div>
                       <div className="text-sm font-medium text-gray-900">{user.name}</div>
                       <div className="text-sm text-gray-500">{user.email}</div>
                     </div>
                   )}
                 </td>
                 <td className="px-6 py-4">
                   {editingId === user.id ? (
                     <select
                       value={editForm.role || ""}
                       onChange={(e) => setEditForm({ ...editForm, role: e.target.value as User["role"] })}
                       className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                     >
                       <option value="Admin">Admin</option>
                       <option value="Moderator">Moderator</option>
                       <option value="User">User</option>
                     </select>
                   ) : (
                     <span className={getRoleBadge(user.role)}>
                       {user.role}
                     </span>
                   )}
                 </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === user.id ? (
                    <select
                      value={editForm.status || ""}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value as User["status"] })}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  ) : (
                    <span className={getStatusBadge(user.status)}>
                      {user.status}
                    </span>
                  )}
                </td>
                                 <td className="px-6 py-4">
                   {editingId === user.id ? (
                     <input
                       type="date"
                       value={editForm.joinDate || ""}
                       onChange={(e) => setEditForm({ ...editForm, joinDate: e.target.value })}
                       className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                     />
                   ) : (
                     <span className="text-sm text-gray-500">{user.joinDate}</span>
                   )}
                 </td>
                 <td className="px-6 py-4">
                   {editingId === user.id ? (
                     <input
                       type="text"
                       placeholder="Last login"
                       value={editForm.lastLogin || ""}
                       onChange={(e) => setEditForm({ ...editForm, lastLogin: e.target.value })}
                       className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                     />
                   ) : (
                     <span className="text-sm text-gray-500">{user.lastLogin}</span>
                   )}
                 </td>
                 <td className="px-6 py-4 text-sm font-medium">
                  {editingId === user.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(user.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
                             </tr>
             )) : (
               <tr>
                 <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                   Нет данных для отображения
                 </td>
               </tr>
             )}
           </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
