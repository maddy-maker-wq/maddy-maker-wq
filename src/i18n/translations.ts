import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  workerRole: string;
  employerRole: string;
  iWantWork: string;
  iWantToHire: string;
  selectLanguage: string;
  changeLanguage: string;
  enterPhone: string;
  phonePlaceholder: string;
  sendOtp: string;
  enterOtp: string;
  verifyOtp: string;
  otpSentTo: string;
  resendOtp: string;
  continue: string;
  back: string;
  save: string;
  cancel: string;
  apply: string;
  applied: string;
  hired: string;
  availableToday: string;
  availableSubtitle: string;
  verifiedWorker: string;
  fairWageBadge: string;
  marketRateAvg: string;
  listenToDetails: string;
  distanceAway: string;
  postAJob: string;
  searchJobs: string;
  searchWorkers: string;
  allTrades: string;
  tradeCategories: {
    mason: string;
    plumber: string;
    electrician: string;
    carpenter: string;
    painter: string;
    welder: string;
    helper: string;
    driver: string;
    security: string;
    housekeeper: string;
  };
  navigation: {
    home: string;
    jobs: string;
    shifts: string;
    safety: string;
    profile: string;
    workers: string;
    postJob: string;
  };
  shiftStatus: {
    scheduled: string;
    checkedIn: string;
    inProgress: string;
    completed: string;
    disputed: string;
  };
  otpHandshake: {
    checkInTitle: string;
    checkInDesc: string;
    workerOtpLabel: string;
    employerVerifyPrompt: string;
    checkoutTitle: string;
    checkoutDesc: string;
    completionOtpLabel: string;
    verifyAndComplete: string;
    geofenceVerified: string;
    shiftActiveTimer: string;
  };
  safety: {
    sosTitle: string;
    sosSubtitle: string;
    sosHoldPrompt: string;
    emergencyContacts: string;
    call112: string;
    call1091: string;
    reportHazard: string;
    hazardDesc: string;
    safetyTraining: string;
    safetyCertifiedBadge: string;
    takeQuiz: string;
    toolsTracking: string;
    toolConditionGood: string;
    toolConditionDamaged: string;
  };
  wageAdvisor: {
    title: string;
    marketBenchmark: string;
    statutoryMinimum: string;
    recommendedWage: string;
    fairWageGuarantee: string;
    belowMinimumWarning: string;
    toolAllowanceNote: string;
  };
  reviews: {
    rateWorker: string;
    rateEmployer: string;
    quality: string;
    punctuality: string;
    safetyCare: string;
    conduct: string;
    submitReview: string;
  };
}

const en: TranslationDictionary = {
  appName: 'Vayra',
  tagline: 'Trusted Platform for Blue-Collar Workers & Employers',
  workerRole: 'Worker (Looking for Work)',
  employerRole: 'Employer (Looking to Hire)',
  iWantWork: 'I Want Work',
  iWantToHire: 'I Want to Hire Workers',
  selectLanguage: 'Choose Your Language',
  changeLanguage: 'Change Language',
  enterPhone: 'Enter Mobile Number',
  phonePlaceholder: 'e.g. 9876543210',
  sendOtp: 'Get OTP Verification',
  enterOtp: 'Enter 4-Digit OTP',
  verifyOtp: 'Verify & Proceed',
  otpSentTo: 'We sent a verification code to',
  resendOtp: 'Resend Code',
  continue: 'Continue',
  back: 'Back',
  save: 'Save Changes',
  cancel: 'Cancel',
  apply: 'Apply Now',
  applied: 'Applied',
  hired: 'Hired',
  availableToday: 'Available for Work Today',
  availableSubtitle: 'Employers near you can call you immediately',
  verifiedWorker: 'Government ID Verified',
  fairWageBadge: 'Fair Wage Guarantee',
  marketRateAvg: 'Average market rate in your area',
  listenToDetails: 'Listen (Audio)',
  distanceAway: 'away from your location',
  postAJob: 'Post a New Job',
  searchJobs: 'Search by Trade or Location...',
  searchWorkers: 'Find Verified Workers...',
  allTrades: 'All Trades',
  tradeCategories: {
    mason: 'Mason (राजमिस्त्री)',
    plumber: 'Plumber (नलसाज)',
    electrician: 'Electrician (बिजली)',
    carpenter: 'Carpenter (बढ़ई)',
    painter: 'Painter (पेंटर)',
    welder: 'Welder (वेल्डर)',
    helper: 'Helper / Labour (मजदूर)',
    driver: 'Driver (चालक)',
    security: 'Security Guard (सुरक्षा)',
    housekeeper: 'Housekeeper (सफाई)',
  },
  navigation: {
    home: 'Home',
    jobs: 'My Jobs',
    shifts: 'Live Shift',
    safety: 'Safety & SOS',
    profile: 'Profile',
    workers: 'Find Workers',
    postJob: 'Post Job',
  },
  shiftStatus: {
    scheduled: 'Scheduled',
    checkedIn: 'Checked In',
    inProgress: 'In Progress',
    completed: 'Completed',
    disputed: 'Disputed',
  },
  otpHandshake: {
    checkInTitle: 'Worksite Check-in OTP',
    checkInDesc: 'Show this 4-digit code to your employer at the worksite to start your shift.',
    workerOtpLabel: 'Your Check-in Code',
    employerVerifyPrompt: 'Enter Worker\'s 4-Digit Check-in Code',
    checkoutTitle: 'Work Completion Sign-Off',
    checkoutDesc: 'Share completion OTP to confirm work satisfaction and wage release.',
    completionOtpLabel: 'Completion Code',
    verifyAndComplete: 'Verify & Release Wage',
    geofenceVerified: 'GPS Location Verified on Site',
    shiftActiveTimer: 'Shift In Progress',
  },
  safety: {
    sosTitle: 'EMERGENCY SOS',
    sosSubtitle: 'Press & Hold for 3 Seconds to Alert Emergency Services & Contacts',
    sosHoldPrompt: 'Hold down for 3 seconds...',
    emergencyContacts: 'Emergency Contacts',
    call112: 'Call 112 (National Emergency)',
    call1091: 'Call 1091 (Women Helpline)',
    reportHazard: 'Report Unsafe Work Condition',
    hazardDesc: 'Take photo of unsafe site, lack of safety gear, or dangerous equipment.',
    safetyTraining: 'Safety Training Academy',
    safetyCertifiedBadge: 'Vayra Safety Certified',
    takeQuiz: 'Watch 60s Video & Earn Badge',
    toolsTracking: 'Tool & Equipment Responsibility',
    toolConditionGood: 'Good Condition Verified',
    toolConditionDamaged: 'Damage / Issue Logged',
  },
  wageAdvisor: {
    title: 'Vayra Fair Wage Advisor',
    marketBenchmark: 'Market Benchmark',
    statutoryMinimum: 'Statutory Min Wage',
    recommendedWage: 'Fair Recommended Rate',
    fairWageGuarantee: 'Compliant with Fair Wage Standard',
    belowMinimumWarning: 'Warning: Offered wage is below statutory minimum!',
    toolAllowanceNote: 'Includes +₹150/day power tool allowance',
  },
  reviews: {
    rateWorker: 'Rate Worker Performance',
    rateEmployer: 'Rate Employer & Worksite',
    quality: 'Quality of Work',
    punctuality: 'Punctuality & Timing',
    safetyCare: 'Safety & Tool Care',
    conduct: 'Professional Conduct',
    submitReview: 'Submit Review',
  },
};

const hi: TranslationDictionary = {
  appName: 'वायरा (Vayra)',
  tagline: 'कारीगरों और नियोक्ताओं के लिए भरोसेमंद मंच',
  workerRole: 'कारीगर / मजदूर (काम चाहिए)',
  employerRole: 'नियोक्ता (कारीगर चाहिए)',
  iWantWork: 'मुझे काम चाहिए',
  iWantToHire: 'मुझे कारीगर / मजदूर चाहिए',
  selectLanguage: 'अपनी भाषा चुनें',
  changeLanguage: 'भाषा बदलें',
  enterPhone: 'मोबाइल नंबर दर्ज करें',
  phonePlaceholder: 'उदा. 9876543210',
  sendOtp: 'ओटीपी प्राप्त करें',
  enterOtp: '4 अंकों का ओटीपी दर्ज करें',
  verifyOtp: 'सत्यापित करें और आगे बढ़ें',
  otpSentTo: 'हमने इस नंबर पर ओटीपी भेजा है',
  resendOtp: 'दोबारा भेजें',
  continue: 'आगे बढ़ें',
  back: 'पीछे',
  save: 'सहेजें',
  cancel: 'रद्द करें',
  apply: 'आवेदन करें',
  applied: 'आवेदन किया',
  hired: 'चयनित',
  availableToday: 'आज काम के लिए उपलब्ध',
  availableSubtitle: 'आस-पास के नियोक्ता आपको तुरंत बुला सकते हैं',
  verifiedWorker: 'सरकारी पहचान सत्यापित',
  fairWageBadge: 'उचित मजदूरी गारंटी',
  marketRateAvg: 'आपके क्षेत्र में औसत मजदूरी दर',
  listenToDetails: 'विवरण सुनें (ऑडियो)',
  distanceAway: 'आपके स्थान से दूर',
  postAJob: 'नया काम पोस्ट करें',
  searchJobs: 'काम या स्थान खोजें...',
  searchWorkers: 'सत्यापित कारीगर खोजें...',
  allTrades: 'सभी काम',
  tradeCategories: {
    mason: 'राजमिस्त्री (Mason)',
    plumber: 'नलसाज (Plumber)',
    electrician: 'बिजली मिस्त्री (Electrician)',
    carpenter: 'बढ़ई (Carpenter)',
    painter: 'पेंटर (Painter)',
    welder: 'वेल्डर (Welder)',
    helper: 'मजदूर / हेल्पर (Helper)',
    driver: 'चालक / ड्राइवर (Driver)',
    security: 'सुरक्षा गार्ड (Security)',
    housekeeper: 'सफाई कर्मचारी (Housekeeper)',
  },
  navigation: {
    home: 'मुख्य पृष्ठ',
    jobs: 'मेरे काम',
    shifts: 'लाइव हाजिरी',
    safety: 'सुरक्षा और SOS',
    profile: 'मेरी प्रोफाइल',
    workers: 'कारीगर खोजें',
    postJob: 'काम डालें',
  },
  shiftStatus: {
    scheduled: 'निर्धारित',
    checkedIn: 'हाजिरी दर्ज',
    inProgress: 'काम चालू है',
    completed: 'पूरा हुआ',
    disputed: 'विवादित',
  },
  otpHandshake: {
    checkInTitle: 'कार्यस्थल चेक-इन ओटीपी',
    checkInDesc: 'काम शुरू करने के लिए कार्यस्थल पर ठेकेदार को यह 4 अंकों का कोड दिखाएं।',
    workerOtpLabel: 'आपका हाजिरी कोड',
    employerVerifyPrompt: 'कारीगर का 4 अंकों का हाजिरी कोड दर्ज करें',
    checkoutTitle: 'काम समाप्ति और भुगतान सत्यापन',
    checkoutDesc: 'काम पूरा होने और मजदूरी भुगतान के लिए ओटीपी साझा करें।',
    completionOtpLabel: 'समाप्ति कोड',
    verifyAndComplete: 'सत्यापित करें और मजदूरी जारी करें',
    geofenceVerified: 'कार्यस्थल जीपीएस सत्यापित',
    shiftActiveTimer: 'काम की अवधि चालू है',
  },
  safety: {
    sosTitle: 'आपातकालीन SOS बटन',
    sosSubtitle: 'आपातकालीन सहायता और परिजनों को सूचना के लिए 3 सेकंड दबाकर रखें',
    sosHoldPrompt: '3 सेकंड तक दबाए रखें...',
    emergencyContacts: 'आपातकालीन संपर्क',
    call112: '112 डायल करें (राष्ट्रीय आपातकाल)',
    call1091: '1091 डायल करें (महिला हेल्पलाइन)',
    reportHazard: 'असुरक्षित कार्यस्थल की रिपोर्ट करें',
    hazardDesc: 'खतरनाक स्थिति, सुरक्षा गियर की कमी या टूटे उपकरणों का फोटो लें।',
    safetyTraining: 'सुरक्षा प्रशिक्षण अकादमी',
    safetyCertifiedBadge: 'वायरा सुरक्षा प्रमाणित',
    takeQuiz: '60 सेकंड का वीडियो देखें और बैज पाएं',
    toolsTracking: 'औजार एवं उपकरण जिम्मेदारी',
    toolConditionGood: 'औजार अच्छी स्थिति में सत्यापित',
    toolConditionDamaged: 'औजार क्षति दर्ज की गई',
  },
  wageAdvisor: {
    title: 'वायरा उचित मजदूरी सलाहकार',
    marketBenchmark: 'बाजार मानक दर',
    statutoryMinimum: 'न्यूनतम सरकारी मजदूरी',
    recommendedWage: 'अनुशंसित उचित मजदूरी',
    fairWageGuarantee: 'उचित मजदूरी मानकों के अनुरूप',
    belowMinimumWarning: 'चेतावनी: दी गई मजदूरी सरकारी न्यूनतम दर से कम है!',
    toolAllowanceNote: 'इसमें +₹150/दिन औजार भत्ता शामिल है',
  },
  reviews: {
    rateWorker: 'कारीगर के कार्य का मूल्यांकन करें',
    rateEmployer: 'नियोक्ता और कार्यस्थल का मूल्यांकन करें',
    quality: 'काम की गुणवत्ता',
    punctuality: 'समय की पाबंदी',
    safetyCare: 'सुरक्षा और औजारों की देखभाल',
    conduct: 'व्यवहार और आचरण',
    submitReview: 'समीक्षा जमा करें',
  },
};

export const translations: Record<Language, TranslationDictionary> = {
  en,
  hi,
  ta: { ...en, appName: 'வைரா (Vayra)', selectLanguage: 'உங்கள் மொழியைத் தேர்வுசெய்க', iWantWork: 'எனக்கு வேலை வேண்டும்', iWantToHire: 'எனக்கு ஆட்கள் வேண்டும்' },
  te: { ...en, appName: 'వైర (Vayra)', selectLanguage: 'మీ భాషను ఎంచుకోండి', iWantWork: 'నాకు పని కావాలి', iWantToHire: 'నాకు పనివారు కావాలి' },
  kn: { ...en, appName: 'ವೈರ (Vayra)', selectLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ', iWantWork: 'ನನಗೆ ಕೆಲಸ ಬೇಕು', iWantToHire: 'ನನಗೆ ಕೆಲಸಗಾರರು ಬೇಕು' },
  mr: { ...hi, appName: 'वायरा (Vayra)', selectLanguage: 'तुमची भाषा निवडा', iWantWork: 'मला काम हवे आहे', iWantToHire: 'मला कामगार हवे आहेत' },
  bn: { ...en, appName: 'ভায়রা (Vayra)', selectLanguage: 'আপনার ভাষা নির্বাচন করুন', iWantWork: 'আমার কাজ চাই', iWantToHire: 'আমার শ্রমিক প্রয়োজন' },
  gu: { ...hi, appName: 'વાયરા (Vayra)', selectLanguage: 'તમારી ભાષા પસંદ કરો', iWantWork: 'મને કામ જોઈએ છે', iWantToHire: 'મારે કારીગરો જોઈએ છે' },
  ml: { ...en, appName: 'വൈര (Vayra)', selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക', iWantWork: 'എനിക്ക് ജോലി വേണം', iWantToHire: 'എനിക്ക് തൊഴിലാളികളെ വേണം' },
  pa: { ...hi, appName: 'ਵਾਇਰਾ (Vayra)', selectLanguage: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ', iWantWork: 'ਮੈਨੂੰ ਕੰਮ ਚਾਹੀਦਾ ਹੈ', iWantToHire: 'ਮੈਨੂੰ ਕਾਮੇ ਚਾਹੀਦੇ ਹਨ' },
};
