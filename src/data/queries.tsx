import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as db from './localDB';
import type { Expense } from '../types';

const qk = {
  all: ['expenses'] as const,
};

export function useExpenses() {
  return useQuery({
    queryKey: qk.all,
    queryFn: db.readAll,
    staleTime: Infinity,
  });
}

export function useAddExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (e: Expense) => db.addOne(e),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.all }),
  });
}

export function useUpdateExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<Expense> }) =>
      db.updateOne(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.all }),
  });
}

export function useDeleteExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => db.removeOne(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.all }),
  });
}
