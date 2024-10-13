import React from 'react';
import { Transaction } from '../types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IncomeVsExpenseChartProps {
  transactions: Transaction[];
}

const IncomeVsExpenseChart: React.FC<IncomeVsExpenseChartProps> = ({ transactions }) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const incomeByMonth = new Array(12).fill(0);
  const expensesByMonth = new Array(12).fill(0);

  transactions.forEach((transaction) => {
    const month = transaction.date.getMonth();
    if (transaction.type === 'income') {
      incomeByMonth[month] += transaction.amount;
    } else {
      expensesByMonth[month] += transaction.amount;
    }
  });

  const data = {
    labels: monthNames,
    datasets: [
      {
        label: 'Income',
        data: incomeByMonth,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Expenses',
        data: expensesByMonth,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1,
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
        text: 'Income vs Expenses (Monthly)',
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
  };

  return <Line data={data} options={options} />;
};

export default IncomeVsExpenseChart;