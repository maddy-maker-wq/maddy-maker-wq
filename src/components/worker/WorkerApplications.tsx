import React from 'react';
import { Briefcase, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkerApplications: React.FC = () => {
  const { applications, jobs, t } = useApp();

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-2 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {t.navigation.jobs}
          </h2>
          <p className="text-xs text-slate-500">Track your applied and scheduled worksites</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold">
          {applications.length} Active
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
          <Briefcase size={40} className="mx-auto text-slate-300" />
          <h3 className="text-base font-bold text-slate-800">No applications yet</h3>
          <p className="text-xs text-slate-500">
            Browse recommended jobs on your home feed and apply with 1 tap.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => {
            const job = jobs.find((j) => j.id === app.jobId);
            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    <Clock size={12} />
                    Under Review by Employer
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Applied today</span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {job?.title || 'Skilled Trade Job'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {job?.employerName} • {job?.location}
                  </p>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <span className="font-bold text-slate-700">Offered Wage</span>
                  <span className="font-extrabold text-emerald-700">
                    ₹{job?.employerOfferedSalary.amount}/{job?.employerOfferedSalary.period}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
