export interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  icon: string;
}

export interface ChartData {
  name: string;
  income: number;
  expense: number;
}

export interface CreditCardData {
  id: string;
  balance: number;
  number: string;
  expiry: string;
  type: 'Visa' | 'Mastercard';
  theme: 'purple' | 'magenta' | 'teal';
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  color: string;
}