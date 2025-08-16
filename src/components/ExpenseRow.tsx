import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { Expense } from '../types';
import { formatCurrency, formatDate } from '../utils/format';

interface Props {
  item: Expense;
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseRowBase: React.FC<Props> = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>
          {item.category} • {formatDate(item.date)}
        </Text>
        {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
      </View>
      <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.btn} onPress={() => onEdit(item)}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.del]}
            onPress={() => onDelete(item.id)}
          >
            <Text style={[styles.btnText, styles.delText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const ExpenseRow = React.memo(ExpenseRowBase);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  meta: { color: '#6B7280' },
  note: { marginTop: 4, color: '#374151' },
  amount: { fontWeight: '700' },
  btn: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  btnText: { color: '#1E3A8A', fontWeight: '700' },
  del: { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' },
  delText: { color: '#991B1B' },
});
