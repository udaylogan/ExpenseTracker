import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './src/navigation';

export type RootStackParamList = {
  List: undefined;
  AddEdit: { expense?: any } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => <AppNavigator />;

export default App;
