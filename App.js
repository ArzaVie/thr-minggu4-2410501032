import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WalletProvider } from './src/context/WalletContext';
import DashboardScreen from './src/screens/DashboardScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WalletProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'THR Manager' }} />
          <Stack.Screen name="AddTransaction" component={AddTransactionScreen} options={{ title: 'Tambah Catatan' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </WalletProvider>
  );
}