import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Award,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HazardReportModal } from './HazardReportModal';
import { AudioReaderButton } from '../common/AudioReaderButton';

interface SafetyHubProps {
  onNavigateToTraining: () => void;
}

export const SafetyHub: React.FC<SafetyHubProps> = ({ onNavigateToTraining }) => {
  const { setActiveSOSModal, safetyReports, t } = useApp();
  const [isHazardModalOpen, setIsHazardModalOpen] = useState<boolean>(false);

  const narrationText = `Vayra Safety and SOS Hub. Press the SOS button for 3 seconds in an emergency to broadcast your live GPS to emergency contacts and police 112. You can also report unsafe worksites or take safety training modules.`;

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-2 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {t.navigation.safety}
          </h2>
          <p className="text-xs text-slate-500">24/7 worker safety protection & emergency alerts</p>
        </div>

        <AudioReaderButton textToRead={narrationText} size="sm" />
      </div>

      {/* 1-Tap SOS Emergency Primary Trigger Card */}
      <div className="bg-gradient-to-tr from-red-600 via-red-500 to-rose-600 rounded-3xl p-5 text-white shadow-xl shadow-red-500/25 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-extrabold">
            <ShieldAlert size={13} />
            High Priority Dispatch
          </span>
          <span className="text-[10px] text-red-100 font-bold">Auto GPS Pin</span>
        </div>

        <div>
          <h3 className="text-xl font-black">{t.safety.sosTitle}</h3>
          <p className="text-xs text-red-100 font-medium mt-0.5">
            {t.safety.sosSubtitle}
          </p>
        </div>

        <button
          onClick={() => setActiveSOSModal(true)}
          className="touch-target w-full py-3.5 px-4 rounded-2xl bg-white text-red-700 font-black text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <ShieldAlert size={20} className="text-red-600" />
          <span>Trigger Emergency SOS Alert</span>
        </button>
      </div>

      {/* Quick Helplines */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <a
          href="tel:112"
          className="touch-target p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-red-300 flex items-center gap-2.5 shadow-sm active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <PhoneCall size={16} />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 leading-tight">Call 112</div>
            <div className="text-[10px] text-slate-500">National Police / Medical</div>
          </div>
        </a>

        <a
          href="tel:1091"
          className="touch-target p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 flex items-center gap-2.5 shadow-sm active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <PhoneCall size={16} />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 leading-tight">Call 1091</div>
            <div className="text-[10px] text-slate-500">Women Helpline</div>
          </div>
        </a>
      </div>

      {/* Safety Actions Navigation */}
      <div className="space-y-2.5">
        {/* Action 1: Report Hazard */}
        <button
          type="button"
          onClick={() => setIsHazardModalOpen(true)}
          className="touch-target w-full p-4 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 text-left flex items-center justify-between shadow-sm active:scale-95 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                {t.safety.reportHazard}
              </h4>
              <p className="text-[11px] text-slate-500">
                Submit photo & voice note of unsafe scaffolding or missing PPE
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400" />
        </button>

        {/* Action 2: Safety Training Academy */}
        <button
          type="button"
          onClick={onNavigateToTraining}
          className="touch-target w-full p-4 rounded-3xl bg-white border border-slate-200 hover:border-sky-400 text-left flex items-center justify-between shadow-sm active:scale-95 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                {t.safety.safetyTraining}
              </h4>
              <p className="text-[11px] text-slate-500">
                Watch 60s micro-videos and earn certified profile badges
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400" />
        </button>
      </div>

      {/* Hazard Reports Logged */}
      {safetyReports.length > 0 && (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Your Reported Hazards ({safetyReports.length})
          </h3>
          <div className="space-y-2">
            {safetyReports.map((rep) => (
              <div key={rep.id} className="p-3 bg-red-50/60 rounded-2xl border border-red-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-900">{rep.category}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-200 text-red-900">
                    Under Review
                  </span>
                </div>
                <p className="text-slate-700">{rep.description}</p>
                <div className="text-[10px] text-slate-500">{rep.location}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <HazardReportModal
        isOpen={isHazardModalOpen}
        onClose={() => setIsHazardModalOpen(false)}
      />
    </div>
  );
};
