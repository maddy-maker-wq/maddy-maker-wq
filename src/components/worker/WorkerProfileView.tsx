import React, { useState } from 'react';
import {
  ShieldCheck,
  Star,
  Award,
  CheckCircle2,
  QrCode,
  Sliders,
  MapPin,
  Clock,
  Calendar,
  IndianRupee,
  Briefcase,
  Sun,
  Edit3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkerPreferencesModal } from './WorkerPreferencesModal';
import { AudioReaderButton } from '../common/AudioReaderButton';

export const WorkerProfileView: React.FC = () => {
  const { currentWorker, reviews, t } = useApp();
  const [isPrefOpen, setIsPrefOpen] = useState<boolean>(false);

  const narrationText = `Profile of ${currentWorker.name}. Profession: ${currentWorker.profession}. Experience: ${currentWorker.experienceYears} years. Preferred location is ${currentWorker.preferredLocation}, within ${currentWorker.preferredDistanceKm} kilometers. Shift preferences: ${currentWorker.shiftPreference.join(', ')}. Expected wage: ${currentWorker.expectedSalary.amount} rupees per ${currentWorker.expectedSalary.period}. Start date: ${currentWorker.preferredStartDate}.`;

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-2 animate-fadeIn">
      {/* Digital Vayra Card */}
      <div className="bg-gradient-to-tr from-slate-900 via-slate-800 to-sky-950 text-white rounded-3xl p-5 shadow-2xl border border-slate-700 relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold">
              <ShieldCheck size={13} />
              Aadhaar / e-Shram Verified
            </span>
          </div>

          <AudioReaderButton
            textToRead={narrationText}
            size="sm"
            className="bg-white/10 text-white hover:bg-white/20"
          />
        </div>

        <div className="flex items-center gap-4">
          <img
            src={currentWorker.avatar}
            alt={currentWorker.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-400 shadow-md shrink-0"
          />
          <div>
            <h2 className="text-xl font-black tracking-tight">{currentWorker.name}</h2>
            <div className="text-sm font-bold text-sky-300 mt-0.5">{currentWorker.profession}</div>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1 font-medium">
              <span className="flex items-center text-amber-400 font-bold">
                <Star size={13} className="fill-amber-400 mr-0.5" />
                {currentWorker.rating}
              </span>
              <span>•</span>
              <span>{currentWorker.totalCompletedJobs} Jobs Completed</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
          <div>
            <div className="text-base font-black text-white">{currentWorker.experienceYears} Yrs</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Experience</div>
          </div>
          <div>
            <div className="text-base font-black text-emerald-400">₹{currentWorker.expectedSalary.amount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Daily Rate</div>
          </div>
          <div>
            <div className="text-base font-black text-sky-400">{currentWorker.safetyScore}%</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Safety Score</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
          <span className="text-[11px] text-slate-400">Vayra Digital ID #VYR-101</span>
          <span className="inline-flex items-center gap-1 text-sky-300 font-bold">
            <QrCode size={16} />
            Scan to Verify
          </span>
        </div>
      </div>

      {/* JOB & WORK PREFERENCES CARD */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-700">
            <Sliders size={15} className="text-sky-600" />
            <span>Job & Work Preferences</span>
          </div>
          <button
            onClick={() => setIsPrefOpen(true)}
            className="touch-target px-3 py-1 rounded-full bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
          >
            <Edit3 size={13} />
            <span>Edit Preferences</span>
          </button>
        </div>

        {/* Preferences Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Location & Radius */}
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
              <MapPin size={12} className="text-sky-600" /> Location & Radius
            </span>
            <div className="font-extrabold text-slate-900 leading-snug">
              {currentWorker.preferredLocation}
            </div>
            <div className="text-[11px] text-sky-700 font-semibold">
              Max {currentWorker.preferredDistanceKm} km ({currentWorker.localOrNonLocal === 'local' ? 'Local Only' : currentWorker.localOrNonLocal === 'non-local' ? 'Outstation' : 'Flexible'})
            </div>
          </div>

          {/* Expected Salary / Wage */}
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
              <IndianRupee size={12} className="text-emerald-600" /> Expected Wage
            </span>
            <div className="font-black text-emerald-700 text-base leading-snug">
              ₹{currentWorker.expectedSalary.amount}
              <span className="text-xs text-slate-500 font-normal">/{currentWorker.expectedSalary.period}</span>
            </div>
            <div className="text-[10px] text-emerald-800 font-medium">Fair Market Matched</div>
          </div>

          {/* Shift Preferences */}
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
              <Sun size={12} className="text-amber-500" /> Preferred Shifts
            </span>
            <div className="flex flex-wrap gap-1">
              {currentWorker.shiftPreference.map((s, idx) => (
                <span key={idx} className="px-1.5 py-0.5 rounded bg-white text-[10px] font-bold text-slate-800 border border-slate-200">
                  {s} Shift
                </span>
              ))}
            </div>
            <div className="text-[10px] text-slate-500">{currentWorker.availableHours}</div>
          </div>

          {/* Employment Type & Start Date */}
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
              <Briefcase size={12} className="text-sky-600" /> Type & Start
            </span>
            <div className="flex flex-wrap gap-1">
              {currentWorker.employmentTypePreference.map((e, idx) => (
                <span key={idx} className="px-1.5 py-0.5 rounded bg-white text-[10px] font-bold text-slate-800 border border-slate-200">
                  {e}
                </span>
              ))}
            </div>
            <div className="text-[10px] text-emerald-700 font-bold">Start: {currentWorker.preferredStartDate}</div>
          </div>
        </div>
      </div>

      {/* Verified Skills */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Verified Trade Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {currentWorker.skills.map((sk, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-sky-50 text-sky-800 text-xs font-bold border border-sky-100"
            >
              <CheckCircle2 size={13} className="text-sky-600" />
              {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Safety Certifications */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-4 border border-emerald-200 space-y-2">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
          <Award size={18} className="text-emerald-600" />
          <span>Vayra Safety Certified Professional</span>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed font-medium">
          Completed high-voltage insulation, scaffold harness safety, and emergency first-aid micro-modules.
        </p>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Employer Reviews ({reviews.length})
          </h3>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
            <Star size={13} className="fill-amber-500 text-amber-500" />
            4.9 / 5.0
          </span>
        </div>

        <div className="space-y-3">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{rev.fromUserName}</span>
                <div className="flex items-center text-amber-500">
                  <Star size={12} className="fill-amber-500" />
                  <span className="ml-1 font-bold text-slate-700">{rev.rating}</span>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {rev.tags.map((tag, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-white text-[10px] font-semibold text-slate-600 border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences Edit Modal */}
      <WorkerPreferencesModal
        isOpen={isPrefOpen}
        onClose={() => setIsPrefOpen(false)}
      />
    </div>
  );
};
