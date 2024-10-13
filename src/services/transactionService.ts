import db from '../db/database';
import { Transaction } from '../types';

export const addTransaction = (userId: number, transaction: Omit<Transaction, 'id'>): Transaction => {
  const stmt = db.prepare(`
    INSERT INTO transactions (user_id, type, amount, category, account, date, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    userId,
    transaction.type,
    transaction.amount,
    transaction.category,
    transaction.account,
    transaction.date.toISOString(),
    transaction.description
  );
  return { ...transaction, id: info.lastInsertRowid.toString() };
};

export const getTransactions = (userId: number): Transaction[] => {
  const stmt = db.prepare('SELECT * FROM transactions WHERE user_id = ?');
  const transactions = stmt.all(userId);
  return transactions.map((t: any) => ({
    ...t,
    id: t.id.toString(),
    date: new Date(t.date),
  }));
};