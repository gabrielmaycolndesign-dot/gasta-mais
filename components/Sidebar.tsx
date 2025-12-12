import React from 'react';
import { LayoutDashboard, Wallet, Repeat, MessageSquare, Settings, Plus, Hexagon, LogOut } from 'lucide-react';

interface SidebarProps {
  onAddClick: () => void;
  onLogout: () => void;
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddClick, onLogout, currentScreen, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Painel' },
    { id: 'wallet', icon: Wallet, label: 'Carteira' },
    { id: 'exchange', icon: Repeat, label: 'Câmbio' },
    { id: 'messages', icon: MessageSquare, label: 'Mensagens' },
    { id: 'settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <aside className="hidden md:flex flex-col items-center py-8 w-24 lg:w-64 h-full border-r border-white/5 bg-white/[0.02] relative z-20">
      {/* Logo */}
      <div className="mb-12 flex items-center gap-3 px-4">
        <div className="relative">
             <Hexagon className="w-8 h-8 text-secondary fill-secondary/20" />
             <div className="absolute inset-0 blur-md bg-secondary/40 -z-10" />
        </div>
        <span className="hidden lg:block text-xl font-bold tracking-tight text-white">
          Gasta<span className="text-secondary">Mais</span>
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 w-full px-4 flex flex-col gap-4">
        {menuItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                group flex items-center gap-4 p-3 rounded-2xl w-full transition-all duration-300
                ${isActive 
                  ? 'bg-primary/20 text-white shadow-[0_0_15px_rgba(127,86,217,0.3)]' 
                  : 'text-textSecondary hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'group-hover:text-white'}`} />
              <span className={`hidden lg:block font-medium ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                  <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#7F56D9]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto px-4 w-full flex flex-col gap-4">
        <button 
          onClick={onLogout}
          className="group flex items-center gap-4 p-3 rounded-2xl w-full text-textSecondary hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
        >
          <LogOut className="w-6 h-6 group-hover:text-red-400" />
          <span className="hidden lg:block font-medium">Sair</span>
        </button>

        <button 
          onClick={onAddClick}
          className="w-full aspect-square lg:aspect-auto lg:py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-[#9D4EDD] rounded-2xl text-white font-semibold shadow-[0_0_20px_rgba(127,86,217,0.5)] hover:shadow-[0_0_30px_rgba(127,86,217,0.7)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
        >
          <Plus className="w-6 h-6" />
          <span className="hidden lg:block">Nova Transação</span>
        </button>
      </div>
    </aside>
  );
};