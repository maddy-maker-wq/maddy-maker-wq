export type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'mr' | 'bn' | 'gu' | 'ml' | 'pa';

export type UserRole = 'worker' | 'employer';

export type ShiftType = 'Day' | 'Night' | 'Flexible';

export type EmploymentType = 'Full-time' | 'Temporary' | 'Daily' | 'Weekly' | 'Hourly' | 'Monthly';

export type EquipmentResponsibilityType = 'employer_all' | 'employer_some' | 'worker_own' | 'mutual';

export type JobStatus = 'draft' | 'open' | 'matched' | 'in_progress' | 'completed' | 'cancelled';

export type ApplicationStatus = 'pending' | 'shortlisted' | 'selected' | 'rejected' | 'in_progress' | 'completed';

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'tool' | 'safety' | 'utility';
  providedBy: 'employer' | 'worker' | 'mutual';
  isRequired: boolean;
  isChecked?: boolean;
}

export interface WorkConditionMedia {
  id: string;
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
  description: string;
  machineEquipmentInfo?: string;
  scopeOfWork: string;
  hazards: string[];
  precautions: string[];
  updatedAt: string;
}

export interface SalaryRecommendation {
  recommendedMin: number;
  recommendedMax: number;
  suggestedMedian: number;
  factorsExplanation: string[];
  currency: 'INR';
}

export interface WorkerProfile {
  id: string;
  name: string;
  age: number;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  avatar: string;
  languages: string[];
  profession: string;
  skills: string[];
  experienceYears: number;
  previousWork: string[];
  qualifications?: string[];
  certifications?: string[];
  preferredLocation: string;
  preferredDistanceKm: number;
  localOrNonLocal: 'local' | 'non-local' | 'any';
  shiftPreference: ShiftType[];
  availableHours: string;
  preferredStartDate: string;
  employmentTypePreference: EmploymentType[];
  expectedSalary: {
    amount: number;
    period: 'hour' | 'day' | 'week' | 'month';
  };
  rating: number;
  totalCompletedJobs: number;
  isVerified: boolean;
  safetyCertified: boolean;
  safetyScore: number;
  trustedContacts?: { name: string; phone: string; relation: string }[];
}

export interface EmployerProfile {
  id: string;
  name: string;
  companyName: string;
  phone: string;
  avatar: string;
  location: string;
  businessType: string;
  isVerified: boolean;
  rating: number;
  totalJobsPosted: number;
  activeJobsCount: number;
}

export interface JobPosting {
  id: string;
  employerId: string;
  employerName: string;
  employerAvatar: string;
  employerPhone: string;
  employerLocation: string;
  title: string;
  profession: string;
  skills: string[];
  description: string;
  workersNeeded: number;
  experienceYearsRequired: number;
  qualificationsRequired?: string[];
  location: string;
  distanceKm: number;
  localOrNonLocal: 'local' | 'non-local' | 'any';
  workingHours: string;
  workingDays: string;
  expectedWorkload: 'Light' | 'Moderate' | 'Heavy';
  shift: ShiftType;
  employmentType: EmploymentType;
  facilities: {
    food: boolean;
    accommodation: boolean;
    transportation: boolean;
    other?: string[];
  };
  employerOfferedSalary: {
    amount: number;
    period: 'hour' | 'day' | 'week' | 'month';
  };
  salaryRecommendation: SalaryRecommendation;
  equipmentResponsibility: EquipmentResponsibilityType;
  equipmentItems: EquipmentItem[];
  workConditionMedia?: WorkConditionMedia[];
  status: JobStatus;
  createdAt: string;
  matchScore?: number;
  matchExplanation?: string;
}

export interface OTPVerification {
  workerOtp: string;
  employerOtp: string;
  workerVerified: boolean;
  employerVerified: boolean;
  checkInTime?: string;
  completionTime?: string;
  locationVerified?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  workerId: string;
  workerName: string;
  workerProfession: string;
  workerAvatar: string;
  workerPhone: string;
  workerRating: number;
  status: ApplicationStatus;
  appliedAt: string;
  preparationChecklistCompleted: boolean;
  missingEquipmentNotes?: string;
  checkInOtp?: OTPVerification;
  completionOtp?: OTPVerification;
}

export interface SafetyTrainingModule {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  category: string;
  durationMinutes: number;
  videoUrl: string;
  thumbnail: string;
  keyPoints: Record<string, string[]>;
  quiz: {
    question: Record<string, string>;
    options: Record<string, string[]>;
    correctIndex: number;
  }[];
  completed?: boolean;
  score?: number;
}

export interface SOSIncident {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userRole: UserRole;
  timestamp: string;
  coordinates: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'active' | 'resolved';
  trustedContactsAlerted: boolean;
  emergencyServicesContacted: boolean;
  audioAlarmActive: boolean;
  details?: string;
}

export interface SafetyReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterRole: UserRole;
  reportedPartyName: string;
  category: 'Unsafe workplace' | 'Harassment' | 'Threats' | 'Violence' | 'Unsafe behavior' | 'Fraud/scams' | 'Other safety concerns';
  description: string;
  location: string;
  timestamp: string;
  status: 'submitted' | 'under_review' | 'resolved';
  urgent: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'job_match' | 'application' | 'otp' | 'safety' | 'system' | 'training';
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface Review {
  id: string;
  jobId: string;
  fromUserId: string;
  fromUserName: string;
  fromRole: UserRole;
  toUserId: string;
  toUserName: string;
  rating: number;
  tags: string[];
  comment: string;
  createdAt: string;
}