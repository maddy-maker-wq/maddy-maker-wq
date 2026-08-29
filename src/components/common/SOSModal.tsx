import React, { useState, useEffect } from 'react';
import { ShieldAlert, PhoneCall, CheckCircle, AlertTriangle, X, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SOSModal: React.FC = () => {
  const {
    activeSOSModal,
    setActiveSOSModal,
    triggerSOS,
    resolveSOS,
    sosActive,
    currentWorker,
    t
  } = useApp();

  const [holdingProgress, setHoldingProgress] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [sosSent, setSosSent] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;
    if (isHolding && holdingProgress < 100) {
      interval = setInterval(() => {
        setHoldingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            handleTriggerSuccess();
            return 100;
          }
          return prev + 5;
        });
      }, 50);
    } else if (!isHolding && holdingProgress > 0 && !sosSent) {
      setHoldingProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHolding, holdingProgress, sosSent]);

  if (!activeSOSModal) return null;

  const handleTriggerSuccess = async () => {
    await triggerSOS('Emergency SOS triggered from Vayra mobile hub.');
    setSosSent(true);
  };

  const handleClose = () => {
    setHoldingProgress(0);
    setIsHolding(false);
    setActiveSOSModal(false);
  };

  const handleResolve = () => {
    resolveSOS();
    setSosSent(false);
    setActiveSOSModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-red-100 flex flex-col text-center">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-red-600 font-black tracking-wider text-sm">
            <ShieldAlert size={20} />
            <span>{t.safety.sosTitle}</span>
          </div>
          <button
            onClick={handleClose}
            className="touch-target p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {!sosSent && !sosActive ? (
          <div className="py-5 flex flex-col items-center">
            <p className="text-xs text-slate-600 mb-6 font-medium">
              {t.safety.sosSubtitle}
            </p>

            {/* 3-Second Hold Button */}
            <div className="relative flex items-center justify-center my-2">
              {/* Progress Ring */}
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-100"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-red-500 transition-all duration-75"
                  fill="transparent"
                  strokeDasharray={390}
                  strokeDashoffset={390 - (390 * holdingProgress) / 100}
                  strokeLinecap="round"
                />
              </svg>

              <button
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}
                className={`absolute w-28 h-28 rounded-full flex flex-col items-center justify-center text-white font-black shadow-xl transition-all select-none ${
                  isHolding
                    ? 'bg-red-700 scale-95 shadow-red-600/50'
                    : 'bg-red-600 hover:bg-red-500 shadow-red-500/40 animate-pulse'
                }`}
              >
                <ShieldAlert size={36} />
                <span className="text-lg mt-0.5 tracking-wider">HOLD SOS</span>
                <span className="text-[10px] font-normal opacity-90">3 Seconds</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-6 flex items-center gap-1">
              <AlertTriangle size={13} className="text-amber-500" />
              Location GPS coordinates will be captured automatically
            </p>
          </div>
        ) : (
          <div className="py-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3 animate-bounce">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-lg font-extrabold text-red-600">EMERGENCY BROADCAST ACTIVE</h3>
            <p className="text-xs text-slate-600 mt-1 mb-4">
              Your live GPS location was dispatched via SMS & Web Alert to emergency contacts and worksite security.
            </p>

            <div className="w-full bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-left mb-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <MapPin size={15} className="text-red-500 shrink-0" />
                <span>Sector 25, DLF Cyber City, Gurugram (28.4595° N, 77.0266° E)</span>
              </div>
              <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-2">
                Contacts Alerted: Sunita Kumar (+91 9812345678), Suresh Verma (+91 9823456789)
              </div>
            </div>

            {/* Direct Helpline Dialers */}
            <div className="grid grid-cols-2 gap-2 w-full mb-4">
              <a
                href="tel:112"
                className="touch-target flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md shadow-red-500/20 active:scale-95"
              >
                <PhoneCall size={15} />
                <span>Call 112 (Police)</span>
              </a>
              <a
                href="tel:1091"
                className="touch-target flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md shadow-purple-500/20 active:scale-95"
              >
                <PhoneCall size={15} />
                <span>Call 1091 (Women)</span>
              </a>
            </div>

            <button
              onClick={handleResolve}
              className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
            >
              I am Safe Now (Cancel Alert)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
