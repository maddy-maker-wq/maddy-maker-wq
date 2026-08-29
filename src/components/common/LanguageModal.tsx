import React from 'react';
import { X, Check, Volume2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  audioPrompt: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', audioPrompt: 'हिन्दी भाषा चुनी गई है' },
  { code: 'en', name: 'English', nativeName: 'English', audioPrompt: 'English language selected' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', audioPrompt: 'தமிழ் மொழி தேர்ந்தெடுக்கப்பட்டது' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', audioPrompt: 'తెలుగు భాష ఎంపిక చేయబడింది' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', audioPrompt: 'ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', audioPrompt: 'मराठी भाषा निवडली आहे' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', audioPrompt: 'বাংলা ভাষা নির্বাচিত হয়েছে' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', audioPrompt: 'ગુજરાતી ભાષા પસંદ કરી છે' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', audioPrompt: 'മലയാളം ഭാഷ തിരഞ്ഞെടുത്തു' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', audioPrompt: 'ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਚੁਣੀ ਗਈ ਹੈ' },
];

export const LanguageModal: React.FC = () => {
  const { language, setLanguage, activeLanguageModal, setActiveLanguageModal, speak, t } = useApp();

  if (!activeLanguageModal) return null;

  const handleSelect = (lang: Language, audioPrompt: string) => {
    setLanguage(lang);
    speak(audioPrompt);
    setActiveLanguageModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-100 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t.selectLanguage}</h2>
            <p className="text-xs text-slate-500">Choose your preferred Indian language</p>
          </div>
          <button
            onClick={() => setActiveLanguageModal(false)}
            className="touch-target p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 py-4 overflow-y-auto no-scrollbar">
          {languageOptions.map((opt) => {
            const isSelected = language === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => handleSelect(opt.code, opt.audioPrompt)}
                className={`touch-target flex flex-col items-start justify-between p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/80 shadow-md ring-2 ring-sky-400/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg font-extrabold text-slate-900">{opt.nativeName}</span>
                  {isSelected && <Check size={18} className="text-sky-600" />}
                </div>
                <div className="flex items-center justify-between w-full mt-1.5">
                  <span className="text-xs text-slate-500 font-medium">{opt.name}</span>
                  <Volume2 size={14} className="text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setActiveLanguageModal(false)}
          className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors mt-2"
        >
          {t.continue}
        </button>
      </div>
    </div>
  );
};
