import { CAMPUSES } from './collegeData';

export const CAMPUSES_SECTION = {
  eyebrow: 'Our Campus Network',
  title: "Choose the Campus That's Closest to You",
  subheading:
    'Choose from our Day Scholar and Residential Campuses across Nellore. Separate campuses for Boys, Girls, and Co-Education provide a safe, disciplined, and focused learning environment.',
  categories: [
    {
      id: 'day',
      category: 'Day' as const,
      label: 'Day Scholar Campuses',
      count: CAMPUSES.filter((c) => c.category === 'Day').length,
      description: 'Separate campuses for Boys, Girls, and Co-Education across Nellore.',
      icon: 'Building2',
      ctaLabel: 'View Campuses',
    },
    {
      id: 'residential',
      category: 'Residential' as const,
      label: 'Residential Campuses',
      count: CAMPUSES.filter((c) => c.category === 'Residential').length,
      description:
        'Separate residential campuses for Boys and Girls with academic supervision and disciplined hostel life.',
      icon: 'Home',
      ctaLabel: 'View Campuses',
    },
  ],
} as const;

export type CampusBrowseCategory = (typeof CAMPUSES_SECTION.categories)[number]['category'];
