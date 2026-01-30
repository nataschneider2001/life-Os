
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  TrendingUp, 
  BrainCircuit, 
  Calendar, 
  Settings as SettingsIcon,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
  Zap,
  Menu,
  X,
  Gift
} from 'lucide-react';
import { AppState, Task, Habit, Transaction, Reward, UserSettings } from './types';
import Dashboard from './components/Dashboard';
import HabitTracker from './components/HabitTracker';
import FinanceManager from './components/FinanceManager';
import DailyPlanner from './components/DailyPlanner';
import AICoach from './components/AICoach';
import GamificationCenter from './components/GamificationCenter';
import Settings from './components/Settings';

const INITIAL_REWARDS: Reward[] = [
  { id: '1', title: 'Pausa de 1 Hora', cost: 500, description: 'Resgate para se dar o direito de uma pausa sem culpa.', icon: 'coffee' },
  { id: '2', title: 'Jantar Especial', cost: 2000, description: 'Você merece uma refeição incrível pela sua disciplina.', icon: 'utensils' },
  { id: '3', title: 'Novo Jogo/Gadget', cost: 5000, description: 'Invista em seu lazer após bater metas grandes.', icon: 'gamepad' },
];

const INITIAL_STATE: AppState = {
  tasks: [],
  habits: [],
  transactions: [],
  stats: {
    points: 1250,
    level: 5,
    xpToNextLevel: 2500,
    badges: ['Madrugador', 'Mestre das Finanças', '7 Dias de Streak']
  },
  settings: {
    theme: 'light',
    currency: 'BRL',
    dailyGoalXP: 500
  },
  availableRewards: INITIAL_REWARDS
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'habits' | 'finance' | 'planner' | 'ai' | 'rewards' | 'settings'>('dashboard');
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('lifeos_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration for new state fields
      return {
        ...INITIAL_STATE,
        ...parsed,
        stats: { ...INITIAL_STATE.stats, ...parsed.stats },
        settings: { ...INITIAL_STATE.settings, ...parsed.settings }
      };
    }
    return INITIAL_STATE;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('lifeos_state', JSON.stringify(state));
  }, [state]);

  const addPoint = (amount: number) => {
    setState(prev => {
      let newPoints = prev.stats.points + amount;
      let newLevel = prev.stats.level;
      let newXpToNext = prev.stats.xpToNextLevel;

      if (newPoints >= newXpToNext) {
        newLevel += 1;
        newPoints = newPoints - newXpToNext;
        newXpToNext = Math.floor(newXpToNext * 1.2);
      }

      return {
        ...prev,
        stats: {
          ...prev.stats,
          points: newPoints,
          level: newLevel,
          xpToNextLevel: newXpToNext
        }
      };
    });
  };

  const redeemReward = (reward: Reward) => {
    if (state.stats.points >= reward.cost) {
      setState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          points: prev.stats.points - reward.cost
        }
      }));
      alert(`Parabéns! Você resgatou: ${reward.title}. Aproveite sua recompensa!`);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'habits', label: 'Hábitos', icon: Calendar },
    { id: 'finance', label: 'Finanças', icon: TrendingUp },
    { id: 'planner', label: 'Planejador', icon: CheckSquare },
    { id: 'ai', label: 'LifeOS IA', icon: BrainCircuit },
    { id: 'rewards', label: 'Recompensas', icon: Gift },
    { id: 'settings', label: 'Ajustes', icon: SettingsIcon },
  ];

  return (
    <div className={`flex h-screen ${state.settings.theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        ${state.settings.theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}
        border-r transition-all duration-300 flex flex-col fixed inset-y-0 z-50 md:relative
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
              L
            </div>
            {isSidebarOpen && <span className="font-bold text-xl tracking-tight">LifeOS</span>}
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-100 rounded md:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                  ${activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : `${state.settings.theme === 'dark' ? 'text-slate-400 hover:bg-slate-700 hover:text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                `}
              >
                <Icon size={20} className={activeTab === item.id ? 'text-indigo-600' : ''} />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Gamification Sidebar Widget */}
        {isSidebarOpen && (
          <div className="p-4 mx-4 mb-6 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl text-white shadow-xl shadow-indigo-100 cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => setActiveTab('rewards')}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium opacity-90">Nível {state.stats.level}</span>
              <Trophy size={16} />
            </div>
            <div className="h-1.5 w-full bg-white/20 rounded-full mb-3">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500" 
                style={{ width: `${(state.stats.points / state.stats.xpToNextLevel) * 100}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-yellow-300" />
              <span className="text-sm font-bold">{state.stats.points} XP</span>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto ${!isSidebarOpen && 'md:ml-0'}`}>
        <header className={`h-16 ${state.settings.theme === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-200'} backdrop-blur-md border-b sticky top-0 z-40 px-8 flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hidden md:block"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold capitalize">
              {navItems.find(n => n.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-bold border border-amber-100">
                <Zap size={16} />
                {state.stats.points} XP
             </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
              <img src="https://picsum.photos/32" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard state={state} />}
          {activeTab === 'habits' && <HabitTracker habits={state.habits} setHabits={(h) => setState({...state, habits: h})} onComplete={() => addPoint(50)} />}
          {activeTab === 'finance' && <FinanceManager transactions={state.transactions} setTransactions={(t) => setState({...state, transactions: t})} />}
          {activeTab === 'planner' && <DailyPlanner tasks={state.tasks} setTasks={(t) => setState({...state, tasks: t})} onComplete={() => addPoint(20)} />}
          {activeTab === 'ai' && <AICoach state={state} />}
          {activeTab === 'rewards' && <GamificationCenter stats={state.stats} rewards={state.availableRewards} onRedeem={redeemReward} />}
          {activeTab === 'settings' && <Settings settings={state.settings} setSettings={(s) => setState({...state, settings: s})} />}
        </div>
      </main>
    </div>
  );
};

export default App;
