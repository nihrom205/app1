"use client";

import { useState } from "react";
import type { User } from "../../lib/data/users";

export default function UsersTable({ users }: { users: User[] }) {
  const [usersList, setUsersList] = useState<User[]>(users);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditForm(user);
  };

  const handleSave = (id: string) => {
    setUsersList(usersList.map(user => 
      user.id === id ? { ...user, ...editForm } : user
    ));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsersList(usersList.filter(user => user.id !== id));
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
            {usersList.map((user) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
