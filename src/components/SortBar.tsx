import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { SortBy, SortOrder } from '../types';

interface Props {
  sortBy: SortBy;
  sortOrder: SortOrder;
  setSortBy: (s: SortBy) => void;
  setSortOrder: (o: SortOrder) => void;
}

const SortBarBase: React.FC<Props> = ({
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.group}>
        <Text style={styles.label}>Sort by:</Text>
        <Chip
          label="Date"
          active={sortBy === 'date'}
          onPress={() => setSortBy('date')}
        />
        <Chip
          label="Category"
          active={sortBy === 'category'}
          onPress={() => setSortBy('category')}
        />
      </View>
      <View style={styles.group}>
        <Text style={styles.label}>Order:</Text>
        <Chip
          label="Asc"
          active={sortOrder === 'asc'}
          onPress={() => setSortOrder('asc')}
        />
        <Chip
          label="Desc"
          active={sortOrder === 'desc'}
          onPress={() => setSortOrder('desc')}
        />
      </View>
    </View>
  );
};

export const SortBar = React.memo(SortBarBase);

const Chip: React.FC<{
  label: string;
  active?: boolean;
  onPress: () => void;
}> = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, active && styles.chipActive]}
  >
    <Text style={[styles.chipText, active && styles.chipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  group: { flexDirection: 'row', alignItems: 'center' },
  label: { marginRight: 6, color: '#6B7280' },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
  },
  chipActive: { backgroundColor: '#111827', borderColor: '#111827' },
  chipText: { color: '#374151' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
});
