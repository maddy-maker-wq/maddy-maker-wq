import React from 'react';
import { X, Bell, CheckCircle2, ShieldAlert, Sparkles, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotifRead } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
            <Bell size={18} className="text-sky-600" />
            <span>Notifications</span>
          </div>
          <button
            onClick={onClose}
            className="touch-target p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotifRead(n.id)}
                className={`p-3.5 rounded-2xl border text-xs space-y-1 transition-all cursor-pointer ${
                  n.read
                    ? 'bg-slate-50 border-slate-100 text-slate-600'
                    : 'bg-sky-50/70 border-sky-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{n.title}</span>
                  <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                </div>
                <p className="text-slate-600 leading-snug">{n.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
