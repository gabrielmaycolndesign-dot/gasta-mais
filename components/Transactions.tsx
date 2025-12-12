import React from 'react';
import { Transaction } from '../types';
import { Film, Music, Briefcase, Car, ShoppingCart, Coffee, Home, Zap, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';

interface TransactionsProps {
  data: Transaction[];
  onDelete: (id: string) => void;
}

const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('filme') || cat.includes('netflix')) return <Film size={18} />;
    if (cat.includes('música') || cat.includes('spotify')) return <Music size={18} />;
    if (cat.includes('trabalho') || cat.includes('renda')) return <Briefcase size={18} />;
    if (cat.includes('uber') || cat.includes('transporte')) return <Car size={18} />;
    if (cat.includes('mercado') || cat.includes('compras')) return <ShoppingCart size={18} />;
    if (cat.includes('aluguel') || cat.includes('casa')) return <Home size={18} />;
    if (cat.includes('luz') || cat.includes('contas')) return <Zap size={18} />;
    return <Coffee size={18} />;
}

export const Transactions: React.FC<TransactionsProps> = ({ data, onDelete }) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-textSecondary">
        <p>Nenhuma transação recente.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((tx) => (
        <div 
            key={tx.id} 
            className="group flex items-center justify-between p-3 hover:bg-white/5 rounded-2xl transition-all duration-300 relative"
        >
          <div className="flex items-center gap-4">
            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${tx.type === 'income' 
                  ? 'bg-[#4CC9F0]/20 text-[#4CC9F0]' 
                  : 'bg-[#F75C03]/20 text-[#F75C03]'}
            `}>
                {getIcon(tx.category)}
            </div>
            <div>
              <p className="text-white font-medium text-sm">{tx.name}</p>
              <p className="text-textSecondary text-xs">{tx.category} • {tx.date}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`font-semibold ${tx.type === 'income' ? 'text-[#4CC9F0]' : 'text-white'}`}>
              {tx.type === 'income' ? '+' : '-'} R$ {Math.abs(tx.amount).toFixed(2)}
            </div>
            
            {/* Delete Button (Visible on Group Hover) */}
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(tx.id); }}
              className="opacity-0 group-hover:opacity-100 p-2 text-textSecondary hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
              title="Excluir"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};