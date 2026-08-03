import React from 'react';
import { motion } from 'motion/react';
import {
  Sun,
  BookOpen,
  HeartHandshake,
  Target,
  Trophy,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Sparkle,
  Compass,
  Users,
  Music2,
  ShieldCheck,
  CalendarDays,
  TreePine
} from 'lucide-react';

interface StudentLifeSectionProps {
  onOpenApplyModal?: (course?: string, campus?: string) => void;
  onOpenCampusVisit?: () => void;
  variant?: 'home' | 'page';
  onExploreFullPage?: () => void;
}

export const StudentLifeSection: React.FC<StudentLifeSectionProps> = ({
  onOpenApplyModal,
  onOpenCampusVisit,
  variant = 'home',
  onExploreFullPage,
}) => {
  const journeyPillars = [
    {
      id: 'morning',
      emoji: '🌅',
      icon: Sun,
      title: 'Every Morning Begins With Purpose',
      bgGradient: 'from-amber-50 to-orange-50 border-orange-200/80',
      iconBg: 'bg-orange-500 text-white shadow-orange-500/20',
      description: 'Walk into a vibrant campus filled with energy, ambition, and dreams. Learn from experienced faculty who inspire curiosity, confidence, and excellence from the very first class.',
    },
    {
      id: 'classroom',
      emoji: '📖',
      icon: BookOpen,
      bgGradient: 'from-blue-50 to-indigo-50 border-blue-200/80',
      iconBg: 'bg-[#0B3C91] text-white shadow-blue-500/20',
      title: 'Every Classroom Builds Your Future',
      description: 'Concept-based learning in interactive digital classrooms. Integrated IIT-JEE, NEET, EAPCET, CA & CMA coaching with daily practice, weekly assessments, and continuous mentoring.',
    },
    {
      id: 'friendship',
      emoji: '🤝',
      icon: HeartHandshake,
      bgGradient: 'from-pink-50 to-rose-50 border-pink-200/80',
      iconBg: 'bg-rose-500 text-white shadow-rose-500/20',
      title: 'Every Friendship Creates Memories',
      description: 'College life is more than academics. Celebrate Freshers\' Day, Ethnic Day, Sports, Annual Day, Educational Tours, and unforgettable cultural events.',
    },
    {
      id: 'challenge',
      emoji: '🎯',
      icon: Target,
      bgGradient: 'from-purple-50 to-violet-50 border-purple-200/80',
      iconBg: 'bg-purple-600 text-white shadow-purple-500/20',
      title: 'Every Challenge Makes You Stronger',
      description: 'Mock Tests, Revision Programmes, Faculty Mentoring, Career Guidance, and Performance Analysis help transform hurdles into confidence.',
    },
    {
      id: 'achievement',
      emoji: '🏆',
      icon: Trophy,
      bgGradient: 'from-amber-50 to-[#FFFBEB] border-amber-300/80',
      iconBg: 'bg-amber-500 text-white shadow-amber-500/20',
      title: 'Every Achievement Opens New Doors',
      description: 'The day finally arrives. Results are announced, dream colleges become reality, parents smile with pride, and students celebrate years of dedicated effort as a new journey begins.',
    }
  ];

  const fullLifeHighlights = [
    { title: 'Student Life', icon: Users, description: 'A balanced campus culture where academics, friendships, and mentorship grow together every day.' },
    { title: 'Clubs', icon: Sparkles, description: 'Interest-based clubs that encourage creativity, leadership, communication, and teamwork.' },
    { title: 'Cultural Activities', icon: Music2, description: 'Festivals, performances, and annual celebrations that keep campus life vibrant and memorable.' },
    { title: 'Sports', icon: Trophy, description: 'Structured sports, fitness, and competitive games that build discipline and healthy routines.' },
    { title: 'Campus Events', icon: CalendarDays, description: 'Freshers, annual day, seminars, special assemblies, and milestone celebrations across the year.' },
    { title: 'NSS', icon: TreePine, description: 'Service-oriented initiatives that develop social responsibility and community engagement.' },
    { title: 'NCC', icon: ShieldCheck, description: 'Leadership, discipline, and defense-orientation through NCC training and cadet opportunities.' },
    { title: 'Workshops & Seminars', icon: BookOpen, description: 'Practical sessions that add academic depth, career awareness, and communication skills.' },
    { title: 'Student Development', icon: GraduationCap, description: 'Programs that strengthen personality, confidence, and career readiness for the future.' }
  ];

  return (
    <section
      id="life-at-kc"
      className={variant === 'home'
        ? 'py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-blue-50/40 text-[#1E293B] scroll-mt-24 relative overflow-hidden'
        : 'py-10 md:py-14 bg-white text-[#1E293B]'}
    >
      {variant === 'home' && (
        <>
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {variant === 'home' ? (
          <>
            <div className="text-center max-w-4xl mx-auto mb-14">
              <span className="inline-flex items-center gap-1.5 text-[#0B3C91] bg-blue-100/80 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border border-blue-200 shadow-2xs">
                <Sparkle className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Campus Atmosphere & Experience</span>
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B3C91] font-serif mt-3.5 leading-tight">
                Life at Krishna Chaitanya
              </h2>

              <p className="text-lg sm:text-2xl font-bold text-[#F97316] font-serif mt-2 italic">
                Where Dreams Become Achievements.
              </p>

              <div className="mt-5 max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-blue-100 shadow-sm">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  "For the next <span className="font-extrabold text-[#0B3C91]">730 days</span>, this campus becomes more than a college. It becomes your classroom, your playground, your second home, and the place where lifelong friendships, unforgettable memories, and extraordinary achievements begin."
                </p>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto mb-10">
              {journeyPillars.slice(0, 3).map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${pillar.bgGradient} border shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden`}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className={`p-3.5 sm:p-4 rounded-2xl ${pillar.iconBg} shadow-md shrink-0 flex items-center justify-center text-2xl`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xl">{pillar.emoji}</span>
                          <h3 className="text-lg sm:text-xl font-bold text-[#0B3C91] font-serif">
                            {pillar.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {onExploreFullPage && (
              <div className="flex justify-center mb-16">
                <button
                  onClick={onExploreFullPage}
                  className="bg-[#0B3C91] hover:bg-[#072B6B] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <span>Explore Life at KCJC</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="max-w-4xl mx-auto text-left mb-10">
              <span className="inline-flex items-center gap-1.5 text-[#0B3C91] bg-[#EFF6FF] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border border-blue-200 shadow-2xs">
                <Sparkle className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Campus Atmosphere & Experience</span>
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B3C91] font-serif mt-3.5 leading-tight">
                Life at Krishna Chaitanya
              </h2>

              <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-3xl leading-relaxed">
                A complete student experience shaped through academics, clubs, cultural celebrations, sports, NCC, NSS, workshops, and memorable campus events.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
              {fullLifeHighlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="p-5 sm:p-6 rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-[#EFF6FF] shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#0B3C91] text-white flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B3C91] font-serif mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-[#0B3C91] via-[#092e70] to-[#041638] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-blue-900">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#F97316]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-300/30 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block">
                  ✨ The Krishna Chaitanya Experience
                </span>

                <h3 className="text-2xl sm:text-4xl font-extrabold font-serif text-white">
                  Two Years. Hundreds of Classes. Thousands of Memories. One Extraordinary Future.
                </h3>

                <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl mx-auto">
                  Ready to start your 730-day journey towards top rank engineering, medical, or commerce careers?
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  {onOpenApplyModal && (
                    <button
                      onClick={() => onOpenApplyModal()}
                      className="bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider flex items-center gap-2"
                    >
                      <span>Start Your Journey</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {onOpenCampusVisit && (
                    <button
                      onClick={onOpenCampusVisit}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-all cursor-pointer backdrop-blur-md flex items-center gap-2"
                    >
                      <span>Experience Campus Visit</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};