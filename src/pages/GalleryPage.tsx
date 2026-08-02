import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { GallerySection } from '../components/GallerySection';

interface GalleryPageProps {
  onNavigateHome: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigateHome }) => {
  return (
    <main className="w-full overflow-hidden">
      <PageBanner
        variant="hero"
        eyebrow="Campus Gallery"
        title="Gallery"
        description="A curated visual archive of classrooms, laboratories, sports, NCC, NSS, celebrations, and everyday campus life."
        currentLabel="Gallery"
        onHomeClick={onNavigateHome}
      />
      <GallerySection variant="page" />
    </main>
  );
};