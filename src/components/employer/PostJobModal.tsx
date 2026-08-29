import React, { useState } from 'react';
import {
  X,
  Sparkles,
  MapPin,
  IndianRupee,
  ShieldCheck,
  Camera,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateFairWage, getWageComplianceLevel } from '../../utils/wageCalculator';
import { JobPosting } from '../../types';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const trades = [
  'Electrician',
  'Mason',
  'Plumber',
  'Carpenter',
  'Painter',
  'Welder',
  'Helper',
  'Driver'
];

export const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose }) => {
  const { postJob, currentEmployer, t } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [profession, setProfession] = useState<string>('Electrician');
  const [title, setTitle] = useState<string>('Skilled Electrician for Residential Wiring');
  const [workersNeeded, setWorkersNeeded] = useState<number>(2);
  const [location, setLocation] = useState<string>('Sector 62, Noida');
  const [workingHours, setWorkingHours] = useState<string>('9:00 AM - 6:00 PM');
  const [offeredWage, setOfferedWage] = useState<number>(900);
  const [workerBringsTools, setWorkerBringsTools] = useState<boolean>(false);
  const [mealsProvided, setMealsProvided] = useState<boolean>(true);
  const [description, setDescription] = useState<string>('Installation of distribution box, wiring, and conduit pipes. Clean site with safety gear provided.');

  if (!isOpen) return null;

  const benchmark = calculateFairWage(profession, 'day', workerBringsTools, 3);
  const compliance = getWageComplianceLevel(offeredWage, profession, 'day');

  const handleSubmit = () => {
    const jobData: Partial<JobPosting> = {
      title,
      profession,
      skills: [profession, 'General Maintenance', 'Safety Compliant'],
      workersNeeded,
      location,
      workingHours,
      description,
      employerOfferedSalary: {
        amount: offeredWage,
        period: 'day'
      },
      salaryRecommendation: benchmark,
      facilities: {
        food: mealsProvided,
        accommodation: false,
        transportation: false
      },
      equipmentResponsibility: workerBringsTools ? 'worker_own' : 'employer_all',
      equipmentItems: [
        {
          id: 'eq-gen-1',
          name: 'Safety Helmet & Reflective Vest',
          category: 'safety',
          providedBy: 'employer',
          isRequired: true
        }
      ],
      workConditionMedia: [
        {
          id: 'wcm-1',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
          description: 'Safe construction floor with scaffolding railings.',
          scopeOfWork: 'Internal wiring and panel fitting.',
          hazards: ['Working with hand tools'],
          precautions: ['Safety boots and helmet mandatory'],
          updatedAt: '2026-08-29'
        }
      ]
    };

    postJob(jobData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-600">
              Step {step} of 3
            </span>
            <h2 className="text-base font-extrabold text-slate-900 leading-tight">
              {t.postAJob}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="touch-target p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* STEP 1: Profession & Basic Details */}
          {step === 1 && (
            <div className="space-y-3.5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Trade Category (पेशा चुनें)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {trades.map((tr) => (
                    <button
                      key={tr}
                      type="button"
                      onClick={() => {
                        setProfession(tr);
                        setTitle(`Skilled ${tr} Needed`);
                      }}
                      className={`touch-target p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                        profession === tr
                          ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {tr}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Workers Needed
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={workersNeeded}
                    onChange={(e) => setWorkersNeeded(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Work Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Smart Fair Wage Advisor */}
          {step === 2 && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold text-xs uppercase tracking-wider">
                  <Sparkles size={14} className="text-emerald-600" />
                  <span>{t.wageAdvisor.title}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-emerald-200/60">
                  <div>
                    <span className="text-[10px] text-slate-500">Market Fair Rate:</span>
                    <div className="font-extrabold text-emerald-700 text-base">₹{benchmark.suggestedMedian}/day</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Statutory Min Wage:</span>
                    <div className="font-bold text-slate-700 text-sm">₹{benchmark.recommendedMin}/day</div>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-800 font-medium">
                  {benchmark.factorsExplanation.join(' • ')}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Offered Daily Wage (₹ / Day)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-500 font-bold">₹</span>
                  <input
                    type="number"
                    value={offeredWage}
                    onChange={(e) => setOfferedWage(parseInt(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-base font-black text-slate-900 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Wage Compliance Badge Status */}
              <div>
                {compliance === 'fair_wage' && (
                  <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                    <div>
                      <strong>Fair Wage Guarantee Active:</strong> Your job post will earn the verified green badge and receive 65% faster applications.
                    </div>
                  </div>
                )}
                {compliance === 'legal_minimum' && (
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 text-xs flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber-600 shrink-0" />
                    <div>
                      Meets statutory minimum wage, but is below regional market average (₹{benchmark.suggestedMedian}/day).
                    </div>
                  </div>
                )}
                {compliance === 'substandard' && (
                  <div className="p-3 rounded-2xl bg-red-50 text-red-900 border border-red-200 text-xs flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-600 shrink-0" />
                    <div>
                      {t.wageAdvisor.belowMinimumWarning} Minimum legal wage is ₹{benchmark.recommendedMin}/day.
                    </div>
                  </div>
                )}
              </div>

              {/* Equipment Responsibility Toggle */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-bold text-slate-800">Worker Brings Heavy Power Tools?</span>
                  <input
                    type="checkbox"
                    checked={workerBringsTools}
                    onChange={(e) => {
                      setWorkerBringsTools(e.target.checked);
                      if (e.target.checked) setOfferedWage(prev => prev + 150);
                      else setOfferedWage(prev => Math.max(500, prev - 150));
                    }}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                  />
                </label>
                <p className="text-[11px] text-slate-500">
                  Adds auto-calculated +₹150/day tool allowance to fair wage benchmark.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Worksite Safety & Facilities */}
          {step === 3 && (
            <div className="space-y-3.5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Scope of Work / Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-sky-500"
                />
              </div>

              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                  <ShieldCheck size={16} className="text-sky-600" />
                  <span>Workplace Safety & Facilities</span>
                </div>

                <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={mealsProvided}
                    onChange={(e) => setMealsProvided(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600"
                  />
                  <span>Drinking Water & Free Meals Provided</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <input type="checkbox" defaultChecked disabled className="w-4 h-4 rounded text-sky-600" />
                  <span>Safety Helmets & Gloves Provided on Site (Mandatory)</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between gap-2">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="touch-target px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="touch-target px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
            >
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((step + 1) as any)}
              className="touch-target flex-1 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold shadow-lg shadow-sky-500/25 flex items-center justify-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="touch-target flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={16} />
              <span>Publish Job Post</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
