import axios from 'axios';

const API_URL = 'http://192.168.2.25:3000/api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

interface CategoryData {
  id: string;
  name: string;
}

interface ExpenseData {
  id: string;
  amount: string;
  currency: string;
  note?: string;
  date: string;
  categoryId: string;
  category: CategoryData;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface GetExpensesResponse {
  expenses: ExpenseData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface GetCategoriesResponse {
  categories: CategoryData[];
}

export const authAPI = {
  register: async ({
    name,
    email,
    password,
  }: RegisterData): Promise<AuthResponse> => {
    try {
      const { data } = await axios.post<AuthResponse>(
        `${API_URL}/auth/register`,
        {
          name,
          email,
          password,
        },
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  login: async ({ email, password }: LoginData): Promise<AuthResponse> => {
    try {
      const { data } = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  getMe: async (token: string): Promise<UserData> => {
    try {
      const { data } = await axios.get<UserData>(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export const expenseAPI = {
  getExpenses: async (
    token: string,
    params?: {
      page?: number;
      limit?: number;
      from?: string;
      to?: string;
      categoryId?: string;
    },
  ): Promise<GetExpensesResponse> => {
    const queryParams = new URLSearchParams(
      params as Record<string, string>,
    ).toString();

    const { data } = await axios.get(`${API_URL}/expenses?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  createExpense: async (
    token: string,
    expense: {
      amount: number;
      categoryId: string;
      date: string;
      note?: string;
    },
  ): Promise<ExpenseData> => {
    const { data } = await axios.post(`${API_URL}/expenses`, expense, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  updateExpense: async (
    token: string,
    id: string,
    expense: Partial<{
      amount: number;
      categoryId: string;
      date: string;
      note?: string;
    }>,
  ): Promise<ExpenseData> => {
    const { data } = await axios.put(`${API_URL}/expenses/${id}`, expense, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  deleteExpense: async (token: string, id: string) => {
    await axios.delete(`${API_URL}/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export const categoryAPI = {
  getCategories: async (token: string): Promise<GetCategoriesResponse> => {
    const { data } = await axios.get(`${API_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};
