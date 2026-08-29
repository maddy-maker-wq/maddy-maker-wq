import React from 'react';
import { Globe, Bell, ShieldAlert, ArrowLeftRight, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const {
    t,
    role,
    setRole,
    language,
    setActiveLanguageModal,
    setActiveSOSModal,
    notifications,
    sosActive
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleRole = () => {
    setRole(role === 'worker' ? 'employer' : 'worker');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 py-2.5">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-sky-500/20">
            V
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                Vayra
              </h1>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                <UserCheck size={11} className="mr-0.5" />
                {role === 'worker' ? 'Worker' : 'Employer'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {role === 'worker' ? 'काम और सुरक्षा' : 'कारीगर और प्रबंधन'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick SOS Trigger */}
          <button
            onClick={() => setActiveSOSModal(true)}
            className={`touch-target flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95 ${
              sosActive
                ? 'bg-red-600 text-white animate-bounce shadow-lg shadow-red-500/50'
                : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
            }`}
            aria-label="SOS Emergency"
          >
            <ShieldAlert size={16} className="text-red-500" />
            <span className="font-extrabold text-[11px]">SOS</span>
          </button>

          {/* Role Switcher */}
          <button
            onClick={toggleRole}
            className="touch-target p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all text-xs flex items-center"
            title="Switch Worker / Employer View"
          >
            <ArrowLeftRight size={17} />
          </button>

          {/* Language Selector */}
          <button
            onClick={() => setActiveLanguageModal(true)}
            className="touch-target px-2.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 active:scale-95 transition-all flex items-center gap-1 text-xs font-semibold"
            aria-label="Change Language"
          >
            <Globe size={15} />
            <span className="uppercase text-[11px] font-bold">{language}</span>
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="touch-target relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
