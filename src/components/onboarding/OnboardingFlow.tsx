import React, { useState } from 'react';
import {
  Globe,
  Phone,
  KeyRound,
  UserCheck,
  Briefcase,
  HardHat,
  ArrowRight,
  Sparkles,
  Volume2,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language, UserRole } from '../../types';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  welcomeVoice: string;
}

const languages: LanguageOption[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', welcomeVoice: 'वायरा में आपका स्वागत है। अपनी भाषा चुनें।' },
  { code: 'en', name: 'English', nativeName: 'English', welcomeVoice: 'Welcome to Vayra. Choose your language.' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', welcomeVoice: 'வைராவுக்கு வரவேற்கிறோம்.' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', welcomeVoice: 'వైరాకి స్వాగతం.' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', welcomeVoice: 'ವೈರಾಗೆ ಸುಸ್ವಾಗತ.' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', welcomeVoice: 'वायरा मध्ये आपले स्वागत आहे.' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', welcomeVoice: 'ভায়রায় আপনাকে স্বাগতম।' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', welcomeVoice: 'વાયરામાં આપનું સ્વાગત છે.' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', welcomeVoice: 'വൈരയിലേക്ക് സ്വാഗതം.' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', welcomeVoice: 'ਵਾਇਰਾ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ।' },
];

export const OnboardingFlow: React.FC = () => {
  const { language, setLanguage, completeOnboarding, speak, t } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>('9876543210');
  const [otp, setOtp] = useState<string>('7421');
  const [selectedRole, setSelectedRole] = useState<UserRole>('worker');
  const [fullName, setFullName] = useState<string>('Ramesh Kumar');

  // Step 1: Language Select
  const handleSelectLanguage = (lang: Language, voicePrompt: string) => {
    setLanguage(lang);
    speak(voicePrompt);
  };

  // Step 2: Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      speak('Verification code sent. We have entered sample code 7421 for your preview.');
      setStep(2);
    }
  };

  // Step 3: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setStep(3);
    }
  };

  // Step 4: Role Selection
  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setFullName(role === 'worker' ? 'Ramesh Kumar' : 'Vikram Malhotra');
    setStep(4);
  };

  // Step 5: Final Submission
  const handleFinish = () => {
    completeOnboarding(selectedRole, phoneNumber, fullName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-100 flex flex-col justify-between p-4 py-8 max-w-md mx-auto">
      {/* Progress Dots */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center font-black shadow-md shadow-sky-500/20 text-lg">
            V
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 tracking-tight leading-none text-base">Vayra</h1>
            <span className="text-[10px] text-slate-500 font-medium">काम और सुरक्षा</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? 'w-6 bg-sky-600' : s < step ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Form Step Container */}
      <div className="flex-1 flex flex-col justify-center">
        {/* STEP 1: LANGUAGE SELECTION */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
                <Globe size={14} />
                Step 1 of 4
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {t.selectLanguage}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tap on your language to hear audio instructions
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto no-scrollbar p-1">
              {languages.map((l) => {
                const isSelected = language === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => handleSelectLanguage(l.code, l.welcomeVoice)}
                    className={`touch-target flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-400/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg font-black text-slate-900">{l.nativeName}</span>
                      {isSelected ? (
                        <CheckCircle2 size={18} className="text-sky-600" />
                      ) : (
                        <Volume2 size={16} className="text-slate-400" />
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium mt-1">{l.name}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="touch-target w-full mt-6 py-3.5 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>{t.continue}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: PHONE & OTP */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
                <Phone size={14} />
                Step 2 of 4
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {t.enterPhone}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fast passwordless login with instant SMS OTP
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-100 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mobile Number (मोबाइल नंबर)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-slate-500">+91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="9876543210"
                    maxLength={10}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-bold text-base text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>{t.enterOtp}</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Demo Auto-filled (7421)</span>
                </label>
                <div className="relative flex items-center">
                  <KeyRound size={18} className="absolute left-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="7421"
                    maxLength={4}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-mono font-black text-lg tracking-widest text-slate-900"
                  />
                </div>
              </div>

              <button
                onClick={handleVerifyOtp}
                className="touch-target w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>{t.verifyOtp}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ROLE SELECTOR */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
                <UserCheck size={14} />
                Step 3 of 4
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                How will you use Vayra?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                You can switch between Worker & Employer anytime in settings
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Option A: Worker */}
              <button
                type="button"
                onClick={() => handleSelectRole('worker')}
                className="touch-target w-full p-4 rounded-3xl border-2 border-sky-400 bg-gradient-to-r from-sky-50 to-white hover:border-sky-600 shadow-md text-left flex items-center gap-4 active:scale-95 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-600/30 shrink-0">
                  <HardHat size={30} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {t.workerRole}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    Find high-paying local jobs, get fair wage guarantees, and emergency safety support.
                  </p>
                </div>
              </button>

              {/* Option B: Employer */}
              <button
                type="button"
                onClick={() => handleSelectRole('employer')}
                className="touch-target w-full p-4 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 shadow-sm text-left flex items-center gap-4 active:scale-95 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 shrink-0">
                  <Briefcase size={30} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {t.employerRole}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    Post jobs, find verified skilled workers, track shifts with OTP, and manage tool safety.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: QUICK PROFILE SETUP */}
        {step === 4 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                <Sparkles size={14} />
                Final Step
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {selectedRole === 'worker' ? 'Complete Worker Profile' : 'Complete Employer Profile'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your profile builds trust across the Vayra verified network
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-100 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {selectedRole === 'worker' ? 'Your Full Name (नाम)' : 'Contact Person / Company Name'}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-bold text-slate-900"
                />
              </div>

              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-2.5">
                <CheckCircle2 size={20} className="text-sky-600 shrink-0" />
                <div className="text-[11px] text-sky-900 font-medium">
                  <strong>Instant Aadhaar / e-Shram Verified:</strong> Your test account is pre-approved with government ID badge.
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="touch-target w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>Enter Vayra App</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer support note */}
      <div className="text-center pt-4 text-[11px] text-slate-400 font-medium">
        Vayra • Built with trust & safety for Indian workers & employers
      </div>
    </div>
  );
};
