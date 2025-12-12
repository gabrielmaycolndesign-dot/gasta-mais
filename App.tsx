import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { RightPanel } from './components/RightPanel';
import { LoginScreen } from './components/LoginScreen';
import { AddTransactionModal } from './components/AddTransactionModal';
import { WalletScreen, ExchangeScreen, MessagesScreen, SettingsScreen } from './components/Screens';
import { INITIAL_TRANSACTIONS } from './constants';
import { Transaction } from './types';

const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  
  // Data State
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  // Initialize from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('gasta_mais_user');
    const storedTx = localStorage.getItem('gasta_mais_transactions');

    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }

    if (storedTx) {
      setTransactions(JSON.parse(storedTx));
    } else {
      // Load initial data if empty (for demo purposes)
      setTransactions(INITIAL_TRANSACTIONS);
    }
  }, []);

  // Persistence Effects
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('gasta_mais_user', user);
    } else {
      localStorage.removeItem('gasta_mais_user');
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    localStorage.setItem('gasta_mais_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Handlers
  const handleLogin = (email: string) => {
    setUser(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentScreen('dashboard'); // Reset screen on logout
  };

  const handleAddTransaction = (data: { description: string; amount: number; type: 'income' | 'expense'; category: string }) => {
    const newTx: Transaction = {
      id: Date.now().toString(),
      name: data.description,
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      icon: 'default' // Icon logic is handled in display component by category name
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Render Login
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Render Content based on Route
  const renderContent = () => {
    switch (currentScreen) {
        case 'wallet':
            return <WalletScreen />;
        case 'exchange':
            return <ExchangeScreen />;
        case 'messages':
            return <MessagesScreen />;
        case 'settings':
            return <SettingsScreen />;
        case 'dashboard':
        default:
            return (
                <>
                    <MainContent 
                        user={user || 'Usuário'} 
                        transactions={transactions} 
                        onDeleteTransaction={handleDeleteTransaction}
                    />
                    <RightPanel />
                </>
            );
    }
  };

  // Render Dashboard Layout
  return (
    <div className="flex h-screen w-full bg-[#120E24] font-sans text-white overflow-hidden relative">
      
      {/* Background Ambience Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
          <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px] opacity-30" />
      </div>

      <Sidebar 
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onAddClick={() => setIsModalOpen(true)} 
        onLogout={handleLogout}
      />
      
      {/* Content Area - Flex Logic handles whether right panel is shown or hidden by the renderContent function */}
      {currentScreen === 'dashboard' ? (
          renderContent()
      ) : (
          <main className="flex-1 h-full overflow-y-auto relative z-10 no-scrollbar">
            {renderContent()}
          </main>
      )}

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTransaction}
      />

    </div>
  );
};

export default App;