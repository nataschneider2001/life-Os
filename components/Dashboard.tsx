
import React from 'react';
import { AppState } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface DashboardProps {
  state: AppState;
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const completedTasks = state.tasks.filter(t => t.completed).length;
  const habitCompletionRate = state.habits.length > 0 
    ? (state.habits.reduce((acc, h) => acc + h.streak, 0) / (state.habits.length * 30)) * 100 
    : 0;

  const totalExpenses = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalIncome = state.transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const financeData = [
    { name: 'Entradas', value: totalIncome, color: '#10b981' },
    { name: 'Saídas', value: totalExpenses, color: '#ef4444' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 p-6 bg-white rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-slate-400 font-medium mb-1">Bem-vindo de volta,</h3>
            <h2 className="text-2xl font-bold text-slate-800">Seu progresso hoje está excelente! 🚀</h2>
          </div>
          <div className="mt-6 flex gap-4">
             <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl flex items-center gap-2">
                <CheckCircle size={18} />
                <span className="font-semibold">{completedTasks} Tarefas Concluídas</span>
             </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-600 mb-4">
            <TrendingUp size={24} />
            <span className="font-bold">Finanças</span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Saldo Líquido</p>
          <p className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            R$ {(totalIncome - totalExpenses).toLocaleString()}
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 text-amber-500 mb-4">
            <Calendar size={24} />
            <span className="font-bold">Hábitos</span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Meta de Consistência</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-slate-800">{habitCompletionRate.toFixed(0)}%</p>
            <span className="text-xs text-amber-600 font-medium">+5% vs semana passada</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-6">Comparativo Financeiro</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {financeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-800">Atividades Pendentes</h4>
            <button className="text-indigo-600 text-sm font-medium hover:underline">Ver todas</button>
          </div>
          <div className="space-y-4">
            {state.tasks.filter(t => !t.completed).slice(0, 4).map(task => (
              <div key={task.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' ? 'bg-rose-500' : 
                  task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <span className="flex-1 font-medium text-slate-700">{task.title}</span>
                <span className="text-xs font-semibold px-2 py-1 bg-white rounded-lg text-slate-500 border border-slate-200">
                  {task.category}
                </span>
              </div>
            ))}
            {state.tasks.filter(t => !t.completed).length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-400">Tudo limpo por aqui! 🎉</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Habits Progress */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
         <h4 className="font-bold text-slate-800 mb-6">Foco em Hábitos</h4>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {state.habits.slice(0, 3).map(habit => (
              <div key={habit.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-700">{habit.name}</span>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-bold">{habit.streak} 🔥</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min((habit.streak / 30) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
            {state.habits.length === 0 && (
              <p className="text-slate-400 text-center col-span-3 py-4">Nenhum hábito rastreado ainda.</p>
            )}
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
