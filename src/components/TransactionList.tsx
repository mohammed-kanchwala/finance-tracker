import React from 'react';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Account</th>
              <th className="py-3 px-6 text-right">Amount</th>
              <th className="py-3 px-6 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {transaction.date.toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`${
                      transaction.type === 'income' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'
                    } py-1 px-3 rounded-full text-xs`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{transaction.category}</td>
                <td className="py-3 px-6 text-left">{transaction.account}</td>
                <td className="py-3 px-6 text-right">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="py-3 px-6 text-left">{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;