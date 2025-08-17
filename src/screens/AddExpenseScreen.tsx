import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import type { Expense, Category } from '../types';
import { Picker } from '@react-native-picker/picker';
import { newId } from '../utils/id';
import { CATEGORIES } from '../constants/categories';
import { useAddExpense, useUpdateExpense } from '../data/queries';

interface RouteProps {
  route?: { params?: { expense?: Expense } };
  navigation: { goBack: () => void };
}

const AddExpenseScreen: React.FC<RouteProps> = ({ route, navigation }) => {
  const existing = route?.params?.expense;
  const isEdit = !!existing;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [amount, setAmount] = useState(existing ? String(existing.amount) : '');
  const [category, setCategory] = useState<Category>(
    existing?.category ?? 'Food',
  );
  const [note, setNote] = useState(existing?.note ?? '');

  const add = useAddExpense();
  const update = useUpdateExpense();

  useEffect(() => {
    // Optional: set screen title
  }, [isEdit]);

  const isValid = useMemo(
    () => title.trim().length > 0 && Number(amount) > 0,
    [title, amount],
  );

  const onSave = async () => {
    if (!isValid) {
      Alert.alert('Validation', 'Enter a title and a positive amount.');
      return;
    }
    const payload: Expense = {
      id: existing?.id ?? newId(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date: existing?.date ?? new Date().toISOString(),
      note: note.trim() || undefined,
    };
    if (isEdit) {
      await update.mutateAsync({ id: payload.id, patch: payload });
    } else {
      await add.mutateAsync(payload);
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Coffee"
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="e.g., 4.50"
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerWrap}>
          <Picker selectedValue={category} onValueChange={v => setCategory(v)}>
            {CATEGORIES.map(c => (
              <Picker.Item label={c} value={c} key={c} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Note (optional)</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={note}
          onChangeText={setNote}
          placeholder="e.g., Paid with card"
          multiline
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={onSave}
          disabled={!isValid}
        >
          <Text style={styles.saveBtnText}>
            {isEdit ? 'Save Changes' : 'Save Expense'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: {
    marginTop: 12,
    marginBottom: 6,
    color: '#374151',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: '#111827',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontWeight: '700' },
});

export default React.memo(AddExpenseScreen);
