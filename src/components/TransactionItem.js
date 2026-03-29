import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TransactionItem = ({ item, onDelete }) => (
  <View style={styles.card}>
    <View>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.category}>{item.category} • {item.date}</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={[styles.amount, { color: item.type === 'INCOME' ? '#2ecc71' : '#e74c3c' }]}>
        {item.type === 'INCOME' ? '+' : '-'} Rp {item.amount.toLocaleString()}
      </Text>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={{ color: '#95a5a6', fontSize: 12, marginTop: 4 }}>Hapus</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 2,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  category: { color: '#7f8c8d', fontSize: 12 },
  amount: { fontWeight: 'bold', fontSize: 15 },
});

export default TransactionItem;