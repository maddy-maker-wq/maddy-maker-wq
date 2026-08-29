import {
  WorkerProfile,
  EmployerProfile,
  JobPosting,
  SafetyTrainingModule,
  SafetyReport,
  AppNotification,
  Review
} from '../types';

export const initialWorker: WorkerProfile = {
  id: 'w-101',
  name: 'Ramesh Kumar',
  age: 32,
  phone: '9876543210',
  gender: 'Male',
  avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
  languages: ['Hindi', 'English'],
  profession: 'Electrician',
  skills: ['House Wiring', 'MCB Installation', 'Appliance Repair', 'Industrial Panel', 'Inverter Setup'],
  experienceYears: 6,
  previousWork: ['DLF Phase 5 Residential Project', 'Metro Heights Tower 3', 'Sobha Greens Villa Renovation'],
  qualifications: ['ITI Electrical Diploma', 'Vayra Safety Verified'],
  certifications: ['Govt Licensed Wireman', 'Vayra Safety Certified'],
  preferredLocation: 'South Delhi & Gurugram',
  preferredDistanceKm: 15,
  localOrNonLocal: 'local',
  shiftPreference: ['Day', 'Flexible'],
  availableHours: '8:00 AM - 6:00 PM',
  preferredStartDate: 'Immediate',
  employmentTypePreference: ['Daily', 'Full-time'],
  expectedSalary: {
    amount: 900,
    period: 'day'
  },
  rating: 4.9,
  totalCompletedJobs: 142,
  isVerified: true,
  safetyCertified: true,
  safetyScore: 98,
  trustedContacts: [
    { name: 'Sunita Kumar (Wife)', phone: '9812345678', relation: 'Spouse' },
    { name: 'Suresh Verma (Brother)', phone: '9823456789', relation: 'Sibling' }
  ]
};

export const initialEmployer: EmployerProfile = {
  id: 'emp-201',
  name: 'Vikram Malhotra',
  companyName: 'Malhotra Infrastructure & Builders',
  phone: '9988776655',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  location: 'Noida Sector 62 & Greater Noida',
  businessType: 'General Contractor',
  isVerified: true,
  rating: 4.8,
  totalJobsPosted: 34,
  activeJobsCount: 4
};

export const mockWorkersList: WorkerProfile[] = [
  initialWorker,
  {
    id: 'w-102',
    name: 'Mohammad Rafiq',
    age: 38,
    phone: '9871122334',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    languages: ['Hindi', 'Urdu'],
    profession: 'Mason',
    skills: ['Brickwork', 'Plastering', 'Tile Laying', 'Concrete Foundation', 'Waterproofing'],
    experienceYears: 11,
    previousWork: ['Apex Golf Avenue', 'Gaur City Commercial Block'],
    preferredLocation: 'East Delhi & Noida',
    preferredDistanceKm: 12,
    localOrNonLocal: 'local',
    shiftPreference: ['Day'],
    availableHours: '8:30 AM - 5:30 PM',
    preferredStartDate: 'Immediate',
    employmentTypePreference: ['Daily', 'Weekly'],
    expectedSalary: { amount: 850, period: 'day' },
    rating: 4.8,
    totalCompletedJobs: 210,
    isVerified: true,
    safetyCertified: true,
    safetyScore: 95
  },
  {
    id: 'w-103',
    name: 'Santosh Yadav',
    age: 27,
    phone: '9899334455',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    languages: ['Hindi', 'Bhojpuri'],
    profession: 'Plumber',
    skills: ['CPVC Pipe Fitting', 'Sanitary Installation', 'Leak Detection', 'Water Motor Repair'],
    experienceYears: 4,
    previousWork: ['Eldeco Arcadia', 'Jaypee Greens'],
    preferredLocation: 'Noida Sector 128',
    preferredDistanceKm: 10,
    localOrNonLocal: 'local',
    shiftPreference: ['Day', 'Night'],
    availableHours: '24 Hours Emergency Available',
    preferredStartDate: 'Immediate',
    employmentTypePreference: ['Hourly', 'Daily'],
    expectedSalary: { amount: 800, period: 'day' },
    rating: 4.7,
    totalCompletedJobs: 89,
    isVerified: true,
    safetyCertified: true,
    safetyScore: 92
  },
  {
    id: 'w-104',
    name: 'Balwinder Singh',
    age: 41,
    phone: '9811445566',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    languages: ['Punjabi', 'Hindi'],
    profession: 'Carpenter',
    skills: ['Modular Kitchen', 'Door Fitting', 'Shuttering', 'Wardrobe Crafting', 'Polishing'],
    experienceYears: 14,
    previousWork: ['Grand Omaxe Woodwork', 'Mahagun Modern Interiors'],
    preferredLocation: 'South Delhi & Faridabad',
    preferredDistanceKm: 20,
    localOrNonLocal: 'any',
    shiftPreference: ['Day'],
    availableHours: '9:00 AM - 6:00 PM',
    preferredStartDate: 'Next Monday',
    employmentTypePreference: ['Full-time', 'Daily'],
    expectedSalary: { amount: 950, period: 'day' },
    rating: 4.95,
    totalCompletedJobs: 320,
    isVerified: true,
    safetyCertified: true,
    safetyScore: 99
  },
  {
    id: 'w-105',
    name: 'Sunita Devi',
    age: 34,
    phone: '9822667788',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    languages: ['Hindi', 'Bengali'],
    profession: 'Painter',
    skills: ['Wall Putty', 'Texture Painting', 'Exterior Weathercoat', 'Wood Enamel Polish'],
    experienceYears: 5,
    previousWork: ['Express Garden Towers', 'Prateek Laurel Apartments'],
    preferredLocation: 'Indirapuram & Ghaziabad',
    preferredDistanceKm: 8,
    localOrNonLocal: 'local',
    shiftPreference: ['Day'],
    availableHours: '9:00 AM - 5:00 PM',
    preferredStartDate: 'Immediate',
    employmentTypePreference: ['Daily', 'Weekly'],
    expectedSalary: { amount: 750, period: 'day' },
    rating: 4.85,
    totalCompletedJobs: 115,
    isVerified: true,
    safetyCertified: true,
    safetyScore: 96
  }
];

export const mockJobsList: JobPosting[] = [
  {
    id: 'job-301',
    employerId: 'emp-201',
    employerName: 'Malhotra Infrastructure',
    employerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    employerPhone: '9988776655',
    employerLocation: 'DLF Cyber City, Phase 3, Gurugram',
    title: 'Senior Electrician for Commercial Office Fitout',
    profession: 'Electrician',
    skills: ['House Wiring', 'MCB Installation', 'Industrial Panel'],
    description: 'Require certified electrician to install main distribution boards, conduit wiring, and LED lighting fixtures across 2 corporate floors. Clean worksite, PPE provided.',
    workersNeeded: 3,
    experienceYearsRequired: 3,
    location: 'Sector 25, Cyber City, Gurugram',
    distanceKm: 2.8,
    localOrNonLocal: 'local',
    workingHours: '9:00 AM - 6:00 PM (1 hr lunch break)',
    workingDays: 'Mon to Sat (5 Days)',
    expectedWorkload: 'Moderate',
    shift: 'Day',
    employmentType: 'Daily',
    facilities: {
      food: true,
      accommodation: false,
      transportation: true,
      other: ['Chilled drinking water', 'Rest area', 'First-aid station']
    },
    employerOfferedSalary: {
      amount: 950,
      period: 'day'
    },
    salaryRecommendation: {
      recommendedMin: 600,
      recommendedMax: 1100,
      suggestedMedian: 900,
      factorsExplanation: [
        'Statutory skilled minimum wage baseline: ₹600/day',
        'Market benchmark for 3+ yrs commercial experience: ₹900/day',
        'Employer offers ₹950/day (Compliant with Vayra Fair Wage Guarantee)'
      ],
      currency: 'INR'
    },
    equipmentResponsibility: 'employer_all',
    equipmentItems: [
      { id: 'eq-1', name: 'Insulated Safety Helmet & Gloves', category: 'safety', providedBy: 'employer', isRequired: true, isChecked: true },
      { id: 'eq-2', name: 'Hilti Hammer Drill & Bits', category: 'tool', providedBy: 'employer', isRequired: true, isChecked: true },
      { id: 'eq-3', name: 'Fluke Digital Multimeter', category: 'tool', providedBy: 'employer', isRequired: true, isChecked: true },
      { id: 'eq-4', name: 'Aluminium Step Ladder', category: 'utility', providedBy: 'employer', isRequired: true, isChecked: true }
    ],
    workConditionMedia: [
      {
        id: 'media-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80',
        description: 'Clean, well-ventilated corporate interior site with emergency exits clearly marked.',
        scopeOfWork: 'Laying cable trays and panel terminations.',
        hazards: ['Working at minor height (under 8ft)', 'Live test circuits'],
        precautions: ['Safety helmet mandatory', 'Insulated boots required', 'Power locked out during wiring'],
        updatedAt: '2026-08-28'
      }
    ],
    status: 'open',
    createdAt: '2026-08-28T09:00:00Z',
    matchScore: 94,
    matchExplanation: '94% Match: 2.8km away • Exact Electrician match • Above fair market wage (₹950/day) • Employer provides all safety gear'
  },
  {
    id: 'job-302',
    employerId: 'emp-202',
    employerName: 'Sharma & Sons Realcon',
    employerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    employerPhone: '9811223300',
    employerLocation: 'Noida Expressway, Sector 137',
    title: 'Lead Mason for High-Rise Brick & Plastering Work',
    profession: 'Mason',
    skills: ['Brickwork', 'Plastering', 'Tile Laying'],
    description: 'Skilled mason needed for exterior boundary wall and precision plastering. Scaffolding is double-checked by safety supervisor. Daily cash or UPI payout available.',
    workersNeeded: 4,
    experienceYearsRequired: 4,
    location: 'Sector 137, Noida Expressway',
    distanceKm: 5.4,
    localOrNonLocal: 'any',
    workingHours: '8:30 AM - 5:30 PM',
    workingDays: 'Mon to Sat',
    expectedWorkload: 'Heavy',
    shift: 'Day',
    employmentType: 'Daily',
    facilities: {
      food: false,
      accommodation: true,
      transportation: false,
      other: ['Safety harness & net installed', 'Clean drinking water']
    },
    employerOfferedSalary: {
      amount: 900,
      period: 'day'
    },
    salaryRecommendation: {
      recommendedMin: 580,
      recommendedMax: 1050,
      suggestedMedian: 850,
      factorsExplanation: [
        'Statutory mason minimum wage baseline: ₹580/day',
        'Includes fair wage incentive for heights work',
        'Employer offers ₹900/day (Fair Wage Guarantee Certified)'
      ],
      currency: 'INR'
    },
    equipmentResponsibility: 'employer_some',
    equipmentItems: [
      { id: 'eq-5', name: 'Safety Harness & Lifeline', category: 'safety', providedBy: 'employer', isRequired: true, isChecked: true },
      { id: 'eq-6', name: 'Hand Trowel & Spirit Level', category: 'tool', providedBy: 'worker', isRequired: true, isChecked: false }
    ],
    status: 'open',
    createdAt: '2026-08-27T14:30:00Z',
    matchScore: 88,
    matchExplanation: '88% Match: 5.4km away • Verified Mason job • High wage bracket (₹900/day)'
  },
  {
    id: 'job-303',
    employerId: 'emp-203',
    employerName: 'Urban Abode Renovations',
    employerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    employerPhone: '9711889922',
    employerLocation: 'South Extension Part 2, New Delhi',
    title: 'Emergency Plumbing & Bathroom Fitting Specialist',
    profession: 'Plumber',
    skills: ['CPVC Pipe Fitting', 'Sanitary Installation', 'Leak Detection'],
    description: 'Luxury villa bathroom renovation. Need neat CPVC piping, concealed valve installation, and shower pressure testing. High-grade tools provided.',
    workersNeeded: 2,
    experienceYearsRequired: 2,
    location: 'South Extension Part 2, Delhi',
    distanceKm: 4.1,
    localOrNonLocal: 'local',
    workingHours: '10:00 AM - 6:00 PM',
    workingDays: '3 Days Work',
    expectedWorkload: 'Moderate',
    shift: 'Day',
    employmentType: 'Daily',
    facilities: {
      food: true,
      accommodation: false,
      transportation: false
    },
    employerOfferedSalary: {
      amount: 850,
      period: 'day'
    },
    salaryRecommendation: {
      recommendedMin: 560,
      recommendedMax: 1000,
      suggestedMedian: 800,
      factorsExplanation: [
        'Statutory plumber minimum wage: ₹560/day',
        'Recommended market rate: ₹800/day',
        'Offered wage: ₹850/day'
      ],
      currency: 'INR'
    },
    equipmentResponsibility: 'employer_all',
    equipmentItems: [
      { id: 'eq-7', name: 'Pipe Threader & Cutter', category: 'tool', providedBy: 'employer', isRequired: true, isChecked: true },
      { id: 'eq-8', name: 'Safety Goggles & Gloves', category: 'safety', providedBy: 'employer', isRequired: true, isChecked: true }
    ],
    status: 'open',
    createdAt: '2026-08-29T08:15:00Z',
    matchScore: 82,
    matchExplanation: '82% Match: 4.1km away • Verified employer • Meals included'
  }
];

export const mockTrainingModules: SafetyTrainingModule[] = [
  {
    id: 'tr-1',
    title: {
      en: 'Electrical Hazard Prevention & Lockout/Tagout',
      hi: 'बिजली के खतरों से बचाव और सुरक्षा नियम',
      ta: 'மின்சார ஆபத்து தடுப்பு மற்றும் பாதுகாப்பு விதிகள்'
    },
    description: {
      en: 'Learn critical protocols for high-voltage testing, insulated tool handling, and earth leakage safeguards.',
      hi: 'हाई वोल्टेज टेस्टिंग, इंसुलेटेड टूल्स के सही इस्तेमाल और अर्थिंग सुरक्षा के जरूरी नियम सीखें।',
      ta: 'உயர் மின்னழுத்த சோதனை மற்றும் பாதுகாப்பு முறைகளைக் கற்றுக்கொள்ளுங்கள்.'
    },
    category: 'Electrical Safety',
    durationMinutes: 2,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
    keyPoints: {
      en: [
        'Always switch off the main MCB before touching live conduits.',
        'Use rubber-insulated gloves certified up to 1000V.',
        'Verify with a digital voltage tester before touching bare wires.'
      ],
      hi: [
        'तार छूने से पहले हमेशा मुख्य MCB स्विच बंद करें।',
        '1000V तक प्रमाणित रबर के इंसुलेटेड दस्ताने पहनें।',
        'नंगे तारों को छूने से पहले टेस्टर से करंट चेक करें।'
      ]
    },
    quiz: [
      {
        question: {
          en: 'What should be done first before repairing an electrical distribution box?',
          hi: 'इलेक्ट्रिकल बॉक्स की मरम्मत से पहले सबसे पहला कदम क्या होना चाहिए?'
        },
        options: {
          en: ['Wash hands with water', 'Switch off main MCB breaker & test circuit', 'Touch wire to check spark', 'Start unscrewing immediately'],
          hi: ['हाथ पानी से धोएं', 'मुख्य MCB ब्रेकर बंद करें और टेस्टर से जांचें', 'तार छूकर स्पार्क देखें', 'तुरंत स्क्रू खोलना शुरू करें']
        },
        correctIndex: 1
      }
    ],
    completed: true,
    score: 100
  },
  {
    id: 'tr-2',
    title: {
      en: 'Scaffold Harness & Heights Safety',
      hi: 'मचान (Scaffolding) और ऊंचाई पर काम करने की सुरक्षा',
      ta: 'சாரக்கட்டு மற்றும் உயர பாதுகாப்பு விதிகள்'
    },
    description: {
      en: 'Crucial steps for double-hook harness attachment, checking plank stability, and preventing fatal falls.',
      hi: 'डबल-हुक सेफ्टी बेल्ट लगाना, मचान के तख्तों की जांच और गिरने से बचाव के अहम तरीके।',
      ta: 'உயரமான இடங்களில் வேலை செய்யும் போது பாதுகாப்பு முறைகள்.'
    },
    category: 'Construction Heights',
    durationMinutes: 3,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80',
    keyPoints: {
      en: [
        'Fasten harness lanyard to an anchor point above shoulder level.',
        'Inspect scaffolding planks for cracks before stepping on them.',
        'Never work at heights without a chin-strap secured helmet.'
      ],
      hi: [
        'सेफ्टी बेल्ट का हुक हमेशा कंधे से ऊपर मजबूत जगह पर अटकाएं।',
        'तख्तों पर पैर रखने से पहले दरारें या कमजोरी जांचें।',
        'बिना स्ट्रैप वाले हेलमेट के कभी ऊंचाई पर काम न करें।'
      ]
    },
    quiz: [
      {
        question: {
          en: 'At what minimum height is a full-body safety harness legally mandatory on site?',
          hi: 'साइट पर कितनी ऊंचाई से ऊपर फुल-बॉडी सेफ्टी बेल्ट पहनना अनिवार्य है?'
        },
        options: {
          en: ['Above 6 feet (1.8 meters)', 'Above 20 feet only', 'Only if it is raining', 'Not mandatory'],
          hi: ['6 फीट (1.8 मीटर) से ऊपर', 'केवल 20 फीट से ऊपर', 'सिर्फ बारिश में', 'अनिवार्य नहीं']
        },
        correctIndex: 0
      }
    ],
    completed: false
  },
  {
    id: 'tr-3',
    title: {
      en: 'PPE & Eye Protection in Welding / Grinding',
      hi: 'वेल्डिंग और ग्राइंडिंग में आंखों और त्वचा की सुरक्षा',
      ta: 'வெல்டிங் மற்றும் கண் பாதுகாப்பு'
    },
    description: {
      en: 'Protection against UV arc eye radiation, metal chip sparks, and toxic welding fumes.',
      hi: 'वेल्डिंग आर्क की तेज रोशनी, उड़ते लोहे के कणों और जहरीले धुएं से बचाव।',
      ta: 'வெல்டிங் செய்யும் போது கண் மற்றும் முக கவசம் அணிதல்.'
    },
    category: 'Fabrication & Welding',
    durationMinutes: 2,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=500&auto=format&fit=crop&q=80',
    keyPoints: {
      en: [
        'Auto-darkening helmet shade #10-#12 is required for arc welding.',
        'Leather apron and spats prevent hot slag burns.',
        'Keep fire extinguisher within 10 meters of hot work.'
      ],
      hi: [
        'आर्क वेल्डिंग के लिए शेड #10-#12 का ऑटो-डार्क हेलमेट जरूरी है।',
        'चमड़े का एप्रन गर्म धातु की चिंगारियों से बचाता है।',
        'काम की जगह से 10 मीटर की दूरी में अग्निशामक सिलेंडर रखें।'
      ]
    },
    quiz: [
      {
        question: {
          en: 'Which item is mandatory when using an angle grinder?',
          hi: 'एंगल ग्राइंडर चलाते समय कौन सा सुरक्षा गियर सबसे जरूरी है?'
        },
        options: {
          en: ['Full face shield and impact goggles', 'Sunglasses only', 'Cotton gloves', 'Earphones'],
          hi: ['फेस शील्ड और इम्पैक्ट गॉगल्स', 'साधारण धूप का चश्मा', 'सूती दस्ताने', 'ईयरफोन']
        },
        correctIndex: 0
      }
    ],
    completed: false
  }
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'w-101',
    title: 'New High-Match Job Near You (94%)',
    message: 'Malhotra Infrastructure posted: Senior Electrician @ ₹950/day in Cyber City (2.8km away).',
    type: 'job_match',
    read: false,
    timestamp: '10 mins ago',
    actionUrl: 'job-301'
  },
  {
    id: 'notif-2',
    userId: 'w-101',
    title: 'Shift Attendance OTP Verified',
    message: 'Your check-in OTP 7421 was confirmed by employer. Shift is now active.',
    type: 'otp',
    read: true,
    timestamp: '2 hours ago'
  },
  {
    id: 'notif-3',
    userId: 'w-101',
    title: 'Vayra Safety Certification Awarded',
    message: 'Congratulations! You completed Electrical Hazard Prevention and earned the Gold Safety Badge.',
    type: 'training',
    read: true,
    timestamp: '1 day ago'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    jobId: 'job-prev-1',
    fromUserId: 'emp-201',
    fromUserName: 'Vikram Malhotra (Malhotra Infra)',
    fromRole: 'employer',
    toUserId: 'w-101',
    toUserName: 'Ramesh Kumar',
    rating: 5.0,
    tags: ['Punctual', 'Expert Wiring', 'Safety Conscious', 'Careful with Tools'],
    comment: 'Ramesh is an exceptional electrician. Completed complex 3-phase DB wiring ahead of time with zero faults. Highly recommended!',
    createdAt: '2026-08-20'
  },
  {
    id: 'rev-2',
    jobId: 'job-prev-2',
    fromUserId: 'emp-202',
    fromUserName: 'Rakesh Sharma',
    fromRole: 'employer',
    toUserId: 'w-101',
    toUserName: 'Ramesh Kumar',
    rating: 4.8,
    tags: ['Polite', 'High Quality Work'],
    comment: 'Very polite, brought necessary calibrated tools and worked strictly with safety goggles. Prompt check-in.',
    createdAt: '2026-08-14'
  }
];
