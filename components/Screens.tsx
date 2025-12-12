import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { CreditCard, RefreshCw, MessageCircle, Settings as SettingsIcon, Shield, Bell, Lock } from 'lucide-react';
import { CARDS } from '../constants';

// --- Wallet Screen ---
export const WalletScreen: React.FC = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Minha Carteira</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {CARDS.map(card => (
          <div key={card.id} className={`relative h-48 rounded-3xl p-6 flex flex-col justify-between shadow-lg overflow-hidden
            ${card.theme === 'purple' ? 'bg-gradient-to-bl from-[#7F56D9] to-[#3C096C]' : 
              card.theme === 'magenta' ? 'bg-gradient-to-bl from-[#F72585] to-[#7209B7]' : 
              'bg-gradient-to-bl from-[#4CC9F0] to-[#4361EE]'}`}>
            <div className="absolute inset-0 bg-white/10 rounded-3xl pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0% 100%)' }} />
            <div className="flex justify-between items-start z-10">
              <h3 className="text-white text-2xl font-bold">R$ {card.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              <span className="text-white/80 font-bold">{card.type}</span>
            </div>
            <div className="z-10 text-white">
              <p className="font-mono tracking-widest text-lg mb-1">{card.number}</p>
              <div className="flex justify-between text-xs opacity-80 uppercase">
                <span>Alex Silva</span>
                <span>{card.expiry}</span>
              </div>
            </div>
          </div>
        ))}
        {/* Add New Card Placeholder */}
        <button className="h-48 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 hover:bg-white/5 hover:border-primary/50 transition-all text-textSecondary hover:text-white group">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
            <PlusIcon className="w-6 h-6" />
          </div>
          <span className="font-medium">Adicionar Cartão</span>
        </button>
      </div>
    </div>
  );
};
const PlusIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
)


// --- Exchange Screen ---
export const ExchangeScreen: React.FC = () => {
  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <RefreshCw className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Câmbio & Cripto</h2>
        <p className="text-textSecondary max-w-md mb-8">Acompanhe cotações em tempo real e faça conversões instantâneas entre moedas fiduciárias e criptoativos.</p>
        
        <GlassCard className="w-full max-w-2xl p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex-1 bg-black/20 p-4 rounded-xl border border-white/10">
                    <span className="text-xs text-textSecondary uppercase">Vender</span>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-2xl font-bold text-white">1.000</span>
                        <span className="font-bold text-white bg-white/10 px-2 py-1 rounded">BRL</span>
                    </div>
                </div>
                <RefreshCw className="text-textSecondary" />
                <div className="flex-1 bg-black/20 p-4 rounded-xl border border-white/10">
                    <span className="text-xs text-textSecondary uppercase">Comprar</span>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-2xl font-bold text-success">196.40</span>
                        <span className="font-bold text-white bg-white/10 px-2 py-1 rounded">USD</span>
                    </div>
                </div>
            </div>
            <button className="w-full py-4 bg-primary hover:bg-primary/90 rounded-xl font-bold text-white transition-all shadow-[0_0_20px_rgba(127,86,217,0.4)]">
                Converter Agora
            </button>
        </GlassCard>
    </div>
  );
};

// --- Messages Screen ---
export const MessagesScreen: React.FC = () => {
    const messages = [
        { id: 1, sender: "Suporte GastaMais", title: "Bem-vindo ao Premium!", time: "2 min atrás", unread: true },
        { id: 2, sender: "Alerta de Segurança", title: "Novo login detectado", time: "1h atrás", unread: false },
        { id: 3, sender: "Dicas Financeiras", title: "Como economizar em 2024", time: "1 dia atrás", unread: false },
    ];

  return (
    <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Mensagens</h1>
        <div className="flex flex-col gap-4">
            {messages.map(msg => (
                <GlassCard key={msg.id} className={`flex items-center gap-4 p-4 hover:bg-white/10 transition-colors cursor-pointer ${msg.unread ? 'border-l-4 border-l-primary' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <MessageCircle className="text-white w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between">
                            <h4 className={`text-white ${msg.unread ? 'font-bold' : 'font-medium'}`}>{msg.sender}</h4>
                            <span className="text-xs text-textSecondary">{msg.time}</span>
                        </div>
                        <p className="text-textSecondary text-sm">{msg.title}</p>
                    </div>
                </GlassCard>
            ))}
        </div>
    </div>
  );
};

// --- Settings Screen ---
export const SettingsScreen: React.FC = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Ajustes</h1>
        
        <div className="grid gap-6 max-w-3xl">
            <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" /> Segurança
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-textSecondary">Autenticação em 2 Fatores</span>
                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" /></div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-textSecondary">Alterar Senha</span>
                        <button className="text-sm text-primary hover:text-white">Editar</button>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-secondary" /> Notificações
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-textSecondary">Alertas de Transação</span>
                         <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" /></div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-textSecondary">Novidades e Ofertas</span>
                         <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full shadow-md" /></div>
                    </div>
                </div>
            </GlassCard>
        </div>
    </div>
  );
};
