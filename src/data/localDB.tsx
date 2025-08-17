import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Expense } from '../types';
import { STORAGE_KEY } from '../constants/categories';

export async function readAll(): Promise<Expense[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Expense[];
  } catch {
    return [];
  }
}

async function writeAll(items: Expense[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function addOne(e: Expense): Promise<Expense> {
  const items = await readAll();
  const next = [e, ...items];
  await writeAll(next);
  return e;
}

export async function updateOne(
  id: string,
  patch: Partial<Expense>,
): Promise<Expense | null> {
  const items = await readAll();
  const idx = items.findIndex(x => x.id === id);
  if (idx === -1) return null;
  const updated = { ...items[idx], ...patch } as Expense;
  const next = [...items];
  next[idx] = updated;
  await writeAll(next);
  return updated;
}

export async function removeOne(id: string): Promise<boolean> {
  const items = await readAll();
  const next = items.filter(x => x.id !== id);
  const changed = next.length !== items.length;
  if (changed) await writeAll(next);
  return changed;
}
