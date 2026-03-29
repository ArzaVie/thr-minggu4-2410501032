import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../theme';
import { Trash2, Gift, ShoppingBag } from 'lucide-react-native';

const TransactionItem = ({ item, onDelete }) => (
  <View style={styles.container}>
    <View style={[styles.iconBox, { backgroundColor: item.type === 'INCOME' ? '#E8F5E9' : '#FDECEA' }]}>
      {item.type === 'INCOME' ? 
        <Gift color={Theme.success} size={20} /> : 
        <ShoppingBag color={Theme.danger} size={20} />
      }
    </View>
    
    <View style={styles.details}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>

    <View style={styles.amountBox}>
      <Text style={[styles.amount, { color: item.type === 'INCOME' ? Theme.success : Theme.danger }]}>
        {item.type === 'INCOME' ? '+' : '-'} Rp {item.amount.toLocaleString('id-ID')}
      </Text>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Trash2 size={14} color="#BDC3C7" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  details: { flex: 1, marginLeft: 15 },
  name: { fontSize: 15, fontWeight: 'bold', color: Theme.textPrimary },
  date: { fontSize: 12, color: '#95A5A6', marginTop: 2 },
  amountBox: { alignItems: 'flex-end' },
  amount: { fontSize: 15, fontWeight: '700' },
  deleteBtn: { marginTop: 5 }
});

export default TransactionItem;