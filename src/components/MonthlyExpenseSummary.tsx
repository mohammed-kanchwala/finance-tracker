import React from 'react';
import { Transaction, ExpenseCategory } from '../types';

interface MonthlyExpenseSummaryProps {
  transactions: Transaction[];
}

const MonthlyExpenseSummary: React.FC<MonthlyExpenseSummaryProps> = ({ transactions }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = transactions.filter(
    (t) => t.type === 'expense' && t.date.getMonth() === currentMonth && t.date.getFullYear() === currentYear
  );

  const expensesByCategory: Record<ExpenseCategory, number> = {
    Groceries: 0,
    Apparel: 0,
    Transport: 0,
    Other: 0,
  };

  monthlyExpenses.forEach((expense) => {
    expensesByCategory[expense.category as ExpenseCategory] += expense.amount;
  });

  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Monthly Expense Summary</h2>
      <div className="space-y-2">
        {Object.entries(expensesByCategory).map(([category, amount]) => (
          <div key={category} className="flex justify-between items-center">
            <span>{category}</span>
            <span className="font-semibold">${amount.toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between items-center font-bold">
            <span>Total</span>
            <span>${totalExpenses.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpenseSummary;