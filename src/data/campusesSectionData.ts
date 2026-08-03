import { CAMPUSES } from './collegeData';

export const CAMPUSES_SECTION = {
  eyebrow: 'Our Campus Network',
  title: "Choose the Campus That's Closest to You",
  subheading:
    'Krishna Chaitanya offers separate campuses for Boys, Girls, and Co-Education, along with dedicated residential hostels—bringing quality education closer to every student.',
  categories: [
    {
      id: 'day',
      category: 'Day' as const,
      label: 'Day Campuses',
      count: CAMPUSES.filter((c) => c.category === 'Day').length,
      description: 'Day campuses for boys, girls, and co-education across Nellore.',
      icon: 'Building2',
    },
    {
      id: 'residential',
      category: 'Residential' as const,
      label: 'Residential Campuses',
      count: CAMPUSES.filter((c) => c.category === 'Residential').length,
      description: 'Dedicated residential hostels with disciplined, secure campus life.',
      icon: 'Home',
    },
  ],
} as const;

export type CampusBrowseCategory = (typeof CAMPUSES_SECTION.categories)[number]['category'];
