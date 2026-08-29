import React from 'react';
import { Briefcase, Clock, Shield, User, Users, PlusCircle, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export type TabType = 'home' | 'jobs' | 'shifts' | 'safety' | 'profile' | 'workers' | 'post';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const { role, t, activeShift, applications } = useApp();

  const activeShiftBadge = activeShift && activeShift.status === 'in_progress';
  const pendingApps = applications.length;

  if (role === 'worker') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-2 py-1.5 safe-area-bottom">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
          <button
            onClick={() => onSelectTab('home')}
            className={`touch-target flex flex-col items-center justify-center rounded-xl py-1 px-1 transition-colors ${
              activeTab === 'home'
                ? 'text-sky-600 font-bold bg-sky-50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Search size={20} />
            <span className="text-[10px] mt-0.5 leading-tight truncate">{t.navigation.home}</span>
          </button>

          <button
            onClick={() => onSelectTab('jobs')}
            className={`touch-target relative flex flex-col items-center justify-center rounded-xl py-1 px-1 transition-colors ${
              activeTab === 'jobs'
                ? 'text-sky-600 font-bold bg-sky-50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Briefcase size={20} />
            {pendingApps > 0 && (
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white"></span>
            )}
            <span className="text-[10px] mt-0.5 leading-tight truncate">{t.navigation.jobs}</span>
          </button>

          <button
            onClick={() => onSelectTab('shifts')}
            className={`touch-target relative flex flex-col items-center justify-center rounded-xl py-1 px-1 transition-colors ${
              activeTab === 'shifts'
                ? 'text-sky-600 font-bold bg-sky-50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock size={20} />
            {activeShiftBadge && (
              <span className="absolute top-1 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            )}
            <span className="text-[10px] mt-0.5 leading-tight truncate">{t.navigation.shifts}</span>
          </button>

          <button
            onClick={() => onSelectTab('safety')}
            className={`touch-target flex flex-col items-center justify-center rounded-xl py-1 px-1 transition-colors ${
              activeTab === 'safety'
                ? 'text-red-600 font-bold bg-red-50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Shield size={20} />
            <span className="text-[10px] mt-0.5 leading-tight truncate">{t.navigation.safety}</span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`touch-target flex flex-col items-center justify-center rounded-xl py-1 px-1 transition-colors ${
              activeTab === 'profile'
                ? 'text-sky-600 font-bold bg-sky-50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <User size={20} />
            <span className="text-[10px] mt-0.5 leading-tight truncate">{t.navigation.profile}</span>
          </button>
        </div>
      </nav>
    );
  }

  // Employer Navigation
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-2 py-1.5 safe-area-bottom">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        <button
          onClick={() => onSelectTab('home')}
          className={`touch-target flex flex-col items-center justify-center rounded-xl py-1 px-1 transition-colors ${
            activeTab === 'home'
              ? 'text-sky-600 font-bold bg-sky-50'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Briefcase size={20} />
          <span className="text-[10px] mt-0.5 leading-tight truncate">{t.navigation.home}</span>
        </button>

        <button
          onClick={() => onSelectTab('workers')}
          className={`touch-target flex flex-col items-center justify-center rounded-xl py-1 px-1 transition-colors ${
            activeTab === 'workers'
              ? 'text-sky-600 font-bold bg-sky-50'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Users size={20} />
          <span className="text-[10px] mt-0.5 leading-tight truncate">{t.navigation.workers}</span>
        </button>

        <button
          onClick={() => onSelectTab('post')}
          className="touch-target flex flex-col items-center justify-center -mt-3 text-sky-600"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 active:scale-95 transition-transform">
            <PlusCircle size={26} />
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-sky-700 leading-tight">
            {t.navigation.postJob}
          </span>
        </button>

        <button
          onClick={() => onSelectTab('shifts')}
          className={`touch-target relative flex flex-col items-center justify-center rounded-xl py-1 px-1 transition-colors ${
            activeTab === 'shifts'
              ? 'text-sky-600 font-bold bg-sky-50'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Clock size={20} />
          <span className="text-[10px] mt-0.5 leading-tight truncate">{t.navigation.shifts}</span>
        </button>

        <button
          onClick={() => onSelectTab('profile')}
          className={`touch-target flex flex-col items-center justify-center rounded-xl py-1 px-1 transition-colors ${
            activeTab === 'profile'
              ? 'text-sky-600 font-bold bg-sky-50'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <User size={20} />
          <span className="text-[10px] mt-0.5 leading-tight truncate">{t.navigation.profile}</span>
        </button>
      </div>
    </nav>
  );
};
