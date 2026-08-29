import React from 'react';
import { MapPin, ShieldCheck, IndianRupee, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { JobPosting } from '../../types';
import { useApp } from '../../context/AppContext';
import { AudioReaderButton } from '../common/AudioReaderButton';

interface JobCardProps {
  job: JobPosting;
  onSelect: (job: JobPosting) => void;
  onApply: (jobId: string) => void;
  isApplied?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onSelect, onApply, isApplied }) => {
  const { t } = useApp();

  const narrationText = `${job.title}. Offered wage: ${job.employerOfferedSalary.amount} rupees per ${job.employerOfferedSalary.period}. Located at ${job.location}, ${job.distanceKm} kilometers away. Employer: ${job.employerName}.`;

  return (
    <div
      onClick={() => onSelect(job)}
      className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md border border-slate-200 hover:border-sky-300 transition-all cursor-pointer space-y-3 relative group"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm">
            <Sparkles size={12} />
            {job.matchScore || 90}% Match
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck size={11} />
            {t.fairWageBadge}
          </span>
        </div>
        <AudioReaderButton textToRead={narrationText} size="sm" />
      </div>

      <div>
        <h3 className="font-extrabold text-base text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
          {job.title}
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
          <span>{job.employerName}</span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold">Verified Worksite</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-2xl p-2.5 border border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0">
            ₹
          </div>
          <div>
            <div className="text-sm font-black text-slate-900 leading-tight">
              ₹{job.employerOfferedSalary.amount}
              <span className="text-[10px] text-slate-500 font-normal">/{job.employerOfferedSalary.period}</span>
            </div>
            <div className="text-[10px] text-emerald-600 font-bold">Fair Rate Guaranteed</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <MapPin size={16} />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-slate-800 truncate">{job.distanceKm} km</div>
            <div className="text-[10px] text-slate-500 truncate">{job.location}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {job.skills.slice(0, 3).map((sk, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold"
          >
            {sk}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <span className="text-[11px] text-slate-400 font-medium">
          {job.workingHours}
        </span>

        {isApplied ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
            <CheckCircle2 size={15} />
            {t.applied}
          </span>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onApply(job.id);
            }}
            className="touch-target px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-500/20 active:scale-95 transition-all flex items-center gap-1"
          >
            <span>{t.apply}</span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
