import { GALLERY_ITEMS } from './collegeData';

export const NCC_HOME = {
  title: 'NCC at Krishna Chaitanya',
  subheading: 'Only private Intermediate college in Nellore with an accredited NCC Unit.',
  description:
    'Build discipline, leadership, confidence, physical fitness, and prepare for Defence careers while pursuing your Intermediate education.',
  motto: 'एकता और अनुशासन',
  mottoEnglish: 'Unity and Discipline',
  highlightStats: [
    { id: 'battalion', value: '3 AP BN', label: 'Accredited Battalion Unit' },
    { id: 'exclusive', value: 'Only One', label: 'Private JC NCC in Nellore' },
    { id: 'camps', value: 'RDC · ATC', label: 'National Camp Pathways' },
  ],
  featureCards: [
    {
      id: 'leadership',
      emoji: '🪖',
      label: 'Leadership & Discipline',
      description: 'Parade drills, command structure, and character-building routines.',
    },
    {
      id: 'fitness',
      emoji: '🏃',
      label: 'Physical Fitness & Parade Training',
      description: 'Regular drill practice, yoga, and stamina-building activities.',
    },
    {
      id: 'camps',
      emoji: '🎯',
      label: 'Camps & Adventure Activities',
      description: 'ATC, trekking, national integration camps, and adventure exposure.',
    },
    {
      id: 'defence',
      emoji: '🛡️',
      label: 'Defence Career Awareness',
      description: 'Guidance for Armed Forces, Police, and uniformed service pathways.',
    },
  ],
  ctaLabel: 'Explore NCC at KCJC',
} as const;

export const NCC_EXPLORE = {
  eyebrow: 'NCC at Krishna Chaitanya',
  title: 'Building Leaders Beyond Classrooms',
  intro:
    'Krishna Chaitanya proudly offers an accredited NCC Unit, providing students with opportunities to develop discipline, leadership, patriotism, physical fitness, and confidence while balancing academic excellence.',

  whyJoinHeading: 'Why Join NCC at KCJC?',
  whyJoinItems: [
    'Leadership Development',
    'Discipline & Character Building',
    'Physical Fitness',
    'Teamwork & Communication Skills',
    'Adventure Activities & Camps',
    'Personality Development',
    'Confidence Building',
    'Social Responsibility',
  ],

  trainingHeading: 'NCC Training Includes',
  trainingItems: [
    'Drill & Parade Training',
    'Weapon Training (as per NCC curriculum)',
    'Map Reading & Field Craft',
    'Leadership Exercises',
    'Yoga & Physical Fitness',
    'Community Service Activities',
    'National Integration Programs',
    'Camps & Adventure Activities',
  ],

  opportunitiesHeading: 'Opportunities for Cadets',
  opportunitiesNote:
    'Cadets may participate in camps and activities based on eligibility, selection, and NCC guidelines.',
  opportunitiesItems: [
    'Annual Training Camps (ATC)',
    'Republic Day Camp (Selection Process)',
    'Thal Sainik Camp',
    'National Integration Camp',
    'Trekking & Adventure Camps',
    'Social Service Activities',
    'Leadership Appointments',
  ],

  benefitsHeading: 'Benefits of Joining NCC',
  benefitsItems: [
    'Develop leadership and self-confidence.',
    'Improve communication and teamwork.',
    'Build physical fitness and discipline.',
    'Gain exposure through camps and national-level activities.',
    'Valuable support for students aspiring to join the Armed Forces, Police, Paramilitary, Fire Services, and other uniformed services.',
    'NCC certificates may provide benefits in certain admissions and recruitment processes as per applicable government rules.',
  ],

  galleryHeading: 'Gallery',
  galleryNote: 'Only authentic NCC photographs from Krishna Chaitanya activities are displayed here.',
  galleryCategories: [
    'Parade',
    'Uniform',
    'Training',
    'Camps',
    'Group Photo',
    'Certificate Distribution',
    'Independence Day',
    'Republic Day',
    'Drill Practice',
  ] as const,

  achievementsHeading: 'Achievements',
  achievementsPlaceholder:
    'NCC achievement highlights and photographs will be published here once provided by management.',
} as const;

export type NccGalleryCategory = (typeof NCC_EXPLORE.galleryCategories)[number];

export interface NccGalleryPhoto {
  id: string;
  title: string;
  category: NccGalleryCategory;
  image: string;
  caption?: string;
}

const isRealPhotoUrl = (url: string) =>
  !url.includes('unsplash.com') && !url.includes('placeholder');

/** Real NCC gallery photos only — add entries when management provides images */
export const NCC_GALLERY_PHOTOS: NccGalleryPhoto[] = GALLERY_ITEMS.filter(
  (item) => item.category === 'NCC' && isRealPhotoUrl(item.image)
).map((item) => ({
  id: item.id,
  title: item.title,
  category: 'Parade' as NccGalleryCategory,
  image: item.image,
  caption: item.caption,
}));
