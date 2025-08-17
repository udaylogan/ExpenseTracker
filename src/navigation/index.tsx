import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      >
        <Stack.Screen
          name="List"
          component={HomeScreen}
          options={{ headerShown: true, title: 'Expenses' }}
        />
        <Stack.Screen
          name="AddEdit"
          component={AddExpenseScreen}
          options={{ title: 'Add / Edit Expense' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
