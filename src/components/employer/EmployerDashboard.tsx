import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  PlusCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostJobModal } from './PostJobModal';
import { AudioReaderButton } from '../common/AudioReaderButton';

interface EmployerDashboardProps {
  onNavigateTab: (tab: any) => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ onNavigateTab }) => {
  const { currentEmployer, jobs, activeShift, t } = useApp();
  const [isPostOpen, setIsPostOpen] = useState<boolean>(false);

  const activeJobs = jobs.filter(j => j.status === 'open');

  const narrationText = `Employer Dashboard for ${currentEmployer.companyName}. You have ${activeJobs.length} active job postings. 1 worker on site today with shift attendance tracking.`;

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-2 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white rounded-3xl p-5 shadow-xl border border-slate-700 relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/40">
              <ShieldCheck size={12} />
              Verified Employer
            </span>
            <h2 className="text-xl font-extrabold tracking-tight mt-1">
              {currentEmployer.companyName}
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              {currentEmployer.location}
            </p>
          </div>

          <AudioReaderButton
            textToRead={narrationText}
            size="sm"
            className="bg-white/10 text-white hover:bg-white/20"
          />
        </div>

        {/* Overview Numbers */}
        <div className="grid grid-cols-3 gap-2 bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
          <div>
            <div className="text-lg font-black text-white">{activeJobs.length}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Active Jobs</div>
          </div>
          <div>
            <div className="text-lg font-black text-emerald-400">1</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">On-Site Today</div>
          </div>
          <div>
            <div className="text-lg font-black text-amber-400">4.8 ★</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Safety Score</div>
          </div>
        </div>
      </div>

      {/* Quick Post A Job Button */}
      <button
        onClick={() => setIsPostOpen(true)}
        className="touch-target w-full py-4 px-5 rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-black text-sm shadow-xl shadow-sky-500/25 flex items-center justify-between active:scale-95 transition-all"
      >
        <div className="flex items-center gap-2.5 text-left">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <PlusCircle size={24} />
          </div>
          <div>
            <div>{t.postAJob}</div>
            <span className="text-[11px] font-normal text-sky-100">
              With Fair Wage Recommendation Advisor
            </span>
          </div>
        </div>
        <ChevronRight size={20} />
      </button>

      {/* Active Worksite Shifts Widget */}
      {activeShift && (
        <div
          onClick={() => onNavigateTab('shifts')}
          className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 hover:border-sky-300 transition-all cursor-pointer space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">
              <Clock size={12} />
              Active Shift Attendance
            </span>
            <span className="text-xs font-bold text-sky-600 flex items-center">
              Verify OTP <ChevronRight size={14} />
            </span>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-slate-900">{activeShift.jobTitle}</h4>
            <p className="text-xs text-slate-500">
              Worker: <span className="font-bold text-slate-800">{activeShift.workerName}</span> • ₹{activeShift.agreedWage}/day
            </p>
          </div>
        </div>
      )}

      {/* Active Job Postings List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Your Active Job Postings ({activeJobs.length})
          </h3>
        </div>

        {activeJobs.map((j) => (
          <div
            key={j.id}
            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">{j.profession}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                {t.fairWageBadge}
              </span>
            </div>

            <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{j.title}</h4>

            <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-2xl">
              <span>₹{j.employerOfferedSalary.amount}/day</span>
              <span>{j.workersNeeded} Workers Needed</span>
            </div>
          </div>
        ))}
      </div>

      <PostJobModal isOpen={isPostOpen} onClose={() => setIsPostOpen(false)} />
    </div>
  );
};
