import React, { useMemo, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type { Expense } from '../types';
import ExpenseItem from '../components/ExpenseItem';

type SortKey = 'date' | 'category';
type SortDir = 'asc' | 'desc';

const SAMPLE_EXPENSES: Expense[] = [
  { id: '1', category: 'Food', amount: 50.0, date: '2025-08-15' },
  { id: '2', category: 'Transport', amount: 25.5, date: '2025-08-14' },
  { id: '3', category: 'Utilities', amount: 75.2, date: '2025-08-13' },
  { id: '4', category: 'Entertainment', amount: 30.0, date: '2025-08-12' },
  { id: '5', category: 'Shopping', amount: 120.0, date: '2025-08-11' },
  { id: '6', category: 'Food', amount: 18.99, date: '2025-08-15' },
  { id: '7', category: 'Bills', amount: 90.0, date: '2025-08-10' },
  { id: '8', category: 'Groceries', amount: 62.3, date: '2025-08-14' },
  { id: '9', category: 'Health', amount: 45.0, date: '2025-08-09' },
  { id: '10', category: 'Transport', amount: 12.75, date: '2025-08-15' },
];

const ExpenseList = () => {
  const [expenses] = useState<Expense[]>(SAMPLE_EXPENSES);
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  // When expenses, sortKey, sortDir any of these values changes it will render UI Component
  const sortedExpenses = useMemo(() => {
    const copy = [...expenses];
    copy.sort((a, b) => {
      let cmp = 0;

      if (sortKey === 'date') {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();
        cmp = aTime - bTime;
      } else if (sortKey === 'category') {
        cmp = a.category.localeCompare(b.category, undefined, {
          sensitivity: 'base',
        });
      }

      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [expenses, sortKey, sortDir]);

  const toggleSortKey = useCallback((key: SortKey) => {
    setSortKey(prev => (prev === key ? prev : key));
  }, []);

  const toggleDirection = useCallback(() => {
    setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Expense }) => (
      <ExpenseItem
        category={item.category}
        amount={item.amount}
        date={item.date}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Expense) => item.id, []);

  const ItemSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );
  const ListEmpty = useCallback(
    () => <Text style={styles.empty}>No expenses found.</Text>,
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.title}>Expenses</Text>
        <View style={styles.sortRow}>
          <TouchableOpacity
            style={[styles.chip, sortKey === 'date' && styles.chipActive]}
            onPress={() => toggleSortKey('date')}
          >
            <Text style={styles.chipText}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.chip, sortKey === 'category' && styles.chipActive]}
            onPress={() => toggleSortKey('category')}
          >
            <Text style={styles.chipText}>Category</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dirBtn} onPress={toggleDirection}>
            <Text style={styles.dirText}>{sortDir === 'asc' ? '▲' : '▼'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sortedExpenses}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={
          sortedExpenses.length === 0 && styles.emptyContainer
        }
        initialNumToRender={10}
        maxToRenderPerBatch={15}
        windowSize={10}
        showsVerticalScrollIndicator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7F9' },
  toolbar: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E2E6EA',
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  sortRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD3DC',
    backgroundColor: '#FFF',
  },
  chipActive: { backgroundColor: '#E7F0FF', borderColor: '#A7C4FF' },
  chipText: { fontWeight: '600' },
  dirBtn: { marginLeft: 'auto', paddingHorizontal: 10, paddingVertical: 6 },
  dirText: { fontSize: 16, fontWeight: '700' },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: '#E5E7EB' },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: { opacity: 0.6 },
});

export default ExpenseList;
