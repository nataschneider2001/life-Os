
import React from 'react';
import { UserStats, Reward } from '../types';
import { Trophy, Star, Gift, Zap, ShieldCheck, Award } from 'lucide-react';

interface GamificationCenterProps {
  stats: UserStats;
  rewards: Reward[];
  onRedeem: (reward: Reward) => void;
}

const GamificationCenter: React.FC<GamificationCenterProps> = ({ stats, rewards, onRedeem }) => {
  return (
    <div className="space-y-10">
      {/* Level Header */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl">
            <span className="text-5xl font-black">{stats.level}</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black mb-2">Mestre da Consistência</h2>
            <p className="text-white/80 font-medium mb-4">Você está no top 5% dos usuários esta semana! Continue assim.</p>
            <div className="w-full max-w-md h-4 bg-black/10 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${(stats.points / stats.xpToNextLevel) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-bold">{stats.points} / {stats.xpToNextLevel} XP para o Nível {stats.level + 1}</p>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges Section */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Award className="text-indigo-600" />
            Suas Conquistas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.badges.map((badge, idx) => (
              <div key={idx} className="bg-white p-4 rounded-3xl border border-slate-200 flex flex-col items-center text-center shadow-sm hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-2">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-sm font-bold text-slate-700">{badge}</span>
              </div>
            ))}
            <div className="bg-slate-50 p-4 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center opacity-50">
              <Star size={24} className="text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-400">Em breve...</span>
            </div>
          </div>
        </div>

        {/* Rewards Shop */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Gift className="text-rose-500" />
            Loja de Recompensas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map(reward => (
              <div key={reward.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
                    <Zap size={24} />
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-black">
                    {reward.cost} XP
                  </span>
                </div>
                <h4 className="font-bold text-lg text-slate-800 mb-1">{reward.title}</h4>
                <p className="text-sm text-slate-500 mb-6">{reward.description}</p>
                <button 
                  onClick={() => onRedeem(reward)}
                  disabled={stats.points < reward.cost}
                  className={`
                    w-full py-3 rounded-2xl font-bold transition-all
                    ${stats.points >= reward.cost 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
                  `}
                >
                  Resgatar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationCenter;
