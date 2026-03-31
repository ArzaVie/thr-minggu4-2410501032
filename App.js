import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WalletProvider } from './src/context/WalletContext';
import DashboardScreen from './src/screens/DashboardScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import * as Font from 'expo-font';
import { PlusJakartaSans_500Medium, PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontLoaded] = Font.useFonts({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }
  return (
    <WalletProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Saku THR' }} />
          <Stack.Screen name="AddTransaction" component={AddTransactionScreen} options={{ title: 'Tambah Catatan' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </WalletProvider>
  );
}