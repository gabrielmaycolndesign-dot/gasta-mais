import React, { useState } from 'react';
import { Hexagon, ArrowRight } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onLogin(email || 'usuario@gastamais.com');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#120E24]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <GlassCard className="w-full max-w-md mx-4 z-10 flex flex-col items-center gap-8 py-12 px-8 border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
             <Hexagon className="w-16 h-16 text-secondary fill-secondary/20 group-hover:rotate-180 transition-transform duration-700 ease-out" />
             <div className="absolute inset-0 blur-xl bg-secondary/60 -z-10" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white tracking-tight mb-1">
              Gasta<span className="text-secondary">Mais</span>
            </h1>
            <p className="text-textSecondary text-sm tracking-widest uppercase">Controle Financeiro Futuro</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-textSecondary uppercase ml-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-textSecondary uppercase ml-1">Senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-gradient-to-r from-primary to-[#9D4EDD] hover:shadow-[0_0_30px_rgba(127,86,217,0.6)] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Acessar Sistema <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-white/30 text-xs mt-4">
          Não tem conta? <span className="text-primary cursor-pointer hover:underline">Solicitar acesso</span>
        </p>
      </GlassCard>
    </div>
  );
};