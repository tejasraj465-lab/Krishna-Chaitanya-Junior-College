import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, Building2, Home } from 'lucide-react';
import { CAMPUSES } from '../data/collegeData';
import { CAMPUSES_SECTION, CampusBrowseCategory } from '../data/campusesSectionData';
import { PageBanner } from '../components/PageBanner';
import { CampusCard } from '../components/CampusCard';

export type CampusCategoryFilter = 'All' | CampusBrowseCategory;

interface CampusesPageProps {
  onNavigateHome: () => void;
  onNavigateToCampus: (campusSlug: string) => void;
  onOpenApplyModal: (course?: string, campus?: string) => void;
  categoryFilter: CampusCategoryFilter;
  onCategoryChange: (category: CampusCategoryFilter) => void;
}

export const CampusesPage: React.FC<CampusesPageProps> = ({
  onNavigateHome,
  onNavigateToCampus,
  onOpenApplyModal,
  categoryFilter,
  onCategoryChange,
}) => {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const selectedCategory = categoryFilter;

  const setSelectedCategory = (category: CampusCategoryFilter) => {
    onCategoryChange(category);
  };

  const campusTypes = useMemo(
    () => ['All', ...Array.from(new Set(CAMPUSES.map((campus) => campus.type)))],
    []
  );
  const locations = useMemo(
    () => ['All', ...Array.from(new Set(CAMPUSES.map((campus) => campus.city)))],
    []
  );

  const filteredCampuses = useMemo(() => {
    const search = query.trim().toLowerCase();

    return CAMPUSES.filter((campus) => {
      const matchesSearch =
        !search ||
        [campus.name, campus.city, campus.type, campus.address, campus.facilities.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(search);
      const matchesCategory = selectedCategory === 'All' || campus.category === selectedCategory;
      const matchesType = selectedType === 'All' || campus.type === selectedType;
      const matchesLocation = selectedLocation === 'All' || campus.city === selectedLocation;

      return matchesSearch && matchesCategory && matchesType && matchesLocation;
    });
  }, [query, selectedCategory, selectedType, selectedLocation]);

  const dayCount = CAMPUSES.filter((c) => c.category === 'Day').length;
  const residentialCount = CAMPUSES.filter((c) => c.category === 'Residential').length;

  return (
    <main className="w-full overflow-hidden">
      <PageBanner
        variant="hero"
        eyebrow={CAMPUSES_SECTION.eyebrow}
        title={CAMPUSES_SECTION.title}
        description={CAMPUSES_SECTION.subheading}
        currentLabel="Campuses"
        onHomeClick={onNavigateHome}
      />

      <section className="py-8 md:py-12 bg-white text-[#1E293B]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-[#0B3C91] text-white'
                  : 'bg-slate-100 text-[#0B3C91] hover:bg-blue-50'
              }`}
            >
              All ({CAMPUSES.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('Day')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                selectedCategory === 'Day'
                  ? 'bg-[#0B3C91] text-white'
                  : 'bg-slate-100 text-[#0B3C91] hover:bg-blue-50'
              }`}
            >
              <Building2 className="w-4 h-4" aria-hidden="true" />
              Day Campuses ({dayCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('Residential')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                selectedCategory === 'Residential'
                  ? 'bg-[#0B3C91] text-white'
                  : 'bg-slate-100 text-[#0B3C91] hover:bg-blue-50'
              }`}
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              Residential Campuses ({residentialCount})
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 mb-8">
            <div className="xl:col-span-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Search Campus
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, city, type, address, or facility"
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B3C91]/20 focus:border-[#0B3C91]"
                />
              </div>
            </div>

            <div className="xl:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Campus Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B3C91]/20 focus:border-[#0B3C91]"
              >
                {campusTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="xl:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B3C91]/20 focus:border-[#0B3C91]"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="xl:col-span-1 flex items-end">
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('All');
                  setSelectedType('All');
                  setSelectedLocation('All');
                }}
                className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mb-6 text-sm text-slate-600">
            <p className="font-medium">
              Showing {filteredCampuses.length} of {CAMPUSES.length} campuses.
            </p>
            {(query || selectedCategory !== 'All' || selectedType !== 'All' || selectedLocation !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('All');
                  setSelectedType('All');
                  setSelectedLocation('All');
                }}
                className="inline-flex items-center gap-1 text-[#0B3C91] font-bold hover:text-[#F97316] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Clear filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCampuses.map((campus) => (
              <CampusCard
                key={campus.id}
                campus={campus}
                onViewCampus={() => onNavigateToCampus(campus.id)}
                onApply={() => onOpenApplyModal(undefined, campus.name)}
              />
            ))}
          </div>

          {filteredCampuses.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <p className="text-sm font-medium">No campuses match the current filters.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
