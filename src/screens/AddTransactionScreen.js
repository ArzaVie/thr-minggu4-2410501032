import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text } from 'react-native';
import { useWallet } from '../hooks/useWallet';

export default function AddTransactionScreen({ navigation }) {
  const { dispatch } = useWallet();
  
  // Minimal 3 State Lokal sesuai spesifikasi
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isIncome, setIsIncome] = useState(true);

  const handleSave = () => {
    if (!name || !amount) return alert("Isi semua field!");

    const newTransaction = {
      id: Date.now().toString(),
      name,
      amount: parseInt(amount),
      type: isIncome ? 'INCOME' : 'EXPENSE',
      category: isIncome ? 'THR' : 'Belanja/Sedekah',
      date: new Date().toLocaleDateString(),
    };

    dispatch({ 
      type: isIncome ? 'ADD_INCOME' : 'ADD_EXPENSE', 
      payload: newTransaction 
    });
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Nama Transaksi (e.g. Dari Paman)" 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        placeholder="Jumlah (Rp)" 
        style={styles.input} 
        keyboardType="numeric" 
        value={amount} 
        onChangeText={setAmount} 
      />
      
      <View style={styles.switchRow}>
        <Text>{isIncome ? "Pemasukan (THR)" : "Pengeluaran"}</Text>
        <Switch value={isIncome} onValueChange={setIsIncome} />
      </View>

      <Button title="Simpan Transaksi" onPress={handleSave} color="#2ecc71" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }
});