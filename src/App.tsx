import React, { useState, useEffect } from 'react';
import { Transaction, AccountType } from './types';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import MonthlyExpenseChart from './components/MonthlyExpenseChart';
import IncomeVsExpenseChart from './components/IncomeVsExpenseChart';
import AccountBalanceChart from './components/AccountBalanceChart';
import CollapsibleCard from './components/CollapsibleCard';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import { getTransactions } from './services/transactionService';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const accounts: AccountType[] = ['Bank Account', 'Credit Card', 'Cash', 'Savings', 'Investment'];

  useEffect(() => {
    if (user) {
      const fetchTransactions = async () => {
        const userTransactions = await getTransactions(user.id);
        setTransactions(userTransactions);
      };
      fetchTransactions();
    }
  }, [user]);

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <Login setUser={setUser} />
        <Register />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Finance Tracker</h1>
        <UserProfile user={user} setUser={setUser} />
        <Dashboard transactions={transactions} accounts={accounts} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <CollapsibleCard title="Monthly Expenses">
            <MonthlyExpenseChart transactions={transactions} />
          </CollapsibleCard>
          <CollapsibleCard title="Income vs Expenses">
            <IncomeVsExpenseChart transactions={transactions} />
          </CollapsibleCard>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <CollapsibleCard title="Account Balances">
            <AccountBalanceChart transactions={transactions} accounts={accounts} />
          </CollapsibleCard>
          <CollapsibleCard title="Add Transaction">
            <TransactionForm onAddTransaction={handleAddTransaction} accounts={accounts} userId={user.id} />
          </CollapsibleCard>
        </div>
        <CollapsibleCard title="Transaction History">
          <TransactionList transactions={transactions} />
        </CollapsibleCard>
      </div>
    </div>
  );
};

export default App;