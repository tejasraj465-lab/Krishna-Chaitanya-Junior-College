import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, Users, Building2, GraduationCap } from 'lucide-react';
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
              <div className="rounded-3xl border border-blue-100 bg-[#EFF6FF] p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[#0B3C91] font-bold text-sm mb-2">
                  <Building2 className="w-5 h-5 text-[#F97316]" />
                  <span>Campus Overview</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {campus.address}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-white p-3 border border-blue-100">
                    <Users className="w-4 h-4 text-[#0B3C91] mx-auto mb-1" />
                    <p className="text-lg font-black text-[#0B3C91]">{campus.stats.students}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Students</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 border border-blue-100">
                    <GraduationCap className="w-4 h-4 text-[#0B3C91] mx-auto mb-1" />
                    <p className="text-lg font-black text-[#0B3C91]">{campus.stats.faculty}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Faculty</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 border border-blue-100">
                    <Building2 className="w-4 h-4 text-[#0B3C91] mx-auto mb-1" />
                    <p className="text-lg font-black text-[#0B3C91]">{campus.stats.labs}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Labs</p>
                  </div>
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
              <h2 className="text-lg font-bold text-[#0B3C91] font-serif mb-4">Facilities</h2>
              <div className="flex flex-wrap gap-2">
                {campus.facilities.map((facility, index) => (
                  <span key={index} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                    {facility}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#0B3C91] font-serif mb-4">Google Maps</h2>
              <a
                href={campus.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B3C91] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#072B6B]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Google Maps</span>
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
                  Apply Here
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};