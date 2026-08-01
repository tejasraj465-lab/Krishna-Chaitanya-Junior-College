export interface ProgramDetail {
  id: string;
  stream: 'MPC' | 'BiPC' | 'MEC' | 'CEC';
  code: string;
  name: string;
  badge: string;
  tagline: string;
  overview: string[];
  structure: string[];
  techLearning?: {
    aiModel: string;
    tablet: string;
    examsOnTablet: string;
    analysis360: string;
    digitalBoard: string;
    videoLectures: string;
  };
  features?: string[];
  advantages?: string[];
  outcome: string;
}

export const PROGRAM_DETAILS: Record<string, ProgramDetail> = {
  'mpc-elite': {
    id: 'mpc-elite',
    stream: 'MPC',
    code: 'MPC Elite',
    name: 'MPC Elite Program (IIT Rankers)',
    badge: 'IIT Rankers Batch',
    tagline: 'Top-Tier IIT-JEE Main & Advanced Integrated Coaching',
    overview: [
      'The MPC Elite Program at Krishna Chaitanya Junior College is designed for highly motivated students aspiring to achieve top ranks in IIT-JEE Main & Advanced while securing outstanding results in the Intermediate Public Examinations (IPE). The program focuses on building strong conceptual foundations in Mathematics, Physics, and Chemistry, enabling students to develop the analytical thinking and problem-solving skills required for national-level engineering entrance examinations.',
      'With a carefully structured academic framework, the program integrates Intermediate Board preparation with advanced IIT-JEE coaching, ensuring students receive the right balance of academic excellence and competitive exam readiness. Through expert faculty guidance, continuous assessments, and disciplined academic training, students are equipped to pursue admission into India’s premier engineering institutions.'
    ],
    structure: [
      'Integrated preparation for Intermediate Board + JEE Main + JEE Advanced',
      'Advanced concept-based teaching methodology',
      'Daily problem-solving practice sessions',
      'Weekly grand tests and performance evaluations',
      'Chapter-wise and full-length exam simulations',
      'Continuous mentoring and doubt clarification sessions'
    ],
    techLearning: {
      aiModel: 'Krishna Chaitanya Junior College introduces Nellore’s first AI-integrated academic model designed to track student performance, identify weak areas, and provide data-driven insights that help students improve their ranks in competitive examinations.',
      tablet: 'Every Elite Program student receives a locked personal learning tablet equipped with the Krishna Chaitanya academic portal for smart learning, assessments, and performance monitoring.',
      examsOnTablet: 'All competitive exam practice tests are conducted through the digital portal on the tablet, allowing students to practice real exam-style objective tests similar to IIT-JEE examination patterns.',
      analysis360: 'After every test, students receive detailed performance analysis including missed scoring opportunities, subject-wise weak areas, chapter-wise insights, difficulty-level analysis, and time-management evaluation.',
      digitalBoard: 'All classrooms are equipped with modern digital boards enabling visual and concept-driven teaching that improves understanding of complex topics.',
      videoLectures: 'Every class is digitally recorded so students can revisit lectures anytime for revision, concept clarity, and stronger exam preparation.'
    },
    advantages: [
      'Exclusive JEE-focused study materials designed by subject experts',
      'Extensive practice through 60,000+ curated questions aligned with JEE exam patterns',
      'Personalized assignments to strengthen weak areas',
      'Regular grand tests and academic performance reviews',
      'Parent access to student progress and analytics through the academic portal'
    ],
    outcome: 'With the Elite Program, students don’t just prepare for exams—they analyze, improve, and achieve their dream ranks in IIT-JEE and other prestigious engineering entrance examinations.'
  },

  'mpc-merit': {
    id: 'mpc-merit',
    stream: 'MPC',
    code: 'MPC Merit',
    name: 'MPC Merit Program (JEE Main Rankers)',
    badge: 'Mains Focused',
    tagline: 'Focused JEE Main & Board Performance Coaching',
    overview: [
      'The MPC Merit Program at Krishna Chaitanya Junior College is designed for students aiming to achieve strong ranks in JEE Main while securing excellent results in the Intermediate Public Examinations (IPE). The program builds a solid conceptual foundation in Mathematics, Physics, and Chemistry while developing the analytical and problem-solving skills required for national-level engineering entrance examinations.',
      'Through a structured academic approach, the program integrates Intermediate board preparation with focused objective training for JEE Main, helping students strengthen their fundamentals and perform confidently in competitive examinations. With experienced faculty guidance, disciplined academic planning, and continuous performance monitoring, students receive the right support to pursue engineering opportunities in reputed institutions.'
    ],
    structure: [
      'Integrated preparation for Intermediate Board + JEE Main',
      'Strong conceptual foundation in Mathematics, Physics, and Chemistry',
      'Daily practice sessions and problem-solving exercises',
      'Weekly grand tests and performance evaluations',
      'Chapter-wise and full-length exam simulations',
      'Continuous mentoring and doubt clarification sessions'
    ],
    features: [
      'Concept-driven classroom teaching',
      'Strong focus on Intermediate Public Examination performance',
      'JEE Main–oriented objective practice',
      'Regular academic assessments and performance tracking',
      'Personalized assignments to strengthen weak areas',
      'Continuous faculty guidance and academic mentoring'
    ],
    outcome: 'The MPC Merit Program helps students achieve excellent Intermediate results while securing competitive ranks in JEE Main, opening pathways to leading engineering institutions.'
  },

  'mpc-star': {
    id: 'mpc-star',
    stream: 'MPC',
    code: 'MPC Star',
    name: 'MPC Star Program (Special EAPCET Rankers)',
    badge: 'Special Eapcet',
    tagline: 'Targeted AP EAPCET Rank Booster & Board Mastery',
    overview: [
      'The MPC Star Program at Krishna Chaitanya Junior College is designed for students aiming to achieve top ranks in AP EAPCET while maintaining strong academic performance in the Intermediate Public Examinations (IPE). The program focuses on strengthening conceptual understanding in Mathematics, Physics, and Chemistry while developing the problem-solving skills required for engineering entrance examinations.',
      'By integrating board exam preparation with EAPCET-focused objective training, the program helps students build a strong academic foundation and confidently compete for admission into top engineering colleges.'
    ],
    structure: [
      'Integrated preparation for Intermediate Board + EAPCET',
      'Concept-based classroom teaching',
      'Daily objective practice sessions',
      'Weekly grand tests and academic assessments',
      'Chapter-wise and full-length exam simulations',
      'Continuous mentoring and doubt clarification sessions'
    ],
    features: [
      'Strong foundation for Intermediate Public Examinations',
      'EAPCET-focused objective preparation',
      'Concept-oriented teaching methodology',
      'Regular practice tests and performance reviews',
      'Personalized assignments for concept strengthening',
      'Continuous faculty mentoring and academic support'
    ],
    outcome: 'The MPC Star Program enables students to perform strongly in Intermediate examinations while achieving competitive ranks in AP EAPCET, helping them secure admissions in reputed engineering colleges.'
  },

  'mpc-spark': {
    id: 'mpc-spark',
    stream: 'MPC',
    code: 'MPC Spark',
    name: 'MPC Spark Program (IPE + EAPCET Rankers)',
    badge: 'Eapcet + IPE',
    tagline: 'Balanced Board Excellence & EAPCET Preparation',
    overview: [
      'The MPC Spark Program at Krishna Chaitanya Junior College is designed for students who aim to achieve excellent scores in the Intermediate Public Examinations (IPE) while preparing for AP EAPCET engineering entrance examinations. The program emphasizes strong academic fundamentals in Mathematics, Physics, and Chemistry while introducing students to objective exam preparation.',
      'With a balanced focus on board syllabus completion and competitive exam practice, the program ensures that students develop conceptual clarity, strong academic discipline, and the confidence needed for both board exams and engineering entrance opportunities.'
    ],
    structure: [
      'Strong foundation for Intermediate Board examinations',
      'Integrated preparation for EAPCET objective exams',
      'Concept-based classroom teaching',
      'Regular practice sessions and academic assessments',
      'Chapter-wise and full-length test simulations',
      'Continuous mentoring and academic support'
    ],
    features: [
      'Strong focus on Intermediate Public Examination success',
      'EAPCET-oriented objective practice',
      'Concept-driven teaching approach',
      'Regular academic monitoring and performance evaluation',
      'Personalized assignments to strengthen fundamentals',
      'Continuous faculty support and mentoring'
    ],
    outcome: 'The MPC Spark Program helps students build a strong academic base, achieve excellent results in Intermediate examinations, and prepare confidently for EAPCET engineering entrance opportunities.'
  },

  'bipc-elite': {
    id: 'bipc-elite',
    stream: 'BiPC',
    code: 'BiPC Elite',
    name: 'BiPC Elite Program (NEET Rankers)',
    badge: 'NEET Rankers Batch',
    tagline: 'Premier Medical Coaching & NCERT Deep Dive for Top Medical Ranks',
    overview: [
      'The BiPC Elite Program at Krishna Chaitanya Junior College is designed for highly motivated students aspiring to secure top ranks in NEET and pursue careers in medicine and life sciences while achieving outstanding results in the Intermediate Public Examinations (IPE). The program focuses on building strong conceptual foundations in Biology, Physics, and Chemistry, enabling students to develop the analytical thinking and problem-solving skills required for national-level medical entrance examinations.',
      'With a carefully structured academic framework, the program integrates Intermediate Board preparation with advanced NEET coaching, ensuring students receive the right balance of academic excellence and competitive exam readiness. Through expert faculty guidance, continuous assessments, and disciplined academic training, students are equipped to achieve their dream of entering India’s premier medical institutions.'
    ],
    structure: [
      'Integrated preparation for Intermediate Board + NEET',
      'Advanced concept-based teaching methodology',
      'Daily problem-solving and concept reinforcement sessions',
      'Weekly grand tests and performance evaluations',
      'Chapter-wise and full-length exam simulations',
      'Continuous mentoring and doubt clarification sessions'
    ],
    techLearning: {
      aiModel: 'Krishna Chaitanya Junior College introduces Nellore’s first AI-integrated academic model designed to track student performance, identify weak areas, and provide data-driven insights that help students improve their ranks in competitive examinations.',
      tablet: 'Every Elite Program student receives a locked personal learning tablet equipped with the Krishna Chaitanya academic portal for smart learning, assessments, and performance monitoring.',
      examsOnTablet: 'All competitive exam practice tests are conducted through the digital portal on the tablet, allowing students to practice real exam-style objective tests similar to NEET examination patterns.',
      analysis360: 'After every test, students receive detailed performance analysis including missed scoring opportunities, subject-wise weak areas, chapter-wise insights, difficulty-level analysis, and time-management evaluation.',
      digitalBoard: 'All classrooms are equipped with modern digital boards enabling visual and concept-driven teaching that improves understanding of complex topics.',
      videoLectures: 'Every class is digitally recorded so students can revisit lectures anytime for revision, concept clarity, and stronger exam preparation.'
    },
    advantages: [
      'Exclusive NEET-focused study materials designed by subject experts',
      'Extensive practice through 60,000+ curated questions aligned with NEET exam patterns',
      'Personalized assignments to strengthen weak areas',
      'Regular grand tests and academic performance reviews',
      'Parent access to student progress and analytics through the academic portal'
    ],
    outcome: 'With the Elite Program, students don’t just prepare for exams—they analyze, improve, and achieve their dream ranks in NEET and other prestigious medical entrance examinations.'
  },

  'bipc-spark': {
    id: 'bipc-spark',
    stream: 'BiPC',
    code: 'BiPC Spark',
    name: 'BiPC Spark Program (Special EAPCET Rankers)',
    badge: 'Special Eapcet',
    tagline: 'Targeted Medical & Life Sciences EAPCET Preparation',
    overview: [
      'The BiPC Star Program at Krishna Chaitanya Junior College is designed for students aiming to achieve strong ranks in AP EAPCET while securing excellent performance in the Intermediate Public Examinations (IPE). The program builds a strong conceptual foundation in Biology, Physics, and Chemistry while developing the analytical and problem-solving skills required for medical and life science entrance examinations.',
      'With a structured academic approach, the program integrates Intermediate board preparation with EAPCET-focused objective training, enabling students to strengthen their fundamentals and perform confidently in competitive examinations. Through expert faculty guidance, regular assessments, and disciplined academic planning, students receive the support needed to pursue careers in medicine, pharmacy, biotechnology, and allied health sciences.'
    ],
    structure: [
      'Integrated preparation for Intermediate Board + EAPCET',
      'Concept-based teaching in Biology, Physics, and Chemistry',
      'Daily practice sessions and objective problem-solving',
      'Weekly grand tests and academic assessments',
      'Chapter-wise and full-length exam simulations',
      'Continuous mentoring and doubt clarification sessions'
    ],
    features: [
      'Strong focus on Intermediate Public Examination performance',
      'EAPCET-oriented objective preparation',
      'Concept-driven teaching methodology',
      'Regular practice tests and performance tracking',
      'Personalized assignments to strengthen weak areas',
      'Continuous faculty mentoring and academic support'
    ],
    outcome: 'The BiPC Star Program enables students to achieve excellent results in Intermediate examinations while securing competitive ranks in AP EAPCET, opening opportunities for admission into reputed medical, pharmacy, and life science institutions.'
  },

  'bipc-longterm': {
    id: 'bipc-longterm',
    stream: 'BiPC',
    code: 'BiPC LongTerm',
    name: 'BiPC Long Term Elite Program (NEET Rankers)',
    badge: 'LongTerm Repeater Batch',
    tagline: 'Intensive Re-Attempt NEET Mastery & Rank Maximization',
    overview: [
      'The BiPC Long Term Elite Program at Krishna Chaitanya Junior College is specially designed for dedicated students who are reappearing for NEET and are determined to secure top ranks in national-level medical entrance examinations. This intensive long-term program provides a focused academic environment that strengthens conceptual understanding in Biology, Physics, and Chemistry while helping students overcome previous learning gaps.',
      'The program offers comprehensive NEET-oriented preparation combined with disciplined academic training, allowing students to revise the complete syllabus with deeper clarity and improved problem-solving ability. Through expert faculty guidance, structured practice sessions, and continuous performance monitoring, students receive the support needed to significantly improve their NEET performance and achieve admission into leading medical institutions.'
    ],
    structure: [
      'Intensive preparation for NEET with complete syllabus revision',
      'Advanced concept-based teaching methodology',
      'Daily practice sessions and problem-solving modules',
      'Weekly grand tests and detailed performance evaluations',
      'Chapter-wise and full-length NEET exam simulations',
      'Continuous mentoring and doubt clarification sessions'
    ],
    techLearning: {
      aiModel: 'Krishna Chaitanya Junior College introduces Nellore’s first AI-integrated academic model designed to track student performance, identify weak areas, and provide data-driven insights that help students improve their ranks in competitive examinations.',
      tablet: 'Every Elite Program student receives a locked personal learning tablet equipped with the Krishna Chaitanya academic portal for smart learning, assessments, and performance monitoring.',
      examsOnTablet: 'All competitive exam practice tests are conducted through the digital portal on the tablet, allowing students to practice real exam-style objective tests similar to NEET examination patterns.',
      analysis360: 'After every test, students receive detailed performance analysis including missed scoring opportunities, subject-wise weak areas, chapter-wise insights, difficulty-level analysis, and time-management evaluation.',
      digitalBoard: 'All classrooms are equipped with modern digital boards enabling visual and concept-driven teaching that improves understanding of complex topics.',
      videoLectures: 'Every class is digitally recorded so students can revisit lectures anytime for revision, concept clarity, and stronger exam preparation.'
    },
    advantages: [
      'Exclusive NEET-focused study materials designed by subject experts',
      'Extensive practice through 60,000+ curated questions aligned with NEET exam patterns',
      'Personalized assignments to strengthen weak areas',
      'Regular grand tests and academic performance reviews',
      'Parent access to student progress and analytics through the academic portal'
    ],
    outcome: 'With the BiPC Long Term Elite Program, students gain the time, guidance, and academic strength required to overcome previous setbacks and achieve their dream rank in NEET, opening doors to India’s top medical institutions.'
  },

  'mec-program': {
    id: 'mec-program',
    stream: 'MEC',
    code: 'MEC',
    name: 'MEC Program (Mathematics, Economics, Commerce)',
    badge: 'Commerce & CA Foundation',
    tagline: 'Financial Acumen, Higher Mathematics & Management Foundation',
    overview: [
      'The MEC Program at Krishna Chaitanya Junior College is designed for students who aspire to build successful careers in commerce, business management, finance, and entrepreneurship. The program provides a strong academic foundation in Mathematics, Economics, and Commerce while preparing students for higher education in fields such as B.Com, BBA, CA, CMA, and other professional courses.',
      'With concept-driven teaching, structured academic planning, and regular assessments, the program ensures students develop analytical thinking, numerical skills, and a clear understanding of business and economic principles required for future academic and professional success.'
    ],
    structure: [
      'Comprehensive preparation for Intermediate Public Examinations (IPE)',
      'Concept-based teaching in Mathematics, Economics, and Commerce',
      'Regular academic assessments and practice tests',
      'Structured syllabus completion with revision sessions',
      'Continuous mentoring and academic support'
    ],
    features: [
      'Strong academic foundation in commerce and business studies',
      'Concept-oriented teaching methodology',
      'Regular performance evaluation and academic monitoring',
      'Personalized attention and doubt clarification sessions',
      'Career guidance for professional courses and higher education'
    ],
    outcome: 'The MEC Program helps students achieve excellent results in Intermediate examinations while preparing them for higher education in commerce, business administration, finance, and professional career paths such as CA, CMA, and management studies.'
  },

  'cec-program': {
    id: 'cec-program',
    stream: 'CEC',
    code: 'CEC',
    name: 'CEC Program (Civics, Economics, Commerce)',
    badge: 'Law & Civil Services',
    tagline: 'Humanities, Public Policy & Leadership Foundation',
    overview: [
      'The CEC Program at Krishna Chaitanya Junior College is designed for students interested in careers in business, management, public administration, law, and civil services. The program provides a strong academic foundation in Civics, Economics, and Commerce while helping students develop analytical thinking, communication skills, and an understanding of economic and social systems.',
      'Through structured academic guidance, concept-driven teaching, and continuous assessments, the program prepares students to excel in Intermediate examinations and pursue higher education in fields such as commerce, law, management, and social sciences.'
    ],
    structure: [
      'Comprehensive preparation for Intermediate Public Examinations (IPE)',
      'Concept-based teaching in Civics, Economics, and Commerce',
      'Regular academic assessments and practice tests',
      'Structured syllabus completion with revision sessions',
      'Continuous mentoring and academic support'
    ],
    features: [
      'Strong focus on academic excellence in social sciences and commerce',
      'Concept-driven classroom teaching',
      'Regular performance monitoring and academic evaluations',
      'Personalized mentoring and doubt clarification',
      'Career guidance for higher education and professional opportunities'
    ],
    outcome: 'The CEC Program enables students to achieve excellent results in Intermediate examinations while preparing them for higher education in commerce, law, management, public administration, and civil services.'
  }
};

export const COURSE_CATEGORIES = [
  {
    code: 'MPC',
    name: 'Mathematics, Physics, Chemistry',
    tagline: 'Engineering & Technology Stream',
    tracks: [
      { id: 'mpc-elite', label: 'Elite (IIT Rankers)', tag: 'JEE Advanced' },
      { id: 'mpc-merit', label: 'Merit (Mains)', tag: 'JEE Main' },
      { id: 'mpc-star', label: 'Star (Special Eapcet)', tag: 'AP EAPCET Top Ranks' },
      { id: 'mpc-spark', label: 'Spark (Eapcet)', tag: 'IPE + Eapcet' }
    ]
  },
  {
    code: 'BiPC',
    name: 'Biology, Physics, Chemistry',
    tagline: 'Medical & Life Sciences Stream',
    tracks: [
      { id: 'bipc-elite', label: 'Elite (NEET Rankers)', tag: 'NEET Medical' },
      { id: 'bipc-spark', label: 'Spark (Eapcet)', tag: 'EAPCET Agri & Med' },
      { id: 'bipc-longterm', label: 'LongTerm (NEET Repeater)', tag: 'NEET Long Term' }
    ]
  },
  {
    code: 'MEC',
    name: 'Mathematics, Economics, Commerce',
    tagline: 'Commerce, CA/CMA & Management Stream',
    tracks: [
      { id: 'mec-program', label: 'MEC & CA / CMA Foundation', tag: 'CA / CMA / IPMAT / BBA' }
    ]
  },
  {
    code: 'CEC',
    name: 'Civics, Economics, Commerce',
    tagline: 'Humanities, CA/CMA & Law Stream',
    tracks: [
      { id: 'cec-program', label: 'CEC & CA / CMA / Law / IAS Integrated', tag: 'CA / CMA / CLAT / Civils' }
    ]
  },
  {
    code: 'Long Term',
    name: 'Long Term Intensive Repeater Program',
    tagline: '1-Year Dedicated Batch for NEET, JEE & CA/CMA',
    tracks: [
      { id: 'bipc-longterm', label: 'NEET Medical Long Term', tag: 'NEET Repeater' },
      { id: 'mpc-longterm', label: 'IIT-JEE Long Term', tag: 'JEE Main & Adv' },
      { id: 'cma-longterm', label: 'CA / CMA Foundation Long Term', tag: 'CA & CMA Repeater' }
    ]
  }
];
