import React, { useState } from 'react';
import { Transaction, TransactionType, IncomeCategory, ExpenseCategory, AccountType } from '../types';
import { addTransaction } from '../services/transactionService';

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
  accounts: AccountType[];
  userId: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction, accounts, userId }) => {
  // ... (keep the existing state variables)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Omit<Transaction, 'id'> = {
      type,
      amount: parseFloat(amount),
      category,
      account,
      date: new Date(date),
      description,
    };
    const addedTransaction = addTransaction(userId, newTransaction);
    onAddTransaction(addedTransaction);
    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  // ... (keep the rest of the component code)
};

export default TransactionForm;