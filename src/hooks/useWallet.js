import { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';

export const useWallet = () => {
  const { state, dispatch } = useContext(WalletContext);
  const { transactions } = state;

  const totalIncome = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return {
    transactions,
    totalIncome,
    totalExpense,
    balance,
    dispatch,
    isLoading: state.isLoading
  };
};