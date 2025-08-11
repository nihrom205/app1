import type { User } from "@/lib/data/users";

// Используем относительный путь, т.к. настроен proxy rewrite в next.config.ts
const API_BASE_URL = "/api/v1";

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: User["role"];
  status: User["status"];
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: string;
}

export class UsersService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const method = (options.method || "GET").toUpperCase();
      const isGetLike = method === "GET" || method === "HEAD";

      const response = await fetch(url, {
        // Для GET/HEAD не указываем Content-Type, чтобы избежать CORS preflight
        headers: {
          ...(isGetLike
            ? { Accept: "application/json" }
            : { "Content-Type": "application/json", Accept: "application/json" }),
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 204 No Content или пустой ответ
      const contentLength = response.headers.get("content-length");
      if (response.status === 204 || contentLength === "0") {
        return undefined as unknown as T;
      }

      // Некоторые бэки могут не ставить content-length корректно, пробуем безопасно
      const text = await response.text();
      if (!text) return undefined as unknown as T;
      return JSON.parse(text) as T;
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      throw error;
    }
  }

  // Возвращает список пользователей с сервера (GET /users), оборачивает в UsersResponse
  static async getUsers(): Promise<UsersResponse> {
    const result = await this.request<unknown>("/users");
    // Бэк может вернуть: User[], { users }, { data }, { items }
    if (Array.isArray(result)) {
      const users = result as User[];
      return { users, total: users.length, page: 1, limit: users.length };
    }
    const obj = (result || {}) as Record<string, unknown>;
    const users = (obj.users || obj.data || obj.items) as User[] | undefined;
    if (Array.isArray(users)) {
      return {
        users,
        total: (obj.total as number) ?? users.length,
        page: (obj.page as number) ?? 1,
        limit: (obj.limit as number) ?? users.length,
      };
    }
    return { users: [], total: 0, page: 1, limit: 0 };
  }

  static async getUserById(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  static async createUser(userData: CreateUserRequest): Promise<User> {
    return this.request<User>("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  static async updateUser(userData: UpdateUserRequest): Promise<User> {
    return this.request<User>(`/users/${userData.id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  static async deleteUser(id: string): Promise<void> {
    return this.request<void>(`/users/${id}`, {
      method: "DELETE",
    });
  }
}
