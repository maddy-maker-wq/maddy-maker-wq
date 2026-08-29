import React from 'react';
import {
  X,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Phone,
  Wrench,
  Sparkles,
  Camera
} from 'lucide-react';
import { JobPosting } from '../../types';
import { useApp } from '../../context/AppContext';
import { AudioReaderButton } from '../common/AudioReaderButton';

interface JobDetailModalProps {
  job: JobPosting | null;
  onClose: () => void;
  onApply: (jobId: string) => void;
  isApplied?: boolean;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onApply,
  isApplied
}) => {
  const { t } = useApp();

  if (!job) return null;

  const narrationText = `Job Details for ${job.title}. Offered wage is ${job.employerOfferedSalary.amount} rupees per ${job.employerOfferedSalary.period}. Recommended market wage is ${job.salaryRecommendation.suggestedMedian} rupees. Working hours: ${job.workingHours}. Location: ${job.location}, ${job.distanceKm} km away. Required skills: ${job.skills.join(', ')}. Description: ${job.description}.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white">
              <Sparkles size={12} />
              {job.matchScore || 90}% Match
            </span>
            <span className="text-xs font-bold text-slate-700">{job.profession}</span>
          </div>

          <div className="flex items-center gap-2">
            <AudioReaderButton textToRead={narrationText} size="sm" />
            <button
              onClick={onClose}
              className="touch-target p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-slate-900">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 leading-snug">
              {job.title}
            </h2>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
              <img
                src={job.employerAvatar}
                alt={job.employerName}
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
              />
              <span className="font-bold text-slate-800">{job.employerName}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-emerald-700 font-semibold">
                <ShieldCheck size={13} />
                Verified Worksite
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-3.5 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900">Offered Daily Wage</span>
              <div className="text-lg font-black text-emerald-700">
                ₹{job.employerOfferedSalary.amount}
                <span className="text-xs font-normal text-emerald-800">/{job.employerOfferedSalary.period}</span>
              </div>
            </div>

            <div className="text-[11px] text-emerald-800 space-y-1 border-t border-emerald-200/60 pt-2">
              <div className="flex items-center justify-between">
                <span>Fair Market Benchmark:</span>
                <span className="font-bold">₹{job.salaryRecommendation.suggestedMedian}/day</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Statutory Minimum Wage:</span>
                <span>₹{job.salaryRecommendation.recommendedMin}/day</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1 font-bold text-slate-700">
                <MapPin size={14} className="text-sky-600" />
                <span>Work Location</span>
              </div>
              <p className="text-slate-600 text-[11px]">{job.location} ({job.distanceKm} km away)</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1 font-bold text-slate-700">
                <Clock size={14} className="text-sky-600" />
                <span>Working Hours</span>
              </div>
              <p className="text-slate-600 text-[11px]">{job.workingHours}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Work Scope & Description
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {job.description}
            </p>
          </div>

          {job.workConditionMedia && job.workConditionMedia.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Camera size={14} className="text-sky-600" />
                <span>Employer Worksite Condition Photo</span>
              </h4>
              <div className="rounded-2xl overflow-hidden border border-slate-200 relative group">
                <img
                  src={job.workConditionMedia[0].url}
                  alt="Worksite Condition"
                  className="w-full h-36 object-cover"
                />
                <div className="p-2.5 bg-slate-900/90 text-white text-[11px]">
                  <p className="font-semibold">{job.workConditionMedia[0].description}</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">
                    Precautions: {job.workConditionMedia[0].precautions.join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {job.equipmentItems && job.equipmentItems.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Wrench size={14} className="text-sky-600" />
                <span>Tools & Equipment Provided</span>
              </h4>
              <div className="space-y-1.5">
                {job.equipmentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">{item.name}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 uppercase">
                      Provided by {item.providedBy}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 text-[11px] font-bold">
            {job.facilities.food && (
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                🍜 Meals Provided
              </span>
            )}
            {job.facilities.transportation && (
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                🚌 Travel Pickup Provided
              </span>
            )}
            {job.facilities.accommodation && (
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                🏠 Stay Provided
              </span>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
          <a
            href={`tel:${job.employerPhone}`}
            className="touch-target p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 active:scale-95"
            title="Call Employer"
          >
            <Phone size={18} />
          </a>

          {isApplied ? (
            <button
              disabled
              className="touch-target flex-1 py-3 rounded-2xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <CheckCircle2 size={18} />
              <span>Application Submitted</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onApply(job.id);
                onClose();
              }}
              className="touch-target flex-1 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>{t.apply}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
