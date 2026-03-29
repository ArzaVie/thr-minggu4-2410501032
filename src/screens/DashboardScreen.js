import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Wallet, ArrowUpCircle, ArrowDownCircle, Trash2 } from 'lucide-react-native';
import { useWallet } from '../hooks/useWallet';
import { Theme } from '../theme';
import TransactionItem from '../components/TransactionItem';

export default function DashboardScreen({ navigation }) {
  const { transactions, totalIncome, totalExpense, balance, dispatch } = useWallet();
  const [filter, setFilter] = useState('ALL');

  const filteredData = transactions.filter(t => {
    if (filter === 'INCOME') return t.type === 'INCOME';
    if (filter === 'EXPENSE') return t.type === 'EXPENSE';
    return true;
  });

  const HeaderCard = () => (
    <LinearGradient
      colors={[Theme.primary, '#145A25']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerCard}
    >
      <View style={styles.patternOverlay} />
      <Text style={styles.labelBalance}>Sisa Saldo THR</Text>
      <Text style={styles.mainBalance}>Rp {balance.toLocaleString('id-ID')}</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ArrowUpCircle color={Theme.success} size={20} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.statLabel}>Pemasukan</Text>
            <Text style={styles.statValue}>+ {totalIncome.toLocaleString('id-ID')}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <ArrowDownCircle color={Theme.danger} size={20} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.statLabel}>Pengeluaran</Text>
            <Text style={styles.statValue}>- {totalExpense.toLocaleString('id-ID')}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredData}
        ListHeaderComponent={
          <>
            <HeaderCard />
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>
              <View style={styles.filterPills}>
                {['ALL', 'INCOME', 'EXPENSE'].map((f) => (
                  <TouchableOpacity 
                    key={f} 
                    onPress={() => setFilter(f)}
                    style={[styles.pill, filter === f && styles.activePill]}
                  >
                    <Text style={[styles.pillText, filter === f && styles.activePillText]}>{f}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={(id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id })} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <LinearGradient colors={[Theme.secondary, '#B8860B']} style={styles.fabGradient}>
          <Plus color="#fff" size={30} strokeWidth={2.5} />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.background },
  headerCard: {
    margin: 20,
    padding: 24,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: Theme.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  labelBalance: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'PlusJakartaSans_500Medium' },
  mainBalance: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginVertical: 8, letterSpacing: -1 },
  statsRow: { flexDirection: 'row', marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
  statValue: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  divider: { width: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 15 },
  filterSection: { paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Theme.textPrimary, marginBottom: 15 },
  filterPills: { flexDirection: 'row' },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 10, borderWidth: 1, borderColor: '#eee' },
  activePill: { backgroundColor: Theme.primary, borderColor: Theme.primary },
  pillText: { fontSize: 12, color: Theme.textSecondary, fontWeight: '600' },
  activePillText: { color: '#fff' },
  fab: { position: 'absolute', bottom: 30, right: 30, elevation: 5 },
  fabGradient: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }
});