import React, { useCallback, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useExpenses, useDeleteExpense } from '../data/queries';
import { ExpenseRow } from '../components/ExpenseRow';
import { SortBar } from '../components/SortBar';
import type { Expense, SortBy, SortOrder } from '../types';

interface NavProps {
  navigation: { navigate: (screen: string, params?: any) => void };
}

const keyExtractor = (item: Expense) => item.id;

const sorters: Record<SortBy, (a: Expense, b: Expense) => number> = {
  date: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  category: (a, b) => a.category.localeCompare(b.category),
};

const HomeScreen: React.FC<NavProps> = ({ navigation }) => {
  const { data = [], isLoading } = useExpenses();
  const del = useDeleteExpense();
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sorted = useMemo(() => {
    const copy = [...data];
    copy.sort(sorters[sortBy]);
    if (sortOrder === 'desc') copy.reverse();
    return copy;
  }, [data, sortBy, sortOrder]);

  const onEdit = useCallback(
    (e: Expense) => navigation.navigate('AddEdit', { expense: e }),
    [navigation],
  );
  const onDelete = useCallback((id: string) => del.mutate(id), [del]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddEdit')}
        >
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <SortBar
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
      />

      {isLoading ? (
        <View style={styles.center}>
          <Text>Loading…</Text>
        </View>
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <ExpenseRow item={item} onEdit={onEdit} onDelete={onDelete} />
          )}
          contentContainerStyle={sorted.length === 0 ? { flex: 1 } : undefined}
          ListEmptyComponent={() => (
            <View style={styles.center}>
              <Text>No expenses yet. Tap “+ Add”.</Text>
            </View>
          )}
          removeClippedSubviews
          windowSize={10}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: { fontSize: 24, fontWeight: '700' },
  addBtn: {
    backgroundColor: '#111827',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addBtnText: { color: '#fff', fontWeight: '600' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default React.memo(HomeScreen);
