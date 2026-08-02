import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Microscope, 
  TrendingUp, 
  Scale, 
  CheckCircle, 
  CheckCircle2, 
  Briefcase, 
  BookOpen, 
  ArrowRight, 
  X, 
  Clock, 
  Users, 
  Sparkles,
  ChevronRight,
  Tablet,
  Award
} from 'lucide-react';
import { COURSES } from '../data/collegeData';
import { COURSE_CATEGORIES } from '../data/courseDetailsData';
import { Course } from '../types';
import { Container, SectionHeader, GlassCard } from './ui';

interface CoursesSectionProps {
  onOpenApplyModal: (courseCode?: string) => void;
  onSelectProgram?: (programId: string) => void;
}

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
    <section id="courses" className="section-padding-sm bg-gradient-to-b from-[#EFF6FF] to-white scroll-mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light pointer-events-none" />
      <Container className="relative z-10">
        
        <SectionHeader
          eyebrow="2-Year Intermediate Programs (Class XI & XII)"
          title="Integrated Academic Streams Offered"
          description="Engineered for high performance in Telangana & Andhra Pradesh Board exams alongside premier All-India entrance coaching."
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
              {/* Top Bar Badge & Code */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
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

                  <span
                    className="text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full tracking-wide text-center max-w-[88px] sm:max-w-none leading-tight shrink-0"
                    style={{ backgroundColor: `${course.color}15`, color: course.color }}
                  >
                    {course.tag}
                  </span>
                </div>

                {/* Course Title & Subtitle */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {course.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#0B3C91] font-semibold mt-0.5 leading-snug">
                  {course.subtitle}
                </p>

                <p className="text-[11px] sm:text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {course.description}
                </p>

                {/* Specialized Program Batches */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-[10px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between gap-1">
                    <span className="flex items-center gap-1 text-[#0B3C91]">
                      <Award className="w-3 h-3 text-[#FBBF24] shrink-0" />
                      <span className="truncate">{course.code} Tracks</span>
                    </span>
                    <span className="text-[9px] text-slate-400 font-normal shrink-0 hidden sm:inline">Tap to view</span>
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {COURSE_CATEGORIES.find(cat => cat.code === course.code)?.tracks.map((track) => (
                      <button
                        key={track.id}
                        onClick={() => onSelectProgram && onSelectProgram(track.id)}
                        className="text-left p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#0B3C91] hover:bg-[#072B6B] text-white transition-all border border-blue-800/50 shadow-sm group cursor-pointer flex items-center justify-between gap-1 min-h-[44px]"
                      >
                        <div className="min-w-0">
                          <p className="text-[10px] sm:text-xs font-bold text-white group-hover:text-[#FBBF24] transition-colors truncate">
                            {track.label}
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-blue-200 font-medium truncate">
                            {track.tag}
                          </p>
                        </div>
                        <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FBBF24] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Integrated Coaching Highlights */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-[10px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#F97316] shrink-0" />
                    <span>Integrated Coaching</span>
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {course.integratedCoaching.map((coach, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-slate-100 text-[#0B3C91] text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:py-1 rounded-md"
                      >
                        {coach}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Opportunities — hidden on smallest screens to keep cards compact */}
                <div className="mt-3 hidden sm:block">
                  <p className="text-[10px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Career Pathways</span>
                  </p>
                  <div className="grid grid-cols-2 gap-1 text-[10px] sm:text-xs text-slate-600">
                    {course.careerOptions.slice(0, 4).map((career, crIdx) => (
                      <div key={crIdx} className="flex items-center gap-1 min-w-0">
                        <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{career}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] sm:text-xs rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#0B3C91]" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => onOpenApplyModal(course.code)}
                  className="flex-1 py-2.5 px-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-[11px] sm:text-xs rounded-lg sm:rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider min-h-[40px]"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Course Detail Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-blue-100"
              >
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  {/* Modal Header */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                      style={{ backgroundColor: selectedCourse.color }}
                    >
                      {getIcon(selectedCourse.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0B3C91] uppercase tracking-wider">
                        {selectedCourse.code} Stream Blueprint
                      </span>
                      <h3 className="text-xl font-bold font-serif text-slate-900">
                        {selectedCourse.title}
                      </h3>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center text-xs">
                    <div>
                      <Clock className="w-4 h-4 text-[#0B3C91] mx-auto mb-1" />
                      <p className="font-bold text-slate-900">{selectedCourse.duration}</p>
                      <p className="text-[10px] text-slate-500">Duration</p>
                    </div>
                    <div>
                      <Users className="w-4 h-4 text-[#0B3C91] mx-auto mb-1" />
                      <p className="font-bold text-slate-900">{selectedCourse.seats} Seats/Campus</p>
                      <p className="text-[10px] text-slate-500">Intake Capacity</p>
                    </div>
                    <div>
                      <CheckCircle2 className="w-4 h-4 text-[#0B3C91] mx-auto mb-1" />
                      <p className="font-bold text-emerald-600">Integrated Batch</p>
                      <p className="text-[10px] text-slate-500">Board + Entrance</p>
                    </div>
                  </div>

                  {/* Full Subjects List */}
                  <div>
                    <h4 className="text-xs font-bold text-[#0B3C91] uppercase tracking-wider mb-2">
                      Board & Entrance Subjects Syllabus:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedCourse.subjects.map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <p className="font-bold">Eligibility Criteria:</p>
                    <p>{selectedCourse.eligibility}</p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        const code = selectedCourse.code;
                        setSelectedCourse(null);
                        onOpenApplyModal(code);
                      }}
                      className="px-6 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-extrabold rounded-xl shadow-md cursor-pointer uppercase tracking-wider"
                    >
                      Apply For {selectedCourse.code}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </Container>
    </section>
  );
};
