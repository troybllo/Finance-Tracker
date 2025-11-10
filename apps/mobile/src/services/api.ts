import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

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
