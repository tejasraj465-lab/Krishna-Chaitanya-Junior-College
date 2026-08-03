import {
  CAMPUSES,
  COLLEGE_INFO,
  COURSES,
  FACILITIES,
  HERO_SLIDES,
  WHY_CHOOSE_US,
} from './collegeData';

export type WhyChooseCategoryId = 'academics' | 'campuses' | 'facilities' | 'student-life';

export interface WhyChooseHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  subtitle?: string;
  source: string;
}

export interface WhyChooseHomeFeatureCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export const WHY_CHOOSE_HOME_EYEBROW = 'WHY CHOOSE KRISHNA CHAITANYA';

export const WHY_CHOOSE_HOME_TITLE = 'Why Thousands of Parents Choose KCJC';

export const WHY_CHOOSE_HOME_INTRO =
  'For over 28 years, Krishna Chaitanya Junior College has earned the trust of students and parents through academic excellence, experienced faculty, integrated competitive coaching, and a disciplined learning environment. Every student is guided with personalized mentoring, continuous academic support, and the right opportunities to achieve success in Board examinations, competitive exams, and future careers.';

export const WHY_CHOOSE_HOME_FEATURE_CARDS: WhyChooseHomeFeatureCard[] = [
  {
    id: 'academic-excellence',
    title: '🎓 Academic Excellence',
    subtitle: '28+ Years of Building Strong Academic Foundations',
    description:
      'Experienced faculty, concept-based teaching, disciplined academics, and consistent student success have made KCJC a trusted name in quality education.',
  },
  {
    id: 'integrated-coaching',
    title: '🎯 Integrated Competitive Coaching',
    subtitle: 'One Curriculum. Multiple Career Opportunities.',
    description:
      'Intermediate education integrated with coaching for IIT-JEE, NEET, EAPCET, CA Foundation, CMA Foundation, and Long-Term programmes under one structured academic system.',
  },
  {
    id: 'personalized-mentoring',
    title: '👨‍🏫 Personalized Mentoring',
    subtitle: 'Every Student Receives Individual Attention',
    description:
      'Regular performance tracking, doubt clarification, parent interaction, academic counselling, and continuous mentoring ensure every student reaches their full potential.',
  },
  {
    id: 'modern-learning',
    title: '🏫 Modern Learning Environment',
    subtitle: 'Designed for Better Learning',
    description:
      'Smart digital classrooms, advanced laboratories, library, technology-enabled learning resources, transportation, and separate hostel facilities provide an ideal environment for academic growth.',
  },
  {
    id: 'safe-campus',
    title: '🛡 Safe & Disciplined Campus',
    subtitle: 'A Secure Environment That Supports Learning',
    description:
      'A disciplined academic atmosphere, student-friendly campus, dedicated faculty supervision, and a culture that encourages focus, responsibility, and personal growth.',
  },
  {
    id: 'holistic-development',
    title: '🌟 Holistic Student Development',
    subtitle: 'Preparing Students for Success Beyond Academics',
    description:
      'Leadership development, NCC, communication skills, personality development, cultural activities, sports, teamwork, and community engagement help students grow into confident individuals.',
  },
];

export const WHY_CHOOSE_HOME_TRUST_STATEMENT =
  "At Krishna Chaitanya, we don't just prepare students for examinations—we prepare them for higher education, meaningful careers, and lifelong success.";

export const WHY_CHOOSE_HOME_CTA_SUBTEXT =
  'Explore our academic philosophy, teaching methodology, facilities, student support system, and discover what makes Krishna Chaitanya one of the trusted choices for Intermediate education in Nellore.';

export interface VerifiedWhyChooseItem extends WhyChooseHighlight {
  category: WhyChooseCategoryId;
}


export const WHY_CHOOSE_PAGE_INTRO =
  'The information below is taken only from programme, campus, facility, and contact records currently published on this website. Items appear here only when the underlying source data is complete.';

const isNonEmpty = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const hasCompleteCourses = () =>
  COURSES.length > 0 &&
  COURSES.every(
    (course) =>
      isNonEmpty(course.code) &&
      isNonEmpty(course.title) &&
      isNonEmpty(course.duration) &&
      Array.isArray(course.integratedCoaching) &&
      course.integratedCoaching.length > 0 &&
      course.integratedCoaching.every(isNonEmpty)
  );

const hasCompleteCampuses = () =>
  CAMPUSES.length > 0 &&
  CAMPUSES.every(
    (campus) =>
      isNonEmpty(campus.name) &&
      isNonEmpty(campus.address) &&
      (campus.category === 'Day' || campus.category === 'Residential')
  );

const hasOfficialContact = () =>
  isNonEmpty(COLLEGE_INFO.phonePrimary) &&
  isNonEmpty(COLLEGE_INFO.email) &&
  isNonEmpty(COLLEGE_INFO.headquarters);

const getNccSlide = () =>
  HERO_SLIDES.find((slide) => slide.badge?.includes('NCC') || slide.title.includes('NCC'));

const getKceiSourceItem = () => WHY_CHOOSE_US.find((item) => item.id === 11);

/** Build homepage highlights — each item is included only when its source data is complete */
export const buildWhyChooseHomeHighlights = (): WhyChooseHighlight[] => {
  const highlights: WhyChooseHighlight[] = [];

  if (hasCompleteCourses()) {
    const streamCodes = COURSES.filter((c) => c.code !== 'Long Term').map((c) => c.code);
    const hasLongTerm = COURSES.some((c) => c.code === 'Long Term');

    highlights.push({
      id: 'integrated-programmes',
      title: 'Integrated Intermediate Programmes',
      description: `Offers Intermediate streams including ${streamCodes.join(', ')}${hasLongTerm ? ', and Long Term coaching' : ''}, as listed under Courses on this website.`,
      icon: 'Layers',
      badge: 'Programmes',
      source: 'COURSES',
    });
  }

  if (hasCompleteCampuses()) {
    const dayCount = CAMPUSES.filter((c) => c.category === 'Day').length;
    const residentialCount = CAMPUSES.filter((c) => c.category === 'Residential').length;

    highlights.push({
      id: 'nellore-campuses',
      title: 'Campuses in Nellore',
      description: `${CAMPUSES.length} campuses are listed on this website (${dayCount} day, ${residentialCount} residential), including separate boys and girls campuses.`,
      icon: 'Building2',
      badge: 'Campuses',
      source: 'CAMPUSES',
    });
  }

  const nccSlide = getNccSlide();
  if (nccSlide && isNonEmpty(nccSlide.title)) {
    highlights.push({
      id: 'ncc-wing',
      title: nccSlide.title,
      description: isNonEmpty(nccSlide.subtitle)
        ? nccSlide.subtitle
        : 'Listed on this website as part of student development activities.',
      icon: 'ShieldCheck',
      badge: 'NCC',
      source: 'HERO_SLIDES',
    });
  }

  if (hasOfficialContact()) {
    highlights.push({
      id: 'admissions-support',
      title: 'Admissions Enquiries',
      description: `Contact ${COLLEGE_INFO.phonePrimary} or ${COLLEGE_INFO.email}. Headquarters: ${COLLEGE_INFO.headquarters}.`,
      icon: 'Phone',
      badge: 'Admissions',
      source: 'COLLEGE_INFO',
    });
  }

  return highlights;
};

/** Build full-page verified items — omitted automatically when source data is incomplete */
export const buildWhyChooseVerifiedItems = (): VerifiedWhyChooseItem[] => {
  const items: VerifiedWhyChooseItem[] = [];

  if (hasCompleteCourses()) {
    items.push({
      id: 'streams-offered',
      category: 'academics',
      title: 'Intermediate Streams Offered',
      description: COURSES.map((c) => `${c.code}: ${c.title} (${c.duration})`).join('\n'),
      icon: 'Layers',
      badge: 'Streams',
      source: 'COURSES',
    });

    items.push({
      id: 'integrated-coaching',
      category: 'academics',
      title: 'Integrated Coaching by Stream',
      description: COURSES.map(
        (c) => `${c.code} — ${c.integratedCoaching.join(', ')}`
      ).join('\n'),
      icon: 'Target',
      badge: 'Coaching',
      source: 'COURSES.integratedCoaching',
    });
  }

  const kceiItem = getKceiSourceItem();
  if (kceiItem && isNonEmpty(kceiItem.title) && isNonEmpty(kceiItem.description)) {
    items.push({
      id: 'kcei-app',
      category: 'campuses',
      title: kceiItem.title,
      description: kceiItem.description,
      icon: 'Smartphone',
      badge: kceiItem.badge ?? 'App',
      source: 'WHY_CHOOSE_US.id11',
    });
  }

  if (hasCompleteCampuses()) {
    CAMPUSES.forEach((campus) => {
      items.push({
        id: `campus-${campus.id}`,
        category: 'campuses',
        title: campus.name,
        description: [
          `Address: ${campus.address}`,
          `Type: ${campus.type}`,
          `Category: ${campus.category}`,
          isNonEmpty(campus.phone) ? `Phone: ${campus.phone}` : null,
          isNonEmpty(campus.email) ? `Email: ${campus.email}` : null,
        ]
          .filter(Boolean)
          .join('\n'),
        icon: 'MapPin',
        badge: campus.category,
        source: `CAMPUSES.${campus.id}`,
      });
    });

    const dayCount = CAMPUSES.filter((c) => c.category === 'Day').length;
    const residentialCount = CAMPUSES.filter((c) => c.category === 'Residential').length;

    items.push({
      id: 'campus-types',
      category: 'campuses',
      title: 'Day & Residential Campuses',
      description: `Day campuses listed: ${dayCount}. Residential campuses listed: ${residentialCount}.`,
      icon: 'Building2',
      badge: 'Summary',
      source: 'CAMPUSES.category',
    });
  }

  if (hasOfficialContact()) {
    items.push({
      id: 'official-contact',
      category: 'campuses',
      title: 'Official Contact Details',
      description: `Phone: ${COLLEGE_INFO.phonePrimary}\nEmail: ${COLLEGE_INFO.email}\nLocation: ${COLLEGE_INFO.headquarters}`,
      icon: 'Phone',
      badge: 'Contact',
      source: 'COLLEGE_INFO',
    });
  }

  if (FACILITIES.length > 0 && FACILITIES.every((f) => isNonEmpty(f.title))) {
    items.push({
      id: 'listed-facilities',
      category: 'facilities',
      title: 'Facilities Listed on Website',
      description: FACILITIES.map((f) => f.title).join('\n'),
      icon: 'FlaskConical',
      badge: 'Facilities',
      source: 'FACILITIES',
    });
  }

  const campusFacilityTags = [...new Set(CAMPUSES.flatMap((c) => c.facilities).filter(isNonEmpty))];
  if (campusFacilityTags.length > 0) {
    items.push({
      id: 'campus-facility-tags',
      category: 'facilities',
      title: 'Campus-Level Facility Mentions',
      description: campusFacilityTags.join('\n'),
      icon: 'Bus',
      badge: 'Campus Facilities',
      source: 'CAMPUSES.facilities',
    });
  }

  const nccSlide = getNccSlide();
  if (nccSlide && isNonEmpty(nccSlide.title)) {
    items.push({
      id: 'ncc-battalion',
      category: 'student-life',
      title: nccSlide.title,
      description: [nccSlide.subtitle, 'NSS activities are also referenced elsewhere on this website.']
        .filter(isNonEmpty)
        .join('\n'),
      icon: 'ShieldCheck',
      badge: 'NCC',
      source: 'HERO_SLIDES',
    });
  }

  return items;
};

/** Pre-built lists used by the UI (recomputed from source data) */
/** @deprecated Home section now uses WHY_CHOOSE_HOME_FEATURE_CARDS */
export const WHY_CHOOSE_HOME_HIGHLIGHTS = buildWhyChooseHomeHighlights();
export const WHY_CHOOSE_VERIFIED_ITEMS = buildWhyChooseVerifiedItems();

export const WHY_CHOOSE_CATEGORIES: {
  id: WhyChooseCategoryId;
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
}[] = [
  {
    id: 'academics',
    label: 'Academics & Programmes',
    shortLabel: 'Academics',
    icon: 'GraduationCap',
    description: 'Intermediate streams and integrated coaching from published course records.',
  },
  {
    id: 'campuses',
    label: 'Campuses & Contact',
    shortLabel: 'Campuses',
    icon: 'Building2',
    description: 'Campus directory and official contact details from published records.',
  },
  {
    id: 'facilities',
    label: 'Facilities & Infrastructure',
    shortLabel: 'Facilities',
    icon: 'MonitorPlay',
    description: 'Facilities listed in the published facilities section.',
  },
  {
    id: 'student-life',
    label: 'Student Life & Services',
    shortLabel: 'Student Life',
    icon: 'Compass',
    description: 'Student activities referenced in published website content.',
  },
];

export const getVerifiedItemsByCategory = (categoryId: WhyChooseCategoryId) =>
  WHY_CHOOSE_VERIFIED_ITEMS.filter((item) => item.category === categoryId);

/** Summary for debugging / admin review */
export const WHY_CHOOSE_DATA_STATUS = {
  coursesComplete: hasCompleteCourses(),
  campusesComplete: hasCompleteCampuses(),
  contactComplete: hasOfficialContact(),
  facilitiesCount: FACILITIES.length,
  homeHighlightsCount: WHY_CHOOSE_HOME_FEATURE_CARDS.length,
  verifiedItemsCount: WHY_CHOOSE_VERIFIED_ITEMS.length,
  pendingTopics: [
    'Rankings & national achievements',
    'Faculty strength and qualifications',
    'Board pass percentages',
    'Placement / higher-education outcomes',
    'Awards and recognitions',
  ],
};
