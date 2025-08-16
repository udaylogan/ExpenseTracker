import {
  createSlice,
  PayloadAction,
  nanoid,
  createSelector,
} from '@reduxjs/toolkit';
import type { Expense, Category } from '../types';
import { RootState } from './store';

interface ExpensesState {
  items: Expense[];
}

const initialState: ExpensesState = {
  items: [],
};

interface AddExpensePayload {
  title: string;
  amount: number;
  category: Category;
  date?: string; // if omitted, use now
  note?: string;
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<AddExpensePayload>) => {
      const { title, amount, category, date, note } = action.payload;
      state.items.unshift({
        id: nanoid(),
        title: title.trim(),
        amount: Number(amount),
        category,
        date: date ?? new Date().toISOString(),
        note: note?.trim() || undefined,
      });
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(e => e.id !== action.payload);
    },
    clearAll: state => {
      state.items = [];
    },
  },
});

export const { addExpense, deleteExpense, clearAll } = expensesSlice.actions;
export default expensesSlice.reducer;

// Selectors
export const selectAllExpenses = (state: RootState) => state.expenses.items;
export const makeSelectByCategory = (category?: Category) =>
  createSelector([selectAllExpenses], items =>
    category ? items.filter(e => e.category === category) : items,
  );
