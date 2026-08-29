import React, { useState } from 'react';
import {
  Clock,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Wrench
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AudioReaderButton } from '../common/AudioReaderButton';

export const LiveShiftWorker: React.FC = () => {
  const { activeShift, t } = useApp();

  if (!activeShift) {
    return (
      <div className="max-w-md mx-auto px-3.5 py-16 text-center space-y-3 animate-fadeIn">
        <Clock size={44} className="mx-auto text-slate-300" />
        <h3 className="text-base font-bold text-slate-800">No Active Shift Today</h3>
        <p className="text-xs text-slate-500">
          When an employer hires you, your shift check-in code and attendance status will appear here.
        </p>
      </div>
    );
  }

  const narrationText = `Live Shift for ${activeShift.jobTitle}. Employer: ${activeShift.employerName}. Shift status is ${activeShift.status}. Your 4-digit check-in OTP to show the employer is ${activeShift.checkInOtp}. Agreed wage is ${activeShift.agreedWage} rupees.`;

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-2 animate-fadeIn">
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold ${
              activeShift.status === 'in_progress'
                ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                : activeShift.status === 'completed'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            <Clock size={13} />
            {activeShift.status === 'in_progress'
              ? 'Shift In Progress'
              : activeShift.status === 'completed'
              ? 'Shift Completed'
              : 'Scheduled for Today'}
          </span>

          <AudioReaderButton textToRead={narrationText} size="sm" />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-900 leading-snug">
            {activeShift.jobTitle}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Employer: <span className="font-bold text-slate-800">{activeShift.employerName}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-2xl p-3 border border-slate-100 text-xs">
          <div>
            <span className="text-slate-500 text-[10px]">Agreed Wage:</span>
            <div className="text-base font-black text-emerald-700">₹{activeShift.agreedWage}/day</div>
          </div>
          <div>
            <span className="text-slate-500 text-[10px]">Worksite GPS:</span>
            <div className="flex items-center gap-1 text-emerald-700 font-bold text-[11px] mt-0.5">
              <ShieldCheck size={14} />
              <span>Verified On Site</span>
            </div>
          </div>
        </div>
      </div>

      {/* Check-in OTP Box */}
      <div className="bg-gradient-to-tr from-sky-600 to-cyan-600 rounded-3xl p-5 text-white shadow-xl shadow-sky-500/20 text-center space-y-3">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-100">
          <KeyRound size={16} />
          <span>{t.otpHandshake.checkInTitle}</span>
        </div>

        <p className="text-xs text-sky-100 font-medium">
          {t.otpHandshake.checkInDesc}
        </p>

        <div className="bg-white text-slate-900 rounded-2xl py-3 px-6 inline-block font-mono font-black text-3xl tracking-[0.4em] shadow-lg">
          {activeShift.checkInOtp}
        </div>

        <p className="text-[11px] text-sky-100 opacity-90">
          Status: {activeShift.status === 'in_progress' ? '✅ Check-in Verified by Employer' : '⏳ Awaiting Employer Input'}
        </p>
      </div>

      {/* Tool Handover */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Wrench size={16} className="text-sky-600" />
            <span>Tools & Equipment Log</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
            Handover Logged
          </span>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl space-y-1 border border-slate-100">
          <div className="flex items-center justify-between">
            <span>Insulated Safety Gloves:</span>
            <span className="font-semibold text-emerald-700">Good Condition</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Hammer Drill & Multimeter:</span>
            <span className="font-semibold text-emerald-700">Checked Out by Employer</span>
          </div>
        </div>
      </div>

      {/* Work Completion Card */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{t.otpHandshake.checkoutTitle}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          {t.otpHandshake.checkoutDesc}
        </p>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-medium text-amber-900 flex items-center justify-between">
          <span>Completion OTP:</span>
          <span className="font-mono font-black text-base text-amber-950 tracking-widest">
            {activeShift.completionOtp}
          </span>
        </div>
      </div>
    </div>
  );
};
