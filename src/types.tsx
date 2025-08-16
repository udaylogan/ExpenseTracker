export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Entertainment'
  | 'Health'
  | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // ISO timestamp
  note?: string;
}

export type SortBy = 'date' | 'category';
export type SortOrder = 'asc' | 'desc';
