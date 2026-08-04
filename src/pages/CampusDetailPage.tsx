import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, Building2 } from 'lucide-react';
import { Campus } from '../types';
import { PageBanner } from '../components/PageBanner';

interface CampusDetailPageProps {
  campus: Campus | null;
  onNavigateHome: () => void;
  onNavigateToCampuses: () => void;
  onOpenApplyModal: (course?: string, campus?: string) => void;
}

export const CampusDetailPage: React.FC<CampusDetailPageProps> = ({
  campus,
  onNavigateHome,
  onNavigateToCampuses,
  onOpenApplyModal,
}) => {
  if (!campus) {
    return (
      <main className="w-full overflow-hidden">
        <PageBanner
          eyebrow="Campus Details"
          title="Campus Not Found"
          description="The requested campus does not match any campus already available in the site data."
          currentLabel="Campus Not Found"
          onHomeClick={onNavigateHome}
        />
        <section className="py-12">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm">
              <p className="text-sm text-slate-600">Please return to the campuses page and choose one of the existing campuses.</p>
              <button
                onClick={onNavigateToCampuses}
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#0B3C91] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md"
              >
                View All Campuses
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full overflow-hidden">
      <PageBanner
        eyebrow="Campus Details"
        title={campus.name}
        description={`${campus.type} • ${campus.city}`}
        currentLabel={campus.name}
        onHomeClick={onNavigateHome}
      />

      <section className="py-10 md:py-14 bg-white text-[#1E293B]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-blue-100 shadow-lg">
              <img
                src={campus.image}
                alt={campus.name}
                className="h-[320px] sm:h-[420px] w-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-blue-100 bg-[#EFF6FF] p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#0B3C91] font-bold text-sm">
                  <Building2 className="w-5 h-5 text-[#F97316]" aria-hidden="true" />
                  <span>Campus Overview</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{campus.address}</p>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Suitable For</p>
                  <p className="text-sm font-semibold text-[#0B3C91]">{campus.suitableFor}</p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Courses Offered</p>
                  <ul className="space-y-1">
                    {campus.coursesOffered.map((course) => (
                      <li key={course} className="text-sm text-slate-700 flex items-start gap-1.5">
                        <span className="text-[#F97316] font-bold shrink-0">•</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[#0B3C91] font-bold text-sm mb-3">
                  <MapPin className="w-5 h-5 text-[#F97316]" />
                  <span>Contact Information</span>
                </div>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-[#0B3C91] shrink-0 mt-0.5" />
                    <span>{campus.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-[#0B3C91] shrink-0 mt-0.5" />
                    <span>{campus.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#0B3C91] shrink-0 mt-0.5" />
                    <span>{campus.city}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="rounded-3xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#0B3C91] font-serif mb-4">Get Directions</h2>
              <a
                href={campus.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B3C91] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#072B6B]"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>Get Directions</span>
              </a>
            </section>
          </div>

          <section className="rounded-3xl bg-gradient-to-r from-[#0B3C91] via-[#072B6B] to-[#041638] p-6 sm:p-8 text-white shadow-xl border border-blue-900">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Admission CTA</p>
                <h2 className="mt-2 text-2xl font-extrabold font-serif">Start your admission journey for this campus</h2>
                <p className="mt-2 text-sm text-blue-100">Use only the existing campus information to connect with the admission process.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${campus.phone}`}
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-xs font-bold text-white border border-white/15 transition-all hover:bg-white/20"
                >
                  Call Campus
                </a>
                <button
                  onClick={() => onOpenApplyModal(undefined, campus.name)}
                  className="inline-flex items-center justify-center rounded-xl bg-[#F97316] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#EA580C]"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};