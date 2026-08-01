import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Presentation, 
  Zap, 
  FlaskConical, 
  Microscope, 
  Laptop, 
  BookOpen, 
  Home, 
  Bus, 
  Activity, 
  HeartPulse, 
  Utensils, 
  Eye, 
  X, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { FACILITIES } from '../data/collegeData';
import { Facility } from '../types';

interface FacilitiesSectionProps {
  variant?: 'home' | 'page';
  onViewAll?: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  variant = 'home',
  onViewAll,
}) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const visibleFacilities = variant === 'home' ? FACILITIES.slice(0, 5) : FACILITIES;

  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Presentation': return <Presentation className="w-5 h-5 text-[#0B3C91]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#0B3C91]" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-[#0B3C91]" />;
      case 'Microscope': return <Microscope className="w-5 h-5 text-[#0B3C91]" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-[#0B3C91]" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#0B3C91]" />;
      case 'Home': return <Home className="w-5 h-5 text-[#0B3C91]" />;
      case 'Bus': return <Bus className="w-5 h-5 text-[#0B3C91]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#0B3C91]" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-[#0B3C91]" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-[#0B3C91]" />;
      case 'Eye': return <Eye className="w-5 h-5 text-[#0B3C91]" />;
      default: return <Sparkles className="w-5 h-5 text-[#0B3C91]" />;
    }
  };

  return (
    <section id="facilities" className={variant === 'home' ? 'py-16 md:py-24 bg-[#EFF6FF] scroll-mt-20' : 'py-8 md:py-12 bg-white text-[#1E293B]'}>
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        {variant === 'home' && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#0B3C91] bg-blue-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
              World-Class Campus Amenities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B3C91] font-serif mt-3">
              Campus Facilities & Infrastructure
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Designed to foster comfort, health, safety, and modern scientific experimentation.
            </p>
          </div>
        )}

        {!variant || variant === 'home' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {visibleFacilities.map((facility, idx) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedFacility(facility)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-100 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#0B3C91]/90 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-white/20">
                    {facility.category}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="p-1.5 bg-blue-50 rounded-lg shrink-0">
                      {getFacilityIcon(facility.iconName)}
                    </div>
                    <h3 className="font-bold text-sm text-[#0B3C91] line-clamp-1 font-serif">
                      {facility.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {facility.description}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1">
                <span className="text-[11px] font-bold text-[#F97316] group-hover:underline flex items-center gap-1">
                  View Facility Details →
                </span>
              </div>
            </motion.div>
          ))}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-[#0B3C91] bg-[#EFF6FF] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
                World-Class Campus Amenities
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B3C91] font-serif mt-3">
                Complete Facilities & Infrastructure
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
                From digital classrooms and advanced laboratories to secure hostels, transport, medical care, and student support spaces, every facility is designed for focused learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleFacilities.map((facility, idx) => (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  onClick={() => setSelectedFacility(facility)}
                  className="bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 group cursor-pointer flex flex-col"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 bg-[#0B3C91]/90 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-white/20">
                      {facility.category}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="p-2.5 bg-blue-50 rounded-xl shrink-0">
                        {getFacilityIcon(facility.iconName)}
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-[#0B3C91] font-serif">
                        {facility.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {facility.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {facility.features.slice(0, 4).map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="text-[11px] font-semibold text-[#0B3C91] bg-[#EFF6FF] border border-blue-100 px-2.5 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 mt-auto">
                      <span className="text-[11px] font-bold text-[#F97316] group-hover:underline flex items-center gap-1">
                        View Facility Details →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {variant === 'home' && onViewAll && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 bg-[#0B3C91] hover:bg-[#072B6B] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
            >
              <span>View All Facilities</span>
            </button>
          </div>
        )}

        {/* Facility Detail Modal */}
        <AnimatePresence>
          {selectedFacility && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl max-w-xl w-full overflow-hidden relative shadow-2xl border border-blue-100"
              >
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-56">
                  <img
                    src={selectedFacility.image}
                    alt={selectedFacility.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C91] via-[#0B3C91]/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="bg-[#FBBF24] text-[#0B3C91] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full mb-1 inline-block">
                      {selectedFacility.category}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-white">
                      {selectedFacility.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {selectedFacility.description}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B3C91] mb-2">
                      Key Highlights & Features:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {selectedFacility.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 p-2 bg-blue-50 rounded-xl">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => setSelectedFacility(null)}
                      className="bg-[#0B3C91] text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
