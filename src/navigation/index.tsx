import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpenseList from '../screens/ExpenseList';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ExpenseList"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      >
        <Stack.Screen
          name="ExpenseList"
          component={ExpenseList}
          options={{ headerShown: true, headerTitle: 'Expenses' }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
