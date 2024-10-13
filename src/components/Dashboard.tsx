import React from 'react';
import { Transaction, AccountType } from '../types';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
  accounts: AccountType[];
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, accounts }) => {
  const totalBalance = transactions.reduce((sum, transaction) => {
    return transaction.type === 'income' ? sum + transaction.amount : sum - transaction.amount;
  }, 0);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center">
          <DollarSign className="h-10 w-10 text-white mr-3" />
          <div>
            <p className="text-sm text-blue-100 uppercase">Total Balance</p>
            <p className="text-3xl font-bold text-white">${totalBalance.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center">
          <TrendingUp className="h-10 w-10 text-white mr-3" />
          <div>
            <p className="text-sm text-green-100 uppercase">Total Income</p>
            <p className="text-3xl font-bold text-white">${totalIncome.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-red-400 to-red-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center">
          <TrendingDown className="h-10 w-10 text-white mr-3" />
          <div>
            <p className="text-sm text-red-100 uppercase">Total Expenses</p>
            <p className="text-3xl font-bold text-white">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;