import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Target,
  Compass,
  ChevronRight,
  BookOpen,
  X,
  ShieldCheck,
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';
import { Container, SectionHeader, GlassCard, Button } from './ui';

export const WelcomeSection: React.FC = () => {
  const [showFullModal, setShowFullModal] = useState(false);

  const pillars = [
    {
      icon: Award,
      title: 'Trusted Legacy',
      desc: 'Shaping disciplined, confident students since 1998 with consistent academic outcomes.',
    },
    {
      icon: Target,
      title: 'Focused Mentorship',
      desc: 'Personal guidance, structured preparation, and close academic monitoring across every stream.',
    },
    {
      icon: Compass,
      title: 'Integrated Direction',
      desc: 'A clear path from Intermediate learning to top engineering, medical, commerce, and civil service goals.',
    },
  ];

  return (
    <section id="welcome" className="section-padding bg-white text-[#1E293B] scroll-mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto space-y-10"
        >
          <SectionHeader
            eyebrow={`Welcome to ${COLLEGE_INFO.name}`}
            title="Empowering Students to Excel in Board Exams & All-India Competitive Ranks"
            description={`At ${COLLEGE_INFO.name}, we believe the two years of Intermediate education are the true stepping stone to a student's lifelong career. We combine board academics with intensive integrated coaching for IIT-JEE, NEET, EAPCET, CA-Foundation, and Civil Services.`}
            icon={ShieldCheck}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <GlassCard key={idx} className="p-5 sm:p-6">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-blue-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#F97316]" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B3C91] font-serif mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </GlassCard>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard className="p-5 sm:p-6 space-y-2" hover={false}>
              <div className="flex items-center gap-2 text-[#0B3C91] font-bold text-sm">
                <Target className="w-5 h-5 text-[#F97316]" aria-hidden="true" />
                <span>Our Vision</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To provide accessible, high-caliber, character-building education that enables every student to achieve top ranks and moral integrity.
              </p>
            </GlassCard>

            <GlassCard className="p-5 sm:p-6 space-y-2" hover={false}>
              <div className="flex items-center gap-2 text-[#0B3C91] font-bold text-sm">
                <Compass className="w-5 h-5 text-[#F97316]" aria-hidden="true" />
                <span>Our Mission</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Combining expert faculty, technology-driven smart classrooms, personal mentorship, and micro-level error analysis for flawless results.
              </p>
            </GlassCard>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="secondary"
              size="md"
              icon={BookOpen}
              onClick={() => setShowFullModal(true)}
              className="normal-case tracking-normal font-bold"
            >
              Read Institutional Message
              <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </Container>

      <AnimatePresence>
        {showFullModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-modal-title"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setShowFullModal(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B3C91] bg-blue-50 px-3 py-1 rounded-full">
                  Institutional Journey & Ethos
                </span>
                <h3 id="welcome-modal-title" className="text-2xl font-bold font-serif text-[#0B3C91]">
                  About {COLLEGE_INFO.name}
                </h3>
                <div className="text-slate-700 text-sm leading-relaxed space-y-3">
                  <p>
                    Founded in 1998, <strong>{COLLEGE_INFO.name}</strong> was established with a singular focus: bridging the gap between state board academics and rigorous All-India competitive exams.
                  </p>
                  <p>
                    Over 28 years, our institution has expanded to 12 state-of-the-art campuses across Nellore. Our pedagogy is rooted in concept clarity, personal faculty accessibility, and continuous diagnostic testing.
                  </p>
                  <p>
                    Beyond ranks, we believe in nurturing patriotic, empathetic, and disciplined citizens. Our active National Cadet Corps (NCC) battalion and National Service Scheme (NSS) units provide students with life skills that serve them far beyond the college gates.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowFullModal(false)}
                    className="normal-case tracking-normal"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
