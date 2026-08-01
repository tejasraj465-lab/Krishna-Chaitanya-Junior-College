import { Course, Campus, Ranker, Facility, GalleryItem, Testimonial } from '../types';

export const COLLEGE_INFO = {
  name: "Krishna Chaitanya Junior College",
  tagline: "Empowering Minds, Shaping Top Ranks",
  taglineSecondary: "Premier Junior College with Integrated IIT-JEE, NEET, CA/CMA, Long Term & Civil Services Coaching",
  established: 1998,
  phonePrimary: "+91 63022 75510",
  phoneSecondary: "+91 63022 75510",
  whatsappNumber: "916302275510",
  email: "admissions@kcjc.edu.in",
  website: "https://kcjc-phi.vercel.app",
  admissionExam: "KCJC Integrated Counseling & Aptitude Assessment",
  headquarters: "Nellore, Andhra Pradesh",
  socialLinks: {
    facebook: "https://facebook.com/krishnachaitanyajuniorcollege",
    instagram: "https://instagram.com/krishnachaitanyajuniorcollege",
    youtube: "https://youtube.com/krishnachaitanyajuniorcollege",
    linkedin: "https://linkedin.com/company/krishnachaitanyajuniorcollege",
    twitter: "https://twitter.com/kcjc_official"
  }
};

export const HERO_SLIDES = [
  {
    id: 1,
    title: "India's Rank 1 Junior College for IIT-JEE & NEET Coaching",
    subtitle: "Consistently producing AIR Top 10 Ranks in JEE Advanced, NEET & State EAMCET.",
    badge: "ADMISSIONS OPEN 2026-27",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80",
    ctaPrimary: "Apply For Admission",
    ctaSecondary: "Download Syllabus Brochure"
  },
  {
    id: 2,
    title: "State-of-the-Art Digital Labs & AC Residential Campuses",
    subtitle: "High-tech smart classrooms, individual mentoring, and 24/7 monitored study halls.",
    badge: "EXCELLENCE IN EDUCATION",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80",
    ctaPrimary: "Explore Campuses",
    ctaSecondary: "Book Campus Tour"
  },
  {
    id: 3,
    title: "Accredited 3 AP BN NCC Battalion Cadet Wing",
    subtitle: "Building leadership, military discipline, physical stamina, and direct Defense SSB interview pathways alongside academic excellence.",
    badge: "3 AP BN NCC ACCREDITED",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=80",
    ctaPrimary: "NCC Cadet Highlights",
    ctaSecondary: "Talk To Counselor"
  }
];

export const HIGHLIGHT_COUNTERS = [
  { id: 'students', label: 'Successful Alumni', count: 15000, suffix: '+', icon: 'GraduationCap' },
  { id: 'campuses', label: 'Campuses in Nellore', count: 12, suffix: '', icon: 'Building2' },
  { id: 'faculty', label: 'IITian & Doctor Faculty', count: 450, suffix: '+', icon: 'Award' },
  { id: 'ranks', label: 'Top 100 National Ranks', count: 320, suffix: '+', icon: 'Trophy' },
  { id: 'years', label: 'Years of Academic Legacy', count: 28, suffix: '+', icon: 'Calendar' }
];

export const COURSES: Course[] = [
  {
    id: 'mpc',
    code: 'MPC',
    title: 'Mathematics, Physics, Chemistry',
    subtitle: 'Integrated IIT-JEE Main/Adv & BITSAT Mastery',
    tag: 'MOST POPULAR FOR ENGINEERING',
    integratedCoaching: ['IIT-JEE Main & Advanced', 'BITSAT', 'State EAMCET / TG-EAPCET', 'Olympia & KVPY'],
    subjects: ['Mathematics (1A, 1B, 2A, 2B)', 'Physics (Theory & Practical)', 'Chemistry (Organic, Inorganic, Physical)', 'English & Second Language'],
    careerOptions: ['IIT / NIT / IIIT Engineering', 'Aerospace & Data Science', 'Defence Services (NDA)', 'Pure Sciences & IISc'],
    duration: '2 Years (Class XI & XII)',
    seats: 240,
    featured: true,
    color: '#0B3C91',
    iconName: 'Calculator',
    description: 'Designed for high-aspiring engineering students. Combines Telangana/AP Intermediate Board Syllabus with rigorous 6-tier JEE problem-solving methodologies.',
    eligibility: '10th Passed / Appeared (CBSE, ICSE, SSC, State Boards)'
  },
  {
    id: 'bipc',
    code: 'BiPC',
    title: 'Biology, Physics, Chemistry',
    subtitle: 'Integrated NEET & AIIMS Medical Masterclass',
    tag: 'HIGH SUCCESS RATE IN MEDICAL',
    integratedCoaching: ['NEET-UG (Medical)', 'AIIMS & JIPMER Pattern', 'State EAMCET (Agri & Med)', 'Botany/Zoology Olympiads'],
    subjects: ['Botany (Plant Anatomy & Genetics)', 'Zoology (Human Physiology & Diversity)', 'Physics (Concept & Numerical Drills)', 'Chemistry (NCERT Deep Dive)', 'Languages'],
    careerOptions: ['MBBS & BDS', 'BAMS / BHMS / Veterinary', 'Biotechnology & Genetics', 'Pharmacy & Clinical Research'],
    duration: '2 Years (Class XI & XII)',
    seats: 200,
    featured: true,
    color: '#059669',
    iconName: 'Microscope',
    description: 'Specialized medical batch with daily NCERT line-by-line line analysis, daily mock tests, speed-accuracy mapping, and personal doctor-mentors.',
    eligibility: '10th Passed / Appeared with minimum 60% in Science'
  },
  {
    id: 'mec',
    code: 'MEC',
    title: 'Mathematics, Economics, Commerce',
    subtitle: 'Integrated CA/CMA Foundation & IPMAT Management',
    tag: 'PREFERRED FOR CA/CMA & IIMs',
    integratedCoaching: ['ICAI CA-Foundation', 'ICMAI CMA-Foundation', 'IPMAT (IIM Indore/Rohtak)', 'CUET Commerce', 'CSEET (Company Secretary)'],
    subjects: ['Advanced Accountancy', 'Business Economics & Statistics', 'Commerce & Financial Literacy', 'Mathematics', 'Languages'],
    careerOptions: ['Chartered Accountant (CA)', 'Cost & Management Accountant (CMA)', 'Company Secretary (CS)', '5-Year Integrated MBA at IIMs'],
    duration: '2 Years (Class XI & XII)',
    seats: 120,
    featured: false,
    color: '#D97706',
    iconName: 'TrendingUp',
    description: 'Blends financial acumen with mathematical rigor. Specialized integrated coaching for CA-Foundation & CMA-Foundation alongside Intermediate board syllabus.',
    eligibility: '10th Passed / Appeared'
  },
  {
    id: 'cec',
    code: 'CEC',
    title: 'Civics, Economics, Commerce',
    subtitle: 'Integrated CA/CMA, CLAT Law & Civil Services Foundation',
    tag: 'LEADERSHIP, CA/CMA & IAS FOUNDATION',
    integratedCoaching: ['ICAI CA/CMA Foundation Support', 'UPSC Civil Services Foundation', 'CLAT / AILET Law Entrance', 'CUET Arts & Humanities'],
    subjects: ['Civics & Indian Constitution', 'Macro & Micro Economics', 'Commerce & Banking Principles', 'General Knowledge & Current Affairs', 'Languages'],
    careerOptions: ['Chartered Accountant / CMA', 'Civil Services (IAS/IPS/IFS)', 'Corporate Law & Litigation', 'Business & E-Commerce'],
    duration: '2 Years (Class XI & XII)',
    seats: 100,
    featured: false,
    color: '#7C3AED',
    iconName: 'Scale',
    description: 'Empowers students aiming for CA/CMA, Law, Public Administration, and Business Leadership with intensive analytical reasoning and communication modules.',
    eligibility: '10th Passed / Appeared'
  },
  {
    id: 'longterm',
    code: 'Long Term',
    title: 'Long Term Intensive Repeater Batch',
    subtitle: 'Dedicated 1-Year Coaching for NEET, JEE & CA/CMA Repeaters',
    tag: '100% SCORE & RANK IMPROVEMENT',
    integratedCoaching: ['NEET Medical Long Term', 'IIT-JEE Main/Adv Long Term', 'CA/CMA Foundation Repeater', 'Daily Micro-Analysis & Grand Tests'],
    subjects: ['Physics, Chemistry, Botany, Zoology (NEET)', 'Maths, Physics, Chemistry (JEE)', 'Accountancy, Law, Economics, Stats (CA/CMA)'],
    careerOptions: ['Top Medical Colleges (MBBS)', 'Top Engineering Colleges (IIT/NIT)', 'Chartered Accountancy (CA / CMA)'],
    duration: '1 Year Intensive Batch',
    seats: 150,
    featured: true,
    color: '#DC2626',
    iconName: 'Award',
    description: 'Exclusive 1-year residential & day long-term repeater batch with daily chapter-wise speed tests, personal mentorship, and micro-error analysis.',
    eligibility: 'Intermediate / 10+2 Passed'
  }
];

export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: "Top Academic Results",
    description: "Consistently delivering outstanding results in Intermediate Board Examinations, IIT-JEE, NEET, EAPCET, CA Foundation, and CMA Foundation, making us one of the leading junior colleges in Nellore.",
    icon: "Trophy",
    badge: "Results"
  },
  {
    id: 2,
    title: "Expert Faculty",
    description: "A team of highly experienced and dedicated faculty members who use concept-oriented teaching methodologies to help students excel academically and competitively.",
    icon: "GraduationCap",
    badge: "Faculty"
  },
  {
    id: 3,
    title: "Integrated Programmes",
    description: "Specially designed programmes that seamlessly integrate the Intermediate curriculum with IIT-JEE, NEET, EAPCET, CA Foundation, and CMA Foundation coaching under one academic schedule.",
    icon: "Layers",
    badge: "Academics"
  },
  {
    id: 4,
    title: "Personalised Mentorship",
    description: "Every student receives individual attention through dedicated mentors who continuously monitor academic progress, provide counselling, and motivate students to achieve their goals.",
    icon: "Target",
    badge: "Guidance"
  },
  {
    id: 5,
    title: "Performance Analysis",
    description: "Regular weekly tests, grand tests, board model examinations, and detailed performance analysis help students identify strengths and improve weaker areas.",
    icon: "BarChart3",
    badge: "Analytics"
  },
  {
    id: 6,
    title: "AI-Powered Learning & Analytics",
    description: "Technology-enabled academic support with digital learning tools, performance tracking, and intelligent analytics to enhance student outcomes.",
    icon: "Sparkles",
    badge: "Tech"
  },
  {
    id: 7,
    title: "Daily Study Hours & Doubt Clarification",
    description: "Dedicated supervised study hours and daily doubt-clearing sessions ensure every concept is understood thoroughly without requiring external tuition.",
    icon: "Clock",
    badge: "Support"
  },
  {
    id: 8,
    title: "Smart Digital Classrooms",
    description: "Modern classrooms equipped with digital teaching aids, interactive learning methods, and high-quality study materials create an engaging learning experience.",
    icon: "MonitorPlay",
    badge: "Infrastructure"
  },
  {
    id: 9,
    title: "Modern Laboratories",
    description: "Well-equipped Physics, Chemistry, Biology, and Computer laboratories provide students with practical exposure and hands-on learning experiences.",
    icon: "FlaskConical",
    badge: "Infrastructure"
  },
  {
    id: 10,
    title: "Parent Communication",
    description: "Regular Parent–Teacher Meetings, progress reports, and continuous communication keep parents informed and involved in their child's academic journey.",
    icon: "Users",
    badge: "Parents"
  },
  {
    id: 11,
    title: "KCEI Mobile App",
    description: "Parents can conveniently track attendance, test scores, examination results, fee payments, homework, academic performance, and important announcements through the official KCEI App.",
    icon: "Smartphone",
    badge: "App"
  },
  {
    id: 12,
    title: "Safe Transport Facility",
    description: "A reliable transportation network covering major routes with well-maintained buses, trained staff, and a strong commitment to student safety.",
    icon: "Bus",
    badge: "Safety"
  },
  {
    id: 13,
    title: "Hostel & Mess Facilities",
    description: "Separate residential campuses for boys and girls with hygienic food, comfortable accommodation, disciplined supervision, and a secure learning environment.",
    icon: "Building2",
    badge: "Residential"
  },
  {
    id: 14,
    title: "Student Development",
    description: "Personality development programmes, motivational seminars, leadership activities, sports, cultural events, and career guidance help students become confident individuals.",
    icon: "Compass",
    badge: "Holistic"
  },
  {
    id: 15,
    title: "Safe & Disciplined Campus",
    description: "A secure campus with 24×7 CCTV surveillance, disciplined academic practices, and a positive atmosphere that promotes focused learning and personal growth.",
    icon: "ShieldCheck",
    badge: "Security"
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'f1',
    title: '4K Smart Interactive Classrooms',
    category: 'Academics',
    description: 'Equipped with ultra-HD interactive whiteboards, high-speed fiber internet, and acoustic soundproofing for immersive learning.',
    iconName: 'Presentation',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    features: ['3D Animated Science Diagrams', 'Recorded Lecture Playback', 'Air Conditioned Comfort', 'Ergonomic Single Seating']
  },
  {
    id: 'f2',
    title: 'Advanced Physics Laboratory',
    category: 'Labs',
    description: 'Precision optics tables, digital oscilloscopes, optics benches, and electromagnetic apparatus meeting international standards.',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    features: ['Laser Optics Setup', 'Digital Multimeters', '1-on-1 Practical Stations', 'Zero Hazard Grounding']
  },
  {
    id: 'f3',
    title: 'Hi-Tech Chemistry Laboratory',
    category: 'Labs',
    description: 'Fume hoods, digital analytical balances, spectrophotometers, and fully stocked reagent stations for qualitative analysis.',
    iconName: 'FlaskConical',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    features: ['Automated Fume Hoods', 'Individual Reagent Racks', 'Safety Shower & Eye Wash', 'Certified Lab Technicians']
  },
  {
    id: 'f4',
    title: 'Advanced Biology & Specimen Lab',
    category: 'Labs',
    description: 'High-magnification binocular microscopes, human anatomical models, preserved specimen gallery, and plant physiology setups.',
    iconName: 'Microscope',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    features: ['3D Human Anatomy Models', 'Fluorescence Microscopes', 'Specimen Museum', 'Digital Histology Slides']
  },
  {
    id: 'f5',
    title: 'Computer Science & AI Lab',
    category: 'Labs',
    description: '200+ high-performance desktop systems with Gigabit ethernet, Python, C++, and online mock testing software simulating NTA JEE/NEET.',
    iconName: 'Laptop',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    features: ['NTA Exam Simulator', 'High-Speed Broadband', 'UPS Power Backup', 'Cybersecurity Protocols']
  },
  {
    id: 'f6',
    title: 'Digital Library & Reading Lounge',
    category: 'Academics',
    description: 'Stocked with 25,000+ physical reference books, research journals, foreign university papers, and 50 digital e-reader stations.',
    iconName: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    features: ['Quiet Study Pods', 'International Academic Journals', 'E-Book Subscriptions', '24/7 Access for Hostellers']
  },
  {
    id: 'f7',
    title: 'Executive AC Hostel & Residential Blocks',
    category: 'Campus',
    description: 'Separate, highly secure hostel blocks for boys and girls with climate-controlled 2/3 sharing rooms and attached study desks.',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    features: ['Attached Bathrooms with Hot Water', 'Daily Housekeeping', 'Resident Faculty Wardens', 'Study Hour Monitoring']
  },
  {
    id: 'f8',
    title: 'AC Bus Transport Network',
    category: 'Campus',
    description: 'Fleet of 45+ air-conditioned buses covering all major suburbs with real-time GPS tracking and dedicated attendant on board.',
    iconName: 'Bus',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    features: ['Live Mobile GPS Tracking', 'Speed Governor Safety', 'CCTV Onboard', 'Doorstep Pickup & Drop']
  },
  {
    id: 'f9',
    title: 'Sports Arena & Fitness Gym',
    category: 'Sports',
    description: 'Basketball court, badminton courts, cricket nets, table tennis hall, yoga studio, and modern fitness center.',
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    features: ['Synthetic Basketball Court', 'Professional Coaches', 'Daily Evening Playtime', 'Indoor Games Zone']
  },
  {
    id: 'f10',
    title: '24/7 Medical Care & Ambulance',
    category: 'Safety',
    description: 'In-campus 4-bed infirmary with full-time qualified nurses, visiting doctors, and dedicated emergency response vehicle.',
    iconName: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    features: ['Resident Nurse On-Duty', 'First-Aid & Oxygen Setup', 'Tie-up with Super-Specialty Hospitals', 'Free Quarterly Health Checks']
  },
  {
    id: 'f11',
    title: 'Multi-Cuisine Hygienic Cafeteria',
    category: 'Campus',
    description: 'FSSAI-certified kitchen serving nutritious, balanced South & North Indian meals prepared under dietitian supervision.',
    iconName: 'Utensils',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80',
    features: ['Four Meals Daily (Break, Lunch, Snacks, Dinner)', 'RO Mineral Water Plants', 'Organic Produce Sourcing', 'Clean Dining Hall']
  },
  {
    id: 'f12',
    title: '360° High-Def CCTV & AI Security',
    category: 'Safety',
    description: 'Over 300 HD cameras monitored in central security room, visitor management kiosk, and zero-tolerance ragging policy.',
    iconName: 'Eye',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    features: ['Parent App Security Feeds', 'Biometric Gate Access', 'Women Safety Patrol', '24/7 Security Personnel']
  }
];

export const ADMISSION_STEPS = [
  {
    step: 1,
    title: 'Online Application',
    desc: 'Fill our quick 2-minute online application form or visit any campus. Pay token application fee or confirm your counseling slot.',
    icon: 'FileText'
  },
  {
    step: 2,
    title: 'Academic Counseling',
    desc: 'Attend 1-on-1 academic counseling with expert faculty to choose the right group (MPC/BiPC/MEC/CEC) according to career goals.',
    icon: 'UserCheck'
  },
  {
    step: 3,
    title: 'Document Submission',
    desc: 'Submit 10th marks memo, TC, Aadhaar copy, and photos for verification and batch allocation.',
    icon: 'FolderCheck'
  },
  {
    step: 4,
    title: 'Admission Confirmation',
    desc: 'Receive official admission letter, uniform kit, hostel room allocation, and orientation schedule!',
    icon: 'CheckCircle2'
  }
];

export const CAMPUSES: Campus[] = [
  // Day / City Campuses in Nellore
  {
    id: 'c1',
    name: 'Krishna Chaitanya Junior College – Prabhanjana Campus (Girls Campus)',
    type: 'Girls Campus',
    category: 'Day',
    city: 'Nellore',
    address: 'Near Murali Krishna Hotel, Madras Bus Stand, Nellore.',
    phone: '+91 63022 75510',
    email: 'prabhanjana@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Madras+Bus+Stand+Nellore',
    facilities: ['Girls Day Wing', 'Smart Classrooms', 'Integrated IIT/NEET', 'Safe Transport'],
    stats: { students: '1,200+', faculty: '45+', labs: 4 }
  },
  {
    id: 'c2',
    name: 'Krishna Chaitanya Junior College – Vasista Campus (Boys Campus)',
    type: 'Boys Campus',
    category: 'Day',
    city: 'Nellore',
    address: 'Near Murali Krishna Hotel, Madras Bus Stand, Nellore.',
    phone: '+91 63022 75510',
    email: 'vasista@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Madras+Bus+Stand+Nellore',
    facilities: ['Boys Day Wing', 'Digital Study Labs', 'JEE/EAPCET Coaching', 'Sports Yard'],
    stats: { students: '1,100+', faculty: '40+', labs: 4 }
  },
  {
    id: 'c3',
    name: 'Krishna Chaitanya Junior College – Sarvagna Campus',
    type: 'Day Campus',
    category: 'Day',
    city: 'Nellore',
    address: 'Stonehousepeta, Nellore.',
    phone: '+91 63022 75510',
    email: 'sarvagna@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Stonehousepeta+Nellore',
    facilities: ['Concept Learning Wing', 'Interactive Boards', 'CA/CMA Focus Batch', 'Library'],
    stats: { students: '950+', faculty: '35+', labs: 3 }
  },
  {
    id: 'c4',
    name: 'Krishna Chaitanya Junior College – Abhigna Campus (Girls Campus)',
    type: 'Girls Campus',
    category: 'Day',
    city: 'Nellore',
    address: 'Current Office Centre, Dargamitta, Nellore.',
    phone: '+91 63022 75510',
    email: 'abhigna@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Dargamitta+Nellore',
    facilities: ['Girls Special Batch', 'NEET Biology Lab', 'CCTV Security', 'Mentoring Cells'],
    stats: { students: '1,050+', faculty: '38+', labs: 4 }
  },
  {
    id: 'c5',
    name: 'Krishna Chaitanya Junior College – DGM Campus (Boys Campus)',
    type: 'Boys Campus',
    category: 'Day',
    city: 'Nellore',
    address: 'Current Office Centre, Dargamitta, Nellore.',
    phone: '+91 63022 75510',
    email: 'dgm@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Dargamitta+Nellore',
    facilities: ['Boys Tech Wing', 'Physics & Chem Labs', 'IIT-JEE Prep', 'Audio-Visual Rooms'],
    stats: { students: '1,150+', faculty: '42+', labs: 4 }
  },
  {
    id: 'c6',
    name: 'Krishna Chaitanya Junior College – Einstein Campus (Girls AC Campus)',
    type: 'Girls AC Campus',
    category: 'Day',
    city: 'Nellore',
    address: 'Near KVR Petrol Bunk, Magunta Layout, Nellore.',
    phone: '+91 63022 75510',
    email: 'einstein.girls@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Magunta+Layout+Nellore',
    facilities: ['Climate Controlled AC Classrooms', '4K Digital Boards', 'Medical Wing', 'High Security'],
    stats: { students: '1,300+', faculty: '48+', labs: 5 }
  },
  {
    id: 'c7',
    name: 'Krishna Chaitanya Junior College – AC Einstein Campus (Boys AC Campus)',
    type: 'Boys AC Campus',
    category: 'Day',
    city: 'Nellore',
    address: 'Near KVR Petrol Bunk, Magunta Layout, Nellore.',
    phone: '+91 63022 75510',
    email: 'einstein.boys@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Magunta+Layout+Nellore',
    facilities: ['Fully AC Smart Classrooms', 'JEE Advanced Wing', 'Special Assessment Center'],
    stats: { students: '1,400+', faculty: '50+', labs: 5 }
  },
  {
    id: 'c8',
    name: 'Krishna Chaitanya Junior College – Buchireddypalem Campus',
    type: 'Regional Campus',
    category: 'Day',
    city: 'Buchireddypalem',
    address: 'Buchireddypalem, Nellore District.',
    phone: '+91 63022 75510',
    email: 'buchireddypalem@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Buchireddypalem+Nellore',
    facilities: ['Integrated Rural & Urban Batch', 'Digital Classrooms', 'Transport Service', 'Parent Desk'],
    stats: { students: '800+', faculty: '30+', labs: 3 }
  },

  // Residential Campuses
  {
    id: 'c9',
    name: 'Krishna Chaitanya Junior College – Einstein Residential Campus (Girls AC)',
    type: 'Girls AC Residential',
    category: 'Residential',
    city: 'Nellore',
    address: 'Near KVR Petrol Bunk, Magunta Layout, Nellore.',
    phone: '+91 63022 75510',
    email: 'res.einstein.girls@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Magunta+Layout+Nellore',
    facilities: ['24/7 AC Hostel', 'Hygienic Dining Mess', 'Doctor on Call', 'Supervised Study Hours'],
    stats: { students: '900+', faculty: '35+', labs: 4 }
  },
  {
    id: 'c10',
    name: 'Krishna Chaitanya Junior College – Chandrahasa Campus (Boys AC)',
    type: 'Boys AC Residential',
    category: 'Residential',
    city: 'Nellore',
    address: 'Near Varamahalakshmi Shopping Mall, Magunta Layout, Nellore.',
    phone: '+91 63022 75510',
    email: 'chandrahasa@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Magunta+Layout+Nellore',
    facilities: ['AC Boys Residence', 'IIT/NEET Intensive Hostel', 'Indoor Sports', 'Mineral RO Water'],
    stats: { students: '950+', faculty: '38+', labs: 4 }
  },
  {
    id: 'c11',
    name: 'Krishna Chaitanya Junior College – Gomathy Residential Campus (Girls Residential)',
    type: 'Girls Residential',
    category: 'Residential',
    city: 'Nellore',
    address: 'Beside Gomathy School, Gomathy Nagar, Nellore.',
    phone: '+91 63022 75510',
    email: 'gomathy@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Gomathy+Nagar+Nellore',
    facilities: ['Secure Girls Hostel', 'In-House Faculty Mentors', 'Home-Style Nutritious Food', 'Surveillance'],
    stats: { students: '850+', faculty: '32+', labs: 3 }
  },
  {
    id: 'c12',
    name: 'Krishna Chaitanya Junior College – Dargamitta Residential Campus (Boys Residential)',
    type: 'Boys Residential',
    category: 'Residential',
    city: 'Nellore',
    address: 'Near Current Office Centre, Dargamitta, Nellore.',
    phone: '+91 63022 75510',
    email: 'res.dargamitta@kcjc.edu.in',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Dargamitta+Nellore',
    facilities: ['Boys Residential Wing', 'Early Morning & Night Study Sessions', 'Sports Ground', 'Security'],
    stats: { students: '880+', faculty: '34+', labs: 3 }
  }
];

export const RANKERS: Ranker[] = [
  {
    id: 'r1',
    name: 'K. Sai Siddartha',
    exam: 'IIT-JEE',
    rank: 'AIR 12',
    score: '348 / 360',
    year: '2025',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    course: 'MPC (2-Year Integrated)',
    campus: 'Nellore Main Campus',
    quote: 'The daily micro-level error analysis and doubt clearing by Krishna Chaitanya faculty made IIT-JEE Advanced feel totally manageable. Joining KCJC was my best decision!'
  },
  {
    id: 'r2',
    name: 'P. Ananya Reddy',
    exam: 'NEET',
    rank: 'AIR 8',
    score: '710 / 720',
    year: '2025',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    course: 'BiPC (2-Year NEET Special)',
    campus: 'Nellore Pogathota Campus',
    quote: 'NCERT line-by-line decoding and 50+ full syllabus mock tests gave me supreme confidence to score 710 in NEET and secure AIIMS New Delhi!'
  },
  {
    id: 'r3',
    name: 'V. Teja Vardhan',
    exam: 'EAMCET',
    rank: 'State Rank 1',
    score: '156 / 160',
    year: '2025',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    course: 'MPC',
    campus: 'Nellore Trunk Road Campus',
    quote: 'Krishna Chaitanya study materials and shortcut math formulas gave me a huge speed advantage during the 3-hour test. Truly world-class mentoring.'
  },
  {
    id: 'r4',
    name: 'M. Sravanthi',
    exam: 'BOARD',
    rank: 'Top Mark',
    score: '992 / 1000',
    year: '2025',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    course: 'MEC (CA/CMA Integrated)',
    campus: 'Nellore Main Campus',
    quote: 'Scoring 99.2% in state board while clearing CA-Foundation & CMA-Foundation in first attempt was made possible by KCJC’s balanced academic timetable.'
  },
  {
    id: 'r5',
    name: 'R. Vignesh Kumar',
    exam: 'IIT-JEE',
    rank: 'AIR 45',
    score: '332 / 360',
    year: '2025',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    course: 'Long Term JEE',
    campus: 'Nellore Vedayapalem Campus',
    quote: 'The weekly computer-based test platform mirrors the real NTA exam interface 100%. Long term coaching helped me jump from rank 12000 to AIR 45!'
  },
  {
    id: 'r6',
    name: 'G. Meghana',
    exam: 'NEET',
    rank: 'AIR 23',
    score: '702 / 720',
    year: '2025',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    course: 'BiPC (Long Term NEET)',
    campus: 'Nellore Main Campus',
    quote: 'Krishna Chaitanya biology specimen labs and faculty guidance made botany and zoology my strongest subjects. Forever grateful!'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g0a',
    title: 'Inter 2026 Results - Krishna Chaitanya No.1',
    category: 'Achievements',
    image: 'https://ik.imagekit.io/tejasraju/1785400591860.png',
    caption: 'Official Intermediate 2026 Results announcement banner highlighting top rankers in Nellore.',
    date: 'July 2026'
  },
  {
    id: 'g0b',
    title: 'Elite JEE Results & Admissions Banner',
    category: 'Achievements',
    image: 'https://ik.imagekit.io/tejasraju/1785400268661.png',
    caption: 'Elite JEE Main & Advanced top percentile holders and course offerings.',
    date: 'July 2026'
  },
  {
    id: 'g0c',
    title: 'NEET & EAPCET Coaching Achievements',
    category: 'Achievements',
    image: 'https://ik.imagekit.io/tejasraju/1785400491266.png',
    caption: 'Integrated Coaching Excellence for IIT-JEE and NEET Aspirants.',
    date: 'July 2026'
  },
  {
    id: 'g0d',
    title: 'Krishna Chaitanya Main Campus Building Block',
    category: 'Campus',
    image: 'https://ik.imagekit.io/tejasraju/IMG_20260727_191203.jpg.jpeg?updatedAt=1785159765700',
    caption: 'State-of-the-art Krishna Chaitanya building block with smart classrooms and modern facilities.',
    date: '2026'
  },
  {
    id: 'g1',
    title: 'Modern Science & Innovation Expo',
    category: 'Labs',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    caption: 'Students demonstrating physics optics experiments during the Annual Science Expo.',
    date: 'Jan 2026'
  },
  {
    id: 'g2',
    title: 'NCC Cadet Contingent at State Parade',
    category: 'NCC',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    caption: 'Krishna Chaitanya 3 AP BN NCC Cadets receiving Governor’s commendation award.',
    date: 'Jan 2026'
  },
  {
    id: 'g3',
    title: 'NSS Tree Plantation & Green Campus Drive',
    category: 'NSS',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    caption: 'Over 1,000 saplings planted by NSS student volunteers in community drive.',
    date: 'Dec 2025'
  },
  {
    id: 'g4',
    title: 'Annual Cultural Fest - Tarang 2025',
    category: 'Annual Day',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    caption: 'Grand musical & classical dance performances by junior college talents.',
    date: 'Nov 2025'
  },
  {
    id: 'g5',
    title: 'Inter-College Basketball Championship Winners',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    caption: 'Krishna Chaitanya Boys Basketball Team lifting the State Junior Trophy.',
    date: 'Oct 2025'
  },
  {
    id: 'g6',
    title: 'Felicitation of IIT-JEE & NEET All India Rankers',
    category: 'Achievements',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
    caption: 'Hon’ble Education Minister felicitating Top 10 rankers with gold medals.',
    date: 'Jun 2025'
  },
  {
    id: 'g7',
    title: 'High-Tech Computer & AI Laboratory',
    category: 'Labs',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    caption: 'Interactive coding & online NTA mock test session in progress.',
    date: 'Feb 2026'
  },
  {
    id: 'g8',
    title: 'Jubilee Hills Main Campus Aerial View',
    category: 'Campus',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    caption: 'Our sprawling 10-acre green residential campus with modern sports facilities.',
    date: 'Jan 2026'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Ramesh Chandra (F/O AIR 12 Siddartha)',
    role: 'Parent',
    course: 'MPC Batch',
    year: '2025',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    quote: 'As a parent, my biggest concern was safety and academic discipline. Krishna Chaitanya College exceeded every expectation. The faculty kept us updated weekly on Siddartha’s progress. Today he is at IIT Bombay!',
    collegeOrCompany: 'Cardiologist, Apollo Hospitals'
  },
  {
    id: 't2',
    name: 'Dr. Harini Varma',
    role: 'Alumni',
    course: 'BiPC (Batch of 2021)',
    year: '2021',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    quote: 'Krishna Chaitanya didn’t just teach me biology; they instilled unwavering clinical curiosity. The mock test series prepared me so well that NEET felt like just another weekly practice test.',
    collegeOrCompany: 'Resident Doctor, AIIMS New Delhi'
  },
  {
    id: 't3',
    name: 'Vikramaditya Shah',
    role: 'Alumni',
    course: 'MPC (Batch of 2020)',
    year: '2020',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    quote: 'The problem-solving techniques taught by Krishna Chaitanya faculty helped me crack JEE Advanced and later land a software role at Google Silicon Valley.',
    collegeOrCompany: 'Senior Software Engineer, Google USA'
  }
];

export const LEADERSHIP_MEMBERS = [
  {
    id: 'l1',
    name: 'Dr. R. V Krishna Reddy',
    title: 'Founder & Chairman',
    qualification: 'M.Sc., Ph.D.',
    badge: 'Founder & Chairman',
    photo: 'https://ik.imagekit.io/tejasraju/image.png?updatedAt=1785158598157',
    description: 'Pioneering educational visionary who established Krishna Chaitanya with a vision to deliver world-class competitive coaching and character-building education.',
    quote: 'Education is not merely preparing for an exam; it is preparing for a life of purpose, courage, and excellence.'
  },
  {
    id: 'l2',
    name: 'Sri. Parvathareddy Chandra Sekhar Reddy, MLC',
    title: 'Founder',
    qualification: 'Member of Legislative Council (MLC)',
    badge: 'Founder',
    photo: 'https://ik.imagekit.io/tejasraju/Screenshot%202026-07-27%20162307.png?updatedAt=1785158548267',
    description: 'Distinguished leader and public representative dedicated to advancing quality higher education, youth empowerment, and community development across Andhra Pradesh.',
    quote: 'Empowering the youth with strong academic foundations and ethical values is the key to building a vibrant nation.'
  },
  {
    id: 'l3',
    name: 'Parvathareddy Rana Pramodh Reddy',
    title: 'Director',
    qualification: 'Director, KCEI',
    badge: 'Director',
    photo: 'https://ik.imagekit.io/tejasraju/Screenshot%202026-07-27%20162221.png?updatedAt=1785158280276',
    description: 'Dynamic administrative lead driving modern digital infrastructure, academic innovation, student-centric technology tools, and operational excellence.',
    quote: 'We integrate modern technology and personalized mentoring to ensure every student reaches their highest potential.'
  }
];

export const CHAIRMAN_MESSAGE = {
  name: "Dr. R. V Krishna Reddy",
  qualification: "M.Sc., Ph.D.",
  designation: "Founder & Chairman, Krishna Chaitanya Educational Institutions",
  photo: "https://ik.imagekit.io/tejasraju/image.png?updatedAt=1785158598157",
  vision: "To cultivate a generation of courageous thinkers, compassionate leaders, and high-achieving scholars who excel in global competitive standards while holding firm to ethical values.",
  messageShort: "For over 28 years, Krishna Chaitanya Junior College has been built on a single uncompromising pillar: Unlocking the true potential of every young mind through structured discipline, personal mentorship, and academic mastery.",
  messageFull: `Dear Parents and Aspiring Students,

Welcome to Krishna Chaitanya Junior College.

The two years of Intermediate / Junior College (Classes XI & XII) represent the single most defining crossroads in a student's academic journey. It is during these 24 crucial months that young minds transition from school foundations to professional milestones—whether securing a seat in prestigious IITs, AIIMS, NALSAR, or top Central Universities.

At Krishna Chaitanya, we do not believe in rote memorization or assembly-line coaching. We have pioneered a balanced 360° educational framework:
1. Conceptual Depth: Ensuring complete mastery of NCERT & Board fundamentals.
2. Competitive Edge: Micro-level problem solving, speed-accuracy mapping, and daily NTA mock drills.
3. Character & Discipline: Active participation in Accredited NCC Battalion drills, Sports, and leadership forums to foster mental resilience and patriotism.

When you entrust your child to Krishna Chaitanya, you are placing them in the hands of compassionate mentors who treat every student as their own. I invite you to visit our campuses, interact with our faculty, and witness the transformative energy of Krishna Chaitanya Educational Institutions.

Warm regards & best wishes,
Dr. R. V Krishna Reddy
Founder & Chairman`,
  signatureText: "Dr. R. V Krishna Reddy"
};

export const FAQ_LIST = [
  {
    question: "What courses are offered at Krishna Chaitanya Junior College?",
    answer: "We offer 2-year Intermediate programs: MPC (Maths, Physics, Chem with IIT-JEE/BITSAT/EAMCET), BiPC (Biology, Physics, Chem with NEET/AIIMS), MEC (Maths, Eco, Commerce with CA-Foundation/IPMAT), and CEC (Civics, Eco, Commerce with CLAT/Civil Services)."
  },
  {
    question: "What is the admission criteria for Intermediate 1st Year?",
    answer: "Admissions are granted based on 10th Board marks (SSC / CBSE / ICSE or equivalent) along with an interactive 1-on-1 academic counseling session with senior faculty."
  },
  {
    question: "Are separate residential hostels available for boys and girls?",
    answer: "Yes! We provide fully air-conditioned, 24/7 biometric-secured hostel facilities with resident wardens, study hour supervisors, in-campus medical care, and multi-cuisine dining."
  },
  {
    question: "How does the WhatsApp Admission process work?",
    answer: "Simply click the 'Apply Now' or WhatsApp icon anywhere on the site, enter your name, preferred course, and campus. Our admission system instantly opens WhatsApp with a pre-formatted request to connect with a senior counselor."
  },
  {
    question: "What are the opportunities in NCC & NSS at Krishna Chaitanya?",
    answer: "Krishna Chaitanya has an officially accredited NCC Battalion and NSS Unit. Students get opportunities for Republic Day Camp (RDC) selection in New Delhi, national adventure camps, and community service certificates that carry bonus weightage in defense and university entries."
  }
];
