import React, { useMemo } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { COLLEGE_INFO, COURSES, CAMPUSES } from '../data/collegeData';
import kcLogo from '../assets/kc_logo.svg';

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const CAMPUS_NAME_PREFIX = /^Krishna Chaitanya Junior College – /;

const getCampusDisplayName = (name: string) => name.replace(CAMPUS_NAME_PREFIX, '');

const FooterHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-label text-white border-l-2 border-[#FBBF24] pl-2.5 font-sans mb-4">
    {children}
  </h3>
);

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onNavigateToSection }) => {
  const { dayCampuses, residentialCampuses } = useMemo(() => {
    const day = CAMPUSES.filter((campus) => campus.category === 'Day');
    const residential = CAMPUSES.filter((campus) => campus.category === 'Residential');
    return { dayCampuses: day, residentialCampuses: residential };
  }, []);

  const renderCampusLink = (campus: (typeof CAMPUSES)[number]) => (
    <a
      key={campus.id}
      href={campus.googleMapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-2.5 rounded-xl border border-blue-900/50 bg-blue-950/30 px-3 py-2.5 hover:border-[#FBBF24]/40 hover:bg-blue-900/40 transition-colors"
    >
      <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5 group-hover:text-[#FBBF24] transition-colors" />
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
          {getCampusDisplayName(campus.name)}
        </span>
        <span className="block text-[11px] text-slate-500 mt-0.5">
          {campus.city} · {campus.type}
        </span>
      </span>
    </a>
  );

  return (
    <footer className="bg-[#031333] text-slate-300 font-sans border-t border-blue-950 pb-20 md:pb-8 pt-14 md:pt-16">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-8 pb-12 border-b border-blue-900/60">
          {/* Brand */}
          <div className="xl:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateHome) {
                  onNavigateHome();
                  return;
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group cursor-pointer inline-flex"
              title="Go to Hero Section"
            >
              <img
                src={kcLogo}
                alt="Sri Krishna Chaitanya Educational Institutions"
                className="w-12 h-12 object-contain shrink-0 group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="text-brand text-white text-xl group-hover:text-[#FBBF24] transition-colors">
                  KRISHNA <span className="text-[#FBBF24]">CHAITANYA</span>
                </span>
                <p className="text-brand-sub text-blue-300">Junior College & Integrated Academy</p>
              </div>
            </a>

            <p className="text-body-sm text-slate-400 leading-relaxed max-w-md">
              {COLLEGE_INFO.taglineSecondary} Recognized by State Board of Intermediate Education
              Telangana & Andhra Pradesh.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={COLLEGE_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2.5 bg-blue-900/50 hover:bg-blue-800 text-blue-200 rounded-xl transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COLLEGE_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 bg-blue-900/50 hover:bg-blue-800 text-blue-200 rounded-xl transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COLLEGE_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2.5 bg-blue-900/50 hover:bg-blue-800 text-blue-200 rounded-xl transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={COLLEGE_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 bg-blue-900/50 hover:bg-blue-800 text-blue-200 rounded-xl transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Academic Streams */}
          <div className="xl:col-span-3">
            <FooterHeading>
              <span className="inline-flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-[#FBBF24]" />
                Academic Streams
              </span>
            </FooterHeading>
            <ul className="space-y-2">
              {COURSES.map((course) => (
                <li key={course.id}>
                  <button
                    type="button"
                    onClick={() => onNavigateToSection?.('courses')}
                    className="text-xs text-slate-400 hover:text-[#FBBF24] transition-colors text-left leading-relaxed"
                  >
                    <span className="font-bold text-slate-200">{course.code}</span>
                    <span className="text-slate-500"> — {course.title.split(',')[0]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Central Contact */}
          <div className="xl:col-span-4">
            <FooterHeading>Central Desk</FooterHeading>
            <div className="rounded-2xl border border-blue-900/60 bg-blue-950/35 p-4 sm:p-5 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">{COLLEGE_INFO.headquarters}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <a
                  href={`tel:${COLLEGE_INFO.phonePrimary.replace(/\s/g, '')}`}
                  className="text-slate-200 hover:text-[#FBBF24] transition-colors font-semibold"
                >
                  {COLLEGE_INFO.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <a
                  href={`mailto:${COLLEGE_INFO.email}`}
                  className="text-slate-200 hover:text-[#FBBF24] transition-colors break-all"
                >
                  {COLLEGE_INFO.email}
                </a>
              </div>
              <a
                href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-1 rounded-xl bg-emerald-500/10 border border-emerald-500/25 px-3 py-2 text-emerald-400 font-bold hover:bg-emerald-500/15 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400 stroke-none" />
                <span>WhatsApp 24/7 Helpline</span>
              </a>
            </div>
          </div>
        </div>

        {/* Campuses — full-width grid */}
        <div className="py-10 md:py-12 border-b border-blue-900/60">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <FooterHeading>
                <span className="inline-flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#FBBF24]" />
                  Our Campuses
                </span>
              </FooterHeading>
              <p className="text-xs text-slate-500 max-w-xl -mt-1">
                Krishna Chaitanya Junior College — {CAMPUSES.length} campuses across Nellore and
                Buchireddypalem.
              </p>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
              {dayCampuses.length} Day · {residentialCampuses.length} Residential
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#FBBF24]/90 mb-3">
                Day Campuses
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                {dayCampuses.map(renderCampusLink)}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#FBBF24]/90 mb-3">
                Residential Campuses
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                {residentialCampuses.map(renderCampusLink)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {COLLEGE_INFO.name}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Admission
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">
              Mandatory Disclosures
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
