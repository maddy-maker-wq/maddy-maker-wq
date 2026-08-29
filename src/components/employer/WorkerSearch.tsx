import React, { useState } from 'react';
import {
  Search,
  Star,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Award,
  PhoneCall,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkerProfile } from '../../types';

export const WorkerSearch: React.FC = () => {
  const { workers, t } = useApp();

  const [query, setQuery] = useState<string>('');
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  const filtered = workers.filter((w) => {
    const matchesTrade = selectedTrade === 'all' || w.profession.toLowerCase() === selectedTrade.toLowerCase();
    const matchesQuery =
      w.name.toLowerCase().includes(query.toLowerCase()) ||
      w.profession.toLowerCase().includes(query.toLowerCase()) ||
      w.skills.some(s => s.toLowerCase().includes(query.toLowerCase()));
    const matchesVerified = !verifiedOnly || w.isVerified;
    return matchesTrade && matchesQuery && matchesVerified;
  });

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-2 animate-fadeIn">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          {t.navigation.workers}
        </h2>
        <p className="text-xs text-slate-500">Discover government-verified skilled workers nearby</p>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center">
        <Search size={18} className="absolute left-3.5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchWorkers}
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:border-sky-500 shadow-sm"
        />
      </div>

      {/* Trade Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {['all', 'Electrician', 'Mason', 'Plumber', 'Carpenter', 'Painter'].map((tr) => (
          <button
            key={tr}
            onClick={() => setSelectedTrade(tr)}
            className={`touch-target px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedTrade === tr
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tr === 'all' ? 'All Trades' : tr}
          </button>
        ))}
      </div>

      {/* Worker List */}
      <div className="space-y-3">
        {filtered.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={w.avatar}
                  alt={w.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                    {w.name}
                  </h3>
                  <p className="text-xs font-bold text-sky-700 mt-0.5">{w.profession}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5 font-medium">
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star size={11} className="fill-amber-500 mr-0.5" />
                      {w.rating}
                    </span>
                    <span>•</span>
                    <span>{w.experienceYears} Yrs Exp</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-emerald-700">₹{w.expectedSalary.amount}</div>
                <div className="text-[10px] text-slate-400">/{w.expectedSalary.period}</div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5">
              {w.isVerified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  <ShieldCheck size={11} />
                  ID Verified
                </span>
              )}
              {w.safetyCertified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[10px] font-bold border border-sky-200">
                  <Award size={11} />
                  Safety Certified
                </span>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
              {w.skills.slice(0, 3).map((sk, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  {sk}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin size={13} className="text-slate-400" />
                {w.preferredLocation}
              </span>

              <a
                href={`tel:${w.phone}`}
                className="touch-target px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-500/20 active:scale-95 transition-all flex items-center gap-1"
              >
                <PhoneCall size={13} />
                <span>Call & Hire</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
