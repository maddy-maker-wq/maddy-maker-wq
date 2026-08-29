import React from 'react';
import {
  Building2,
  ShieldCheck,
  Star,
  MapPin,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmployerProfileView: React.FC = () => {
  const { currentEmployer, jobs, t } = useApp();

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-2 animate-fadeIn">
      {/* Employer Business Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center gap-3.5">
          <img
            src={currentEmployer.avatar}
            alt={currentEmployer.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
          />
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              <ShieldCheck size={11} />
              GST Verified Business
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1 leading-tight">
              {currentEmployer.companyName}
            </h2>
            <p className="text-xs text-slate-500 font-medium">{currentEmployer.businessType}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center">
          <div>
            <div className="text-base font-black text-slate-900">{currentEmployer.totalJobsPosted}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Jobs Posted</div>
          </div>
          <div>
            <div className="text-base font-black text-amber-500 flex items-center justify-center gap-0.5">
              <Star size={14} className="fill-amber-500" />
              {currentEmployer.rating}
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Employer Rating</div>
          </div>
          <div>
            <div className="text-base font-black text-emerald-600">100%</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Fair Wage Score</div>
          </div>
        </div>
      </div>

      {/* Workplace Conditions & Safety Showcase */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Camera size={14} className="text-sky-600" />
            <span>Workplace Safety Photos</span>
          </h3>
          <span className="text-[11px] text-emerald-600 font-bold">Safety Inspected</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=400&auto=format&fit=crop&q=80"
            alt="Workplace Site 1"
            className="w-full h-28 object-cover rounded-2xl border border-slate-100"
          />
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop&q=80"
            alt="Workplace Site 2"
            className="w-full h-28 object-cover rounded-2xl border border-slate-100"
          />
        </div>
      </div>
    </div>
  );
};
