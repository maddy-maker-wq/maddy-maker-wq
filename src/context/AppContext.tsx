import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  WorkerProfile,
  EmployerProfile,
  JobPosting,
  JobApplication,
  SafetyTrainingModule,
  SOSIncident,
  SafetyReport,
  AppNotification,
  Review
} from '../types';
import { translations, TranslationDictionary } from '../i18n/translations';
import {
  initialWorker,
  initialEmployer,
  mockWorkersList,
  mockJobsList,
  mockTrainingModules,
  mockNotifications,
  mockReviews
} from '../data/mockData';
import { speakText, stopSpeech } from '../utils/speech';

export interface ActiveShiftData {
  id: string;
  jobId: string;
  jobTitle: string;
  workerId: string;
  workerName: string;
  employerId: string;
  employerName: string;
  agreedWage: number;
  shiftDate: string;
  checkInOtp: string;
  completionOtp: string;
  status: 'scheduled' | 'checked_in' | 'in_progress' | 'completed' | 'disputed';
  checkInTime?: string;
  completionTime?: string;
  toolsConditionLogged?: boolean;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isOnboarded: boolean;
  completeOnboarding: (selectedRole: UserRole, phone: string, name?: string) => void;
  currentWorker: WorkerProfile;
  currentEmployer: EmployerProfile;
  availableToday: boolean;
  setAvailableToday: (val: boolean) => void;
  updateWorkerPreferences: (preferences: Partial<WorkerProfile>) => void;
  jobs: JobPosting[];
  workers: WorkerProfile[];
  applications: JobApplication[];
  activeShift: ActiveShiftData | null;
  trainingModules: SafetyTrainingModule[];
  notifications: AppNotification[];
  reviews: Review[];
  sosActive: boolean;
  sosIncident: SOSIncident | null;
  safetyReports: SafetyReport[];
  applyToJob: (jobId: string) => boolean;
  postJob: (jobData: Partial<JobPosting>) => void;
  verifyCheckInOtp: (enteredOtp: string) => { success: boolean; message: string };
  verifyCompletionOtp: (enteredOtp: string) => { success: boolean; message: string };
  triggerSOS: (details?: string) => Promise<SOSIncident>;
  resolveSOS: () => void;
  submitHazardReport: (report: Partial<SafetyReport>) => void;
  completeTrainingModule: (moduleId: string, score: number) => void;
  submitReview: (review: Partial<Review>) => void;
  markNotifRead: (id: string) => void;
  speak: (text: string) => void;
  stopVoice: () => void;
  activeLanguageModal: boolean;
  setActiveLanguageModal: (open: boolean) => void;
  activeSOSModal: boolean;
  setActiveSOSModal: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('vayra_lang');
    return (saved as Language) || 'hi';
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('vayra_role');
    return (saved as UserRole) || 'worker';
  });

  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('vayra_onboarded') === 'true';
  });

  const [currentWorker, setCurrentWorker] = useState<WorkerProfile>(() => {
    const saved = localStorage.getItem('vayra_worker_profile');
    return saved ? JSON.parse(saved) : initialWorker;
  });

  const [currentEmployer, setCurrentEmployer] = useState<EmployerProfile>(initialEmployer);
  const [availableToday, setAvailableTodayState] = useState<boolean>(true);
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobsList);
  const [workers, setWorkers] = useState<WorkerProfile[]>(mockWorkersList);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [activeShift, setActiveShift] = useState<ActiveShiftData | null>({
    id: 'shift-901',
    jobId: 'job-301',
    jobTitle: 'Senior Electrician for Commercial Office Fitout',
    workerId: 'w-101',
    workerName: 'Ramesh Kumar',
    employerId: 'emp-201',
    employerName: 'Malhotra Infrastructure',
    agreedWage: 950,
    shiftDate: 'Today',
    checkInOtp: '7421',
    completionOtp: '9153',
    status: 'scheduled',
    toolsConditionLogged: true
  });

  const [trainingModules, setTrainingModules] = useState<SafetyTrainingModule[]>(mockTrainingModules);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [sosActive, setSosActive] = useState<boolean>(false);
  const [sosIncident, setSosIncident] = useState<SOSIncident | null>(null);
  const [safetyReports, setSafetyReports] = useState<SafetyReport[]>([]);
  const [activeLanguageModal, setActiveLanguageModal] = useState<boolean>(false);
  const [activeSOSModal, setActiveSOSModal] = useState<boolean>(false);

  const t = translations[language] || translations.en;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vayra_lang', lang);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('vayra_role', newRole);
  };

  const setAvailableToday = (val: boolean) => {
    setAvailableTodayState(val);
    setCurrentWorker(prev => ({ ...prev, isAvailableToday: val }));
  };

  const updateWorkerPreferences = (preferences: Partial<WorkerProfile>) => {
    setCurrentWorker((prev) => {
      const updated = {
        ...prev,
        ...preferences,
        expectedSalary: preferences.expectedSalary
          ? { ...prev.expectedSalary, ...preferences.expectedSalary }
          : prev.expectedSalary,
      };
      localStorage.setItem('vayra_worker_profile', JSON.stringify(updated));
      return updated;
    });

    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: currentWorker.id,
      title: 'Preferences Updated',
      message: 'Your job search filters and working preferences have been saved.',
      type: 'system',
      read: false,
      timestamp: 'Just now',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const completeOnboarding = (selectedRole: UserRole, phone: string, name?: string) => {
    setRole(selectedRole);
    setIsOnboarded(true);
    localStorage.setItem('vayra_onboarded', 'true');
    if (name) {
      if (selectedRole === 'worker') {
        setCurrentWorker(prev => ({ ...prev, name, phone }));
      } else {
        setCurrentEmployer(prev => ({ ...prev, name, phone }));
      }
    }
  };

  const applyToJob = (jobId: string): boolean => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return false;

    if (applications.some(a => a.jobId === jobId)) return false;

    const newApp: JobApplication = {
      id: 'app-' + Date.now(),
      jobId,
      workerId: currentWorker.id,
      workerName: currentWorker.name,
      workerProfession: currentWorker.profession,
      workerAvatar: currentWorker.avatar,
      workerPhone: currentWorker.phone,
      workerRating: currentWorker.rating,
      status: 'applied' as any,
      appliedAt: new Date().toISOString(),
      preparationChecklistCompleted: true
    };

    setApplications(prev => [newApp, ...prev]);

    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: currentWorker.id,
      title: 'Application Submitted',
      message: `Your application for "${job.title}" was successfully sent to ${job.employerName}.`,
      type: 'application',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [notif, ...prev]);

    return true;
  };

  const postJob = (jobData: Partial<JobPosting>) => {
    const newJob: JobPosting = {
      id: 'job-' + Date.now(),
      employerId: currentEmployer.id,
      employerName: currentEmployer.companyName || currentEmployer.name,
      employerAvatar: currentEmployer.avatar,
      employerPhone: currentEmployer.phone,
      employerLocation: currentEmployer.location,
      title: jobData.title || 'General Skilled Work',
      profession: jobData.profession || 'Electrician',
      skills: jobData.skills || ['General'],
      description: jobData.description || 'Skilled worker needed.',
      workersNeeded: jobData.workersNeeded || 1,
      experienceYearsRequired: jobData.experienceYearsRequired || 1,
      location: jobData.location || currentEmployer.location,
      distanceKm: 2.5,
      localOrNonLocal: 'local',
      workingHours: jobData.workingHours || '9:00 AM - 6:00 PM',
      workingDays: jobData.workingDays || '6 Days',
      expectedWorkload: jobData.expectedWorkload || 'Moderate',
      shift: jobData.shift || 'Day',
      employmentType: jobData.employmentType || 'Daily',
      facilities: jobData.facilities || { food: true, accommodation: false, transportation: false },
      employerOfferedSalary: jobData.employerOfferedSalary || { amount: 800, period: 'day' },
      salaryRecommendation: jobData.salaryRecommendation || {
        recommendedMin: 550,
        recommendedMax: 1000,
        suggestedMedian: 800,
        factorsExplanation: ['Standard fair wage recommendation calculated'],
        currency: 'INR'
      },
      equipmentResponsibility: jobData.equipmentResponsibility || 'employer_all',
      equipmentItems: jobData.equipmentItems || [],
      workConditionMedia: jobData.workConditionMedia || [],
      status: 'open',
      createdAt: new Date().toISOString(),
      matchScore: 92
    };

    setJobs(prev => [newJob, ...prev]);
  };

  const verifyCheckInOtp = (enteredOtp: string) => {
    if (!activeShift) return { success: false, message: 'No active shift found.' };
    if (activeShift.checkInOtp === enteredOtp.trim()) {
      setActiveShift(prev => prev ? {
        ...prev,
        status: 'in_progress',
        checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      } : null);

      const notif: AppNotification = {
        id: 'notif-' + Date.now(),
        userId: currentWorker.id,
        title: 'Check-in Verified!',
        message: 'Your shift has officially started. Shift timer is running.',
        type: 'otp',
        read: false,
        timestamp: 'Just now'
      };
      setNotifications(prev => [notif, ...prev]);

      return { success: true, message: 'Check-in verified successfully!' };
    }
    return { success: false, message: 'Invalid OTP. Please check the 4-digit code.' };
  };

  const verifyCompletionOtp = (enteredOtp: string) => {
    if (!activeShift) return { success: false, message: 'No active shift found.' };
    if (activeShift.completionOtp === enteredOtp.trim()) {
      setActiveShift(prev => prev ? {
        ...prev,
        status: 'completed',
        completionTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      } : null);

      setCurrentWorker(prev => ({
        ...prev,
        totalCompletedJobs: prev.totalCompletedJobs + 1
      }));

      return { success: true, message: 'Shift completed & wage payout released!' };
    }
    return { success: false, message: 'Invalid completion OTP.' };
  };

  const triggerSOS = async (details?: string): Promise<SOSIncident> => {
    const coords = { lat: 28.4595, lng: 77.0266, address: 'Cyber City, Gurugram, Haryana' };
    
    const incident: SOSIncident = {
      id: 'sos-' + Date.now(),
      userId: role === 'worker' ? currentWorker.id : currentEmployer.id,
      userName: role === 'worker' ? currentWorker.name : currentEmployer.name,
      userPhone: role === 'worker' ? currentWorker.phone : currentEmployer.phone,
      userRole: role,
      timestamp: new Date().toISOString(),
      coordinates: coords,
      status: 'active',
      trustedContactsAlerted: true,
      emergencyServicesContacted: true,
      audioAlarmActive: true,
      details: details || '1-Tap Emergency SOS Triggered by user'
    };

    setSosActive(true);
    setSosIncident(incident);

    speak('Emergency SOS broadcast activated. Emergency contacts and 112 emergency dispatch notified with your live GPS location.');

    return incident;
  };

  const resolveSOS = () => {
    setSosActive(false);
    setSosIncident(prev => prev ? { ...prev, status: 'resolved', audioAlarmActive: false } : null);
    stopSpeech();
  };

  const submitHazardReport = (report: Partial<SafetyReport>) => {
    const newReport: SafetyReport = {
      id: 'rep-' + Date.now(),
      reporterId: role === 'worker' ? currentWorker.id : currentEmployer.id,
      reporterName: role === 'worker' ? currentWorker.name : currentEmployer.name,
      reporterRole: role,
      reportedPartyName: report.reportedPartyName || 'Worksite Management',
      category: report.category || 'Unsafe workplace',
      description: report.description || 'Hazard reported without description',
      location: report.location || 'DLF Phase 3 Site',
      timestamp: new Date().toISOString(),
      status: 'submitted',
      urgent: report.urgent ?? false
    };

    setSafetyReports(prev => [newReport, ...prev]);

    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: currentWorker.id,
      title: 'Safety Hazard Report Logged',
      message: `Your report for "${newReport.category}" is under review by Vayra Safety Inspection Team.`,
      type: 'safety',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const completeTrainingModule = (moduleId: string, score: number) => {
    setTrainingModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return { ...m, completed: true, score };
      }
      return m;
    }));

    setCurrentWorker(prev => ({
      ...prev,
      safetyCertified: true,
      safetyScore: Math.min(100, prev.safetyScore + 2)
    }));

    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: currentWorker.id,
      title: 'Safety Module Badge Earned!',
      message: 'You scored 100% and unlocked the Vayra Safety Certification Badge on your public profile.',
      type: 'training',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const submitReview = (reviewData: Partial<Review>) => {
    const newReview: Review = {
      id: 'rev-' + Date.now(),
      jobId: reviewData.jobId || 'job-completed',
      fromUserId: role === 'worker' ? currentWorker.id : currentEmployer.id,
      fromUserName: role === 'worker' ? currentWorker.name : currentEmployer.name,
      fromRole: role,
      toUserId: reviewData.toUserId || (role === 'worker' ? currentEmployer.id : currentWorker.id),
      toUserName: reviewData.toUserName || (role === 'worker' ? currentEmployer.companyName : currentWorker.name),
      rating: reviewData.rating || 5.0,
      tags: reviewData.tags || ['Reliable', 'Professional'],
      comment: reviewData.comment || 'Smooth shift completion.',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [newReview, ...prev]);
  };

  const markNotifRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const speak = (text: string) => {
    speakText(text, language);
  };

  const stopVoice = () => {
    stopSpeech();
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        role,
        setRole,
        isOnboarded,
        completeOnboarding,
        currentWorker,
        currentEmployer,
        availableToday,
        setAvailableToday,
        updateWorkerPreferences,
        jobs,
        workers,
        applications,
        activeShift,
        trainingModules,
        notifications,
        reviews,
        sosActive,
        sosIncident,
        safetyReports,
        applyToJob,
        postJob,
        verifyCheckInOtp,
        verifyCompletionOtp,
        triggerSOS,
        resolveSOS,
        submitHazardReport,
        completeTrainingModule,
        submitReview,
        markNotifRead,
        speak,
        stopVoice,
        activeLanguageModal,
        setActiveLanguageModal,
        activeSOSModal,
        setActiveSOSModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
