import React from 'react';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { PageBanner } from '../components/PageBanner';

interface FacilitiesPageProps {
  onNavigateHome: () => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ onNavigateHome }) => {
  return (
    <main className="w-full overflow-hidden">
      <PageBanner
        eyebrow="Campus Infrastructure"
        title="Facilities & Infrastructure"
        description="A complete look at the college's academic, residential, transport, safety, and student-support facilities, arranged for comfort and focused learning."
        currentLabel="Facilities"
        onHomeClick={onNavigateHome}
      />
      <FacilitiesSection variant="page" />
    </main>
  );
};