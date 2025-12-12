import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden shadow-xl ${noPadding ? '' : 'p-6'} ${className}`}>
        {/* Subtle noise or gradient overlay could go here for texture */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};