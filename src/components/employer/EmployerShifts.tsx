import React, { useState } from 'react';
import {
  Clock,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmployerShifts: React.FC = () => {
  const { activeShift, verifyCheckInOtp, verifyCompletionOtp, t } = useApp();

  const [checkInInput, setCheckInInput] = useState<string>('');
  const [completionInput, setCompletionInput] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!activeShift) {
    return (
      <div className="max-w-md mx-auto px-3.5 py-16 text-center space-y-3 animate-fadeIn">
        <Clock size={44} className="mx-auto text-slate-300" />
        <h3 className="text-base font-bold text-slate-800">No Active Shifts Today</h3>
        <p className="text-xs text-slate-500">
          When workers arrive at your worksite, enter their check-in OTP here to verify attendance.
        </p>
      </div>
    );
  }

  const handleVerifyCheckIn = () => {
    const res = verifyCheckInOtp(checkInInput);
    setStatusMsg({ text: res.message, isError: !res.success });
  };

  const handleVerifyCompletion = () => {
    const res = verifyCompletionOtp(completionInput);
    setStatusMsg({ text: res.message, isError: !res.success });
  };

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-2 animate-fadeIn">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Shift Attendance & Handover
        </h2>
        <p className="text-xs text-slate-500">OTP-verified shift handshake & tool inspection</p>
      </div>

      {statusMsg && (
        <div
          className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
            statusMsg.isError
              ? 'bg-red-100 text-red-800 border border-red-200'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
          }`}
        >
          {statusMsg.isError ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Shift Card */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
              activeShift.status === 'in_progress'
                ? 'bg-emerald-100 text-emerald-800'
                : activeShift.status === 'completed'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            Status: {activeShift.status.toUpperCase()}
          </span>
          <span className="text-xs font-extrabold text-emerald-700">₹{activeShift.agreedWage}/day</span>
        </div>

        <div>
          <h3 className="font-black text-base text-slate-900">{activeShift.jobTitle}</h3>
          <p className="text-xs text-slate-500">
            Worker: <span className="font-bold text-slate-800">{activeShift.workerName}</span>
          </p>
        </div>
      </div>

      {/* STEP 1: Verify Worker's Check-in OTP */}
      {activeShift.status === 'scheduled' && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <KeyRound size={16} className="text-sky-600" />
            <span>{t.otpHandshake.employerVerifyPrompt}</span>
          </div>

          <p className="text-xs text-slate-500">
            Ask the worker for their 4-digit check-in code shown on their Vayra app (Demo code: <strong>7421</strong>).
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={checkInInput}
              onChange={(e) => setCheckInInput(e.target.value)}
              placeholder="7421"
              maxLength={4}
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 font-mono font-black text-lg tracking-widest text-slate-900 text-center focus:border-sky-500"
            />
            <button
              onClick={handleVerifyCheckIn}
              className="touch-target px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 active:scale-95"
            >
              Verify Check-In
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Shift in Progress & Tool Handover */}
      {activeShift.status === 'in_progress' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 rounded-3xl p-4 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>Shift is Live & In Progress</span>
            </div>
            <p className="text-xs text-emerald-800">
              Worker check-in confirmed. Both parties are covered by Vayra safety incident insurance.
            </p>
          </div>

          {/* Checkout OTP Input */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>{t.otpHandshake.checkoutTitle}</span>
            </div>

            <p className="text-xs text-slate-500">
              Inspect completed work and tools. Enter Worker's Completion OTP to release payment (Demo code: <strong>9153</strong>).
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={completionInput}
                onChange={(e) => setCompletionInput(e.target.value)}
                placeholder="9153"
                maxLength={4}
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 font-mono font-black text-lg tracking-widest text-slate-900 text-center focus:border-sky-500"
              />
              <button
                onClick={handleVerifyCompletion}
                className="touch-target px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 active:scale-95"
              >
                Sign-off & Release Wage
              </button>
            </div>
          </div>
        </div>
      )}

      {activeShift.status === 'completed' && (
        <div className="bg-blue-50 rounded-3xl p-5 border border-blue-200 text-center space-y-2">
          <CheckCircle2 size={32} className="mx-auto text-blue-600" />
          <h3 className="font-extrabold text-base text-blue-950">Shift Successfully Completed</h3>
          <p className="text-xs text-blue-800">
            Wage of ₹{activeShift.agreedWage} released to worker. Ratings & review logged.
          </p>
        </div>
      )}
    </div>
  );
};
