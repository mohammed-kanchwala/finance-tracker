import React from 'react';
import { Transaction, ExpenseCategory } from '../types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MonthlyExpenseChartProps {
  transactions: Transaction[];
}

const MonthlyExpenseChart: React.FC<MonthlyExpenseChartProps> = ({ transactions }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = transactions.filter(
    (t) => t.type === 'expense' && t.date.getMonth() === currentMonth && t.date.getFullYear() === currentYear
  );

  const expensesByCategory: Record<ExpenseCategory, number> = {
    Housing: 0,
    Groceries: 0,
    Utilities: 0,
    Transportation: 0,
    Healthcare: 0,
    Entertainment: 0,
    Dining: 0,
    Shopping: 0,
    Education: 0,
    Travel: 0,
    Other: 0,
  };

  monthlyExpenses.forEach((expense) => {
    expensesByCategory[expense.category as ExpenseCategory] += expense.amount;
  });

  const data = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)',
          'rgba(40, 159, 64, 0.6)',
          'rgba(210, 105, 30, 0.6)',
          'rgba(128, 128, 128, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(40, 159, 64, 1)',
          'rgba(210, 105, 30, 1)',
          'rgba(128, 128, 128, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Monthly Expenses (${new Date().toLocaleString('default', { month: 'long' })})`,
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutBounce',
    },
  };

  return <Bar data={data} options={options} />;
};

export default MonthlyExpenseChart;