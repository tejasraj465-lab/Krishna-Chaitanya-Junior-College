export interface Course {
  id: string;
  code: string; // e.g. "MPC"
  title: string; // "Maths, Physics, Chemistry"
  subtitle: string;
  tag: string;
  integratedCoaching: string[];
  subjects: string[];
  careerOptions: string[];
  duration: string;
  seats: number;
  featured: boolean;
  color: string;
  iconName: string;
  description: string;
  eligibility: string;
}

export interface Campus {
  id: string;
  name: string;
  type: string;
  category?: 'Day' | 'Residential';
  city: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  googleMapUrl: string;
  facilities: string[];
  stats: {
    students: string;
    faculty: string;
    labs: number;
  };
}

export interface Ranker {
  id: string;
  name: string;
  exam: 'IIT-JEE' | 'NEET' | 'EAMCET' | 'BOARD';
  rank: string;
  score: string;
  year: string;
  photo: string;
  course: string;
  campus: string;
  quote: string;
}

export interface Facility {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  image: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Labs' | 'Sports' | 'Events' | 'NCC' | 'NSS' | 'Annual Day' | 'Achievements';
  image: string;
  caption: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Parent' | 'Alumni' | 'Current Student';
  course: string;
  year: string;
  photo: string;
  quote: string;
  collegeOrCompany?: string;
  videoUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  navTarget?: string;
}

export interface AdmissionFormData {
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  course: string;
  campus: string;
  state: string;
  hostelRequired: 'Yes' | 'No';
  board10thPercentage: string;
}
