import React from 'react';
import { Search, Bell, User, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { StatisticsChart } from './Charts';
import { Transactions } from './Transactions';
import { Transaction } from '../types';

interface MainContentProps {
  user: string;
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export const MainContent: React.FC<MainContentProps> = ({ user, transactions, onDeleteTransaction }) => {
  
  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 flex flex-col gap-8 no-scrollbar relative z-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Olá, {user.split(' ')[0]}! 👋</h1>
          <p className="text-textSecondary text-sm mt-1">Visão geral das suas finanças.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-textSecondary/50 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button className="p-2.5 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border border-[#120E24]"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
            <div className="w-full h-full rounded-full bg-[#120E24] flex items-center justify-center overflow-hidden">
                <User className="text-white w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Summary Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-[#7F56D9] to-[#3C096C] shadow-[0_0_20px_rgba(127,86,217,0.3)] group transform transition-all hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Wallet size={100} />
          </div>
          <div className="relative z-10">
            <p className="text-white/70 text-sm font-medium tracking-wider mb-2">SALDO TOTAL</p>
            <h3 className="text-3xl font-bold text-white mb-4">{formatCurrency(balance)}</h3>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-xs text-white backdrop-blur-sm">
              <span>Atualizado agora</span>
            </div>
          </div>
        </div>

        {/* Income Card */}
        <GlassCard className="relative group hover:border-[#4CC9F0]/50 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium tracking-wider mb-1">RECEITAS</p>
              <h3 className="text-2xl font-bold text-[#4CC9F0]">{formatCurrency(totalIncome)}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#4CC9F0]/10 flex items-center justify-center text-[#4CC9F0]">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mt-4 w-full bg-white/5 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-[#4CC9F0] w-3/4 rounded-full shadow-[0_0_10px_#4CC9F0]"></div>
          </div>
        </GlassCard>

        {/* Expense Card */}
        <GlassCard className="relative group hover:border-[#F75C03]/50 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium tracking-wider mb-1">DESPESAS</p>
              <h3 className="text-2xl font-bold text-[#F75C03]">{formatCurrency(totalExpense)}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F75C03]/10 flex items-center justify-center text-[#F75C03]">
              <TrendingDown size={20} />
            </div>
          </div>
          <div className="mt-4 w-full bg-white/5 rounded-full h-1 overflow-hidden">
             {/* Width calculation purely for visual effect */}
            <div className="h-full bg-[#F75C03] w-1/4 rounded-full shadow-[0_0_10px_#F75C03]"></div>
          </div>
        </GlassCard>
      </section>

      {/* Charts & Transactions Split */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
            <GlassCard className="h-full min-h-[350px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-white">Evolução do Saldo</h2>
                    <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-textSecondary outline-none">
                        <option>Semanal</option>
                        <option>Mensal</option>
                    </select>
                </div>
                <StatisticsChart transactions={transactions} />
            </GlassCard>
        </div>
        
        <div className="lg:col-span-1">
            <GlassCard className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-white">Últimas Transações</h2>
                    <button className="text-xs text-primary hover:text-white transition-colors">Ver Tudo</button>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                   <Transactions data={transactions} onDelete={onDeleteTransaction} />
                </div>
            </GlassCard>
        </div>
      </section>
    </main>
  );
};