import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WalletContext = createContext();

const initialState = {
  transactions: [],
  isLoading: true,
};

const walletReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, transactions: action.payload, isLoading: false };
    case 'ADD_INCOME':
    case 'ADD_EXPENSE':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    default:
      return state;
  }
};

export const WalletProvider = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  // Load data awal
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('@thr_data');
        if (savedData) {
          dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) });
        } else {
          dispatch({ type: 'LOAD_DATA', payload: [] });
        }
      } catch (e) {
        console.error("Failed to load data", e);
      }
    };
    loadData();
  }, []);

  // Save data setiap kali ada perubahan transactions
  useEffect(() => {
    if (!state.isLoading) {
      AsyncStorage.setItem('@thr_data', JSON.stringify(state.transactions));
    }
  }, [state.transactions]);

  return (
    <WalletContext.Provider value={{ state, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};