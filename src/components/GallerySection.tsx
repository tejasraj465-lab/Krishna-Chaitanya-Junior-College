import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Calendar, Tag } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/collegeData';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  variant?: 'home' | 'page';
  onViewFullGallery?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  variant = 'home',
  onViewFullGallery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus', 'Labs', 'Sports', 'Events', 'NCC', 'NSS', 'Annual Day', 'Achievements'];

  const displayedItems = selectedCategory === 'All'
    ? (variant === 'home' ? GALLERY_ITEMS.slice(0, 6) : GALLERY_ITEMS)
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className={variant === 'home' ? 'py-16 md:py-24 bg-[#EFF6FF] text-[#1E293B] scroll-mt-24' : 'py-8 md:py-12 bg-white text-[#1E293B]'}>
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        {variant === 'home' && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#0B3C91] bg-blue-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
              Life At Krishna Chaitanya
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B3C91] font-serif mt-3">
              Campus Visual Gallery
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Capturing moments of innovation, sportsmanship, military drills, cultural fests, and rank felicitations.
            </p>
          </div>
        )}

        {variant === 'page' && (
          <div className="text-left max-w-3xl mb-8">
            <span className="inline-flex items-center gap-1.5 text-[#0B3C91] bg-[#EFF6FF] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
              Life At Krishna Chaitanya
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B3C91] font-serif mt-3">
              Complete Campus Gallery
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
              Explore the full gallery of campus life, classrooms, labs, sports, NCC, NSS, celebrations, and achievement moments.
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0B3C91] text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {variant === 'home' && onViewFullGallery && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {categories.slice(0, 5).map((cat) => (
              <span key={cat} className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-600 border border-slate-200">
                {cat}
              </span>
            ))}
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${variant === 'page' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}>
          {displayedItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setLightboxItem(item)}
              className="bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                
                <span className="absolute top-3 left-3 bg-[#0B3C91]/90 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-white/20">
                  {item.category}
                </span>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-xs font-bold font-serif line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-blue-200">{item.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {variant === 'home' && onViewFullGallery && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={onViewFullGallery}
              className="inline-flex items-center gap-2 bg-[#0B3C91] hover:bg-[#072B6B] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
            >
              <span>View Full Gallery</span>
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden relative shadow-2xl"
              >
                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={lightboxItem.image}
                    alt={lightboxItem.title}
                    className="w-full h-auto max-h-[65vh] object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-6 bg-white text-[#1E293B]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#0B3C91] text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                      {lightboxItem.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {lightboxItem.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-[#0B3C91] mb-1">
                    {lightboxItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600">
                    {lightboxItem.caption}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
