
import React, { useState } from 'react';
import { Habit } from '../types';
import { Plus, Check, Trash2, Flame } from 'lucide-react';

interface HabitTrackerProps {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  onComplete: () => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, setHabits, onComplete }) => {
  const [newHabitName, setNewHabitName] = useState('');
  const [category, setCategory] = useState('Saúde');

  const addHabit = () => {
    if (!newHabitName.trim()) return;
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      frequency: 'daily',
      streak: 0,
      completedDays: [],
      category
    };
    setHabits([...habits, newHabit]);
    setNewHabitName('');
  };

  const toggleHabitToday = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = habits.map(h => {
      if (h.id === id) {
        const isCompletedToday = h.completedDays.includes(today);
        if (isCompletedToday) {
          return {
            ...h,
            completedDays: h.completedDays.filter(d => d !== today),
            streak: Math.max(0, h.streak - 1)
          };
        } else {
          onComplete();
          return {
            ...h,
            completedDays: [...h.completedDays, today],
            streak: h.streak + 1
          };
        }
      }
      return h;
    });
    setHabits(updated);
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Criar Novo Hábito</h3>
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Nome do hábito (ex: Beber água)" 
            className="flex-1 min-w-[200px] px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
          />
          <select 
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Saúde</option>
            <option>Trabalho</option>
            <option>Lazer</option>
            <option>Finanças</option>
            <option>Social</option>
          </select>
          <button 
            onClick={addHabit}
            className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} /> Adicionar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map(habit => {
          const isCompletedToday = habit.completedDays.includes(new Date().toISOString().split('T')[0]);
          return (
            <div key={habit.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{habit.category}</span>
                  <h4 className="text-lg font-bold text-slate-800">{habit.name}</h4>
                </div>
                <button 
                  onClick={() => deleteHabit(habit.id)}
                  className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Flame className={habit.streak > 0 ? 'text-orange-500' : 'text-slate-300'} size={20} />
                <span className="font-bold text-slate-700">{habit.streak} dias de sequência</span>
              </div>

              <button 
                onClick={() => toggleHabitToday(habit.id)}
                className={`
                  w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all
                  ${isCompletedToday 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}
                `}
              >
                {isCompletedToday ? <Check size={20} /> : <Plus size={20} />}
                {isCompletedToday ? 'Concluído Hoje' : 'Marcar como Feito'}
              </button>
            </div>
          );
        })}
      </div>
      {habits.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
           <p className="text-slate-400 font-medium">Você ainda não tem hábitos. Comece um novo hoje!</p>
        </div>
      )}
    </div>
  );
};

export default HabitTracker;
