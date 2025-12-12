import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { SpendingDonut } from './Charts';
import { GOALS } from '../constants';
import { ArrowRightLeft, Gift } from 'lucide-react';

export const RightPanel: React.FC = () => {
  return (
    <aside className="hidden xl:flex flex-col w-[320px] h-full border-l border-white/5 bg-white/[0.02] p-6 gap-6 overflow-y-auto no-scrollbar">
      
      {/* Spending Breakdown */}
      <div>
        <h3 className="text-white font-semibold mb-4">Despesas</h3>
        <GlassCard noPadding className="p-4 bg-gradient-to-b from-white/5 to-transparent">
            <SpendingDonut />
            <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#7F56D9]"></div>
                    <span className="text-xs text-textSecondary">Compras</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#F72585]"></div>
                    <span className="text-xs text-textSecondary">Alim.</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#4CC9F0]"></div>
                    <span className="text-xs text-textSecondary">Transp.</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#4895EF]"></div>
                    <span className="text-xs text-textSecondary">Outros</span>
                </div>
            </div>
        </GlassCard>
      </div>

      {/* Goals */}
      <div>
        <h3 className="text-white font-semibold mb-4">Metas Financeiras</h3>
        <div className="flex flex-col gap-3">
            {GOALS.map(goal => (
                <GlassCard key={goal.id} className="p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-white">{goal.name}</span>
                        <span className="text-xs text-textSecondary">R$ {goal.current} / R$ {goal.target}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                            className="h-full rounded-full transition-all duration-500" 
                            style={{ 
                                width: `${(goal.current / goal.target) * 100}%`,
                                backgroundColor: goal.color,
                                boxShadow: `0 0 10px ${goal.color}`
                            }} 
                        />
                    </div>
                </GlassCard>
            ))}
        </div>
      </div>

      {/* Currency Converter (Mini Widget) */}
      <div>
        <h3 className="text-white font-semibold mb-4">Câmbio Rápido</h3>
        <GlassCard className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-white">US</div>
                    <span className="text-sm text-white">USD</span>
                </div>
                <input type="text" value="1,00" className="w-20 bg-transparent text-right text-white font-bold outline-none" readOnly />
            </div>
            <div className="flex justify-center -my-2 relative z-10">
                <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:rotate-180 transition-transform duration-300">
                    <ArrowRightLeft size={14} />
                </button>
            </div>
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-[10px] text-white">BR</div>
                    <span className="text-sm text-white">BRL</span>
                </div>
                <input type="text" value="5,68" className="w-20 bg-transparent text-right text-white font-bold outline-none" readOnly />
            </div>
        </GlassCard>
      </div>

      {/* Offers */}
      <div className="mt-auto">
        <GlassCard className="bg-gradient-to-r from-secondary/20 to-purple-900/20 border-secondary/20 p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <Gift size={20} />
            </div>
            <div>
                <p className="text-white font-bold text-sm">Cashback +5%</p>
                <p className="text-xs text-white/70">Na iPlace e Apple Store</p>
            </div>
        </GlassCard>
      </div>

    </aside>
  );
};