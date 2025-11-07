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

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    password: string;
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
};
