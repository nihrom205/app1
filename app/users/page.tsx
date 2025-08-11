import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import UsersTable from "@/components/dashboard/UsersTable";
import { usersData } from "@/lib/data/users";

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600">Manage your application users and their permissions</p>
          </div>
          <UsersTable users={usersData} />
        </main>
      </div>
    </div>
  );
}
