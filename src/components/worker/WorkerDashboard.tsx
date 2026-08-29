import React, { useState } from 'react';
import {
  Search,
  Briefcase,
  Sliders,
  MapPin,
  Sun,
  IndianRupee
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobPosting } from '../../types';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';
import { WorkerPreferencesModal } from './WorkerPreferencesModal';
import { AudioReaderButton } from '../common/AudioReaderButton';

const tradePills = [
  { id: 'all', label: 'All Jobs' },
  { id: 'Electrician', label: '⚡ Electrician' },
  { id: 'Mason', label: '🧱 Mason' },
  { id: 'Plumber', label: '🔧 Plumber' },
  { id: 'Carpenter', label: '🪚 Carpenter' },
  { id: 'Painter', label: '🎨 Painter' },
];

export const WorkerDashboard: React.FC = () => {
  const {
    jobs,
    currentWorker,
    availableToday,
    setAvailableToday,
    applyToJob,
    applications,
    t
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isPrefModalOpen, setIsPrefModalOpen] = useState<boolean>(false);

  const appliedJobIds = new Set(applications.map(a => a.jobId));

  const filteredJobs = jobs.filter((j) => {
    const matchesTrade = selectedTrade === 'all' || j.profession.toLowerCase() === selectedTrade.toLowerCase();
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrade && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-2 animate-fadeIn">
      {/* Availability Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-3xl p-4 text-white shadow-xl shadow-sky-600/15 relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-100">
                Daily Availability
              </span>
              <AudioReaderButton
                textToRead={`Daily Availability Status: ${availableToday ? 'Available for work today. Nearby employers can contact you.' : 'Not available for work today.'}`}
                size="sm"
                className="bg-white/20 text-white hover:bg-white/30"
              />
            </div>
            <h2 className="text-base font-extrabold leading-snug mt-0.5">
              {t.availableToday}
            </h2>
            <p className="text-[11px] text-sky-100 font-medium">
              {t.availableSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAvailableToday(!availableToday)}
            className={`touch-target relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none shrink-0 ${
              availableToday ? 'bg-emerald-400' : 'bg-slate-400/60'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${
                availableToday ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Quick Preferences Bar */}
      <div
        onClick={() => setIsPrefModalOpen(true)}
        className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 hover:border-sky-300 transition-all cursor-pointer flex items-center justify-between text-xs"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-7 h-7 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Sliders size={14} />
          </div>
          <div className="truncate">
            <span className="font-extrabold text-slate-900">{currentWorker.preferredLocation}</span>
            <span className="text-slate-400 mx-1">•</span>
            <span className="text-slate-600 font-semibold">{currentWorker.preferredDistanceKm} km max</span>
            <span className="text-slate-400 mx-1">•</span>
            <span className="text-emerald-700 font-bold">₹{currentWorker.expectedSalary.amount}/{currentWorker.expectedSalary.period}</span>
          </div>
        </div>

        <button
          type="button"
          className="text-xs font-bold text-sky-600 hover:text-sky-700 shrink-0 ml-2"
        >
          Edit
        </button>
      </div>

      {/* Local Wage Benchmark Ticker */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-base">📊</span>
          <div>
            <span className="font-extrabold text-amber-900">Average Electrician Rate: ₹900/day</span>
            <p className="text-[10px] text-amber-700">Cyber City & South Delhi benchmark</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 shrink-0">
          Fair Wage
        </span>
      </div>

      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search size={18} className="absolute left-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchJobs}
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs font-semibold text-slate-900 shadow-sm"
        />
      </div>

      {/* Category Trade Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tradePills.map((pill) => {
          const isSelected = selectedTrade === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setSelectedTrade(pill.id)}
              className={`touch-target px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* Recommended Jobs List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Recommended For You ({filteredJobs.length})
          </h3>
          <span className="text-[11px] text-sky-600 font-bold">Auto-Ranked by Match</span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 space-y-2">
            <Briefcase size={36} className="mx-auto text-slate-300" />
            <h4 className="text-sm font-bold text-slate-800">No matching jobs found</h4>
            <p className="text-xs text-slate-500">Try clearing filters or checking other categories.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSelect={(j) => setSelectedJob(j)}
              onApply={(id) => applyToJob(id)}
              isApplied={appliedJobIds.has(job.id)}
            />
          ))
        )}
      </div>

      {/* Modals */}
      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={(id) => applyToJob(id)}
        isApplied={selectedJob ? appliedJobIds.has(selectedJob.id) : false}
      />

      <WorkerPreferencesModal
        isOpen={isPrefModalOpen}
        onClose={() => setIsPrefModalOpen(false)}
      />
    </div>
  );
};
