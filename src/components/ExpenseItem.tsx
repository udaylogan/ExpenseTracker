import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Expense } from '../types';

type Props = Pick<Expense, 'category' | 'amount' | 'date'>;

const ExpenseItemBase: React.FC<Props> = ({ category, amount, date }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.left}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>
    </View>
  );
};

const formatDate = (iso: string) => {
  // Simple pretty date; customize as needed
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString();
};

// Only re-render if these fields change
const ExpenseItem = React.memo(
  ExpenseItemBase,
  (prev, next) =>
    prev.category === next.category &&
    prev.amount === next.amount &&
    prev.date === next.date,
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  left: { flexDirection: 'column', maxWidth: '70%' },
  category: { fontSize: 16, fontWeight: '600' },
  date: { marginTop: 2, fontSize: 12, opacity: 0.7 },
  amount: { fontSize: 16, fontWeight: '700' },
});

export default ExpenseItem;
