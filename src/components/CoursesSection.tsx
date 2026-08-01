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
  Download,
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
  onOpenBrochureModal: () => void;
  onSelectProgram?: (programId: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onOpenApplyModal,
  onOpenBrochureModal,
  onSelectProgram
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="w-6 h-6 text-white" />;
      case 'Microscope': return <Microscope className="w-6 h-6 text-white" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-white" />;
      case 'Scale': return <Scale className="w-6 h-6 text-white" />;
      default: return <BookOpen className="w-6 h-6 text-white" />;
    }
  };

  const filteredCourses = activeTab === 'all' 
    ? COURSES 
    : COURSES.filter(c => c.code.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="courses" className="section-padding bg-gradient-to-b from-[#EFF6FF] to-white scroll-mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light pointer-events-none" />
      <Container className="relative z-10">
        
        <SectionHeader
          eyebrow="2-Year Intermediate Programs (Class XI & XII)"
          title="Integrated Academic Streams Offered"
          description="Engineered for high performance in Telangana & Andhra Pradesh Board exams alongside premier All-India entrance coaching."
        />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 -mt-4 mb-10">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#0B3C91] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Streams
            </button>
            {COURSES.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveTab(course.code)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === course.code
                    ? 'bg-[#0B3C91] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {course.code} Stream
              </button>
            ))}
          </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group"
            >
              {/* Top Bar Badge & Code */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                      style={{ backgroundColor: course.color }}
                    >
                      {getIcon(course.iconName)}
                    </div>
                    <div>
                      <span className="text-xl font-black font-serif text-[#0B3C91] tracking-wide">
                        {course.code}
                      </span>
                      <p className="text-xs text-slate-500 font-medium">{course.duration}</p>
                    </div>
                  </div>

                  <span 
                    className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider"
                    style={{ backgroundColor: `${course.color}15`, color: course.color }}
                  >
                    {course.tag}
                  </span>
                </div>

                {/* Course Title & Subtitle */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#0B3C91] font-semibold mt-1">
                  {course.subtitle}
                </p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Specialized Program Batches */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#0B3C91]">
                      <Award className="w-3.5 h-3.5 text-[#FBBF24]" /> {course.code} Specialized Tracks:
                    </span>
                    <span className="text-[10px] text-slate-500 font-normal">Click to view syllabus</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {COURSE_CATEGORIES.find(cat => cat.code === course.code)?.tracks.map((track) => (
                      <button
                        key={track.id}
                        onClick={() => onSelectProgram && onSelectProgram(track.id)}
                        className="text-left p-2.5 rounded-xl bg-[#0B3C91] hover:bg-[#072B6B] text-white transition-all border border-blue-800 shadow-sm hover:shadow-md group cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-[#FBBF24] transition-colors">
                            {track.label}
                          </p>
                          <p className="text-[10px] text-blue-200 font-medium">
                            {track.tag}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#FBBF24] group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Integrated Coaching Highlights */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F97316]" /> Integrated Coaching Included:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.integratedCoaching.map((coach, cIdx) => (
                      <span 
                        key={cIdx} 
                        className="bg-slate-100 text-[#0B3C91] text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                      >
                        {coach}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Opportunities */}
                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Key Career Pathways:
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
                    {course.careerOptions.map((career, crIdx) => (
                      <div key={crIdx} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{career}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#0B3C91]" />
                  <span>Syllabus & Details</span>
                </button>

                <button
                  onClick={() => onOpenApplyModal(course.code)}
                  className="flex-1 py-3 px-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
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
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => { setSelectedCourse(null); onOpenBrochureModal(); }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#0B3C91]" />
                      <span>Download PDF Syllabus</span>
                    </button>

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
