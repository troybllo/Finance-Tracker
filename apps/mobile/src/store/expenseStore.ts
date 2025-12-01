import { create } from 'zustand';
import useAuthStore from './authStore';
import { expenseAPI } from '../services/api';

interface Category {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  amount: string;
  currency: string;
  note?: string;
  date: string;
  categoryId: string;
  category: Category;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ExpenseStore {
  expenses: Expense[];
  loading: boolean;
  error: string | null;

  fetchExpenses: (params?: {
    page?: number;
    limit?: number;
    from?: string;
    to?: string;
    categoryId?: string;
  }) => Promise<void>;
  createExpense: (expense: {
    amount: number;
    categoryId: string;
    date: string;
    note?: string;
    currency?: string;
  }) => Promise<void>;
  updateExpense: (
    id: string,
    expense: Partial<{
      amount: number;
      categoryId: string;
      date: string;
      note?: string;
      currency?: string;
    }>
  ) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  clearError: () => void;
}

const useExpenseStore = create<ExpenseStore>((set, get) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenses: async (params) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error('No token available');

      const data = await expenseAPI.getExpenses(token, params);
      set({ expenses: data.expenses, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch expenses', loading: false });
      console.error('Fetch expenses error:', error);
    }
  },

  createExpense: async (expense) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error('No token available');

      const newExpense = await expenseAPI.createExpense(token, expense);
      // Add new expense to the beginning of the array
      set({
        expenses: [newExpense, ...get().expenses],
        loading: false,
      });
    } catch (error) {
      set({ error: 'Failed to create expense', loading: false });
      console.error('Create expense error:', error);
      throw error;
    }
  },

  updateExpense: async (id, expense) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error('No token available');

      const updatedExpense = await expenseAPI.updateExpense(token, id, expense);
      // Replace the updated expense in the array
      set({
        expenses: get().expenses.map((e) =>
          e.id === id ? updatedExpense : e
        ),
        loading: false,
      });
    } catch (error) {
      set({ error: 'Failed to update expense', loading: false });
      console.error('Update expense error:', error);
      throw error;
    }
  },

  deleteExpense: async (id) => {
    set({ error: null });
    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error('No token available');

      await expenseAPI.deleteExpense(token, id);
      // Remove the expense from the array (optimistic update)
      set({ expenses: get().expenses.filter((e) => e.id !== id) });
    } catch (error) {
      set({ error: 'Failed to delete expense' });
      console.error('Delete expense error:', error);
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useExpenseStore;
