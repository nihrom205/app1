export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Moderator";
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
  lastLogin: string;
};

export const usersData: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2024-01-15",
    lastLogin: "2024-12-19 14:30",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "Active",
    joinDate: "2024-02-20",
    lastLogin: "2024-12-19 12:15",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Moderator",
    status: "Active",
    joinDate: "2024-03-10",
    lastLogin: "2024-12-18 16:45",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "User",
    status: "Inactive",
    joinDate: "2024-01-25",
    lastLogin: "2024-12-10 09:20",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "User",
    status: "Pending",
    joinDate: "2024-12-15",
    lastLogin: "Never",
  },
  {
    id: "6",
    name: "Lisa Davis",
    email: "lisa.davis@example.com",
    role: "Moderator",
    status: "Active",
    joinDate: "2024-02-05",
    lastLogin: "2024-12-19 10:30",
  },
  {
    id: "7",
    name: "Tom Miller",
    email: "tom.miller@example.com",
    role: "User",
    status: "Active",
    joinDate: "2024-04-12",
    lastLogin: "2024-12-18 20:15",
  },
  {
    id: "8",
    name: "Emma Garcia",
    email: "emma.garcia@example.com",
    role: "User",
    status: "Inactive",
    joinDate: "2024-01-30",
    lastLogin: "2024-12-05 14:45",
  },
];
