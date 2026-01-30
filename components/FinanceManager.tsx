
import React, { useState } from 'react';
import { Transaction } from '../types';
import { Plus, ArrowUpRight, ArrowDownRight, Trash2, PieChart } from 'lucide-react';

interface FinanceManagerProps {
  transactions: Transaction[];
  setTransactions: (t: Transaction[]) => void;
}

const FinanceManager: React.FC<FinanceManagerProps> = ({ transactions, setTransactions }) => {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Alimentação');

  const addTransaction = () => {
    if (!desc || !amount) return;
    const newTx: Transaction = {
      id: Date.now().toString(),
      description: desc,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString()
    };
    setTransactions([newTx, ...transactions]);
    setDesc('');
    setAmount('');
  };

  const deleteTx = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-sm font-medium">Saldo Atual</p>
          <p className="text-3xl font-black text-slate-800">R$ {(totalIncome - totalExpense).toLocaleString()}</p>
        </div>
        <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <ArrowUpRight size={18} />
            <p className="text-sm font-bold uppercase">Entradas</p>
          </div>
          <p className="text-3xl font-black text-emerald-700">R$ {totalIncome.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100 shadow-sm">
          <div className="flex items-center gap-2 text-rose-600 mb-1">
            <ArrowDownRight size={18} />
            <p className="text-sm font-bold uppercase">Saídas</p>
          </div>
          <p className="text-3xl font-black text-rose-700">R$ {totalExpense.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Transaction */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit">
          <h3 className="text-xl font-bold mb-6">Nova Transação</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1 uppercase tracking-tight">Descrição</label>
              <input 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                placeholder="Ex: Supermercado"
                value={desc}
                onChange={e => setDesc(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1 uppercase tracking-tight">Valor (R$)</label>
              <input 
                type="number"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setType('income')}
                className={`flex-1 py-2 rounded-xl font-bold border-2 transition-all ${type === 'income' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                Entrada
              </button>
              <button 
                onClick={() => setType('expense')}
                className={`flex-1 py-2 rounded-xl font-bold border-2 transition-all ${type === 'expense' ? 'bg-rose-500 border-rose-500 text-white' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                Saída
              </button>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1 uppercase tracking-tight">Categoria</label>
              <select 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option>Alimentação</option>
                <option>Transporte</option>
                <option>Lazer</option>
                <option>Moradia</option>
                <option>Educação</option>
                <option>Outros</option>
              </select>
            </div>
            <button 
              onClick={addTransaction}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700"
            >
              Adicionar Registro
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Histórico Recente</h3>
          <div className="space-y-3">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {tx.type === 'income' ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{tx.description}</p>
                  <p className="text-xs font-medium text-slate-400 uppercase">{tx.category} • {new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className={`font-black ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {tx.type === 'income' ? '+' : '-'} R$ {tx.amount.toLocaleString()}
                  </p>
                  <button 
                    onClick={() => deleteTx(tx.id)}
                    className="p-1 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center py-20 text-slate-400">Nenhuma transação registrada.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceManager;
