import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  Camera,
  Mic,
  CheckCircle2,
  MapPin,
  Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HazardReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HazardReportModal: React.FC<HazardReportModalProps> = ({ isOpen, onClose }) => {
  const { submitHazardReport, t } = useApp();

  const [category, setCategory] = useState<any>('Unsafe workplace');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('Sector 25, Cyber City Site');
  const [urgent, setUrgent] = useState<boolean>(true);
  const [photoAttached, setPhotoAttached] = useState<boolean>(true);
  const [voiceRecorded, setVoiceRecorded] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitHazardReport({
      category,
      description: description || 'Broken scaffolding planks on 3rd floor without safety netting.',
      location,
      urgent
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-red-100 flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-red-50/70">
          <div className="flex items-center gap-2 text-red-700 font-extrabold text-sm">
            <AlertTriangle size={18} />
            <span>{t.safety.reportHazard}</span>
          </div>
          <button
            onClick={onClose}
            className="touch-target p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            {t.safety.hazardDesc}
          </p>

          {/* Hazard Category */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Hazard Category (खतरे का प्रकार)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-900 bg-white"
            >
              <option value="Unsafe workplace">Unsafe Scaffolding / Heights</option>
              <option value="Unsafe behavior">Missing PPE / No Safety Harness</option>
              <option value="Threats">Exposed Live High-Voltage Wires</option>
              <option value="Harassment">Hazardous Chemical / Fume Leak</option>
              <option value="Fraud/scams">Wage Dispute / Contract Violation</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Worksite Location</label>
            <div className="relative flex items-center">
              <MapPin size={16} className="absolute left-3 text-slate-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-900"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Scaffolding has broken timber on 3rd floor..."
              className="w-full p-3 rounded-xl border border-slate-200 text-slate-900"
            />
          </div>

          {/* Media Attachments */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPhotoAttached(!photoAttached)}
              className={`touch-target p-3 rounded-2xl border text-center font-bold flex flex-col items-center gap-1 transition-all ${
                photoAttached
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              <Camera size={18} />
              <span>{photoAttached ? '✓ Photo Attached' : 'Attach Photo'}</span>
            </button>

            <button
              type="button"
              onClick={() => setVoiceRecorded(!voiceRecorded)}
              className={`touch-target p-3 rounded-2xl border text-center font-bold flex flex-col items-center gap-1 transition-all ${
                voiceRecorded
                  ? 'border-purple-500 bg-purple-50 text-purple-800'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              <Mic size={18} />
              <span>{voiceRecorded ? '✓ Voice Note (0:15)' : 'Record Voice'}</span>
            </button>
          </div>

          {/* Urgent Toggle */}
          <label className="flex items-center gap-2 p-3 bg-red-50 rounded-2xl border border-red-200 text-red-900 cursor-pointer">
            <input
              type="checkbox"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span className="font-bold">Mark as Critical / Stop-Work Hazard</span>
          </label>

          <button
            type="submit"
            className="touch-target w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-lg shadow-red-500/25 active:scale-95 transition-all"
          >
            Submit Confidential Hazard Report
          </button>
        </form>
      </div>
    </div>
  );
};
