import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { description: string; amount: number; type: 'income' | 'expense'; category: string }) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Outros');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    
    onSave({
      description,
      amount: parseFloat(amount),
      type,
      category
    });
    
    // Reset and close
    setDescription('');
    setAmount('');
    setType('expense');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <GlassCard className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-300 border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Nova Transação</h2>
          <button onClick={onClose} className="text-textSecondary hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`py-2 rounded-lg text-sm font-semibold transition-all ${type === 'expense' ? 'bg-[#F75C03] text-white shadow-lg' : 'text-textSecondary hover:text-white'}`}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`py-2 rounded-lg text-sm font-semibold transition-all ${type === 'income' ? 'bg-[#4CC9F0] text-black shadow-lg' : 'text-textSecondary hover:text-white'}`}
            >
              Receita
            </button>
          </div>

          <div>
            <label className="text-xs text-textSecondary mb-1 block">Descrição</label>
            <input 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
              placeholder="Ex: Aluguel, Salário..."
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-textSecondary mb-1 block">Valor (R$)</label>
              <input 
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-xs text-textSecondary mb-1 block">Categoria</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary appearance-none"
              >
                <option className="bg-[#1A1333]">Alimentação</option>
                <option className="bg-[#1A1333]">Transporte</option>
                <option className="bg-[#1A1333]">Lazer</option>
                <option className="bg-[#1A1333]">Contas</option>
                <option className="bg-[#1A1333]">Renda</option>
                <option className="bg-[#1A1333]">Outros</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(127,86,217,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Check size={18} /> Salvar Transação
          </button>
        </form>
      </GlassCard>
    </div>
  );
};