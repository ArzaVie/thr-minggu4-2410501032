import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useWallet } from '../hooks/useWallet';
import TransactionItem from '../components/TransactionItem';

export default function DashboardScreen({ navigation }) {
  const { transactions, totalIncome, totalExpense, balance, dispatch } = useWallet();
  const [filter, setFilter] = useState('ALL'); // State lokal untuk filter

  const filteredData = transactions.filter(t => {
    if (filter === 'INCOME') return t.type === 'INCOME';
    if (filter === 'EXPENSE') return t.type === 'EXPENSE';
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.balanceTitle}>Sisa Saldo THR</Text>
        <Text style={styles.balanceValue}>Rp {balance.toLocaleString()}</Text>
        <View style={styles.row}>
          <Text style={{ color: '#fff' }}>Masuk: Rp {totalIncome.toLocaleString()}</Text>
          <Text style={{ color: '#fff' }}>Keluar: Rp {totalExpense.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        {['ALL', 'INCOME', 'EXPENSE'].map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.filterBtn, filter === f && styles.activeFilter]}>
            <Text style={{ color: filter === f ? '#fff' : '#000' }}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={(id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id })} />
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Belum ada transaksi</Text>}
      />
      
      <Button title="Tambah Transaksi" onPress={() => navigation.navigate('AddTransaction')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f6fa' },
  header: { backgroundColor: '#2c3e50', padding: 20, borderRadius: 15, marginBottom: 20 },
  balanceTitle: { color: '#bdc3c7', fontSize: 14 },
  balanceValue: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  filterBtn: { padding: 8, borderRadius: 5, backgroundColor: '#dcdde1' },
  activeFilter: { backgroundColor: '#3498db' }
});