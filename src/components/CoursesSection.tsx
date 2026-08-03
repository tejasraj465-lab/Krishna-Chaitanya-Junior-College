import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Microscope, 
  TrendingUp, 
  Scale, 
  BookOpen, 
  ArrowRight, 
  MessageCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { COURSES, COLLEGE_INFO } from '../data/collegeData';
import { COURSE_CATEGORIES } from '../data/courseDetailsData';
import { getCourseStreamDetail } from '../data/courseStreamDetails';
import { CourseStreamDetailModal } from './CourseStreamDetailModal';
import { Course } from '../types';
import { Container, SectionHeader, GlassCard } from './ui';

interface CoursesSectionProps {
  onOpenApplyModal: (courseCode?: string) => void;
  onSelectProgram?: (programId: string) => void;
}

const COURSE_CARD_SUMMARIES: Record<string, string> = {
  MPC: 'Best for students aspiring for IIT, NITs, IIITs, Engineering, and other technical careers.',
  BiPC: 'Ideal for future doctors, pharmacists, dentists, and life science professionals preparing for NEET and related examinations.',
  MEC: 'Designed for students aiming for CA, CMA, CS, BBA, Economics, and Business careers.',
  CEC: 'Perfect for students interested in Civil Services, Law, Commerce, Humanities, and Management.',
  'Long Term': "Specialized repeaters' program focused on IIT-JEE, NEET, and EAPCET with intensive mentoring and performance improvement.",
};

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onOpenApplyModal,
  onSelectProgram
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const getIcon = (iconName: string, size = 'md') => {
    const className = size === 'sm' ? 'w-4 h-4 text-white' : 'w-5 h-5 text-white';
    switch (iconName) {
      case 'Calculator': return <Calculator className={className} />;
      case 'Microscope': return <Microscope className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Scale': return <Scale className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  const filteredCourses = activeTab === 'all' 
    ? COURSES 
    : COURSES.filter(c => c.code.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="courses" className="section-padding-sm bg-gradient-to-b from-[#EFF6FF] to-white scroll-mt-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light pointer-events-none" />
      <Container className="relative z-10">
        
        <SectionHeader
          eyebrow="Programs Offered | Admissions 2026–2027"
          title="Choose the Right Program for Your Future"
          description="Whether your goal is IIT, Medicine, Commerce, CA/CMA or other competitive examinations, Krishna Chaitanya offers specialized programs designed to help you succeed."
        />

        {/* Filter Pills — horizontal scroll on mobile */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8">
          <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`snap-start shrink-0 px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                activeTab === 'all'
                  ? 'bg-[#0B3C91] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Streams
            </button>
            {COURSES.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveTab(course.code)}
                className={`snap-start shrink-0 px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                  activeTab === course.code
                    ? 'bg-[#0B3C91] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {course.code}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative group h-full"
            >
              {/* Course code & summary */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0"
                    style={{ backgroundColor: course.color }}
                  >
                    {getIcon(course.iconName, 'sm')}
                  </div>
                  <div className="min-w-0">
                    <span className="text-base sm:text-lg font-black font-serif text-[#0B3C91] tracking-wide leading-none">
                      {course.code}
                    </span>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">{course.duration}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {COURSE_CARD_SUMMARIES[course.code] ?? course.description}
                </p>

                {/* Program streams — light topper-style chips */}
                {(() => {
                  const tracks = COURSE_CATEGORIES.find((cat) => cat.code === course.code)?.tracks ?? [];
                  if (tracks.length === 0) return null;

                  return (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#FBBF24] shrink-0" />
                        <span>Program Streams</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {tracks.map((track) => (
                          <button
                            key={track.id}
                            type="button"
                            onClick={() => onSelectProgram?.(track.id)}
                            className="group inline-flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FFFBEB] to-[#EFF6FF] hover:from-[#FEF3C7] hover:to-[#DBEAFE] border border-amber-200/70 hover:border-[#FBBF24]/50 shadow-xs transition-all cursor-pointer text-left max-w-full"
                          >
                            <span className="text-[10px] sm:text-xs font-bold text-[#0B3C91] leading-tight">
                              {track.label}
                            </span>
                            <span className="text-[9px] font-semibold text-[#EA580C] uppercase tracking-wide">
                              {track.tag}
                            </span>
                            <ChevronRight className="w-3 h-3 text-[#FBBF24] opacity-70 group-hover:opacity-100 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Bottom Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] sm:text-xs rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#0B3C91]" />
                  <span>Explore Program</span>
                </button>

                <button
                  onClick={() => onOpenApplyModal(course.code)}
                  className="flex-1 py-2.5 px-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-[11px] sm:text-xs rounded-lg sm:rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                >
                  <span>Apply for This Program</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Career guidance CTA */}
        <GlassCard className="mt-8 sm:mt-12 p-6 sm:p-8 text-center max-w-3xl mx-auto" hover={false}>
          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#0B3C91] mb-2">
            Not Sure Which Program is Right for You?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
            Our admission counselors will help you choose the best stream based on your interests, career goals, and
            academic performance.
          </p>
          <a
            href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya! I need free career guidance to choose the right Intermediate program.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl shadow-lg transition-all min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none shrink-0" />
            <span>Get Free Career Guidance — Talk to an Admission Counselor (WhatsApp)</span>
          </a>
        </GlassCard>

        {/* Course Detail Modal */}
        <AnimatePresence mode="wait">
          {selectedCourse && (
            <CourseStreamDetailModal
              key={selectedCourse.id}
              course={selectedCourse}
              detail={getCourseStreamDetail(selectedCourse.code)}
              onClose={() => setSelectedCourse(null)}
              onApply={(code) => {
                setSelectedCourse(null);
                onOpenApplyModal(code);
              }}
              renderIcon={(iconName) => getIcon(iconName, 'sm')}
            />
          )}
        </AnimatePresence>

      </Container>
    </section>
  );
};
