import { CreditCardData, Goal, Transaction } from './types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', name: 'Freelance Upwork', category: 'Renda', date: '2023-10-24', amount: 850.00, type: 'income', icon: 'briefcase' },
  { id: '2', name: 'Assinatura Netflix', category: 'Entretenimento', date: '2023-10-24', amount: 14.99, type: 'expense', icon: 'film' },
  { id: '3', name: 'Spotify Premium', category: 'Música', date: '2023-10-23', amount: 9.99, type: 'expense', icon: 'music' },
  { id: '4', name: 'Supermercado', category: 'Alimentação', date: '2023-10-20', amount: 112.30, type: 'expense', icon: 'shopping-cart' },
];

export const CARDS: CreditCardData[] = [
  { id: '1', balance: 12450.50, number: '**** **** **** 4582', expiry: '12/25', type: 'Mastercard', theme: 'purple' },
  { id: '2', balance: 3400.00, number: '**** **** **** 1923', expiry: '09/24', type: 'Visa', theme: 'magenta' },
  { id: '3', balance: 890.25, number: '**** **** **** 9911', expiry: '11/26', type: 'Visa', theme: 'teal' },
];

export const GOALS: Goal[] = [
  { id: '1', name: 'Novo MacBook Pro', target: 12500, current: 4800, color: '#F72585' },
  { id: '2', name: 'Viagem de Férias', target: 5000, current: 1200, color: '#4CC9F0' },
  { id: '3', name: 'Reserva de Emergência', target: 20000, current: 6500, color: '#7F56D9' },
];