
import React, { useState } from 'react';
import { AppState } from '../types';
import { BrainCircuit, Sparkles, Send, Loader2, Bot, TrendingDown, Clock, Zap } from 'lucide-react';
import { getAIInsight, analyzeFinances, optimizeRoutine } from '../services/gemini';

interface AICoachProps {
  state: AppState;
}

const AICoach: React.FC<AICoachProps> = ({ state }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);

  const runAnalysis = async (type: 'finance' | 'routine' | 'general') => {
    setLoading(true);
    setResponse(null);
    setActiveAnalysis(type);
    
    let result = "";
    if (type === 'finance') {
      result = await analyzeFinances(state.transactions);
    } else if (type === 'routine') {
      result = await optimizeRoutine(state.habits, state.tasks);
    } else {
      result = await getAIInsight(JSON.stringify(state), "Dê-me um resumo geral do meu desempenho e me motive a continuar!");
    }
    
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* AI Intro Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 p-8 rounded-[40px] text-white shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/20">
            <BrainCircuit size={32} className="text-indigo-300" />
          </div>
          <h2 className="text-3xl font-black mb-2">LifeOS Intelligence</h2>
          <p className="text-indigo-100/80 max-w-lg mb-8 leading-relaxed">
            Eu analiso seus padrões de produtividade e finanças para oferecer conselhos personalizados e ajudá-lo a alcançar suas metas mais rápido.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => runAnalysis('finance')}
              disabled={loading}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl transition-all border border-white/10 group"
            >
              <TrendingDown size={20} className="text-emerald-400" />
              <div className="text-left">
                <p className="font-bold text-sm">Finanças</p>
                <p className="text-[10px] opacity-60">Onde economizar?</p>
              </div>
            </button>
            <button 
              onClick={() => runAnalysis('routine')}
              disabled={loading}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl transition-all border border-white/10 group"
            >
              <Clock size={20} className="text-amber-400" />
              <div className="text-left">
                <p className="font-bold text-sm">Rotina</p>
                <p className="text-[10px] opacity-60">Otimizar meu dia</p>
              </div>
            </button>
            <button 
              onClick={() => runAnalysis('general')}
              disabled={loading}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl transition-all border border-white/10 group"
            >
              <Zap size={20} className="text-blue-400" />
              <div className="text-left">
                <p className="font-bold text-sm">Motivação</p>
                <p className="text-[10px] opacity-60">Resumo de progresso</p>
              </div>
            </button>
          </div>
        </div>
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl -ml-24 -mb-24" />
      </div>

      {/* Analysis Output */}
      {(loading || response) && (
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm min-h-[300px] flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Bot size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Insight do Assistente</h4>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">
                {activeAnalysis === 'finance' ? 'Análise Financeira' : activeAnalysis === 'routine' ? 'Otimização de Rotina' : 'Análise Geral'}
              </p>
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-indigo-600" size={40} />
                <p className="text-slate-500 font-medium animate-pulse text-center">
                  Vasculhando seus dados e gerando insights... <br/>
                  Isso pode levar alguns segundos.
                </p>
              </div>
            ) : (
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {response}
                </p>
              </div>
            )}
          </div>

          {!loading && response && (
            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
               <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  <Sparkles size={16} />
                  Dica de IA aplicada com sucesso
               </div>
               <button className="text-slate-400 hover:text-indigo-600 text-sm font-medium">
                  Salvar nos favoritos
               </button>
            </div>
          )}
        </div>
      )}

      {/* Suggested Questions */}
      <div className="space-y-4">
        <h5 className="font-bold text-slate-400 uppercase text-xs tracking-widest px-2">Perguntas Sugeridas</h5>
        <div className="flex flex-wrap gap-3">
          {["Como posso melhorar minha produtividade amanhã?", "Minhas finanças estão saudáveis?", "Sugira um novo hábito baseado no meu perfil."].map((q, i) => (
            <button 
              key={i}
              onClick={() => runAnalysis('general')}
              className="bg-white px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AICoach;
