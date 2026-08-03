export interface CourseStreamDetail {
  code: string;
  title: string;
  bestForLabel: string;
  bestFor: string;
  careerPathways: string[];
  whyChoose: string[];
  subjects: string[];
  eligibility: string;
  availablePrograms?: string[];
}

export const COURSE_STREAM_DETAILS: Record<string, CourseStreamDetail> = {
  MPC: {
    code: 'MPC',
    title: 'MPC (Mathematics, Physics & Chemistry)',
    bestForLabel: 'Best For',
    bestFor:
      'Students who aspire to build successful careers in Engineering, Technology, Research, Defence, Aviation, Architecture, Artificial Intelligence, Data Science, Robotics, and other technical fields.',
    careerPathways: [
      'IIT (Indian Institutes of Technology)',
      'NIT (National Institutes of Technology)',
      'IIIT',
      'BITS Pilani',
      'VIT, SRM, Amrita & other top private universities',
      'EAPCET Engineering',
      'B.Tech / B.E.',
      'Architecture (B.Arch / NATA)',
      'Defence (NDA, Technical Entry Scheme)',
      'Merchant Navy',
      'Commercial Pilot Training',
      'B.Sc. Mathematics / Physics / Chemistry',
      'Data Science & Artificial Intelligence',
      'Robotics & Automation',
      'Computer Science',
      'Electronics & Electrical Engineering',
      'Mechanical & Civil Engineering',
      'Research & Innovation',
    ],
    whyChoose: [
      'Integrated Board + IIT-JEE/EAPCET Coaching',
      'Experienced IIT-JEE Faculty',
      'Daily Practice Problems & Assignments',
      'Weekly & Grand Mock Tests',
      'AI-Based Performance Tracking',
      'Individual Doubt Clarification',
      'Digital Smart Classrooms',
      'Comprehensive Printed & Digital Study Material',
      'Career Guidance & Parent Review Meetings',
    ],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Sanskrit'],
    eligibility:
      'Students who have passed or appeared for SSC, CBSE, ICSE, or any recognized 10th Board Examination.',
  },

  BiPC: {
    code: 'BiPC',
    title: 'BiPC (Biology, Physics & Chemistry)',
    bestForLabel: 'Best For',
    bestFor:
      'Students passionate about Medicine, Healthcare, Pharmacy, Biotechnology, Agriculture, Veterinary Sciences, and Life Sciences.',
    careerPathways: [
      'MBBS',
      'BDS',
      'BAMS',
      'BHMS',
      'BPT',
      'B.Sc. Nursing',
      'B.Pharmacy',
      'Pharm.D',
      'Veterinary Science (BVSc)',
      'Biotechnology',
      'Microbiology',
      'Genetics',
      'Agriculture (B.Sc. Agri)',
      'Food Technology',
      'Biomedical Sciences',
      'Medical Laboratory Technology',
      'Physiotherapy',
      'Occupational Therapy',
      'Radiology',
      'Public Health',
      'Clinical Research',
    ],
    whyChoose: [
      'Integrated NEET Coaching',
      'NCERT-Focused Teaching',
      'Experienced Medical Entrance Faculty',
      'Daily MCQ Practice',
      'Chapter-wise Tests',
      'Full-Length NEET Mock Exams',
      'Personal Mentoring',
      'Individual Performance Analysis',
      'Modern Biology & Chemistry Laboratories',
      'Parent Progress Reports',
    ],
    subjects: ['Botany', 'Zoology', 'Physics', 'Chemistry', 'English', 'Sanskrit'],
    eligibility:
      'Students who have passed or appeared for SSC, CBSE, ICSE, or any recognized 10th Board Examination.',
  },

  MEC: {
    code: 'MEC',
    title: 'MEC (Mathematics, Economics & Commerce)',
    bestForLabel: 'Best For',
    bestFor:
      'Students interested in Finance, Business, Accounting, Entrepreneurship, Banking, Management, and Professional Commerce Courses.',
    careerPathways: [
      'CA (Chartered Accountant)',
      'CMA',
      'CS',
      'ACCA',
      'CFA (Foundation Pathway)',
      'B.Com',
      'BBA',
      'BBM',
      'Economics',
      'Banking',
      'Investment Banking',
      'Financial Analyst',
      'Stock Market & Trading',
      'Entrepreneurship',
      'Business Management',
      'MBA',
      'Digital Business',
      'FinTech',
    ],
    whyChoose: [
      'Integrated CA/CMA Foundation Coaching',
      'Commerce Specialists',
      'Business Case Study Learning',
      'Practical Accounting Sessions',
      'Career-Oriented Curriculum',
      'Personal Mentoring',
      'Digital Learning Resources',
      'Performance Monitoring',
      'Career Planning Support',
    ],
    subjects: ['Mathematics', 'Economics', 'Commerce', 'English', 'Sanskrit'],
    eligibility:
      'Students who have passed or appeared for SSC, CBSE, ICSE, or any recognized 10th Board Examination.',
  },

  CEC: {
    code: 'CEC',
    title: 'CEC (Civics, Economics & Commerce)',
    bestForLabel: 'Best For',
    bestFor:
      'Students aspiring for Civil Services, Law, Public Administration, Journalism, Commerce, Banking, Management, and Government Careers.',
    careerPathways: [
      'UPSC Civil Services',
      'APPSC & State Public Service Exams',
      'Group I, II & III Services',
      'Law (LLB)',
      'CLAT',
      'Public Administration',
      'Journalism & Mass Communication',
      'Political Science',
      'International Relations',
      'B.Com',
      'BBA',
      'Banking',
      'Human Resources',
      'Hotel Management',
      'Social Work',
      'NGO & Development Sector',
    ],
    whyChoose: [
      'Strong Foundation in Humanities & Commerce',
      'Communication & Leadership Development',
      'Personality Development Sessions',
      'General Awareness & Current Affairs',
      'Career Guidance',
      'Experienced Faculty',
      'Regular Assessments',
      'Mentoring & Parent Interaction',
    ],
    subjects: ['Civics', 'Economics', 'Commerce', 'English', 'Sanskrit'],
    eligibility:
      'Students who have passed or appeared for SSC, CBSE, ICSE, or any recognized 10th Board Examination.',
  },

  'Long Term': {
    code: 'Long Term',
    title: 'Long Term Intensive Program',
    bestForLabel: 'Best For',
    bestFor:
      'Students who wish to dedicate one focused academic year to significantly improve their performance in competitive entrance examinations and secure admission into their dream college.',
    careerPathways: [],
    availablePrograms: ['IIT-JEE Long Term', 'NEET Long Term'],
    whyChoose: [
      'Intensive One-Year Academic Plan',
      'Complete Syllabus Revision',
      'Daily Practice Sessions',
      'Full-Length Mock Examinations',
      'Individual Error Analysis',
      'One-to-One Faculty Guidance',
      'Personalized Study Plans',
      'Performance Tracking & Improvement Reports',
      'Dedicated Doubt Resolution',
      'Exam Strategy & Time Management Sessions',
    ],
    subjects: [],
    eligibility:
      'Students who have completed Intermediate (10+2) or equivalent and wish to prepare for competitive entrance examinations.',
  },
};

export const getCourseStreamDetail = (code: string): CourseStreamDetail | undefined =>
  COURSE_STREAM_DETAILS[code];
