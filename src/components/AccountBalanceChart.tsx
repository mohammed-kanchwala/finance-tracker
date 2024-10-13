import React from 'react';
import { Transaction, AccountType } from '../types';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AccountBalanceChartProps {
  transactions: Transaction[];
  accounts: AccountType[];
}

const AccountBalanceChart: React.FC<AccountBalanceChartProps> = ({ transactions, accounts }) => {
  const accountBalances: Record<AccountType, number> = accounts.reduce((acc, account) => {
    acc[account] = 0;
    return acc;
  }, {} as Record<AccountType, number>);

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      accountBalances[transaction.account] += transaction.amount;
    } else {
      accountBalances[transaction.account] -= transaction.amount;
    }
  });

  const data = {
    labels: accounts,
    datasets: [
      {
        data: accounts.map((account) => accountBalances[account]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
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
        text: 'Account Balances',
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeInOutCirc',
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default AccountBalanceChart;