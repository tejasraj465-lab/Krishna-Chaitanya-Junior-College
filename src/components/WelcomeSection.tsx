import React, { lazy, Suspense, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Container, SectionHeader, Button } from './ui';

const LegacyModal = lazy(() =>
  import('./LegacyModal').then((module) => ({ default: module.LegacyModal }))
);

interface WelcomeSectionProps {
  onOpenApplyModal?: () => void;
  onOpenCampusVisit?: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onOpenApplyModal, onOpenCampusVisit }) => {
  const [showLegacyModal, setShowLegacyModal] = useState(false);

  return (
    <section id="why-choose" className="section-padding bg-white text-[#1E293B] scroll-mt-[5.5rem] sm:scroll-mt-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto space-y-8 sm:space-y-10"
        >
          <SectionHeader
            eyebrow="WHY CHOOSE KRISHNA CHAITANYA?"
            title="Why Thousands of Parents Trust Krishna Chaitanya"
            description="For over 28 years, Krishna Chaitanya Junior College has helped students build strong academic foundations through experienced faculty, disciplined learning, personalized mentoring, and integrated competitive exam coaching—all in a safe and student-focused environment."
          />

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button variant="secondary" size="md" icon={BookOpen} onClick={() => setShowLegacyModal(true)}>
              Explore more
              <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </Container>

      {showLegacyModal && (
        <Suspense fallback={null}>
          <LegacyModal
            variant="whyKcjc"
            open={showLegacyModal}
            onClose={() => setShowLegacyModal(false)}
            onOpenApplyModal={onOpenApplyModal}
            onOpenCampusVisit={onOpenCampusVisit}
          />
        </Suspense>
      )}
    </section>
  );
};
