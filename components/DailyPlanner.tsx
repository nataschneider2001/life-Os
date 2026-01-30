
import React, { useState } from 'react';
import { Task, Priority } from '../types';
import { Plus, Check, Trash2, Clock, Star } from 'lucide-react';

interface DailyPlannerProps {
  tasks: Task[];
  setTasks: (t: Task[]) => void;
  onComplete: () => void;
}

const DailyPlanner: React.FC<DailyPlannerProps> = ({ tasks, setTasks, onComplete }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('Geral');

  const addTask = () => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      category,
      dueDate: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    setTitle('');
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        if (!t.completed) onComplete();
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(updated);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const priorities = [
    { id: 'low', label: 'Baixa', color: 'bg-emerald-500' },
    { id: 'medium', label: 'Média', color: 'bg-amber-500' },
    { id: 'high', label: 'Alta', color: 'bg-rose-500' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Nova Tarefa</h3>
          <div className="space-y-4">
            <input 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
              placeholder="O que precisa ser feito?"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Prioridade</label>
              <div className="grid grid-cols-3 gap-2">
                {priorities.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setPriority(p.id as Priority)}
                    className={`
                      py-2 rounded-xl text-xs font-bold border-2 transition-all
                      ${priority === p.id 
                        ? `${p.color} border-${p.id === 'low' ? 'emerald' : p.id === 'medium' ? 'amber' : 'rose'}-500 text-white` 
                        : 'border-slate-100 text-slate-400 hover:bg-slate-50'}
                    `}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Área</label>
              <select 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option>Geral</option>
                <option>Trabalho</option>
                <option>Pessoal</option>
                <option>Estudos</option>
              </select>
            </div>
            <button 
              onClick={addTask}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100"
            >
              Adicionar à Lista
            </button>
          </div>
        </div>

        <div className="bg-indigo-900 p-6 rounded-3xl text-white">
          <h4 className="font-bold flex items-center gap-2 mb-2">
            <Star size={18} className="text-amber-400" />
            Matriz Eisenhower
          </h4>
          <p className="text-indigo-200 text-sm">
            Foque no que é <strong>Importante</strong> e <strong>Urgente</strong> primeiro.
          </p>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm min-h-[500px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">Tarefas de Hoje</h3>
            <span className="text-sm font-bold text-slate-400">{tasks.filter(t => !t.completed).length} pendentes</span>
          </div>
          
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className={`
                flex items-center gap-4 p-4 rounded-2xl border transition-all
                ${task.completed ? 'bg-slate-50 border-transparent opacity-60' : 'bg-white border-slate-100 shadow-sm'}
              `}>
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 text-transparent hover:border-indigo-400'}
                  `}
                >
                  <Check size={14} />
                </button>
                
                <div className="flex-1">
                  <p className={`font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider bg-slate-100 px-2 py-0.5 rounded-lg">
                      {task.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Clock size={10} />
                      Hoje
                    </div>
                  </div>
                </div>

                <div className={`w-2 h-8 rounded-full ${
                  task.priority === 'high' ? 'bg-rose-500' : 
                  task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />

                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <p className="font-medium">Sua lista está vazia.</p>
                <p className="text-sm">Planeje seu dia para ser mais produtivo!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;
