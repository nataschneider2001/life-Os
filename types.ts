
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: string;
  dueDate?: string;
}

export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completedDays: string[]; // ISO Dates
  category: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  description: string;
  icon: string;
}

export interface UserStats {
  points: number;
  level: number;
  xpToNextLevel: number;
  badges: string[];
}

export interface UserSettings {
  theme: 'light' | 'dark';
  currency: string;
  dailyGoalXP: number;
}

export interface AppState {
  tasks: Task[];
  habits: Habit[];
  transactions: Transaction[];
  stats: UserStats;
  settings: UserSettings;
  availableRewards: Reward[];
}
