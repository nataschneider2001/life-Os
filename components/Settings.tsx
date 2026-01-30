
import React from 'react';
import { UserSettings } from '../types';
import { Settings as SettingsIcon, Bell, Moon, Sun, CreditCard, User, Zap } from 'lucide-react';

interface SettingsProps {
  settings: UserSettings;
  setSettings: (s: UserSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <SettingsIcon className="text-indigo-600" />
          Preferências do Sistema
        </h3>

        <div className="space-y-8">
          {/* Theme Section */}
          <section className="space-y-4">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Moon size={16} /> Aparência
            </h4>
            <div className="flex gap-4">
              <button 
                onClick={() => setSettings({...settings, theme: 'light'})}
                className={`flex-1 p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${settings.theme === 'light' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 text-slate-400'}`}
              >
                <Sun size={24} />
                <span className="font-bold">Claro</span>
              </button>
              <button 
                onClick={() => setSettings({...settings, theme: 'dark'})}
                className={`flex-1 p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${settings.theme === 'dark' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 text-slate-400'}`}
              >
                <Moon size={24} />
                <span className="font-bold">Escuro</span>
              </button>
            </div>
          </section>

          {/* Goals Section */}
          {/* Added Zap to the lucide-react imports to fix the 'Cannot find name Zap' error */}
          <section className="space-y-4">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Zap size={16} /> Metas Diárias
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Meta de XP Diária</label>
                <input 
                  type="range" 
                  min="100" 
                  max="1000" 
                  step="50"
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={settings.dailyGoalXP}
                  onChange={(e) => setSettings({...settings, dailyGoalXP: parseInt(e.target.value)})}
                />
                <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                  <span>100 XP</span>
                  <span className="text-indigo-600">{settings.dailyGoalXP} XP</span>
                  <span>1000 XP</span>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="space-y-4">
             <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Bell size={16} /> Notificações
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Lembretes de Hábitos', desc: 'Alertas nos horários configurados' },
                { label: 'Alertas Financeiros', desc: 'Avisos de gastos excessivos' },
                { label: 'Insights da IA', desc: 'Sugestões proativas do assistente' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="font-bold text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      <button className="w-full py-4 bg-slate-800 text-white font-bold rounded-[30px] shadow-xl hover:bg-slate-900 transition-colors">
        Exportar Meus Dados (CSV)
      </button>
    </div>
  );
};

export default Settings;
