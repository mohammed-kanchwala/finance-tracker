export type TransactionType = 'income' | 'expense';

export type IncomeCategory = 'Salary' | 'Investment' | 'Freelance' | 'Rental' | 'Gift' | 'Other';
export type ExpenseCategory = 'Housing' | 'Groceries' | 'Utilities' | 'Transportation' | 'Healthcare' | 'Entertainment' | 'Dining' | 'Shopping' | 'Education' | 'Travel' | 'Other';

export type AccountType = 'Bank Account' | 'Credit Card' | 'Cash' | 'Savings' | 'Investment';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: IncomeCategory | ExpenseCategory;
  account: AccountType;
  date: Date;
  description: string;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
}