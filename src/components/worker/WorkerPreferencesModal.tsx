import React, { useState } from 'react';
import {
  X,
  Sliders,
  MapPin,
  Clock,
  Calendar,
  IndianRupee,
  Briefcase,
  Sun,
  Moon,
  Compass,
  CheckCircle2,
  Sparkles,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ShiftType, EmploymentType, WorkerProfile } from '../../types';

interface WorkerPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shiftsList: { type: ShiftType; label: string; icon: string }[] = [
  { type: 'Day', label: 'Day Shift (दिन)', icon: '☀️' },
  { type: 'Night', label: 'Night Shift (रात)', icon: '🌙' },
  { type: 'Flexible', label: 'Flexible (लचीला समय)', icon: '🔄' },
];

const employmentTypesList: { type: EmploymentType; label: string }[] = [
  { type: 'Daily', label: 'Daily (दैनिक)' },
  { type: 'Weekly', label: 'Weekly (साप्ताहिक)' },
  { type: 'Monthly', label: 'Monthly (मासिक)' },
  { type: 'Full-time', label: 'Full-time (स्थायी)' },
  { type: 'Temporary', label: 'Temporary (अस्थायी)' },
  { type: 'Hourly', label: 'Hourly (प्रति घंटा)' },
];

const startDates = [
  'Immediate (तुरंत)',
  'Within 3 Days (3 दिनों में)',
  'Next Week (अगले हफ्ते)',
  'Next Month (अगले महीने)',
];

const hoursPresets = [
  '8:00 AM - 5:00 PM',
  '9:00 AM - 6:00 PM',
  '10:00 AM - 7:00 PM',
  '8:00 PM - 5:00 AM (Night)',
  'Flexible / Anytime',
];

export const WorkerPreferencesModal: React.FC<WorkerPreferencesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentWorker, updateWorkerPreferences, speak, t } = useApp();

  const [location, setLocation] = useState<string>(currentWorker.preferredLocation || 'South Delhi & Gurugram');
  const [distanceKm, setDistanceKm] = useState<number>(currentWorker.preferredDistanceKm || 15);
  const [localOrNonLocal, setLocalOrNonLocal] = useState<'local' | 'non-local' | 'any'>(
    currentWorker.localOrNonLocal || 'local'
  );
  const [selectedShifts, setSelectedShifts] = useState<ShiftType[]>(
    currentWorker.shiftPreference || ['Day', 'Flexible']
  );
  const [availableHours, setAvailableHours] = useState<string>(
    currentWorker.availableHours || '8:00 AM - 6:00 PM'
  );
  const [startDate, setStartDate] = useState<string>(
    currentWorker.preferredStartDate || 'Immediate (तुरंत)'
  );
  const [selectedEmpTypes, setSelectedEmpTypes] = useState<EmploymentType[]>(
    currentWorker.employmentTypePreference || ['Daily', 'Full-time']
  );
  const [expectedWage, setExpectedWage] = useState<number>(
    currentWorker.expectedSalary?.amount || 900
  );
  const [wagePeriod, setWagePeriod] = useState<'hour' | 'day' | 'week' | 'month'>(
    currentWorker.expectedSalary?.period || 'day'
  );
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleShift = (shift: ShiftType) => {
    if (selectedShifts.includes(shift)) {
      if (selectedShifts.length > 1) {
        setSelectedShifts(selectedShifts.filter((s) => s !== shift));
      }
    } else {
      setSelectedShifts([...selectedShifts, shift]);
    }
  };

  const toggleEmpType = (empType: EmploymentType) => {
    if (selectedEmpTypes.includes(empType)) {
      if (selectedEmpTypes.length > 1) {
        setSelectedEmpTypes(selectedEmpTypes.filter((e) => e !== empType));
      }
    } else {
      setSelectedEmpTypes([...selectedEmpTypes, empType]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkerPreferences({
      preferredLocation: location,
      preferredDistanceKm: distanceKm,
      localOrNonLocal,
      shiftPreference: selectedShifts,
      availableHours,
      preferredStartDate: startDate,
      employmentTypePreference: selectedEmpTypes,
      expectedSalary: {
        amount: expectedWage,
        period: wagePeriod,
      },
    });

    setSavedSuccess(true);
    speak('Your job and work preferences have been updated successfully.');
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-sky-50 to-cyan-50">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-600/30">
              <Sliders size={18} />
            </div>
            <div>
              <h3>Job & Work Preferences</h3>
              <p className="text-[11px] text-slate-500 font-normal">काम और समय की प्राथमिकताएं</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="touch-target p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSave} className="p-4 overflow-y-auto space-y-4 text-xs">
          {savedSuccess && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl font-bold flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
              <span>Preferences updated & saved to your profile!</span>
            </div>
          )}

          {/* 1. Preferred Location */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin size={15} className="text-sky-600" />
              <span>Preferred Job Location (पसंदीदा कार्य क्षेत्र)</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. South Delhi, Noida, Gurugram"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 text-xs font-semibold text-slate-900"
            />
          </div>

          {/* 2. Local or Non-local Preference */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800 flex items-center gap-1.5">
              <Compass size={15} className="text-sky-600" />
              <span>Local vs Outstation Preference (स्थानीय या बाहर का काम)</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'local', label: 'Local Only (सिर्फ पास)' },
                { id: 'non-local', label: 'Outstation (अन्य शहर)' },
                { id: 'any', label: 'Any / Flexible (कहीं भी)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLocalOrNonLocal(opt.id as any)}
                  className={`touch-target p-2 rounded-xl border text-[11px] font-bold text-center transition-all ${
                    localOrNonLocal === opt.id
                      ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Preferred Working Distance */}
          <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Compass size={15} className="text-sky-600" />
                <span>Max Working Distance (अधिकतम दूरी)</span>
              </label>
              <span className="font-extrabold text-sky-700 text-sm">{distanceKm} km</span>
            </div>
            <input
              type="range"
              min={2}
              max={50}
              step={1}
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>2 km</span>
              <span>15 km</span>
              <span>30 km</span>
              <span>50+ km</span>
            </div>
          </div>

          {/* 4. Preferred Shift */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800 flex items-center gap-1.5">
              <Sun size={15} className="text-amber-500" />
              <span>Preferred Shift (शिफ्ट की पसंद - एकाधिक चुनें)</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {shiftsList.map((s) => {
                const isSelected = selectedShifts.includes(s.type);
                return (
                  <button
                    key={s.type}
                    type="button"
                    onClick={() => toggleShift(s.type)}
                    className={`touch-target p-2 rounded-xl border text-[11px] font-bold text-center flex flex-col items-center gap-0.5 transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base">{s.icon}</span>
                    <span>{s.type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Available Working Hours */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800 flex items-center gap-1.5">
              <Clock size={15} className="text-sky-600" />
              <span>Available Working Hours (काम के घंटे)</span>
            </label>
            <input
              type="text"
              value={availableHours}
              onChange={(e) => setAvailableHours(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-900"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {hoursPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAvailableHours(preset)}
                  className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-600 font-medium"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Preferred Start Date */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800 flex items-center gap-1.5">
              <Calendar size={15} className="text-sky-600" />
              <span>Preferred Start Date (कब से काम शुरू कर सकते हैं)</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {startDates.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setStartDate(d)}
                  className={`touch-target p-2 rounded-xl border text-[11px] font-bold text-left transition-all ${
                    startDate === d
                      ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* 7. Employment Type Preference */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800 flex items-center gap-1.5">
              <Briefcase size={15} className="text-sky-600" />
              <span>Employment Type (रोजगार का प्रकार - एकाधिक चुनें)</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {employmentTypesList.map((emp) => {
                const isSelected = selectedEmpTypes.includes(emp.type);
                return (
                  <button
                    key={emp.type}
                    type="button"
                    onClick={() => toggleEmpType(emp.type)}
                    className={`touch-target p-2 rounded-xl border text-[10px] font-bold text-center transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {emp.type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8. Expected Salary / Wage Range */}
          <div className="space-y-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 p-3.5 rounded-2xl border border-emerald-200">
            <label className="block font-bold text-emerald-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <IndianRupee size={15} className="text-emerald-700" />
                <span>Expected Salary / Wage (अपेक्षित मजदूरी दर)</span>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                Fair Wage Benchmark: ₹850-₹950
              </span>
            </label>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="relative flex items-center">
                <span className="absolute left-3 font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  value={expectedWage}
                  onChange={(e) => setExpectedWage(parseInt(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-emerald-300 font-black text-sm text-slate-900 bg-white"
                />
              </div>

              <select
                value={wagePeriod}
                onChange={(e) => setWagePeriod(e.target.value as any)}
                className="w-full p-2 rounded-xl border border-emerald-300 font-bold text-xs text-slate-900 bg-white"
              >
                <option value="day">Per Day (प्रति दिन)</option>
                <option value="hour">Per Hour (प्रति घंटा)</option>
                <option value="week">Per Week (प्रति सप्ताह)</option>
                <option value="month">Per Month (प्रति माह)</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="touch-target w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all mt-2"
          >
            <Save size={18} />
            <span>Save & Update Preferences</span>
          </button>
        </form>
      </div>
    </div>
  );
};
