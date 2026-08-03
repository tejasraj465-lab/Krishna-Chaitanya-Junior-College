import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MessageCircle, 
  GraduationCap, 
  Menu, 
  X, 
  Sparkles, 
  MapPin,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';
import { COURSE_CATEGORIES } from '../data/courseDetailsData';
import kcLogo from '../assets/kc_logo.svg';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface NavbarProps {
  activeSection?: string;
  onOpenApplyModal: (course?: string, campus?: string) => void;
  onOpenAIGuide: () => void;
  onSelectProgram?: (programId: string) => void;
  onSectionChange?: (sectionId: string) => void;
  onNavigateToPath?: (path: string) => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenApplyModal,
  onOpenAIGuide,
  onSelectProgram,
  onSectionChange,
  onNavigateToPath,
  onNavigateToSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  useBodyScrollLock(mobileMenuOpen);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [internalActiveSection, setInternalActiveSection] = useState<string>('welcome');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentActiveSection = activeSection || internalActiveSection;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Internal Intersection Observer fallback if activeSection is not provided
  useEffect(() => {
    if (activeSection) return; // parent handles state

    const sectionIds = ['welcome', 'courses', 'why-us', 'facilities', 'campuses', 'results', 'gallery'];

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length > 0) {
        const topEntry = visible.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        );
        if (topEntry.target.id) {
          setInternalActiveSection(topEntry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-80px 0px -40% 0px',
      threshold: [0.1, 0.3, 0.6]
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScrollTop = () => {
      if (window.scrollY < 80) {
        setInternalActiveSection('welcome');
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setInternalActiveSection('gallery');
      }
    };

    window.addEventListener('scroll', handleScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, [activeSection]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCoursesDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#welcome', id: 'welcome', type: 'section' as const },
    { label: 'Why KCJC', href: '/why-choose-kcjc', id: 'why-choose-kcjc', type: 'route' as const },
    { label: 'Facilities', href: '/facilities', id: 'facilities', type: 'route' as const },
    { label: 'Campuses', href: '/campuses', id: 'campuses', type: 'route' as const },
    { label: 'Top Results', href: '#results', id: 'results', type: 'section' as const },
    { label: 'Life at KCJC', href: '/life-at-kcjc', id: 'life-at-kcjc', type: 'route' as const },
    { label: 'Leadership', href: '#leadership', id: 'leadership', type: 'section' as const },
    { label: 'Gallery', href: '/gallery', id: 'gallery', type: 'route' as const },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);

    if (href.startsWith('/')) {
      if (onNavigateToPath) {
        onNavigateToPath(href);
        return;
      }

      window.history.pushState({}, '', href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');

    if (targetId === 'hero' || targetId === 'top') {
      if (onNavigateToSection) {
        onNavigateToSection('hero');
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        if (onSectionChange) {
          onSectionChange('hero');
        }
        setInternalActiveSection('hero');
      }
      return;
    }

    if (onNavigateToSection) {
      onNavigateToSection(targetId);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });

      if (onSectionChange) {
        onSectionChange(targetId);
      }
      setInternalActiveSection(targetId);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleProgramClick = (programId: string) => {
    setCoursesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectProgram) {
      onSelectProgram(programId);
    }
    handleNavClick('#courses');
  };

  return (
    <header className="th-header header-layout2 sticky top-0 z-50 w-full font-sans overflow-visible">
      {/* Header Top Bar */}
      <div className="th-header-top bg-[#031333] text-white text-caption sm:text-xs py-1 sm:py-1.5 px-3 sm:px-4 border-b border-blue-950/50">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-2 sm:gap-4 text-slate-200 shrink-0">
            <a 
              href={`tel:${COLLEGE_INFO.phonePrimary}`} 
              className="flex items-center gap-1 hover:text-[#FBBF24] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#FBBF24]" />
              <span className="font-semibold text-caption sm:text-xs">{COLLEGE_INFO.phonePrimary}</span>
            </a>
            
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>Nellore Campuses</span>
            </div>
          </div>

          {/* Right: Announcement & Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3 font-medium">
            <span className="bg-[#FBBF24] text-[#0B3C91] font-black px-1.5 sm:px-2 py-0.5 rounded text-label shrink-0 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 shrink-0" />
              <span>ADMISSIONS 2026-27 OPEN</span>
            </span>

            <a 
              href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya Admission Team, I want to know about Intermediate Admissions 2026.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 stroke-none" />
              <span>WhatsApp Admission Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 border-b ${
          isScrolled 
            ? 'glass py-1.5 sm:py-2 shadow-lg shadow-blue-900/5 text-slate-900 border-slate-200/60' 
            : 'bg-white/95 backdrop-blur-sm py-2 sm:py-2.5 text-slate-900 border-slate-100'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-10 grid grid-cols-[minmax(0,1fr)_auto] xl:flex xl:items-center xl:justify-between gap-2 items-center overflow-visible">
          {/* Logo & Brand Info */}
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-1.5 sm:gap-2.5 group min-w-0 overflow-hidden cursor-pointer"
            title="Go to Hero Section"
          >
            <img 
              src={kcLogo} 
              alt="Sri Krishna Chaitanya Educational Institutions Logo" 
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain transform group-hover:scale-105 transition-transform shrink-0 drop-shadow-sm" 
            />
            <div className="min-w-0 overflow-hidden">
              <span className="text-brand block text-sm leading-snug sm:text-lg text-[#0B3C91] line-clamp-2 sm:line-clamp-none sm:truncate">
                KRISHNA <span className="text-[#EA580C]">CHAITANYA</span>
              </span>
              <p className="text-brand-sub text-slate-500 mt-0.5 truncate leading-tight">
                Junior College & Integrated Academy
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-semibold shrink-0 font-sans overflow-visible">
            <button
              onClick={() => handleNavClick('#welcome')}
              className={`transition-all py-1.5 cursor-pointer whitespace-nowrap px-2.5 rounded-lg font-semibold border-b-2 ${
                currentActiveSection === 'welcome' || currentActiveSection === 'hero'
                  ? 'text-[#0B3C91] bg-blue-50 font-bold border-[#EA580C] shadow-2xs'
                  : 'text-slate-700 hover:text-[#0B3C91] hover:bg-slate-100 border-transparent'
              }`}
            >
              Overview
            </button>

            {/* Courses Dropdown */}
            <div
              className="relative overflow-visible"
              ref={dropdownRef}
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setCoursesDropdownOpen((open) => !open);
                }}
                aria-expanded={coursesDropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap font-bold border-b-2 ${
                  coursesDropdownOpen || currentActiveSection === 'courses'
                    ? 'bg-[#0B3C91] text-white shadow-md border-[#EA580C]'
                    : 'text-[#0B3C91] bg-blue-50 hover:bg-blue-100 border-blue-200 border-b-transparent'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Courses Offered</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {coursesDropdownOpen && (
                <div className="absolute left-0 top-full z-[100] pt-2 w-[680px] max-w-[calc(100vw-2rem)]">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 p-5 animate-fadeIn grid grid-cols-2 gap-4">
                  {COURSE_CATEGORIES.map((cat) => (
                    <div key={cat.code} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-all">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                        <div>
                          <span className="text-xs font-black text-[#0B3C91] uppercase tracking-wider block">
                            {cat.code} Stream
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {cat.tagline}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold bg-blue-100 text-[#0B3C91] px-2 py-0.5 rounded">
                          {cat.code}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {cat.tracks.map((track) => (
                          <button
                            key={track.id}
                            onClick={() => handleProgramClick(track.id)}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs flex items-center justify-between group cursor-pointer"
                          >
                            <span className="font-semibold text-slate-800 group-hover:text-white">
                              {track.label}
                            </span>
                            <span className="text-[9px] font-medium text-slate-500 group-hover:text-blue-100 bg-slate-200/70 group-hover:bg-blue-700 px-1.5 py-0.5 rounded">
                              {track.tag}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="col-span-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Click any program to view full curriculum & syllabus</span>
                    <button
                      onClick={() => handleNavClick('#courses')}
                      className="text-[#0B3C91] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>View All Courses</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks
              .filter(l => l.label !== 'Overview' && !['Leadership'].includes(l.label))
              .map((link) => {
              const isActive = currentActiveSection === link.id;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`transition-all py-1.5 cursor-pointer whitespace-nowrap px-2.5 rounded-lg font-semibold border-b-2 ${
                    isActive
                      ? 'text-[#0B3C91] bg-blue-50 font-bold border-[#EA580C] shadow-2xs'
                      : 'text-slate-700 hover:text-[#0B3C91] hover:bg-slate-100 border-transparent'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenApplyModal()}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Apply Online</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex xl:hidden items-center gap-1.5 shrink-0">
            <button
              onClick={() => onOpenApplyModal()}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-[10px] sm:text-xs px-2.5 sm:px-3.5 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] rounded-lg sm:rounded-xl shadow-sm transition-all flex items-center justify-center gap-0.5 sm:gap-1 cursor-pointer uppercase tracking-wide shrink-0 active:scale-95"
            >
              <span>Apply</span>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg sm:rounded-xl focus:outline-none border border-slate-200 cursor-pointer flex items-center justify-center shrink-0 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#EA580C]" /> : <Menu className="w-5 h-5 text-[#0B3C91]" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b-2 border-[#F97316] text-slate-800 px-4 py-4 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto animate-fadeIn divide-y divide-slate-100">
          {/* Quick Contact Bar */}
          <div className="pb-1 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${COLLEGE_INFO.phonePrimary}`}
                className="flex items-center justify-center gap-1.5 bg-slate-900 text-white text-xs font-bold py-3 min-h-[48px] px-3 rounded-xl shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#FBBF24]" />
                <span>Call Helpline</span>
              </a>
              <a
                href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya Admission Team, I want to know about Intermediate Admissions 2026.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white text-xs font-bold py-3 min-h-[48px] px-3 rounded-xl shadow-sm hover:bg-emerald-700 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="pt-3 space-y-1.5">
            <button
              onClick={() => handleNavClick('#hero')}
              className={`w-full text-left px-3.5 py-3 min-h-[48px] text-sm font-semibold rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                currentActiveSection === 'welcome' || currentActiveSection === 'hero'
                  ? 'bg-blue-50 text-[#0B3C91] font-bold border-l-4 border-[#F97316]'
                  : 'text-slate-800 hover:bg-slate-100 active:bg-slate-200'
              }`}
            >
              <span>Overview</span>
              <ChevronRight className={`w-4 h-4 ${currentActiveSection === 'welcome' || currentActiveSection === 'hero' ? 'text-[#0B3C91]' : 'text-slate-400'}`} />
            </button>

            <div className={`rounded-2xl border overflow-hidden shadow-inner transition-colors ${
              currentActiveSection === 'courses' ? 'border-[#0B3C91] bg-blue-50/70' : 'border-slate-200 bg-slate-50'
            }`}>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setMobileCoursesOpen((open) => !open);
                }}
                aria-expanded={mobileCoursesOpen}
                className={`w-full px-3.5 py-3 text-sm font-bold flex items-center justify-between cursor-pointer ${
                  currentActiveSection === 'courses' ? 'text-[#0B3C91] border-l-4 border-[#F97316]' : 'text-[#0B3C91]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0B3C91]" />
                  <span className="text-xs sm:text-sm">Courses (MPC, BiPC, MEC, CEC, Long Term)</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#0B3C91] transition-transform duration-200 ${mobileCoursesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileCoursesOpen && (
                <div className="p-2.5 bg-white space-y-2.5 border-t border-slate-200 text-xs">
                  {COURSE_CATEGORIES.map((cat) => (
                    <div key={cat.code} className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between px-1">
                        <p className="font-extrabold text-[#0B3C91] uppercase text-[11px] tracking-wider">
                          {cat.code} Stream
                        </p>
                        <span className="text-[9px] text-slate-500 font-medium">
                          {cat.tagline}
                        </span>
                      </div>
                      {cat.tracks.map((track) => (
                        <button
                          key={track.id}
                          onClick={() => handleProgramClick(track.id)}
                          className="w-full text-left px-2.5 py-2 rounded-lg bg-white hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-[#0B3C91] flex items-center justify-between transition-all cursor-pointer border border-slate-200"
                        >
                          <span className="font-semibold text-xs">{track.label}</span>
                          <span className="text-[9px] font-bold bg-blue-100 text-[#0B3C91] px-1.5 py-0.5 rounded">
                            {track.tag}
                          </span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {navLinks.filter(l => l.label !== 'Overview').map((link) => {
              const isActive = currentActiveSection === link.id;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full text-left px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#0B3C91] font-bold border-l-4 border-[#F97316]'
                      : 'text-slate-800 hover:bg-slate-100 active:bg-slate-200'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#0B3C91]' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenApplyModal(); }}
              className="w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer uppercase tracking-wider active:scale-98"
            >
              <span>Apply Online For 2026-27</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
